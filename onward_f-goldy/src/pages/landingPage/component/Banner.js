import React, { useEffect, useRef, useState } from 'react'
import { post } from '../../../helpers/helper_api';
import { toast } from 'react-toastify';
import { Col, Row } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useNavigate } from 'react-router-dom';

export default function Banner(props) {
  const navigate = useNavigate();
  let { data, loading, setLoading, form, pageTitle } = props;
  const formRef = useRef();
  const [field, setField] = useState([]);

  useEffect(() => {
    if (form?.length)
      if (form[0]?.field?.length)
        setField(form[0]?.field);
  }, [form]);

  const handleLeadForm = (e, v, pos) => {
    if (!loading) {
      setLoading(true);
      let body = {
        form: field,
        from: "Landing Page",
        interestedIn: pageTitle,
        formPosition: pos
      }
      post("lead", body)
        .then(res => {
          setLoading(false);
          if (res?.statusCode == 200) {
            // toast.success(res?.message);
            formRef.current.reset();
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
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

  const handleFieldInput = (i, val) => {
    let temp = Object.assign([], field);
    temp[i].value = val;
    setField(temp);
  }

  return (
    <>
      <section className='inner-banner inner-banner-slider'>
        {/* <div className='banner-img'>
          <img src={data?.image ? data?.image : require('../../../assets/images/city-banner.png')} alt='city-banner' />
        </div> */}
        <div className='inner-banner-content top inner-two-banner bottom padding-left-right' style={{ backgroundImage: `url(${data?.image ? data?.image : require('../../../assets/images/city-banner.png')})` }}>
          <Row>
            <Col lg={6}>
              <div className='left-section'>
                <h1 className='heading'>{data?.title}</h1>
                <p className='paragraph'>{data?.subTitle}</p>
              </div>
            </Col>
            {form?.length ?
              <Col lg={6}>
                <div className='right-section inner-banner-form'>
                  <h4>{form[0]?.heading}</h4>
                  <AvForm onValidSubmit={(e, v) => handleLeadForm(e, v, "Top Banner Form")} ref={formRef}>
                    <Row>
                      {field?.map((item, index) => (
                        <Col lg={12}>
                          <div className='form_field'>
                            <AvField
                              type={item?.type}
                              name={item?.type}
                              placeholder={`Enter ${item?.title}`}
                              onChange={(e) => handleFieldInput(index, e.target.value)}
                              required
                            />
                          </div>
                        </Col>
                      ))}
                      <Col lg={12}>
                        <button type="submit" className='button_2'>SUBMIT</button>
                      </Col>
                    </Row>
                  </AvForm>
                </div>
              </Col>
            :null}
          </Row>
        </div>
      </section>
    </>
  )
}
