import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
} from "reactstrap"
import * as Utils from '../../Utils';
import AddUserForm from './AddUserForm';
import Header from '../../layouts/Header';
// import Loader from "../../components/Loader";
import Table from "./Table";

const SubAdmin = props => {
  const { user } = props;
  const [isAddForm, setIsAddForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState("");
  // console.log('props on company', props);

  useEffect(() => {
    if (props.location) {
      // console.log('path on opportunities', props.location.pathname.split("/"));
      const path = props.location.pathname;
      if (path.split("/").length > 1) {
        const role = path.split("/")[2];
        if (role) {
          setPath(role);
        }
      }
    }
  }, [props]);

  return (
    <React.Fragment>
      <Header />
      <div className="main main-app p-3 p-lg-4">
        {/* <Loader visible={loading} /> */}
        {/* Render Breadcrumb */}
        {/* <Breadcrumb title={Utils.projectName} breadcrumbItem="Sub-Admin" /> */}
        {isAddForm ?
          <AddUserForm
            role={"Sub-Admin"}
            user={user}
            data={currentUser}
            close={setIsAddForm}
            loading={loading}
            setLoading={setLoading}
            setCurrentUser={setCurrentUser}
          />
          : <Card>
            <CardBody>
              <Table
                role={"Sub-Admin"}
                path={path}
                user={props?.user}
                add={setIsAddForm}
                currentData={currentUser}
                setCurrentData={setCurrentUser}
                getProfile={props?.getProfile}
                updateCompany={props?.updateCompany}
                history={props.history}
              />
            </CardBody>
          </Card>
        }
      </div>
    </React.Fragment>
  )
}

export default SubAdmin;
