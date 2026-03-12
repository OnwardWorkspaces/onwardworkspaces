import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';

export default function Index() {

  const location = useLocation();
  const navigate = useNavigate()

  console.log('location', location?.state)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    if (!location?.state) {
      navigate('/');
    }
  }, [location])

  return (
    <>
      <Helmet>
        <script>
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-11144813402');
        gtag('event', 'conversion', {
          'send_to': 'AW-11144813402/d5UTCIrQ9ZcYENq2ocIp'
        });
      `}
        </script>
      </Helmet>
      <section className="thank-you-section top bottom padding-left-right">
        <div className='img-container'>
          <img src={require('../../assets/images/thanku.png')} alt='thankyou' />
          <p>Thank you for contacting us. One of our representatives will get back to you soon.</p>
          <Link to={"/"}>Go To Home</Link>
        </div>
      </section>
    </>
  )
}
