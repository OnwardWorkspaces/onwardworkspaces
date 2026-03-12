import React, { useEffect, useState, useRef } from "react";
// import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalBody, Label } from "reactstrap"
// import "./datatables.scss";
// import '../Icons/IconFontawesome';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AvField, AvForm, AvRadio, AvRadioGroup, AvGroup, AvInput } from "availity-reactstrap-validation";
import { toast } from 'react-toastify';
import * as Utils from "../../Utils";
import { post, get, put, upload } from "../../helper/api_helper";
import DeleteModal from './DeleteModal';
import DataTable from 'react-data-table-component';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Resizer from "react-image-file-resizer";
// import SearchableDropdown from "../Ui/UiSearchableDropdown";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useSelector } from "react-redux";

import './style.scss';

const AddBlog = (props) => {
    const location = useLocation();
    console.log("props o add case", location);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [currentModalData, setCurrentModalData] = useState(null);
    const [isAddForm, setIsAddForm] = useState(false);
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const cropper = useRef();
    const cropper2 = useRef();
    const [descContent, setDescContent] = useState(null);
    const [desc, setDesc] = useState("");
    const [canAdd, setCanAdd] = useState(false);
    const [canUpdate, setCanUpdate] = useState(false);
    const [canDelete, setCanDelete] = useState(false);

    useEffect(() => {
        if (user?.role == 'Sub') {
            if (user?.permissions[8][Object.keys(user?.permissions[8])[0]].write)
                setCanAdd(true);
            if (user?.permissions[8][Object.keys(user?.permissions[8])[0]].update)
                setCanUpdate(true);
            if (user?.permissions[8][Object.keys(user?.permissions[8])[0]].delete)
                setCanDelete(true);
        } else if (user?.role == 'Admin') {
            setCanAdd(true);
            setCanUpdate(true);
            setCanDelete(true);
        }
    }, [user]);

    useEffect(() => {
        if (location?.state) {
            let proj = location?.state;
            setFile(proj?.image);
            setFile2(proj?.banner);
            if (proj?.desc) {
                const contentBlock = htmlToDraft(proj?.desc);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    setDescContent(editorState);
                    setDesc(proj?.desc);
                }
            }
            if (proj)
                setCurrentModalData(proj);
        }
    }, [location.state]);


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

    const handleValidSubmit = async (e, values, type) => {
        console.log('values', values, file);
        if (currentModalData) {
            setLoading(true);
            let body = {
                ...values,
                caseId: currentModalData?._id,
                desc: desc,
                token: user?.token
            }
            // if (imageChanged) {
            try {
                const fileData = cropper?.current?.cropper?.getCroppedCanvas().toDataURL();
                if (fileData) {
                    const fileObj = await urltoFile(fileData, (new Date().getTime() + 300) + '.webp', 'image/webp')
                    const image2 = await resizeFile(fileObj);
                    const form2 = new FormData();
                    form2.append("image", image2);
                    const uploadedBanner = await upload("case/image_upload", form2)
                    if (uploadedBanner?.statusCode == 200)
                        body.image = uploadedBanner?.data;
                }
                const fileData2 = cropper2?.current?.cropper?.getCroppedCanvas().toDataURL();
                if (fileData2) {
                    const fileObj2 = await urltoFile(fileData2, (new Date().getTime() + 600) + '.webp', 'image/webp')
                    const image3 = await resizeFile(fileObj2);
                    const form3 = new FormData();
                    form3.append("image", image3);
                    const uploadedBanner2 = await upload("case/image_upload", form3)
                    console.log('response from image upload', uploadedBanner2);
                    if (uploadedBanner2?.statusCode == 200)
                        body.banner = uploadedBanner2?.data;
                }
            } catch (error) {
                console.log('error while uploading image', error);
            }
            put("case/update", body)
                .then(json => {
                    console.log('response from add month', json);
                    setLoading(false);
                    if (json.statusCode == 200) {
                        toast.success(json?.message);
                        setFile(null);
                        setFile2(null);
                        // setImageChanged(false);
                        setIsAddForm(false);
                        setCurrentModalData(null);
                        navigate("/case-study");
                    } else {
                        toast.error(json?.error);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    console.log('error while uploading image', error);
                    toast.error(error);
                });
        } else {
            setLoading(true);
            const body = {
                ...values,
                desc: desc,
                token: user?.token
            }
            try {
                const fileData = cropper?.current?.cropper?.getCroppedCanvas().toDataURL();
                const fileObj = await urltoFile(fileData, (new Date().getTime() + 300) + '.png', 'image/png')
                const image2 = await resizeFile(fileObj);
                const form2 = new FormData();
                form2.append("image", image2);
                const uploadedBanner = await upload("case/image_upload", form2)
                console.log('response from image upload', uploadedBanner);
                if (uploadedBanner?.statusCode == 200)
                    body.image = uploadedBanner?.data;
                const fileData2 = cropper2?.current?.cropper?.getCroppedCanvas().toDataURL();
                const fileObj2 = await urltoFile(fileData2, (new Date().getTime() + 600) + '.png', 'image/png')
                const image3 = await resizeFile(fileObj2);
                const form3 = new FormData();
                form3.append("image", image3);
                const uploadedBanner2 = await upload("case/image_upload", form3)
                console.log('response from banner upload', uploadedBanner2);
                if (uploadedBanner2?.statusCode == 200)
                    body.banner = uploadedBanner2?.data;
            } catch (error) {
                console.log('error while uploading image', error);
            }
            post("case/add", body)
                .then(json => {
                    console.log('response from add blog', json);
                    setLoading(false);
                    if (json.statusCode == 200) {
                        toast.success(json?.message);
                        setFile(null);
                        // setImageChanged(false);
                        setIsAddForm(false);
                        navigate("/case-study");
                    } else {
                        toast.error(json?.error);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    console.log('error while uploading image', error);
                    toast.error(error);
                })
        }
    }

    const onChangeFile = (e, to) => {
        console.log('getting event on input img', e.target.files[0]);
        if (to == 'image')
            setFile(URL.createObjectURL(e.target.files[0]));
        else
            setFile2(URL.createObjectURL(e.target.files[0]));
    }

    const onEditorStateChange = (editorState) => {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setDesc(html);
        setDescContent(editorState);
    }

    const openBlog = (item) => {
        if (item?._id)
            return "blog/" + compressId(item?._id) + "/" + parseName(item?.titleShort);
    }

    const compressId = (id) => {
        const temp = id.slice(id.length - 4, id.length);
        // console.log('compressing id', temp);
        return temp;
    }

    const parseName = (str) => {
        if (str) {
            let temp = str.split(",").join("");
            return temp.split(" ").join("-").toLowerCase();
        } else
            return "";
    }

    return (
        <React.Fragment>
            <Header />
            <div className="main main-app p-3 p-lg-4">
                <Row>
                    <Col className="col-12">
                        <h5 className="text-black font-size-20">{currentModalData ? 'Update Case!' : 'Add New Case!'}</h5>
                        <button
                            className="btn btn-primary waves-effect waves-light"
                            style={{ backgroundColor: Utils.themeColor, position: 'absolute', right: 10, top: 10 }}
                            onClick={() => { setIsAddForm(false); setFile(null) }}
                            type="reset"
                        >
                            Close
                        </button>
                        <div className="p-2">
                            <AvForm
                                className="form-horizontal"
                                onValidSubmit={(e, v) => {
                                    handleValidSubmit(e, v, 'bank')
                                }}
                            >
                                <Row>
                                    <Col md={5}>
                                        <div className="mb-3 mt-2">
                                            {file ?
                                                <>
                                                    <CardTitle >Image</CardTitle>
                                                    <div style={{ flexDirection: 'row', position: 'relative', cursor: 'pointer', marginTop: 20, width: 400 }}>
                                                        {currentModalData?.image ?
                                                            <img src={file} style={{ width: 400, height: 'auto' }} />
                                                            :
                                                            <Cropper
                                                                style={{ height: 'auto', width: 400 }}
                                                                aspectRatio={106 / 61}
                                                                preview=".img-preview"
                                                                guides={true}
                                                                src={file}
                                                                ref={cropper}
                                                            />
                                                        }
                                                        <i className="fa fa-close" style={{
                                                            color: 'white', backgroundColor: Utils.themeColor, fontSize: 20,
                                                            position: 'absolute', top: -16, right: -15,
                                                            borderRadius: 15, width: 30, height: 30, textAlign: 'center',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                        }}
                                                            onClick={() => { setFile(null); if (currentModalData) setCurrentModalData({ ...currentModalData, image: undefined }) }}
                                                        />
                                                    </div>
                                                </>
                                                :
                                                <AvField
                                                    name="fileInput"
                                                    label="Image"
                                                    className="form-control"
                                                    placeholder="upload list image"
                                                    type="file"
                                                    onChange={e => onChangeFile(e, 'image')}
                                                    required
                                                    multiple={false}
                                                    accept="image/*"
                                                // value={currentModalData?.logo}
                                                />
                                            }
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-3 mt-2">
                                            {file2 ?
                                                <>
                                                    <CardTitle >Banner</CardTitle>
                                                    <div style={{ flexDirection: 'row', position: 'relative', cursor: 'pointer', marginTop: 20, width: 600 }}>
                                                        {currentModalData?.banner ?
                                                            <img src={file2} style={{ width: 600, height: 'auto' }} />
                                                            :
                                                            <Cropper
                                                                style={{ height: 'auto', width: 400 }}
                                                                aspectRatio={1780 / 549}
                                                                preview=".img-preview"
                                                                guides={true}
                                                                src={file2}
                                                                ref={cropper2}
                                                            />
                                                        }
                                                        <i className="fa fa-close" style={{
                                                            color: 'white', backgroundColor: Utils.themeColor, fontSize: 20,
                                                            position: 'absolute', top: -16, right: -15,
                                                            borderRadius: 15, width: 30, height: 30, textAlign: 'center',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                        }}
                                                            onClick={() => { setFile2(null); if (currentModalData) setCurrentModalData({ ...currentModalData, banner: undefined }) }}
                                                        />
                                                    </div>
                                                </>
                                                :
                                                <AvField
                                                    name="fileInput2"
                                                    label="Banner"
                                                    className="form-control"
                                                    placeholder="upload banner"
                                                    type="file"
                                                    onChange={e => onChangeFile(e, 'banner')}
                                                    required
                                                    multiple={false}
                                                    accept="image/*"
                                                // value={currentModalData?.logo}
                                                />
                                            }
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="mb-3">
                                            <AvField
                                                name="titleShort"
                                                label="Title Short"
                                                className="form-control"
                                                placeholder="Enter title"
                                                type="text"
                                                required
                                                value={currentModalData?.titleShort}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <div className="mb-3">
                                            <AvField
                                                name="title"
                                                label="Title"
                                                className="form-control"
                                                placeholder="Enter Title"
                                                type="text"
                                                required
                                                value={currentModalData?.title}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12} md={12}>
                                        <div className="mb-3">
                                            <Editor
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={(e) => onEditorStateChange(e)}
                                                editorState={descContent}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12} md={12}>
                                        <div className="mt-4">
                                            <Row>
                                                <Col md={6}>
                                                    <button
                                                        className="btn btn-primary w-100 waves-effect waves-light"
                                                        style={{ backgroundColor: Utils.themeColor }}
                                                        onClick={() => { setFile(null); navigate("/case-study") }}
                                                        type="reset"
                                                    >
                                                        Cancel
                                                    </button>
                                                </Col>
                                                <Col md={6}>
                                                    <button
                                                        className="btn btn-primary w-100 waves-effect waves-light"
                                                        type="submit"
                                                        style={{ backgroundColor: Utils.themeColor }}
                                                    >
                                                        {currentModalData ? 'Update' : 'Add'}
                                                    </button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </AvForm>
                        </div>

                    </Col>
                </Row>
                <Footer />
            </div>

        </React.Fragment >
    )
}

export default AddBlog;
