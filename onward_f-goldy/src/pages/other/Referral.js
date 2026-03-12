import React, { useEffect } from 'react'
import {
    Row,
    Col,
    Card,
    Alert,
    CardBody,
    Media,
    Table,
    CardTitle,
    Button
} from "reactstrap"
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
export default function Referral() {


    useEffect(() => {

        window.scrollTo(0, 0);
      }, [])

    return (
        <>
            <section className='inner-banner'>
                <img src={require('../../assets/images/listing-banner.png')} alt='banner' />
                <div className='inner-banner-content-two top bottom padding-left-right'>
                    <h1 className='heading'>Referral</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Referral</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className="top contact_us_form top bottom padding-left-right">
                <div className='programme'>
                    <h4 className='heading text-center'>Refer Your Associate</h4>
                </div>
                <div className='cotent-section top contact_us_form'>
                    <Row>
                        <Col className='order_2' lg={8}>
                            <div className='left-section contect-form form-section'>
                                {/* <h4 className='heading requirement-heading mb-4'>Partner with us</h4> */}
                                <AvForm >
                                    <Row>
                                        <Col lg={6}>
                                            <Col>
                                                <div className='form_field'>
                                                    <h6> Your Information</h6>
                                                    
                                                    <AvField type="text" name="name" placeholder=" Name" required />
                                                </div>
                                            </Col>

                                            <Col>
                                                <div className='form_field'>
                                                
                                                    <AvField type="number" name="mobile" placeholder=" Mobile Number " required />
                                                </div>
                                            </Col>


                                            <Col>
                                                <div className='form_field'>
                                            
                                                    <AvField type="email" name="email" placeholder="Email" required />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='form_field'>
                                                    <div className='cowering'>
                                                        <p>Co-working Space</p>
                                                    </div>

                                                    <AvField type="text" name="-select-"  placeholder="-Select-" required />
                                                </div>
                                            </Col>
                                        </Col>

                                        <Col lg={6}>
                                            
                                            <Col>
                                                <div className='form_field'>
                                                    <h6> Referral Information</h6>
                                                    
                                                    <AvField type="text" name="name" placeholder="Name" required />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='form_field'>
                                                
                                                    <AvField type="number" name="mobile" placeholder="Mobile Number" required />
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='form_field'>
                                                
                                                    <AvField type="email" name="email" placeholder="Email" required />
                                                </div>
                                            </Col>
                                            <div className='form_field'>
                                                <div className='cowering'>
                                                    <p>Prefferd City</p>
                                                </div>
                                                <AvField type="text" name="-select-" placeholder="-Select-" required />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <button className='button_2 summit-2' type='submit'>SUBMIT</button>
                                        </Col>
                                    </Row>
                                </AvForm>
                            </div>

                        </Col>
                        <Col className='order_1' lg={4}>
                            <div className='right-section '>
                                <img src={require('../../assets/images/unsplash_XfC8MMTiEfw.png')} alt='unsplash_XfC8MMTiEfw' />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className='refer-section top-0 bottom-0 padding-left-right'>
                <div className='container-fluid mt-3'>
                    <div className='programme'>
                        <h4 className='heading'>How to refer and earn</h4>
                    </div>
                    <Row className='associate  '>
                        <Col lg={4}>
                            <div className='reward '>
                                <div className='slider-item earn-box '>

                                    <div className='card_box'>
                                        <span className='re-card'>Step-2</span>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>



                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='reward'>
                                <div className='slider-item earn-box '>

                                    <div className='card_box'>
                                        <span className='re-card'>Step-2</span>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>

                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='reward'>
                                <div className='slider-item earn-box'>

                                    <div className='card_box'>
                                        <span className='re-card'>Step-2</span>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>



                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>
            </section>
            <section className='counter-section top bottom-0 padding-left-right'>
                <div className='programme'>
                    <h4 className='heading'> How Referral Programming Works</h4>
                </div>
                <div className='counter-box seats-box'>

                    <ul>
                        <li>
                            <div className='seat'>
                                <div className='img-seat-box'>
                                    <img src={require('../../assets/images/about.png')} alt="" />
                                </div>
                            </div>
                            <p>Cities</p>
                        </li>
                        <li>
                            <div className='seat'>
                                <div className='img-seat-box'>
                                    <img src={require('../../assets/images/about.png')} alt="" />
                                </div>
                            </div>
                            <p>Location</p>
                        </li>
                        <li>
                            <div className='seat'>
                                <div className='img-seat-box'>
                                    <img src={require('../../assets/images/about.png')} alt="" />
                                </div>
                            </div>
                            <p>Members</p>
                        </li>
                        <li>
                            <div className='seat'>
                                <div className='img-seat-box'>
                                    <img src={require('../../assets/images/about.png')} alt="" />
                                </div>
                            </div>
                            <p>Sq. ft</p>
                        </li>
                        <li>
                            <div className='seat'>
                                <div className='img-seat-box'>
                                    <img src={require('../../assets/images/about.png')} alt="" />
                                </div>
                            </div>
                            <p>Sq. ft</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='terms-section top bottom padding-left-right'>
                <div className='container-fluid mt-3'>
                    <div className='programme'>
                        <h4 className='heading'> Terms and Conditions</h4>
                    </div>

                    <div className='conditions'>
                        <ul>
                            <li>
                                <p>The referral must not be registered in our system already. </p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>The referral must not be registered in our system already. </p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>The referral must not be registered in our system already. </p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>The referral must not be registered in our system already. </p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>The referral must not be registered in our system already. </p>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <p>The referral must not be registered in our system already. </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>

    )
}
