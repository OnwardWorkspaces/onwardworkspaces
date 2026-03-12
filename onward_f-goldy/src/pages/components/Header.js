import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { get } from "../../helpers/helper_api";
import { toast } from 'react-toastify';

export default function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [cities, setCities] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [logo, setLogo] = useState(undefined)
    const [currentY, setCurrentY] = useState(0);
    const [previousY, setPreviousY] = useState(0);
    const [stickyClass, setStickyClass] = useState('');

    useEffect(()=>{
            if(localStorage.getItem('logo')){
                setLogo(localStorage.getItem('logo'))
            }
    },[localStorage.getItem('logo')])

    useEffect(() => {
        get("home/header")
            .then(res => {
                if (res?.statusCode == 200) {
                    localStorage.setItem('logo',res?.data?.logo)
                    localStorage.setItem('footerLogo',res?.data?.footerLogo)
                    setCities(res?.data?.city);
                    let temp = [];
                    res?.data?.header?.forEach((item) => {
                        if (item?.isActive)
                            temp.push(item);
                    });
                    temp.sort((a, b) => a.pos - b.pos);
                    setTabs(temp);
                    if (props?.setHeaderData)
                        props?.setHeaderData({ ...props?.headerData, city: res?.data?.city });
                } else
                    toast.error(res?.error);
            })
            .catch(err => {
                console.error("error while getting city drop from header", err);
                toast.error("Something Went Wrong!");
            })
    }, []);

    const toggle = () => setIsOpen(!isOpen);
    const isActive = (match, location) => {
        // Customize this logic based on your route structure
        return match && match.isExact;
    };

    const handleScroll = () => {
        const windowHeight = window.scrollY;
    
        if (windowHeight > 500) {
          setCurrentY(windowHeight);
          if (windowHeight > previousY) {
            setStickyClass('slideUp');  // Scrolling down
          } else {
            setStickyClass('slideDown');  // Scrolling up
          }
        } else {
          setCurrentY(0);
          setStickyClass('');  // Remove all classes when scrolled to the top
        }
    
        setPreviousY(windowHeight);  // Update previousY to the current scroll position
      };
    
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [previousY])
    return (
        <header>
            <div className='top-header'>
                <div className='top-box'>
                    <span>2 Day Free Trial</span>
                    <p>REQUEST FOR FREE TRIAL VISIT</p>
                    {/* <h5>or Call Us on <a href='tel:8860577766'>8860577766</a></h5> */}
                    <h5>or Call Us on <a href='tel:9910668152'>9910668152</a></h5>
                </div>
            </div>
            <div className={`navbar-section animated padding-left-right ${stickyClass}`}>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <div className='logo-box'>
                                <img src={logo} alt='logo' />
                            </div>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                {tabs?.map((item) => {
                                    if (item?.pos == 1)
                                        return (
                                            <li className="nav-item">
                                                <NavLink className="nav-link" activeClassName="active" isActive={isActive} aria-current="page" to="/">{item?.title}</NavLink>
                                            </li>
                                        )
                                    if (item?.pos == 2)
                                        return (
                                            <li className="nav-item">
                                                <NavLink className="nav-link" activeClassName="active" isActive={isActive} to="/about">{item?.title}</NavLink>
                                            </li>
                                        )
                                    if (item?.pos == 3)
                                        return (
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" to="#" isActive={isActive} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {item?.title}
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    {cities?.map((item) => (
                                                        <li><NavLink className="dropdown-item" isActive={isActive} to={`/${item?.path}`}>{item.title}</NavLink></li>
                                                    ))}
                                                </ul>
                                            </li>
                                        )
                                    if (item?.pos == 4)
                                        return (
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/blog">{item?.title}</Link>
                                            </li>
                                        )
                                    if (item?.pos == 5)
                                        return (
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/our-solutions">{item?.title}</Link>
                                            </li>
                                        )
                                    if (item?.pos == 6)
                                        return (
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/enterprise">{item?.title}</Link>
                                            </li>
                                        )
                                })}
                            </ul>
                            {tabs?.map((item) => {
                                if (item?.pos == 7)
                                    return (
                                        <form className="d-flex">
                                            <NavLink className="button_1 get_in_touch" to="/contact" type="submit">{item?.title}</NavLink>
                                        </form>
                                    )
                            })}
                        </div>
                    </div>
                </nav>
            </div >
        </header >
    )
}
