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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import Location from '../../assets/images/location.svg'
import Flexibility from '../../assets/images/flexibility.svg'
import Affordability from '../../assets/images/affordability.svg'
import Services from '../../assets/images/services.svg'
import { useRef } from 'react';
import Newsletter from '../home/Newsletter';
export default function Details() {
    const swiperRef = useRef();
    const swiperRef1 = useRef();
    const swiperRef2 = useRef();
    useEffect(() => {

        window.scrollTo(0, 0);
      }, [])
    return (
        <>
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
                        <SwiperSlide>
                            <div className='banner_item'>
                                <img src={require('../../assets/images/banner-s.png')} alt='gallery' />
                                <div className='inner-banner-content top bottom'>
                                    <h1 className='heading'>Onward Berger Ahmedabad One</h1>
                                    <p className='paragraph'>
                                        Sector 16, C-001/A2, Sector 16B, Gautam Buddha Nagar, Ahmedabad, Gujarat 380061
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='banner_item'>
                                <img src={require('../../assets/images/banner-s.png')} alt='gallery' />
                                <div className='inner-banner-content top bottom'>
                                    <h1 className='heading'>Onward Berger Ahmedabad One</h1>
                                    <p className='paragraph'>
                                        Sector 16, C-001/A2, Sector 16B, Gautam Buddha Nagar, Ahmedabad, Gujarat 380061
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='banner_item'>
                                <img src={require('../../assets/images/banner-s.png')} alt='gallery' />
                                <div className='inner-banner-content top bottom'>
                                    <h1 className='heading'>Onward Berger Ahmedabad One</h1>
                                    <p className='paragraph'>
                                        Sector 16, C-001/A2, Sector 16B, Gautam Buddha Nagar, Ahmedabad, Gujarat 380061
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='banner_item'>
                                <img src={require('../../assets/images/banner-s.png')} alt='gallery' />
                                <div className='inner-banner-content top bottom'>
                                    <h1 className='heading'>Onward Berger Ahmedabad One</h1>
                                    <p className='paragraph'>
                                        Sector 16, C-001/A2, Sector 16B, Gautam Buddha Nagar, Ahmedabad, Gujarat 380061
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='banner_item'>
                                <img src={require('../../assets/images/banner-s.png')} alt='gallery' />
                                <div className='inner-banner-content top bottom'>
                                    <h1 className='heading'>Onward Berger Ahmedabad One</h1>
                                    <p className='paragraph'>
                                        Sector 16, C-001/A2, Sector 16B, Gautam Buddha Nagar, Ahmedabad, Gujarat 380061
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='banner_item'>
                                <img src={require('../../assets/images/banner-s.png')} alt='gallery' />
                                <div className='inner-banner-content top bottom'>
                                    <h1 className='heading'>Onward Berger Ahmedabad One</h1>
                                    <p className='paragraph'>
                                        Sector 16, C-001/A2, Sector 16B, Gautam Buddha Nagar, Ahmedabad, Gujarat 380061
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
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
                </div>
            </section>
            <section className="requirement-section top bottom padding-left-right">
                <div className='cotent-section p-0 requirement-form-section requirement-section-two'>
                    <Row>

                        <Col lg={6}>
                            <div className='right-section'>
                                <h4 className='heading requirement-heading'>Create your best work at<br /> our coworking space in<br /> Ahmedabad</h4>
                                <p className='paragraph'>Situated in a prime location near the Noida government buildings, the famed Film City, and the Okhla Bird Sanctuary, our shared office in Sector 16B, is a fitting home for entrepreneurs and enterprises alike. An inspiring mix of industry leaders and businesses are the highlight of this Onward in Ahmedabad. Greet a new client in our light-filled lounges, touch base with the team in your own private office, or host a brainstorming session in one of our bright, modern conference rooms. Commuting is simple from this coworking space in Ahmedabad through trains and buses at the nearby Ahmedabad transit station. Whether you’re a creative freelancer in the city’s entertainment sector or launching a startup to compete in Ahmedabad rapidly growing tech scene, our vibrant Onward Berger Delhi One workspace will help you grow and thrive. Schedule a visit today.</p>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='left-section get_form'>

                                <AvForm className="requirement-form">
                                    <h3>Get started for free</h3>
                                    <div className='mb-3'>
                                        <AvField type="text" name="name" placeholder="Enter Your Name" />
                                    </div>
                                    <div className='mb-3'>
                                        <AvField type="email" name="email" placeholder="Enter Your Email Id" />
                                    </div>
                                    <div className='mb-3'>
                                        <AvField type="number" name="mobile"
                                            onWheel={(event) => event.currentTarget.blur()}
                                            placeholder="Enter Your Mobile Number" />
                                    </div>
                                    <div className='mb-3'>
                                        <AvField type="textarea" name="message" rows={4} placeholder="Enter Your Message" />
                                    </div>
                                    <button className='button_2'>SUBMIT</button>
                                </AvForm>
                                <p className='paragraph'>
                                    By clicking the above button, you agree to <a href='#'>Our Terms of Service</a> and confirm that you have read and understood our <a href='#'>Privacy Policy</a>.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className='clients-section mt-0 top-0 bottom padding-left-right'>
                <div className='clients_box'>
                    <div className='heading-title'>
                        <h4 className='heading text-center  gallery_slider_heading workspaces'>Our Client</h4>

                    </div>
                    <div className='slider-section'>
                        <Swiper
                            slidesPerView={2.4}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
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
                            modules={[Pagination]}
                            className="mySwiper client_logo-slider swiper-section"
                        >
                            <SwiperSlide>
                                <div className='clients-item'>
                                    <img src={require('../../assets/images/client.png')} alt='client' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='clients-item'>
                                    <img src={require('../../assets/images/client.png')} alt='client' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='clients-item'>
                                    <img src={require('../../assets/images/client.png')} alt='client' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='clients-item'>
                                    <img src={require('../../assets/images/client.png')} alt='client' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='clients-item'>
                                    <img src={require('../../assets/images/client.png')} alt='client' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='clients-item'>
                                    <img src={require('../../assets/images/client.png')} alt='client' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='clients-item'>
                                    <img src={require('../../assets/images/client.png')} alt='client' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='clients-item'>
                                    <img src={require('../../assets/images/client.png')} alt='client' />
                                </div>
                            </SwiperSlide>
                        </Swiper>

                    </div>
                </div>
            </section>

            <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
                <div className='workspaces-slider'>
                    <div className='heading-title'>
                        <h2 className='heading text-center workspaces'>Onward Workspaces Offerings</h2>
                        <p className='paragraph'>We understand that selecting the right co-working space is a crucial decision. We're here to help you make an<br /> informed choice and tailor our offerings to meet your specific needs.</p>
                    </div>
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
                                swiperRef.current = swiper;
                            }}
                            // navigation={true}
                            modules={[Navigation]}
                            className="mySwiper workspace swiper-section"
                        >
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
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
                </div>
            </section>

            <section className='onward-workspaces-offerings top-0 gallery_section gallery_section_inner bottom-0 padding-left-right'>
                <div className='workspaces-slider'>
                    <div className='heading-title'>
                        <h4 className='heading text-center  gallery_slider_heading workspaces'>Our Gallery</h4>

                    </div>
                    <div className='slider-section'>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            loop={true}
                            // centeredSlides={true}
                            slidesPerView={1.3}
                            coverflowEffect={{
                                rotate: 10,
                                stretch: 0,
                                depth: -80,
                                modifier: 1,
                                slideShadows: false,
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
                            modules={[Navigation, EffectCoverflow]}
                            className="mySwiper gallery_slider swiper-section"
                        >
                            <SwiperSlide>
                                <div className='gallery-item'>
                                    <img src={require('../../assets/images/gallery.png')} alt='gallery' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='gallery-item'>
                                    <img src={require('../../assets/images/gallery.png')} alt='gallery' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='gallery-item'>
                                    <img src={require('../../assets/images/gallery.png')} alt='gallery' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='gallery-item'>
                                    <img src={require('../../assets/images/gallery.png')} alt='gallery' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='gallery-item'>
                                    <img src={require('../../assets/images/gallery.png')} alt='gallery' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='gallery-item'>
                                    <img src={require('../../assets/images/gallery.png')} alt='gallery' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='gallery-item'>
                                    <img src={require('../../assets/images/gallery.png')} alt='gallery' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='gallery-item'>
                                    <img src={require('../../assets/images/gallery.png')} alt='gallery' />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        {/* <div className='gallery_section_p'>
                            <Row>
                                <Col lg={6}>
                                    <div className='big_box_img'>
                                        <img src='https://a0.muscache.com/im/pictures/miso/Hosting-12880468/original/889dfd29-dda6-4fe1-bd3f-8cf8e263a053.jpeg?im_w=960' />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className='big_box_img_right'>
                                        <Row>
                                            <Col lg={6} md={6}>
                                                <div className='small_img_box'>
                                                    <img src='https://a0.muscache.com/im/pictures/miso/Hosting-12880468/original/889dfd29-dda6-4fe1-bd3f-8cf8e263a053.jpeg?im_w=960' />
                                                </div>
                                            </Col>
                                            <Col lg={6} md={6}>
                                                <div className='small_img_box'>
                                                    <img src='https://a0.muscache.com/im/pictures/miso/Hosting-12880468/original/889dfd29-dda6-4fe1-bd3f-8cf8e263a053.jpeg?im_w=960' />
                                                </div>
                                            </Col>
                                            <Col lg={6} md={6}>
                                                <div className='small_img_box'>
                                                    <img src='https://a0.muscache.com/im/pictures/miso/Hosting-12880468/original/889dfd29-dda6-4fe1-bd3f-8cf8e263a053.jpeg?im_w=960' />
                                                </div>
                                            </Col>
                                            <Col lg={6} md={6}>
                                                <div className='small_img_box'>
                                                    <img src='https://a0.muscache.com/im/pictures/miso/Hosting-12880468/original/889dfd29-dda6-4fe1-bd3f-8cf8e263a053.jpeg?im_w=960' />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div> */}
                    </div>
                </div>
            </section>
            <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
                <div className='workspaces-slider'>
                    <div className='heading-title'>
                        <h2 className='heading text-center padding_bottom workspaces'>Workspaces Available in Delhi</h2>
                    </div>
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
                                swiperRef.current = swiper;
                            }}
                            // navigation={true}
                            modules={[Navigation]}
                            className="mySwiper workspace swiper-section"
                        >
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/item.png')} alt='item' />
                                    </div>
                                    <div className='card-box'>
                                        <h6>Open Workstation</h6>
                                        <p>Capacity 100</p>
                                    </div>
                                </div>
                            </SwiperSlide>
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
                </div>
            </section>
            <section className='onward-workspaces-offerings top-0 bottom padding-left-right near_by_area'>
                <div className='workspaces-slider'>
                    <div className='heading-title padding-left-right'>
                        <h3 className='heading text-center workspaces'>Near By Area</h3>
                        <p className='paragraph'>Alluring properties in dazzling Ahmedabad are waiting for highly discerning tastes under various categories and fascinating<br /> locations listed here.​</p>
                    </div>
                    <div className='explore-section slider-section mt-0'>
                        <Swiper
                            slidesPerView={1.3}
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
                                    slidesPerView: 3.4,
                                    spaceBetween: 10,
                                },
                                1024: {
                                    slidesPerView: 4.6,
                                    spaceBetween: 10,
                                },
                            }}
                            onBeforeInit={(swiper) => {
                                swiperRef1.current = swiper;
                            }}
                            // navigation={true}
                            modules={[Navigation]}
                            className="mySwiper swiper-section"
                        >
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='nearby-gallery'>
                                    <img src={require('../../assets/images/rectangle_166.png')} alt='rectangle_166' />
                                    <div className='n-content-box-s'>
                                        <a href='#' className='n-content-box'>
                                            <h4>Ahmedabad</h4>
                                            <span>Chanakyapuri road</span>
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div className='cuttom-slider-button-box padding-left-right'>
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
                    </div>
                </div>
            </section>

            <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
                <div className='workspaces-slider'>
                    <div className='heading-title'>
                        <h4 className='heading text-center workspaces'>Onward Workspaces Offerings</h4>
                        <p className='paragraph'>We understand that selecting the right co-working space is a crucial decision. We're here to help you make an<br /> informed choice and tailor our offerings to meet your specific needs.</p>
                    </div>
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
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/team.png')} alt='team' />
                                    </div>
                                    <div className='card_box'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        <span>Jenny Wilson</span>
                                        <div className='rating_box'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/team.png')} alt='team' />
                                    </div>
                                    <div className='card_box'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        <span>Jenny Wilson</span>
                                        <div className='rating_box'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/team.png')} alt='team' />
                                    </div>
                                    <div className='card_box'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        <span>Jenny Wilson</span>
                                        <div className='rating_box'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/team.png')} alt='team' />
                                    </div>
                                    <div className='card_box'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        <span>Jenny Wilson</span>
                                        <div className='rating_box'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/team.png')} alt='team' />
                                    </div>
                                    <div className='card_box'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        <span>Jenny Wilson</span>
                                        <div className='rating_box'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/team.png')} alt='team' />
                                    </div>
                                    <div className='card_box'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        <span>Jenny Wilson</span>
                                        <div className='rating_box'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/team.png')} alt='team' />
                                    </div>
                                    <div className='card_box'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        <span>Jenny Wilson</span>
                                        <div className='rating_box'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/team.png')} alt='team' />
                                    </div>
                                    <div className='card_box'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        <span>Jenny Wilson</span>
                                        <div className='rating_box'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path id="Vector" d="M8.31359 0.205137L10.5966 5.05692L15.7 5.83512C15.7648 5.84519 15.8256 5.87396 15.8756 5.9182C15.9255 5.96243 15.9627 6.02037 15.9829 6.0855C16.0031 6.15062 16.0054 6.22034 15.9898 6.28681C15.9741 6.35327 15.941 6.41384 15.8941 6.46169L12.202 10.2374L13.0737 15.57C13.0849 15.6374 13.0779 15.7067 13.0533 15.7701C13.0288 15.8336 12.9877 15.8885 12.9348 15.9288C12.8819 15.9691 12.8193 15.9931 12.754 15.998C12.6887 16.003 12.6234 15.9887 12.5655 15.9569L8.00052 13.4397L3.43557 15.9576C3.37769 15.9896 3.31238 16.0039 3.24708 15.9991C3.18178 15.9942 3.11909 15.9703 3.06616 15.93C3.01322 15.8897 2.97214 15.8347 2.94761 15.7713C2.92307 15.7078 2.91605 15.6385 2.92734 15.571L3.79908 10.2374L0.105859 6.46169C0.0590308 6.41384 0.0259117 6.35327 0.0102315 6.28681C-0.00544867 6.22034 -0.00306709 6.15062 0.0171081 6.0855C0.0372832 6.02037 0.0744506 5.96243 0.124425 5.9182C0.174398 5.87396 0.235194 5.84519 0.299965 5.83512L5.40341 5.05692L7.68745 0.205137C7.71593 0.143655 7.76041 0.0918035 7.81578 0.055523C7.87115 0.0192424 7.93517 0 8.00052 0C8.06587 0 8.1299 0.0192424 8.18527 0.055523C8.24063 0.0918035 8.28511 0.143655 8.31359 0.205137Z" fill="#111111" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>

                        </Swiper>
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
                    </div>
                </div>
            </section>
            <section className="requirement-section top-0 bottom padding-left-right">
                <div className='cotent-section requirement-form-section'>
                    <Row>

                        <Col lg={6}>
                            <div className='right-section'>
                                <img src={require('../../assets/images/form-img.png')} alt='form-img' />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='left-section get_form'>
                                <h4 className='heading requirement-heading'>Discuss you requirements with our expert</h4>
                                <p className='paragraph'>Whether you have questions about membership options, need assistance with technical aspects, or want to explore customization possibilities for your workspace, our experts are here to provide you with personalized guidance and solutions.</p>
                                <AvForm className="requirement-form">
                                    <h3>Get started for free</h3>
                                    <div className='mb-3'>
                                        <AvField type="text" name="name" placeholder="Enter Your Name" />
                                    </div>
                                    <div className='mb-3'>
                                        <AvField type="email" name="email" placeholder="Enter Your Email Id" />
                                    </div>
                                    <div className='mb-3'>
                                        <AvField type="number" name="mobile"
                                            onWheel={(event) => event.currentTarget.blur()}
                                            placeholder="Enter Your Mobile Number" />
                                    </div>
                                    <div className='mb-3'>
                                        <AvField type="textarea" name="message" rows={4} placeholder="Enter Your Message" />
                                    </div>
                                    <button className='button_2'>SUBMIT</button>
                                </AvForm>

                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className="fqa-section top-0 bottom padding-left-right">
                <div className='faq_box'>
                    <div className='heading-title'>
                        <h4 className='heading text-center workspaces'>Frequently asked questions</h4>
                        <p className='paragraph'>Everything you need to know about the product and billing.</p>
                    </div>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Is there a free trial available?
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p className='paragraph'>
                                        Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Can I change my plan later?
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p className='paragraph'>
                                        Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Accordion Item #3
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p className='paragraph'><strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Newsletter />
        </>
    )
}
