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
    const [fileType, setFileType] = useState("image");
    const [gallery, setGallery] = useState([]);
    const [cropperModal, setCropperModal] = useState(false);
    const [highLight, setHighLight] = useState([]);
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [isHighLight, setIsHighLight] = useState(false);
    const [isActive, setisActive] = useState(true);
    const [isOnward, setIsOnward] = useState(false);
    const [why, setWhy] = useState([]);
    const [forms, setForms] = useState([]);

    const [image, setImage] = useState(null);



    useEffect(() => {
        if (currentData) {
            setImage(currentData?.image);
            setGallery(currentData?.gallery);
            setisActive(currentData?.isActive)

            console.log("new Data");
            console.log(currentData);
            console.log(isActive);


        } else {
            setisActive(true);
            console.log("no data");
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
                if (!image) {
                    toast.error("Please select a Image!");
                    return;
                }
            setLoading(true);
            let body = {
                ...v,
                isActive,
                token: user?.token
            }
            if (image?.substring(0, 4) == 'data') {
                const obj = await urltoFile(image, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("category/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    body = { ...body, image: uploadRes?.data };
            }

            if (currentData?._id) {
                body = { ...body, galleryId: currentData?._id }
                put("image-gallery", body)
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
                post("image-gallery", body)
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
                600,
                738,
                "webp",
                70,
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
        if (fileType == "image")
            setImage(fileData);

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

        console.log("cropImage");
        console.log(fileData);
    }

    const handleisOnward = () => {
        if (isOnward) {
            setIsOnward(false);
        } else {
            setWhy(currentData?.why?.length ? currentData?.why : [{}]);
            setIsOnward(true);
        }
    }

    const handleisisActive = () => {
        if (isActive) {
            setisActive(false);
        } else {
            setisActive(true);
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

    // console.log('isActive',isActive,currentData?.isActive)

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
                                    aspectRatio={600 / 738}
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
                            <CardTitle className='mb-4'><b>{currentData?._id ? 'Update Gallery' : 'Add New Gallery'}</b></CardTitle>
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
                                    <div className='img-place-banner' style={{ marginTop: 0 }}>
                                        <div className='action-btn'>
                                            <Button type="button" className="btn-add" onClick={() => { setFileType("image"); imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>

                                        </div>
                                    </div>
                                }
                            </Col>

                            <Col md={8}>
                                <Row>


                                    <Col md={4}>
                                        <div className='mb-4'>
                                            <AvField
                                                name="imageTitle"
                                                placeholder="Enter Gallery title"
                                                label="Image Title"
                                                value={currentData?.imageTitle}
                                                required
                                            />
                                        </div>
                                    </Col>

                                    <Col md={4}>
                                        <div className='mb-4'>
                                            <AvField
                                                name="altText"
                                                label="Alt Text"
                                                placeholder="altText"
                                                value={currentData?.altText}
                                                required
                                            />
                                        </div>
                                    </Col>



                                    <Col md={4}>
                                        <div className='mb-4'>
                                            <AvField
                                                name="galleryCategory"
                                                label="Gallery Category"
                                                value={currentData?.galleryCategory}
                                                type="select"
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value='HOME_PAGE'>HOME_PAGE</option>

                                            </AvField>
                                        </div>
                                    </Col>

                                </Row>

                              {!currentData && (

                                    <Row>

                                        <div className='mb-0 d-flex'>
                                            <AvField
                                                name="isActive"
                                                id="isActive"
                                                type="checkbox"
                                                label="isActive"
                                                defaultChecked={isActive}
                                                onChange={(e) => setisActive(e.target.checked)}
                                            />
                                            <Label for='isActive' className='mx-2' style={{ userSelect: 'none' }}>Is Active</Label>
                                        </div>

                                    


                                    </Row>

                               )}
                                

                            </Col>


                        </Row>

                        <Row className='mt-5'>
                            <Col md={6}>
                                <Button type="reset" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Cancel</Button>
                            </Col>
                            <Col md={6}>
                                <Button type="submit" className="btn-sign">{currentData?._id ? 'Update Category' : 'Add Gallery'}</Button>
                            </Col>
                        </Row>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default AddService;