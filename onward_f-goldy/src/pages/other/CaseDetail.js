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
import { Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
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

export default function BlogDetail() {

    const params = useParams();
    const navigate = useNavigate();
    const swiperRef = useRef();
    const swiperRef1 = useRef();
    const [data, setData] = useState(undefined);
    const [modalData, setModalData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const form = useRef();
    const form2 = useRef();
    const [currentFaq, setCurrentFaq] = useState(0);
    const [modal, setModal] = useState(false);

    // const toggle = () => setModal(!modal);
    useEffect(() => {

        window.scrollTo(0, 0);
      }, [])

    const modalPopup = (item) =>{
        setModal(!modal)
        setModalData(item)
    }
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
            get(`case/title?title=${params.title}`)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setData(res?.data);
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

    const handleLeadForm = (e, v, pos) => {
        if (!loading) {
            setLoading(true);
            let body = {
                ...v,
                from: "City",
                interestedIn: data?.title,
                formPosition: pos
            }
            if (pos == "Top Banner Form")
                body.name = v?.fname + " " + v?.lname;
            post("lead", body)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        // toast.success(res?.message);
                        form.current.reset();
                        form2.current.reset();
                        setTimeout(()=>{
                            navigate('/thank-you', {
                                state: { isThankuPage: true }
                            });
                          },500)
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
        let str = title.toLowerCase();
        str = str.split(" ").join("-");
        return str;
    }

    return (
        <>
            <Loader visible={loading} />
            <Modal isOpen={modal} centered toggle={modalPopup} className='content_modal' >
                <ModalHeader toggle={modalPopup}>{modalData?.title}</ModalHeader>
                <ModalBody>
                    <p>{modalData?.desc}</p>
                </ModalBody>
            </Modal>
            <section className='inner-banner inner-banner-slider blog_detail_page'>
                <div className='banner-img'>
                    <img src={data?.banner ? data?.banner : require('../../assets/images/city-banner.png')} alt='city-banner' />
                </div>
                <div className='inner-banner-content top bottom padding-left-right'>
                    <Row>
                        <Col lg={12}>
                            <div className='left-section text-center'>
                                <h1 className='heading'>{data?.titleShort}</h1>
                                <p className='paragraph'>
                                  {data?.title?.length > 80 ? data?.title?.substring(0, 80)+'...':data?.title}
                                </p>
                            </div>
                        </Col>
                       
                    </Row>
                </div>
            </section>
            {/* clientale */}
            
            <section className='clients-section blog-section top bottom'>
                <div className='clients_box'>
                    <div className=''>
                        <h4 className='heading '>{data?.title}</h4>

                    </div>
                    <div className='blog_section'>
                        <div dangerouslySetInnerHTML={{__html:data?.desc}}></div>
                    </div>
                </div>
            </section>
          
      
            <Newsletter loading={loading} setLoading={setLoading} />
        </>
    )
}
