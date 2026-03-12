import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Card, CardBody, CardTitle, Modal, ModalBody, Label, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as Utils from "../../Utils";
import { get, upload, post } from '../../helper/api_helper';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Resizer from "react-image-file-resizer";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Header from '../../layouts/Header';

function Partnership(props) {
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [cropperModal, setCropperModal] = useState(false);
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("image");
    const [image, setImage] = useState("");
    const [media, setMedia] = useState([]);
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [data, setData] = useState(undefined);
    const [benefit, setBenefit] = useState([{}]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState([{}]);
    const [founder, setFounder] = useState([{}]);
    const [forms, setForms] = useState([]);

    useEffect(() => {
        if (user?.token) {
            getData();
            getForms();
        }
    }, [user?.token]);

    const getData = () => {
        get("partner/admin", { token: user?.token })
            .then(res => {
                if (res?.statusCode == 200) {
                    if (res?.data) {
                        setData(res?.data);
                        if (res?.data?.benefit?.length)
                            setBenefit(res?.data?.benefit);
                        if (res?.data?.formImage)
                            setImage(res?.data?.formImage);
                    }
                } else
                    toast.error(res?.error);
            })
            .catch(err => {
                console.error("error while getting city drop from header", err);
                toast.error("Something Went Wrong!");
            })
    }

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
        let err = undefined;
        benefit.forEach((item, index) => {
            if (!item?.image)
                err = `Image for benefit step ${index + 1} is missing!`;
        });
        if (err) {
            toast.error(err);
            return;
        }
        if (!image) {
            toast.error("Please select form image!");
            return;
        }
        let body = {
            ...v,
            token: user?.token
        }
        let benefitTemp = [];
        await Promise.all(benefit?.map(async (item, index) => {
            if (item?.image?.substring(0, 4) == 'data') {
                const obj = await urltoFile(item?.image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("partner/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    item.image = uploadRes.data;
            }
            benefitTemp.push(item);
        }));
        body = { ...body, benefit: benefitTemp };
        if (image?.substring(0, 4) == "data") {
            const obj = await urltoFile(image, new Date().getTime() + '.webp', 'image/webp');
            const tempObj = await resizeFile(obj);
            const form = new FormData();
            form.append("image", tempObj);
            const uploadRes = await upload("partner/image_upload", form);
            if (uploadRes?.statusCode == 200)
                body.formImage = uploadRes.data;
        }
        post("partner", body)
            .then(res => {
                if (res?.statusCode == 200) {
                    toast.success(res?.message);
                    getData();
                } else
                    toast.error(res?.error);
            })
            .catch(err => {
                console.error("error while getting city drop from header", err);
                toast.error("Something Went Wrong!");
            })
    }

    const handleImgChange = (file) => {
        if (file) {
            setFile(URL.createObjectURL(file));
            setCropperModal(true);
        }
        // } else {
        //     let temp = Object.assign([], benefit);
        //     temp[currentIndex].image = URL.createObjectURL(file);
        //     setBenefit(temp);
        // }
    }

    const cropImage = () => {
        setLoading(true);
        const fileData = cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL();
        if (fileType == "benefit") {
            let temp = Object.assign([], benefit);
            temp[currentIndex].image = fileData;
            setBenefit(temp);
        } else
            setImage(fileData);
        setCropperModal(false);
        setLoading(false);
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

    const handleInputwhy = (val, i, to) => {
        let temp = Object.assign([], benefit);
        temp[i][to] = val;
        setBenefit(temp);
    }

    const handleRemoveSectionImage = (index) => {
        let temp = Object.assign([], benefit);
        temp[index].image = undefined;
        setBenefit(temp);
        setFile(null);
    }

    const removeWhy = (i) => {
        let temp = Object.assign([], benefit);
        temp.splice(i, 1);
        setBenefit(temp);
    }

    const handleInputPoint = (val, i, to) => {
        let temp = Object.assign([], points);
        temp[i][to] = val;
        setPoints(temp);
    }

    const removePoint = (i) => {
        let temp = Object.assign([], points);
        temp.splice(i, 1);
        setPoints(temp);
    }

    const handleRemoveMedia = (i) => {
        let temp = Object.assign([], media);
        temp.splice(i, 1);
        setMedia(temp);
    }

    const handleRemoveFounderImage = (index) => {
        let temp = Object.assign([], founder);
        temp[index].image = undefined;
        setFounder(temp);
        setFile(null);
    }

    const removeFounder = (i) => {
        let temp = Object.assign([], founder);
        temp.splice(i, 1);
        setFounder(temp);
    }

    const handleInputFounder = (val, i, to) => {
        let temp = Object.assign([], founder);
        temp[i][to] = val;
        setFounder(temp);
    }
    // console.log("why onward", fileType, currentIndex, benefit);

    return (
        <React.Fragment>
            <Header />
            <div className="main main-app p-3 p-lg-4">
                <Modal isOpen={cropperModal} className='homebanner-crop' centered={true}>
                    <ModalBody>
                        <h5 className="text-black font-size-20">Crop Image</h5>
                        <div className="py-2">
                            <AvForm
                                className="form-horizontal"
                                onValidSubmit={(e, v) => {
                                    cropImage()
                                }}
                            >
                                <div className="mb-3 mt-2">
                                    <Cropper
                                        style={{ height: 200 }}
                                        aspectRatio={fileType == "form" ? 29 / 21 : 1 / 1}
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
                <Card className='form_home_banner'>
                    <input
                        name="image"
                        label="image"
                        className="d-none"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImgChange(e.target.files[0])}
                        ref={imagePickerRef}
                    />
                    <AvForm onValidSubmit={handleValidSubmit}>
                        <h5>Point-wise (Benefits)</h5>
                        <div className='mb-4'>
                            <AvField
                                name="pointTitle"
                                label="Section Title"
                                placeholder="Enter Section Title"
                                value={data?.pointTitle}
                                type="text"
                                required
                            />
                        </div>
                        {benefit?.map((item, index) => (
                            <>
                                <Row>
                                    <Col md={4}>
                                        {item?.image ?
                                            <div className='img-square' style={{}}>
                                                <img src={item?.image} style={{ width: '100%', height: '100%' }} />
                                                <div className='btn_cross_banner' style={{ right: -25 }}>
                                                    <Button type="button" className="btn-add" onClick={() => handleRemoveSectionImage(index)}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                            :
                                            <div className='img-place-square' style={{ marginTop: 20 }}>
                                                <div className='action-btn'>
                                                    <Button type="button" className="btn-add" onClick={() => { setCurrentIndex(index); setFileType("benefit"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                                </div>
                                            </div>
                                        }
                                    </Col>
                                    <Col>
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
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                            {benefit?.length > 0 &&
                                                <button type="button" className='button_2 btn-primary' onClick={() => removeWhy(index)}>Delete</button>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <button type="button" className='button_2 btn-primary' onClick={() => setBenefit([...benefit, {}])} style={{ marginRight: 10 }}>+ Add More Section</button>
                        </div>
                        <hr></hr>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="formId"
                                        label="Form"
                                        value={data?.formId}
                                        type="select"
                                    >
                                        <option value="">Select Form</option>
                                        {forms?.map((item) => (
                                            <option value={item?._id}>{item?.title}</option>
                                        ))}
                                    </AvField>
                                </div>
                            </Col>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="seo"
                                        label="SEO Meta Data"
                                        placeholder="Enter SEO Tags"
                                        value={data?.seo ? data?.seo : Utils.dummySeo}
                                        type="textarea"
                                        rows={5}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <button type="submit" className='button_2 btn-primary'>Submit</button>
                        </div>
                    </AvForm>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default Partnership;