import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { post } from "../helper/api_helper";
import { toast } from "react-toastify";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Signin2() {
  const dispetch = useDispatch();
  const navigate = useNavigate();

  const handleValidSubmit = (e, v) => {
    post("login", v)
      .then(res => {
        if (res?.statusCode == 200) {
          localStorage.setItem("user", JSON.stringify(res?.data));
          dispetch(setUser(res?.data));
          navigate("/");
        } else {
          toast.error("" + res?.error);
        }
      })
      .catch(err => {
        console.error("error while login", err);
        toast.error("Something Went wrong!");
      })
  }

  return (
    <div className="page-sign d-block py-0">
      <Row className="g-0">
        <Col md="7" lg="5" xl="4" className="col-wrapper">
          <Card className="card-sign">
            <Card.Header>
              <Link to="/" className="header-logo mb-5">
                <img src={require("../assets/images/logo.png")} className="login-logo" />
              </Link>
              <Card.Title>Sign In</Card.Title>
              <Card.Text>Welcome back! Please signin to continue.</Card.Text>
            </Card.Header>
            <Card.Body>
              <AvForm onValidSubmit={handleValidSubmit}>
                <div className="mb-4">
                  <AvField
                    name="email"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="mb-4">
                  <AvField
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" className="btn-sign">Sign In</Button>
                {/* <div className="divider"><span>or sign in with</span></div>

                <Row className="gx-2">
                  <Col><Button variant="" className="btn-facebook"><i className="ri-facebook-fill"></i> Facebook</Button></Col>
                  <Col><Button variant="" className="btn-google"><i className="ri-google-fill"></i> Google</Button></Col>
                </Row> */}
              </AvForm>
            </Card.Body>
            {/* <Card.Footer>
              Don't have an account? <Link to="/pages/signup2">Create an Account</Link>
            </Card.Footer> */}
          </Card>
        </Col>
        <Col className="d-none d-lg-block">
          <img src={require("../assets/images/onwards.jpg")} className="auth-img" alt="" />
        </Col>
      </Row>
    </div>
  )
}