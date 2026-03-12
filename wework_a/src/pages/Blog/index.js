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
import Single from './Single';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const Hotels = props => {
  const user = useSelector(state => state.user);
  const [isTable, setIsTable] = useState(true);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState("bank");
  const [singleId, setSingleId] = useState(null);
  // console.log('props on company', props);

  useEffect(() => {
    if (props.location) {
      // console.log('path on opportunities', props.location.pathname.split("/"));
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
      <Header />

      <div className="main main-app p-3 p-lg-4">

        <Card>
          <CardBody>
            {isTable ?
              <Table
                role={"Blog"}
                path={path}
                user={user}
                history={props.history}
                loading={loading}
                setLoading={setLoading}
                setIsTable={setIsTable}
                setSingleId={setSingleId}
              />
              :
              <Single
                singleId={singleId}
                user={props?.user}
                setIsTable={setIsTable}
                loading={loading}
                setLoading={setLoading}
              />
            }
          </CardBody>
        </Card>
        <Footer />
      </div>

    </React.Fragment>
  )
}



export default Hotels