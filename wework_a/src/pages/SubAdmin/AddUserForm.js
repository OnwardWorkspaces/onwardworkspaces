import React, { useState, useEffect } from "react"

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Alert,
  Label,
  Input,
  Button
} from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"
import { post, put, get } from '../../helper/api_helper';
import * as Utils from '../../Utils';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
// import Loader from "../../components/";

const AddUserForm = (props) => {
  const user = useSelector(state => state.user);
  const { data, role, loading, setLoading } = props;
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isError, setIsError] = useState(false);
  const [selectedProj, setSelectedProj] = useState([]);
  const [isPassShow, setIsPassShow] = useState(false);
  const [permissions, setPermissions] = useState([
    { clientale: { read: false, write: false, update: false, delete: false } },
    { testimonial: { read: false, write: false, update: false, delete: false } },
    { city: { read: false, write: false, update: false, delete: false } },
    { location: { read: false, write: false, update: false, delete: false } },
    { category: { read: false, write: false, update: false, delete: false } },
    { propertyAmenities: { read: false, write: false, update: false, delete: false } },
    { properties: { read: false, write: false, update: false, delete: false } },
    { office: { read: false, write: false, update: false, delete: false } },
    { blog: { read: false, write: false, update: false, delete: false } },
  ]);

  useEffect(() => {
    if (data?.permissions?.length > 0)
      setPermissions(data?.permissions);
  }, [data]);

  async function handleValidSubmit(event, values) {
    console.log('values from form', values);
    if (user?.token) {
      if (data) {
        const body = {
          ...values,
          token: user?.token,
          userId: data?._id,
          permissions
        };
        setLoading(true);
        let url = "user/update";
        put(url, body)
          .then((json) => {
            console.log('response from updating user', json);
            setLoading(false);
            if (json.statusCode == 200) {
              toast.success(json?.message);
              props.close(false);
            } else {
              toast.error(json?.error);
            }
          })
          .catch(error => {
            console.error('error while adding user', error);
            toast.error('Something Went Wrong!');
            setLoading(false);
          })
      } else {
        //adding new user
        const body = {
          ...values,
          permissions,
          role: "Sub",
          isEmailVerified: true,
          token: user?.token
        };
        let url = "user/add";
        setLoading(true);
        post(url, body)
          .then((json) => {
            console.log('response from adding user', json);
            setLoading(false);
            if (json.statusCode == 200) {
              toast.success(json?.message);
              props.close(false);
            } else {
              toast.error(json?.error);
            }
          })
          .catch(error => {
            console.error('error while adding user', error);
            toast.error('Something Went Wrong!');
            setLoading(false);
          })
      }
    } else
      toast.error("Unauthorized!");
  }

  const handleChangeToggle = (index, val) => {
    let temp = Object.assign([], permissions);
    if (val == 'read') {
      temp[index][Object.keys(temp[index])[0]].read = !temp[index][Object.keys(temp[index])[0]].read;
      temp[index][Object.keys(temp[index])[0]].write = false;
      temp[index][Object.keys(temp[index])[0]].update = false;
      temp[index][Object.keys(temp[index])[0]].delete = false;
    }
    if (val == 'add') {
      if (!temp[index][Object.keys(temp[index])[0]].write)
        temp[index][Object.keys(temp[index])[0]].read = true;
      temp[index][Object.keys(temp[index])[0]].write = !temp[index][Object.keys(temp[index])[0]].write;
    }
    if (val == 'edit') {
      if (!temp[index][Object.keys(temp[index])[0]].update)
        temp[index][Object.keys(temp[index])[0]].read = true;
      temp[index][Object.keys(temp[index])[0]].update = !temp[index][Object.keys(temp[index])[0]].update;
    }
    if (val == 'delete') {
      if (!temp[index][Object.keys(temp[index])[0]].delete)
        temp[index][Object.keys(temp[index])[0]].read = true;
      temp[index][Object.keys(temp[index])[0]].delete = !temp[index][Object.keys(temp[index])[0]].delete;
    }
    setPermissions(temp);
  }

  function camelCaseToTitleCase(camelCase) {
    // Use a regular expression to find and replace capital letters with spaces
    const titleCase = camelCase.replace(/([A-Z])/g, ' $1');
    // Make the first character capitalized (optional)
    return titleCase.charAt(0).toUpperCase() + titleCase.slice(1);
  }

  return (
    <React.Fragment>
      <div className="">
        <Row>
          <Col>
            <Card>
              <CardBody>
                {/* <Loader loading={loading} /> */}
                <div className="">
                  <div className="d-flex" style={{ marginLeft: 'auto' }}>
                    <div>
                      <CardTitle className="h4">{data ? 'Update' : 'Add New'} {props?.role}</CardTitle>
                      <p className="card-title-desc">
                        This <code>Sub-Admin</code> can login as Admin and manage the thing as per your given <code>permissions.</code>
                      </p>
                    </div>
                    <div className="text-center" style={{ marginLeft: 'auto' }}>
                      <Button color="primary" onClick={() => { props?.setCurrentUser(null); props?.close(false) }} style={{ backgroundColor: Utils.themeColor }}>
                        Close
                      </Button>
                    </div>
                  </div>
                  <AvForm
                    className="form-horizontal"
                    onValidSubmit={(e, v) => {
                      handleValidSubmit(e, v)
                    }}
                  >
                    <Row>
                      <Col md={4}>
                        <div className="form-group mb-4">
                          <AvField
                            name="name"
                            label={"Name"}
                            value={data?.name}
                            className="form-control"
                            placeholder={`Enter Name`}
                            type="text"
                            required
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="form-group mb-4">
                          <AvField
                            name="email"
                            label={"Email"}
                            value={data?.email}
                            className="form-control"
                            placeholder={`Enter Email`}
                            type="email"
                            required
                            disabled={data ? true : false}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        {!data &&
                          <div className="form-group" style={{ position: 'relative' }}>
                            <AvField
                              name="password"
                              label={"Password"}
                              value={data?.password}
                              className="form-control"
                              placeholder={`Enter Password`}
                              type={isPassShow ? "text" : "password"}
                              required
                              validate={{ minLength: { value: 6 } }}
                            />
                            <i className={`mdi ${isPassShow ? 'mdi-eye-off' : 'mdi-eye'}`} style={{ fontSize: 20, position: 'absolute', top: 34, right: 30, cursor: 'pointer' }}
                              onClick={() => setIsPassShow(!isPassShow)}
                            ></i>
                          </div>
                        }
                      </Col>
                    </Row>
                    <Row className="mt-5 px-5">

                      <table className="table">
                        <thead>
                          <tr>
                            <th>Screen Name</th>
                            <th>View</th>
                            <th>Add</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {permissions?.map((item, index) => (
                            <tr className="permission-row">
                              <td style={{ fontWeight: 'bold' }}>
                                {camelCaseToTitleCase(Object.keys(item)[0])}
                              </td>
                              <td>
                                <div className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    className="toggle-switch-checkbox"
                                    name="toggleSwitch"
                                    id={Object.keys(item)[0] + "read"}
                                    onChange={(e) => handleChangeToggle(index, 'read')}
                                    checked={item[Object.keys(item)[0]]?.read}
                                  />
                                  <label className="toggle-switch-label" htmlFor={Object.keys(item)[0] + "read"}>
                                    <span className="toggle-switch-inner" />
                                    <span className="toggle-switch-switch" />
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    className="toggle-switch-checkbox"
                                    name="toggleSwitch"
                                    id={Object.keys(item)[0] + "add"}
                                    onChange={(e) => handleChangeToggle(index, 'add')}
                                    checked={item[Object.keys(item)[0]]?.write}
                                  />
                                  <label className="toggle-switch-label" htmlFor={Object.keys(item)[0] + "add"}>
                                    <span className="toggle-switch-inner" />
                                    <span className="toggle-switch-switch" />
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    className="toggle-switch-checkbox"
                                    name="toggleSwitch"
                                    id={Object.keys(item)[0] + "edit"}
                                    onChange={(e) => handleChangeToggle(index, 'edit')}
                                    checked={item[Object.keys(item)[0]]?.update}
                                  />
                                  <label className="toggle-switch-label" htmlFor={Object.keys(item)[0] + "edit"}>
                                    <span className="toggle-switch-inner" />
                                    <span className="toggle-switch-switch" />
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="toggle-switch">
                                  <input
                                    type="checkbox"
                                    className="toggle-switch-checkbox"
                                    name="toggleSwitch"
                                    id={Object.keys(item)[0] + "delete"}
                                    onChange={(e) => handleChangeToggle(index, 'delete')}
                                    checked={item[Object.keys(item)[0]]?.delete}
                                  />
                                  <label className="toggle-switch-label" htmlFor={Object.keys(item)[0] + "delete"}>
                                    <span className="toggle-switch-inner" />
                                    <span className="toggle-switch-switch" />
                                  </label>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Row>
                    {/* <AvField name="idx" value={user?.company._id} type="hidden" /> */}
                    <div className="text-center mt-4">
                      {data ?
                        <Button type="submit" color="primary" style={{ backgroundColor: user?.company?.theme ? user?.company?.theme : Utils.themeColor }}>
                          Update {props.role}
                        </Button>
                        :
                        <Button type="submit" color="primary" style={{ backgroundColor: user?.company?.theme ? user?.company?.theme : Utils.themeColor }}>
                          Add {props.role}
                        </Button>
                      }
                    </div>
                  </AvForm>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default AddUserForm;
