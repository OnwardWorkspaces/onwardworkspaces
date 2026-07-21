import React, { useRef, useEffect, useState } from 'react'
import CountUp, { useCountUp } from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-coverflow';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, EffectCoverflow, Pagination, Autoplay, A11y } from 'swiper/modules';
import {
    Row,
    Col,
} from "reactstrap"
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Newsletter from './Newsletter';
import { get, post } from '../../helpers/helper_api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import { ReactTyped } from "react-typed";
import MediaSection from '../../components/MediaSection';
import MediaSectionV2 from '../../components/MediaSectionV2';

export default function Hometest(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [cats, setCats] = useState([]);
    const [field, setField] = useState([]);
    const swiperRef = useRef();
    const swiperRef1 = useRef();
    const swiperRef2 = useRef();
    const formRef = useRef();
    const [expandedIndexes, setExpandedIndexes] = useState([]);
    useEffect(() => {

        window.scrollTo(0, 0);
    }, [])
    const toggleExpand = (index) => {
        if (expandedIndexes.includes(index)) {
            setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
        } else {
            setExpandedIndexes([...expandedIndexes, index]);
        }
    };

    useEffect(() => {
        if (!loading) {
            setLoading(true);
            get("home")
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setData(res?.data);
                        console.log("location", window?.location);
                        if (res?.data?.home?.form?.length)
                            if (res?.data?.home?.form[0]?.field?.length)
                                setField(res?.data?.home?.form[0]?.field);
                        if (res?.data?.home)
                            if (props?.setHeaderData)
                                props?.setHeaderData({ ...props?.headerData, home: res?.data?.home });

                        console.log('home', res?.data)
                        if (window?.location?.hash == '#workspace') {
                            // Scroll to the element with the id "properties"
                            const propertiesElement = document.getElementById('workspace');
                            if (propertiesElement) {
                                propertiesElement.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    } else
                        toast.error(res?.error);
                })
                .catch(err => {
                    setLoading(false);
                    console.error("error while getting city drop from header", err);
                    toast.error("Something Went Wrong!");
                });
            get("category/list")
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setCats(res?.data);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    toast.error("Something Went Wrong!");
                })
        }
    }, []);

    console.log('category', cats?.length)

    function simplifyNumber(number) {
        const suffixes = ["", "K", "M", "B", "T"]; // Add more suffixes as needed
        let suffixIndex = 0;
        while (number >= 1000 && suffixIndex < suffixes.length - 1) {
            number /= 1000;
            suffixIndex++;
        }
        return {
            number: parseFloat(number.toFixed(1)), // Round to 1 decimal place
            str: suffixes[suffixIndex],
        };
    }

    const handleLeadForm = (e, v) => {
        if (!loading) {
            setLoading(true);
            let body = {
                form: field,
                from: "Home",
                interestedIn: "Lead Form",
                formPosition: "Bottom"
            }
            post("lead", body)
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

    const handleFieldInput = (i, val) => {
        let temp = Object.assign([], field);
        temp[i].value = val;
        setField(temp);
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

    // console.log("SEO", data?.home?.seo);

    return (
        <> sdfsdfs
            
        </>
    )
}
