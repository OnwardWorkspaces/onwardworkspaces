import React, { useEffect, useState } from 'react';
import Banner from './component/Banner';
import Properties from './component/Properties';
import Why from '../home/Why';
import Category from '../home/Category';
import Area from './component/Area';
import LeadForm from './component/LeadForm';
import Testimonials from './component/Testimonials';
import Gallery from './component/Gallery';
import OurClient from './component/OurClient';
import FAQ from "./component/FAQ";
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../../helpers/helper_api';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import Loader from '../components/Loader';

export default function Landing() {

  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {

    window.scrollTo(0, 0);
  }, [])
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
      get(`landing/title?title=${params.title}`)
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

  return (
    <div>
      <Loader visible={loading} />
      {data && data?.seo &&
        <Helmet>
          {ReactHtmlParser(data?.seo)}
        </Helmet>
      }
      {data?.section?.map((item, index) => {
        if (item?.type == "banner") {
          return (
            <Banner data={item} pageTitle={data?.title} form={data?.form} loading={loading} setLoading={setLoading} />
          )
        }
        if (item?.type == "gallery" && data?.gallery?.length) {
          return (
            <Gallery data={data?.gallery} />
          )
        }
        if (item?.type == "testimonial" && data?.testi?.length) {
          return (
            <Testimonials data={data?.testi} />
          )
        }
        if (item?.type == "clientale" && data?.clientale?.length) {
          return (
            <OurClient data={data?.clientale} />
          )
        }
        if (item?.type == "faq" && data?.FAQ?.length) {
          return (
            <FAQ data={data?.FAQ} />
          )
        }
      })}
      {/* <Banner />
      <Properties />
      <Why />
      <Category />
      <Area />
      <LeadForm />
      <Testimonials />
      <Gallery />
      <OurClient /> */}
    </div>
  )
}
