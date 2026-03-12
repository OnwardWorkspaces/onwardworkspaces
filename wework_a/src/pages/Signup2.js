import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { post } from "../helper/api_helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import bg1 from "../assets/img/bg1.jpg";

export default function Signup2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = () => {
    post("register", formData)
      .then(res => {
        if (res?.statusCode === 200) {
          navigate("/verify");
        } else {
          toast.error(res?.error || "Signup failed.");
        }
      })
      .catch(err => {
        console.error("Signup error:", err);
        toast.error("Something went wrong. Please try again.");
      });
  };


  return (
    <div className="page-sign d-block py-0">
      <Row className="g-0">
        <Col md="7" lg="5" xl="4" className="col-wrapper">
          <Card className="card-sign">
            <Card.Header>
              <Link to="/" className="header-logo mb-5">dashbyte</Link>
              <Card.Title>Sign Up</Card.Title>
              <Card.Text>It's free to signup and only takes a minute.</Card.Text>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-3">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-4">
                <small>By clicking <strong>Create Account</strong> below, you agree to our terms of service and privacy statement.</small>
              </div>
              <Button variant="primary" className="btn-sign" onClick={handleSubmit}>Create Account</Button>

              <div className="divider"><span>or sign up using</span></div>

              <Row className="gx-2">
                <Col><Button variant="" className="btn-facebook"><i className="ri-facebook-fill"></i> Facebook</Button></Col>
                <Col><Button variant="" className="btn-google"><i className="ri-google-fill"></i> Google</Button></Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              Already have an account? <Link to="/pages/signin2">Sign In</Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col className="d-none d-lg-block">
          <img src={bg1} className="auth-img" alt="" />
        </Col>
      </Row>
    </div>
  );
}
