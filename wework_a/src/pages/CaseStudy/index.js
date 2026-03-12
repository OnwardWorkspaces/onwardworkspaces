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


import * as Utils from "../../Utils";
import Table from './Table';
// import Loader from "../../components/Loader";
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const CaseStudy = props => {
  const user = useSelector(state => state.user);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <Header />
      <div className="main main-app p-3 p-lg-4">
        <Card>
          <CardBody>
            <Table
              role={"Case Study"}
              user={user}
              history={props.history}
              loading={loading}
              setLoading={setLoading}
            />
          </CardBody>
        </Card>
        <Footer />
      </div>
    </React.Fragment>
  )
}



export default CaseStudy;