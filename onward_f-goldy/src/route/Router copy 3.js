import React, { lazy, Suspense, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../pages/components/Header";

import Footer from "../pages/components/Footer";
/* 
import Home from "../pages/home/Home";
import HomeV2 from "../pages/home/HomeV2";
import About from "../pages/about/About";
import Header from "../pages/components/Header";
import Mumbai from "../pages/location/Mumbai";
// import Gurgaon from "../pages/location/Gurgaon";
import Footer from "../pages/components/Footer";
import ListingPage from "../pages/Listing/ListingPage";
import City from "../pages/city";
import Area from "../pages/area";
import Property from "../pages/property";
import Details from "../pages/details/Details";
import Contact from "../pages/contact/Contact";
import Route404 from "../pages/NotFound";
import Location from "../pages/location/Category";
import Offices from "../pages/offices/index";
import Blog from "../pages/blog/index";
import BlogDetail from "../pages/blog/BlogDetail";
import Partnerships from "../pages/other/Partnerships";
import Broker from "../pages/other/Broker";
import Careers from "../pages/other/Careers";
import Referral from "../pages/other/Referral";
import Landing from "../pages/landingPage";
import Enterprise from "../pages/other/Enterprise";
import CaseDetail from "../pages/other/CaseDetail";
import OurSolutions from "../pages/other/OurSolution";
import Privacy from "../pages/privacy/PrivacyPage";
import Terms from "../pages/Terms/TermsOfUse";
import Support from "../pages/support/Support";
import ThankYou from '../pages/thankyou'; 

*/

import HomeV2 from "../pages/home/HomeV2";

const Home = lazy(() => import("../pages/home/Home")); 
const About = lazy(() => import("../pages/about/About")); 
const Mumbai = lazy(() => import("../pages/location/Mumbai")); 
const ListingPage = lazy(() => import("../pages/Listing/ListingPage"));
const City = lazy(() => import("../pages/city"));
const Area = lazy(() => import("../pages/area"));
const Property = lazy(() => import("../pages/property"));
const Details = lazy(() => import("../pages/details/Details"));
const Contact = lazy(() => import("../pages/contact/Contact"));
const Route404 = lazy(() => import("../pages/NotFound"));
const Location = lazy(() => import("../pages/location/Category"));
const Offices = lazy(() => import("../pages/offices/index"));
const Blog = lazy(() => import("../pages/blog/index"));
const BlogDetail = lazy(() => import("../pages/blog/BlogDetail"));
const Partnerships = lazy(() => import("../pages/other/Partnerships"));
const Broker = lazy(() => import("../pages/other/Broker"));
const Careers = lazy(() => import("../pages/other/Careers"));
const Referral = lazy(() => import("../pages/other/Referral"));
const Landing = lazy(() => import("../pages/landingPage"));
const Enterprise = lazy(() => import("../pages/other/Enterprise"));
const CaseDetail = lazy(() => import("../pages/other/CaseDetail"));
const OurSolutions = lazy(() => import("../pages/other/OurSolution"));
const Privacy = lazy(() => import("../pages/privacy/PrivacyPage"));
const Terms = lazy(() => import("../pages/Terms/TermsOfUse"));
const Support = lazy(() => import("../pages/support/Support"));
const ThankYou = lazy(() => import("../pages/thankyou"));



export default function Router() {

    const [headerData, setHeaderData] = useState({});

    // console.log('headerdata on route', headerData);

    return (
        <>
            <BrowserRouter
             basename="/demo"
            >
                <Header headerData={headerData} setHeaderData={setHeaderData} />
                <Suspense>
                    <Routes>
                           <Route path="/" element={<HomeV2 headerData={headerData} setHeaderData={setHeaderData} />} />
                            <Route path="/home_v2" element={<HomeV2 headerData={headerData} setHeaderData={setHeaderData} />} />
                            <Route path="/:title" element={<City />} />
                            <Route path="/:title/:title" element={<Area />} />
                            <Route path="/:title/:title/:title" element={<Property />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/details" element={<Details />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/mumbai" element={<Mumbai />} />
                            <Route path="/category/:title" element={<Location headerData={headerData} />} />
                            <Route path="/offices/:title" element={<Offices headerData={headerData} />} />
                            {/* <Route path="/gurgaon" element={<Gurgaon />} /> */}
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:title/" element={<BlogDetail />} />
                            <Route path="/partnerships" element={<Partnerships />} />
                            <Route path="/partner" element={<Broker />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/Referral" element={<Referral />} />
                            <Route path="/lp/:title" element={<Landing />} />
                            <Route path="/enterprise" element={<Enterprise />} />
                            <Route path="/case-study/:title" element={<CaseDetail />} />
                            <Route path="/our-solutions" element={<OurSolutions />} />
                            <Route path="/thank-you" element={<ThankYou />} />
                            <Route path="/lp/thank-you" element={<ThankYou />} />
                            <Route path="/NotFound" element={<Route404 />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms-of-use" element={<Terms />} />
                            <Route path="/Support" element={<Support />} />

                            <Route path="*" element={<Route404 />} />
                    </Routes>
                </Suspense> 

                 {/* 
                <Routes>
                 
                   
                    <Route path="/" element={<HomeV2 headerData={headerData} setHeaderData={setHeaderData} />} />
                    <Route path="/home_v2" element={<HomeV2 headerData={headerData} setHeaderData={setHeaderData} />} />
                    <Route path="/:title" element={<City />} />
                    <Route path="/:title/:title" element={<Area />} />
                    <Route path="/:title/:title/:title" element={<Property />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mumbai" element={<Mumbai />} />
                    <Route path="/category/:title" element={<Location headerData={headerData} />} />
                    <Route path="/offices/:title" element={<Offices headerData={headerData} />} /> 
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:title/" element={<BlogDetail />} />
                    <Route path="/partnerships" element={<Partnerships />} />
                    <Route path="/partner" element={<Broker />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/Referral" element={<Referral />} />
                    <Route path="/lp/:title" element={<Landing />} />
                    <Route path="/enterprise" element={<Enterprise />} />
                    <Route path="/case-study/:title" element={<CaseDetail />} />
                    <Route path="/our-solutions" element={<OurSolutions />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="/lp/thank-you" element={<ThankYou />} />
                    <Route path="/NotFound" element={<Route404 />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms-of-use" element={<Terms />} />
                    <Route path="/Support" element={<Support />} />
                    

                    <Route path="*" element={<Route404 />} />
                    
                </Routes>*/ }
                <Footer headerData={headerData} />
            </BrowserRouter>
        </>
    );
}