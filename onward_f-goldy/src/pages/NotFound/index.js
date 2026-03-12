import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

export default function NotFound() {

    return (
        <div className="page-error">
           
            <div className="content">
                <Container>
                    <Row className="gx-5">
                        <Col lg="12">
                            <div className='error-img-box'>
                                <img src={require('../../assets/images/404-1.jpg')} />
                            </div>
                        </Col>
                        <Col lg="12" className="d-flex flex-column align-items-center">
                          
                            <h2 className="error-title">Page Not Found</h2>
                            <p className="error-text">Oopps. The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved.</p>
                            <Link to="/" className="btn button_2 btn-error">Back to Dashboard</Link>
                        </Col>

                    </Row>
                </Container>
            </div>
        </div>
    )
}