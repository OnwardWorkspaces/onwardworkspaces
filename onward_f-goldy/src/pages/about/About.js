import React, { useEffect, useRef, useState } from 'react'
import {
  Row,
  Col,
} from "reactstrap";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { get, post } from '../../helpers/helper_api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';

export default function About() {
  const swiperRef1 = useRef();
  const swiperRef = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
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
    setLoading(true);
    get("about")
      .then(res => {
        setLoading(false);
        if (res?.statusCode == 200)
          setData(res?.data);
        else
          toast.error(res?.error);
      })
      .catch(err => {
        setLoading(false);
        console.log("error while getting about us", err);
        toast.error("Something Went Wrong!");
      })
  }, []);

  return (
    <>
      <Loader visible={loading} />
      {data?.seo ?
        <Helmet>
          {ReactHtmlParser(data?.seo)}
        </Helmet>
        : null}
      {/* <section className='inner-banner'>
        <img src={require('../../assets/images/listing-banner.png')} alt='banner' />
        <div className='inner-banner-content-two top bottom padding-left-right'>
          <h1 className='heading'>About Us</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">About Us</li>
            </ol>
          </nav>
        </div>
      </section> */}
      {/* {data && data?.section?.length ?
        <>
          {data?.section?.map((item, index) => {
            if (index % 2 != 0)
              return (
                <section className='about-section '>
                  <div className='about-right-section'>
                    <img src={item?.image ? item?.image : require('../../assets/images/about.png')} alt={item?.title} />
                  </div>
                  <div className='about-left-section'>
                    <div className='header-title'>
                      <h3 className='heading'>
                        {item?.title}
                      </h3>
                      <ul className='about-list'>
                        <li>
                          <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>
                            {item?.desc}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              )
            else
              return (
                <section className='about-section about_section_order'>
                  <div className='about-left-section'>
                    <div className='header-title'>
                      <h3 className='heading'>
                        {item?.title}
                      </h3>
                      <ul className='about-list'>
                        <li>
                          <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>
                            {item?.desc}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='about-right-section'>
                    <img src={item?.image ? item?.image : require('../../assets/images/about.png')} alt={item?.title} />
                  </div>
                </section>
              )
          })}
        </>
        : null} */}

      <section className='section-mission-vission'>
        <div className='container-fluid p-0'>
          <div className='row m-0'>
            <div className='col-lg-4 col-md-6 p-0'>
              <div className='same-box-div'>
                {data?.section?.length > 0 ?
                  <img src={data?.section[0]?.image} alt='vission' />
                  :
                  <img src={require('../../assets/images/vission.png')} alt='vission' />
                }
              </div>
            </div>
            <div className='col-lg-4 col-md-6 p-0'>
              <div className='same-box-div mission'>
                {data?.section?.length > 0 ?
                  <>
                    <h5>{data?.section[0]?.title}</h5>
                    <div className='overlay-content'>
                      <p>{data?.section[0]?.desc}</p>
                    </div>
                  </>
                  : null}
              </div>
            </div>
            <div className='col-lg-4 col-md-6 p-0'>
              <div className='same-box-div'>
                {data?.section?.length > 1 ?
                  <img src={data?.section[1]?.image} alt='vission' />
                  :
                  <img src={require('../../assets/images/vission.png')} alt='vission' />
                }
              </div>
            </div>
            <div className='col-lg-4 col-md-6 p-0'>
              <div className='same-box-div vision'>
                {data?.section?.length > 1 ?
                  <>
                    <h5>{data?.section[1]?.title}</h5>
                    <div className='overlay-content'>
                      <p>{data?.section[1]?.desc}</p>
                    </div>
                  </>
                  : null}
              </div>
            </div>
            <div className='col-lg-4 col-md-6 p-0'>
              <div className='same-box-div'>
                <img src={require('../../assets/images/Onwardl 1.png')} alt='vission' />
              </div>
            </div>
            <div className='col-lg-4 col-md-6 p-0'>
              <div className='same-box-div values'>
                {data?.section?.length > 2 ?
                  <>
                    <h5>{data?.section[2]?.title}</h5>
                    <div className='overlay-content'>
                      <p>{data?.section[2]?.desc}</p>
                    </div>
                  </>
                  : null}
              </div>
            </div>
            <div className='col-lg-4 col-md-6 p-0'>
              <div className='same-box-div'>
                {data?.section?.length > 2 ?
                  <img src={data?.section[2]?.image} alt='vission' />
                  :
                  <img src={require('../../assets/images/vission.png')} alt='vission' />
                }
              </div>
            </div>
            <div className='col-lg-4 col-md-6 p-0'>
              <div className='same-box-div founder'>
                {data?.section?.length > 3 ?
                  <>
                    <h5>{data?.section[3]?.title}</h5>
                    <div className='overlay-content'>
                      <p>{data?.section[3]?.desc}</p>
                    </div>
                  </>
                  : null}
              </div>
            </div>
            <div className='col-lg-4 col-md-6 p-0'>
              <div className='same-box-div'>
                {data?.section?.length > 3 ?
                  <img src={data?.section[3]?.image} alt='vission' />
                  :
                  <img src={require('../../assets/images/vission.png')} alt='vission' />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className='onward-workspaces-offerings top gallery_section bottom padding-left-right'>
        <div className='workspaces-slider'>
          <div className='heading-title'>
            <h4 className='heading text-center  gallery_slider_heading who_we_are mb-4'>Who We Are?</h4>

          </div>
          <div className='who-card-section'>
            <Row>
              <Col lg={3} md={4} sm={6}>
                <div className='card-box-who'>
                  <div className='icon-w-box'>
                    <img src={require('../../assets/images/location.png')} alt='location' />
                  </div>
                  <h4>Location</h4>
                  <p>We’re in the most prime locations — which makes commuting to Onward a cake walk, be it via the metro or your vehicle.</p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6}>
                <div className='card-box-who'>
                  <div className='icon-w-box'>
                    <img src={require('../../assets/images/flexibility.png')} alt='flexibility' />
                  </div>
                  <h4>Flexibility</h4>
                  <p>Do you go to the office only once or twice a week? Then why pay rent for the whole month when you can "book even by the day" with us.</p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6}>
                <div className='card-box-who'>
                  <div className='icon-w-box'>
                    <img src={require('../../assets/images/affordability.png')} alt='affordability' />
                  </div>
                  <h4>Affordability</h4>
                  <p>You may have a hundred things to worry about, but our plans aren't one of them. Check our competitive pricing that starts as low as Rs. 4,000/- per month.</p>
                </div>
              </Col>
              <Col lg={3} md={4} sm={6}>
                <div className='card-box-who'>
                  <div className='icon-w-box'>
                    <img src={require('../../assets/images/services.png')} alt='services' />
                  </div>
                  <h4>Services</h4>
                  <p>Secure Business Grade IT Infrastructure with On-site IT support to keep your business connected & on the go, always.</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section> */}
      {data && data?.point?.length ?
        <section className="requirement-section top bottom padding-left-right">
          <div className='cotent-section requirement-form-section'>
            <Row>
              <Col lg={6}>
                <div className='left-section left-section_about get_form'>
                  <h4 className='heading requirement-heading mb-3'>{data?.pointTitle}</h4>
                  {data?.point?.map((item) => (
                    <div>
                      <h5>{item?.title}</h5>
                      <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>
                        {item?.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </Col>
              <Col lg={6}>
                <div className='right-section'>
                  <img src={data?.pointImage ? data?.pointImage : require('../../assets/images/unsplash_XfC8MMTiEfw.png')} alt={data?.pointTitle}
                    style={{ borderRadius: 20 }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </section>
        : null}
      {/* Founder */}
      {/* {data?.founder?.length ?
        <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
          <div className='workspaces-slider'>
            <div className='heading-title'>
              <h4 className='heading text-center workspaces'>Founder</h4>
              <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.founderDesc}</p>
            </div>
            {
              data?.founder?.length <= 3 ?
                <div className='normal-design-box'>
                  <div className='row justify-content-center'>
                    {data?.founder?.map((item, index) => (
                      <div className='col-lg-4 col-md-6'>
                        <div className='slider-item'>
                          <div className='item-image'>
                            <img src={item?.image ? item?.image : require('../../assets/images/1702539206840.webp')} alt={item?.title} />
                          </div>
                          <div className='card_box'>
                            <p>{item?.desc}</p>
                            <span>{item?.title}</span>
                            <p>{item?.role}</p>
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
                      swiperRef.current = swiper;
                    }}
                    // navigation={true}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper workspace swiper-section"
                  >
                    {data?.founder?.map((item, index) => (
                      <SwiperSlide>
                        <div className='slider-item'>
                          <div className='item-image'>
                            <img src={item?.image ? item?.image : require('../../assets/images/1702539206840.webp')} alt={item?.title} />
                          </div>
                          <div className='card_box'>
                            <p>{item?.desc}</p>
                            <span>{item?.title}</span>
                            <p>{item?.role}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {data?.founder?.length > 3 &&
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
        : null} */}


      {/* {data?.media?.length &&

        <section className='onward-workspaces-offerings top bottom padding-left-right'>
          <div className='workspaces-slider'>
            <div className='heading-title'>
              <h4 className='heading text-center workspaces'>News & Media</h4>
              <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>{data?.mediaDesc}</p>
            </div>
            <div className='explore-section'>
              <Row>
                <Col lg={6} md={12}>
                  <Link to='/#'>
                    <div className='thumb-image-box'>
                      <img src={data?.media[0] ? data?.media[0] : require('../../assets/images/item-i.png')} alt="News & Media image 1" />
                    </div>
                  </Link>
                </Col>
                {data?.media?.length > 1 &&
                  <Col lg={6} md={12}>
                    <Link to='/#'>
                      <div className='thumb-image-box'>
                        <img src={data?.media[1] ? data?.media[1] : require('../../assets/images/item-i.png')} alt="News & Media image 2" />
                      </div>
                    </Link>
                  </Col>
                }
                {data?.media?.length > 2 &&
                  <Col lg={4} md={12}>
                    <Link to='/#'>
                      <div className='thumb-image-box thumb_image_box'>
                        <img src={data?.media[2] ? data?.media[2] : require('../../assets/images/item-i.png')} alt="News & Media image 3" />
                      </div>
                    </Link>
                  </Col>
                }
                {data?.media?.length > 3 &&
                  <Col lg={4} md={12}>
                    <Link to='/#'>
                      <div className='thumb-image-box thumb_image_box'>
                        <img src={data?.media[3] ? data?.media[3] : require('../../assets/images/item-i.png')} alt="News & Media image 4" />
                      </div>
                    </Link>
                  </Col>
                }
                {data?.media?.length > 4 &&
                  <Col lg={4} md={12}>
                    <Link to='/#'>
                      <div className='thumb-image-box thumb_image_box'>
                        <img src={data?.media[4] ? data?.media[4] : require('../../assets/images/item-i.png')} alt="News & Media image 5" />
                      </div>
                    </Link>
                  </Col>
                }
              </Row>
            </div>
          </div>
        </section>
      } */}
      {/* Testimonial */}
      {data?.testi?.length ?
        <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
          <div className='workspaces-slider'>
            <div className='heading-title'>
              <h4 className='heading text-center workspaces'>Onward Workspaces Offerings</h4>
              <p className='paragraph'>We understand that selecting the right co-working space is a crucial decision. We're here to help you make an<br /> informed choice and tailor our offerings to meet your specific needs.</p>
            </div>
            {
              data?.testi?.length <= 3 ?
                <div className='normal-design-box'>
                  <div className='row justify-content-center'>
                    {data?.testi?.map((item, index) => (
                      <div className='col-lg-4 col-md-6'>
                        <div className='slider-item'>
                          <div className='item-image'>
                            <img src={item?.image ? item?.image : require('../../assets/images/team.png')} alt={item?.name} />
                          </div>
                          <div className='card_box'>
                            <p style={{ fontSize: 14 }}>{expandedIndexes.includes(index) ? item.desc : `${item.desc.slice(0, 120)}...`} <button className='read-more' onClick={() => toggleExpand(index)}>{expandedIndexes.includes(index) ? ' Read Less' : ' Read More'}</button><br /></p>

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
                      <SwiperSlide>
                        <div className='slider-item'>
                          <div className='item-image'>
                            <img src={item?.image ? item?.image : require('../../assets/images/team.png')} alt={item?.name} />
                          </div>
                          <div className='card_box'>
                            <p style={{ fontSize: 14 }}>{expandedIndexes.includes(index) ? item.desc : `${item.desc.slice(0, 120)}...`} <button className='read-more' onClick={() => toggleExpand(index)}>{expandedIndexes.includes(index) ? ' Read Less' : ' Read More'}</button><br /></p>

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
    </>
  )
}
