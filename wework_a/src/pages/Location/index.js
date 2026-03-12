import React, { useEffect, useState } from 'react'
import Header from '../../layouts/Header'
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from 'reactstrap'
import { Button } from 'react-bootstrap';
import { del, get, post, put } from '../../helper/api_helper';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import ConfirmModal from '../../components/ConfirmModal';
import Footer from '../../layouts/Footer';
import AddLocation from "./Add";
import * as Utils from "../../Utils";

function Location() {

    const user = useSelector(state => state.user);
    const [isAdd, setIsAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentData, setCurrentData] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (user?.token) {
            getData();
            getCities();
        }
    }, [user]);

    useEffect(() => {
        setColumns([
            {
                name: 'Title',
                selector: row => row.title,
                sortable: true
            },
            {
                name: 'City',
                selector: row => row?.city,
                maxWidth: '110px',
                sortable: true
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
                maxWidth: '110px'
            },
            {
                cell: (row) => <>
                    {/* <Button onClick={() => props?.history.push(`/product/` + row?._id)}
                title={"View"}
                style={{ backgroundColor: Utils.themeColor, marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8, border: 'none' }}><span className="mdi mdi-eye" style={{ fontSize: 20 }}></span></Button> */}
                    {checkPermission('location', 'update') &&
                        <Button onClick={() => handleUpdateProj(row)}
                            title={"Edit"}
                            style={{ marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8, border: 'none' }}><span className="ri-edit-fill" style={{ fontSize: 20 }}></span></Button>
                    }
                    {checkPermission('location', 'delete') &&
                        <Button onClick={() => handleDeleteProj(row)}
                            title={"Delete"}
                            style={{ marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8, border: 'none' }}><span className="ri-delete-bin-6-line" style={{ fontSize: 20 }}></span></Button>
                    }
                </>,
                name: 'Action',
                ignoreRowClick: true,
                maxWidth: '130px'
            },
        ])
    }, [data]);

    const getData = () => {
        if (!loading) {
            setLoading(true);
            get("location", { token: user?.token })
                .then(res => {
                    setLoading(false);
                    if (res?.statusCode == 200) {
                        setData(res?.data);
                    }
                })
                .catch(err => {
                    setLoading(false);
                    toast.error("Something Went Wrong!");
                })
        }
    }

    const getCities = () => {
        get("city", { token: user?.token })
            .then(res => {
                setLoading(false);
                if (res?.statusCode == 200) {
                    setCities(res?.data);
                }
            })
            .catch(err => {
                setLoading(false);
                toast.error("Something Went Wrong!");
            })
    }

    const handleValidSubmit = (e, v) => {
        if (!loading) {
            setLoading(true);
            let body = {
                ...v,
                token: user?.token
            }
            if (currentData?._id) {
                body = { ...body, locationId: currentData?._id }
                put("location", body)
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
                post("location", body)
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

    const handleUpdateStatus = (row) => {
        setCurrentData({ ...row, actionType: "Status" });
        setConfirm(true);
    }

    const handleUpdateProj = (row) => {
        if (!row?.seo)
        row.seo = Utils?.dummySeo;
        setCurrentData(row);
        setIsAdd(true);
    }

    const handleDeleteProj = (row) => {
        setCurrentData({ ...row, actionType: "Delete" });
        setConfirm(true);
    }

    const onConfirm = () => {
        if (!loading) {
            setLoading(true);
            let body = {
                locationId: currentData?._id,
                token: user?.token
            }
            if (currentData?.actionType == 'Status') {
                body = { ...body, isActive: !currentData?.isActive }
                put("location", body)
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
                del("location", body)
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


    return (
        <React.Fragment>
            <Header />
            <ConfirmModal
                show={confirm}
                onConfirm={onConfirm}
                onCloseClick={() => setConfirm(false)}
                data={currentData}
            />
            {!isAdd ?
                <div className="main main-app p-3 p-lg-4">
                    <Card>
                        <Row className='mb-4'>
                            <Col md={11}>
                                <CardBody>
                                    <CardTitle><b>Location</b></CardTitle>
                                    <CardSubtitle>Location you have added before all the locations and properties lie on <code>Location.</code></CardSubtitle>
                                </CardBody>
                            </Col>
                            {checkPermission('location', 'write') &&
                                <Col md={1}>
                                    <div className='action-btn'>
                                        <Button type="button" className="btn-add" onClick={() => { setCurrentData(null); setIsAdd(true) }}><i className={'ri-add-fill'} /></Button>
                                    </div>
                                </Col>
                            }
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
                        />
                    </Card>
                    <Footer />
                </div>
                :
                <AddLocation
                    user={user}
                    setIsAdd={setIsAdd}
                    loading={loading}
                    setLoading={setLoading}
                    getData={getData}
                    cities={cities}
                    currentData={currentData}
                />
            }
        </React.Fragment>
    )
}

export default Location;
