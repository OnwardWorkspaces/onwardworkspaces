import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { get } from '../../helpers/helper_api';
import moment from 'moment'
import Loader from '../components/Loader';
export default function Blog() {

    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {

        window.scrollTo(0, 0);
      }, [])

    const getData = () => {
        if (!loading) {
            setLoading(true);
            get('blog')
                .then((res) => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setData(res?.data)
                    }
                }).catch((error) => {
                    setLoading(false);
                    console.log(error)
                })
        }
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

    return (
        <>
            <Loader visible={loading} />
            <section className='inner-banner'>
                <img src={require('../../assets/images/listing-banner.png')} alt='banner' />
                <div className='inner-banner-content-two top bottom padding-left-right'>
                    <h1 className='heading'>Blog</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Blog</li>
                        </ol>
                    </nav>
                </div>
            </section>
            <section className='about-section blog-section top bottom mt-0 padding-left-right'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        {
                            data?.map((item, index) => (
                                <div className='col-lg-4 col-md-6' key={index}>
                                    <div className='inner_thumb_image_box inner_thumb_image_box_blog'>
                                        <Link to={`/blog/${parseTitle(item?.path)}`}>
                                            <img src={item?.image ? item?.image : require('../../assets/images/item-i.png')} alt={item?.title} />
                                            <div className='blog_details'>
                                                <div className='header_blog'>
                                                    <span>{item?.authors?.length ? item?.authors[0]?.title : null}</span><br />
                                                    <em>{moment(item?.updatedAt).format('MM/DD/YYYY')}</em>
                                                </div>
                                                <h4>{item?.title}</h4>

                                                <p>{item?.titleShort?.length > 80 ? item?.titleShort?.substring(0, 80) + '...' : item?.titleShort}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

        </>
    )
}
