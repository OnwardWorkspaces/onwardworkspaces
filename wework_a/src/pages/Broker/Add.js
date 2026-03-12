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

function AddOffice(props) {
    const { setIsAdd, user, currentData, loading, setLoading, getData } = props;
    const [cropperModal, setCropperModal] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [clientale, setClientale] = useState([]);
    const [selectedClientale, setSelectedClientale] = useState([]);
    const [cats, setCats] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("image");
    const [image, setImage] = useState(null);
    const [isGallery, setIsGallery] = useState(false);
    const [isFAQ, setIsFAQ] = useState(false);
    const [FAQ, setFAQ] = useState([]);
    const imagePickerRef = useRef();
    const cropperRef = useRef();

    useEffect(() => {
        if (user?.token)
            getCats();
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
        }
    }, [currentData]);

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
        get("category/list", { token: user?.token })
            .then(res => {
                setLoading(false);
                if (res?.statusCode == 200) {
                    setCats(res?.data);
                }
            })
            .catch(err => {
                setLoading(false);
                toast.error("Something Went Wrong!");
            })
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
            setLoading(true);
            let body = {
                ...v,
                image,
                FAQ: FAQ,
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
                const uploadRes = await upload("office/image_upload", form);
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
                    const uploadRes = await upload("office/image_upload", form);
                    if (uploadRes?.statusCode == 200)
                        galleryTemp.push(uploadRes.data);
                } else {
                    galleryTemp.push(item);
                }
            }));
            body = { ...body, gallery: galleryTemp };
            if (currentData?._id) {
                body = { ...body, officeId: currentData?._id }
                put("office", body)
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
                post("office/", body)
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

    console.log("selected client", selectedClientale);

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
                                <CardTitle className='mb-4'><b>{currentData?._id ? 'Update Office' : 'Add New Office'}</b></CardTitle>
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
                                        <div className='img-banner'>
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
                                    <div className='mb-4'>
                                        <AvField
                                            name="catId"
                                            label="Category"
                                            value={currentData?.catId}
                                            type="select"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {cats?.map((item) => (
                                                <option value={item?._id}>{item?.title}</option>
                                            ))}
                                        </AvField>
                                    </div>
                                    <div className='mb-4'>
                                        <AvField
                                            name="title"
                                            label="Title"
                                            placeholder="Enter office title"
                                            value={currentData?.title}
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <AvField
                                            name="desc"
                                            label="Description"
                                            placeholder="Enter office description"
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
                                        <div className='img-place-banner'>
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
                            <Label>Meta Data</Label>
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

export default AddOffice;