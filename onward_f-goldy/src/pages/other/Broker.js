import React, { useEffect, useRef, useState } from 'react'
import {
    Row,
    Col,
} from "reactstrap"
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link, useNavigate } from 'react-router-dom';
import { get, post } from '../../helpers/helper_api';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';


export default function Broker() {
    const navigate = useNavigate();
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(undefined);

    useEffect(() => {
        if (!loading) {
            setLoading(true);
            get("broker/form_image")
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setData(res?.data);
                    } else {
                        toast.error(res?.error);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    toast.error("Something Went Wrong!");
                    console.log("Error while getting partnership", err);
                })
        }
    }, []);

    const handleValidSubmit = (e, v) => {
        if (!loading) {
            setLoading(true);
            let body = {
                ...v,
            }
            post("broker", body)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        form?.current?.reset();
                        // toast?.success(res?.message);
                        setTimeout(() => {
                            navigate('/thank-you', {
                                state: { isThankuPage: true }
                            });
                        }, 500)
                    } else {
                        toast?.error(res?.error);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    toast.error("Something Went Wrong!");
                    console.log("Error while submitting broker form", err);
                });
        }
    }

    return (
        <>
            {data?.brokerSeo ?
                <Helmet>
                    {ReactHtmlParser(data?.brokerSeo)}
                </Helmet>
                : null}
            <section className='inner-banner'>
                <img src={require('../../assets/images/listing-banner.png')} alt='banner' />
                <div className='inner-banner-content-two top bottom padding-left-right'>
                    <h1 className='heading'>Partner</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Partner</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className="requirement-section top bottom padding-left-right">
                <div className='cotent-section top contact_us_form '>
                    <Row>
                        <Col className='order_2' lg={6}>
                            <div className='left-section left-section_about contect-form get_form form-section'>
                                <AvForm onValidSubmit={handleValidSubmit} ref={form}>
                                    <Row>
                                        <Col lg={6}>
                                            <div className='form_field'>
                                                <AvField type="text" name="name" placeholder=" Name" required />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='form_field'>
                                                <AvField type="email" name="email" placeholder="Email" required />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='form_field'>
                                                <AvField type="number" name="mobile" placeholder="Enter Mobile  Number" required />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='form_field'>
                                                <AvField type="text" name="city" placeholder="city" required />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='form_field'>
                                                <AvField type="text" name="location" placeholder="location" required />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className='form_field'>
                                                <AvField type="text" name="area" placeholder="area size(Sq ft)" required />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className='form_field'>
                                                <AvField type="text" name="floor" placeholder="floors" required />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className='form_field'>
                                                <AvField type="textarea" name="message" row={6} placeholder="Enter Your Message" required />
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <button className='button_2' type='submit'>SUBMIT</button>
                                        </Col>
                                    </Row>
                                </AvForm>
                            </div>
                        </Col>
                        <Col className='order_1' lg={6}>
                            <div className='right-section'>
                                <img src={data?.brokerImage ? data?.brokerImage : require('../../assets/images/item-i.png')} alt='broker form image' style={{ borderRadius: 20 }} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}


