import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Row, Col, Card, CardBody, CardTitle, Modal, ModalBody, Label } from 'reactstrap';
import { post, put, upload } from '../../helper/api_helper';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Resizer from "react-image-file-resizer";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as Utils from "../../Utils";

function AddGallery(props) {
    const { setIsAdd, user, currentData, loading, setLoading, getData } = props;
    const [file, setFile] = useState(null);
    const [cropperModal, setCropperModal] = useState(false);
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (currentData) {
            setImage(currentData?.image || null);
            setIsActive(currentData?.isActive !== undefined ? currentData.isActive : true);
        } else {
            setImage(null);
            setIsActive(true);
        }
    }, [currentData]);

    const handleValidSubmit = async (e, v) => {
        if (loading) return;

        if (!image) {
            toast.error("Please select an Image!");
            return;
        }

        setLoading(true);
        let body = {
            ...v,
            isActive,
            token: user?.token
        };

        if (image?.substring(0, 4) === 'data') {
            try {
                const obj = await urltoFile(image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("image-gallery/image_upload", form);
                if (uploadRes?.statusCode === 200 && uploadRes?.data) {
                    body = { ...body, image: uploadRes.data };
                } else {
                    setLoading(false);
                    toast.error(uploadRes?.error || uploadRes?.message || "Failed to upload image!");
                    return;
                }
            } catch (err) {
                setLoading(false);
                console.error("Error while uploading gallery image:", err);
                toast.error("Error uploading image!");
                return;
            }
        } else if (image) {
            body = { ...body, image: image };
        }

        if (currentData?._id) {
            body = { ...body, galleryId: currentData._id };
            put("image-gallery", body)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode === 200) {
                        toast.success(res?.message || "Gallery Updated Successfully");
                        setIsAdd(false);
                        getData();
                    } else {
                        toast.error("" + (res?.error || res?.message || "Failed to update"));
                    }
                })
                .catch(err => {
                    setLoading(false);
                    console.error("error while updating data", err);
                    toast.error("Something Went Wrong!");
                });
        } else {
            post("image-gallery", body)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode === 200) {
                        toast.success(res?.message || "Gallery Added Successfully");
                        setIsAdd(false);
                        getData();
                    } else {
                        toast.error(res?.error || res?.message || "Failed to add");
                    }
                })
                .catch(err => {
                    setLoading(false);
                    console.error("Error while adding gallery", err);
                    toast.error("Something Went Wrong!");
                });
        }
    };

    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }))
        );
    };

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                600,
                738,
                "webp",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    const handleImgChange = (file) => {
        if (!file) return;
        setFile(URL.createObjectURL(file));
        setCropperModal(true);
    };

    const cropImage = () => {
        setLoading(true);
        const cropper = cropperRef?.current?.cropper || cropperRef?.current;
        const fileData = cropper?.getCroppedCanvas ? cropper.getCroppedCanvas().toDataURL() : null;
        if (fileData) {
            setImage(fileData);
        }
        setCropperModal(false);
        setLoading(false);
    };

    return (
        <React.Fragment>
            <Modal isOpen={cropperModal} centered={true}>
                <ModalBody>
                    <h5 className="text-black font-size-20">Crop Image</h5>
                    <div className="p-2">
                        <AvForm
                            className="form-horizontal"
                            onValidSubmit={() => {
                                cropImage();
                            }}
                        >
                            <div className="mb-3 mt-2">
                                <Cropper
                                    style={{ height: 200, width: 400 }}
                                    aspectRatio={600 / 738}
                                    preview=".img-preview"
                                    guides={true}
                                    src={file}
                                    ref={cropperRef}
                                />
                            </div>
                            <div className="mt-4">
                                <Row>
                                    <Col md={6}>
                                        <button
                                            className="btn btn-primary w-100 waves-effect waves-light"
                                            style={{ border: 'none', backgroundColor: Utils.themeColor }}
                                            onClick={() => { setCropperModal(false); setFile(null); }}
                                            type="reset"
                                        >
                                            Cancel
                                        </button>
                                    </Col>
                                    <Col md={6}>
                                        <button
                                            className="btn btn-primary w-100 waves-effect waves-light"
                                            type="submit"
                                            style={{ border: 'none', backgroundColor: Utils.themeColor }}
                                        >
                                            Submit
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                        </AvForm>
                    </div>
                </ModalBody>
            </Modal>
            <input
                name="image"
                label="image"
                className="d-none"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        handleImgChange(e.target.files[0]);
                    }
                    e.target.value = null;
                }}
                ref={imagePickerRef}
            />
            <Card>
                <CardBody>
                    <Row>
                        <Col md={10}>
                            <CardTitle className='mb-4'><b>{currentData?._id ? 'Update Gallery' : 'Add New Gallery'}</b></CardTitle>
                        </Col>
                        <Col>
                            <Button type="button" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Close</Button>
                        </Col>
                    </Row>
                    <AvForm onValidSubmit={handleValidSubmit}>
                        <Row>
                            <Col md={4}>
                                <Label>Image</Label>
                                {image ?
                                    <div className='img-banner mt-0'>
                                        <img src={image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <div className='btn_cross_banner' style={{ right: -25 }}>
                                            <Button type="button" className="btn-add" onClick={() => { setImage(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                        </div>
                                    </div>
                                    :
                                    <div className='img-place-banner' style={{ marginTop: 0 }}>
                                        <div className='action-btn'>
                                            <Button type="button" className="btn-add" onClick={() => { imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                        </div>
                                    </div>
                                }
                            </Col>

                            <Col md={8}>
                                <Row>
                                    <Col md={4}>
                                        <div className='mb-4'>
                                            <AvField
                                                name="imageTitle"
                                                placeholder="Enter Gallery title"
                                                label="Image Title"
                                                value={currentData?.imageTitle}
                                                required
                                            />
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className='mb-4'>
                                            <AvField
                                                name="altText"
                                                label="Alt Text"
                                                placeholder="altText"
                                                value={currentData?.altText}
                                                required
                                            />
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className='mb-4'>
                                            <AvField
                                                name="galleryCategory"
                                                label="Gallery Category"
                                                value={currentData?.galleryCategory || 'HOME_PAGE'}
                                                type="select"
                                                required
                                            >
                                                <option value="HOME_PAGE">HOME_PAGE</option>
                                            </AvField>
                                        </div>
                                    </Col>
                                </Row>

                                {!currentData && (
                                    <Row>
                                        <div className='mb-0 d-flex'>
                                            <AvField
                                                name="isActive"
                                                id="isActive"
                                                type="checkbox"
                                                label="isActive"
                                                defaultChecked={isActive}
                                                onChange={(e) => setIsActive(e.target.checked)}
                                            />
                                            <Label for='isActive' className='mx-2' style={{ userSelect: 'none' }}>Is Active</Label>
                                        </div>
                                    </Row>
                                )}
                            </Col>
                        </Row>

                        <Row className='mt-5'>
                            <Col md={6}>
                                <Button type="reset" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Cancel</Button>
                            </Col>
                            <Col md={6}>
                                <Button type="submit" className="btn-sign">{currentData?._id ? 'Update Gallery' : 'Add Gallery'}</Button>
                            </Col>
                        </Row>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}

export default AddGallery;