import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'

export default function Area() {
    return (
        <section className='onward-workspaces-offerings top_0 bottom_0 padding-left-right'>
            <div className='workspaces-slider'>
                <div className='heading-title'>
                    <h3 className='heading text-center workspaces'>Explore By Area</h3>
                    <p className='paragraph'>Alluring properties in dazzling Ahmedabad are waiting for highly discerning tastes under various categories and fascinating<br /> locations listed here.​</p>
                </div>
                <div className='explore-section'>
                    <Row>

                        <Col lg={6} md={12}>
                            <Link to="#/">
                                <div className='thumb-image-box'>
                                    <img src={require('../../../assets/images/item-i.png')} alt="" />
                                    <div className='explore-conetn'>
                                    <h4>Delhi</h4>
                                    </div>
                                </div>
                            </Link>
                        </Col>


                        <Col lg={6} md={12}>
                            <Link to="#/">
                                <div className='thumb-image-box'>
                                    <img src={require('../../../assets/images/item-i.png')} alt="" />
                                    <div className='explore-conetn'>
                                        <h4>Delhi</h4>
                                    </div>
                                </div>
                            </Link>
                        </Col>


                        <Col lg={4} md={12}>
                            <Link to="#/">
                                <div className='thumb-image-box thumb_image_box'>
                                    <img src={require('../../../assets/images/item-i.png')} alt="" />
                                    <div className='explore-conetn'>
                                    <h4>Delhi</h4>
                                    </div>
                                </div>
                            </Link>
                        </Col>

                        <Col lg={4} md={12}>
                            <Link to="#/">
                                <div className='thumb-image-box thumb_image_box'>
                                    <img src={require('../../../assets/images/item-i.png')} alt="" />
                                    <div className='explore-conetn'>
                                    <h4>Delhi</h4>
                                    </div>
                                </div>
                            </Link>
                        </Col>

                        <Col lg={4} md={12}>
                            <Link to="#/">
                                <div className='thumb-image-box thumb_image_box'>
                                    <img src={require('../../../assets/images/item-i.png')} alt="" />
                                    <div className='explore-conetn'>
                                    <h4>Delhi</h4>
                                    </div>
                                </div>
                            </Link>
                        </Col>

                    </Row>
                </div>
            </div>
        </section>
    )
}
