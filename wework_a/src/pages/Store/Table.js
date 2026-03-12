import React, { useEffect, useState, useRef } from "react";
// import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalBody, Label } from "reactstrap"
// import "./datatables.scss";
// import '../Icons/IconFontawesome';
import { AvField, AvForm, AvRadio, AvRadioGroup } from "availity-reactstrap-validation";
import { toast } from 'react-toastify';
import * as Utils from '../../Utils';
import { post, get, put, upload } from "../../helper/api_helper";
// import DeleteModal from './DeleteModal';
import ConfirmModal from "../../components/ConfirmModal";
// import DataTable from 'react-data-table-component';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Resizer from "react-image-file-resizer";
// import UiDropdown from "../Ui/UiDropdown";
// import SearchableDropdown from "../Ui/UiSearchableDropdown";

// import './Card.scss';

const Table = (props) => {
  const { user, role, currentData, setIsTable, setSingleId, path, setLoading } = props;
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentModalData, setCurrentModalData] = useState(null);
  const [isAddForm, setIsAddForm] = useState(false);
  const [file, setFile] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const imageInput = useRef();
  const cropper = useRef();

  useEffect(() => {
    if (user) {
      getMetas();
    }
  }, [user, path]);

  const getMetas = () => {
    get("store/list", { token: user?.token })
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
    if (!isAddForm) {
      setFile(null);
    }
  }, [isAddForm])

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
      storeId: currentModalData?._id,
      token: user?.token
    }
    post(`store/remove_banner`, body)
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

  const handleValidSubmit = async (e, values) => {
    // console.log('values', values, file);
    setLoading(true);
    const fileData = cropper?.current?.cropper?.getCroppedCanvas().toDataURL();
    const fileObj = await urltoFile(fileData, (new Date().getTime() + 300) + '.png', 'image/png')
    console.log('values 2', fileObj);
    const image2 = await resizeFile(fileObj);
    console.log('values 2 after resize', image2);
    const form2 = new FormData();
    form2.append("image", image2);
    const uploadedBanner = await upload("store/image_upload", form2)
    console.log('response from image upload', uploadedBanner);
    setLoading(false);
    if (uploadedBanner?.statusCode == 200) {
      getMetas();
      setFile(null);
      setImageChanged(false);
      setIsAddForm(false);
    }
  }

  const onChangeFile = (e) => {
    console.log('getting event on input img', e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    setImageChanged(true);
  }

  const onStatus = () => {
    console.log('status', currentModalData);
    setLoading(true);
    let body = {
      storeId: currentModalData?._id,
      isActive: !currentModalData?.isActive,
      token: user?.token
    }
    let url = `/hotel/update`;
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

  const copyToClipboard=(url) => {
    var textField = document.createElement('textarea')
    textField.innerText = url;
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove();
    toast.success("Copied!")
  }

  return (
    <React.Fragment>
      <div className="">
        <Row>
          <ConfirmModal
            show={deleteModal}
            onConfirm={() => currentModalData?.actionType == 'Status' ? onStatus() : onDelete()}
            onCloseClick={() => setDeleteModal(false)}
            actionType={currentModalData?.actionType}
            data={currentModalData}
          />
          {/* Add or Update depart form */}
          <Modal className="modal_form" isOpen={isAddForm} toggle={() => { setIsAddForm(false); setFile(null) }} centered={true}>
            <ModalBody className="py-3">
              <h5 className="text-black font-size-20">{'Add New Image!'}</h5>
              <div className="p-2">
                <AvForm
                  className="form-horizontal"
                  onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                  }}
                >
                  {/* <div className="mb-3">
                    <AvField
                      name="propertyId"
                      label="Property"
                      className="form-control"
                      type="select"
                      required
                      value={currentModalData?.propertyId}
                    >
                      <option value="">Select Property</option>
                      {proData?.map((item) => (
                        <option value={item?._id}>{item?.name}</option>
                      ))}
                    </AvField>
                  </div> */}
                  <Row>
                    <Col lg={12} md={12}>
                      <div className="mb-3 mt-2">
                        {file ?
                          <>
                            <CardTitle >Image</CardTitle>
                            <div style={{ flexDirection: 'row', position: 'relative', cursor: 'pointer', marginTop: 20 }}>
                              {currentModalData?.banner ?
                                <img src={file} style={{ width: '100%', height: 'auto' }} />
                                :
                                <Cropper
                                  style={{ height: 'auto', width: '100%' }}
                                  aspectRatio={2 / 1}
                                  preview=".img-preview"
                                  guides={true}
                                  src={file}
                                  ref={cropper}
                                />
                              }
                              {/* <i className="fa fa-close" style={{
                                color: 'white', backgroundColor: Utils.themeColor, fontSize: 20,
                                position: 'absolute', top: -16, right: -12, borderRadius: 15, width: 30, height: 30, textAlign: 'center'
                              }}
                                onClick={() => { setFile(null); if (currentModalData) setCurrentModalData({ ...currentModalData, banner: undefined }) }}
                              /> */}
                            </div>
                          </>
                          :
                          <AvField
                            name="fileInput"
                            label="Image"
                            className="form-control"
                            placeholder="upload bank logo"
                            type="file"
                            onChange={e => onChangeFile(e)}
                            required
                            multiple={false}
                            ref={imageInput}
                            accept="image/png, image/jpeg, image/webp"
                          // value={currentModalData?.logo}
                          />
                        }
                      </div>
                    </Col>
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
            <Card>
              <CardBody>
                <div className="d-flex" style={{ marginLeft: 'auto', marginBottom: 30 }}>
                  <div>
                    <CardTitle className="h4">{props.role}</CardTitle>
                    <CardSubtitle className="mb-3">
                      {role} you have added before, All the <code>{role} </code> you can use anywhere multiple times.
                    </CardSubtitle>
                  </div>
                </div>

                <div className="d-flex" style={{ marginLeft: 'auto', marginBottom:0 }}>
                  <h5>{role}</h5>
                  <div className="text-center" style={{ marginLeft: 'auto' }}>
                    <Button style={{ backgroundColor: Utils.themeColor }} onClick={() => setIsAddForm(true)}>
                      Add
                    </Button>
                  </div>
                </div>
                <Row>
                  {data?.map((item, index) => (
                    <Col md={2} lg={2} className="mt-4">
                      <div style={{ position: 'relative' }} className="image_contain">
                        <img src={item?.image} style={{ width: '100%', height: 'auto' }} />
                        <div style={{ position: 'absolute', top: 10, right: 10 }} className="controls">
                          <div className="copy_button" onClick={()=>copyToClipboard(item?.image)}>
                            <i className="fa fa-copy" style={{ color: Utils.themeColor }}></i>
                          </div>
                          <div style={{ backgroundColor: 'white', borderRadius: 2, padding: '1px 5px', marginTop:10, cursor:'pointer' }} onClick={()=>handleDelete(item)}>
                            <i className="fa fa-trash" style={{ color: Utils.themeColor }}></i>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    </React.Fragment >
  )
}

export default Table;
