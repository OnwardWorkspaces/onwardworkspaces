import React, { useEffect, useState } from "react";
// import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap"
// import "./datatables.scss";
// import '../Icons/IconFontawesome';

import * as Utils from '../../Utils';
import { post, get, put } from "../../helper/api_helper";
import DeleteModal from './DeleteModal';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { AvField, AvForm } from "availity-reactstrap-validation";
import { useSelector } from "react-redux";
// import './Card.scss';

const Table = (props) => {
  const user = useSelector(state => state.user);
  const { role, currentData, from, setCurrentData } = props;
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userType, setUserType] = useState('users');

  useEffect(() => {
    console.log('props on user table', props)
    if (user && userType != "") {
      getData();
    }
  }, [user, userType]);

  const getData = () => {
    let url = "user/admin";
    get(url, { token: user?.token })
      .then(json => {
        // console.log('response from get project list', json);
        if (json?.statusCode == 200) {
          setData(json?.data);
        }
      })
      .catch(error => {
        console.log('error while getting project list', error);
      })
  }

  useEffect(() => {
    setColumns([
      {
        name: 'Name',
        selector: row => row?.name,
      },
      {
        name: 'Email',
        selector: row => row?.email,
      },
      {
        name: 'Last Active',
        selector: row => row?.lastActive,
      },
      {
        name: 'Created At',
        selector: row => row.createdAt,
      },
      {
        cell: (row) => <>
          {/* <Button onClick={() => props?.history.push(`/user/detail/` + row?._id, { state: { type: path } })}
            title={"View in details"}
            style={{ backgroundColor: user?.company?.theme ? user?.company?.theme : Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="mdi mdi-eye" style={{ fontSize: 20 }}></span></Button> */}
          <>
            <Button onClick={() => handleUpdateProj(row)}
              title={"Edit"}
              style={{ backgroundColor: user?.company?.theme ? user?.company?.theme : Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="ri-edit-fill" style={{ fontSize: 20 }}></span></Button>
            <Button onClick={() => handleDeleteProj(row, 'user')}
              title={"Ban"}
              style={{ backgroundColor: user?.company?.theme ? user?.company?.theme : Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="ri-delete-bin-6-line" style={{ fontSize: 20 }}></span></Button>
          </>
        </>,
        name: 'Action',
        ignoreRowClick: true,
        // allowOverflow: true,
        // button: true,
      },
    ]);
  }, [data]);

  const handleUpdateProj = (proj) => {
    console.log('updating proj', proj);
    props?.setCurrentData(proj);
    props.add(true);
  }

  const handleUpdateStatus = (item) => {
    console.log('updating proj', item);
    setCurrentData({ ...item, actionType: 'Status' });
    setDeleteModal(true);
  }

  const handleDeleteProj = (proj, type) => {
    console.log('updating proj', proj);
    props?.setCurrentData({ ...proj, actionType: 'Delete', type: type });
    setDeleteModal(true);
  }

  const onDelete = () => {
    console.log('deleted', currentData);
    let body = {
      userId: currentData?._id,
      token: user?.token
    }
    let url = "/user/delete";
    if (currentData?.type == 'query') {
      body = { ...body, queryId: currentData?._id };
    }
    post(url, body)
      .then(json => {
        console.log('response from on click action', json);
        if (json.statusCode == 200) {
          toast.success(json?.message);
          getData();
          setDeleteModal(false);
          props?.setCurrentData(null);
        } else {
          toast.error(json?.error);
        }
      })
      .catch(error => {
        console.error('error while deleting user', error);
      })
  }

  return (
    <React.Fragment>
      <div className="">
        <Row>
          <DeleteModal
            show={deleteModal}
            onDeleteClick={() => onDelete()}
            onCloseClick={() => setDeleteModal(false)}
            data={currentData}
          />
          <Col className="col-12">
            <div className="d-flex" style={{ marginLeft: 'auto', marginBottom: 30 }}>
              <div>
                <CardTitle className="h4">{props.role}</CardTitle>
                <CardSubtitle className="mb-3">
                  {role} Added Before, All the <code>Users</code> will also be able perform <code>actions</code> As per given <code>permissions.</code>
                </CardSubtitle>
              </div>
              <div className="text-center" style={{ marginLeft: 'auto' }}>
                <Button style={{ backgroundColor: Utils.themeColor, border: 'none' }} onClick={() => props?.add(true)}>
                  Add
                </Button>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={data}
              pagination
              customStyles={{
                headCells: {
                  style: {
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                    maxWidth: 80
                  },
                },
                cells: {
                  style: {
                    maxWidth: 50
                  }
                }
              }}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}
export default Table;
