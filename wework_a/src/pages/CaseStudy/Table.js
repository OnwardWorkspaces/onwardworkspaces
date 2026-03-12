import React, { useEffect, useState, useRef } from "react";
// import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalBody, Label } from "reactstrap"
// import "./datatables.scss";
// import '../Icons/IconFontawesome';
import { Link } from 'react-router-dom';
import { AvField, AvForm, AvRadio, AvRadioGroup, AvGroup, AvInput } from "availity-reactstrap-validation";
import { toast } from 'react-toastify';
import * as Utils from "../../Utils";
import { post, get, put, upload } from "../../helper/api_helper";
import DeleteModal from '../../components/ConfirmModal';
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
import { useNavigate } from "react-router-dom";
import moment from "moment";


// import './Card.scss';

const Table = (props) => {
  const { user, role, currentData, setIsTable, setSingleId, path, setLoading } = props;
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [proData, setProData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentModalData, setCurrentModalData] = useState(null);
  const [isAddForm, setIsAddForm] = useState(false);
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [selectedPros, setSelectedPros] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState([]);
  const cropper = useRef();
  const cropper2 = useRef();
  const [include, setInclude] = useState("");
  const [descContent, setDescContent] = useState(null);
  const [desc, setDesc] = useState("");
  const [selectedCat, setSelectedCat] = useState([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewData, setReviewData] = useState([{ desc: "" }, { desc: "" }, { desc: "" }, { desc: "" }, { desc: "" }]);
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
    if (user) {
      getMetas();
    }
  }, [user, path]);

  const getMetas = () => {
    get("case/list", { token: user?.token })
      .then(json => {
        console.log('response from get project list', path);
        if (json?.statusCode == 200) {
          setData(json?.data);
        } else {
          toast.error(json?.error);
        }
      })
      .catch(error => {
        console.log('error while getting project list', error);
      })
  }

  useEffect(() => {
    setColumns([
      {
        name: 'image',
        cell: (row) => <>
          <img title={'image'} src={row?.image} style={{ width: 50, height: 'auto', backgroundColor: 'white' }} />
        </>,
        maxWidth: '50px'
      },
      {
        name: 'Title',
        cell: (row) => <>
          <span style={{ cursor: 'pointer' }} onClick={() => handleUpdateEdit(row)}> {row?.titleShort}</span>
        </>
      },
      {
        name: 'Last Updated',
        selector: row => moment(row?.updatedAt).fromNow(),
        maxWidth: '150px'
      },
      // {
      //   name: 'Comments',
      //   selector: row => row?.comments?.length,
      // },
      {
        cell: (row) => <>
          <Button onClick={() => { if (user?.role == 'Admin') handleUpdateStatus(row); else toast.error("You don't have permission for this action!") }}
            title={row?.isActive ? "Inactive" : "Active"}
            style={{ backgroundColor: !row.isActive ? 'red' : 'green', marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}>
            <span className="text-white" style={{}}>
              {!row?.isActive ? 'Inactive' : 'Active'}
            </span>
          </Button>
        </>,
        name: 'Status',
        ignoreRowClick: true,
        selector: row => row?.isActive,
        sortable: true,
        maxWidth: '120px'
      },
      {
        cell: (row) => <>
          {user?.role == 'Admin' &&
            <Button
              title={"View"}
              style={{ backgroundColor: Utils.themeColor, marginRight: 5, padding: 5, paddingLeft: 8, paddingRight: 8 }}><Link target='_blank' to={{ pathname: "https://woowdestinations.com" + openBlog(row) }}><span className="ri-eye-fill" style={{ color: '#fff', fontSize: 20 }}></span></Link></Button>
          }
          {canUpdate &&
            <Button onClick={() => handleUpdateEdit(row, 'bank')}
              title={"Edit"}
              style={{ backgroundColor: Utils.themeColor, marginRight: 5, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="ri-edit-fill" style={{ fontSize: 20 }}></span></Button>
          }
          {canDelete &&
            <Button onClick={() => handleDelete(row, 'bank')}
              title={"Delete"}
              style={{ backgroundColor: Utils.themeColor, marginRight: 5, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="ri-delete-bin-6-line" style={{ fontSize: 20 }}></span></Button>
          }
          {/* {user?.role == 'Admin' &&
            <Button onClick={() => handleAddReview(row)}
              title={"Add Review"}
              style={{ backgroundColor: Utils.themeColor, marginRight: 5, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="mdi mdi-comment-account" style={{ fontSize: 20 }}></span></Button>
          } */}
        </>,
        name: 'Action',
        ignoreRowClick: true,
        maxWidth: '170px'
      },
    ])
  }, [data]);

  useEffect(() => {
    if (!isAddForm) {
      setCurrentModalData(null);
      setSelectedPros([]);
      setSelectedCat([]);
      setDesc("");
      setDescContent(null);
      setFile(null);
      setFile2(null);
    }
  }, [isAddForm])

  const handleUpdateEdit = (proj) => {
    console.log('updating proj', proj);
    navigate("/case-study/add", { state: proj })
  }

  const handleDelete = (proj, metaType) => {
    console.log('updating proj', proj);
    setCurrentModalData({ ...proj, metaType, actionType: 'Delete' });
    setDeleteModal(true);
  }

  const handleUpdateStatus = (item) => {
    console.log('updating proj', item);
    setCurrentModalData({ ...item, actionType: 'Status' });
    setDeleteModal(true);
  }

  const onDelete = () => {
    console.log('deleted', currentModalData);
    let body = {
      caseId: currentModalData?._id,
      token: user?.token
    }
    post(`case/delete`, body)
      .then(json => {
        console.log('response from delete user', json);
        if (json.statusCode == 200) {
          toast.success(json?.message);
          getMetas();
          setDeleteModal(false);
          setCurrentModalData(null);
        }
      })
      .catch(error => {
        console.error('error while deleting user', error);
      })
  }

  const onStatus = () => {
    console.log('status', currentModalData);
    setLoading(true);
    let body = {
      caseId: currentModalData?._id,
      isActive: !currentModalData?.isActive,
      token: user?.token
    }
    let url = `case/update`;
    put(url, body)
      .then(json => {
        console.log('response from delete user', json);
        setLoading(false);
        if (json.statusCode == 200) {
          toast.success(json?.message);
          getMetas();
          setDeleteModal(false);
          setCurrentModalData(null);
        } else {
          toast.error(json?.error);
        }
      })
      .catch(error => {
        setLoading(false);
        toast.error(error);
        console.error('error while deleting user', error);
      })
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
        60,
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
      let properties = [], hotels = [];
      if (values?.include == 'des') {
        if (selectedPros?.length < 1) {
          toast.error('Select atleast one Destination');
          return;
        }
        selectedPros.map((item) => {
          properties.push(item?._id);
        });
      } else if (values?.include == 'hotel') {
        if (selectedHotel?.length < 1) {
          toast.error('Select atleast one Hotel');
          return;
        }
        selectedHotel.map((item) => {
          hotels.push(item?._id);
        });
      }
      if (selectedCat?.length < 1) {
        toast.error('Please select at least one category');
        return;
      }
      setLoading(true);
      let body = {
        ...values,
        propertyId: properties,
        hotelId: hotels,
        categoryId: selectedCat,
        blogId: currentModalData?._id,
        desc: desc,
        token: user?.token
      }
      // if (imageChanged) {
      try {
        const fileData = cropper?.current?.cropper?.getCroppedCanvas().toDataURL();
        if (fileData) {
          const fileObj = await urltoFile(fileData, (new Date().getTime() + 300) + '.png', 'image/png')
          const image2 = await resizeFile(fileObj);
          const form2 = new FormData();
          form2.append("image", image2);
          const uploadedBanner = await upload("/blog/image_upload", form2)
          if (uploadedBanner?.statusCode == 200)
            body.image = uploadedBanner?.data;
        }
        const fileData2 = cropper2?.current?.cropper?.getCroppedCanvas().toDataURL();
        if (fileData2) {
          const fileObj2 = await urltoFile(fileData2, (new Date().getTime() + 600) + '.png', 'image/png')
          const image3 = await resizeFile(fileObj2);
          const form3 = new FormData();
          form3.append("image", image3);
          const uploadedBanner2 = await upload("/blog/image_upload", form3)
          console.log('response from image upload', uploadedBanner2);
          if (uploadedBanner2?.statusCode == 200)
            body.banner = uploadedBanner2?.data;
        }
      } catch (error) {
        console.log('error while uploading image', error);
      }
      put("/blog/update", body)
        .then(json => {
          console.log('response from add month', json);
          setLoading(false);
          if (json.statusCode == 200) {
            toast.success(json?.message);
            getMetas();
            setFile(null);
            setFile2(null);
            // setImageChanged(false);
            setIsAddForm(false);
            setCurrentModalData(null);
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
      let properties = [], hotels = [];
      if (values?.include == 'des') {
        if (selectedPros?.length < 1) {
          toast.error('Select atleast one Destination');
          return;
        }
        selectedPros.map((item) => {
          properties.push(item?._id);
        });
      } else if (values?.include == 'hotel') {
        if (selectedHotel?.length < 1) {
          toast.error('Select atleast one Hotel');
          return;
        }
        selectedHotel.map((item) => {
          hotels.push(item?._id);
        });
      }
      if (selectedCat?.length < 1) {
        toast.error('Please select at least one category');
        return;
      }
      setLoading(true);
      const body = {
        ...values,
        propertyId: properties,
        hotelId: hotels,
        desc: desc,
        categoryId: selectedCat,
        token: user?.token
      }
      try {
        const fileData = cropper?.current?.cropper?.getCroppedCanvas().toDataURL();
        const fileObj = await urltoFile(fileData, (new Date().getTime() + 300) + '.png', 'image/png')
        const image2 = await resizeFile(fileObj);
        const form2 = new FormData();
        form2.append("image", image2);
        const uploadedBanner = await upload("/blog/image_upload", form2)
        console.log('response from image upload', uploadedBanner);
        if (uploadedBanner?.statusCode == 200)
          body.image = uploadedBanner?.data;
        const fileData2 = cropper2?.current?.cropper?.getCroppedCanvas().toDataURL();
        const fileObj2 = await urltoFile(fileData2, (new Date().getTime() + 600) + '.png', 'image/png')
        const image3 = await resizeFile(fileObj2);
        const form3 = new FormData();
        form3.append("image", image3);
        const uploadedBanner2 = await upload("/blog/image_upload", form3)
        console.log('response from banner upload', uploadedBanner2);
        if (uploadedBanner2?.statusCode == 200)
          body.banner = uploadedBanner2?.data;
      } catch (error) {
        console.log('error while uploading image', error);
      }
      post("/blog/add", body)
        .then(json => {
          console.log('response from add blog', json);
          setLoading(false);
          if (json.statusCode == 200) {
            toast.success(json?.message);
            getMetas();
            setFile(null);
            // setImageChanged(false);
            setIsAddForm(false);
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

  const handlePropertyChange = (name) => {
    console.log('changing property', name);
    if (name) {
      let temp = Object.assign([], proData);
      let selected = Object.assign([], selectedPros);
      const data = temp.find(x => x.name == name);
      const found = selected?.findIndex(x => x?._id == data?._id);
      console.log('found property', found);
      if (found == -1) {
        selected.push({ _id: data?._id, name: data?.name });
        setSelectedPros(selected);
      }
    }
  }

  const handleRemoveProp = (index) => {
    let selected = Object.assign([], selectedPros);
    selected.splice(index, 1);
    setSelectedPros(selected);
  }

  const handleHotelChange = (name) => {
    let temp = Object.assign([], hotelData);
    let selected = Object.assign([], selectedHotel);
    const data = temp.find(x => x.name == name);
    const found = selected?.findIndex(x => x?._id == data?._id);
    console.log('found property', found);
    if (found == -1) {
      selected.push({ _id: data?._id, name: data?.name });
      setSelectedHotel(selected);
    }
  }

  const handleRemoveHotel = (index) => {
    let selected = Object.assign([], selectedHotel);
    selected.splice(index, 1);
    setSelectedHotel(selected);
  }

  const onEditorStateChange = (editorState) => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setDesc(html);
    setDescContent(editorState);
  }

  // console.log('onchange include', include);

  const handleCatChanged = (what, val) => {
    console.log('changing category', what, val);
    let temp = Object.assign([], selectedCat);
    if (what == "true") {
      temp.splice(temp.findIndex(x => x == val), 1);
    } else {
      temp.push(val);
    }
    setSelectedCat(temp);
  }

  const handleAddReview = (data) => {
    setCurrentModalData(data);
    setIsReviewing(true);
  }

  const handleValidReviewSubmit = () => {
    if (reviewData?.length) {
      setLoading(true);
      let body = {
        reviews: reviewData,
        blogId: currentModalData?._id,
        token: user?.token
      }
      post("/review/add_auto_review", body)
        .then(res => {
          setLoading(false);
          if (res?.statusCode == 200) {
            toast.success(res?.message);
            setIsReviewing(false);
            setReviewData([{ desc: "" }]);
          } else {
            toast.error(res?.error);
          }
        })
        .catch(err => {
          setLoading(false);
          console.log('error while add auto review', err);
          toast.error("Something Went Wrong, Try Again!");
        })
    } else {
      toast.error("Add At least one review!");
    }
  }

  const handleOnChange = (val, to, what) => {
    let obj = Object.assign([], reviewData);
    if (what == 'title')
      obj[to].title = val;
    else
      obj[to].desc = val;
    setReviewData(obj);
  }

  const addMore = () => {
    let obj = Object.assign([], reviewData);
    obj.push({ title: "", desc: "" });
    setReviewData(obj);
  }

  const removeReview = (index) => {
    let obj = Object.assign([], reviewData);
    obj.splice(index, 1);
    setReviewData(obj);
  }

  const openBlog = (item) => {
    if (item?._id)
      return "/blog/" + compressId(item?._id) + "/" + parseName(item?.titleShort);
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
      <div className="">
        <Row>
          <DeleteModal
            show={deleteModal}
            onConfirm={() => currentModalData?.actionType == 'Status' ? onStatus() : onDelete()}
            onCloseClick={() => setDeleteModal(false)}
            data={currentModalData}
          />
          <Modal isOpen={isReviewing} centered>
            <ModalBody>
              <Row>
                <Col md={10}>
                  <h5>Add more Comments on {currentModalData?.titleShort}</h5>
                </Col>
                <Col md={1}>
                  <button
                    className="btn btn-primary waves-effect waves-light"
                    style={{ backgroundColor: Utils.themeColor }}
                    onClick={() => setIsReviewing(false)}
                    type="reset"
                  >
                    Close
                  </button>
                </Col>
              </Row>
              <AvForm onValidSubmit={handleValidReviewSubmit}>
                {reviewData?.map((item, index) => (
                  <div className="mt-2 form-control">
                    <Row style={{ flexDirection: 'row' }}>
                      <Col md={10}>
                        <p>Comment {index + 1}</p>
                      </Col>
                      {index > 0 &&
                        <Col md={1}>
                          <button
                            type="button"
                            style={{ backgroundColor: "#d9604d", border: 'none', borderRadius: 5, marginLeft: 20 }}
                            onClick={() => removeReview(index)}
                          >
                            <i className="mdi mdi-delete" style={{ color: '#fff' }} />
                          </button>
                        </Col>
                      }
                    </Row>
                    {/* <AvField
                      type="text"
                      name={"title" + index}
                      placeholder="Enter review title"
                      value={item?.title}
                      onChange={(e) => handleOnChange(e.target.value, index, 'title')}
                      required
                    /> */}
                    <AvField
                      type="textarea"
                      className="mt-2"
                      rows={3}
                      name={"desc" + index}
                      placeholder="Enter comment"
                      value={item?.desc}
                      onChange={(e) => handleOnChange(e.target.value, index, 'desc')}
                      required
                    />
                    {reviewData?.length - 1 == index &&
                      <div style={{ width: '100%', marginTop: 10, justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                        <button
                          type="button"
                          style={{ backgroundColor: "#d9604d", border: 'none', borderRadius: 5, marginLeft: 20, alignSelf: 'end', color: '#fff' }}
                          onClick={addMore}
                        >
                          <i className="mdi mdi-plus" style={{}} /> Add More
                        </button>
                      </div>
                    }
                  </div>
                ))}
                <Row>
                  <Col>
                    <div className="text-center mt-3">
                      <button
                        type="button"
                        className="btn btn-danger btn-lg me-2"
                        onClick={() => { setReviewData([{ title: "", desc: "" }]); setIsReviewing(false) }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success btn-lg me-2"
                      >
                        Submit
                      </button>
                    </div>
                  </Col>
                </Row>
              </AvForm>
            </ModalBody>
          </Modal>
          {/* Add or Update depart form */}
          <Modal className="modal_form" isOpen={isAddForm} style={{ minWidth: 1000 }} centered={true}>
            <ModalBody className="py-3 px-5">
              <h5 className="text-black font-size-20">{currentModalData ? 'Update Blog!' : 'Add New Caase Study!'}</h5>
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
                    <Col lg={6} md={6}>
                      <div className="mb-3">
                        <AvField
                          name="authorId"
                          label="Author"
                          className="form-control"
                          // placeholder="Enter title"
                          type="select"
                          required
                          value={currentModalData?.authorId}
                        >
                          <option value="">Select Author</option>
                          {authors?.map((item) => (
                            <option value={item?._id}>{item?.title}</option>
                          ))}
                        </AvField>
                      </div>
                    </Col>
                    <Col lg={6} md={6}>
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
                    <Col lg={12} md={12}>
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
                      <div className="mb-3 mt-2">
                        {file ?
                          <>
                            <CardTitle >Image</CardTitle>
                            <div style={{ flexDirection: 'row', position: 'relative', cursor: 'pointer', marginTop: 20 }}>
                              {currentModalData?.image ?
                                <img src={file} style={{ width: 400, height: 'auto' }} />
                                :
                                <Cropper
                                  style={{ height: 'auto', width: 400 }}
                                  // aspectRatio={370 / 510}
                                  preview=".img-preview"
                                  guides={true}
                                  src={file}
                                  ref={cropper}
                                />
                              }
                              <i className="mdi mdi-close" style={{
                                color: 'white', backgroundColor: Utils.themeColor, fontSize: 20,
                                position: 'absolute', top: -16, right: -28, borderRadius: 15, width: 30, height: 30, textAlign: 'center'
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
                            accept="image/png, image/jpeg"
                          // value={currentModalData?.logo}
                          />
                        }
                      </div>
                    </Col>
                    <Col lg={12} md={12}>
                      <div className="mb-3 mt-2">
                        {file2 ?
                          <>
                            <CardTitle >Banner</CardTitle>
                            <div style={{ flexDirection: 'row', position: 'relative', cursor: 'pointer', marginTop: 20 }}>
                              {currentModalData?.banner ?
                                <img src={file2} style={{ width: 400, height: 'auto' }} />
                                :
                                <Cropper
                                  style={{ height: 'auto', width: 400 }}
                                  // aspectRatio={16 / 5}
                                  preview=".img-preview"
                                  guides={true}
                                  src={file2}
                                  ref={cropper2}
                                />
                              }
                              <i className="mdi mdi-close" style={{
                                color: 'white', backgroundColor: Utils.themeColor, fontSize: 20,
                                position: 'absolute', top: -16, right: -28, borderRadius: 15, width: 30, height: 30, textAlign: 'center'
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
                            accept="image/png, image/jpeg"
                          // value={currentModalData?.logo}
                          />
                        }
                      </div>
                    </Col>
                    <Col lg={12} md={12}>
                      <div className="mb-3">
                        {/* <AvField
                          name="desc"
                          label="Overview"
                          className="form-control"
                          placeholder="Enter overview"
                          type="textarea"
                          row={2}
                          value={currentModalData?.desc}
                          required
                        /> */}
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={(e) => onEditorStateChange(e)}
                          editorState={descContent}
                        />
                      </div>
                    </Col>
                    <Label>Categories</Label>
                    <Col lg={12} md={12}>
                      <div className="mb-3" style={{ flexWrap: 'wrap', display: 'flex' }}>
                        {categories?.map((item, index) => (
                          <AvGroup check style={{ marginLeft: 15 }}>
                            <Label check>
                              <AvInput type="checkbox" name={"checkbox" + index} defaultChecked={selectedCat.findIndex(x => x == item?._id) != -1 ? true : false} onChange={(e) => handleCatChanged(e.target.value, item?._id)} /> {item?.title}
                            </Label>
                          </AvGroup>
                        ))}
                      </div>
                    </Col>
                    <Col lg={12} md={12}>
                      <label>Also Include</label>
                      <div className="">
                        <AvRadioGroup name="include" value={currentModalData?.include} onChange={(e) => setInclude(e.target.value)}>
                          <div className="d-flex align-items-center">
                            <AvRadio label="None" value="" style={{ width: '25px', height: '25px', marginRight: '10px', justifyContent: 'center' }} />
                            <AvRadio label="Destination" value="des" style={{ width: '25px', height: '25px', marginLeft: 30, marginRight: '10px', justifyContent: 'center' }} />
                            <AvRadio label="Hotel" value="hotel" style={{ width: '25px', height: '25px', marginLeft: 30, marginRight: '10px' }} />
                          </div>
                        </AvRadioGroup>
                      </div>
                    </Col>
                    {include == 'des' &&
                      <Col lg={6} md={6}>
                        <div className="mb-3">
                          <label>Destination</label>
                          {/* <SearchableDropdown
                            className="form-control"
                            style={{ width: '100%' }}
                            options={proData}
                            label="name"
                            id="_id"
                            // selectedVal={value}
                            onTextChange={(e) => getProperty(e)}
                            handleChange={(val) => handlePropertyChange(val)}
                          /> */}
                        </div>
                        {selectedPros?.length > 0 &&
                          <div className="d-flex mb-4 flex-wrap">
                            {selectedPros.map((item, index) => {
                              return (
                                <div style={{ border: `1px solid ${Utils.themeColor}`, marginRight: 10, display: 'flex', marginBottom: 15 }}>
                                  <span style={{ padding: 5 }}>{item?.name}</span>
                                  <div style={{ backgroundColor: Utils.themeColor, height: '100%', width: 20, textAlign: 'center', cursor: 'pointer' }}
                                    onClick={() => handleRemoveProp(index)}
                                  >
                                    <span style={{ color: 'white', verticalAlign: 'sub' }} >X</span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        }
                      </Col>
                    }
                    {include == 'hotel' &&
                      <Col lg={6} md={6}>
                        <div className="mb-3">
                          <label>Hotel</label>
                          {/* <SearchableDropdown
                            className="form-control"
                            style={{ width: '100%' }}
                            options={hotelData}
                            label="name"
                            id="_id"
                            selectedVal={value}
                            handleChange={(val) => handleHotelChange(val)}
                          /> */}
                        </div>
                        {selectedHotel?.length > 0 &&
                          <div className="d-flex mb-4 flex-wrap">
                            {selectedHotel.map((item, index) => {
                              return (
                                <div style={{ border: `1px solid ${Utils.themeColor}`, marginRight: 10, display: 'flex', marginBottom: 15 }}>
                                  <span style={{ padding: 5 }}>{item?.name}</span>
                                  <div style={{ backgroundColor: Utils.themeColor, height: '100%', width: 20, textAlign: 'center', cursor: 'pointer' }}
                                    onClick={() => handleRemoveHotel(index)}
                                  >
                                    <span style={{ color: 'white', verticalAlign: 'sub' }} >X</span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        }
                      </Col>
                    }

                    <Col lg={12} md={12}>
                      <div className="mt-4">
                        <Row>
                          <Col md={6}>
                            <button
                              className="btn btn-primary w-100 waves-effect waves-light"
                              style={{ backgroundColor: Utils.themeColor }}
                              onClick={() => { setIsAddForm(false); setFile(null) }}
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
            </ModalBody>
          </Modal>

          <Col className="col-12">

            <Row>
              <Col md={11}>
                <div>
                  <CardTitle className="h4">{props.role}</CardTitle>
                  <CardSubtitle className="mb-3">
                    {role} you have added before, All the <code>Case Studies </code> can be used only if they are active.
                  </CardSubtitle>
                </div>
              </Col>
              <Col md={1}>
                <div style={{ display: 'flex', alignSelf: 'flex-end' }}>
                  {canAdd &&
                    <Button style={{ backgroundColor: Utils.themeColor }} onClick={() => navigate("/case-study/add")}>
                      Add
                    </Button>
                  }
                </div>
              </Col>
            </Row>
            <DataTable
              columns={columns}
              data={data}
              pagination
              customStyles={{
                headCells: {
                  style: {
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15,
                    maxWidth: 80
                  },
                },
                cells: {
                  style: {
                    maxWidth: 50
                  }
                }
              }}
            />
          </Col>
        </Row>
      </div >

    </React.Fragment >
  )
}

export default Table;
