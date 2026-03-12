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


function AddService(props) {
    const { setIsAdd, user, currentData, loading, setLoading, getData, cities } = props;
    const [file, setFile] = useState(null);
    const [banners, setBanners] = useState([]);
    const [isClient, setIsClient] = useState(false);
    const [clientale, setClientale] = useState([]);
    const [selectedClientale, setSelectedClientale] = useState([]);
    const [isGallery, setIsGallery] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [forms, setForms] = useState([]);
    const [isVideo, setIsVideo] = useState(false);
    const [video, setVideo] = useState([]);
    const [cropperModal, setCropperModal] = useState(false);
    const [isNearBy, setIsNearBy] = useState(false);
    const [nearBy, setNearBy] = useState([{}]);
    const [isFAQ, setIsFAQ] = useState(false);
    const [FAQ, setFAQ] = useState([]);
    const [location, setLocation] = useState([]);
    const [standCat, setStandCat] = useState([]);
    const [selectedStandCat, setSelectedCat] = useState([]);
    const [ameni, setAmeni] = useState([]);
    const [selectedAmeni, setSelectedAmeni] = useState([]);
    const [imageType, setImageType] = useState("file");
    const imagePickerRef = useRef();
    const videoPickerRef = useRef();
    const cropperRef = useRef();
    const [bContent, setBContent] = useState(null);
    const [bottom, setBottom] = useState("");

    useEffect(() => {
        if (currentData) {
            if (currentData?.images?.length)
                setBanners(currentData?.images);
            if (currentData?.gallery?.length)
                setGallery(currentData?.gallery);
            if (currentData?.nearBy?.length)
                setNearBy(currentData?.nearBy);
            if (currentData?.isGallery)
                setIsGallery(true);
            if (currentData?.isNearBy)
                setIsNearBy(true);
            if (currentData?.isFAQ)
                setIsFAQ(currentData?.isFAQ);
            if (currentData?.FAQ?.length)
                setFAQ(currentData?.FAQ);
            if (currentData?.isVideo)
                setIsVideo(currentData?.isVideo);
            if (currentData?.videos?.length)
                setVideo(currentData?.videos);
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
            let found = cities.find(x => x._id == currentData?.cityId);
            if (found)
                setLocation(found?.locations);
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
    }, [currentData, ameni, cities, clientale]);

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

    useEffect(() => {
        if (user?.token) {
            getMeta();
            getForms();
        }
    }, [user]);

    const getMeta = () => {
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

    const handleValidSubmit = async (e, v) => {
        if (!loading) {
            if (banners?.length < 1) {
                toast.error(`Please select atleast one banner Image!`);
                return;
            }
            if (selectedAmeni?.length < 1) {
                toast.error("Please select the Property Amenities!");
                return;
            }
            setLoading(true);
            let body = {
                ...v,
                nearBy,
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
            let standTemp = [];
            selectedStandCat?.forEach((item) => {
                standTemp.push(item?._id);
            });
            body = { ...body, standCat: standTemp };
            let ameniTemp = [];
            selectedAmeni.forEach((item) => {
                ameniTemp.push(item?._id);
            });
            body = { ...body, ameni: ameniTemp };
            let temp = [];
            await Promise.all(banners.map(async (item) => {
                if (item?.substring(0, 4) == 'data') {
                    const obj = await urltoFile(item, new Date().getTime() + '.webp', 'image/webp');
                    const tempObj = await resizeFile(obj);
                    const form = new FormData();
                    form.append("image", tempObj);
                    const uploadRes = await upload("property/image_upload", form);
                    if (uploadRes?.statusCode == 200)
                        temp.push(uploadRes.data);
                } else {
                    temp.push(item);
                }
            }));
            body = { ...body, images: temp };
            let galleryTemp = [];
            await Promise.all(gallery.map(async (item) => {
                if (item?.substring(0, 4) == 'data') {
                    const obj = await urltoFile(item, new Date().getTime() + '.webp', 'image/webp');
                    const tempObj = await resizeFile(obj);
                    const form = new FormData();
                    form.append("image", tempObj);
                    const uploadRes = await upload("property/image_upload", form);
                    if (uploadRes?.statusCode == 200)
                        galleryTemp.push(uploadRes.data);
                } else {
                    galleryTemp.push(item);
                }
            }));
            body = { ...body, gallery: galleryTemp };
            let videoTemp = [];
            await Promise.all(video.map(async (item) => {
                if (item?.substring(0, 4) == 'blob') {
                    const obj = await urltoFile(item, new Date().getTime() + '.mp4', 'video/mp4');
                    const form = new FormData();
                    form.append("image", obj);
                    const uploadRes = await upload("property/image_upload", form);
                    if (uploadRes?.statusCode == 200)
                        videoTemp.push(uploadRes.data);
                } else {
                    videoTemp.push(item);
                }
            }));
            body = { ...body, videos: videoTemp };
            console.log('body to submit', body);
            if (currentData?._id) {
                body = { ...body, propertyId: currentData?._id }
                put("property", body)
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
                post("property", body)
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
        if (imageType == 'file') {
            let temp = Object.assign([], banners);
            temp.push(fileData);
            setBanners(temp);
        } else {
            let temp = Object.assign([], gallery);
            temp.push(fileData);
            setGallery(temp);
        }
        setCropperModal(false);
        setLoading(false);
    }

    const handleAddHigh = () => {
        let temp = Object.assign([], nearBy);
        temp.push({});
        setNearBy(temp);
    }

    const handleRemoveHigh = (i) => {
        let temp = Object.assign([], nearBy);
        temp.splice(i, 1);
        console.log('slice', temp);
        setNearBy(temp);
    }

    const handleRemoveBanner = (i) => {
        let temp = Object.assign([], banners);
        temp.splice(i, 1);
        setBanners(temp);
    }

    const handleIsGallery = () => {
        if (isGallery) {
            setIsGallery(false);
        } else {
            setIsGallery(true);
        }
    }

    const handleIsVideo = () => {
        if (isVideo) {
            setIsVideo(false);
        } else {
            setIsVideo(true);
        }
    }

    const handleIsNearBy = () => {
        if (isNearBy) {
            setIsNearBy(false);
        } else {
            setNearBy(currentData?.nearBy?.length ? currentData?.nearBy : [{}]);
            setIsNearBy(true);
        }
    }

    const handleRemoveGallery = (i) => {
        let temp = Object.assign([], gallery);
        temp.splice(i, 1);
        setGallery(temp);
    }

    const handleInputHigh = (val, i, to) => {
        let temp = Object.assign([], nearBy);
        temp[i][to] = val;
        setNearBy(temp);
    }

    const handleCityChange = (id) => {
        let found = cities.find(x => x._id == id);
        console.log('finding city', id, found);
        if (found) {
            setLocation(found?.locations);
        }
    }

    const handleIsFAQ = () => {
        if (isFAQ) {
            setIsFAQ(false);
        } else {
            setFAQ(currentData?.FAQ?.length ? currentData?.FAQ : [{}]);
            setIsFAQ(true);
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

    const handleVideoChange = (file) => {
        console.log("getting video file", file);
        let temp = Object.assign([], video);
        temp.push(URL.createObjectURL(file));
        setVideo(temp);
    }

    const onEditorStateChange = (editorState) => {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setBottom(html);
        setBContent(editorState);
    }

    // console.log("location", video);

    return (
        <React.Fragment>
            <div className="main main-app p-3 p-lg-4">
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
                                        aspectRatio={imageType == "file" ? 1462 / 525 : 2 / 1}
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
                    multiple={false}
                    onChange={(e) => handleImgChange(e.target.files[0])}
                    ref={imagePickerRef}
                />
                <input
                    name="video"
                    label="video"
                    className="d-none"
                    type="file"
                    multiple={false}
                    accept="video/*"
                    onChange={(e) => handleVideoChange(e.target.files[0])}
                    ref={videoPickerRef}
                />
                <Card>
                    <CardBody>
                        <Row>
                            <Col md={10}>
                                <CardTitle className='mb-4'><b>{currentData?._id ? 'Update Property' : 'Add New Property'}</b></CardTitle>
                            </Col>
                            <Col>
                                <Button type="button" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Close</Button>
                            </Col>
                        </Row>
                        <AvForm onValidSubmit={handleValidSubmit}>
                            <div className='mb-4'>
                                <Row>
                                    {banners?.map((item, index) => (
                                        <Col md={4}>
                                            <div className='img-banner'>
                                                <img src={item} style={{ width: '100%', height: '100%' }} />
                                                <div className='btn_cross_banner'>
                                                    <Button type="button" className="btn-add" onClick={() => handleRemoveBanner(index)}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                    {banners.length < 4 &&
                                        <Col md={4}>
                                            <div className='img-place-banner'>
                                                <div className='action-btn'>
                                                    <Button type="button" className="btn-add" onClick={() => { setImageType("file"); imagePickerRef.current.click() }}><i className={'ri-image-fill'} /></Button>
                                                </div>
                                            </div>
                                        </Col>
                                    }
                                </Row>
                            </div>
                            <Row>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="cityId"
                                            label="City"
                                            value={currentData?.cityId}
                                            required
                                            type="select"
                                            onChange={e => handleCityChange(e.target.value)}
                                        >
                                            <option value={""}>Select City</option>
                                            {cities?.map((item) => (
                                                <option value={item?._id}>{item?.title}</option>
                                            ))}
                                        </AvField>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="locationId"
                                            label="Location"
                                            value={currentData?.locationId}
                                            required
                                            type="select"
                                        >
                                            <option value={""}>Select Location</option>
                                            {location?.map((item) => (
                                                <option value={item?._id}>{item?.title}</option>
                                            ))}
                                        </AvField>
                                    </div>
                                </Col>
                                {/* <Col md={6} className='mb-4'>
                                    <Label>Standard Amenities *</Label>
                                    <Multiselect
                                        options={standCat} // Options to display in the dropdown
                                        selectedValues={selectedStandCat} // Preselected value to persist in dropdown
                                        onSelect={(list, item) => setSelectedCat(list)} // Function will trigger on select event
                                        displayValue="title" // Property name to display in the dropdown options
                                    />
                                </Col> */}
                                <Col md={12} className='mb-4'>
                                    <Label>Property Amenities *</Label>
                                    <Multiselect
                                        options={ameni} // Options to display in the dropdown
                                        selectedValues={selectedAmeni} // Preselected value to persist in dropdown
                                        onSelect={(list, item) => setSelectedAmeni(list)} // Function will trigger on select event
                                        displayValue="title" // Property name to display in the dropdown options
                                    />
                                </Col>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="title"
                                            placeholder="Enter property title"
                                            label="Title"
                                            value={currentData?.title}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="path"
                                            label="Url"
                                            placeholder="Enter city url"
                                            value={currentData?.path}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="price"
                                            placeholder="Enter starting from price"
                                            label="Starting from price"
                                            value={currentData?.price}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="seat"
                                            placeholder="Enter number of seating capacity"
                                            label="Seating Capacity"
                                            value={currentData?.seat}
                                            type="number"
                                            required
                                        />
                                    </div>
                                </Col>
                                {/* <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="lat"
                                            placeholder="Enter latitude"
                                            label="Latitude"
                                            type="number"
                                            value={currentData?.lat}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="long"
                                            placeholder="Enter longitude"
                                            label="Longitude"
                                            type="number"
                                            value={currentData?.long}
                                            required
                                        />
                                    </div>
                                </Col> */}
                            </Row>
                            <div className='mb-4'>
                                <AvField
                                    name="mapLocation"
                                    label="Map Location *"
                                    placeholder="Enter location as iframe (change width '600' to '100%' )"
                                    value={currentData?.mapLocation}
                                    required
                                    type="textarea"
                                    rows={4}
                                />
                            </div>
                            <div className='mb-4'>
                                <AvField
                                    name="address"
                                    label="Address"
                                    placeholder="Enter address"
                                    value={currentData?.address}
                                    required
                                    type="textarea"
                                    rows={4}
                                />
                            </div>
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
                                        <div className='img-place-banner'>
                                            <div className='action-btn'>
                                                <Button type="button" className="btn-add" onClick={() => { setImageType("Gallery"); imagePickerRef.current.click() }}><i className={'ri-image-fill'} /></Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            }
                            <div className='divider' />
                            <div className='my-3 d-flex'>
                                <AvField
                                    name="isVideo"
                                    type="checkbox"
                                    label="Videos"
                                    checked={isVideo}
                                    onChange={handleIsVideo}
                                />
                                <Label className='mx-2'>Videos</Label>
                            </div>
                            {isVideo &&
                                <Row className='mb-4'>
                                    {video?.map((item, index) => (
                                        <Col md={4}>
                                            <div className='img-banner'>
                                                <video src={item} controls style={{ width: '100%', height: '100%' }} />
                                                <div className='btn_cross_banner'>
                                                    <Button type="button" className="btn-add" onClick={() => handleRemoveGallery(index)}><i className={'fa fa-close'} /></Button>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                    <Col md={4}>
                                        <div className='img-place-banner'>
                                            <div className='action-btn'>
                                                <Button type="button" className="btn-add" onClick={() => videoPickerRef.current.click()}><i className={'ri-video-fill'} /></Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            }
                            <div className='divider' />
                            <div className='my-3 d-flex'>
                                <AvField
                                    name="isNearBy"
                                    type="checkbox"
                                    label="Near By"
                                    checked={isNearBy}
                                    onChange={handleIsNearBy}
                                />
                                <Label className='mx-2'>Near By</Label>
                            </div>
                            {isNearBy &&
                                <>
                                    {nearBy?.map((item, index) => (
                                        <>
                                            <Row>
                                                <Col md={3}>
                                                    <Label>Near By {index + 1}</Label>
                                                </Col>
                                                <Col md={9}>
                                                    {index == nearBy?.length - 1 &&
                                                        <Button type="button" className="btn-add mx-2" onClick={handleAddHigh} style={{ float: 'right' }}><i className={'fa fa-add'} /></Button>
                                                    }
                                                    {nearBy?.length > 1 &&
                                                        <Button type="button" className="btn-add" onClick={() => handleRemoveHigh(index)} style={{ float: 'right' }}><i className={'fa fa-trash'} /></Button>
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <div className='mb-4'>
                                                        <AvField
                                                            name={"hTitle" + index}
                                                            placeholder="Enter near by title"
                                                            label="Title"
                                                            value={item?.title}
                                                            onChange={(e) => handleInputHigh(e.target.value, index, "title")}
                                                            required
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className='mb-4'>
                                                        <AvField
                                                            name={"hDistance" + index}
                                                            placeholder="Enter near by distance"
                                                            label="Distance"
                                                            type="number"
                                                            value={item?.distance}
                                                            onChange={(e) => handleInputHigh(e.target.value, index, "distance")}
                                                            required
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className='mb-4'>
                                                        <AvField
                                                            name={"hDesc" + index}
                                                            label="Description"
                                                            placeholder="Enter description"
                                                            value={item?.desc}
                                                            onChange={(e) => handleInputHigh(e.target.value, index, "desc")}
                                                            required
                                                            type="textarea"
                                                            rows={4}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    ))}
                                </>
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
                            <Label><h5>Amenities Headings</h5></Label>
                            <Row>
                                <Col lg={6} md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="ameHead"
                                            label="Heading"
                                            placeholder="Enter heading for amenities section"
                                            value={currentData?.ameHead}
                                            type="text"
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col lg={12} md={12}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="amePara"
                                            label="Paragraph"
                                            placeholder="Enter paragraph for amenities section"
                                            value={currentData?.amePara}
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
                            <Label><h5>Map Headings</h5></Label>
                            <Row>
                                <Col lg={6} md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="mapHead"
                                            label="Heading"
                                            placeholder="Enter heading for Map section"
                                            value={currentData?.mapHead}
                                            type="text"
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col lg={12} md={12}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="mapPara"
                                            label="Paragraph"
                                            placeholder="Enter paragraph for Map section"
                                            value={currentData?.mapPara}
                                            type="textarea"
                                            required
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className='divider' />
                            <Label><h5>NearBy Properties Headings</h5></Label>
                            <Row>
                                <Col lg={6} md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="proHead"
                                            label="Heading"
                                            placeholder="Enter heading for suggested properties section"
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
                                            placeholder="Enter paragraph for suggested properties section"
                                            value={currentData?.proPara}
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
                            {/* <Label>SEO Meta Data</Label> */}
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
                            <Row className='mt-5'>
                                <Col md={6}>
                                    <Button type="reset" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Cancel</Button>
                                </Col>
                                <Col md={6}>
                                    <Button type="submit" className="btn-sign">{currentData?._id ? 'Update Property' : 'Add Property'}</Button>
                                </Col>
                            </Row>
                        </AvForm>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment >
    )
}

export default AddService;