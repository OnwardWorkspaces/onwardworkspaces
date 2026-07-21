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
    const [isFAQ, setIsFAQ] = useState(false);
    const [FAQ, setFAQ] = useState(false);

    useEffect(() => {
        if (currentData) {
            setBanner(currentData?.image);
            setGallery(currentData?.gallery);
            if (currentData?.isHighLight) {
                setIsHighLight(true);
                setHighLight(currentData?.highlight);
            }
            if (currentData?.isFAQ) {
                setIsFAQ(true);
                setFAQ(currentData?.FAQ);
            }
        }
    }, [currentData]);

    const handleValidSubmit = async (e, v) => {
        if (!loading) {
            if (!banner) {
                toast.error("Please select a Image!");
                return;
            }
            let err = -1;
            err = highLight.findIndex(x => !x.hasOwnProperty('image') || x?.image == undefined || x?.image == null || x?.image == "");
            if (err != -1) {
                toast.error(`Please select highlight step ${err + 1} Image!`);
                return;
            }
            setLoading(true);
            let body = {
                ...v,
                isHighLight,
                isFAQ,
                FAQ,
                highlight: [],
                token: user?.token
            }
            if (banner?.substring(0, 4) == 'data') {
                const obj = await urltoFile(banner, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("workspace/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    body = { ...body, image: uploadRes?.data };
            }
            await Promise.all(highLight.map(async (item) => {
                let highObj = item;
                if (item?.image.substring(0, 4) == 'data') {
                    const obj = await urltoFile(item.image, new Date().getTime() + '.webp', 'image/webp');
                    const tempObj = await resizeFile(obj);
                    const form = new FormData();
                    form.append("image", tempObj);
                    const uploadRes = await upload("workspace/image_upload", form);
                    if (uploadRes?.statusCode == 200)
                        highObj = { ...highObj, image: uploadRes?.data };
                }
                body.highlight.push(highObj);
            }));
            let galleryTemp = [];
            await Promise.all(gallery.map(async (item) => {
                if (item?.substring(0, 4) == 'data') {
                    const obj = await urltoFile(item, new Date().getTime() + '.webp', 'image/webp');
                    const tempObj = await resizeFile(obj);
                    const form = new FormData();
                    form.append("image", tempObj);
                    const uploadRes = await upload("workspace/image_upload", form);
                    if (uploadRes?.statusCode == 200)
                        galleryTemp.push(uploadRes.data);
                } else {
                    galleryTemp.push(item);
                }
            }));
            body = { ...body, gallery: galleryTemp };
            if (currentData?._id) {
                body = { ...body, serviceId: currentData?._id }
                put("workspace", body)
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
                post("workspace", body)
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

    const handleAddHigh = () => {
        let temp = Object.assign([], highLight);
        temp.push({});
        setHighLight(temp);
    }

    const handleRemoveHigh = (i) => {
        let temp = Object.assign([], highLight);
        temp.splice(i, 1);
        console.log('slice', temp);
        setHighLight(temp);
    }

    const handleRemoveImage = (i) => {
        let temp = Object.assign([], highLight);
        temp[i].image = undefined;
        setHighLight(temp);
    }

    const handleRemoveGallery = (i) => {
        let temp = Object.assign([], gallery);
        temp.splice(i, 1);
        setGallery(temp);
    }

    const handleInputHigh = (val, i, to) => {
        let temp = Object.assign([], highLight);
        temp[i][to] = val;
        setHighLight(temp);
    }

    const handleIsHighLight = () => {
        if (isHighLight) {
            setIsHighLight(false);
        } else {
            setHighLight(currentData?.highlight?.length ? currentData?.highlight : [{}]);
            setIsHighLight(true);
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
                                <CardTitle className='mb-4'><b>{currentData?._id ? 'Update Service' : 'Add New Service'}</b></CardTitle>
                            </Col>
                            <Col>
                                <Button type="button" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Close</Button>
                            </Col>
                        </Row>
                        <AvForm onValidSubmit={handleValidSubmit}>
                            <div className='mb-4'>
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
                            </div>
                            <Row>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="title"
                                            placeholder="Enter service title"
                                            label="Title"
                                            value={currentData?.title}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='mb-4'>
                                        <AvField
                                            name="catId"
                                            label="Category"
                                            value={currentData?.catId}
                                            required
                                            type="select"
                                        >
                                            <option value={""}>Select Category</option>
                                            {cats?.map((item) => (
                                                <option value={item?._id}>{item?.title}</option>
                                            ))}
                                        </AvField>
                                    </div>
                                </Col>
                            </Row>
                            <div className='mb-4'>
                                <AvField
                                    name="desc"
                                    label="Description"
                                    placeholder="Enter description"
                                    value={currentData?.desc}
                                    required
                                    type="textarea"
                                    rows={4}
                                />
                            </div>
                            <div className='mb-4 d-flex'>
                                <AvField
                                    name="isHighLight"
                                    type="checkbox"
                                    label="Highlights"
                                    checked={isHighLight}
                                    onChange={handleIsHighLight}
                                />
                                <Label className='mx-2'>Highlights</Label>
                            </div>
                            {isHighLight &&
                                <>
                                    {highLight?.map((item, index) => (
                                        <>
                                            <div className='divider' />
                                            <Row>
                                                <Col md={3}>
                                                    <Label>Highlight {index + 1}</Label>
                                                </Col>
                                                <Col md={9}>
                                                    {index == highLight?.length - 1 &&
                                                        <Button type="button" className="btn-add mx-2" onClick={handleAddHigh} style={{ float: 'right' }}><i className={'fa fa-add'} /></Button>
                                                    }
                                                    {highLight?.length > 1 &&
                                                        <Button type="button" className="btn-add" onClick={() => handleRemoveHigh(index)} style={{ float: 'right' }}><i className={'fa fa-trash'} /></Button>
                                                    }
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    {item?.image ?
                                                        <div className='img-banner'>
                                                            <img src={item?.image} style={{ width: '100%', height: '100%' }} />
                                                            <div className='btn_cross_banner'>
                                                                <Button type="button" className="btn-add" onClick={() => handleRemoveImage(index)}><i className={'fa fa-close'} /></Button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='img-place-banner'>
                                                            <div className='action-btn'>
                                                                <Button type="button" className="btn-add" onClick={() => { setFileType(index); imagePickerRef.current.click() }}><i className={'ri-image-fill'} /></Button>
                                                            </div>
                                                        </div>
                                                    }
                                                </Col>
                                                <Col md={8}>
                                                    <div className='mb-4'>
                                                        <AvField
                                                            name={"hTitle" + index}
                                                            placeholder="Enter hightlight title"
                                                            label="Title"
                                                            value={item?.title}
                                                            onChange={(e) => handleInputHigh(e.target.value, index, "title")}
                                                            required
                                                        />
                                                    </div>
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
                            <div className='mb-4 d-flex'>
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
                                            <div className='divider' />
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
                            <Label>Gallery</Label>
                            <div className='divider' />
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
                                            <Button type="button" className="btn-add" onClick={() => { setFileType("Gallery"); imagePickerRef.current.click() }}><i className={'ri-image-fill'} /></Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Label>Meta Data</Label>
                            <div className='divider' />
                            <Row>
                                <Col md={4}>
                                    <div className='mb-4'>
                                        <AvField
                                            name={"metaTitle"}
                                            placeholder="Enter meta title"
                                            label="Title"
                                            value={currentData?.metaTitle}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className='mb-4'>
                                        <AvField
                                            name={"metaDesc"}
                                            placeholder="Enter meta description"
                                            label="Description"
                                            type="textarea"
                                            rows={3}
                                            value={currentData?.metaDesc}
                                            required
                                        />
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className='mb-4'>
                                        <AvField
                                            name={"metaKeyword"}
                                            placeholder="Enter meta keywords"
                                            label="Keywords"
                                            type="textarea"
                                            rows={3}
                                            value={currentData?.metaKeyword}
                                            required
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='mt-5'>
                                <Col md={6}>
                                    <Button type="reset" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Cancel</Button>
                                </Col>
                                <Col md={6}>
                                    <Button type="submit" className="btn-sign">{currentData?._id ? 'Update Service' : 'Add Service'}</Button>
                                </Col>
                            </Row>
                        </AvForm>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default AddService;