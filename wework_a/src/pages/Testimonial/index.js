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
import Table from './Table';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const Testimonial = props => {
  const { user } = props;
  const [isAddForm, setIsAddForm] = useState(false);
  const [isTable, setIsTable] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState("bank");
  // console.log('props on company', props);

  return (
    <React.Fragment>
      <Header />
      <div className="main main-app p-3 p-lg-4">
        <Table
          role={"Testimonial"}
          path={path}
          user={props?.user}
          history={props.history}
          setLoading={setLoading}
        />
      <Footer />
      </div>
    </React.Fragment>
  )
}

export default Testimonial;