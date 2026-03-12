import React, { useRef, useState, useEffect } from 'react'
import {
    Row,
    Col
} from "reactstrap"
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import Newsletter from '../home/Newsletter';
import GoogleMapReact from 'google-map-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { get, post } from '../../helpers/helper_api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import MapComponent from '../components/Map';
import AmenitiesSection from '../../components/AmenitiesSection';

export default function Property() {

    const params = useParams();
    const navigate = useNavigate();
    const swiperRef = useRef();
    const swiperRef1 = useRef();
    const swiperRef2 = useRef();
    const swiperRef3 = useRef();
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const formRef = useRef();
    const formRef2 = useRef();
    const [field, setField] = useState([]);

    const [expandedIndexes, setExpandedIndexes] = useState([]);

    const toggleExpand = (index) => {
        if (expandedIndexes.includes(index)) {
            setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
        } else {
            setExpandedIndexes([...expandedIndexes, index]);
        }
    };
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    useEffect(() => {
        if (params?.title) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            getData();
        }
    }, [params?.title]);

    const getData = () => {
        if (!loading) {
            setLoading(true);
            get(`property/title?path=${params.title}`)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setData(res?.data);
                        if (res?.data?.form?.length)
                            if (res?.data?.form[0]?.field?.length)
                                setField(res?.data?.form[0]?.field);
                    } else {
                        navigate('/NotFound');
                    }
                })
                .catch(err => {
                    setLoading(false);
                    toast.error("Something Went Wrong!");
                    console.log("error while getting city", err);
                });
        }
    }

    const handleFieldInput = (i, val) => {
        let temp = Object.assign([], field);
        temp[i].value = val;
        setField(temp);
    }

    const handleLeadForm = (e, v, pos) => {
        if (!loading) {
            setLoading(true);
            let body = {
                form: field,
                from: "Property",
                interestedIn: data?.title,
                formPosition: pos
            }
            post("lead", body)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        // toast.success(res?.message);
                        formRef.current.reset();
                        formRef2.current.reset();
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
        if (title) {
            let str = title?.toLowerCase();
            str = str.split(" ").join("-");
            return str;
        } else {
            return title
        }
    }

    return (
        <>
            <Loader visible={loading} />
            {data?.seo ?
                <Helmet>
                    {ReactHtmlParser(data?.seo)}
                </Helmet>
                : null}
            {/* Banner */}
            <section className='inner-banner inner-banner-slider'>
                <div className='slider-section'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        onBeforeInit={(swiper) => {
                            swiperRef2.current = swiper;
                        }}
                        // navigation={true}
                        className="mySwiper banner_slider swiper-section"
                    >
                        {data?.images?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='banner_item'>
                                    <div className='banner-img'>
                                        <img src={item ? item : require('../../assets/images/banner-s.png')} alt='gallery' />
                                    </div>
                                    <div className='inner-banner-content inner-banner-content-blog top bottom'>
                                        <h1 className='heading'>{data?.title}</h1>
                                        <p className='paragraph'>
                                            {data?.address}
                                        </p>
                                        {/* <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                                <li className="breadcrumb-item" aria-current="page"><Link to={`/${data?.city[0].path}`} className='text-decoration-none'>{data?.city[0]?.title}</Link></li>
                                                <li className="breadcrumb-item" aria-current="page"><Link to={`/${data?.city[0].path}/${parseTitle(data.location[0]?.path)}`} className='text-decoration-none'>{data?.location[0]?.title}</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">{data?.title?.split('-').join(' ')}</li>
                                            </ol>
                                        </nav> */}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {data && data?.images?.length > 1 ?
                        <div className='cuttom-slider-button-box'>
                            <button onClick={() => swiperRef2.current?.slidePrev()} className="swiper-button-prev">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M42.6978 42.72L5.25781 42.72L5.25781 5.28003L42.6978 5.28003L42.6978 42.72Z" fill="white" />
                                    <path className='icon_svg' d="M13.9206 0H34.0326C42.7686 0 47.9766 5.208 47.9766 13.944V34.032C47.9766 42.792 42.7686 48 34.0326 48H13.9446C5.20856 48 0.00056076 42.792 0.00056076 34.056V13.944C-0.0234375 5.208 5.18456 0 13.9206 0ZM17.2806 25.272L25.7526 33.744C26.1126 34.104 26.5686 34.272 27.0246 34.272C27.4806 34.272 27.9366 34.104 28.2966 33.744C28.9926 33.048 28.9926 31.896 28.2966 31.2L21.0966 24L28.2966 16.8C28.9926 16.104 28.9926 14.952 28.2966 14.256C27.6006 13.56 26.4486 13.56 25.7526 14.256L17.2806 22.728C16.5606 23.424 16.5606 24.576 17.2806 25.272Z" fill="#5A5A5A" />
                                </svg>
                            </button>
                            <button onClick={() => swiperRef2.current?.slideNext()} className="swiper-button-next">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.30219 42.72L42.7422 42.72L42.7422 5.28003L5.30219 5.28003L5.30219 42.72Z" fill="white" />
                                    <path className='icon_svg' d="M34.0794 0H13.9674C5.23144 0 0.0234375 5.208 0.0234375 13.944V34.032C0.0234375 42.792 5.23144 48 13.9674 48H34.0554C42.7914 48 47.9994 42.792 47.9994 34.056V13.944C48.0234 5.208 42.8154 0 34.0794 0ZM30.7194 25.272L22.2474 33.744C21.8874 34.104 21.4314 34.272 20.9754 34.272C20.5194 34.272 20.0634 34.104 19.7034 33.744C19.0074 33.048 19.0074 31.896 19.7034 31.2L26.9034 24L19.7034 16.8C19.0074 16.104 19.0074 14.952 19.7034 14.256C20.3994 13.56 21.5514 13.56 22.2474 14.256L30.7194 22.728C31.4394 23.424 31.4394 24.576 30.7194 25.272Z" fill="#5A5A5A" />
                                </svg>
                            </button>
                        </div>
                        : null}
                </div>
            </section>
            {/* Lead Form */}
            {data && data.form?.length ?
                <section className="requirement-section top bottom padding-left-right">
                    <div className='cotent-section p-0 requirement-form-section requirement-section-two'>
                        <Row>
                            <Col lg={6}>
                                <div className='right-section'>
                                    <h4 className='heading requirement-heading'>{data?.form[0]?.heading}</h4>
                                    <p className='paragraph'>{data?.form[0]?.desc}</p>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className='left-section get_form'>
                                    <AvForm className="requirement-form" onValidSubmit={(e, v) => handleLeadForm(e, v, "Top")} ref={formRef}>
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
                                        <button className='button_2' type="submit">SUBMIT</button>
                                    </AvForm>
                                    <p className='paragraph'>
                                        By clicking the above button, you agree to <a href='#'>Our Terms of Service</a> and confirm that you have read and understood our <a href='#'>Privacy Policy</a>.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
                : null}
            {/* clientale */}
            {data && data?.clientale?.length ?
                <section className='clients-section top-0 bottom-0 padding-left-right'>
                    <div className='clients_box'>
                        <div className='heading-title'>
                            <h4 className='heading text-center gallery_slider_heading workspaces'>{data?.cliHead ? data?.cliHead : "Our Client"}</h4>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.cliPara}</p>
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
            {/* amenities */}

            {data && data?.ameni?.length ?
                <AmenitiesSection data={data} />
                : null}

            {/* Map */}
            {data?.mapLocation ?
                <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h4 className='heading text-center workspaces'>{data?.mapHead ? data?.mapHead : "Location"}</h4>
                            <p className='paragraph'>{data?.mapPara}</p>
                        </div>
                        <div>
                            <div style={{ height: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }} className='mt-2 mb-2'>
                                {ReactHtmlParser(data?.mapLocation)}
                                {/* <MapComponent lat={data?.lat} long={data?.long} /> */}
                                {/* <GoogleMapReact
                                    bootstrapURLKeys={{ key: "" }}
                                    defaultCenter={defaultProps.center}
                                    defaultZoom={defaultProps.zoom}
                                >
                                    <AnyReactComponent
                                        lat={data?.lat ? data?.lat : 59.955413}
                                        lng={data?.long ? data?.long : 30.337844}
                                        text={data?.title}
                                    />
                                </GoogleMapReact> */}
                            </div>
                        </div>
                    </div>
                </section>
                : null}
            {/* Near By */}
            {data && data?.suggest?.length ?
                <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h2 className='heading text-center padding_bottom workspaces'>{data?.proHead ? data?.proHead : "Workspaces Available nearby"}</h2>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.proPara}</p>
                        </div>
                        {
                            data?.suggest?.length <= 3 ?
                                <div className='normal-design-box'>
                                    <div className='row justify-content-center'>
                                        {data?.suggest?.map((item) => (
                                            <div className='col-lg-4 col-md-6' key={item?._id}>
                                                <Link to={`/${item?.city[0].path}/${parseTitle(item.location[0]?.path)}/${parseTitle(item?.path)}`} className='text-decoration-none'>
                                                    <div className='slider-item'>
                                                        <div className='item-image item-category-img'>
                                                            <img src={item?.images?.length ? item?.images[0] : require('../../assets/images/item.png')} alt='item' />
                                                        </div>
                                                        <div className='card-box'>
                                                            <h6>{item?.title}</h6>
                                                            <p>Capacity {item?.seat}</p>
                                                        </div>
                                                    </div>
                                                </Link>
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
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 10,
                                            },
                                            768: {
                                                slidesPerView: 2.8,
                                                spaceBetween: 10,
                                            },
                                            1024: {
                                                slidesPerView: 3.5,
                                                spaceBetween: 10,
                                            },
                                        }}
                                        onBeforeInit={(swiper) => {
                                            swiperRef.current = swiper;
                                        }}
                                        // navigation={true}
                                        modules={[Navigation, Autoplay]}
                                        className="mySwiper workspace swiper-section"
                                    >
                                        {data?.suggest?.map((item) => (
                                            <SwiperSlide key={item?._id}>
                                                <Link to={`/${item?.city[0].path}/${parseTitle(item.location[0]?.path)}/${parseTitle(item?.path)}`} className='text-decoration-none'>
                                                    <div className='slider-item'>
                                                        <div className='item-image item-category-img'>
                                                            <img src={item?.images?.length ? item?.images[0] : require('../../assets/images/item.png')} alt='item' />
                                                        </div>
                                                        <div className='card-box'>
                                                            <h6>{item?.title}</h6>
                                                            <p>Capacity {item?.seat}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className='cuttom-slider-button-box'>
                                        <button onClick={() => swiperRef.current?.slidePrev()} className="swiper-button-prev">
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M42.6978 42.72L5.25781 42.72L5.25781 5.28003L42.6978 5.28003L42.6978 42.72Z" fill="white" />
                                                <path className='icon_svg' d="M13.9206 0H34.0326C42.7686 0 47.9766 5.208 47.9766 13.944V34.032C47.9766 42.792 42.7686 48 34.0326 48H13.9446C5.20856 48 0.00056076 42.792 0.00056076 34.056V13.944C-0.0234375 5.208 5.18456 0 13.9206 0ZM17.2806 25.272L25.7526 33.744C26.1126 34.104 26.5686 34.272 27.0246 34.272C27.4806 34.272 27.9366 34.104 28.2966 33.744C28.9926 33.048 28.9926 31.896 28.2966 31.2L21.0966 24L28.2966 16.8C28.9926 16.104 28.9926 14.952 28.2966 14.256C27.6006 13.56 26.4486 13.56 25.7526 14.256L17.2806 22.728C16.5606 23.424 16.5606 24.576 17.2806 25.272Z" fill="#5A5A5A" />
                                            </svg>
                                        </button>
                                        <button onClick={() => swiperRef.current?.slideNext()} className="swiper-button-next">
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.30219 42.72L42.7422 42.72L42.7422 5.28003L5.30219 5.28003L5.30219 42.72Z" fill="white" />
                                                <path className='icon_svg' d="M34.0794 0H13.9674C5.23144 0 0.0234375 5.208 0.0234375 13.944V34.032C0.0234375 42.792 5.23144 48 13.9674 48H34.0554C42.7914 48 47.9994 42.792 47.9994 34.056V13.944C48.0234 5.208 42.8154 0 34.0794 0ZM30.7194 25.272L22.2474 33.744C21.8874 34.104 21.4314 34.272 20.9754 34.272C20.5194 34.272 20.0634 34.104 19.7034 33.744C19.0074 33.048 19.0074 31.896 19.7034 31.2L26.9034 24L19.7034 16.8C19.0074 16.104 19.0074 14.952 19.7034 14.256C20.3994 13.56 21.5514 13.56 22.2474 14.256L30.7194 22.728C31.4394 23.424 31.4394 24.576 30.7194 25.272Z" fill="#5A5A5A" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                        }

                    </div>
                </section>
                : null}
            {/* Testimonial */}
            {data && data?.testi?.length ?
                <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h4 className='heading text-center  workspaces'>{data?.testiHead}</h4>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.testiPara}</p>
                        </div>
                        {
                            data?.testi?.length <= 3 ?
                                <div className='normal-design-box'>
                                    <div className='row justify-content-center'>
                                        {data?.testi?.map((item, index) => (
                                            <div className='col-lg-4 col-md-6' key={item?._id}>
                                                <div className='slider-item'>
                                                    {/* <div className='item-image '>
                                                        <img src={item?.image ? item?.image : require('../../assets/images/team.png')} alt='team' />
                                                    </div> */}
                                                    <div className='card_box'>
                                                        <p style={{ fontSize: 14 }}>{expandedIndexes.includes(index) ? item.desc : `${item.desc.slice(0, 120)}...`}</p>
                                                        <button className='read-more' onClick={() => toggleExpand(index)}>{expandedIndexes.includes(index) ? ' Read Less' : ' Read More'}</button><br />
                                                        <div className='card-footer-box'>
                                                            <div className='left-card-1'>
                                                                <img src={item?.image ? item?.image : require('../../assets/images/team.png')} alt={item?.name} />
                                                            </div>
                                                            <div className='right-card-2'>
                                                                <h5>
                                                                    {item?.name}
                                                                    {/* Senior Procurement */}
                                                                </h5>
                                                                <span>{item?.desig}</span>
                                                                {/* <span>Senior Procurement Leader | Aramex</span> */}
                                                            </div>
                                                        </div>
                                                        <div className='rating_box'>
                                                            {item?.rating > 0 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                            {item?.rating > 1 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                            {item?.rating > 2 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                            {item?.rating > 3 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                            {item?.rating > 4 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                        </div>
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
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 10,
                                            },
                                            768: {
                                                slidesPerView: 2.8,
                                                spaceBetween: 10,
                                            },
                                            1024: {
                                                slidesPerView: 3.5,
                                                spaceBetween: 10,
                                            },
                                        }}
                                        onBeforeInit={(swiper) => {
                                            swiperRef1.current = swiper;
                                        }}
                                        // navigation={true}
                                        modules={[Navigation, Autoplay]}
                                        className="mySwiper workspace swiper-section"
                                    >
                                        {data?.testi?.map((item, index) => (
                                            <SwiperSlide key={item?._id}>
                                                <div className='slider-item'>
                                                    <div className='item-image '>
                                                        <img src={item?.image ? item?.image : require('../../assets/images/team.png')} alt='team' />
                                                    </div>
                                                    <div className='card_box'>
                                                        <p style={{ fontSize: 14 }}>{expandedIndexes.includes(index) ? item.desc : `${item.desc.slice(0, 120)}...`}</p>
                                                        <button className='read-more' onClick={() => toggleExpand(index)}>{expandedIndexes.includes(index) ? ' Read Less' : ' Read More'}</button><br />
                                                        <span>{item?.name}</span>
                                                        <div className='rating_box'>
                                                            {item?.rating > 0 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                            {item?.rating > 1 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                            {item?.rating > 2 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                            {item?.rating > 3 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                            {item?.rating > 4 &&
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                                                </svg>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {data?.testi?.length > 3 &&
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
            {/* Lead Form */}
            {data && data?.form?.length ?
                <section className="requirement-section top-0 bottom padding-left-right">
                    <div className='cotent-section requirement-form-section'>
                        <Row>
                            <Col lg={6}>
                                <div className='right-section'>
                                    <img src={data?.form[0]?.image ? data?.form[0]?.image : require('../../assets/images/form-img.png')} alt='form-img' />
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className='left-section get_form'>
                                    <h4 className='heading requirement-heading'>{data?.form[0]?.heading}</h4>
                                    <p className='paragraph'>{data?.form[0]?.desc}</p>
                                    <AvForm className="requirement-form" onValidSubmit={(e, v) => handleLeadForm(e, v, "Bottom")} ref={formRef2}>
                                        {/* <h3>Get started for free</h3> */}
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
                                        <button className='button_2' type="submit">SUBMIT</button>
                                    </AvForm>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
                : null}
            {/* FAQ */}
            {data && data?.FAQ?.length ?
                <section className="fqa-section top-0 bottom padding-left-right">
                    <div className='faq_box'>
                        <div className='heading-title'>
                            <h4 className='heading text-center workspaces'>{data?.faqHead ? data?.faqHead : "Frequently asked questions"}</h4>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.faqPara}</p>
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
            {/* Gallery */}
            {data && data?.gallery?.length ?
                <section className='onward-workspaces-offerings top-0 gallery_section gallery_section_inner bottom-0 padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h4 className='heading text-center  gallery_slider_heading workspaces'>{data?.galHead ? data?.galHead : "Our Gallery"}</h4>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.galPara}</p>
                        </div>
                        {
                            data?.gallery?.length <= 3 ?
                                <div className='normal-design-box gallery-section-normal'>
                                    <div className='row justify-content-center'>
                                        {data?.gallery?.map((item) => (
                                            <div className='col-lg-4 col-md-6' key={item?._id}>
                                                <div className='gallery-item'>
                                                    <img src={item ? item : require('../../assets/images/gallery.png')} alt='gallery' />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                <div className='slider-section'>
                                    <Swiper
                                        // effect={'coverflow'}
                                        grabCursor={true}
                                        loop={true}
                                        // centeredSlides={true}
                                        slidesPerView={1.3}
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
                                                slidesPerView: 3.2,
                                                spaceBetween: 10,
                                            },
                                        }}

                                        // navigation={true}
                                        modules={[Navigation, EffectCoverflow, Autoplay]}
                                        className="mySwiper gallery_slider swiper-section"
                                    >
                                        {data?.gallery?.map((item) => (
                                            <SwiperSlide>
                                                <div className='gallery-item'>
                                                    <img src={item ? item : require('../../assets/images/gallery.png')} alt='gallery' />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {/* <div className='cuttom-slider-button-box'>
                            <button onClick={() => swiperRef1.current?.slidePrev()} className="swiper-button-prev">
                                <img src={Left} alt='left' />
                            </button>
                            <button onClick={() => swiperRef.current?.slideNext()} className="swiper-button-next">
                                <img src={Right} alt='right' />
                            </button>
                        </div> */}
                                </div>
                        }

                    </div>
                </section>
                : null}
            <section className='onward-workspaces-offerings top-0 gallery_section bottom padding-left-right'>
                <div dangerouslySetInnerHTML={{ __html: data?.bContent }}>
                </div>
            </section>
            <Newsletter loading={loading} setLoading={setLoading} />
        </>
    )
}