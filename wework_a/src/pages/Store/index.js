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

// availity-reactstrap-validation

// Redux
import { connect, useSelector } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
// import Breadcrumb from "../../components/Common/Breadcrumb";
import Utils from '../../Utils'

// import avatar from "../../assets/images/companies/img-4.png"
import Table from './Table';
import Header from '../../layouts/Header'
// import Loader from "../../components/Loader";
// import Single from './Single';

const ImageStore = props => {
  const user = useSelector(state => state.user);
  const [isTable, setIsTable] = useState(true);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState("bank");
  const [singleId, setSingleId] = useState(null);
  // console.log('props on company', props);

  useEffect(() => {
    if (props.location) {
      console.log('path on opportunities', props.location.pathname.split("/"));
      const path = props.location.pathname;
      if (path.split("/").length > 1) {
        const id = path.split("/")[2];
        if (id) {
          setSingleId(id);
          setIsTable(false);
        }
      } else {
        setIsTable(true);
      }
    }
  }, [props]);

  return (
    <React.Fragment>
      <div className="main main-app p-3 p-lg-4">
        <Header />
        {/* <Loader visible={loading} /> */}
        {/* Render Breadcrumb */}
        {/* <Breadcrumb title={Utils.projectName} breadcrumbItem="Image Store" /> */}
        {/* <Card>
          <CardBody> */}
        <Table
          role={"Images"}
          path={path}
          user={user}
          history={props.history}
          setLoading={setLoading}
          setIsTable={setIsTable}
          setSingleId={setSingleId}
        />
        {/* </CardBody>
        </Card> */}
      </div>
    </React.Fragment>
  )
}

export default ImageStore;
