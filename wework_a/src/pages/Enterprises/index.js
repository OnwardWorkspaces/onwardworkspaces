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
import Multiselect from 'multiselect-react-dropdown';

function Enterprises(props) {
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [cropperModal, setCropperModal] = useState(false);
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("image");
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [data, setData] = useState(undefined);
    const [staticSection, setStaticSection] = useState([{}]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cases, setCases] = useState([]);
    const [selectedCases, setselectedCases] = useState([]);
    const [clientale, setClientale] = useState([]);
    const [selectedClientale, setSelectedClientale] = useState([]);
    const [forms, setForms] = useState([]);
    const [FAQ, setFAQ] = useState([{}]);
    const [benefit, setBenefit] = useState([{}]);
    const [whyImage, setWhyImage] = useState(null);
    const [why, setWhy] = useState([""]);
    const [builtFor, setBuiltFor] = useState([{}]);

    useEffect(() => {
        if (user?.token) {
            getData();
            getForms();
        }
    }, [user?.token]);

    useEffect(() => {
        if (data?.clientale?.length) {
            let temp = [];
            data?.clientale?.forEach((item) => {
                let found = clientale.find(x => x._id == item);
                if (found)
                    temp.push(found);
            });
            setSelectedClientale(temp);
        }
    }, [data, clientale]);

    useEffect(() => {
        if (data?.cases?.length) {
            let temp = [];
            data?.cases?.forEach((item) => {
                let found = cases.find(x => x._id == item);
                if (found)
                    temp.push(found);
            });
            setselectedCases(temp);
        }
    }, [data, cases]);

    useEffect(() => {
        if (data?.whyImage)
            setWhyImage(data?.whyImage);
        if (data?.why?.length)
            setWhy(data?.why);
    }, [data]);

    const getData = () => {
        get("enterprise/admin", { token: user?.token })
            .then(res => {
                if (res?.statusCode == 200) {
                    if (res?.data) {
                        setData(res?.data);
                        if (res?.data?.section?.length)
                            setStaticSection(res?.data?.section);
                        if (res?.data?.builtFor?.length)
                            setBuiltFor(res?.data?.builtFor);
                        if (res?.data?.FAQ?.length)
                            setFAQ(res?.data?.FAQ);
                        if (res?.data?.benefit?.length)
                            setBenefit(res?.data?.benefit);
                    }
                } else
                    toast.error(res?.error);
            })
            .catch(err => {
                console.error("error while getting city drop from header", err);
                toast.error("Something Went Wrong!");
            })
        get("case/drop", { token: user?.token })
            .then(res => {
                if (res?.statusCode == 200)
                    setCases(res?.data);
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

    const handleValidSubmit = async (e, v) => {
        let err = undefined;
        staticSection.forEach((item, index) => {
            if (!item?.image)
                err = `Image for section step ${index + 1} is missing!`;
        });
        if (err) {
            toast.error(err);
            return;
        }
        builtFor.forEach((item, index) => {
            if (!item?.image)
                err = `Image for built for enterprices step ${index + 1} is missing!`;
        });
        if (err) {
            toast.error(err);
            return;
        }
        if (why?.length < 1) {
            toast.error("Enter at least one why onward point!");
            return;
        }
        if (!whyImage) {
            toast.error("Please select the why onward image!");
            return;
        }
        let body = {
            ...v,
            FAQ,
            benefit,
            why,
            token: user?.token
        }
        let caseTemp = [];
        selectedCases.forEach((item) => {
            caseTemp.push(item?._id);
        });
        body = { ...body, cases: caseTemp };
        let clientTemp = [];
        selectedClientale.forEach((item) => {
            clientTemp.push(item?._id);
        });
        body = { ...body, clientale: clientTemp };
        let sectionTemp = [];
        await Promise.all(staticSection?.map(async (item, index) => {
            if (item?.image?.substring(0, 4) == 'data') {
                const obj = await urltoFile(item?.image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("enterprise/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    item.image = uploadRes.data;
            }
            sectionTemp.push(item);
        }));
        body = { ...body, section: sectionTemp };
        let builtTemp = [];
        await Promise.all(builtFor?.map(async (item, index) => {
            if (item?.image?.substring(0, 4) == 'data') {
                const obj = await urltoFile(item?.image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("enterprise/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    item.image = uploadRes.data;
            }
            builtTemp.push(item);
        }));
        body = { ...body, builtFor: builtTemp };
        if (whyImage?.substring(0, 4) == 'data') {
            const obj = await urltoFile(whyImage, new Date().getTime() + '.webp', 'image/webp');
            const tempObj = await resizeFile(obj);
            const form = new FormData();
            form.append("image", tempObj);
            const uploadRes = await upload("enterprise/image_upload", form);
            if (uploadRes?.statusCode == 200)
                body.whyImage = uploadRes.data;
        }
        post("enterprise", body)
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

    const cropImage = () => {
        setLoading(true);
        const fileData = cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL();
        if (fileType == "section") {
            let temp = Object.assign([], staticSection);
            temp[currentIndex].image = fileData;
            setStaticSection(temp);
        }
        else if (fileType == "built") {
            let temp = Object.assign([], builtFor);
            temp[currentIndex].image = fileData;
            setBuiltFor(temp);
        } else if (fileType == 'whyImage') {
            setWhyImage(fileData);
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

    const handleInputSection = (val, i, to) => {
        let temp = Object.assign([], staticSection);
        temp[i][to] = val;
        setStaticSection(temp);
    }

    const handleInputBuilt = (val, i, to) => {
        let temp = Object.assign([], builtFor);
        temp[i][to] = val;
        setBuiltFor(temp);
    }

    const handleInputwhy = (val, i) => {
        let temp = Object.assign([], why);
        temp[i] = val;
        setWhy(temp);
    }

    const handleRemoveSectionImage = (index) => {
        let temp = Object.assign([], staticSection);
        temp[index].image = undefined;
        setStaticSection(temp);
        setFile(null);
    }

    const handleRemoveBuiltImage = (index) => {
        let temp = Object.assign([], builtFor);
        temp[index].image = undefined;
        setBuiltFor(temp);
        setFile(null);
    }

    const removeSection = (i) => {
        let temp = Object.assign([], staticSection);
        temp.splice(i, 1);
        setStaticSection(temp);
    }

    const removeWhy = (i) => {
        let temp = Object.assign([], why);
        temp.splice(i, 1);
        setWhy(temp);
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

    const handleInputBenefit = (val, i, to) => {
        let temp = Object.assign([], benefit);
        temp[i][to] = val;
        setBenefit(temp);
    }

    const handleAddBenefit = () => {
        let temp = Object.assign([], benefit);
        temp.push({});
        setBenefit(temp);
    }

    const handleRemoveBenefit = (i) => {
        let temp = Object.assign([], benefit);
        temp.splice(i, 1);
        console.log('slice', temp);
        setBenefit(temp);
    }
    // console.log("why onward", selectedCases);

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
                                        aspectRatio={fileType == "section" ? 945 / 700 : fileType == "point" ? 563 / 698 : fileType == "whyImage" ? 800 / 676 : 1 / 1}
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
                                                onChange={(e) => handleInputSection(e.target.value, index, "title")}
                                                required
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <AvField
                                                name={"hDesc" + index}
                                                label="Description"
                                                placeholder="Enter description"
                                                value={item?.desc}
                                                onChange={(e) => handleInputSection(e.target.value, index, "desc")}
                                                required
                                                type="textarea"
                                                rows={4}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                            {staticSection?.length > 0 &&
                                                <button type="button" className='button_2 btn-primary' onClick={() => removeSection(index)}>Delete</button>
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
                        {/* <Col md={12} className='mb-4'>
                            <h5>Case Studies</h5>
                            <Multiselect
                                options={cases} // Options to display in the dropdown
                                selectedValues={selectedCases} // Preselected value to persist in dropdown
                                onSelect={(list, item) => setselectedCases(list)} // Function will trigger on select event
                                onRemove={(list, item) => setselectedCases(list)} // Function will trigger on select event
                                displayValue="titleShort" // Property name to display in the dropdown options
                            />
                        </Col> */}
                        <h5>Why Onward ?</h5>
                        <Row>
                            <Col md={4}>
                                {whyImage ?
                                    <div className='img-banner' style={{ width: 285 }}>
                                        <img src={whyImage} style={{ width: '100%', height: '100%' }} />
                                        <div className='btn_cross_banner'>
                                            <Button type="button" className="btn-add" onClick={() => { setWhyImage(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                        </div>
                                    </div>
                                    :
                                    <div className='img-place-banner'>
                                        <div className='action-btn'>
                                            <Button type="button" className="btn-add" onClick={() => { setFileType("whyImage"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                        </div>
                                    </div>
                                }
                            </Col>
                            <Col md={8}>
                                {why?.map((item, index) => (
                                    <div className='mb-4'>
                                        <AvField
                                            name={"wDesc" + index}
                                            label="Description"
                                            placeholder="Enter why description"
                                            value={item}
                                            onChange={(e) => handleInputwhy(e.target.value, index)}
                                            required
                                            type="textarea"
                                            rows={4}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                            {why?.length > 0 &&
                                                <button type="button" className='button_2 btn-primary' onClick={() => removeWhy(index)}>Delete</button>
                                            }
                                        </div>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                    <button type="button" className='button_2 btn-primary' onClick={() => setWhy([...why, ""])} style={{ marginRight: 10 }}>+ Add More</button>
                                </div>
                            </Col>
                        </Row>
                        <hr></hr>
                        <h5>Built For Enterprices</h5>
                        {builtFor?.map((item, index) => (
                            <>
                                <Row>
                                    <Col md={4}>
                                        {item?.image ?
                                            <div className='img-banner' style={{ width: 285 }}>
                                                <img src={item?.image} style={{ width: '100%', height: '100%' }} />
                                                <div className='btn_cross_banner' style={{ right: -25 }}>
                                                    <Button type="button" className="btn-add" onClick={() => handleRemoveBuiltImage(index)}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                            :
                                            <div className='img-place-square' style={{ marginTop: 20, width: 285 }}>
                                                <div className='action-btn'>
                                                    <Button type="button" className="btn-add" onClick={() => { setCurrentIndex(index); setFileType("built"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
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
                                                onChange={(e) => handleInputBuilt(e.target.value, index, "title")}
                                                required
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <AvField
                                                name={"hDesc" + index}
                                                label="Description"
                                                placeholder="Enter description"
                                                value={item?.desc}
                                                onChange={(e) => handleInputBuilt(e.target.value, index, "desc")}
                                                required
                                                type="textarea"
                                                rows={4}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                            {builtFor?.length > 0 &&
                                                <button type="button" className='button_2 btn-primary' onClick={() => removeBuilt(index)}>Delete</button>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <hr></hr>
                            </>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <button type="button" className='button_2 btn-primary' onClick={() => setBuiltFor([...builtFor, {}])} style={{ marginRight: 10 }}>+ Add More</button>
                        </div>
                        <hr></hr>
                        <Col md={12} className='mb-5'>
                            <h5>Clientale</h5>
                            <Multiselect
                                options={clientale} // Options to display in the dropdown
                                selectedValues={selectedClientale} // Preselected value to persist in dropdown
                                onSelect={(list, item) => setSelectedClientale(list)} // Function will trigger on select event
                                onRemove={(list, item) => setSelectedClientale(list)} // Function will trigger on select event
                                displayValue="title" // Property name to display in the dropdown options
                            />
                        </Col>
                        <hr></hr>
                        {FAQ?.map((item, index) => (
                            <>
                                <Row>
                                    <Col md={3}>
                                        <Label>FAQ {index + 1}</Label>
                                    </Col>
                                    <Col md={9}>
                                        {index == FAQ?.length - 1 &&
                                            <Button type="button" className="btn-add mx-2" onClick={handleAddFAQ} style={{ float: 'right', backgroundColor: Utils.themeColor }}><i className={'fa fa-add'} /></Button>
                                        }
                                        {FAQ?.length > 1 &&
                                            <Button type="button" className="btn-add" onClick={() => handleRemoveFAQ(index)} style={{ float: 'right', backgroundColor: Utils.themeColor }}><i className={'fa fa-trash'} /></Button>
                                        }
                                    </Col>
                                </Row>
                                <Col md={12}>
                                    <div className='mb-4'>
                                        <AvField
                                            name={"fTitle" + index}
                                            placeholder="Enter FAQ title"
                                            label="Title"
                                            value={item?.title}
                                            onChange={(e) => handleInputFAQ(e.target.value, index, "title")}
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <AvField
                                            name={"fDesc" + index}
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
                        <hr></hr>
                        {benefit?.map((item, index) => (
                            <>
                                <Row>
                                    <Col md={3}>
                                        <Label>Benefit {index + 1}</Label>
                                    </Col>
                                    <Col md={9}>
                                        {index == benefit?.length - 1 &&
                                            <Button type="button" className="btn-add mx-2" onClick={handleAddBenefit} style={{ float: 'right', backgroundColor: Utils.themeColor }}><i className={'fa fa-add'} /></Button>
                                        }
                                        {benefit?.length > 1 &&
                                            <Button type="button" className="btn-add" onClick={() => handleRemoveBenefit(index)} style={{ float: 'right', backgroundColor: Utils.themeColor }}><i className={'fa fa-trash'} /></Button>
                                        }
                                    </Col>
                                </Row>
                                <Col md={12}>
                                    <div className='mb-4'>
                                        <AvField
                                            name={"bTitle" + index}
                                            placeholder="Enter Benefit title"
                                            label="Title"
                                            value={item?.title}
                                            onChange={(e) => handleInputBenefit(e.target.value, index, "title")}
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <AvField
                                            name={"bDesc" + index}
                                            label="Description"
                                            placeholder="Enter description"
                                            value={item?.desc}
                                            onChange={(e) => handleInputBenefit(e.target.value, index, "desc")}
                                            required
                                            type="textarea"
                                            rows={4}
                                        />
                                    </div>
                                </Col>
                            </>
                        ))}
                        <Row className='mt-4'>
                            <Col md={6}>
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
                            <Col md={6}>
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

export default Enterprises;