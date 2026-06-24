import React, { useRef } from 'react'
import {
    Row,
    Col
} from "reactstrap"
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { post } from '../../helpers/helper_api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Newsletter({loading, setLoading}) {
    const navigate = useNavigate();
    const form = useRef();
    

    const handleSubs = (e, v) => {
        if (!loading) {
            setLoading(true);
            post("subs", v)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        // toast.success(res?.message);
                        form.current.reset();
                       
                        setTimeout(()=>{
                            navigate('/thank-you')
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

    return (
        <section className='newsletter-section top bottom padding-left-right'>
            <div className='newsletter-box'>
                <Row>
                    <Col lg={6}>
                        <div className='left-section'>
                            <div className='heading-title'>
                                <h2 className='heading newsletter-heading'>Do You Have Any Question ?</h2>
                                <p className='paragraph'>Stay updated with our latest promotions, discounts and special offers.</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <AvForm ref={form} onValidSubmit={handleSubs}>
                            <AvField type="email" name="email" placeholder="Enter your email" required />
                            <button className='button_2' type="submit">
                                Get Started
                                <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path id="Arrow 1" d="M20.7071 8.70662C21.0976 8.31609 21.0976 7.68293 20.7071 7.2924L14.3431 0.928444C13.9526 0.53792 13.3195 0.53792 12.9289 0.928444C12.5384 1.31897 12.5384 1.95213 12.9289 2.34266L18.5858 7.99951L12.9289 13.6564C12.5384 14.0469 12.5384 14.6801 12.9289 15.0706C13.3195 15.4611 13.9526 15.4611 14.3431 15.0706L20.7071 8.70662ZM0 8.99951H20V6.99951H0V8.99951Z" fill="white" />
                                </svg>
                            </button>
                        </AvForm>
                    </Col>
                </Row>
            </div>
        </section>
    )
}
