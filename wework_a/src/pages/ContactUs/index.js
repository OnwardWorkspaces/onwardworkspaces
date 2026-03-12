import React, { useEffect, useRef, useState } from 'react';
import Header from '../../layouts/Header'
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col, Modal, ModalBody, Table, Label } from 'reactstrap'
import { Button } from 'react-bootstrap';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { del, get, post, put, upload } from '../../helper/api_helper';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import ConfirmModal from '../../components/ConfirmModal';
import Footer from '../../layouts/Footer';
import moment from 'moment';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as Utils from "../../Utils";
import Resizer from "react-image-file-resizer";

export default function Lead() {

    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [seo, setSeo] = useState("");
    const [columns, setColumns] = useState([]);
    const [currentData, setCurrentData] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [FAQ, setFAQ] = useState([{}]);
    const [cropperModal, setCropperModal] = useState(false);
    const imagePickerRef = useRef();
    const cropperRef = useRef();
    const [forms, setForms] = useState([]);


    useEffect(() => {
        if (user?.token) {
            getData();
            getForms();
        }
    }, [user]);

    useEffect(() => {
        setColumns([
            {
                name: 'Name',
                cell: row => <span title={row?.name}>{row?.name}</span>,
                selector: row => row?.name,
                sortable: true,
                maxWidth: '130px'
            },
            {
                name: 'Email',
                cell: row => <span title={row?.email}>{row?.email}</span>,
                selector: row => row?.email,
                sortable: true,
                maxWidth: '220px'
            },
            {
                name: 'Mobile',
                cell: row => <span title={row?.mobile}>{row?.mobile}</span>,
                selector: row => row?.mobile,
                sortable: true,
                maxWidth: '110px'
            },
            {
                name: 'City',
                cell: row => <span title={row?.city}>{row?.city}</span>,
                selector: row => row?.city,
                sortable: true,
                maxWidth: '100px'
            },
            {
                name: 'Location',
                cell: row => <span title={row?.location}>{row?.location}</span>,
                selector: row => row?.location,
                sortable: true,
                maxWidth: '120px'
            },
            {
                name: 'Area',
                cell: row => <span title={row?.area}>{row?.area}</span>,
                selector: row => row?.area,
                sortable: true,
                maxWidth: '100px'
            },
            {
                name: 'Message',
                cell: row => <span title={row?.message}>{row?.message}</span>,
                selector: row => row?.message,
                sortable: true
            },
            {
                name: 'Created At',
                selector: row => moment(row?.createdAt).format("DD-MMM-YYYY hh:mm a"),
                maxWidth: '180px',
                sortable: true
            },
            {
                cell: (row) => <>
                    <Button onClick={() => handleDeleteProj(row)}
                        title={"Delete"}
                        style={{ marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8, border: 'none' }}><span className="ri-delete-bin-6-line" style={{ fontSize: 20 }}></span></Button>
                </>,
                name: 'Action',
                ignoreRowClick: true,
                maxWidth: '100px'
            },
        ])
    }, [data]);

    const getData = () => {
        if (!loading) {
            setLoading(true);
            get("contact/admin", { token: user?.token })
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setData(res?.data);
                        if (res?.data?.seo)
                            setSeo(res?.data?.seo);
                        if (res?.data?.FAQ?.length)
                            setFAQ(res?.data?.FAQ);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    toast.error("Something Went Wrong!");
                })
        }
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

    const handleUpdateStatus = (row) => {
        setCurrentData({ ...row, actionType: "Status" });
        setConfirm(true);
    }

    const handleDeleteProj = (row) => {
        setCurrentData({ ...row, actionType: "Delete" });
        setConfirm(true);
    }

    const onConfirm = () => {
        if (!loading) {
            setLoading(true);
            let body = {
                brokerId: currentData?._id,
                token: user?.token
            }
            if (currentData?.actionType == 'Status') {
                body = { ...body, isActive: !currentData?.isActive }
                put("broker", body)
                    .then(res => {
                        setLoading(false);
                        if (res?.statusCode == 200) {
                            setConfirm(false);
                            getData()
                        } else
                            toast.error("" + res?.error);
                    })
                    .catch(err => {
                        setLoading(false);
                        console.error("error while updating data", err);
                        toast.error("Something Went Wrong!");
                    })
            }
            if (currentData?.actionType == 'Delete') {
                del("broker", body)
                    .then(res => {
                        setLoading(false);
                        if (res?.statusCode == 200) {
                            setConfirm(false);
                            getData()
                        } else
                            toast.error("" + res?.error);
                    })
                    .catch(err => {
                        setLoading(false);
                        console.error("error while updating data", err);
                        toast.error("Something Went Wrong!");
                    })
            }
        }
    }

    const handleImgChange = (file) => {
        if (file) {
            setFile(URL.createObjectURL(file));
            setCropperModal(true);
        }
    }

    const cropImage = async () => {
        setLoading(true);
        const fileData = cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL();
        setImage(fileData);
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

    const handleSeoSubmit = async (e, v) => {
        if (!loading) {
            setLoading(true);
            let body = {
                ...v,
                FAQ,
                token: user?.token
            }
            post("contact", body)
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        toast.success(res?.message);
                        setSeo(res?.data?.seo);
                        setCropperModal(false);
                    } else {
                        toast.error(res?.error);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    toast.error("Something Went Wrong!");
                    console.log("Error while updating broker form image", err);
                })
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


    // console.log("image", image);

    return (
        <React.Fragment>
            <Header />
            <ConfirmModal
                show={confirm}
                onConfirm={onConfirm}
                onCloseClick={() => setConfirm(false)}
                data={currentData}
            />
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
                <Card className='px-4'>
                    <h5 className='mt-4 mb-4'>Contact Us</h5>
                    <AvForm onValidSubmit={handleSeoSubmit}>
                        <Row>
                            <Col md={6}>
                                <div className='mb-4'>
                                    <AvField
                                        name="formId"
                                        label="Form"
                                        value={data?.formId}
                                        type="select"
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
                                        value={seo ? seo : Utils.dummySeo}
                                        type="textarea"
                                        rows={8}
                                    />
                                </div>
                            </Col>
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
                            <Col md={12} className='mb-4'>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <button type="submit" className='button_2 btn-primary'>Submit</button>
                                </div>
                            </Col>
                        </Row>
                    </AvForm>
                    {/* <Row className='mb-4'>
                        <Col md={11}>
                            <CardBody>
                                <CardTitle><b>Contact Us</b></CardTitle>
                                <CardSubtitle>Who have submitted the contact us from.</CardSubtitle>
                            </CardBody>
                        </Col>
                    </Row>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        conditionalRowStyles={[{
                            when: row => row?.style,
                            style: row => ({ width: row?.style?.width }),
                        },
                        ]}
                        customStyles={{
                            headCells: {
                                style: {
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                    width: 0
                                },
                            },
                            cells: {
                                style: {
                                    width: 0
                                }
                            }
                        }}
                    /> */}
                </Card>
                <Footer />
            </div >
        </React.Fragment >
    )
}
