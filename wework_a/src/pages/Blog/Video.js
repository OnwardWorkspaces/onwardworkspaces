import React, { useEffect, useState, useRef } from "react";
// import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalBody, Label } from "reactstrap"
// import "./datatables.scss";
// import '../Icons/IconFontawesome';
import { AvField, AvForm, AvRadio, AvRadioGroup } from "availity-reactstrap-validation";
import { toast } from 'react-toastify';
import Utils from '../Utility';
import { post, get, put, upload } from "../../helpers/api_helper";
import DeleteModal from './DeleteModal';
import DataTable from 'react-data-table-component';
import Breadcrumb from "../../components/Common/Breadcrumb";
import Loader from "../../components/Loader";
import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Resizer from "react-image-file-resizer";
import './style.scss';

// import './Card.scss';

const Videos = (props) => {
  const { user } = props;
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentModalData, setCurrentModalData] = useState(null);
  const [isAddForm, setIsAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVideoPop, setIsVideoPop] = useState(false);
  const [file, setFile] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const cropper = useRef();


  useEffect(() => {
    if (user) {
      getMetas();
    }
  }, [user]);

  const getMetas = () => {
    get("/setting")
      .then(res => {
        if (res?.statusCode == 200)
          setIsVideo(res?.data?.video);
      })
    get("/category/list")
      .then(res => {
        console.log('response from get properties', res);
        if (res?.statusCode == 200)
          setCategories(res?.data);
      })
      .catch(error => {
        console.log('error while getting properties on blogs', error);
      });
    get("/author/list")
      .then(res => {
        console.log('response from get properties', res);
        if (res?.statusCode == 200)
          setAuthors(res?.data);
      })
      .catch(error => {
        console.log('error while getting properties on blogs', error);
      });
    get("/video/list")
      .then(json => {
        // console.log('response from get project list', path);
        setLoading(false);
        if (json?.statusCode == 200) {
          setData(json?.data);
        } else {
          toast.error(json?.error);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error while getting project list', error);
      })
  }

  useEffect(() => {
    setColumns([
      {
        name: 'Title',
        selector: row => row?.titleShort,
      },
      {
        name: 'Category',
        selector: row => row.category[0]?.title,
      },
      {
        name: 'Author',
        selector: row => row.author[0]?.title,
      },
      {
        cell: (row) => <>
          <Button onClick={() => handleUpdateStatus(row)}
            title={row?.isActive ? "Inactive" : "Active"}
            style={{ backgroundColor: !row.isActive ? 'red' : 'green', marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}>
            <span className="text-white" style={{}}>
              {!row?.isActive ? 'Inactive' : 'Active'}
            </span>
          </Button>
        </>,
        name: 'Status',
        ignoreRowClick: true,
      },
      {
        cell: (row) => <>
          <Button onClick={() => handleViewVideo(row)}
            title={"View"}
            style={{ backgroundColor: Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="mdi mdi-eye" style={{ fontSize: 20 }}></span></Button>
          <Button onClick={() => handleUpdateEdit(row)}
            title={"Edit"}
            style={{ backgroundColor: Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="mdi mdi-pencil" style={{ fontSize: 20 }}></span></Button>
          <Button onClick={() => handleDelete(row)}
            title={"Delete"}
            style={{ backgroundColor: Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="mdi mdi-delete" style={{ fontSize: 20 }}></span></Button>
        </>,
        name: 'Action',
        ignoreRowClick: true,
        // allowOverflow: true,
        // button: true,
      },
    ])
  }, [data]);

  useEffect(() => {
    if (!isAddForm) {
      setCurrentModalData(null);
      setFile(null);
    }
  }, [isAddForm])

  const handleUpdateEdit = (proj) => {
    setCurrentModalData(proj);
    setFile(proj?.image);
    setIsAddForm(true);
  }

  const handleDelete = (proj, metaType) => {
    setCurrentModalData({ ...proj, metaType, actionType: 'Delete' });
    setDeleteModal(true);
  }

  const handleUpdateStatus = (item) => {
    setCurrentModalData({ ...item, actionType: 'Status' });
    setDeleteModal(true);
  }

  const onDelete = () => {
    let body = {
      videoId: currentModalData?._id,
      token: user?.token
    }
    post(`/video/delete`, body)
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
      videoId: currentModalData?._id,
      isActive: !currentModalData?.isActive,
      token: user?.token
    }
    let url = `/video/update`;
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

  const handleValidSubmit = async (e, values, type) => {
    console.log('values', values);
    if (currentModalData) {
      setLoading(true);
      let body = {
        ...values,
        videoId: currentModalData?._id,
        token: user?.token
      }
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
      put("/video/update", body)
        .then(json => {
          console.log('response from add month', json);
          setLoading(false);
          if (json.statusCode == 200) {
            toast.success(json?.message);
            getMetas();
            setIsAddForm(false);
            setCurrentModalData(null);
            setFile(null);
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
        token: user?.token
      }
      const fileData = cropper?.current?.cropper?.getCroppedCanvas().toDataURL();
      const fileObj = await urltoFile(fileData, (new Date().getTime() + 300) + '.png', 'image/png')
      const image2 = await resizeFile(fileObj);
      const form2 = new FormData();
      form2.append("image", image2);
      const uploadedBanner = await upload("/blog/image_upload", form2)
      console.log('response from image upload', uploadedBanner);
      if (uploadedBanner?.statusCode == 200)
        body.image = uploadedBanner?.data;
      post("/video/add", body)
        .then(json => {
          console.log('response from add blog', json);
          setLoading(false);
          if (json.statusCode == 200) {
            toast.success(json?.message);
            getMetas();
            setIsAddForm(false);
            setFile(null);
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

  const handleViewVideo = (data) => {
    console.log('data?.url', data?.url);
    setCurrentModalData({ ...data, url: data?.url.split("/")[data?.url.split("/")?.length - 1] });
    setIsVideoPop(true);
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

  const onChangeFile = (e, to) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleChangeToggle = () => {
    put("/setting", { token: user?.token, video: !isVideo })
      .then(res => {
        if (res?.statusCode == 200) {
          toast.success(res?.message);
          getMetas();
        }
        else
          toast.error(res?.error);
      });
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Loader visible={loading} />
        <Row>
          <DeleteModal
            show={deleteModal}
            onDeleteClick={() => currentModalData?.actionType == 'Status' ? onStatus() : onDelete()}
            onCloseClick={() => setDeleteModal(false)}
            actionType={currentModalData?.actionType}
            data={currentModalData}
          />
          {/* Add or Update depart form */}
          <Breadcrumb title={Utils.projectName} breadcrumbItem="Videos" />
          <Card>
            <CardBody>
              <Modal className="modal_form" isOpen={isAddForm} style={{ minWidth: 1000 }} toggle={() => { setIsAddForm(false) }} centered={true}>
                <ModalBody className="py-3 px-5">
                  <h5 className="text-black font-size-20">{currentModalData ? 'Update Video!' : 'Add New Video!'}</h5>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      <Row>
                        <Col lg={6} md={6}>
                          <div className="mb-3">
                            <AvField
                              name="categoryId"
                              label="Category"
                              className="form-control"
                              // placeholder="Enter title"
                              type="select"
                              required
                              value={currentModalData?.categoryId}
                            >
                              <option value="">Select Category</option>
                              {categories?.map((item) => (
                                <option value={item?._id}>{item?.title}</option>
                              ))}
                            </AvField>
                          </div>
                        </Col>
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
                                      aspectRatio={370 / 270}
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
                          <div className="mb-3">
                            <AvField
                              name="url"
                              label="Video Url"
                              className="form-control"
                              placeholder="Enter youtube video url"
                              type="url"
                              value={currentModalData?.url}
                              required
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
                                  onClick={() => { setIsAddForm(false) }}
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
              <Modal className="modal_form" isOpen={isVideoPop} style={{ minWidth: 1000 }} toggle={() => { setIsVideoPop(false) }} centered={true}>
                <iframe
                  width="100%"
                  height="600"
                  src={`https://www.youtube.com/embed/${currentModalData?.url}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen>
                </iframe>
              </Modal>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <div className="d-flex" style={{ marginLeft: 'auto', marginBottom: 30 }}>
                      <div>
                        <CardTitle className="h4">Videos</CardTitle>
                        <CardSubtitle className="mb-3">
                          Video you have added before, All the <code>Videos </code> will be Shown on user end if they are active.
                        </CardSubtitle>
                      </div>
                    </div>

                    <div className="d-flex" style={{ marginLeft: 'auto', marginBottom: 30 }}>
                      <h5>Video</h5>
                      <div className="text-center" style={{ marginLeft: 'auto' }}>
                        <div className="toggle-switch">
                          <input
                            type="checkbox"
                            className="toggle-switch-checkbox"
                            name="toggleSwitch"
                            id="shop"
                            onChange={(e) => handleChangeToggle()}
                            checked={isVideo}
                          />
                          <label className="toggle-switch-label" htmlFor="shop">
                            <span className="toggle-switch-inner" />
                            <span className="toggle-switch-switch" />
                          </label>
                        </div>
                        <Button style={{ backgroundColor: Utils.themeColor, marginLeft:20 }} onClick={() => setIsAddForm(true)}>
                          Add
                        </Button>
                      </div>
                    </div>

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
                  </CardBody>
                </Card>
              </Col>
            </CardBody>
          </Card>
        </Row>
      </div>

    </React.Fragment >
  )
}
const mapStatetoProps = state => {
  const { user } = state.Profile;
  return { user }
}

export default withRouter(
  connect(mapStatetoProps, {})(Videos)
);