import React, { Component, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import userAvatar from "../assets/img/img1.jpg";
import { useSelector } from "react-redux";

export default function Sidebar() {
    const scrollBarRef = useRef();
    const user = useSelector(state => state.user);

    const toggleFooterMenu = (e) => {
        e.preventDefault();
        let parent = e.target.closest(".sidebar");
        parent.classList.toggle("footer-menu-show");
    }

    const populateMenu = (m) => {
        const menu = m.map((m, key) => {
            let sm;
            if (m.submenu) {
                sm = m.submenu.map((sm, key) => {
                    return (
                        <NavLink to={sm.link} className="nav-sub-link" style={{ userSelect: 'none' }} key={key}>{sm.label}</NavLink>
                    )
                })
            }

            return (
                <li key={key} className="nav-item">
                    {(!sm) ? (
                        <NavLink to={m.link} className="nav-link"><i className={m.icon} style={{ fontSize: 15 }}></i> <span style={{ userSelect: 'none' }}>{m.label}</span></NavLink>
                    ) : (
                        <div onClick={toggleSubMenu} className="nav-link has-sub"><i className={m.icon}></i> <span style={{ userSelect: 'none' }}>{m.label}</span></div>
                    )}
                    {m.submenu && <nav className="nav nav-sub">{sm}</nav>}
                </li>
            )
        });

        return (
            <ul className="nav nav-sidebar">
                {menu}
            </ul>
        );
    }

    // Toggle menu group
    const toggleMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest('.nav-group');
        parent.classList.toggle('show');

        // props.onUpdateSize();
        scrollBarRef.current?.updateScroll()
    }

    // Toggle submenu while closing siblings' submenu
    const toggleSubMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest('.nav-item');
        let node = parent.parentNode.firstChild;

        while (node) {
            if (node !== parent && node.nodeType === Node.ELEMENT_NODE)
                node.classList.remove('show');
            node = node.nextElementSibling || node.nextSibling;
        }

        parent.classList.toggle('show');

        scrollBarRef.current?.updateScroll()
    }

    const checkPermission = (to) => {
        if (user?.role == "Admin")
            return true;
        else if (user?.role == "Sub") {
            let permission = user?.permissions;
            let find = permission.find(x => Object.keys(x).includes(to))
            if (find)
                return find[to]?.read
        } else {
            return false;

        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Link to="/" className="sidebar-logo">
                    <img src={require('../assets/images/logo.png')} />
                </Link>
            </div>
            <PerfectScrollbar className="sidebar-body" ref={scrollBarRef}>
                {/* <SidebarMenu onUpdateSize={() => scrollBarRef.current?.updateScroll()} user={user} /> */}
                <React.Fragment>
                    <div className="nav-group show">
                        <ul className="nav nav-sidebar py-0">
                            <li className="nav-item">
                                <NavLink to="" className="nav-link"><i className={"ri-home-3-line"}></i> <span style={{ userSelect: 'none' }}>Dashboard</span></NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-group show">
                        <ul className="nav nav-sidebar py-0">
                            <li className="nav-item">
                                <NavLink to="/home_banner" className="nav-link"><i className={"fa fa-images"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Home Banner</span></NavLink>
                            </li>
                        </ul>
                    </div>
                    {checkPermission("clientale") &&
                        <div className="nav-group show">
                            <ul className="nav nav-sidebar py-0">
                                <li className="nav-item">
                                    <NavLink to="/clientale" className="nav-link"><i className={"fa fa-images"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Clientale</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                    <div className="nav-group show">
                        <ul className="nav nav-sidebar py-0">
                            <li className="nav-item">
                                <NavLink to="/forms" className="nav-link"><i className={"fa fa-align-justify"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Forms</span></NavLink>
                            </li>
                        </ul>
                    </div>
                    {checkPermission("city") &&
                        <div className="nav-group show">
                            <ul className="nav nav-sidebar py-0">
                                <li className="nav-item">
                                    <NavLink to="/city" className="nav-link"><i className={"ri-building-fill"}></i> <span style={{ userSelect: 'none' }}>City</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                    {checkPermission("location") &&
                        <div className="nav-group show">
                            <ul className="nav nav-sidebar py-0">
                                <li className="nav-item">
                                    <NavLink to="/location" className="nav-link"><i className={"fa fa-map-marked"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Location</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                    {checkPermission("category") &&
                        <div className="nav-group show">
                            <ul className="nav nav-sidebar py-0">
                                <li className="nav-item">
                                    <NavLink to="/category" className="nav-link"><i className={"fa fa-shapes"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Category</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    }

                    {/* {checkPermission("workspaceCategory") || checkPermission("workspaceService") ?
                        <div className="nav-group show">
                            <div className="nav-label" onClick={toggleMenu}><i className={"fa fa-house-laptop"} style={{ fontSize: 16, marginRight: 10 }}></i><span style={{ userSelect: 'none' }}>Work-Space</span></div>
                            <ul className="nav nav-sidebar">
                                <li className="nav-item">
                                    {checkPermission("workspaceCategory") &&
                                        <NavLink to="/workspace/category" className="nav-link"><i className={"fa fa-shapes"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Category</span></NavLink>
                                    }
                                    {checkPermission("workspaceService") &&
                                        <NavLink to="/workspace/service" className="nav-link"><i className={"fa fa-truck-fast"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Service</span></NavLink>
                                    }
                                </li>
                            </ul>
                        </div> : null
                    } */}
                    {/* {checkPermission("standardAmenitiesCategory") || checkPermission("standardAmenitiesService") ?
                        <div className="nav-group show">
                            <div className="nav-label" onClick={toggleMenu}><i className={"fa fa-house-laptop"} style={{ fontSize: 16, marginRight: 10 }}></i><span style={{ userSelect: 'none' }}>Standard-Amenities</span></div>
                            <ul className="nav nav-sidebar">
                                <li className="nav-item">
                                    {checkPermission("standardAmenitiesCategory") &&
                                        <NavLink to="/standard/category" className="nav-link"><i className={"fa fa-shapes"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Category</span></NavLink>
                                    }
                                    {checkPermission("standardAmenitiesService") &&
                                        <NavLink to="/standard/service" className="nav-link"><i className={"fa fa-truck-fast"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Service</span></NavLink>
                                    }
                                </li>
                            </ul>
                        </div> : null
                    } */}
                    {checkPermission('propertyAmenities') &&
                        <div className="nav-group show">
                            <ul className="nav nav-sidebar py-0">
                                <li className="nav-item">
                                    <NavLink to="/property/amenities" className="nav-link"><i className={"fa fa-list-check"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Property Amenities</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                    {checkPermission('properties') &&
                        <div className="nav-group show">
                            <ul className="nav nav-sidebar py-0">
                                <li className="nav-item">
                                    <NavLink to="/property/" className="nav-link"><i className={"fa fa-building-circle-check"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Properties</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                    {checkPermission('office') &&
                        <div className="nav-group show">
                            <ul className="nav nav-sidebar py-0">
                                <li className="nav-item">
                                    <NavLink to="/office/" className="nav-link"><i className={"fa fa-building-circle-check"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Offices</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                    {checkPermission('testimonial') &&
                        <div className="nav-group show">
                            <ul className="nav nav-sidebar py-0">
                                <li className="nav-item">
                                    <NavLink to="/testimonial/" className="nav-link"><i className={"fa fa-user-check"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Testimonial</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                    {/* <div className="nav-group show mb-3">
                        <ul className="nav nav-sidebar py-0">
                            <li className="nav-item">
                                <NavLink to="/image-store" className="nav-link"><i className={"fa fa-images"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Image Store</span></NavLink>
                            </li>
                        </ul>
                    </div> */}
                    {checkPermission("blog") &&
                        <div className="nav-group show">
                            <div className="nav-label" onClick={toggleMenu}><i className={"fa fa-blog"} style={{ fontSize: 16, marginRight: 10 }}></i><span style={{ userSelect: 'none' }}>Blog</span></div>
                            <ul className="nav nav-sidebar py-0">
                                <li className="nav-item">
                                    <NavLink to="/image-store" className="nav-link"><i className={"fa fa-images"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Image Store</span></NavLink>
                                    <NavLink to="/blog-category" className="nav-link"><i className={"fa fa-shapes"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Category</span></NavLink>
                                    <NavLink to="/blog-author" className="nav-link"><i className={"fa fa-user-circle"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Author</span></NavLink>
                                    <NavLink to="/blog" className="nav-link"><i className={"fa fa-blog"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Blog</span></NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                    {
                        user?.role == 'Admin' &&
                        <>
                            <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/sub-admin/" className="nav-link"><i className={"fa fa-user-shield"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Sub-Admin</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/lead/" className="nav-link"><i className={"fa fa-hands-helping"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Leads</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/subscribes/" className="nav-link"><i className={"fa fa-hands-helping"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Subscriber</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/about-us" className="nav-link"><i className={"fa fa-address-card"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>About Us</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-group show">
                                <div className="nav-label" onClick={toggleMenu}><i className={"fa fa-headset"} style={{ fontSize: 16, marginRight: 10 }}></i><span style={{ userSelect: 'none' }}>Contact Us</span></div>
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/contact-us" className="nav-link"><i className={"fa fa-shapes"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Meta Data</span></NavLink>
                                        <NavLink to="/contact/users" className="nav-link"><i className={"fa fa-user-circle"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Applied</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/contact-us" className="nav-link"><i className={"fa fa-headset"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Contact Us</span></NavLink>
                                    </li>
                                </ul>
                            </div> */}
                            <div className="nav-group show">
                                <div className="nav-label" onClick={toggleMenu}><i className={"fa fa-handshake"} style={{ fontSize: 16, marginRight: 10 }}></i><span style={{ userSelect: 'none' }}>Partnership</span></div>
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/partnership" className="nav-link"><i className={"fa fa-shapes"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Meta Data</span></NavLink>
                                        <NavLink to="/partner/table" className="nav-link"><i className={"fa fa-user-circle"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Applied</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/our-solution" className="nav-link"><i className={"fa fa-people-carry"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Our Solution</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/case-study" className="nav-link"><i className={"fa fa-briefcase"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Case Studies</span></NavLink>
                                    </li>
                                </ul>
                            </div> */}
                            <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/enterprise" className="nav-link"><i className={"fa fa-building"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Enterprise</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/partner" className="nav-link"><i className={"fa fa-handshake"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Partner</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-group show">
                                <ul className="nav nav-sidebar py-0">
                                    <li className="nav-item">
                                        <NavLink to="/landing" className="nav-link"><i className={"fa fa-globe"} style={{ fontSize: 16 }}></i> <span style={{ userSelect: 'none' }}>Landing Page</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                        </>
                    }
                </React.Fragment>
            </PerfectScrollbar>
            <div className="sidebar-footer">
                <div className="sidebar-footer-top">
                    <div className="sidebar-footer-thumb">
                        <img src={userAvatar} alt="" />
                    </div>
                    <div className="sidebar-footer-body">
                        <h6><Link to="../pages/profile.html">{user?.name}</Link></h6>
                        <p>{user?.role}</p>
                    </div>
                    <Link onClick={toggleFooterMenu} to="" className="dropdown-link"><i className="ri-arrow-down-s-line"></i></Link>
                </div>
                <div className="sidebar-footer-menu">
                    <nav className="nav">
                        {/* <Link to=""><i className="ri-edit-2-line"></i> Edit Profile</Link> */}
                        {/* <Link to=""><i className="ri-profile-line"></i> View Profile</Link> */}
                    </nav>
                    <hr />
                    <nav className="nav">
                        {/* <Link to=""><i className="ri-question-line"></i> Help Center</Link>
                        <Link to=""><i className="ri-lock-line"></i> Privacy Settings</Link>
                        <Link to=""><i className="ri-user-settings-line"></i> Account Settings</Link> */}
                        <Link to="/logout"><i className="ri-logout-box-r-line"></i>Log Out</Link>
                    </nav>
                </div>
            </div>
        </div>
    )

}

window.addEventListener("click", function (e) {
    // Close sidebar footer menu when clicked outside of it
    let tar = e.target;
    let sidebar = document.querySelector(".sidebar");
    if (!tar.closest(".sidebar-footer") && sidebar) {
        sidebar.classList.remove("footer-menu-show");
    }

    // Hide sidebar offset when clicked outside of sidebar
    if (!tar.closest(".sidebar") && !tar.closest(".menu-link")) {
        document.querySelector("body").classList.remove("sidebar-show");
    }
});

window.addEventListener("load", function () {
    let skinMode = localStorage.getItem("sidebar-skin");
    let HTMLTag = document.querySelector("html");

    if (skinMode) {
        HTMLTag.setAttribute("data-sidebar", skinMode);
    }
});