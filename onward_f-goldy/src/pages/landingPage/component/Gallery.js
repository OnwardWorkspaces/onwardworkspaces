import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, EffectCoverflow } from 'swiper/modules';
export default function Gallery(props) {

    const { data } = props;

    return (
        <section className='onward-workspaces-offerings top_0 gallery_section bottom_0 padding-left-right'>
            <div className='workspaces-slider'>
                <div className='heading-title'>
                    <h4 className='heading text-center  gallery_slider_heading workspaces'>Our Gallery</h4>

                </div>
                {
                    data?.length <= 3 ?
                        <div className='normal-design-box gallery-section-normal mt-4'>
                            <div className='row justify-content-center '>
                                {data?.map((item) => (
                                    <div className='col-lg-4 col-md-6' key={item?._id}>
                                        <div className='gallery-item'>
                                            <img src={item ? item : require('../../../assets/images/gallery.png')} alt='gallery' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <div className='slider-section'>
                            <Swiper
                                effect={'coverflow'}
                                grabCursor={true}
                                loop={true}
                                // centeredSlides={true}
                                slidesPerView={'auto'}
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
                                {data?.map((item) => (
                                    <SwiperSlide key={item?._id}>
                                        <div className='gallery-item'>
                                            <img src={item ? item : require('../../../assets/images/gallery.png')} alt='gallery' />
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
    )
}
