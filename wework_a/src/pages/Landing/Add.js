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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Multiselect from 'multiselect-react-dropdown';
import Loader from "../../components/Loader";

function AddClientale(props) {
    const { setIsAdd, user, currentData, loading, setLoading, getData } = props;
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [cropperModal, setCropperModal] = useState(false);
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [fileType, setFileType] = useState("image");
    const [clientale, setClientale] = useState([]);
    const [selectedClientale, setSelectedClientale] = useState([]);
    const [forms, setForms] = useState([]);
    const [testi, setTesti] = useState([]);
    const [selectedTesti, setSelectedTesti] = useState([]);
    const [FAQ, setFAQ] = useState([]);
    const [gallery, setGallery] = useState([]);

    const [samples, setSamples] = useState([
        {
            type: "banner",
            thumb: require("../../assets/img/banner.png")
        },
        {
            type: "clientale",
            thumb: require("../../assets/img/clientale.png")
        },
        {
            type: "testimonial",
            thumb: require("../../assets/img/testi.png")
        },
        {
            type: "faq",
            thumb: require("../../assets/img/faq.png")
        },
        {
            type: "gallery",
            thumb: require("../../assets/img/gallery.png")
        }
    ]);
    const [section, setSection] = useState([

    ]);

    useEffect(() => {
        if (user?.token) {
            getClients();
            getForms();
            getTesti();
        }
    }, [user])

    const getClients = () => {
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

    const getTesti = () => {
        get("testi/drop", { token: user?.token })
            .then(res => {
                if (res?.statusCode == 200) {
                    if (res?.data) {
                        setTesti(res?.data);
                    }
                } else
                    toast.error(res?.error);
            })
            .catch(err => {
                console.error("error while getting city drop from header", err);
                toast.error("Something Went Wrong!");
            })
    }

    useEffect(() => {
        if (currentData) {
            setImage(currentData?.image);
            if (currentData?.section?.length)
                setSection(currentData?.section);
            if (currentData?.clientale?.length) {
                let tempClients = [];
                currentData?.clientale?.forEach((item) => {
                    let found = clientale?.find(x => x._id == item);
                    if (found)
                        tempClients.push(found);
                });
                setSelectedClientale(tempClients);
            }
            if (currentData?.testi?.length) {
                let temp = [];
                currentData?.testi?.forEach((item) => {
                    let found = testi?.find(x => x._id == item);
                    if (found)
                        temp.push(found);
                });
                setSelectedTesti(temp);
            }
            if (currentData?.FAQ?.length) {
                setFAQ(currentData?.FAQ);
            }
            if (currentData?.gallery?.length) {
                setGallery(currentData?.gallery);
            }
        }
    }, [currentData, clientale, testi]);

    const handleValidSubmit = async (e, v) => {
        if (!loading) {
            let err = "";
            let checkBanner = section?.findIndex(x => x.type == "banner");
            if (checkBanner != -1)
                if (!section[checkBanner].image)
                    err = "Please Select Banner Image!";
            let checkGallery = section?.findIndex(x => x.type == "gallery");
            if (checkGallery != -1)
                if (gallery?.length < 1)
                    err = "Please Select Atleast one gallery Image!";
            if (err) {
                toast.error(err);
                return;
            }
            setLoading(true);
            let body = {
                ...v,
                token: user?.token
            }
            console.log("form values", body);
            let tempSection = [];
            await Promise.all(section?.map(async (item) => {
                item.thumb = undefined;
                if (item?.type == "banner") {
                    if (item?.image && item?.image?.substring(0, 4) == 'data') {
                        const obj = await urltoFile(item?.image, new Date().getTime() + '.webp', 'image/webp');
                        const tempObj = await resizeFile(obj);
                        const form = new FormData();
                        form.append("image", tempObj);
                        const uploadRes = await upload("landing/image_upload", form);
                        if (uploadRes?.statusCode == 200)
                            item.image = uploadRes?.data;
                    }
                } else if (item?.type == "clientale") {
                    let clients = [];
                    selectedClientale?.forEach((item) => {
                        clients.push(item?._id);
                    })
                    body = { ...body, clientale: clients };
                } else if (item?.type == "testimonial") {
                    let temp = [];
                    selectedTesti?.forEach((item) => {
                        temp.push(item?._id);
                    })
                    body = { ...body, testi: temp };
                } else if (item?.type == "faq") {
                    body = { ...body, FAQ: FAQ };
                }
                tempSection.push(item);
            }));
            body = { ...body, section: tempSection };
            let galleryTemp = [];
            await Promise.all(gallery.map(async (item) => {
                if (item?.substring(0, 4) == 'data') {
                    const obj = await urltoFile(item, new Date().getTime() + '.webp', 'image/webp');
                    const tempObj = await resizeFile(obj);
                    const form = new FormData();
                    form.append("image", tempObj);
                    const uploadRes = await upload("landing/image_upload", form);
                    if (uploadRes?.statusCode == 200)
                        galleryTemp.push(uploadRes.data);
                } else {
                    galleryTemp.push(item);
                }
            }));
            body = { ...body, gallery: galleryTemp };
            if (currentData?._id) {
                body = { ...body, landingId: currentData?._id }
                put("landing", body)
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
                post("landing", body)
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
        if (fileType == "image") {
            let temp = Object.assign([], section);
            let found = temp.findIndex(x => x.type == "banner");
            temp[found].image = fileData;
            setSection(temp);
        } else {
            setGallery([...gallery, fileData]);
        }
        setCropperModal(false);
        setLoading(false);
    }

    const removeBannerImage = () => {
        let temp = Object.assign([], section);
        let found = temp.findIndex(x => x.type == "banner");
        temp[found].image = undefined;
        setSection(temp);
        setFile(null);
    }

    const handleSectionInput = (i, to, val) => {
        let temp = Object.assign([], section);
        temp[i][to] = val;
        setSection(temp);
    }

    const handleAddfield = () => {
        let temp = Object.assign([], section);
        temp.push({});
        setSection(temp);
    }

    const removeSection = (i) => {
        let temp = Object.assign([], section);
        temp.splice(i, 1);
        console.log('slice', temp);
        setSection(temp);
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;
        console.log("dragging", result);
        // If dropped outside a droppable area, do nothing
        if (!destination) {
            return;
        }

        // If dropped in the same list, reorder the list
        if (source.droppableId === destination.droppableId) {
            const updatedList = [...(source.droppableId === 'samples' ? samples : section)];
            const [movedItem] = updatedList.splice(source.index, 1);
            updatedList.splice(destination.index, 0, movedItem);

            if (source.droppableId === 'samples') {
                setSamples(updatedList);
            } else {
                setSection(updatedList);
            }
        } else if (source.droppableId == "samples" && destination.droppableId == "section") {
            // const movedItem = samples[source.index];
            // if (source?.index == 3)
            //     setFAQ([currentData?.FAQ?.length ? currentData?.FAQ : {}]);
            // // setSamples((prevList) => prevList.filter((item, index) => index !== source.index));
            // setSection((prevList) => [...prevList, movedItem]);
            const movedItem = samples[source.index];
            // setSamples((prevList) => prevList.filter((item, index) => index !== source.index));
            if (source?.index == 3)
                setFAQ([currentData?.FAQ?.length ? currentData?.FAQ : {}]);
            setSection((prevList) => [
                ...prevList.slice(0, destination.index),
                movedItem,
                ...prevList.slice(destination.index),
            ]);
        }
        else {
            // If dropped in different lists, move the item from samples to section
        }
    };

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

    const handleRemoveGallery = (i) => {
        let temp = Object.assign([], gallery);
        temp.splice(i, 1);
        setGallery(temp);
    }


    console.log("section", section);

    return (
        <React.Fragment>
            <Loader visible={loading} />
            <Modal isOpen={cropperModal} className='homebanner-crop' centered={true}>
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
                                    style={{ height: 200, }}
                                    aspectRatio={fileType == "image" ? 1780 / 549 : 2 / 1}
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
                            <CardTitle className='mb-4'><b>{currentData?._id ? 'Update Page' : 'Add New Page'}</b></CardTitle>
                        </Col>
                        <Col>
                            <Button type="button" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Close</Button>
                        </Col>
                    </Row>
                    <AvForm onValidSubmit={handleValidSubmit}>
                        {/* <Col md={3}>
                                <Label>Image</Label>
                                {image ?
                                    <div className='img-banner'>
                                        <img src={image} style={{ width: '100%', height: 180 }} />
                                        <div className='btn_cross_banner'>
                                            <Button type="button" className="btn-add" onClick={() => { setImage(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                        </div>
                                    </div>
                                    :
                                    <div className='img-place-banner' style={{ width: '100%', height: 180 }}>
                                        <div className='action-btn'>
                                            <Button type="button" className="btn-add" onClick={() => { imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                        </div>
                                    </div>
                                }
                            </Col> */}
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Row>
                                <Col md={9}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="title"
                                            placeholder="Enter Form title"
                                            label="Title"
                                            value={currentData?.title}
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <AvField
                                            name={"seo"}
                                            label="SEO Meta Data"
                                            placeholder="Enter SEO Tags"
                                            value={currentData?.seo ? currentData?.seo : Utils.dummySeo}
                                            type="textarea"
                                            rows={5}
                                        />
                                    </div>
                                    <Droppable droppableId="section">
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {section.map((item, index) => (
                                                    <Draggable key={index} draggableId={`section-${index}`} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <Row>
                                                                    <Col md={10}>
                                                                        <h5 style={{ textTransform: 'capitalize' }}>{item?.type}</h5>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <Button type="button" onClick={() => removeSection(index)} className="btn-sign" style={{ float: 'right' }}>Delete</Button>
                                                                    </Col>
                                                                </Row>
                                                                {item?.type == "banner" &&
                                                                    <div>
                                                                        <Row>
                                                                            <Col md={4}>
                                                                                <Label>Image</Label>
                                                                                {item.image ?
                                                                                    <div className='img-banner'>
                                                                                        <img src={item.image} style={{ width: '100%', height: '180px' }} />
                                                                                        <div className='btn_cross_banner' style={{ right: -25 }}>
                                                                                            <Button type="button" className="btn-add" onClick={removeBannerImage}><i className={'fa fa-close'} /></Button>
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
                                                                                        name={`${item?.type}title`}
                                                                                        label="Heading"
                                                                                        placeholder="Enter Home banner heading"
                                                                                        value={item?.title}
                                                                                        onChange={(e) => handleSectionInput(index, "title", e.target.value)}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                                <div className='mb-4'>
                                                                                    <AvField
                                                                                        name={`${item?.type}subTitle`}
                                                                                        label="Sub Heading"
                                                                                        placeholder="Enter home banner description"
                                                                                        value={item?.subTitle}
                                                                                        onChange={(e) => handleSectionInput(index, "subTitle", e.target.value)}
                                                                                        type="textarea"
                                                                                        rows={3}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                                <div className='mb-4'>
                                                                                    <AvField
                                                                                        name={`${item?.type}formId`}
                                                                                        label="Lead Form"
                                                                                        value={item?.formId}
                                                                                        type="select"
                                                                                        onChange={(e) => handleSectionInput(index, "formId", e.target.value)}
                                                                                        required
                                                                                    >
                                                                                        <option vlaue="">Select Form</option>
                                                                                        {forms?.map((item) => (
                                                                                            <option value={item?._id}>{item?.title}</option>
                                                                                        ))}
                                                                                    </AvField>
                                                                                </div>
                                                                                <div className='mb-4'>
                                                                                    <AvField
                                                                                        name={`${item?.type}imgAlt`}
                                                                                        label="Image Alt"
                                                                                        placeholder="Enter image alt tag"
                                                                                        value={item?.imgAlt}
                                                                                        onChange={(e) => handleSectionInput(index, "imgAlt", e.target.value)}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                }
                                                                {item?.type == "clientale" &&
                                                                    <div className='mb-4 mt-4'>
                                                                        <Multiselect
                                                                            options={clientale}
                                                                            selectedValues={selectedClientale}
                                                                            onSelect={(list, item) => setSelectedClientale(list)}
                                                                            onRemove={(list, item) => setSelectedClientale(list)}
                                                                            displayValue="title"
                                                                        />
                                                                    </div>
                                                                }
                                                                {item?.type == "testimonial" &&
                                                                    <div className='mb-4 mt-4'>
                                                                        <Multiselect
                                                                            options={testi}
                                                                            selectedValues={selectedTesti}
                                                                            onSelect={(list, item) => setSelectedTesti(list)}
                                                                            onRemove={(list, item) => setSelectedTesti(list)}
                                                                            displayValue="name"
                                                                        />
                                                                    </div>
                                                                }
                                                                {item?.type == "faq" &&
                                                                    <div className='mb-4 mt-4'>
                                                                        {FAQ?.map((item, index) => (
                                                                            <>
                                                                                <div style={{ borderBottom: "1px dashed #b6b6b6", marginBottom: 20 }}></div>
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
                                                                    </div>
                                                                }
                                                                {
                                                                    item?.type == "gallery" &&
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
                                                                <div style={{ borderBottom: "1px dashed #b6b6b6", marginBottom: 20 }}></div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {/* {section?.length < 1 && */}
                                                <div style={{ border: '1px dashed #b6b6b6', padding: '20px', display: 'flex', justifyContent: 'center' }}>
                                                    <span>Drop Here</span>
                                                </div>
                                                {/* } */}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Col>
                                <Col md={3} className='mt-4'>
                                    <Droppable droppableId="samples">
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                // style={{ border: '1px solid #ddd', padding: '8px' }}
                                                className='drag-area'
                                            >
                                                {samples.map((item, index) => (
                                                    <Draggable key={index} draggableId={`samples-${index}`} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div className='drag-card mt-2'>
                                                                    <img src={item?.thumb} style={{ borderBottom: "1px dashed #b6b6b6", objectFit: 'contain' }} />
                                                                    <p style={{ textTransform: "capitalize" }}>{item?.type}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Col>
                            </Row>
                        </DragDropContext>
                        <Row className='mt-5'>
                            <Col md={6}>
                                <Button type="reset" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Cancel</Button>
                            </Col>
                            <Col md={6}>
                                <Button type="submit" className="btn-sign">{currentData?._id ? 'Update Page' : 'Add Page'}</Button>
                            </Col>
                        </Row>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default AddClientale;