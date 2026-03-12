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
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Header from '../../layouts/Header';

function HomeBanner(props) {
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
    const [staticSection, setStaticSection] = useState([{}]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [points, setPoints] = useState([{}]);
    const [founder, setFounder] = useState([{}]);

    useEffect(() => {
        if (user?.token)
            getData();
    }, [user?.token]);

    const getData = () => {
        get("about/admin", { token: user?.token })
            .then(res => {
                if (res?.statusCode == 200) {
                    if (res?.data) {
                        setData(res?.data);
                        if (res?.data?.section?.length)
                            setStaticSection(res?.data?.section);
                        if (res?.data?.pointImage)
                            setImage(res?.data?.pointImage);
                        if (res?.data?.point?.length)
                            setPoints(res?.data?.point);
                        if (res?.data?.media?.length)
                            setMedia(res?.data?.media);
                        if (res?.data?.founder?.length)
                            setFounder(res?.data?.founder);
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
        staticSection.forEach((item, index) => {
            if (!item?.image)
                err = `Image for section step ${index + 1} is missing!`;
        });
        founder.forEach((item, index) => {
            if (!item?.image)
                err = `Image for founder step ${index + 1} is missing!`;
        });
        if (err) {
            toast.error(err);
            return;
        }
        if (!image) {
            toast.error("Please select point-wise image!");
            return;
        }
        let body = {
            ...v,
            point: points,
            token: user?.token
        }
        let sectionTemp = [];
        await Promise.all(staticSection?.map(async (item, index) => {
            if (item?.image?.substring(0, 4) == 'data') {
                const obj = await urltoFile(item?.image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("about/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    item.image = uploadRes.data;
            }
            sectionTemp.push(item);
        }));
        body = { ...body, section: sectionTemp };
        if (image?.substring(0, 4) == "data") {
            const obj = await urltoFile(image, new Date().getTime() + '.webp', 'image/webp');
            const tempObj = await resizeFile(obj);
            const form = new FormData();
            form.append("image", tempObj);
            const uploadRes = await upload("about/image_upload", form);
            if (uploadRes?.statusCode == 200)
                body.pointImage = uploadRes.data;
        }
        let mediaTemp = [];
        await Promise.all(media.map(async (item) => {
            if (item?.image?.substring(0, 4) == 'data') {
                const obj = await urltoFile(item?.image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("about/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    mediaTemp.push({ ...item, image: uploadRes.data });
            } else {
                mediaTemp.push(item);
            }
        }));
        body = { ...body, media: mediaTemp };
        let founderTemp = [];
        await Promise.all(founder?.map(async (item, index) => {
            if (item?.image?.substring(0, 4) == 'data') {
                const obj = await urltoFile(item?.image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("about/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    item.image = uploadRes.data;
            }
            founderTemp.push(item);
        }));
        body = { ...body, founder: founderTemp };
        post("about", body)
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
        //     let temp = Object.assign([], staticSection);
        //     temp[currentIndex].image = URL.createObjectURL(file);
        //     setStaticSection(temp);
        // }
    }

    const cropImage = (url) => {
        setLoading(true);
        const fileData = cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL();
        if (fileType == "section") {
            let temp = Object.assign([], staticSection);
            temp[currentIndex].image = fileData;
            setStaticSection(temp);
        } else if (fileType == "point")
            setImage(fileData);
        else if (fileType == "media") {
            let temp = Object.assign([], media);
            temp.push({ image: fileData, url });
            setMedia(temp);
        }
        else if (fileType == "founder") {
            let temp = Object.assign([], founder);
            temp[currentIndex].image = fileData;
            setFounder(temp);
        }
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
        let temp = Object.assign([], staticSection);
        temp[i][to] = val;
        setStaticSection(temp);
    }

    const handleRemoveSectionImage = (index) => {
        let temp = Object.assign([], staticSection);
        temp[index].image = undefined;
        setStaticSection(temp);
        setFile(null);
    }

    const removeWhy = (i) => {
        let temp = Object.assign([], staticSection);
        temp.splice(i, 1);
        setStaticSection(temp);
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
    // console.log("why onward", fileType, currentIndex, staticSection);

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
                                    cropImage(v?.url)
                                }}
                            >
                                <div className="mb-3 mt-2">
                                    <Cropper
                                        style={{ height: 200 }}
                                        aspectRatio={fileType == "section" ? 945 / 700 : fileType == "point" ? 563 / 698 : fileType == "media" ? 29 / 21 : 1 / 1}
                                        preview=".img-preview"
                                        guides={true}
                                        src={file}
                                        ref={cropperRef}
                                    />
                                </div>
                                {fileType == "media" ?
                                    <div className="mt-4">
                                        <AvField
                                            name="url"
                                            label="Redirection"
                                            placeholder="Enter the media url for this image (optional)"
                                            type="url"
                                        />
                                    </div>
                                    : null}
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
                        {/* <Row>
                            <Col md={4}>
                                <Label>Image</Label>
                                {image ?
                                    <div className='img-banner'>
                                        <img src={image} style={{ width: '100%', height: '180px' }} />
                                        <div className='btn_cross_banner' style={{ right: -25 }}>
                                            <Button type="button" className="btn-add" onClick={() => { setImage(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                        </div>
                                    </div>
                                    :
                                    <div className='img-place-banner' style={{ marginTop: 0 }}>
                                        <div className='action-btn'>
                                            <Button type="button" className="btn-add" onClick={() => { setFileType("image"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                        </div>
                                    </div>
                                }
                            </Col>
                            <Col md={8}>
                                <div className='mb-4'>
                                    <AvField
                                        name="title"
                                        label="Heading"
                                        placeholder="Enter Home banner heading"
                                        value={data?.title}
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <AvField
                                        name="subTitle"
                                        label="Sub Heading"
                                        placeholder="Enter home banner description"
                                        value={data?.subTitle}
                                        type="textarea"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <AvField
                                        name="buttonTitle"
                                        label="Button Title"
                                        placeholder="Enter button title"
                                        value={data?.buttonTitle}
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <AvField
                                        name="imgAlt"
                                        label="Image Alt"
                                        placeholder="Enter image alt tag"
                                        value={data?.imgAlt}
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <AvField
                                        name="member"
                                        label="Members"
                                        placeholder="Enter number of members"
                                        value={data?.member}
                                        type="number"
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <AvField
                                        name="sqFeet"
                                        label="Square Feet"
                                        placeholder="Enter square feet"
                                        value={data?.sqFeet}
                                        type="number"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <hr></hr> */}
                        <h5>Static Sections</h5>
                        {staticSection?.map((item, index) => (
                            <>
                                <Row>
                                    <Col md={4}>
                                        {item?.image ?
                                            <div className='img-banner' style={{ width: 285 }}>
                                                <img src={item?.image} style={{ width: '100%', height: '100%' }} />
                                                <div className='btn_cross_banner' style={{ right: -25 }}>
                                                    <Button type="button" className="btn-add" onClick={() => handleRemoveSectionImage(index)}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                            :
                                            <div className='img-place-square' style={{ marginTop: 20, width: 285 }}>
                                                <div className='action-btn'>
                                                    <Button type="button" className="btn-add" onClick={() => { setCurrentIndex(index); setFileType("section"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
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
                                            {staticSection?.length > 0 &&
                                                <button type="button" className='button_2 btn-primary' onClick={() => removeWhy(index)}>Delete</button>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <button type="button" className='button_2 btn-primary' onClick={() => setStaticSection([...staticSection, {}])} style={{ marginRight: 10 }}>+ Add More Section</button>
                        </div>
                        <hr></hr>
                        <h5>Point-wise (Core Values)</h5>
                        <Row>
                            <Col md={4}>
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
                                {image ?
                                    <div className='img-banner' style={{ width: 285, height: 360 }}>
                                        <img src={image} style={{ width: '100%', height: '100%' }} />
                                        <div className='btn_cross_banner' style={{ right: -25 }}>
                                            <Button type="button" className="btn-add" onClick={() => { setImage(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                        </div>
                                    </div>
                                    :
                                    <div className='img-place-square' style={{ marginTop: 20, width: 285, height: 360 }}>
                                        <div className='action-btn'>
                                            <Button type="button" className="btn-add" onClick={() => { setFileType("point"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                        </div>
                                    </div>
                                }
                            </Col>
                            <Col md={8}>
                                {points?.map((item, index) => (
                                    <div>
                                        <div className='mb-4'>
                                            <AvField
                                                name={"hTitle" + index}
                                                placeholder="Enter title"
                                                label="Title"
                                                value={item?.title}
                                                onChange={(e) => handleInputPoint(e.target.value, index, "title")}
                                                required
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <AvField
                                                name={"hDesc" + index}
                                                label="Description"
                                                placeholder="Enter description"
                                                value={item?.desc}
                                                onChange={(e) => handleInputPoint(e.target.value, index, "desc")}
                                                required
                                                type="textarea"
                                                rows={4}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                            {points?.length > 0 &&
                                                <button type="button" className='button_2 btn-primary' onClick={() => removePoint(index)}>Delete</button>
                                            }
                                        </div>
                                        <hr></hr>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                    <button type="button" className='button_2 btn-primary' onClick={() => setPoints([...points, {}])} style={{ marginRight: 10 }}>+ Add More Point</button>
                                </div>
                            </Col>
                        </Row>
                        {/* <hr></hr>
                        <h5>News & Media</h5>
                        <div className='mb-4'>
                            <AvField
                                name="mediaDesc"
                                label="Heading"
                                placeholder="Enter Media Heading"
                                value={data?.mediaDesc}
                                type="textarea"
                                required
                            />
                        </div>
                        <Row className='mb-4'>
                            {media?.map((item, index) => (
                                <Col md={3}>
                                    <div className='img-banner' style={{ width: 250 }}>
                                        <img src={item?.image} style={{ width: '100%', height: '100%' }} />
                                        <div className='btn_cross_banner'>
                                            <Button type="button" className="btn-add" onClick={() => handleRemoveMedia(index)}><i className={'fa fa-close'} /></Button>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                            {media?.length < 5 &&
                                <Col md={3}>
                                    <div className='img-place-square' style={{ width: 250 }}>
                                        <div className='action-btn'>
                                            <Button type="button" className="btn-add" onClick={() => { setFileType("media"); imagePickerRef.current.click() }}><i className={'ri-image-fill'} /></Button>
                                        </div>
                                    </div>
                                </Col>
                            }
                        </Row> */}
                        <hr></hr>
                        <h5>Founder</h5>
                        <div className='mb-4'>
                            <AvField
                                name="founderDesc"
                                label="Heading"
                                placeholder="Enter founder heading"
                                value={data?.founderDesc}
                                type="textarea"
                                required
                            />
                        </div>
                        {founder?.map((item, index) => (
                            <>
                                <Row>
                                    <Col md={3}>
                                        {item?.image ?
                                            <div className='img-square'>
                                                <img src={item?.image} style={{ width: '100%', height: '100%' }} />
                                                <div className='btn_cross_banner' style={{ right: -25 }}>
                                                    <Button type="button" className="btn-add" onClick={() => handleRemoveFounderImage(index)}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                            :
                                            <div className='img-place-square' style={{ marginTop: 20 }}>
                                                <div className='action-btn'>
                                                    <Button type="button" className="btn-add" onClick={() => { setCurrentIndex(index); setFileType("founder"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                                </div>
                                            </div>
                                        }
                                    </Col>
                                    <Col>
                                        <div className='mb-4'>
                                            <AvField
                                                name={"fTitle" + index}
                                                placeholder="Enter title"
                                                label="Title"
                                                value={item?.title}
                                                onChange={(e) => handleInputFounder(e.target.value, index, "title")}
                                                required
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <AvField
                                                name={"fRole" + index}
                                                placeholder="Enter Role"
                                                label="Role"
                                                value={item?.role}
                                                onChange={(e) => handleInputFounder(e.target.value, index, "role")}
                                                required
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <AvField
                                                name={"fDesc" + index}
                                                label="Description"
                                                placeholder="Enter description"
                                                value={item?.desc}
                                                onChange={(e) => handleInputFounder(e.target.value, index, "desc")}
                                                required
                                                type="textarea"
                                                rows={4}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                            {founder?.length > 0 &&
                                                <button type="button" className='button_2 btn-primary' onClick={() => removeFounder(index)}>Delete</button>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <button type="button" className='button_2 btn-primary' onClick={() => setFounder([...founder, {}])} style={{ marginRight: 10 }}>+ Add More Founder</button>
                        </div>
                        <hr></hr>
                        <Row className='mt-4'>
                            <Col lg={12} md={12}>
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

export default HomeBanner;