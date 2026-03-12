import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import {
  Card,
  Alert,
  CardBody,
  Button,
  Row,
  Col
} from "reactstrap"

// availity-reactstrap-validation

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import Utils from '../Utility'

// actions
import { get, put } from '../../helpers/api_helper';
import Header from '../../components/VerticalLayout/Header';
import Login from '../Authentication/Login';
import { toast } from 'react-toastify'
import avatar from "../../assets/images/logo-sm-dark.png"
import { AvField, AvForm } from 'availity-reactstrap-validation'

const UserDetail = props => {
  const { user } = props;
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState("");
  const [utmInput, setUtmInput] = useState(false);
  const [banks, setBanks] = useState([]);
  const [utm, setUtm] = useState([]);
  const [path, setPath] = useState("unverified");

  useEffect(() => {
    console.log('props on details', props)
    if (props?.location?.state) {
      setPath(props?.location?.state?.type);
    }
    if (props.location.pathname.split("/").length > 0) {
      setUserId(props.location.pathname.split("/")[props.location.pathname.split("/").length - 1]);
    }
  }, [props]);

  useEffect(() => {
    getMetas();
    if (userId)
      getUser();
  }, [userId]);

  const getMetas = () => {
    get("/meta/list?role=Admin")
      .then(json => {
        console.log('response from get project list');
        if (json?.statusCode == 200) {
          setBanks(json?.data?.banks);
        } else {
          toast.error(json?.error);
        }
      })
      .catch(error => {
        console.log('error while getting project list', error);
      })
  }

  const getUser = () => {
    get("/user/user?userId=" + userId, { token: user?.token })
      .then(res => {
        console.log('response from get user detail', res);
        if (res?.statusCode == 200) {
          setData(res?.data);
          setUtm(res?.data?.utm || []);
        } else {
          toast.error(res?.error);
        }
      })
  }

  const handleApprove = () => {
    put('/user/update', { userId, isAdminApproved:true, token: user?.token })
      .then(res => {
        console.log('res from user verify', res);
        if (res?.statusCode == 200) {
          toast.success(res?.message);
          getUser();
        } else {
          toast.error(res?.error);
        }
      })
  }

  const handleValidUtm = (e, v) => {
    let utm = data?.utm;
    utm.push(v);
    put('/user/update', { userId, utm, token: user?.token })
      .then(res => {
        console.log('res from user verify', res);
        if (res?.statusCode == 200) {
          toast.success(res?.message);
          setUtmInput(false);
          getUser();
        } else {
          toast.error(res?.error);
        }
      })
  }

  const getBankName = (id) => {
    console.log('find bank id ', id);
    let bank = banks.find(x => x._id == id);
    console.log('find bank id ', bank);
    if (bank)
      return bank?.name
    else
      return "error";
  }

  const addMore = () => {
    let temp = Object.assign([], utm);
    temp.push({ bankId: '', url: '' });
    setUtm(temp);
    setUtmInput(true);
  }

  return (
    <React.Fragment>
      {/* <Header history={props.history} backgroundColor={data?.theme} /> */}
      <div className="page-content">
        {/* Render Breadcrumb */}
        <Breadcrumb title={Utils.projectName} breadcrumbItem={'User Detail'} />
        {/* container */}
        <div className="account-pages">
          <Card>
            <CardBody style={{}}>
              <div style={{ textAlign: 'center', marginTop: 10 }}>
                <img src={data?.profile_picture ? data?.profile_picture : avatar} style={{ width: 100, height: 100 }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 30 }}>
                <p><span style={{ fontWeight: 'bold' }}>{data?.name}<p>ID : <span style={{ fontWeight: 'bold' }}>{data?.userId}</span></p></span></p>
                {data?.isAdminApproved &&
                  <p>Total Leads : <span style={{ fontWeight: 'bold' }}>{data?.leads?.length}</span></p>
                }
              </div>
              <h5 style={{ fontWeight: 'bold', color: 'black' }}>Personal Information</h5>
              <div className="d-flex" style={{ marginTop: 20, paddingLeft: 20, marginBottom: 20, justifyContent: 'space-around', width: '80%' }}>
                <div style={{ marginRight: 30 }}>
                  <p>Email : <span style={{ fontWeight: 'bold' }}>{data?.email}</span></p>
                  <p>Address : <span style={{ fontWeight: 'bold' }}>{data?.address}</span></p>
                  <p>DOB : <span style={{ fontWeight: 'bold' }}>{data?.dob.split("T")[0]}</span></p>
                </div>
                <div style={{ marginLeft: 30 }}>
                  <p>Mobile : <span style={{ fontWeight: 'bold' }}>{data?.mobile}</span></p>
                  <p>City : <span style={{ fontWeight: 'bold' }}>{data?.city}</span></p>
                </div>
                <div style={{ marginLeft: 30 }}>
                  <p>Gender : <span style={{ fontWeight: 'bold' }}>{data?.gender}</span></p>
                  <p>Pin Code : <span style={{ fontWeight: 'bold' }}>{data?.pinCode}</span></p>
                </div>
              </div>
              <h5 style={{ fontWeight: 'bold', color: 'black' }}>Document Information</h5>
              <div className="d-flex" style={{ marginTop: 20, paddingLeft: 20, marginBottom: 20, justifyContent: 'space-around', width: '80%' }}>
                <div style={{ marginRight: 30 }}>
                  <img src={data?.adharImg} style={{ width: 200, height: 'auto' }} />
                  <p>Adhar No : <span style={{ fontWeight: 'bold' }}>{data?.adharNo}</span></p>
                </div>
                <div style={{ marginLeft: 30 }}>
                  <img src={data?.panImg} style={{ width: 200, height: 'auto' }} />
                  <p>Pan No : <span style={{ fontWeight: 'bold' }}>{data?.panNo}</span></p>
                </div>
              </div>
              <h5 style={{ fontWeight: 'bold', color: 'black' }}>Bank Information</h5>
              <div className="d-flex" style={{ marginTop: 20, paddingLeft: 20, marginBottom: 20, justifyContent: 'space-around', width: '80%' }}>
                <div style={{ marginRight: 30 }}>
                  <p>Bank Name : <span style={{ fontWeight: 'bold' }}>{data?.bankName}</span></p>
                  <p>Account Holder Name : <span style={{ fontWeight: 'bold' }}>{data?.accountHolderName}</span></p>
                </div>
                <div style={{ marginLeft: 30 }}>
                  <p>Branch Name : <span style={{ fontWeight: 'bold' }}>{data?.branchName}</span></p>
                  <p>Account No : <span style={{ fontWeight: 'bold' }}>{data?.accountNo}</span></p>
                </div>
                <div style={{ marginLeft: 30 }}>
                  <p>IFSC Code : <span style={{ fontWeight: 'bold' }}>{data?.ifscCode}</span></p>
                </div>
              </div>
              <h5 style={{ fontWeight: 'bold', color: 'black' }}>UTM Information</h5>
              {utm?.length < 1 ?
                <AvForm onValidSubmit={handleValidUtm}>
                  <Row style={{ alignItems: 'flex-end', marginTop: 20 }}>
                    <Col md={3}>
                      <AvField
                        name="bankId"
                        label="Bank"
                        type="select"
                        required
                      >
                        <option value="">Select Bank</option>
                        {banks?.map((item) => {
                          return (
                            <option value={item?._id}>{item?.name}</option>
                          )
                        })}
                      </AvField>
                    </Col>
                    <Col md={7}>
                      <AvField
                        name="url"
                        label="url"
                        type="url"
                        required
                      >
                      </AvField>
                    </Col>
                    <Col md={2}>
                      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <Button type="submit" color={"primary"} style={{}}>
                          Add
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </AvForm>
                :
                <>
                  <Row style={{ alignItems: 'flex-end', marginTop: 20 }}>
                    <Col md={3}>
                      <h6 style={{ fontWeight: 'bold', color: 'black' }}>Banks</h6>
                    </Col>
                    <Col md={7}>
                      <h6 style={{ fontWeight: 'bold', color: 'black' }}>UTM Url</h6>
                    </Col>
                    <Col md={2}>
                    </Col>
                  </Row>
                  {data?.utm?.map((item, index) => {
                    return (
                      <Row style={{ alignItems: 'flex-end', marginTop: 20 }}>
                        <Col md={3}>
                          <p>{getBankName(item?.bankId)} :</p>
                        </Col>
                        <Col md={7}>
                          <p style={{ fontWeight: 'bold' }}>{item?.url}</p>
                        </Col>
                        <Col md={2}>
                          {utm?.length - 1 == index &&
                            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                              <Button type="button" color={"primary"} style={{}} onClick={() => addMore()}>
                                + Add More UTM
                              </Button>
                            </div>
                          }
                        </Col>
                      </Row>
                    )
                  })}
                  {utmInput &&
                    <AvForm onValidSubmit={handleValidUtm}>
                      <Row style={{ alignItems: 'flex-end', marginTop: 20 }}>
                        <Col md={3}>
                          <AvField
                            name="bankId"
                            label="Bank"
                            type="select"
                            required
                          >
                            <option value="">Select Bank</option>
                            {banks?.map((item) => {
                              return (
                                <option value={item?._id}>{item?.name}</option>
                              )
                            })}
                          </AvField>
                        </Col>
                        <Col md={7}>
                          <AvField
                            name="url"
                            label="url"
                            type="url"
                            required
                          >
                          </AvField>
                        </Col>
                        <Col md={2}>
                          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Button type="submit" color={"primary"} style={{}}>
                              Add
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </AvForm>
                  }
                </>
              }
              {!data?.isAdminApproved &&
                <div style={{ width: '94%', textAlign: 'right', marginTop: 40 }}>
                  <Button type="button" color={"primary"} style={{ width: '20%' }} onClick={() => handleApprove()}>
                    Approve
                  </Button>
                </div>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    </React.Fragment >
  )
}

UserDetail.propTypes = {

}

const mapStatetoProps = state => {
  const { user } = state.Profile;
  return { user }
}

export default withRouter(
  connect(mapStatetoProps, {})(UserDetail)
)
