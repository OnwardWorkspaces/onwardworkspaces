
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

export default function Partnerships() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const [field, setField] = useState([]);
    const formRef = useRef();

    useEffect(() => {

        window.scrollTo(0, 0);
      }, [])

    useEffect(() => {
        if (!loading) {
            setLoading(true);
            get("partner")
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setData(res?.data);
                        if (res?.data?.form?.length)
                            if (res?.data?.form[0]?.field?.length)
                                setField(res?.data?.form[0]?.field);
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

    const handleFieldInput = (i, val) => {
        let temp = Object.assign([], field);
        temp[i].value = val;
        setField(temp);
    }

    const handleValidSubmit = (e, v) => {
        if (!loading) {
            setLoading(true);
            post("partner/form", {
                form: field
            })
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        // toast.success(res?.message);
                        formRef.current.reset();
                        setTimeout(()=>{
                            navigate('/thank-you', {
                                state: { isThankuPage: true }
                            });
                          },500)
                    } else {
                        toast.error(res?.erorr);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    toast.error("Something Went Wrong!");
                    console.log("Error while submitting partnership form", err);
                })
        }
    }

    return (
        <>
            {data?.seo ?
                <Helmet>
                    {ReactHtmlParser(data?.seo)}
                </Helmet>
            :null}
            <section className='inner-banner'>
                <img src={require('../../assets/images/listing-banner.png')} alt='banner' />
                <div className='inner-banner-content-two top bottom padding-left-right'>
                    <h1 className='heading'>Partnerships</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Partnerships</li>
                        </ol>
                    </nav>
                </div>
            </section>
            {data?.benefit?.length ?
                <section className='onward-workspaces-offerings top gallery_section bottom padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h4 className='heading text-center  gallery_slider_heading who_we_are mb-4'>{data?.pointTitle}</h4>
                        </div>
                        <div className='who-card-section'>
                            <Row style={{ justifyContent: 'center' }}>
                                {data?.benefit?.map((item) => (
                                    <Col lg={6} md={6} sm={6}>
                                        <div className='card-box-who partnership'>
                                            <div className='icon-w-box'>
                                                <img src={item?.image ? item?.image : require('../../assets/images/flexibility.png')} alt='flexibility' />
                                            </div>
                                            <h4>{item?.title}</h4>
                                            <p>{item?.desc}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </section>
            :null}
            {data?.form?.length ?
                <section className="top contact_us_form top-0 bottom padding-left-right">
                    <div className='cotent-section top contact_us_form'>
                        <Row>
                            <Col className='order_2' lg={6}>
                                <div className='left-section contect-form'>
                                    <h4 className='heading requirement-heading mb-4'>{data?.form[0]?.heading}</h4>
                                    <AvForm ref={formRef} onValidSubmit={handleValidSubmit}>
                                        <Row>
                                            {field?.map((item, index) => (
                                                <Col lg={12}>
                                                    <div className='form_field'>
                                                        <AvField
                                                            type={item?.type}
                                                            name={item?.title}
                                                            label={item?.title}
                                                            placeholder={"Enter " + item?.title}
                                                            onChange={(e) => handleFieldInput(index, e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </Col>
                                            ))}
                                            <Col lg={12}>
                                                <button className='button_2' type='submit'>SUBMIT</button>
                                            </Col>
                                        </Row>
                                    </AvForm>
                                </div>

                            </Col>
                            <Col className='order_1' lg={6}>
                                <div className='right-section'>
                                    <img src={data?.form[0]?.image ? data?.form[0]?.image : require('../../assets/images/item-i.png')} alt='partnership form image' style={{ borderRadius: 20 }} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            :null}
        </>
    )
}

