import React, { useEffect, useRef, useState } from 'react'
import { AvField, AvForm } from 'availity-reactstrap-validation'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { get, post } from '../../helpers/helper_api';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import Loader from "../components/Loader";
import 'swiper/css/pagination';


export default function Enterprise() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const [field, setField] = useState([]);
    const formRef = useRef();
    const swiperRef1 = useRef();

    useEffect(() => {

        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        if (!loading) {
            setLoading(true);
            get("enterprise")
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
                    console.log("error while getting our solution", err);
                    toast.error("Something Went Wrong!");
                })
        }
    }

    const handleFieldInput = (i, val) => {
        let temp = Object.assign([], field);
        temp[i].value = val;
        setField(temp);
    }

    const handleLeadForm = (e, v) => {
        if (!loading) {
            setLoading(true);
            let body = {
                form: field,
                from: "Enterprise",
                interestedIn: "",
                formPosition: "Main"
            }
            post("lead", body)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        // toast.success(res?.message);
                        formRef.current.reset();
                        setTimeout(() => {
                            navigate('/thank-you', {
                                state: { isThankuPage: true }
                            });
                        }, 500)
                    } else
                        toast.error(res?.error);
                })
                .catch(err => {
                    toast.error("Something Went Wrong!");
                    console.log("error while aubmitting lead form", err);
                    setLoading(false);
                })
        }
    }

    const parseTitle = (title) => {
        let str = title.toLowerCase();
        str = str.split(" ").join("-");
        return str;
    }

    console.log("enterprise data", data);

    return (
        <>
            {data && data?.seo ?
                <Helmet>
                    {ReactHtmlParser(data?.seo)}
                </Helmet>
                : null}
            <Loader visible={loading} />
            {/* <section className='inner-banner'>
                <img src={require('../../assets/images/listing-banner.png')} alt='banner' />
                <div className='inner-banner-content-two top bottom padding-left-right'>
                    <h1 className='heading'>Enterprise</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Enterprise</li>
                        </ol>
                    </nav>
                </div>
            </section> */}

            <div className='form_box'>
                <h1 className='heading mb-0'>Cost effective workspace:</h1>
            </div>
            <div className='headr_port'>
                {data?.section?.map((item, index) => {
                    if (index % 2 == 0)
                        return (
                            <div className='column_section'>

                                <div className='main_box top-box-design'>
                                    <div className='para_box'>
                                        <h3>{item?.title}</h3>
                                        <p>{item?.desc}</p>
                                    </div>
                                    <div className='img_section'>
                                        <img src={item?.image} alt='banner' />
                                        <span>0{index + 1}</span>
                                    </div>
                                    <div className='one_box top-design'>
                                        <h3>0{index + 1}</h3>
                                        <p>{item?.title}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    else
                        return (
                            <div className='column_section'>
                                <div className='main_box bottom-box-design'>
                                    <div className='img_section upr_box'>
                                        <img src={item?.image} alt='banner' />
                                        <span>0{index + 1}</span>
                                    </div>
                                    <div className='para_box'>
                                        <h3>{item?.title}</h3>
                                        <p>{item?.desc}</p>
                                    </div>
                                    <div className='one_box bottom-design'>
                                        <h3>0{index + 1}</h3>
                                        <p>{item?.title}</p>
                                    </div>
                                </div>
                            </div>
                        )
                })}
                {/* <div className='column_section'>

                    <div className='main_box top-box-design'>
                        <div className='para_box'>
                            <h3>RENT</h3>
                            <p>
                                COWRKS centres across Brookfield Properties provide dependable & stable support for businesses to execute their long-term growth strategies & scale effortlessly
                            </p>
                        </div>
                        <div className='img_section'>
                            <img src={require('../../assets/images/vission.png')} alt='banner' />
                            <span>01</span>

                        </div>

                        <div className='one_box top-design'>
                            <h3>01</h3>
                            <p>RENT</p>
                        </div>
                    </div>



                </div>
                <div className='column_section'>
                    <div className='main_box bottom-box-design'>
                        <div className='img_section upr_box'>
                            <img src={require('../../assets/images/vission.png')} alt='banner' />
                            <span>02</span>

                        </div>
                        <div className='para_box'>
                            <h3>CAM</h3>
                            <p>
                                COWRKS centres across Brookfield Properties provide dependable & stable support for businesses to execute their long-term growth strategies & scale effortlessly
                            </p>
                        </div>


                        <div className='one_box bottom-design'>
                            <h3>02</h3>
                            <p>CAM</p>
                        </div>
                    </div>
                </div>


                <div className='column_section'>
                   

                    <div className='column_section'>
                        <div className='main_box top-box-design'>
                            <div className='para_box'>
                                <h3>Tailor Made Fit Out</h3>
                                <p>
                                    COWRKS centres across Brookfield Properties provide dependable & stable support for businesses to execute their long-term growth strategies & scale effortlessly
                                </p>
                            </div>
                            <div className='img_section'>
                                <img src={require('../../assets/images/vission.png')} alt='banner' />
                                <span>03</span>

                            </div>

                            <div className='one_box top-design'>
                                <h3>03</h3>
                                <p>Tailor Made Fit Out</p>
                            </div>
                        </div>
                    </div>

                </div>




                <div className='column_section'>

                    <div className='column_section'>
                        <div className='main_box bottom-box-design'>
                            <div className='img_section'>
                                <img src={require('../../assets/images/vission.png')} alt='banner' />
                                <span>04</span>

                            </div>
                            <div className='para_box'>
                                <h3>OPERATIONS
                                    COST</h3>
                                <p>
                                    COWRKS centres across Brookfield Properties provide dependable & stable support for businesses to execute their long-term growth strategies & scale effortlessly
                                </p>
                            </div>


                            <div className='one_box bottom-design'>
                                <h3>04</h3>
                                <p>OPERATIONS
                                    COST</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='column_section'>

                  
                    <div className='column_section'>
                        <div className='main_box top-box-design'>
                            <div className='para_box'>
                                <h3>INSURANCE</h3>
                                <p>
                                    COWRKS centres across Brookfield Properties provide dependable & stable support for businesses to execute their long-term growth strategies & scale effortlessly
                                </p>
                            </div>
                            <div className='img_section'>
                                <img src={require('../../assets/images/vission.png')} alt='banner' />
                                <span>05</span>

                            </div>

                            <div className='one_box top-design' style={{ borderRight: 'none' }}>
                                <h3>05</h3>
                                <p>INSURANCE</p>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>



            {/* {data?.section?.length ?
                <>
                    {data?.section?.map((item, index) => {
                        if (index % 2 == 0)
                            return (
                                <section className='about-section about_section_order'>
                                    <div className='about-left-section'>
                                        <div className='header-title'>
                                            <h3 className='heading padding_bottom'>{item?.title}</h3>
                                            <ul className='about-list'>
                                                <li>
                                                    <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{item?.desc}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='about-right-section'>
                                        <img src={item?.image ? item?.image : require('../../assets/images/about.png')} alt={item?.title} />
                                    </div>
                                </section>
                            )
                        else
                            return (
                                <section className='about-section'>
                                    <div className='about-right-section'>
                                        <img src={item?.image ? item?.image : require('../../assets/images/about.png')} alt={item?.title} />
                                    </div>
                                    <div className='about-left-section'>
                                        <div className='header-title'>
                                            <h3 className='heading padding_bottom'>{item?.title}</h3>
                                            <ul className='about-list'>
                                                <li>
                                                    <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{item?.desc}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            )
                    })}
                </>
                : null} */}
            {/* Benefits */}
            {data && data?.benefit?.length ?
                <section className='refer-section top bottom padding-left-right bg-dark'>
                    <div className='container-fluid mt-2'>
                        <div className='programme'>
                            <h4 className='heading text-center text-white'>Benefits for Enterprise</h4>
                        </div>
                        <Row className='associate'>
                            {data?.benefit?.map((item) => (
                                <Col lg={4} md={6} className='mb-4'>
                                    <div className='reward ' style={{ height: '100%' }}>
                                        <div className='slider-item earn-box ' style={{ height: '100%' }}>
                                            <div className='card_box'>
                                                <span className='re-card'>{item?.title}</span>
                                                <p>{item?.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </section>
                : null}

            <section className='padding-left-right slider_dot'>

                <div className='container-fluid  '>
                    <div className='row'>
                        <div className='col-lg-6 '>
                            <div className='why_omword'>
                                <h3 className='heading'>Why Onword?</h3>
                            </div>
                            <div className='slide_img'>
                                <img src={data?.whyImage} alt='banner' />
                            </div>

                        </div>
                        <div className='col-lg-6'>
                            <div className='right-section-slider'>
                                <div className='upr_bot'>
                                    <hr className='text-white'></hr>
                                    <div className='slider_section'>
                                        <Swiper
                                            // effect={'coverflow'}
                                            grabCursor={true}
                                            loop={true}
                                            // centeredSlides={true}
                                            slidesPerView={1}
                                            // coverflowEffect={{
                                            //     rotate: 10,
                                            //     stretch: 0,
                                            //     depth: -80,
                                            //     modifier: 1,
                                            //     slideShadows: false,
                                            // }}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            pagination={{
                                                clickable: true,
                                            }}

                                            // navigation={true}
                                            modules={[Navigation, Autoplay, Pagination]}
                                            className="why_box"
                                        >
                                            {data?.why?.map((item) => (
                                                <SwiperSlide>
                                                    <div className='short_box'>
                                                        <p>“{item}” </p>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                    <hr className='text-white '></hr>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            </section>
            <section className='padding-left-right enterprises-slider-box'>
                <div className='container-fluid'>
                    <div className='row justify-content-end'>
                        <div className='col-lg-6'>
                            <div className='why_omword'>
                                <h3 className='heading'>Built for Enterprises</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <Swiper
                    pagination={{
                        clickable: true,
                    }}
                    grabCursor={true}
                    loop={true}
                    slidesPerView={1}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay, Pagination]}
                    className="mySwiper  swiper-section"
                >
                    {data?.builtFor?.map((item, index) => (
                        <SwiperSlide>
                            <div className='container-fluid text_hold'>
                                <div className='row'>
                                    <div className='col-lg-6 paragrah_pot'>
                                        <p className='text-center private_section'>{item?.title}</p>
                                        <p className=' private_section'>“{item?.desc}” </p>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='slide_img mt-0'>
                                            <img src={item?.image} alt='banner' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            {/* Customised plans */}
            {/* <section className='about-section plans'>
                <div className='about-right-section'>
                    <img src={require('../../assets/images/about.png')} alt={''} />
                </div>
                <div className='about-left-section'>
                    <div className='header-title'>
                        <h3 className='heading'>
                            Customised plans
                        </h3>
                        <ul className='about-list'>
                            <li>
                                <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>
                                    “Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section> */}
            {/* Lead Form */}
            {data?.form?.length ?
                <section className="requirement-section top bottom_0 padding-left-right" id="connect">
                    <div className='cotent-section requirement-form-section'>
                        <Row>

                            <Col lg={6}>
                                <div className='right-section'>
                                    <img src={data?.form[0]?.image ? data?.form[0]?.image : require('../../assets/images/form-img.png')} style={{ borderRadius: 20 }} alt='our-solution-form-image' />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className='left-section get_form'>
                                    <h4 className='heading requirement-heading'>{data?.form[0]?.heading}</h4>
                                    <p className='paragraph'>{data?.form[0]?.desc}</p>
                                    <AvForm onValidSubmit={handleLeadForm} ref={formRef} className="requirement-form" >
                                        <h3>Get started for free</h3>
                                        {field?.map((item, index) => (
                                            <Col lg={12}>
                                                <AvField
                                                    type={item?.type}
                                                    name={item?.type}
                                                    placeholder={`Enter ${item?.title}`}
                                                    onChange={(e) => handleFieldInput(index, e.target.value)}
                                                    required
                                                />
                                            </Col>
                                        ))}
                                        <button className='button_2'>SUBMIT</button>
                                    </AvForm>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
                : null}
            {/* Clientale */}
            {data?.clientale?.length ?
                <section className='clients-section top-0 bottom-0 mt-0 padding-left-right'>
                    <div className='clients_box'>
                        <div className='heading-title'>
                            <h4 className='heading text-center  gallery_slider_heading padding_bottom workspaces'>Our Client</h4>
                        </div>
                        {
                            data?.clientale?.length <= 6 ?
                                <div className='normal-design-box client_logo-slider'>
                                    <div className='row justify-content-center'>
                                        {data?.clientale?.map((item) => (
                                            <div className='col-lg-2 col-md-4 col-sm-6' key={item?._id}>
                                                <div className='clients-item'>
                                                    <img src={item?.image ? item?.image : require('../../assets/images/client.png')} alt={item?.title ? item?.title : 'client'} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                <div className='slider-section'>
                                    <Swiper
                                        slidesPerView={2.4}
                                        spaceBetween={10}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 4,
                                                spaceBetween: 10,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                                spaceBetween: 10,
                                            },
                                            1024: {
                                                slidesPerView: 6,
                                                spaceBetween: 10,
                                            },
                                        }}

                                        // navigation={true}
                                        modules={[Pagination, Autoplay]}
                                        className="mySwiper client_logo-slider swiper-section"
                                    >
                                        {data?.clientale?.map((item) => (
                                            <SwiperSlide key={item?._id}>
                                                <div className='clients-item'>
                                                    <img src={item?.image ? item?.image : require('../../assets/images/client.png')} alt={item?.title ? item?.title : 'client'} />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                </div>
                        }

                    </div>
                </section>
                : null}
            {/* Case Studies */}
            {data?.cases?.length ?
                <section className='onward-workspaces-offerings top_0 bottom_0 padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h4 className='heading text-center workspaces'>Case Studies</h4>
                            <p className='paragraph'>We understand that selecting the right co-working space is a crucial decision. We're here to help you make an<br /> informed choice and tailor our offerings to meet your specific needs.</p>
                        </div>
                        {
                            data?.cases?.length <= 3 ?
                                <div className='normal-design-box workspace'>
                                    <div className='row justify-content-center '>
                                        {data?.cases?.map((item) => (
                                            <div className='col-lg-4 col-md-6'>
                                                <div className='slider-item'>
                                                    <div className='item-image'>
                                                        <img src={item?.image ? item?.image : require('../../assets/images/team.png')} alt="" />
                                                    </div>
                                                    <div className='card_box'>
                                                        <h6>{item?.titleShort}</h6>
                                                        <p>{item?.title}</p>
                                                        <Link class="read" target="_blank" to={"/case-study/" + parseTitle(item?.titleShort)}>Read More</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                <div className='slider-section'>
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={10}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 10,
                                            },
                                            768: {
                                                slidesPerView: 3,
                                                spaceBetween: 10,
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                                spaceBetween: 10,
                                            },
                                        }}
                                        onBeforeInit={(swiper) => {
                                            swiperRef1.current = swiper;
                                        }}
                                        // navigation={true}
                                        modules={[Navigation]}
                                        className="mySwiper workspace swiper-section"
                                    >
                                        {data?.cases?.map((item) => (
                                            <SwiperSlide>
                                                <div className='slider-item'>
                                                    <div className='item-image'>
                                                        <img src={item?.image ? item?.image : require('../../assets/images/team.png')} alt="" />
                                                    </div>
                                                    <div className='card_box'>
                                                        <h6>{item?.titleShort}</h6>
                                                        <p>{item?.title}</p>
                                                        <Link class="read" target="_blank" to={"/case-study/" + parseTitle(item?.titleShort)}>Read More</Link>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {data?.cases?.length > 4 &&
                                        <div className='cuttom-slider-button-box'>
                                            <button onClick={() => swiperRef1.current?.slidePrev()} className="swiper-button-prev">
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M42.6978 42.72L5.25781 42.72L5.25781 5.28003L42.6978 5.28003L42.6978 42.72Z" fill="white" />
                                                    <path className='icon_svg' d="M13.9206 0H34.0326C42.7686 0 47.9766 5.208 47.9766 13.944V34.032C47.9766 42.792 42.7686 48 34.0326 48H13.9446C5.20856 48 0.00056076 42.792 0.00056076 34.056V13.944C-0.0234375 5.208 5.18456 0 13.9206 0ZM17.2806 25.272L25.7526 33.744C26.1126 34.104 26.5686 34.272 27.0246 34.272C27.4806 34.272 27.9366 34.104 28.2966 33.744C28.9926 33.048 28.9926 31.896 28.2966 31.2L21.0966 24L28.2966 16.8C28.9926 16.104 28.9926 14.952 28.2966 14.256C27.6006 13.56 26.4486 13.56 25.7526 14.256L17.2806 22.728C16.5606 23.424 16.5606 24.576 17.2806 25.272Z" fill="#5A5A5A" />
                                                </svg>
                                            </button>
                                            <button onClick={() => swiperRef1.current?.slideNext()} className="swiper-button-next">
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.30219 42.72L42.7422 42.72L42.7422 5.28003L5.30219 5.28003L5.30219 42.72Z" fill="white" />
                                                    <path className='icon_svg' d="M34.0794 0H13.9674C5.23144 0 0.0234375 5.208 0.0234375 13.944V34.032C0.0234375 42.792 5.23144 48 13.9674 48H34.0554C42.7914 48 47.9994 42.792 47.9994 34.056V13.944C48.0234 5.208 42.8154 0 34.0794 0ZM30.7194 25.272L22.2474 33.744C21.8874 34.104 21.4314 34.272 20.9754 34.272C20.5194 34.272 20.0634 34.104 19.7034 33.744C19.0074 33.048 19.0074 31.896 19.7034 31.2L26.9034 24L19.7034 16.8C19.0074 16.104 19.0074 14.952 19.7034 14.256C20.3994 13.56 21.5514 13.56 22.2474 14.256L30.7194 22.728C31.4394 23.424 31.4394 24.576 30.7194 25.272Z" fill="#5A5A5A" />
                                                </svg>
                                            </button>
                                        </div>
                                    }
                                </div>
                        }

                    </div>
                </section>
                : null}
            {/* FAQ */}
            {data && data?.FAQ?.length ?
                <section className="fqa-section top-0 bottom padding-left-right ">
                    <div className='faq_box'>
                        <div className='heading-title'>
                            <h4 className='heading text-center workspaces'>Frequently asked questions</h4>
                            <p className='paragraph'>Everything you need to know about the product and billing.</p>
                        </div>
                        <div className="accordion" id="accordionExample">
                            {data?.FAQ?.map((item, index) => (
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id={"headingOne" + index}>
                                        <button className={`accordion-button ${index == 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + index} aria-expanded="true" aria-controls={"collapseOne" + index}>
                                            {item?.title}
                                        </button>
                                    </h2>
                                    <div id={"collapseOne" + index} className={`accordion-collapse collapse ${index == 0 ? 'show' : ''}`} aria-labelledby={"headingOne" + index} data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p className='paragraph'>
                                                {item?.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                : null}




        </>
    )
}
