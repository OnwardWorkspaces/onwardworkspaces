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
import Header from '../../layouts/Header';
import Multiselect from 'multiselect-react-dropdown';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

function HomeBanner(props) {
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [cropperModal, setCropperModal] = useState(false);
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("image");
    const [image, setImage] = useState("");
    const [media, setMedia] = useState([]);

    const [logo, setLogo] = useState("");
    const [footerLogo, setFooterLogo] = useState("");
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [data, setData] = useState(undefined);
    const [whyOnward, setWhyOnward] = useState([{}]);
    const [currentWhy, setCurrentWhy] = useState(0);
    const [forms, setForms] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [clientale, setClientale] = useState([]);
    const [selectedClientale, setSelectedClientale] = useState([]);
    const [bContent, setBContent] = useState(null);
    const [bottom, setBottom] = useState("");

    useEffect(() => {
        if (user?.token) {
            getForms();
            getData();
        }
    }, [user?.token]);

    useEffect(() => {
        if (data) {
            if (data?.clientale?.length) {
                let temp = [];
                data?.clientale?.forEach(item => {
                    let found = clientale.find(x => x?._id == item);
                    if (found)
                        temp.push(found);
                });
                setSelectedClientale(temp);
            }
        }
    }, [data, clientale]);

    const getData = () => {
        get("home/admin", { token: user?.token })
            .then(res => {
                if (res?.statusCode == 200) {
                    if (!res?.data?.seo)
                        res.data.seo = Utils?.dummySeo;
                    setData(res?.data);
                    setWhyOnward(res?.data?.whyOnward);
                    setImage(res?.data?.image);
                    setLogo(res?.data?.logo);
                    setFooterLogo(res?.data?.footerLogo);
                    if (res?.data?.media?.length)
                        setMedia(res?.data?.media);
                    if (res?.data?.header?.length)
                        setHeaders(res?.data?.header);
                    else
                        setHeaders([
                            { title: "Home", isActive: true, pos: 1 },
                            { title: "About Us", isActive: true, pos: 2 },
                            { title: "Location", isActive: true, pos: 3 },
                            { title: "Blog", isActive: true, pos: 4 },
                            { title: "Our Solutions", isActive: true, pos: 5 },
                            { title: "Enterprise", isActive: true, pos: 6 },
                            { title: "GET IN TOUCH", isActive: true, pos: 7 }
                        ]);
                    if (res?.data?.bContent) {
                        const contentBlock = htmlToDraft(res?.data?.bContent);
                        if (contentBlock) {
                            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                            const editorState = EditorState.createWithContent(contentState);
                            setBContent(editorState);
                            setBottom(res?.data?.bContent);
                        }
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
            });
        get("clientale/list", { token: user?.token })
            .then(res => {
                setLoading(false);
                if (res?.statusCode == 200) {
                    setClientale(res?.data);
                }
            })
            .catch(err => {
                setLoading(false);
                toast.error("Something Went Wrong!");
            })
    }

    const handleValidSubmit = async (e, v) => {
        if (!image) {
            toast.error("Please select banner image!");
            return;
        }
        let err = undefined;
        whyOnward.forEach((item, index) => {
            if (!item?.image)
                err = `Image for Why Onward step ${index + 1} is missing!`;
        })
        if (err) {
            toast.error(err);
            return;
        }
        let body = {
            ...v,
            image: image,
            header: headers,
            bContent: bottom,
            token: user?.token
        }
        if (image?.substring(0, 4) == "data") {
            const obj = await urltoFile(image, new Date().getTime() + '.webp', 'image/webp');
            const tempObj = await resizeFile(obj);
            const form = new FormData();
            form.append("image", tempObj);
            const uploadRes = await upload("home/image_upload", form);
            if (uploadRes?.statusCode == 200)
                body.image = uploadRes.data;
        }
        if (logo?.substring(0, 4) == "data") {
            const obj = await urltoFile(logo, new Date().getTime() + '.webp', 'image/webp');
            const tempObj = await resizeFile(obj);
            const form = new FormData();
            form.append("image", tempObj);
            const uploadRes = await upload("home/image_upload", form);
            if (uploadRes?.statusCode == 200)
                body.logo = uploadRes.data;
        }
        if (footerLogo?.substring(0, 4) == "data") {
            const obj = await urltoFile(footerLogo, new Date().getTime() + '.webp', 'image/webp');
            const tempObj = await resizeFile(obj);
            const form = new FormData();
            form.append("image", tempObj);
            const uploadRes = await upload("home/image_upload", form);
            if (uploadRes?.statusCode == 200)
                body.footerLogo = uploadRes.data;
        }
        let why = [];
        await Promise.all(whyOnward?.map(async (item, index) => {
            if (item?.image.substring(0, 4) == "blob") {
                const obj = await urltoFile(item?.image, new Date().getTime() + '.svg', 'image/svg');
                const form = new FormData();
                form.append("image", obj);
                const uploadRes = await upload("home/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    item.image = uploadRes.data;
            }
            why.push(item);
        }));
        body = { ...body, whyOnward: why };
        let mediaTemp = [];
        await Promise.all(media.map(async (item) => {
            if (item?.image?.substring(0, 4) == 'data') {
                const obj = await urltoFile(item?.image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("home/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    mediaTemp.push({ ...item, image: uploadRes.data });
            } else {
                mediaTemp.push(item);
            }
        }));
        console.log("media temp", mediaTemp);
        body = { ...body, media: mediaTemp };
        console.log("body", body);
        let tempClient = [];
        selectedClientale?.forEach(item => {
            tempClient.push(item?._id);
        });
        body = { ...body, clientale: tempClient };
        post("home/add", body)
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
        if (fileType == "image") {
            setFile(URL.createObjectURL(file));
            setCropperModal(true);
        } else if (fileType == "logo") {
            setFile(URL.createObjectURL(file));
            setCropperModal(true);
        } else if (fileType == "flogo") {
            setFile(URL.createObjectURL(file));
            setCropperModal(true);
        } else if (fileType == "media") {
            setFile(URL.createObjectURL(file));
            setCropperModal(true);

        } else {
            let temp = Object.assign([], whyOnward);
            temp[currentWhy].image = URL.createObjectURL(file);
            setWhyOnward(temp);
        }
    }

    const cropImage = (url) => {
        setLoading(true);
        const fileData = cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL();
        if (fileType == "image")
            setImage(fileData);
        if (fileType == "flogo")
            setFooterLogo(fileData);
        else if (fileType == "media") {
            let temp = Object.assign([], media);
            temp.push({ image: fileData, url });
            setMedia(temp);
        }
        else
            setLogo(fileData);
        setCropperModal(false);
        setLoading(false);
    }

    const handleRemoveMedia = (i) => {
        let temp = Object.assign([], media);
        temp.splice(i, 1);
        setMedia(temp);
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
        let temp = Object.assign([], whyOnward);
        temp[i][to] = val;
        setWhyOnward(temp);
    }

    const handleRemoveWhyImage = (index) => {
        let temp = Object.assign([], whyOnward);
        temp[index].image = undefined;
        setWhyOnward(temp);
        setFile(null);
    }

    const removeWhy = (i) => {
        let temp = Object.assign([], whyOnward);
        temp.splice(i, 1);
        setWhyOnward(temp);
    }

    const handleInputHeader = (val, i, to) => {
        let temp = Object.assign([], headers);
        if (to == "title")
            temp[i][to] = val;
        else {
            console.log("changing input", val);
            temp[i][to] = val == "false" ? true : false;
        }
        setHeaders(temp);
    }

    const onEditorStateChange = (editorState) => {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setBottom(html);
        setBContent(editorState);
    }

    // console.log("why onward", headers);

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
                                        aspectRatio={fileType == "image" ? 1780 / 569 : fileType == "logo" ? 304 / 79 : fileType == "flogo" ? 304 / 79 : fileType == "media" ? 29 / 21 : 1 / 1}
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
                {/* <Modal isOpen={cropperModal} className='homebanner-crop' centered={true}>
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
                </Modal> */}
                <div className="home-banner">
                    <div className='banner-img'>
                        <img src={image ? image : require('../../assets/images/home-banner.png')} alt='home-banner' />
                    </div>
                    <div className='banner-content'>
                        <div className='content-b'>
                            <h1>{data?.title}</h1>
                            <p>{data?.subTitle}</p>
                            <button className='button_2'>{data?.buttonTitle}</button>
                        </div>
                    </div>
                </div>
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
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <Col md={6}>
                                        <Label>Logo</Label>
                                        {logo ?
                                            <div className='img-banner'>
                                                <img src={logo} style={{ width: '90%', height: '100px', objectFit: "contain", padding: 10 }} />
                                                <div className='btn_cross_banner' style={{ right: -25 }}>
                                                    <Button type="button" className="btn-add" onClick={() => { setLogo(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                            :
                                            <div className='img-place-banner' style={{ marginTop: 0 }}>
                                                <div className='action-btn'>
                                                    <Button type="button" className="btn-add" onClick={() => { setFileType("logo"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                                </div>
                                            </div>
                                        }
                                    </Col>
                                    <Col md={6}>
                                        <Label>Footer Logo</Label>
                                        {footerLogo ?
                                            <div className='img-banner' style={{}}>
                                                <img src={footerLogo} style={{ width: '100%', height: '100px', objectFit: "contain", backgroundColor: "#212529", padding: 20 }} />
                                                <div className='btn_cross_banner' style={{ right: -25 }}>
                                                    <Button type="button" className="btn-add" onClick={() => { setFooterLogo(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                            :
                                            <div className='img-place-banner' style={{ marginTop: 0 }}>
                                                <div className='action-btn'>
                                                    <Button type="button" className="btn-add" onClick={() => { setFileType("flogo"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                                </div>
                                            </div>
                                        }
                                    </Col>
                                </Row>
                                <Label className='mt-5'>Image</Label>
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
                        <hr></hr>
                        <Label><h5>Header Menu</h5></Label>
                        <Row>
                            {headers?.map((item, index) => (
                                <>
                                    <Col md={2}>
                                        <div className='mb-4' style={{ position: 'relative' }}>
                                            <AvField
                                                name={"heaTitle" + index}
                                                placeholder="Enter title"
                                                label={"Item " + (index + 1)}
                                                value={item?.title}
                                                onChange={(e) => handleInputHeader(e.target.value, index, "title")}
                                                required
                                            />
                                            <AvField
                                                name={"heaCheck" + index}
                                                style={{ position: 'absolute', top: 2, right: 10 }}
                                                // placeholder="Enter title"
                                                // label={"Item " + (index + 1)}
                                                value={item?.isActive}
                                                onChange={(e) => handleInputHeader(e.target.value, index, "isActive")}
                                                type="checkbox"
                                                // onChange={(e) => handleInputwhy(e.target.value, index, "title")}
                                                required
                                            />
                                        </div>
                                    </Col>
                                </>
                            ))}
                        </Row>
                        <hr></hr>
                        <Label><h5>Clientale</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="cliHead"
                                        label="Heading"
                                        placeholder="Enter heading for clientale section"
                                        value={data?.cliHead}
                                        type="text"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="cliPara"
                                        label="Paragraph"
                                        placeholder="Enter paragraph for clientale section"
                                        value={data?.cliPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col md={12} className='mb-4'>
                                <Label>Clientale</Label>
                                <Multiselect
                                    options={clientale} // Options to display in the dropdown
                                    selectedValues={selectedClientale} // Preselected value to persist in dropdown
                                    onSelect={(list, item) => setSelectedClientale(list)} // Function will trigger on select event
                                    onRemove={(list, item) => setSelectedClientale(list)} // Function will trigger on select event
                                    displayValue="title" // Property name to display in the dropdown options
                                />
                            </Col>
                        </Row>
                        <hr></hr>
                        <Label><h5>Properties Headings</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="propHead"
                                        label="Heading"
                                        placeholder="Enter heading for properties section"
                                        value={data?.propHead}
                                        type="text"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="propPara"
                                        label="Paragraph"
                                        placeholder="Enter paragraph for properties section"
                                        value={data?.propPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Label><h5>Let's connect Headings</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="connHead"
                                        label="Heading"
                                        placeholder="Enter heading for let's connect section"
                                        value={data?.connHead}
                                        type="text"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="connPara"
                                        label="Paragraph"
                                        placeholder="Enter paragraph for let's connect section"
                                        value={data?.connPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Label><h5>Why Onward</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="whyHead"
                                        label="Heading"
                                        placeholder="Enter heading for Why onward section"
                                        value={data?.whyHead}
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
                                        placeholder="Enter paragraph for Why onward section"
                                        value={data?.whyPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        {whyOnward?.map((item, index) => (
                            <>
                                <Row>
                                    <Col md={4}>
                                        {item?.image ?
                                            <div className='img-square'>
                                                <img src={item?.image} style={{ width: '100%', height: '100%' }} />
                                                <div className='btn_cross_banner' style={{ right: -25 }}>
                                                    <Button type="button" className="btn-add" onClick={() => handleRemoveWhyImage(index)}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                            :
                                            <div className='img-place-square' style={{ marginTop: 0 }}>
                                                <div className='action-btn'>
                                                    <Button type="button" className="btn-add" onClick={() => { setCurrentWhy(index); setFileType("why"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
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
                                            {whyOnward?.length > 0 &&
                                                <button type="button" className='button_2 btn-primary' onClick={() => removeWhy(index)}>Delete</button>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <button type="button" className='button_2 btn-primary' onClick={() => setWhyOnward([...whyOnward, {}])} style={{ marginRight: 10 }}>+ Add More</button>
                        </div>
                        <hr></hr>
                        <Label><h5>Category Headings</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="catHead"
                                        label="Heading"
                                        placeholder="Enter heading for category section"
                                        value={data?.catHead}
                                        type="text"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="catPara"
                                        label="Paragraph"
                                        placeholder="Enter paragraph for category section"
                                        value={data?.catPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Label><h5>Testimonial Headings</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="testiHead"
                                        label="Heading"
                                        placeholder="Enter heading for testimonial section"
                                        value={data?.testiHead}
                                        type="text"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="testiPara"
                                        label="Paragraph"
                                        placeholder="Enter paragraph for testimonial section"
                                        value={data?.testiPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Label><h5>Gallery Headings</h5></Label>
                        <Row>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="galHead"
                                        label="Heading"
                                        placeholder="Enter heading for gallery section"
                                        value={data?.galHead}
                                        type="text"
                                        required
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12}>
                                <div className='mb-4'>
                                    <AvField
                                        name="galPara"
                                        label="Paragraph"
                                        placeholder="Enter paragraph for gallery section"
                                        value={data?.galPara}
                                        type="textarea"
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        <hr></hr>
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
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col lg={12} md={12}>
                                <div className="mb-3">
                                    <Editor
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={(e) => onEditorStateChange(e)}
                                        editorState={bContent}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="formId"
                                        label="Lead Form"
                                        value={data?.formId}
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
                            <Col lg={6} md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="seo"
                                        label="Seo Tags"
                                        placeholder="Enter Seo Tags"
                                        value={data?.seo}
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