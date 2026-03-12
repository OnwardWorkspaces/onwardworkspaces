import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Row,
    Col
} from "reactstrap"
import { get } from '../../helpers/helper_api';
export default function Footer(props) {

    const [city, setCity] = useState([]);
    const [cats, setCats] = useState(undefined);
    const [logo, setLogo] = useState(undefined)
    // console.log("headerData", city)

    useEffect(() => {
        if (props?.headerData?.city)
            setCity(props?.headerData?.city);
    }, [props]);

    const parseTitle = (title) => {
        let str = title.toLowerCase();
        str = str.split(" ").join("-");
        return str;
    }
    useEffect(() => {
        if (localStorage.getItem('footerLogo')) {
            setLogo(localStorage.getItem('footerLogo'))
        }
    }, [localStorage.getItem('footerLogo')])

    useEffect(() => {
        getCats()
    }, [])

    const getCats = () => {
        get(`category/list?all=${true}`)
            .then(res => {

                if (res?.statusCode == 200) {
                    setCats(res?.data);
                }
            })
            .catch(err => {

                toast.error("Something Went Wrong!");
            })
    }

    const goTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <footer className='padding-left-right'>
            <div className='footer-section'>
                <Row >
                    <Col lg={5}>
                        <div className='footer-content-section'>
                            <div className='footer-logo'>
                                <img src={logo} alt='w-logo' />
                            </div>
                            <p>Established and launched in 2019, Onward Workspaces is a Delhi-based co-working space that strives to nurture innovative startups by providing them with the required support. We aim to design & develop offices that change the way people feel about coming to work, foster a culture of sharing and exchange, and bring the best out of every individual.</p>
                            <div className="">
                                <p><b>ONWARD COWORKX PRIVATE LIMITED</b></p>
                                <div className='mt-2 d-flex'>
                                    <div className='footer-icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                    </div>
                                    <div className='mx-2 footer-address'>
                                        <p>Ground Floor, E-44/3, Okhla Industrial Area Phase II, New Delhi, South Delhi, Delhi, 110020</p>
                                    </div>
                                </div>
                                <div className='mt-2 d-flex align-items-center'>
                                    <div className='footer-icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 512"><path d="M497.4 361.8l-112-48a24 24 0 0 0 -28 6.9l-49.6 60.6A370.7 370.7 0 0 1 130.6 204.1l60.6-49.6a23.9 23.9 0 0 0 6.9-28l-48-112A24.2 24.2 0 0 0 122.6 .6l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.3 24.3 0 0 0 -14-27.6z" /></svg></div>
                                    <div className='mx-2 mt-1 footer-address'>
                                        <p><Link to="tel:+919873154484">Accounts: +91 98731 54484</Link></p>
                                    </div>
                                </div>
                                <div className='mt-2 d-flex align-items-center'>
                                    <div className='footer-icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 512"><path d="M497.4 361.8l-112-48a24 24 0 0 0 -28 6.9l-49.6 60.6A370.7 370.7 0 0 1 130.6 204.1l60.6-49.6a23.9 23.9 0 0 0 6.9-28l-48-112A24.2 24.2 0 0 0 122.6 .6l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.3 24.3 0 0 0 -14-27.6z" /></svg></div>

                                    <div className='mx-2 mt-1 footer-address'>
                                        <p>Sales: </p>
                                    </div>
                                    <div className='mt-1 footer-address'>
                                        <p><Link to="tel:+919220407278">+91 92204 07278</Link> | <Link to="tel:+919910668152">+91 99106 68152</Link> <span className='mx-2'></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={2} md={4} sm={6}>
                        <div className='footer-link'>
                            <h4>Location</h4>
                            <ul>
                                {city ? city?.map((item) => (
                                    <li><Link to={`/${parseTitle(item?.path)}`}>{item?.title}</Link></li>
                                )) : null}
                            </ul>
                        </div>
                    </Col>
                    <Col lg={3} md={4} sm={6}>
                        <div className='footer-link'>
                            <h4>Category</h4>
                            <ul>
                                {cats?.map((item, index) => (
                                    <li key={index}><Link to={`/category/${parseTitle(item?.title)}`} className='text-decoration-none'>{item?.title}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                    <Col lg={2} md={4} sm={6}>
                        <div className='footer-link'>
                            <h4>Onward</h4>
                            <ul>
                                <li><Link to='/' onClick={goTop}>Home</Link></li>
                                <li><Link to='/about' onClick={goTop}>About Us</Link></li>
                                <li><a href='/#workspace'>Workspace</a></li>
                                <li><Link to='/contact' onClick={goTop}>Reach Us</Link></li>
                                <li>
                                    <Link to="/partnerships" onClick={goTop}>Partnerships</Link>
                                </li>
                                <li>
                                    <Link to="/partner" onClick={goTop}>Partner</Link>
                                </li>
                                <li>
                                    <Link to="/careers" onClick={goTop}>Careers</Link>
                                </li>
                                <li>
                                    <Link to="/Referral" onClick={goTop}>Referral</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
            <hr />
            <div className='footer-bottom'>
                <p>Copyright © Onward Workspace {new Date().getFullYear()}, All rights reserved.</p>
                <ul>
                    <li className='blank'>
                        <Link to='/privacy' target='_blank'>
                            Privacy Policy
                        </Link>
                    </li>
                    <li className='blank'>
                        <Link to='/terms-of-use' target='_blank'>
                            Terms Of Use
                        </Link>
                    </li>
                    <li className='blank'>
                        <Link to='/support' target='_blank'>
                            Support
                        </Link>
                    </li>
                    <li>
                        <a href='https://www.linkedin.com/company/onwardworkspaces/' target='_blank'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Social icon" clip-path="url(#clip0_370_761)">
                                    <g id="Group">
                                        <path id="Vector" d="M22.2234 -0.000488281H1.77187C0.792187 -0.000488281 0 0.772949 0 1.7292V22.2651C0 23.2214 0.792187 23.9995 1.77187 23.9995H22.2234C23.2031 23.9995 24 23.2214 24 22.2698V1.7292C24 0.772949 23.2031 -0.000488281 22.2234 -0.000488281ZM7.12031 20.4511H3.55781V8.99482H7.12031V20.4511ZM5.33906 7.43389C4.19531 7.43389 3.27188 6.51045 3.27188 5.37139C3.27188 4.23232 4.19531 3.30889 5.33906 3.30889C6.47813 3.30889 7.40156 4.23232 7.40156 5.37139C7.40156 6.50576 6.47813 7.43389 5.33906 7.43389ZM20.4516 20.4511H16.8937V14.8823C16.8937 13.5558 16.8703 11.8448 15.0422 11.8448C13.1906 11.8448 12.9094 13.2933 12.9094 14.7886V20.4511H9.35625V8.99482H12.7687V10.5604H12.8156C13.2891 9.66045 14.4516 8.70889 16.1813 8.70889C19.7859 8.70889 20.4516 11.0808 20.4516 14.1651V20.4511Z" fill="white" />
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="clip0_370_761">
                                        <rect width="24" height="24" fill="white" transform="translate(0 -0.000488281)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href='https://www.instagram.com/onwardworkspaces/' target='_blank'>
                            <img src={require('../../assets/images/instagram.png')} />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
