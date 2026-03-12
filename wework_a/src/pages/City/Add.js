import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Row, Col, Card, CardBody, CardTitle, Modal, ModalBody, Label } from 'reactstrap';
import { del, get, post, put, upload } from '../../helper/api_helper';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Resizer from "react-image-file-resizer";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as Utils from "../../Utils";
import Multiselect from 'multiselect-react-dropdown';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


function AddCity(props) {
    const { setIsAdd, user, currentData, loading, setLoading, getData, cities } = props;
    const [cropperModal, setCropperModal] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [clientale, setClientale] = useState([]);
    const [selectedClientale, setSelectedClientale] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [forms, setForms] = useState([]);
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("image");
    const [image, setImage] = useState(null);
    const [isGallery, setIsGallery] = useState(false);
    const [isFAQ, setIsFAQ] = useState(false);
    const [FAQ, setFAQ] = useState([]);
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [bContent, setBContent] = useState(null);
    const [bottom, setBottom] = useState("");
    const [ameni, setAmeni] = useState([]);
    const [selectedAmeni, setSelectedAmeni] = useState([]);
    useEffect(() => {
        if (user?.token) {
            getCats();
            getForms();
        }
    }, [user]);

    useEffect(() => {
        if (currentData) {
            if (currentData?.image)
                setImage(currentData?.image);
            if (currentData?.isFAQ)
                setIsFAQ(currentData?.isFAQ);
            if (currentData?.FAQ?.length)
                setFAQ(currentData?.FAQ);
            if (currentData?.gallery?.length) {
                setIsGallery(true);
                setGallery(currentData?.gallery);
            }
            if (currentData?.ameni?.length > 0) {
                let temp = [];
                currentData.ameni?.forEach((server) => {
                    ameni?.forEach(item => {
                        if (server == item?._id)
                            temp.push(item);
                    })
                });
                setSelectedAmeni(temp);
            }
            if (currentData?.bContent) {
                const contentBlock = htmlToDraft(currentData?.bContent);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    setBContent(editorState);
                    setBottom(currentData?.bContent);
                }
            }
        }
    }, [currentData,ameni]);

    useEffect(() => {
        if (currentData) {
            if (currentData?.isClient)
                setIsClient(true);
            if (currentData?.clientale?.length) {
                let temp = [];
                currentData?.clientale?.forEach(item => {
                    let found = clientale.find(x => x?._id == item);
                    if (found)
                        temp.push(found);
                });
                setSelectedClientale(temp);
            }
        }
    }, [currentData, clientale]);

    const getCats = () => {
        get("amenity/list", { token: user?.token })
            .then(res => {
                if (res?.statusCode == 200)
                    setAmeni(res?.data);
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

    const handleImgChange = (file) => {
        setFile(URL.createObjectURL(file));
        setCropperModal(true);
    }

    const cropImage = () => {
        setLoading(true);
        const fileData = cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL();
        if (fileType == "image") {
            setImage(fileData);
        } else {
            let temp = Object.assign([], gallery);
            temp.push(fileData);
            setGallery(temp);
        }
        setCropperModal(false);
        setLoading(false);
    }

    const handleValidSubmit = async (e, v) => {
        if (!loading) {
            if (selectedAmeni?.length < 1) {
                toast.error("Please select the City Amenities!");
                return;
            }
            setLoading(true);
            let body = {
                ...v,
                image,
                FAQ: FAQ,
                bContent: bottom,
                token: user?.token
            }
            if (isClient) {
                let tempClient = [];
                selectedClientale?.forEach(item => {
                    tempClient.push(item?._id);
                });
                body = { ...body, clientale: tempClient };
            }
            if (image.substring(0, 4) == "data") {
                const obj = await urltoFile(image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("city/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    body.image = uploadRes.data;
            }
            let galleryTemp = [];
            await Promise.all(gallery.map(async (item) => {
                if (item?.substring(0, 4) == 'data') {
                    const obj = await urltoFile(item, new Date().getTime() + '.webp', 'image/webp');
                    const tempObj = await resizeFile(obj);
                    const form = new FormData();
                    form.append("image", tempObj);
                    const uploadRes = await upload("city/image_upload", form);
                    if (uploadRes?.statusCode == 200)
                        galleryTemp.push(uploadRes.data);
                } else {
                    galleryTemp.push(item);
                }
            }));
            let ameniTemp = [];
            selectedAmeni.forEach((item) => {
                ameniTemp.push(item?._id);
            });
            body = { ...body, gallery: galleryTemp, ameni: ameniTemp };
            if (currentData?._id) {
                body = { ...body, cityId: currentData?._id }
                put("city", body)
                    .then(res => {
                        setLoading(false);
                        if (res?.statusCode == 200) {
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
                post("city/", body)
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

    const handleRemoveGallery = (i) => {
        let temp = Object.assign([], gallery);
        temp.splice(i, 1);
        setGallery(temp);
    }

    const handleIsFAQ = () => {
        if (isFAQ) {
            setIsFAQ(false);
        } else {
            setFAQ(currentData?.FAQ?.length ? currentData?.FAQ : [{}]);
            setIsFAQ(true);
        }
    }

    const handleIsGallery = () => {
        if (isGallery) {
            setIsGallery(false);
        } else {
            setIsGallery(currentData?.gallery?.length ? currentData?.gallery : []);
            setIsGallery(true);
        }
    }

    const handleInputFAQ = (val, i, to) => {
        let temp = Object.assign([], FAQ);
        temp[i][to] = val;
        setFAQ(temp);
    }

    const handleAddFAQ = () => {
        let temp = Object.assign([], FAQ);
        temp.push({});
        setFAQ(temp);
    }

    const handleRemoveFAQ = (i) => {
        let temp = Object.assign([], FAQ);
        temp.splice(i, 1);
        console.log('slice', temp);
        setFAQ(temp);
    }

    const onEditorStateChange = (editorState) => {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setBottom(html);
        setBContent(editorState);
    }

    return (
        <React.Fragment>
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
                                        style={{ height: 200, width: '100%' }}
                                        aspectRatio={fileType == "image" ? 1462 / 525 : 2 / 1}
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
                                <CardTitle className='mb-4'><b>{currentData?._id ? 'Update City' : 'Add New City'}</b></CardTitle>
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
                                            <img src={image} style={{ width: '100%', height: '100%' }} />
                                            <div className='btn_cross_banner' style={{ right: -25 }}>
                                                <Button type="button" className="btn-add" onClick={() => { setImage(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                            </div>
                                        </div>
                                        :
                                        <div className='img-place-banner' style={{ marginTop: 0, width: '100%' }}>
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
                                            label="Title"
                                            placeholder="Enter city title"
                                            value={currentData?.title}
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <AvField
                                            name="path"
                                            label="Url"
                                            placeholder="Enter city url"
                                            value={currentData?.path}
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <AvField
                                            name="heading"
                                            label="Heading"
                                            placeholder="Enter heading"
                                            value={currentData?.heading}
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <AvField
                                            name="desc"
                                            label="Description"
                                            placeholder="Enter city description"
                                            value={currentData?.desc}
                                            rows={4}
                                            type="textarea"
                                            required
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className='divider' />
                            <div className='my-3 d-flex'>
                                <AvField
                                    name="isClient"
                                    type="checkbox"
                                    checked={isClient}
                                    onChange={() => setIsClient(!isClient)}
                                />
                                <Label className='mx-2'>Clientale</Label>
                            </div>
                            {isClient &&
                                <>
                                    <Col md={12} className='mb-4'>
                                        <Multiselect
                                            options={clientale} // Options to display in the dropdown
                                            selectedValues={selectedClientale} // Preselected value to persist in dropdown
                                            onSelect={(list, item) => setSelectedClientale(list)} // Function will trigger on select event
                                            displayValue="title" // Property name to display in the dropdown options
                                        />
                                    </Col>
                                </>
                            }
                            <div className='divider' />
                            <div className='my-3 d-flex'>
                                <AvField
                                    name="isGallery"
                                    type="checkbox"
                                    label="Gallery"
                                    checked={isGallery}
                                    onChange={handleIsGallery}
                                />
                                <Label className='mx-2'>Gallery</Label>
                            </div>
                            {isGallery &&
                                <Row className='mb-4'>
                                    {gallery?.map((item, index) => (
                                        <Col md={4}>
                                            <div className='img-banner'>
                                                <img src={item} style={{ width: '100%', height: '100%' }} />
                                                <div className='btn_cross_banner'>
                                                    <Button type="button" className="btn-add" onClick={() => handleRemoveGallery(index)}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                    <Col md={4}>
                                        <div className='img-place-banner' >
                                            <div className='action-btn'>
                                                <Button type="button" className="btn-add" onClick={() => { setFileType("gallery"); imagePickerRef.current.click() }}><i className={'ri-image-fill'} /></Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            }
                            <div className='divider' />
                            <div className='my-4 d-flex'>
                                <AvField
                                    name="isFAQ"
                                    type="checkbox"
                                    label="FAQs"
                                    checked={isFAQ}
                                    onChange={handleIsFAQ}
                                />
                                <Label className='mx-2'>FAQs</Label>
                            </div>
                            {isFAQ &&
                                <>
                                    {FAQ?.map((item, index) => (
                                        <>
                                            <Row>
                                                <Col md={3}>
                                                    <Label>FAQ {index + 1}</Label>
                                                </Col>
                                                <Col md={9}>
                                                    {index == FAQ?.length - 1 &&
                                                        <Button type="button" className="btn-add mx-2" onClick={handleAddFAQ} style={{ float: 'right' }}><i className={'fa fa-add'} /></Button>
                                                    }
                                                    {FAQ?.length > 1 &&
                                                        <Button type="button" className="btn-add" onClick={() => handleRemoveFAQ(index)} style={{ float: 'right' }}><i className={'fa fa-trash'} /></Button>
                                                    }
                                                </Col>
                                            </Row>
                                            <Col md={12}>
                                                <div className='mb-4'>
                                                    <AvField
                                                        name={"hTitle" + index}
                                                        placeholder="Enter FAQ title"
                                                        label="Title"
                                                        value={item?.title}
                                                        onChange={(e) => handleInputFAQ(e.target.value, index, "title")}
                                                        required
                                                    />
                                                </div>
                                                <div className='mb-4'>
                                                    <AvField
                                                        name={"hDesc" + index}
                                                        label="Description"
                                                        placeholder="Enter description"
                                                        value={item?.desc}
                                                        onChange={(e) => handleInputFAQ(e.target.value, index, "desc")}
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
                            <Label><h5>Clientale Headings</h5></Label>
                            <Row>
                                <Col lg={6} md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="cliHead"
                                            label="Heading"
                                            placeholder="Enter heading for clientale section"
                                            value={currentData?.cliHead}
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
                                            value={currentData?.cliPara}
                                            type="textarea"
                                            required
                                        />
                                    </div>
                                </Col>
                            </Row>
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
                            <Label><h5>Gallery Headings</h5></Label>
                            <Row>
                                <Col lg={6} md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="galHead"
                                            label="Heading"
                                            placeholder="Enter heading for gallery section"
                                            value={currentData?.galHead}
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
                                            value={currentData?.galPara}
                                            type="textarea"
                                            required
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className='divider' />
                            <Label><h5>Properties Headings</h5></Label>
                            <Row>
                                <Col lg={6} md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="proHead"
                                            label="Heading"
                                            placeholder="Enter heading for properties section"
                                            value={currentData?.proHead}
                                            type="text"
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col lg={12} md={12}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="proPara"
                                            label="Paragraph"
                                            placeholder="Enter paragraph for properties section"
                                            value={currentData?.proPara}
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
                            <Label><h5>Testimonial Headings</h5></Label>
                            <Row>
                                <Col lg={6} md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="testiHead"
                                            label="Heading"
                                            placeholder="Enter heading for testimonial section"
                                            value={currentData?.testiHead}
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
                                            value={currentData?.testiPara}
                                            type="textarea"
                                            required
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className='divider' />
                            <Row>
                                <Col md={12} className='mb-4'>
                                    <Label><h5>City Amenities *</h5></Label>
                                    <div className='mb-4'>
                                        <Multiselect
                                            required
                                            options={ameni} // Options to display in the dropdown
                                            selectedValues={selectedAmeni} // Preselected value to persist in dropdown
                                            onSelect={(list, item) => setSelectedAmeni(list)} // Function will trigger on select event
                                            displayValue="title" // Property name to display in the dropdown options
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className='divider' />
                            <Label><h5>FAQ Headings</h5></Label>
                            <Row>
                                <Col lg={6} md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="faqHead"
                                            label="Heading"
                                            placeholder="Enter heading for FAQ section"
                                            value={currentData?.faqHead}
                                            type="text"
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col lg={12} md={12}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="faqPara"
                                            label="Paragraph"
                                            placeholder="Enter paragraph for FAQ section"
                                            value={currentData?.faqPara}
                                            type="textarea"
                                            required
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className='divider' />
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
                            <Row>
                                <Col md={6}>
                                    <Button type="reset" onClick={() => setIsAdd(false)} className="btn-sign w-100">Cancel</Button>
                                </Col>
                                <Col md={6}>
                                    <Button type="submit" className="btn-sign w-100">{currentData?._id ? 'Update' : 'Add'}</Button>
                                </Col>
                            </Row>
                        </AvForm>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default AddCity;