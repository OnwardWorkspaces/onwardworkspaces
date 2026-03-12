import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function FAQ(props) {

    const { data } = props;

    return (
        <section className="fqa-section top-0 bottom padding-left-right">
            <div className='faq_box'>
                <div className='heading-title'>
                    <h4 className='heading text-center workspaces'>Frequently asked questions</h4>
                    <p className='paragraph'>Everything you need to know about the product and billing.</p>
                </div>
                <div className="accordion" id="accordionExample">
                    {data?.map((item, index) => (
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
    )
}
