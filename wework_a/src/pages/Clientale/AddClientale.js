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

function AddClientale(props) {
    const { setIsAdd, user, currentData, loading, setLoading, getData } = props;
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("banner");
    const [banner, setBanner] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [cropperModal, setCropperModal] = useState(false);
    const [highLight, setHighLight] = useState([]);
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [isHighLight, setIsHighLight] = useState(false);
    const [isOnward, setIsOnward] = useState(false);
    const [why, setWhy] = useState(false);

    useEffect(() => {
        if (currentData) {
            setBanner(currentData?.image);
        }
    }, [currentData]);

    const handleValidSubmit = async (e, v) => {
        if (!loading) {
            if (!banner) {
                toast.error("Please select a Image!");
                return;
            }
            setLoading(true);
            let body = {
                ...v,
                token: user?.token
            }
            if (banner?.substring(0, 4) == 'data') {
                const obj = await urltoFile(banner, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("clientale/image_upload", form);
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
            //         const uploadRes = await upload("clientale/image_upload", form);
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
            //         const uploadRes = await upload("clientale/image_upload", form);
            //         if (uploadRes?.statusCode == 200)
            //             galleryTemp.push(uploadRes.data);
            //     } else {
            //         galleryTemp.push(item);
            //     }
            // }));
            // body = { ...body, gallery: galleryTemp };
            if (currentData?._id) {
                body = { ...body, clientId: currentData?._id }
                put("clientale", body)
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
                post("clientale", body)
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

    const handleisOnward = () => {
        if (isOnward) {
            setIsOnward(false);
        } else {
            setWhy(currentData?.why?.length ? currentData?.why : [{}]);
            setIsOnward(true);
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

    return (
        <React.Fragment>
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
                                    style={{ height: 200,}}
                                    aspectRatio={1 / 1}
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
                            <CardTitle className='mb-4'><b>{currentData?._id ? 'Update Clientale' : 'Add New Clientale'}</b></CardTitle>
                        </Col>
                        <Col>
                            <Button type="button" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Close</Button>
                        </Col>
                    </Row>
                    <AvForm onValidSubmit={handleValidSubmit}>
                        <Row>
                            <Col md={3}>
                                <Label>Image</Label>
                                {banner ?
                                    <div className='img-banner'>
                                        <img src={banner} style={{ width: '100%', height: 180 }} />
                                        <div className='btn_cross_banner'>
                                            <Button type="button" className="btn-add" onClick={() => { setBanner(null); setFile(null); }}><i className={'fa fa-close'} /></Button>
                                        </div>
                                    </div>
                                    :
                                    <div className='img-place-banner' style={{ width: '100%', height: 180 }}>
                                        <div className='action-btn'>
                                            <Button type="button" className="btn-add" onClick={() => { setFileType("banner"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                        </div>
                                    </div>
                                }
                            </Col>
                            <Col md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="title"
                                        placeholder="Enter clientale title"
                                        label="Title"
                                        value={currentData?.title}
                                        required
                                    />
                                </div>
                            </Col>
                        </Row>
                        {/* <div className='mb-4'>
                            <AvField
                                name="desc"
                                label="Description"
                                placeholder="Enter description"
                                value={currentData?.desc}
                                required
                                type="textarea"
                                rows={4}
                            />
                        </div> */}

                        {/* {isOnward &&
                            <>

                                {why?.map((item, index) => (
                                    <>
                                        <div className='divider' />
                                        <Row>
                                            <Col md={3}>
                                                <Label>Why Onward point {index + 1}</Label>
                                            </Col>
                                            <Col md={9}>
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
                        } */}
                        {/* <Label>Gallery</Label>
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
                        </Row> */}
                        {/* <Label>Meta Data</Label>
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
                        </Row> */}
                        <Row className='mt-5'>
                            <Col md={6}>
                                <Button type="reset" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Cancel</Button>
                            </Col>
                            <Col md={6}>
                                <Button type="submit" className="btn-sign">{currentData?._id ? 'Update Clientale' : 'Add Clientale'}</Button>
                            </Col>
                        </Row>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default AddClientale;