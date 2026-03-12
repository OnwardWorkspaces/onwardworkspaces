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
    const [banner, setBanner] = useState(null);
    const [cropperModal, setCropperModal] = useState(false);
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [field, setField] = useState([{}]);

    useEffect(() => {
        if (currentData) {
            setBanner(currentData?.image);
            if (currentData?.field?.length)
                setField(currentData?.field);
        }
    }, [currentData]);

    const handleValidSubmit = async (e, v) => {
        if (!loading) {
            setLoading(true);
            let body = {
                ...v,
                field,
                token: user?.token
            }
            console.log("form values", body);
            if (banner?.substring(0, 4) == 'data') {
                const obj = await urltoFile(banner, new Date().getTime() + '.webp', 'image/webp');
                const tempObj = await resizeFile(obj);
                const form = new FormData();
                form.append("image", tempObj);
                const uploadRes = await upload("form/image_upload", form);
                if (uploadRes?.statusCode == 200)
                    body = { ...body, image: uploadRes?.data };
            }
            if (currentData?._id) {
                body = { ...body, formId: currentData?._id }
                put("form", body)
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
                post("form", body)
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
        setBanner(fileData);
        setCropperModal(false);
        setLoading(false);
    }

    const handleInputfield = (val, i, to) => {
        let temp = Object.assign([], field);
        temp[i][to] = val;
        setField(temp);
    }

    const handleAddfield = () => {
        let temp = Object.assign([], field);
        temp.push({});
        setField(temp);
    }

    const handleRemovefield = (i) => {
        let temp = Object.assign([], field);
        temp.splice(i, 1);
        console.log('slice', temp);
        setField(temp);
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
                                    style={{ height: 200, }}
                                    aspectRatio={29 / 21}
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
                            <CardTitle className='mb-4'><b>{currentData?._id ? 'Update Form' : 'Add New Form'}</b></CardTitle>
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
                                            <Button type="button" className="btn-add" onClick={() => { imagePickerRef.current.click(); }}><i className={'ri-image-fill'} /></Button>
                                        </div>
                                    </div>
                                }
                            </Col>
                            <Col md={9}>
                                <div className='mb-4 mt-5'>
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
                                        name="heading"
                                        placeholder="Enter Form heading"
                                        label="Heading"
                                        value={currentData?.heading}
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <AvField
                                        name="desc"
                                        placeholder="Enter description"
                                        label="Description"
                                        value={currentData?.desc}
                                    />
                                </div>
                            </Col>
                        </Row>
                        {field?.map((item, index) => (
                            <>
                                <div className='divider' />
                                <Row>
                                    <Col md={3}>
                                        <Label>Field {index + 1}</Label>
                                    </Col>
                                    <Col md={9}>
                                        {field?.length > 1 &&
                                            <Button type="button" className="btn-add" onClick={() => handleRemovefield(index)} style={{ float: 'right' }}><i className={'fa fa-trash'} /></Button>
                                        }
                                    </Col>
                                    <Col md={6}>
                                        <div className='mb-4'>
                                            <AvField
                                                name={"hLabel" + index}
                                                placeholder="Enter Label"
                                                label="Label"
                                                value={item?.title}
                                                onChange={(e) => handleInputfield(e.target.value, index, "title")}
                                                required
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className='mb-4'>
                                            <AvField
                                                name={"hType" + index}
                                                label="Type"
                                                value={item?.type}
                                                onChange={(e) => handleInputfield(e.target.value, index, "type")}
                                                required
                                                type="select"
                                            >
                                                <option value="">Select Type</option>
                                                <option value="text">Text</option>
                                                <option value="number">Number</option>
                                                <option value="email">Email</option>
                                                <option value="date">Date</option>
                                                <option value="textarea">Text Area</option>
                                            </AvField>
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        {index == field?.length - 1 &&
                                            <Button type="button" className="btn-add mx-2" onClick={handleAddfield} style={{ float: 'right' }}><i className={'fa fa-add'} /></Button>
                                        }
                                    </Col>
                                </Row>
                            </>
                        ))}
                        <Row className='mt-5'>
                            <Col md={6}>
                                <Button type="reset" onClick={() => setIsAdd(false)} className="btn-sign" style={{ float: 'right' }}>Cancel</Button>
                            </Col>
                            <Col md={6}>
                                <Button type="submit" className="btn-sign">{currentData?._id ? 'Update Form' : 'Add Form'}</Button>
                            </Col>
                        </Row>
                    </AvForm>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default AddClientale;