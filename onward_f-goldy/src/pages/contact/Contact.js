import React, { useEffect, useRef, useState } from 'react'
import {
  Row,
  Col,
} from "reactstrap"
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link, useNavigate } from 'react-router-dom';
import { post, get } from '../../helpers/helper_api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';

export default function Contact() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const [field, setField] = useState([]);
  const formRef = useRef();
  const swiperRef1 = useRef();

  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpand = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };
  useEffect(() => {

    window.scrollTo(0, 0);
  }, [])


  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (!loading) {
      setLoading(true);
      get("contact")
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
          console.log("Erorr while getting testi on contact-us", err);
        })
    }
  }
  console.log("form data", data);
console.log('form field', field);
  const handleValidSubmit = (e, v) => {
    if (!loading) {
      setLoading(true);
      post("contact/form", {
        form: field
      })
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

  const handleFieldInput = (i, val) => {
    let temp = Object.assign([], field);
    temp[i].value = val;
    setField(temp);
  }

  return (
    <>
      {data && data?.seo ?
        <Helmet>
          {ReactHtmlParser(data?.seo)}
        </Helmet>
        : null}
      <Loader visible={loading} />
      <section className='inner-banner'>
        <img src={require('../../assets/images/listing-banner.png')} alt='listing' />
        <div className='inner-banner-content-two top bottom padding-left-right'>
          <h1 className='heading'>Contact Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
            </ol>
          </nav>
        </div>
      </section>
      {data?.form?.length ?
        <section className='top contact_us_form bottom padding-left-right'>
          <Row>
            <Col className='order_2' lg={7}>
              <div className='left-section contect-form'>
                <h4 className='heading'>{data?.form[0]?.heading}</h4>
                <p>{data?.form[0]?.desc}</p>
                <AvForm onValidSubmit={handleValidSubmit} ref={formRef}>
                  <Row>
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
                    <Col lg={12}>
                      <button className='button_2 summit-2' type='submit'>SUBMIT</button>
                    </Col>
                  </Row>
                </AvForm>
              </div>
            </Col>
            <Col className='order_1' lg={5}>
              <div className='right-section-contact'>
                <img src={data?.form[0]?.image ? data?.form[0]?.image : require('../../assets/images/maps.png')} style={{ borderRadius: 20 }} alt='contact us form' />
              </div>
            </Col>
          </Row>
        </section>
        : null}
      {/* Testimonial */}
      {data?.testi?.length ?
        <section className='onward-workspaces-offerings top bottom padding-left-right'>
          <div className='workspaces-slider'>
            <div className='heading-title'>
              <h4 className='heading text-center workspaces'>Employee Experience</h4>
              <p className='paragraph'>We understand that selecting the right co-working space is a crucial decision. We're here to help you make an<br /> informed choice and tailor our offerings to meet your specific needs.</p>
            </div>
            {
              data?.testi?.length <= 3 ?
                <div className='normal-design-box workspace'>
                  <div className='row justify-content-center '>
                    {data?.testi?.map((item, index) => (
                      <div className='col-lg-4 col-md-6'>
                        <div className='slider-item'>

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
                    modules={[Navigation]}
                    className="mySwiper workspace swiper-section"
                  >
                    {data?.testi?.map((item, index) => (
                      <SwiperSlide>
                        <div className='slider-item'>
                          <div className='item-image'>
                            <img src={item?.image ? item?.image : require('../../assets/images/team.png')} alt={item?.name} />
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
      {data?.FAQ?.length ?
        <section className='accordian padding-left-right mb-5'>
          <div className='container-fluid mt-5'>
            <h1> FAQ </h1>
            <p> These seven values are our guiding principles, and you can hold us to them</p>
            <div class="accordion" id="accordionExample">
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
