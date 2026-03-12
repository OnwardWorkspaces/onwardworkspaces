import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalBody, } from "reactstrap";
import * as Utils from "../../Utils";
import { post, get, put, upload } from "../../helper/api_helper";
// import 'react-vertical-timeline-component/style.min.css';
import DeleteModal from './DeleteModal';
import { AvField, AvForm } from "availity-reactstrap-validation";
import { toast } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';
// import avatar from '../../assets/images/small/sample.png';
import HTMLRenderer from 'react-html-renderer';
import DataTable from 'react-data-table-component';
import { Draggable } from "react-drag-reorder";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Resizer from "react-image-file-resizer";

const PropertyDetail = (props) => {
  const { user, singleId, setLoading, setIsTable } = props;
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalData, setModalData] = useState({ type: "Delete" });
  const [form, setForm] = useState(false);
  const [opporOptions, setOpporOptions] = useState([]);
  const [selectedOppor, setSelectedOppor] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [cropperModal, setCropperModal] = useState(false);
  const imageInput = useRef();
  const cropper = useRef();
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log('oppor id on single oppor', singleId);
    if (user && singleId) {
      getData();
    }
  }, [user, singleId]);

  const getData = async () => {
    get("/hotel/detail?hotelId=" + singleId, { token: user?.token })
      .then(json => {
        console.log('response from get comp single', json);
        if (json?.statusCode == 200) {
          setData(json?.data);
          setColumns([
            {
              name: 'Title',
              selector: row => row?.name,
            },
            {
              name: 'Country',
              selector: row => row?.country[0]?.name,
            },
            // {
            //   cell: (row) => <>
            //     <Button onClick={() => handleDeleteCred(row)}
            //       title={"Delete"}
            //       style={{ backgroundColor: user?.company?.theme ? user?.company?.theme : Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="mdi mdi-delete" style={{ fontSize: 20 }}></span></Button>
            //   </>,
            //   name: 'Action',
            //   ignoreRowClick: true,
            //   // allowOverflow: true,
            //   // button: true,
            // },
          ]);
        }
      })
      .catch(error => {
        console.log('error while getting lead detail', error);
      })
  }

  const handleUpdateReviewStatus = (item) => {
    let body = {
      reviewId: item?._id,
      isActive: !item?.isActive,
      token: user?.token
    }
    console.log('body after upload images', body);
    put("/review/update", body)
      .then((json) => {
        console.log('response from adding comp', json);
        setLoading(false);
        if (json.statusCode == 200) {
          console.log('property added');
          toast.success(json?.message);
          getData();
        } else {
          toast.error(json?.error);
        }
      })
      .catch(error => {
        console.error('error while adding oppor', error);
        toast.error(JSON.stringify(error));
        setLoading(false);
      })
  }

  const handleValidSubmit = (e, values) => {
    console.log('values ', values);
    if (selectedOppor.length < 1) {
      toast.error('Select at least one Opportunity');
      return;
    }
    let temp = [];
    selectedOppor.map((item) => {
      temp.push(item.id);
    });
    let body = {
      ...values,
      companyId: data?._id,
      opporIds: temp,
      companyName: data?.title,
      addedBy: user?._id,
      token: user?.token
    };
    setLoading(true);
    post('/user/add', body)
      .then(json => {
        setLoading(false);
        if (json.statusCode == 200) {
          setForm(false);
          toast.success(json?.message);
          getData();
        } else {
          toast.error(json?.error);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
        toast.error("Something Went Wrong");
      })
  }

  const handleDeleteCred = (cred) => {
    console.log('cred need to delete', cred);
    setModalData(cred);
    setDeleteModal(true);
  }

  const onDelete = () => {
    setLoading(true);
    post("/review/delete", { reviewId: modalData?._id, token: user?.token })
      .then(json => {
        console.log('response from delete user', json);
        setLoading(false);
        if (json.statusCode == 200) {
          toast.success(json?.message);
          getData();
          setDeleteModal(false);
          setModalData(null);
        } else
          toast.error(json?.error);
      })
      .catch(error => {
        setLoading(false);
        toast.error('Something Went Wrong');
        console.error('error while deleting user', error);
      })
  }

  const handleChangeInput = (list) => {
    setSelectedOppor(list);
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
        "png",
        60,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const handlePositionChange = async (currentPos, newPos) => {
    let newBanners = await changeValuePosition(data?.banners, currentPos, newPos);
    console.log('on position changed', newBanners);
    let body = {
      propertyId: data?._id,
      banners: newBanners,
      token: user?.token
    }
    console.log('body after upload images', body);
    put("/property/update", body)
      .then((json) => {
        console.log('response from adding comp', json);
        setLoading(false);
        if (json.statusCode == 200) {
          console.log('property added');
          toast.success(json?.message);
          getData();
          setCropperModal(false);
        } else {
          toast.error(json?.error);
        }
      })
      .catch(error => {
        console.error('error while adding oppor', error);
        toast.error(JSON.stringify(error));
        setLoading(false);
      })
  }

  const changeValuePosition = (arr, init, target) => {
    [arr[init], arr[target]] = [arr[target], arr[init]];
    return arr;
  }

  const cropImage = (e, v) => {
    setLoading(true);
    const fileData = cropper?.current?.cropper?.getCroppedCanvas().toDataURL();
    urltoFile(fileData, new Date().getTime() + '.png', 'image/png')
      .then(async (obj) => {
        console.log('values', obj);
        const image = await resizeFile(obj);
        const form = new FormData();
        form.append("image", image);
        upload("/hotel/image_upload", form)
          .then(res => {
            console.log('response from image upload', res);
            if (res?.statusCode == 200) {
              // toast.success(res?.message);
              // getData();
              // setCropperModal(false);
              let banners = data?.banners;
              banners.push(res?.data);
              let body = {
                hotelId: data?._id,
                banners: banners,
                token: user?.token
              }
              console.log('body after upload images', body);
              put("/hotel/update", body)
                .then((json) => {
                  console.log('response from adding comp', json);
                  setLoading(false);
                  if (json.statusCode == 200) {
                    console.log('property added');
                    toast.success(json?.message);
                    getData();
                    setCropperModal(false);
                    // props?.history.go(0);
                  } else {
                    toast.error(json?.error);
                  }
                })
                .catch(error => {
                  console.error('error while adding oppor', error);
                  toast.error(JSON.stringify(error));
                  setLoading(false);
                })
            } else {
              setLoading(false);
              toast.error(res?.error);
            }
          })
          .catch(error => {
            setLoading(false);
            console.log('error while uploading image', error);
            toast.error(error);
          })
      });
  }

  const removeImage = (index) => {
    console.log('clicked on remove images', index);
    setLoading(true);
    let banners = Object.assign([], data?.banners);
    banners.splice(index, 1);
    let body = {
      hotelId: singleId,
      banners,
      imageIndex: index,
      token: user?.token,
    }
    let url = "/hotel/remove_banner";
    console.log('body after upload images', body);
    post(url, body)
      .then((json) => {
        console.log('response from removeing banner', json);
        setLoading(false);
        if (json.statusCode == 200) {
          console.log('property more image updated!');
          toast.success(json?.message);
          // props?.history.go(0);
          getData();
        } else {
          toast.error(json?.error);
        }
      })
      .catch(error => {
        console.error('error while adding oppor', error);
        toast.error(JSON.stringify(error));
        setLoading(false);
      })
  }

  const onChangeFile = async (e) => {
    console.log('on change file', e.target);
    setCurrentFile(URL.createObjectURL(e.target.files[0]));
    setCropperModal(true);
  }

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={() => onDelete()}
          onCloseClick={() => setDeleteModal(false)}
        />
        <Modal isOpen={form} toggle={() => setForm(false)} centered={true}>
          <ModalBody className="py-3 px-5">
            <h5 className="text-black font-size-20">Add Credential !</h5>
            <div className="p-2">
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v)
                }}
              >
                <div className="mb-3">
                  <AvField
                    name="name"
                    label="Name"
                    className="form-control"
                    placeholder="Enter name"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="email"
                    label="Email"
                    className="form-control"
                    placeholder="Enter email"
                    type="email"
                    required
                  />
                </div>

                <div className="mt-4">
                  <Multiselect
                    options={opporOptions}
                    onSelect={(selectedList, selectedItem) => handleChangeInput(selectedList)}
                    onRemove={(selectedList, removedItem) => handleChangeInput(selectedList)}
                    displayValue="name"
                    placeholder={"Select Opportunities"}
                    showCheckbox
                    name="Opportunities"
                  />
                </div>
                <div className="mt-4">
                  <Row>
                    <Col md={6}>
                      <button
                        className="btn btn-primary w-100 waves-effect waves-light"
                        style={{ backgroundColor: Utils.themeColor }}
                        onClick={() => setForm(false)}
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
                        Add
                      </button>
                    </Col>
                  </Row>
                </div>
              </AvForm>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={cropperModal} toggle={() => { setCropperModal(false); setFile(null) }} centered={true}>
          <ModalBody className="py-3 px-5">
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
                    style={{ height: 'auto', width: 400 }}
                    aspectRatio={16 / 5}
                    preview=".img-preview"
                    guides={true}
                    src={currentFile}
                    ref={cropper}
                  />
                </div>
                <div className="mt-4">
                  <Row>
                    <Col md={6}>
                      <button
                        className="btn btn-primary w-100 waves-effect waves-light"
                        style={{ backgroundColor: Utils.themeColor }}
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
                        style={{ backgroundColor: Utils.themeColor }}
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
        <Row>
          <Col xl={12}>
            <Row className="d-flex justify-content-between">
              <Col md={6}>
                <span style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{data?.name}</span>
              </Col>
              <Col md={6} className="d-flex justify-content-end align-items-center" >
                {/* <div style={{ textAlignLast: 'right', marginRight: 10 }}>
                  <Button style={{ backgroundColor: Utils.themeColor }} onClick={() => { props?.setCurrentUser(data); props?.setIsAddForm(true); }}>
                    Update
                  </Button>
                </div> */}
                <div style={{ textAlignLast: 'right' }}>
                  <Button style={{ backgroundColor: Utils.themeColor }} onClick={() => setIsTable(true)}>
                    Back
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card className="p-3">
              {/* <CardTitle><h5>Banner</h5></CardTitle> */}
              <div className="d-flex">
                {/* <span className="me-1">{data?.desc}</span> */}
                {/* <img src={data?.banner ? data?.banner : avatar} style={{ width: '100%', height: 'auto' }} /> */}
              </div>
            </Card>
            {/* {data?.banners?.length > 0 && */}
            <div className="p-3">
              {/* <img src={data?.logo ? data?.logo : avatar} style={{ width: 100, height: 'auto' }} /> */}
            </div>
            <Card className="p-3">
              <CardTitle><h5>Banners</h5></CardTitle>
              <div className="d-flex img_item_section" data-bs-toggle="tooltip" data-bs-placement="top" title="Drag Banners to adjust sequencing." delay={{ "show": 0, "hide": 100 }}>
                {data?.banners?.length > 0 &&
                  <Draggable onPosChange={handlePositionChange}>
                    {data?.banners?.map((item, index) => (
                      <div style={{ position: 'relative' }}>
                        {/* <img key={item?.name} src={item ? item : avatar} style={{ height: 'auto' }} /> */}
                        <div style={{ position: 'absolute', height: 25, width: 25, right: 0, top: 0, lineHeight: '24px', backgroundColor: Utils.themeColor, borderRadius: 50, textAlignLast: 'center', cursor: 'pointer' }}
                          onClick={(e) => removeImage(index)}
                        >
                          <i className="mdi mdi-close" style={{ color: 'white', fontSize: 15 }} />
                        </div>
                      </div>
                    ))}
                  </Draggable>
                }
                {data?.banners?.length < 4 &&
                  <div className="me-3 position-relative">
                    {/* <img
                      src={avatar}
                      alt=""
                      style={{ width: 250, height: 85, marginTop: 2 }}
                      onClick={(e) => imageInput.current.click(e)}
                    /> */}
                    <div style={{ position: 'absolute', height: 25, width: 25, right: 0, top: 0, lineHeight: '24px', backgroundColor: Utils.themeColor, borderRadius: 50, textAlignLast: 'center', cursor: 'pointer' }}
                      onClick={(e) => imageInput.current.click(e)}
                    >
                      <i className="mdi mdi-camera-outline" style={{ color: 'white', fontSize: 15 }} />
                    </div>
                    <input type="file" id="file"
                      ref={imageInput}
                      onChange={(e) => onChangeFile(e)}
                      style={{ display: "none" }} />
                  </div>
                }
              </div>
            </Card>
            {/* } */}
            {data &&
              <Card className="p-3">
                <CardTitle><h5>Property Details</h5></CardTitle>
                <Row className="justify-content-around">
                  <Col md={3}>
                    <p className="m-0"><b>City : </b>{data?.city}</p>
                  </Col>
                  <Col md={3}>
                    <p className="m-0"><b>Location : </b>{data?.location}</p>
                  </Col>
                  <Col md={3}>
                    <p className="m-0"><b>is Luxury : </b>{data?.isLux ? "Yes" : "No"}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} style={{ paddingLeft: 58, marginTop:20 }}>
                    <p className="m-0"><b>Booking UTM : </b>{data?.utm}</p>
                  </Col>
                </Row>
              </Card>
            }
            <Card className="p-3">
              <CardTitle><h5>Details</h5></CardTitle>
              <Row className="justify-content-around">
                <HTMLRenderer
                  html={data?.desc ? data?.desc : ""}
                // components={{
                //   h1: props => <Heading color="red" {...props} />,
                //   h2: Subheading,
                //   a: Link,
                // }}
                />
              </Row>
            </Card>

            <Card className="p-3">
              <CardTitle><h5>Destinations</h5></CardTitle>
              <DataTable
                columns={columns}
                data={data?.properties}
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
              />
            </Card>
          </Col>
        </Row>
      </Row>
    </React.Fragment >
  )
}

export default PropertyDetail;
