import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, EffectCoverflow } from 'swiper/modules';
export default function Properties() {
    const swiperRef = useRef();

    return (
        <>
            {/* PROPERTIES */}
            {/* {data?.property?.length && */}
                <section className='onward-workspaces-offerings top_0 bottom_0 padding-left-right' id="workspace">
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
                                <SwiperSlide >
                                    <Link to='#' className='text-decoration-none'>
                                        <div className='slider-item'>
                                            <div className='item-image'>
                                                <img src={require('../../../assets/images/item.png')} alt='' />
                                            </div>
                                            <div className='card-box'>
                                                <h6>Onward, Udhyog Vihar</h6>
                                                <p>Capacity 1200</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Link to='#' className='text-decoration-none'>
                                        <div className='slider-item'>
                                            <div className='item-image'>
                                                <img src={require('../../../assets/images/item.png')} alt='' />
                                            </div>
                                            <div className='card-box'>
                                                <h6>Onward, Udhyog Vihar</h6>
                                                <p>Capacity 1200</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Link to='#' className='text-decoration-none'>
                                        <div className='slider-item'>
                                            <div className='item-image'>
                                                <img src={require('../../../assets/images/item.png')} alt='' />
                                            </div>
                                            <div className='card-box'>
                                                <h6>Onward, Udhyog Vihar</h6>
                                                <p>Capacity 1200</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Link to='#' className='text-decoration-none'>
                                        <div className='slider-item'>
                                            <div className='item-image'>
                                                <img src={require('../../../assets/images/item.png')} alt='' />
                                            </div>
                                            <div className='card-box'>
                                                <h6>Onward, Udhyog Vihar</h6>
                                                <p>Capacity 1200</p>
                                            </div>
                                        </div>
                                    </Link>
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
            {/* } */}
        </>
    )
}
