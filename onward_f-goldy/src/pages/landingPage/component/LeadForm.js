import { AvField, AvForm } from 'availity-reactstrap-validation'
import React from 'react'
import { Col, Row } from 'reactstrap'

export default function LeadForm() {
    return (
        <section className="requirement-section top_0 bottom_0 padding-left-right" id="connect">
            <div className='cotent-section requirement-form-section'>
                <Row>

                    <Col lg={6}>
                        <div className='right-section'>
                            <img src={require('../../../assets/images/form-img.png')} alt='form-img' />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='left-section get_form'>
                            <h4 className='heading requirement-heading'>Discuss you requirements with our expert</h4>
                            <p className='paragraph'>Whether you have questions about membership options, need assistance with technical aspects, or want to explore customization possibilities for your workspace, our experts are here to provide you with personalized guidance and solutions.</p>
                            <AvForm className="requirement-form">
                                <h3>Get started for free</h3>
                                <div className='mb-3'>
                                    <AvField
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <AvField type="email" name="email" placeholder="Enter Your Email Id" required />
                                </div>
                                <div className='mb-3'>
                                    <AvField type="number" name="mobile" placeholder="Enter Your Mobile Number" required />
                                </div>
                                <div className='mb-3'>
                                    <AvField type="textarea" name="message" rows={4} placeholder="Enter Your Message" required />
                                </div>
                                <button className='button_2'>SUBMIT</button>
                            </AvForm>

                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    )
}
