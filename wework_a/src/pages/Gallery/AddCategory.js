import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Row, Col, Card, CardBody, CardTitle, Modal, ModalBody, Label } from 'reactstrap';
import { del, get, post, put, upload } from '../../helper/api_helper';
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import Resizer from "react-image-file-resizer";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as Utils from "../../Utils";

function AddService(props) {
    const { setIsAdd, user, currentData, loading, setLoading, getData, cats } = props;
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("banner");
    const [banner, setBanner] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [cropperModal, setCropperModal] = useState(false);
    const [highLight, setHighLight] = useState([]);
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [isHighLight, setIsHighLight] = useState(false);
    const [isCowork, setIsCowork] = useState(false);
    const [isOnward, setIsOnward] = useState(false);
    const [why, setWhy] = useState([]);
    const [forms, setForms] = useState([]);

    useEffect(() => {
        if (currentData) {
            setBanner(currentData?.image);
            setGallery(currentData?.gallery);
            setIsCowork(currentData?.isCowork)
            if (currentData?.isHighLight) {
                setIsHighLight(true);
                setHighLight(currentData?.highlight);
            }
            if (currentData?.isWhy) {

                setIsOnward(true);
                setWhy(currentData?.why);
            }
        }
    }, [currentData]);

    useEffect(() => {
        if (user?.token) {
            getForms();
        }
    }, [user]);

    const getForms = () => {
        get("form/list", { token: user?.token })
            .then(res => {
                if (res?.statusCode == 200) {
                    if (res?.data) {
                        setForms(res?.data);
                    }
                } else
                    toast.error(res?.error);
            })
            .catch(err => {
                console.error("error while getting city drop from header", err);
                toast.error("Something Went Wrong!");
            })
    }

    const handleValidSubmit = async (e, v) => {
        if (!loading) {
            if (isOnward)
                if (!banner) {
                    toast.error("Please select a Image!");
                    return;
                }
            setLoading(true);
            let body = {
                ...v,
                isWhy: isOnward,
                why,
                isCowork,
                token: user?.token
            }
            if (banner?.substring(0, 4) == 'data') {
                const obj = await urltoFile(banner, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("category/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    body = { ...body, image: uploadRes?.data };
            }
            // await Promise.all(highLight.map(async (item) => {
            //     let highObj = item;
            //     if (item?.image.substring(0, 4) == 'data') {
            //         const obj = await urltoFile(item.image, new Date().getTime() + '.webp', 'image/webp');
            //         const tempObj = await resizeFile(obj);
            //         const form = new FormData();
            //         form.append("image", tempObj);
            //         const uploadRes = await upload("category/image_upload", form);
            //         if (uploadRes?.statusCode == 200)
            //             highObj = { ...highObj, image: uploadRes?.data };
            //     }
            //     body.highlight.push(highObj);
            // }));
            // let galleryTemp = [];
            // await Promise.all(gallery.map(async (item) => {
            //     if (item?.substring(0, 4) == 'data') {
            //         const obj = await urltoFile(item, new Date().getTime() + '.webp', 'image/webp');
            //         const tempObj = await resizeFile(obj);
            //         const form = new FormData();
            //         form.append("image", tempObj);
            //         const uploadRes = await upload("category/image_upload", form);
            //         if (uploadRes?.statusCode == 200)
            //             galleryTemp.push(uploadRes.data);
            //     } else {
            //         galleryTemp.push(item);
            //     }
            // }));
            // body = { ...body, gallery: galleryTemp };
            if (currentData?._id) {
                body = { ...body, catId: currentData?._id }
                put("category", body)
                    .then(res => {
                        setLoading(false);
                        if (res?.statusCode == 200) {
                            toast.success(res?.message);
                            setIsAdd(false);
                            getData()
                        } else
                            toast.error("" + res?.error);
                    })
                    .catch(err => {
                        setLoading(false);
                        console.error("error while updating data", err);
                        toast.error("Something Went Wrong!");
                    })
            } else {
                post("category", body)
                    .then(res => {
                        setLoading(false);
                        if (res?.statusCode == 200) {
                            toast.success(res?.message);
                            setIsAdd(false);
                            getData();
                        } else {
                            toast.error(res?.error);
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        console.error("Error while adding city", err);
                        toast.error("Something Went Wrong!");
                    })
            }
        }
    }

    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1800,
                600,
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
        setFile(URL.createObjectURL(file));
        setCropperModal(true);
    }

    const cropImage = () => {
        setLoading(true);
        const fileData = cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL();
        if (fileType == "banner")
            setBanner(fileData);
        else if (fileType == 'Gallery') {
            let temp = Object.assign([], gallery);
            temp.push(fileData);
            setGallery(temp);
        }
        else {
            let temp = Object.assign([], highLight);
            temp[fileType].image = fileData;
            setHighLight(temp);
        }
        setCropperModal(false);
        setLoading(false);
    }

    const handleisOnward = () => {
        if (isOnward) {
            setIsOnward(false);
        } else {
            setWhy(currentData?.why?.length ? currentData?.why : [{}]);
            setIsOnward(true);
        }
    }

    const handleisisCowork = () => {
        if (isCowork) {
            setIsCowork(false);
        } else {
            setIsCowork(true);
        }
    }

    const handleInputwhy = (val, i, to) => {
        let temp = Object.assign([], why);
        temp[i][to] = val;
        setWhy(temp);
    }

    const handleAddwhy = () => {
        let temp = Object.assign([], why);
        temp.push({});
        setWhy(temp);
    }

    const handleRemovewhy = (i) => {
        let temp = Object.assign([], why);
        temp.splice(i, 1);
        console.log('slice', temp);
        setWhy(temp);
    }

    // console.log('isCowork',isCowork,currentData?.isCowork)

    return (
        <React.Fragment>
            <Modal isOpen={cropperModal} centered={true}>
                <ModalBody>
                    <h5 className="text-black font-size-20">Crop Image</h5>
                    <div className="p-2">
                        <AvForm
                            className="form-horizontal"
                            onValidSubmit={(e, v) => {
                                cropImage()
                            }}
                        >
                            <div className="mb-3 mt-2">
                                <Cropper
                                    style={{ height: 200, width: 400 }}
                                    aspectRatio={2 / 1}
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
                                            onClick={() => { setCropperModal(false); setFile(null) }}
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
                onChange={(e) => handleImgChange(e.target.files[0])}
                ref={imagePickerRef}
            />
            <Card>
                <CardBody>
                    <Row>
                        <Col md={10}>
                            <CardTitle className='mb-4'><b>{currentData?._id ? 'Update Category' : 'Add New Category'}</b></CardTitle>
                        </Col>
                        <Col>
                            <Button type="button" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Close</Button>
                        </Col>
                    </Row>
                    <AvForm onValidSubmit={handleValidSubmit}>
                        <Row>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <AvField
                                        name="title"
                                        placeholder="Enter category title"
                                        label="Title"
                                        value={currentData?.title}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <AvField
                                        name="tagline"
                                        placeholder="Enter category tagline"
                                        label="Tagline"
                                        value={currentData?.tagline}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='mb-4'>
                                    <AvField
                                        name="startFrom"
                                        label="Price Start From"
                                        placeholder="Enter price start from"
                                        value={currentData?.startFrom}
                                        required
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="desc"
                                        placeholder="Enter category description"
                                        label="Description"
                                        value={currentData?.desc}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className='mb-0'>
                            {/* <Label></Label> */}
                            <div className='mb-0 d-flex'>
                                <AvField
                                    name="isCowork"
                                    id="isCowork"
                                    type="checkbox"
                                    label="isCowork"
                                    checked={isCowork}
                                    onChange={handleisisCowork}
                                />
                                <Label for='isCowork' className='mx-2' style={{ userSelect: 'none' }}>isCowork</Label>
                            </div>
                            <div className='mb-0 d-flex'>
                                <AvField
                                    name="isOnward"
                                    id="isOnward"
                                    type="checkbox"
                                    label="whys"
                                    checked={isOnward}
                                    onChange={handleisOnward}
                                />
                                <Label for='isOnward' className='mx-2' style={{ userSelect: 'none' }}>Why Onward</Label>
                            </div>
                        </div>
                        {isOnward &&
                            <>
                                <Row>
                                    <Col md={4}>
                                        {banner ?
                                            <div className='img-banner'>
                                                <img src={banner} style={{ width: '100%', height: '100%' }} />
                                                <div className='btn_cross_banner'>
                                                    <Button type="button" className="btn-add" onClick={() => { setBanner(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                            :
                                            <div className='img-place-banner'>
                                                <div className='action-btn'>
                                                    <Button type="button" className="btn-add" onClick={() => { setFileType("banner"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                                </div>
                                            </div>
                                        }
                                    </Col>
                                </Row>
                                {why?.map((item, index) => (
                                    <>
                                        <div className='divider' />
                                        <Row>
                                            <Col md={3}>
                                                <Label>Why Onward point {index + 1}</Label>
                                            </Col>
                                            <Col md={9} className='btn_g'>
                                                {index == why?.length - 1 &&
                                                    <Button type="button" className="btn-add mx-2" onClick={handleAddwhy} style={{ float: 'right' }}><i className={'fa fa-add'} /></Button>
                                                }
                                                {why?.length > 1 &&
                                                    <Button type="button" className="btn-add" onClick={() => handleRemovewhy(index)} style={{ float: 'right' }}><i className={'fa fa-trash'} /></Button>
                                                }
                                            </Col>
                                        </Row>
                                        <Col md={12}>
                                            <div className='mb-4'>
                                                <AvField
                                                    name={"hTitle" + index}
                                                    placeholder="Enter title"
                                                    label="Title"
                                                    value={item?.title}
                                                    onChange={(e) => handleInputwhy(e.target.value, index, "title")}
                                                    required
                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <AvField
                                                    name={"hDesc" + index}
                                                    label="Description"
                                                    placeholder="Enter description"
                                                    value={item?.desc}
                                                    onChange={(e) => handleInputwhy(e.target.value, index, "desc")}
                                                    required
                                                    type="textarea"
                                                    rows={4}
                                                />
                                            </div>
                                        </Col>
                                    </>
                                ))}
                            </>
                        }
                        <div className='divider' />
                        <Label><h5>Location Headings</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="locHead"
                                        label="Heading"
                                        placeholder="Enter heading for location section"
                                        value={currentData?.locHead}
                                        type="text"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="locPara"
                                        label="Paragraph"
                                        placeholder="Enter paragraph for location section"
                                        value={currentData?.locPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className='divider' />
                        <Label><h5>Offices Headings</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="offHead"
                                        label="Heading"
                                        placeholder="Enter heading for offices section"
                                        value={currentData?.offHead}
                                        type="text"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="offPara"
                                        label="Paragraph"
                                        placeholder="Enter paragraph for offices section"
                                        value={currentData?.offPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className='divider' />
                        <Label><h5>Why-Onward Headings</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="whyHead"
                                        label="Heading"
                                        placeholder="Enter heading for why-onward section"
                                        value={currentData?.whyHead}
                                        type="text"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="whyPara"
                                        label="Paragraph"
                                        placeholder="Enter paragraph for why-onward section"
                                        value={currentData?.whyPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className='divider' />
                        <Row>
                            <Col md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="formId"
                                        label="Lead Form"
                                        value={currentData?.formId}
                                        type="select"
                                        required
                                    >
                                        <option value="">Select Form</option>
                                        {forms?.map((item) => (
                                            <option value={item?._id}>{item?.title}</option>
                                        ))}
                                    </AvField>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name={"seo"}
                                        label="SEO Meta Data"
                                        placeholder="Enter SEO Tags"
                                        value={currentData?.seo}
                                        type="textarea"
                                        rows={5}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col md={6}>
                                <Button type="reset" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Cancel</Button>
                            </Col>
                            <Col md={6}>
                                <Button type="submit" className="btn-sign">{currentData?._id ? 'Update Category' : 'Add Category'}</Button>
                            </Col>
                        </Row>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default AddService;