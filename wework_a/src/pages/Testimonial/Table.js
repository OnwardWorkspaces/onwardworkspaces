import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Modal, ModalBody, Label } from "reactstrap"
import { Button } from 'react-bootstrap';
import { AvField, AvForm, AvRadio, AvRadioGroup } from "availity-reactstrap-validation";
import { toast } from 'react-toastify';
import * as Utils from '../../Utils';
import { post, get, put, upload } from "../../helper/api_helper";
import DeleteModal from '../../components/ConfirmModal';
import DataTable from 'react-data-table-component';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Resizer from "react-image-file-resizer";
import Rating from "react-rating";
import { useSelector } from 'react-redux';
import Multiselect from "multiselect-react-dropdown";

const Table = (props) => {
  const user = useSelector(state => state.user);
  const { role, currentUser, path, setLoading } = props;
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentModalData, setCurrentModalData] = useState(null);
  const [isAddForm, setIsAddForm] = useState(false);
  const [file, setFile] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const imageInput = useRef();
  const cropper = useRef();
  const [type, setType] = useState("image");
  const [rating, setRating] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState([]);
  const [placeTo, setPlaceTo] = useState("");
  const [properties, setProperties] = useState([]);
  const [office, setOffice] = useState([]);
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (user?.token) {
      getData();
      get("property/drop", { token: user?.token })
        .then(res => {
          if (res?.statusCode == 200)
            setProperties(res?.data);
        })
      get("office/drop", { token: user?.token })
        .then(res => {
          if (res?.statusCode == 200)
            setOffice(res?.data);
        })
      get("city/drop", { token: user?.token })
        .then(res => {
          if (res?.statusCode == 200)
            setCity(res?.data);
        })
      get("location/drop", { token: user?.token })
        .then(res => {
          if (res?.statusCode == 200)
            setLocation(res?.data);
        })
    }
  }, [user, path]);

  const getData = () => {
    get("testi/list")
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
      });
  }

  useEffect(() => {
    setColumns([
      {
        name: 'Image',
        cell: (row) => <>
          <img title={'logo'} src={row?.type == 'image' ? row?.image : "data:image/png;base64,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"} style={{ width: 50, height: 50 }} />
        </>,
      },
      {
        name: 'Name',
        selector: row => row?.name,
      },
      {
        name: 'Type',
        selector: row => row?.type,
      },
      {
        name: 'Rating',
        selector: row => row?.rating,
      },
      {
        cell: (row) => <>
          <Button onClick={() => handleUpdateStatus(row)}
            title={row?.isActive ? "Inactive" : "Active"}
            className={`btn_status ${row?.isActive && 'active'}`}
          >
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
          {checkPermission('testimonial', 'update') &&
            <Button onClick={() => handleUpdateEdit(row, 'bank')}
              title={"Edit"}
              style={{ backgroundColor: Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="ri-edit-fill" style={{ fontSize: 20 }}></span></Button>
          }
          {checkPermission('testimonial', 'delete') &&
            <Button onClick={() => handleDelete(row, 'bank')}
              title={"Delete"}
              style={{ backgroundColor: Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8 }}><span className="ri-delete-bin-6-line" style={{ fontSize: 20 }}></span></Button>
          }
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
      setType("image");
      setFile(null);
      setRating(0);
      setSelectedPlace([]);
      setSelectedCity([]);
      setSelectedLocation([]);
      setSelectedProperty([]);
      setSelectedOffice([]);
    }
  }, [isAddForm])

  const handleUpdateEdit = (proj) => {
    console.log('updating proj', proj);
    setType(proj?.type);
    setCurrentModalData(proj);
    setFile(proj?.image);
    setRating(proj?.rating);
    setImageChanged(false);
    if (proj?.placeTo?.length) {
      let temp = [];
      proj?.placeTo?.forEach(item => {
        temp.push({ title: item });
      });
      setSelectedPlace(temp);
    }
    if (proj?.cityId?.length) {
      let temp = [];
      proj?.cityId?.forEach(item => {
        let found = city?.find(x => x?._id == item);
        temp.push({ _id: item, title: found?.title });
      });
      setSelectedCity(temp);
    }
    if (proj?.locationId?.length) {
      let temp = [];
      proj?.locationId?.forEach(item => {
        let found = location?.find(x => x?._id == item);
        temp.push({ _id: item, title: found?.title });
      });
      setSelectedLocation(temp);
    }
    if (proj?.propertyId?.length) {
      let temp = [];
      proj?.propertyId?.forEach(item => {
        let found = properties?.find(x => x?._id == item);
        temp.push({ _id: item, title: found?.title });
      });
      setSelectedProperty(temp);
    }
    if (proj?.officeId?.length) {
      let temp = [];
      proj?.officeId?.forEach(item => {
        let found = office?.find(x => x?._id == item);
        temp.push({ _id: item, title: found?.title });
      });
      setSelectedOffice(temp);
    }
    setIsAddForm(true);
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
      testiId: currentModalData?._id,
      token: user?.token
    }
    post(`testi/delete`, body)
      .then(json => {
        console.log('response from delete user', json);
        if (json.statusCode == 200) {
          toast.success(json?.message);
          getData();
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
      testiId: currentModalData?._id,
      isActive: !currentModalData?.isActive,
      token: user?.token
    }
    let url = `testi/update`;
    put(url, body)
      .then(json => {
        console.log('response from delete user', json);
        setLoading(false);
        if (json.statusCode == 200) {
          toast.success(json?.message);
          getData();
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
        100,
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
    let body = {
      ...values,
      rating: rating,
      type,
      token: user?.token
    }
    let tempPlace = [];
    selectedPlace?.forEach((item) => {
      tempPlace.push(item?.title);
    });
    body = { ...body, placeTo: tempPlace };
    let tempCity = [];
    selectedCity?.forEach((item) => {
      tempCity.push(item?._id);
    });
    body = { ...body, cityId: tempCity };
    let tempLocation = [];
    selectedLocation?.forEach((item) => {
      tempLocation.push(item?._id);
    });
    body = { ...body, locationId: tempLocation };
    let tempProperty = [];
    selectedProperty?.forEach((item) => {
      tempProperty.push(item?._id);
    });
    body = { ...body, propertyId: tempProperty };
    let tempOffice = [];
    selectedOffice?.forEach((item) => {
      tempOffice.push(item?._id);
    });
    body = { ...body, officeId: tempOffice };
    if (currentModalData) {
      body = {
        ...body,
        testiId: currentModalData?._id,
      }
      if (type == 'image') {
        if (imageChanged) {
          const fileData = cropper?.current?.cropper?.getCroppedCanvas().toDataURL();
          const obj = await urltoFile(fileData, new Date().getTime() + '.png', 'image/png');
          const temp = await resizeFile(obj);
          const form = new FormData();
          form.append("image", temp);
          const image = await upload("testi/image_upload", form);
          body = { ...body, image: image?.data };
        }
      }
      put("testi/update", body)
        .then(json => {
          console.log('response from add month', json);
          setLoading(false);
          if (json.statusCode == 200) {
            toast.success(json?.message);
            getData();
            setFile(null);
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
        })
    } else {
      if (type == 'image') {
        if (imageChanged) {
          const fileData = cropper?.current?.cropper?.getCroppedCanvas().toDataURL();
          const obj = await urltoFile(fileData, new Date().getTime() + '.png', 'image/png');
          const temp = await resizeFile(obj);
          const form = new FormData();
          form.append("image", temp);
          const image = await upload("testi/image_upload", form);
          body = { ...body, image: image?.data };
        }
      }
      post("testi/add", body)
        .then(json => {
          console.log('response from add experience', json);
          setLoading(false);
          if (json.statusCode == 200) {
            toast.success(json?.message);
            getData();
            setFile(null);
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

  const onChangeFile = (e) => {
    console.log('getting event on input img', e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    setImageChanged(true);
  }

  const checkPermission = (to, type) => {
    if (user?.role == "Admin")
      return true;
    else if (user?.role == "Sub") {
      let permission = user?.permissions;
      let find = permission.find(x => Object.keys(x).includes(to))
      if (find)
        return find[to][type]
    } else {
      return false;

    }
  }

  // console.log("selected place", selectedPlace);

  return (
    <React.Fragment>
      <div className="">
        <Row>
          <DeleteModal
            show={deleteModal}
            onConfirm={() => currentModalData?.actionType == 'Status' ? onStatus() : onDelete()}
            onCloseClick={() => setDeleteModal(false)}
            actionType={currentModalData?.actionType}
            data={currentModalData}
          />
          {/* Add or Update depart form */}
          <Modal isOpen={isAddForm} toggle={() => { setIsAddForm(false); setFile(null) }} centered={true} style={{ maxWidth: 800 }}>
            <ModalBody className="py-3 px-5">
              <h5 className="text-black font-size-20">{currentModalData ? 'Update Testimonial!' : 'Add New Testimonial!'}</h5>
              <div className="p-2">
                <div style={{ borderBottom: '1px solid ' + Utils.themeColor, display: 'flex', justifyContent: 'space-evenly' }}>
                  <div style={{ width: '100%' }}>
                    {type == 'image' ?
                      <Button className="popup-btn active" style={{ backgroundColor: Utils.themeColor, width: '100%', border: 'none', outline: 'none', borderRadius: 0 }} ><span style={{ color: '#fff' }}>Image</span></Button>
                      :
                      <Button
                        className="popup-btn"
                        onClick={() => setType('image')}
                        style={{ width: '100%', backgroundColor: "transparent", border: 'none', outline: 'none', color: '#000 !important', borderRadius: 0 }} ><span style={{ color: '#000' }}>Image</span></Button>
                    }
                  </div>
                  <div style={{ width: '100%' }}>
                    {type == 'video' ?
                      <Button className="popup-btn active" style={{ backgroundColor: Utils.themeColor, width: '100%', border: 'none', outline: 'none', borderRadius: 0 }} ><span style={{ color: '#fff' }}>Video</span></Button>
                      :
                      <Button
                        className="popup-btn"
                        onClick={() => setType('video')}
                        style={{ width: '100%', backgroundColor: "transparent !important", border: 'none', outline: 'none', color: '#000 !important', borderRadius: 0 }} ><span style={{ color: '#000' }}>Video</span></Button>
                    }
                  </div>
                </div>
                <AvForm
                  className="form-horizontal"
                  onValidSubmit={(e, v) => {
                    handleValidSubmit(e, v)
                  }}
                >
                  {type == 'image' ?
                    <div className="mb-3 mt-4">
                      {file ?
                        <>
                          <CardTitle >Image</CardTitle>
                          <div style={{ flexDirection: 'row', position: 'relative', cursor: 'pointer', marginTop: 20, width: 400 }}>
                            {currentModalData?.image ?
                              <img src={file} style={{ width: 400, height: 'auto' }} />
                              :
                              <Cropper
                                style={{ height: 'auto', width: 400 }}
                                aspectRatio={400 / 250}
                                preview=".img-preview"
                                guides={true}
                                src={file}
                                ref={cropper}
                              />
                            }
                            <i className="fa fa-close" style={{
                              color: 'white', backgroundColor: Utils.themeColor, fontSize: 20,
                              position: 'absolute', top: -16, right: -15, borderRadius: 15, width: 30, height: 30, textAlign: 'center',
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
                          placeholder="upload bank logo"
                          type="file"
                          onChange={e => onChangeFile(e)}
                          multiple={false}
                          ref={imageInput}
                          accept="image/*"
                        // value={currentModalData?.logo}
                        />
                      }
                    </div>
                    :
                    <div className="mb-3 mt-4">
                      <AvField
                        name="video"
                        label="Video Url"
                        className="form-control"
                        placeholder="Enter video URL"
                        type="url"
                        required
                        value={currentModalData?.video}
                      />
                    </div>
                  }
                  <div className="mb-3">
                    <Col md={12} className='mb-4'>
                      <Label>Place To</Label>
                      <Multiselect
                        options={[
                          { title: "Home" },
                          { title: "City" },
                          { title: "Location" },
                          { title: "Property" },
                          { title: "Office" },
                          { title: "About-Us" },
                          { title: "Contact-Us" },
                          { title: "Our-Solution" }
                        ]} // Options to display in the dropdown
                        selectedValues={selectedPlace} // Preselected value to persist in dropdown
                        onSelect={(list, item) => setSelectedPlace(list)} // Function will trigger on select event
                        onRemove={(list, item) => setSelectedPlace(list)}
                        displayValue="title" // Property name to display in the dropdown options
                      />
                    </Col>
                    {/* <AvField
                      name="placeto"
                      label="Place To"
                      className="form-control"
                      type="select"
                      required
                      onChange={(e) => setPlaceTo(e?.target?.value)}
                      value={currentModalData?.placeTo}
                    >
                      <option value="">Select where to place</option>
                      <option value="Home">Home</option>
                      <option value="City">City</option>
                      <option value="Location">Location</option>
                      <option value="Property">Property</option>
                      <option value="Office">Office</option>
                    </AvField>*/}
                  </div>
                  {selectedPlace?.length ? selectedPlace.findIndex(x => x?.title == "City") != -1 &&
                    <div className="mb-3">
                      <Label>City</Label>
                      <Multiselect
                        options={city} // Options to display in the dropdown
                        selectedValues={selectedCity} // Preselected value to persist in dropdown
                        onSelect={(list, item) => setSelectedCity(list)} // Function will trigger on select event
                        onRemove={(list, item) => setSelectedCity(list)} // Function will trigger on select event
                        displayValue="title" // Property name to display in the dropdown options
                      />
                    </div>
                    // <AvField
                    //   name="selectedCity"
                    //   label={"City"}
                    //   className="form-control"
                    //   type="select"
                    //   required
                    //   value={currentModalData?.selectedCity}
                    // >
                    //   <option value="">Select City</option>
                    //   {placeTo == "Property" &&
                    //     <>
                    //       {properties?.map((item) => (
                    //         <option value={item?._id}>{item?.title}</option>
                    //       ))}
                    //     </>
                    //   }
                    //   {placeTo == "Office" &&
                    //     <>
                    //       {office?.map((item) => (
                    //         <option value={item?._id}>{item?.title}</option>
                    //       ))}
                    //     </>
                    //   }
                    //   {placeTo == "City" &&
                    //     <>
                    //       {city?.map((item) => (
                    //         <option value={item?._id}>{item?.title}</option>
                    //       ))}
                    //     </>
                    //   }
                    //   {placeTo == "Location" &&
                    //     <>
                    //       {location?.map((item) => (
                    //         <option value={item?._id}>{item?.title}</option>
                    //       ))}
                    //     </>
                    //   }
                    // </AvField>
                    : null}
                  {selectedPlace?.length ? selectedPlace.findIndex(x => x?.title == "Location") != -1 &&
                    <div className="mb-3">
                      <Label>Location</Label>
                      <Multiselect
                        options={location} // Options to display in the dropdown
                        selectedValues={selectedLocation} // Preselected value to persist in dropdown
                        onSelect={(list, item) => setSelectedLocation(list)} // Function will trigger on select event
                        onRemove={(list, item) => setSelectedLocation(list)} // Function will trigger on select event
                        displayValue="title" // Property name to display in the dropdown options
                      />
                    </div>
                    : null}
                  {selectedPlace?.length ? selectedPlace.findIndex(x => x?.title == "Property") != -1 &&
                    <div className="mb-3">
                      <Label>Property</Label>
                      <Multiselect
                        options={properties} // Options to display in the dropdown
                        selectedValues={selectedProperty} // Preselected value to persist in dropdown
                        onSelect={(list, item) => setSelectedProperty(list)} // Function will trigger on select event
                        onRemove={(list, item) => setSelectedProperty(list)} // Function will trigger on select event
                        displayValue="title" // Property name to display in the dropdown options
                      />
                    </div>
                    : null}
                  {selectedPlace?.length ? selectedPlace.findIndex(x => x?.title == "Office") != -1 &&
                    <div className="mb-3">
                      <Label>Office</Label>
                      <Multiselect
                        options={office} // Options to display in the dropdown
                        selectedValues={selectedOffice} // Preselected value to persist in dropdown
                        onSelect={(list, item) => setSelectedOffice(list)} // Function will trigger on select event
                        onRemove={(list, item) => setSelectedOffice(list)} // Function will trigger on select event
                        displayValue="title" // Property name to display in the dropdown options
                      />
                    </div>
                    : null}
                  <div className="mb-3">
                    <AvField
                      name="name"
                      label="Customer Name"
                      className="form-control"
                      placeholder="Enter customer name"
                      type="text"
                      required
                      value={currentModalData?.name}
                    />
                  </div>
                  <div className="mb-3">
                    <AvField
                      name="desig"
                      label="Designation"
                      className="form-control"
                      placeholder="Enter Designation"
                      type="text"
                      required
                      value={currentModalData?.desig}
                    />
                  </div>

                  {/* <div className="mb-3">
                    <AvField
                      name="date"
                      label="Date"
                      className="form-control"
                      placeholder="Enter date"
                      type="date"
                      required
                      value={currentModalData?.date}
                    />
                  </div> */}
                  <div className="mb-3">
                    <AvField
                      name="desc"
                      label="Overview"
                      className="form-control"
                      placeholder="Enter overview"
                      type="textarea"
                      row={2}
                      value={currentModalData?.desc}
                    />
                  </div>
                  <Label>Rating</Label>
                  <div className="mb-3">
                    <Rating
                      emptySymbol="ri ri-star-line fs-4"
                      fullSymbol="ri ri-star-fill fs-4"
                      initialRating={rating}
                      // fractions={2}
                      // onChange={(val) => setRating(val)}
                      onChange={(val) => setRating(val)}
                    />
                  </div>
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
                </AvForm>
              </div>
            </ModalBody>
          </Modal>

          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className='mb-4'>
                  <Col md={11}>
                    <CardTitle><b>{props.role}</b></CardTitle>
                    <CardSubtitle className="mb-3">
                      {role} you have added before, All the <code>Testimonial </code> will be shown to user-end.
                    </CardSubtitle>
                  </Col>
                  {checkPermission('testimonial', 'write') &&
                    <Col md={1}>
                      <div className='action-btn'>
                        <Button type="button" className="btn-add" onClick={() => { setCurrentModalData(null); setIsAddForm(true) }}><i className={'ri-add-fill'} /></Button>
                      </div>
                    </Col>
                  }
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
              </CardBody>
            </Card>
          </Col>

          {/* <UiRating /> */}
        </Row>
      </div >

    </React.Fragment >
  )
}

export default Table;
