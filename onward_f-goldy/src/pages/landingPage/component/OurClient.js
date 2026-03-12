import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, EffectCoverflow, Pagination } from 'swiper/modules';
export default function OurClient(props) {

    const { data } = props;

    return (
        <section className='clients-section top_0 bottom_0 padding-left-right'>
            <div className='clients_box'>
                <div className='heading-title'>
                    <h4 className='heading text-center  gallery_slider_heading workspaces'>Our Client</h4>
                </div>
                {
                    data?.length <= 6 ?
                        <div className='normal-design-box client_logo-slider mt-4'>
                            <div className='row justify-content-center'>
                                {data?.map((item) => (
                                    <div className='col-lg-2 col-md-4 col-sm-6' key={item?._id}>
                                        <div className='clients-item'>
                                            <img src={item?.image ? item?.image : require('../../../assets/images/client.png')} alt={'client'} />
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
                                {data?.map((item) => (
                                    <SwiperSlide key={item?._id}>
                                        <div className='clients-item'>
                                            <img src={item?.image ? item?.image : require('../../../assets/images/client.png')} alt={'client'} />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                }

            </div>
        </section>
    )
}
