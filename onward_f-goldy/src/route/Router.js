import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
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
import ThankYou from '../pages/thankyou'



export default function Router() {

    const [headerData, setHeaderData] = useState({});

    // console.log('headerdata on route', headerData);

    return (
        <>
            <BrowserRouter
            // basename="/demo"
            >
                <Header headerData={headerData} setHeaderData={setHeaderData} />
                <Routes>
                    <Route path="/" element={<Home headerData={headerData} setHeaderData={setHeaderData} />} />
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
                <Footer headerData={headerData} />
            </BrowserRouter>
        </>
    );
}