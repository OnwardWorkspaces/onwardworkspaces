import React from 'react'
import { Col, Row } from 'reactstrap'

export default function Why() {
    
    return (
        <section className='full-section top bottom'>
            <div className='revolutionise-section'>
                <div className='heading-title'>
                    <h3 className='heading text-center revolutionise bg-red'>Revolutionise Your Workspace.</h3>
                    <p className='paragraph text-center'>Whether you have questions about membership options, need assistance with technical aspects, or want to explore customization possibilities<br /> for your workspace, our experts are here to provide you with personalized guidance and solutions.</p>
                    <a href='#connect' className='text-decoration-none'>
                        <button className='button_2'>Let’s Connect</button>
                    </a>
                </div>
                <div className='revo-card-section padding-left-right'>
                    <Row>
                        <Col lg={3} md={4} sm={6}>
                            <div className='revo-card-box revo_card_box active'>
                                <div className='icon-box'>
                                    <img style={{width:'80px'}} src="https://onwardwork.s3.ap-south-1.amazonaws.com/onward/Home/1705313830743.svg" alt='' />
                                </div>
                                <h4>Mohan Estate</h4>
                                <p>coworking in Mohan cooperative</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </section>
    )
}
