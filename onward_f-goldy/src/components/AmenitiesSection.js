import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Row, Col } from 'reactstrap';

export default function AmenitiesSection({ data }) {
    const [modalOpen, setModalOpen] = useState(false);

    // slice data for preview
    const previewItems = window.innerWidth > 768
        ? data?.ameni?.slice(0, 6)  // desktop: first row (assuming lg=2 → 6 cols)
        : data?.ameni?.slice(0, 6); // mobile: show 6 items (2x3)

    return (
        <>
            {data && data?.ameni?.length ? (
                <section className='amenities-section top bottom padding-left-right'>
                    <div className='clients_box'>
                        <div className='heading-title'>
                            <h4 className='heading text-center gallery_slider_heading workspaces'>
                                {data?.ameHead ? data?.ameHead : "Amenities"}
                            </h4>
                            <p className='paragraph' style={{ whiteSpace: 'pre-line' }}>
                                {data?.amePara}
                            </p>
                        </div>
                    </div>

                    {/* Preview Row */}
                    <div className='aminities-box-outer'>
                        {previewItems.map((item, i) => (
                            <div className='' key={i}>
                                <div className="amenities-box">
                                    <div className="amenities_img">
                                        <img
                                            src={item?.image ? item?.image : require('../assets/images/spatial_audio_off.png')}
                                            alt={item?.title || 'amenity'}
                                        />
                                    </div>
                                    <div className="amenities_content">
                                        <p>{item?.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>



                    {/* View All Button */}
                    {data?.ameni?.length > previewItems.length && (
                        <div className="d-flex justify-content-center mt-5">
                            <button className="button_2" onClick={() => setModalOpen(true)}>
                                View All Amenities. 
                            </button>
                        </div>

                    )}

                    {/* Modal */}
                    <Modal isOpen={modalOpen} centered={true} toggle={() => setModalOpen(!modalOpen)} size="lg">
                        <ModalHeader toggle={() => setModalOpen(false)}>
                            All Amenities
                        </ModalHeader>
                        <ModalBody className='amenities-modal-body'>
                            <Row className='row'>
                                {data?.ameni?.map((item, i) => (
                                    <Col lg={6} md={6} sm={12} xs={12} key={i} className="mb-3 ">
                                        <div className="amenities-box">
                                            <div className="amenities_img">
                                                <img
                                                    src={item?.image ? item?.image : require('../assets/images/spatial_audio_off.png')}
                                                    alt={item?.title || 'amenity'}
                                                />
                                            </div>
                                            <div className="amenities_content">
                                                <p>{item?.title}</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </ModalBody>
                    </Modal>
                </section>
            ) : null}
        </>
    );
}
