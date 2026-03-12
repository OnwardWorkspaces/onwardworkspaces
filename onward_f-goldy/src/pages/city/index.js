import React, { useState, useRef, useEffect } from 'react';
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
import { Pagination, Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import Location from '../../assets/images/location.svg'
import Flexibility from '../../assets/images/flexibility.svg'
import Affordability from '../../assets/images/affordability.svg'
import Services from '../../assets/images/services.svg'
import Newsletter from '../home/Newsletter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { get, post } from '../../helpers/helper_api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import AmenitiesSection from '../../components/AmenitiesSection';
export default function City() {

    const params = useParams();
    const navigate = useNavigate();
    const swiperRef = useRef();
    const swiperRef1 = useRef();
    const swiperRef2 = useRef();
    const swiperRef3 = useRef();
    const [data, setData] = useState(undefined);
    const [modalData, setModalData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [field, setField] = useState([]);
    const formRef = useRef();
    const formRef2 = useRef();
    const [modal, setModal] = useState(false);

    const [expandedIndexes, setExpandedIndexes] = useState([]);

    const toggleExpand = (index) => {
        if (expandedIndexes.includes(index)) {
            setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
        } else {
            setExpandedIndexes([...expandedIndexes, index]);
        }
    };
    // const toggle = () => setModal(!modal);

    const modalPopup = (item) => {
        setModal(!modal)
        setModalData(item)
    }
    useEffect(() => {

        window.scrollTo(0, 0);
    }, [])
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
            get(`city/title?path=${params.title}`)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setData(res?.data);
                        console.log("responce city", res);
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
                from: "City",
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
            {data && data?.seo ?
                <Helmet>
                    {ReactHtmlParser(data?.seo)}
                </Helmet>
                : null}
            <Modal isOpen={modal} centered toggle={modalPopup} className='content_modal' >
                <ModalHeader toggle={modalPopup}>{modalData?.title}</ModalHeader>
                <ModalBody>
                    <p>{modalData?.desc}</p>
                </ModalBody>
            </Modal>
            <section className='inner-banner inner-banner-slider'>
                {/* <div className='banner-img'>
                    <img src={data?.image ? data?.image : require('../../assets/images/city-banner.png')} alt='city-banner' />
                </div> */}
                <div className='inner-banner-content top inner-two-banner bottom padding-left-right' style={{ backgroundImage: `url(${data?.image ? data?.image : require('../../assets/images/city-banner.png')})` }}>
                    <Row>
                        <Col lg={6}>
                            <div className='left-section'>
                                <h1 className='heading'>{data?.heading}</h1>
                                <p className='paragraph'>{data?.desc}</p>
                                {/* <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">{data?.title?.split('-').join(' ')}</li>
                                    </ol>
                                </nav> */}
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='right-section inner-banner-form'>
                                <h4>Get started for free</h4>
                                <AvForm onValidSubmit={(e, v) => handleLeadForm(e, v, "Top")} ref={formRef}>
                                    <Row>
                                        {field?.map((item, index) => (
                                            <Col lg={12}>
                                                <div className='form_field'>
                                                    <AvField
                                                        type={item?.type}
                                                        name={item?.type}
                                                        placeholder={`Enter ${item?.title}`}
                                                        onChange={(e) => handleFieldInput(index, e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                        ))}
                                        <Col lg={12}>
                                            <button type="submit" className='button_2'>SUBMIT</button>
                                        </Col>
                                    </Row>
                                </AvForm>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            {/* clientale */}
            {data && data?.clientale?.length ?
                <section className='clients-section top bottom-0 mt-0 padding-left-right'>
                    <div className='clients_box'>
                        <div className='heading-title'>
                            <h4 className='heading text-center gallery_slider_heading workspaces'>{data?.cliHead}</h4>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.cliPara}</p>
                        </div>
                        {
                            data?.clientale?.length <= 6 ?
                                <div className='normal-design-box client_logo-slider'>
                                    <div className='row justify-content-center'>
                                        {data?.clientale?.map((item) => (
                                            <div className='col-lg-2 col-md-4 col-sm-6' key={item?._id}>
                                                <div className='clients-item'>
                                                    <img src={item?.image ? item?.image : require('../../assets/images/client.png')} alt={'client'} />
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
                                        className="mySwiper client_logo-slider swiper-section p-2"
                                    >
                                        {data?.clientale?.map((item) => (
                                            <SwiperSlide key={item?._id}>
                                                <div className='clients-item'>
                                                    <img src={item?.image ? item?.image : require('../../assets/images/client.png')} alt={'client'} />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                </div>
                        }


                    </div>
                </section>
                : null}
            {/* Location */}
            {/* {data && data?.location?.length &&
                <section className='onward-workspaces-offerings top bottom padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h3 className='heading text-center workspaces'>{data?.locHead}</h3>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.locPara}​</p>
                        </div>
                        <div className='explore-section'>
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

                                // navigation={true}
                                modules={[Pagination]}
                                className="mySwiper swiper-section"
                            >
                                {data?.location?.map((item) => (
                                    <SwiperSlide key={item?._id}>
                                        <Link to={`/${parseTitle(data?.title)}/${parseTitle(item?.title)}`}>
                                            <div className='inner_thumb_image_box area-img'>
                                                <img src={item?.image ? item?.image : require('../../assets/images/item-i.png')} alt={item?.title} />
                                                <div className='explore-conetn'>
                                                    <h4>{item?.title}</h4>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>
                    </div>
                </section>
            } */}
            {data && data?.location?.length ?
                <>
                    {
                        data?.location?.length > 0 && data?.location?.length < 2 &&
                        <section className='onward-workspaces-offerings top bottom padding-left-right'>
                            <div className='workspaces-slider'>
                                <div className='heading-title'>
                                    <h3 className='heading text-center workspaces'>{data?.locHead} </h3>
                                    <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.locPara}​</p>
                                </div>
                                <div className='explore-section'>
                                    <Row>
                                        {data?.location?.length > 0 &&
                                            <Col lg={12} md={12}>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[0]?.path)}`}>
                                                    <div className='thumb-image-box' style={{ height: data && data?.location?.length < 1 && '100%' }}>
                                                        <img src={data?.location[0]?.image ? data?.location[0]?.image : require('../../assets/images/item-i.png')} alt={data?.location[0]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[0]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }

                                    </Row>
                                </div>
                            </div>
                        </section>
                    }
                    {
                        data?.location?.length > 1 && data?.location?.length <= 2 &&
                        <section className='onward-workspaces-offerings top bottom padding-left-right'>
                            <div className='workspaces-slider'>
                                <div className='heading-title'>
                                    <h3 className='heading text-center workspaces'>{data?.locHead}</h3>
                                    <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.locPara}​</p>
                                </div>
                                <div className='explore-section'>
                                    <Row>
                                        {data?.location?.length > 0 &&
                                            <Col lg={6} md={12}>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[0]?.path)}`}>
                                                    <div className='thumb-image-box '>
                                                        <img src={data?.location[0]?.image ? data?.location[0]?.image : require('../../assets/images/item-i.png')} alt={data?.location[0]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[0]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 1 &&
                                            <Col lg={6} md={12}>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[1]?.path)}`}>
                                                    <div className='thumb-image-box'>
                                                        <img src={data?.location[1]?.image ? data?.location[1]?.image : require('../../assets/images/item-i.png')} alt={data?.location[1]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[1]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }

                                    </Row>
                                </div>
                            </div>
                        </section>
                    }
                    {
                        data?.location?.length > 2 && data?.location?.length <= 3 &&
                        <section className='onward-workspaces-offerings top bottom padding-left-right'>
                            <div className='workspaces-slider'>
                                <div className='heading-title'>
                                    <h3 className='heading text-center workspaces'>{data?.locHead}</h3>
                                    <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.locPara}​</p>
                                </div>
                                <div className='explore-section'>
                                    <Row>
                                        {data?.location?.length > 0 &&
                                            <Col lg={4} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[0]?.path)}`}>
                                                    <div className='thumb-image-box thumb_image_box'>
                                                        <img src={data?.location[0]?.image ? data?.location[0]?.image : require('../../assets/images/item-i.png')} alt={data?.location[0]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[0]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 1 &&
                                            <Col lg={4} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[1]?.path)}`}>
                                                    <div className='thumb-image-box thumb_image_box'>
                                                        <img src={data?.location[1]?.image ? data?.location[1]?.image : require('../../assets/images/item-i.png')} alt={data?.location[1]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[1]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 2 &&
                                            <Col lg={4} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[2]?.path)}`}>
                                                    <div className='thumb-image-box thumb_image_box'>
                                                        <img src={data?.location[2]?.image ? data?.location[2]?.image : require('../../assets/images/item-i.png')} alt={data?.location[2]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[2]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }

                                    </Row>
                                </div>
                            </div>
                        </section>
                    }
                    {
                        data?.location?.length > 3 && data?.location?.length <= 4 &&
                        <section className='onward-workspaces-offerings top bottom padding-left-right'>
                            <div className='workspaces-slider'>
                                <div className='heading-title'>
                                    <h3 className='heading text-center workspaces'>{data?.locHead}</h3>
                                    <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.locPara}​</p>
                                </div>
                                <div className='explore-section'>
                                    <Row>
                                        {data?.location?.length > 0 &&
                                            <Col lg={6} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[0]?.path)}`}>
                                                    <div className='thumb-image-box'>
                                                        <img src={data?.location[0]?.image ? data?.location[0]?.image : require('../../assets/images/item-i.png')} alt={data?.location[0]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[0]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 1 &&
                                            <Col lg={6} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[1]?.path)}`}>
                                                    <div className='thumb-image-box'>
                                                        <img src={data?.location[1]?.image ? data?.location[1]?.image : require('../../assets/images/item-i.png')} alt={data?.location[1]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[1]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 2 &&
                                            <Col lg={6} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[2]?.path)}`}>
                                                    <div className='thumb-image-box '>
                                                        <img src={data?.location[2]?.image ? data?.location[2]?.image : require('../../assets/images/item-i.png')} alt={data?.location[2]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[2]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 3 &&
                                            <Col lg={6} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[3]?.path)}`}>
                                                    <div className='thumb-image-box '>
                                                        <img src={data?.location[3]?.image ? data?.location[3]?.image : require('../../assets/images/item-i.png')} alt={data?.location[3]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[3]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }

                                    </Row>
                                </div>
                            </div>
                        </section>
                    }
                    {
                        data?.location?.length > 4 && data?.location?.length <= 5 &&
                        <section className='onward-workspaces-offerings top bottom padding-left-right'>
                            <div className='workspaces-slider'>
                                <div className='heading-title'>
                                    <h3 className='heading text-center workspaces'>{data?.locHead}</h3>
                                    <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.locPara}​</p>
                                </div>
                                <div className='explore-section'>
                                    <Row>
                                        {data?.location?.length > 0 &&
                                            <Col lg={6} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[0]?.path)}`}>
                                                    <div className='thumb-image-box'>
                                                        <img src={data?.location[0]?.image ? data?.location[0]?.image : require('../../assets/images/item-i.png')} alt={data?.location[0]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[0]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 1 &&
                                            <Col lg={6} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[1]?.title)}`}>
                                                    <div className='thumb-image-box'>
                                                        <img src={data?.location[1]?.image ? data?.location[1]?.image : require('../../assets/images/item-i.png')} alt={data?.location[1]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[1]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 2 &&
                                            <Col lg={4} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[2]?.path)}`}>
                                                    <div className='thumb-image-box thumb_image_box'>
                                                        <img src={data?.location[2]?.image ? data?.location[2]?.image : require('../../assets/images/item-i.png')} alt={data?.location[2]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[2]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 3 &&
                                            <Col lg={4} md={12} className='mb-4'>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[3]?.title)}`}>
                                                    <div className='thumb-image-box thumb_image_box'>
                                                        <img src={data?.location[3]?.image ? data?.location[3]?.image : require('../../assets/images/item-i.png')} alt={data?.location[3]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[3]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }
                                        {data?.location?.length > 4 &&
                                            <Col lg={4} md={12}>
                                                <Link to={`/${parseTitle(data?.path)}/${parseTitle(data?.location[4]?.title)}`}>
                                                    <div className='thumb-image-box thumb_image_box'>
                                                        <img src={data?.location[4]?.image ? data?.location[4]?.image : require('../../assets/images/item-i.png')} alt={data?.location[4]?.title} />
                                                        <div className='explore-conetn'>
                                                            <h4>{data?.location[4]?.title}</h4>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        }

                                    </Row>
                                </div>
                            </div>
                        </section>
                    }
                </>
                : null}
            {/* {data && data?.location?.length &&
                <section className='onward-workspaces-offerings top bottom padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h3 className='heading text-center workspaces'>{data?.locHead}</h3>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.locPara}​</p>
                        </div>
                        <div className='explore-section'>
                            <Row>
                                {data?.location?.length > 0 &&
                                    <Col lg={6} md={12}>
                                        <Link to={`/${parseTitle(data?.location[0]?.title)}/${parseTitle(data?.location[0]?.title)}`}>
                                            <div className='thumb-image-box'>
                                                <img src={data?.location[0]?.image ? data?.location[0]?.image : require('../../assets/images/item-i.png')} alt={data?.location[0]?.title} />
                                                <div className='explore-conetn'>
                                                    <h4>{data?.location[0]?.title}</h4>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                }
                                {data?.location?.length > 1 &&
                                    <Col lg={6} md={12}>
                                        <Link to={`/${parseTitle(data?.location[1]?.title)}/${parseTitle(data?.location[1]?.title)}`}>
                                            <div className='thumb-image-box'>
                                                <img src={data?.location[1]?.image ? data?.location[1]?.image : require('../../assets/images/item-i.png')} alt={data?.location[1]?.title} />
                                                <div className='explore-conetn'>
                                                    <h4>{data?.location[1]?.title}</h4>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                }
                                {data?.location?.length > 2 &&
                                    <Col lg={4} md={12}>
                                        <Link to={`/${parseTitle(data?.location[2]?.path)}/${parseTitle(data?.location[2]?.path)}`}>
                                            <div className='thumb-image-box thumb_image_box'>
                                                <img src={data?.location[2]?.image ? data?.location[2]?.image : require('../../assets/images/item-i.png')} alt={data?.location[2]?.title} />
                                                <div className='explore-conetn'>
                                                    <h4>{data?.location[2]?.title}</h4>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                }
                                {data?.location?.length > 3 &&
                                    <Col lg={4} md={12}>
                                        <Link to={`/${parseTitle(data?.location[3]?.title)}/${parseTitle(data?.location[3]?.title)}`}>
                                            <div className='thumb-image-box thumb_image_box'>
                                                <img src={data?.location[3]?.image ? data?.location[3]?.image : require('../../assets/images/item-i.png')} alt={data?.location[3]?.title} />
                                                <div className='explore-conetn'>
                                                    <h4>{data?.location[3]?.title}</h4>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                }
                                {data?.location?.length > 4 &&
                                    <Col lg={4} md={12}>
                                        <Link to={`/${parseTitle(data?.location[4]?.title)}/${parseTitle(data?.location[4]?.title)}`}>
                                            <div className='thumb-image-box thumb_image_box'>
                                                <img src={data?.location[4]?.image ? data?.location[4]?.image : require('../../assets/images/item-i.png')} alt={data?.location[4]?.title} />
                                                <div className='explore-conetn'>
                                                    <h4>{data?.location[4]?.title}</h4>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                }
                            </Row>
                        </div>
                    </div>
                </section>
            } */}
            {/* Properties */}
            {data && data?.property?.length ?
                <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h2 className='heading text-center padding_bottom workspaces'>{data?.proHead}</h2>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.proPara}</p>
                        </div>
                        {
                            data?.property?.length <= 3 ?
                                <div className='normal-design-box '>
                                    <div className='row justify-content-center'>
                                        {data?.property?.map((item) => (
                                            <div className='col-lg-4 col-md-6'>
                                                <Link to={`/${parseTitle(item?.city[0]?.path)}/${parseTitle(item?.location[0]?.path)}/${parseTitle(item?.path)}`} className='text-decoration-none'>
                                                    <div className='slider-item'>
                                                        <div className='item-image  item-category-img'>
                                                            <img src={item?.images?.length > 0 ? item?.images[0] : require('../../assets/images/item.png')} alt={item?.title} />
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
                                        {data?.property?.map((item) => (
                                            <SwiperSlide>
                                                <Link to={`/${parseTitle(item?.city[0]?.path)}/${parseTitle(item?.location[0]?.path)}/${parseTitle(item?.path)}`} className='text-decoration-none'>
                                                    <div className='slider-item'>
                                                        <div className='item-image  item-category-img'>
                                                            <img src={item?.images?.length > 0 ? item?.images[0] : require('../../assets/images/item.png')} alt={item?.title} />
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
                                    {data?.property?.length > 3 &&
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
                                    }
                                </div>

                        }

                    </div>
                </section>
                : null}
            {/* offices */}
            {data && data?.offices?.length ?
                <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
                    <div className='workspaces-slider'>
                        <div className='heading-title'>
                            <h2 className='heading text-center padding_bottom workspaces'>{data?.offHead}</h2>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.offPara}</p>
                        </div>
                        {
                            data?.offices?.length <= 3 ?
                                <div className='normal-design-box '>
                                    <div className='row justify-content-center'>
                                        {data?.offices?.map((item) => (
                                            <div className='col-lg-4 col-md-6'>
                                                <Link to={`/offices/${parseTitle(item?.path)}`} className='text-decoration-none'>
                                                    <div className='slider-item'>
                                                        <div className='item-image item-category-img'>
                                                            <img src={item?.image ? item?.image : require('../../assets/images/item.png')} alt='item' />
                                                        </div>
                                                        <div className='card-box'>
                                                            <h6>{item?.title}</h6>
                                                            <p>{item?.category?.length ? item?.category[0]?.title : null}</p>
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
                                            swiperRef1.current = swiper;
                                        }}
                                        // navigation={true}
                                        modules={[Navigation, Autoplay]}
                                        className="mySwiper workspace swiper-section"
                                    >
                                        {data?.offices?.map((item) => (
                                            <SwiperSlide>
                                                <Link to={`/offices/${parseTitle(item?.path)}`} className='text-decoration-none'>
                                                    <div className='slider-item'>
                                                        <div className='item-image item-category-img'>
                                                            <img src={item?.images?.length > 0 ? item?.images[0] : require('../../assets/images/item.png')} alt='item' />
                                                        </div>
                                                        <div className='card-box'>
                                                            <h6>{item?.title}</h6>
                                                            <p>{item?.category?.length ? item?.category[0]?.title : null}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    {data?.property?.length > 3 &&
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
            {/* whyOnward */}
            {/* {data?.category?.length &&
                <>
                    {data?.category[0]?.why?.length &&
                        <section className='full-section top bottom'>
                            <div className='revolutionise-section'>
                                <div className='heading-title'>
                                    <h3 className='heading text-center revolutionise'>{data?.whyHead}</h3>
                                    <p className='paragraph text-center' style={{ whiteSpace: 'pre-line' }}>{data?.whyPara}</p>
                                    <a href='#connect' className='text-decoration-none'>
                                        <button className='button_2'>Let’s Connect</button>
                                    </a>
                                </div>
                                <div className='revo-card-section padding-left-right'>
                                    <Row className='justify-content-center'>
                                        {data?.category[0]?.why?.map((item) => (
                                            <Col lg={3} md={4} sm={6} className='mb-4'>
                                                <div className='revo-card-box active'>
                                                    <h4>{item?.title}</h4>
                                                    <p>{item?.desc?.length > 100 ? item?.desc?.substr(0, 100) + '...' : item?.desc}</p>
                                                    <button className='read_more' onClick={() => modalPopup(item)}>Read More</button>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </div>
                        </section>
                    }
                </>
            } */}
            {/* testimonial */}
            {data && data && data?.ameni?.length ?
                <AmenitiesSection data={data} />
                : null}

            {/* Amenities */}
            {/* { ?
                <section className='amenities-section top bottom padding-left-right'>
                    <div className='clients_box'>
                        <div className='heading-title'>
                            <h4 className='heading text-center gallery_slider_heading workspaces'>{data?.ameHead ? data?.ameHead : "Amenities"}</h4>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.amePara}</p>
                        </div>
                    </div>
                    <Row>
                        {data?.ameni?.map((item, i) => (
                            <Col lg={2} md={3} sm={4} xs={6} key={i}>
                                <div className="amenities-box">
                                    <div className="amenities_img">
                                        <img
                                            src={item?.image ? item?.image : require('../../assets/images/spatial_audio_off.png')}
                                            alt={item?.title || 'amenity'}
                                        />
                                    </div>
                                    <div className="amenities_content">
                                        <p>{item?.title}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>

                </section>
                : null} */}

            {/* Lead Form */}
            {data?.form?.length ?
                <section className="requirement-section top-0 bottom padding-left-right" id="connect">
                    <div className='cotent-section requirement-form-section'>
                        <Row>
                            <Col lg={6}>
                                <div className='right-section'>
                                    <img src={data?.form[0]?.image ? data?.form[0]?.image : require('../../assets/images/form-img.png')} alt='form-img' style={{ borderRadius: 20 }} />
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
                                        <button className='button_2'>SUBMIT</button>
                                    </AvForm>

                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
                : null}
            {/* FAQ */}
            {data && data?.FAQ ?
                <section className="fqa-section top-0 bottom padding-left-right">
                    <div className='faq_box'>
                        <div className='heading-title'>
                            <h4 className='heading text-center workspaces'>{data?.faqHead}</h4>
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
                            <h4 className='heading text-center  gallery_slider_heading workspaces'>{data?.galHead}</h4>
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
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        slidesPerView={1.3}
                                        // coverflowEffect={{
                                        //     rotate: 10,
                                        //     stretch: 0,
                                        //     depth: -80,
                                        //     modifier: 1,
                                        //     slideShadows: false,
                                        // }}
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
                                            <SwiperSlide key={item?._id}>
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
