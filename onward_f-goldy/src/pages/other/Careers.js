
import React, { useEffect, useRef, useState } from 'react'
import {
    Row,
    Col,
    Card,
    Alert,
    CardBody,
    Media,
    Table,
    CardTitle,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button
} from "reactstrap"
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import Newsletter from '../home/Newsletter';
import GoogleMapReact from 'google-map-react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, post } from '../../helpers/helper_api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
export default function Careers() {

    const params = useParams();
    const navigate = useNavigate();
    const swiperRef = useRef();
    const swiperRef1 = useRef();
    const swiperRef2 = useRef();

    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);

    const toggle = () => setModal(!modal);
    const toggle1 = () => setModal1(!modal1);

    useEffect(() => {

        window.scrollTo(0, 0);
      }, [])




    return (
        <>

            <Modal isOpen={modal1} size="md" toggle={toggle1}>
                <ModalHeader toggle={toggle1}>APPLY FOR JOB</ModalHeader>
                <ModalBody>
                    <div class="modal_body_job_name">

                        <section className=" contact_us_form top-0 ">
                            <div className='cotent-section top contact_us_form'>
                                <Row>
                                    <Col className='order_2' lg={12}>
                                        <div className='left-section contect-form'>

                                            <AvForm >
                                                <Row>

                                                    <Col lg={12}>
                                                        <div className='form_field'>
                                                            <label for="exampleInputName" class="form-label">Name</label>
                                                            <AvField type="text" name="name" placeholder=" Name" required />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className='form_field'>
                                                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                                                            <AvField type="email" name="email" placeholder="Email" required />

                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className='form_field'>
                                                            <label for="exampleInputMobile Number" class="form-label">Mobile Number</label>
                                                            <AvField type="number" name="mobile" placeholder=" Mobile  Number" required />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className='form_field'>
                                                            <label for="exampleInputResume" class="form-label"> Resume</label>
                                                            <AvField type="file" name="resume" placeholder="Upload-Resume" required />
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <button className='button_2' type='submit'>SUBMIT</button>
                                                    </Col>
                                                </Row>
                                            </AvForm>
                                        </div>

                                    </Col>

                                </Row>
                            </div>
                        </section>
                    </div>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
            <Modal isOpen={modal} size="md" toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <div class="modal_body_job_name">

                        <h6>Job Description</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat consequat congue. Vivamus faucibus finibus neque at feugiat. Nullam at facilisis risus, nec luctus purus. Phasellus vel orci elit. Proin aliquam porta justo sit amet hendrerit. Donec eget lacus ultricies metus auctor laoreet. Donec neque libero, aliquam in lorem in, venenatis rutrum sem. Sed elit tortor, sagittis ut sem vel, porta venenatis est. Suspendisse ullamcorper dictum sollicitudin. Donec porttitor lorem vitae rhoncus finibus. Ut quam ex, rhoncus at odio at, pulvinar varius eros. Aenean vel tellus sit amet arcu rutrum imperdiet. Mauris consectetur turpis nec justo molestie, et tempor sapien mattis. Proin eleifend eu neque eu posuere. Duis orci mauris, suscipit at vehicula in, auctor eget eros.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat consequat congue. Vivamus faucibus finibus neque at feugiat. Nullam at facilisis risus, nec luctus purus. Phasellus vel orci elit. Proin aliquam porta justo sit amet hendrerit. Donec eget lacus ultricies metus auctor laoreet. Donec neque libero, aliquam in lorem in, venenatis rutrum sem. Sed elit tortor, sagittis ut sem vel, porta venenatis est. Suspendisse ullamcorper dictum sollicitudin. Donec porttitor lorem vitae rhoncus finibus. Ut quam ex, rhoncus at odio at, pulvinar varius eros. Aenean vel tellus sit amet arcu rutrum imperdiet. Mauris consectetur turpis nec justo molestie, et tempor sapien mattis. Proin eleifend eu neque eu posuere. Duis orci mauris, suscipit at vehicula in, auctor eget eros.</p>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='button-apply' onClick={toggle}>
                        Apply Now
                    </button>{' '}
                    <button color="secondary" className='button-apply' onClick={toggle}>
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
            <section className='inner-banner'>
                <img src={require('../../assets/images/listing-banner.png')} alt='banner' />
                <div className='inner-banner-content-two top bottom padding-left-right'>
                    <h1 className='heading'>careers</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Careers</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className='job_opening contect-form padding-left-right'>
                <div className='container-fluid mt-5 '>
                    <AvForm>
                        <Row>

                            <h4 className='heading'>Job Opening</h4>
                            <Col lg={5}>

                                <div className='form_field'>
                                    <AvField type="select" name="select" label="Department" >
                                        <option>Marketing</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </AvField>
                                </div>
                            </Col>
                            <Col lg={5}>
                                <div className='form_field'>
                                    <AvField type="select" name="select" label="Roles">
                                        <option>Revenge Manager</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </AvField>
                                </div>
                            </Col>
                            <Col lg={2}>
                                <div className='form_field_new'>
                                    <button className='btn button_2 '>view </button>
                                </div>
                            </Col>


                        </Row>
                    </AvForm>
                </div>
            </section>
            <section className='refer-section top-0 bottom-0 padding-left-right'>
                <div className='container-fluid mt-5'>

                    <Row className='associate  '>
                        <Col lg={4}>
                            <div className='reward '>
                                <div className='slider-item earn-box '>

                                    <div className='card_box job-name'>
                                        <h4>AGN-Executive Distribution Manager </h4>
                                        <h5>Marketing</h5>
                                        <h6> Hexware Technology</h6>

                                        <p className='mb-3 p-0'> <img src={require('../../assets/images/location.png')} /> Gurgaon

                                        </p>
                                        <button className='mb-3 button-apply' onClick={toggle1}>Apply Now</button>
                                        <button className='mb-3 button-apply' onClick={toggle}>View More</button>

                                        <p className='p-0'>5d ago</p>


                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='reward'>
                                <div className='slider-item earn-box '>

                                    <div className='card_box job-name'>
                                        <h4>AGN-Executive Distribution Manager </h4>
                                        <h5>Marketing</h5>
                                        <h6> Hexware Technology</h6>

                                        <p className='mb-3 p-0'> <img src={require('../../assets/images/location.png')} /> Gurgaon

                                        </p>
                                        <button className='mb-3 button-apply' onClick={toggle1}>Apply Now</button>
                                        <button className='mb-3 button-apply' onClick={toggle}>View More</button>

                                        <p className='p-0'>5d ago</p>


                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className='reward'>
                                <div className='slider-item earn-box'>

                                    <div className='card_box job-name'>
                                        <h4>AGN-Executive Distribution Manager </h4>
                                        <h5>Marketing</h5>
                                        <h6> Hexware Technology</h6>

                                        <p className='mb-3 p-0'> <img src={require('../../assets/images/location.png')} /> Gurgaon

                                        </p>
                                        <button className='mb-3 button-apply' onClick={toggle1}>Apply Now</button>
                                        <button className='mb-3 button-apply' onClick={toggle}>View More</button>

                                        <p className='p-0'>5d ago</p>


                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>
            </section>
            <section className='working padding-left-right bottom'>
                <div className='container-fliud mt-5'>

                    <Row>
                        <Col lg={9}>
                            <h4 className='heading padding_bottom'> Working for Onwards</h4>
                            <div className='working-card'>
                                <h6> Inclusion and diversity</h6>
                                <p> At Onward Workspaces, we believe in creating an inclusive and diverse <br /> workplace that welcomes people of all backgrounds.<br /> We celebrate diversity in all its forms and believe it is <br /> crucial to our success as a company. We are <br /> committed to building a culture of respect, openness, <br /> and inclusivity so everyone can bring their authentic <br /> selves to work.</p>
                            </div>
                            <hr />
                            {/* <div className='working-card'>
                                <h6> Inclusion and diversity</h6>
                                <p> At Onward Workspaces, we believe in creating an inclusive and diverse <br /> workplace that welcomes people of all backgrounds.<br /> We celebrate diversity in all its forms and believe it is <br /> crucial to our success as a company. We are <br /> committed to building a culture of respect, openness, <br /> and inclusivity so everyone can bring their authentic <br /> selves to work.</p>
                            </div> */}
                        </Col>
                        <Col lg={3}>
                            <div className='working-card'>
                                <img src={require('../../assets/images/gallery.png')} />
                                {/* <img src={require('../../assets/images/gallery.png')} /> */}
                            </div>

                        </Col>
                    </Row>

                </div>
            </section>
            {/* <section className='accordian padding-left-right'>
                <div className='container-fluid mt-5'>
                    <h1> FAQ </h1>
                    <p> These seven values are our guiding principles, and you can hold us to them</p>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Lorem collapse
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Lorem collapse
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Lorem collapse
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section> */}
            {/* <section className='onward-workspaces-offerings top bottom padding-left-right'>
                <div className='workspaces-slider'>

                    <div className='explore-section'>
                        <Row>
                            <Col lg={6} md={12}>
                                <Link to='/#'>
                                    <div className='thumb-image-box'>
                                        <img src={require('../../assets/images/item-i.png')} alt="" />

                                    </div>
                                </Link>
                            </Col>
                            <Col lg={6} md={12}>
                                <Link to='/#'>
                                    <div className='thumb-image-box'>
                                        <img src={require('../../assets/images/item-i.png')} alt="" />

                                    </div>
                                </Link>
                            </Col>
                            <Col lg={4} md={12}>
                                <Link to='/#'>
                                    <div className='thumb-image-box thumb_image_box'>
                                        <img src={require('../../assets/images/item-i.png')} alt="" />

                                    </div>
                                </Link>
                            </Col>
                            <Col lg={4} md={12}>
                                <Link to='/#'>
                                    <div className='thumb-image-box thumb_image_box'>
                                        <img src={require('../../assets/images/item-i.png')} alt="" />

                                    </div>
                                </Link>
                            </Col>
                            <Col lg={4} md={12}>
                                <Link to='/#'>
                                    <div className='thumb-image-box thumb_image_box'>
                                        <img src={require('../../assets/images/item-i.png')} alt="" />

                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section> */}

            {/* Testimonial */}
            {/* <section className='onward-workspaces-offerings top-0 bottom padding-left-right'>
                <div className='workspaces-slider'>
                    <div className='heading-title'>
                        <h4 className='heading text-center workspaces'>Employee Experience</h4>
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
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slider-item'>
                                    <div className='item-image'>
                                        <img src={require('../../assets/images/1702539206840.webp')} alt="" />
                                    </div>
                                    <div className='card_box'>
                                        <p>“Onward is not just a workspace; it's a community that fosters collaboration. The modern infrastructure and friendly co-workers create an environment that inspires creativity and innovation.”</p>
                                        <span>Akash Bhardwaj</span>
                                        <p>Marketing Department</p>

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
            </section> */}
        </>
    )
}


