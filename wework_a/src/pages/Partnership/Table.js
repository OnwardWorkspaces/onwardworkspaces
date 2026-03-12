import React, { useEffect, useState, useRef } from 'react'
import Header from '../../layouts/Header'
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col, Modal, ModalBody } from 'reactstrap'
import { Button } from 'react-bootstrap';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { del, get, post, put, upload } from '../../helper/api_helper';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import ConfirmModal from '../../components/ConfirmModal';
import Footer from '../../layouts/Footer';

function PartnerForms() {

    const user = useSelector(state => state.user);
    const [isAdd, setIsAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentData, setCurrentData] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [file, setFile] = useState(null);
    const imagePickerRef = useRef();

    useEffect(() => {
        if (user?.token)
            getData();
    }, [user]);

    useEffect(() => {
        if (data?.length) {
            let column = [];
            let obj = data[0].form;
            obj?.forEach((item) => {
                column.push({
                    name: item?.title,
                    selector: row => row?.form.find(x => x.title == item?.title)?.value,
                });
            });
            column.push({
                cell: (row) => <>
                    <Button onClick={() => handleDeleteProj(row)}
                        title={"Delete"}
                        style={{ marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8, border: 'none' }}><span className="ri-delete-bin-6-line" style={{ fontSize: 20 }}></span></Button>
                </>,
                name: 'Action',
                ignoreRowClick: true,
                maxWidth: '130px'
            });
            setColumns(column);
        }
    }, [data]);

    useEffect(() => {
        if (!isAdd) {
            setFile(null);
            setCurrentData(null);
        }
    }, [isAdd]);

    const getData = () => {
        if (!loading) {
            setLoading(true);
            get("partner/form", { token: user?.token })
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

    const handleUpdateStatus = (row) => {
        setCurrentData({ ...row, actionType: "Status" });
        setConfirm(true);
    }

    const handleUpdateProj = (row) => {
        setCurrentData(row);
        setFile(row?.image);
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
                formId: currentData?._id,
                token: user?.token
            }
            del("partner/form", body)
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
            <div className="main main-app p-3 p-lg-4">
                <Card>
                    <Row className='mb-4'>
                        <Col md={11}>
                            <CardBody>
                                <CardTitle><b>Forms</b></CardTitle>
                                <CardSubtitle>Forms you have added before</CardSubtitle>
                            </CardBody>
                        </Col>
                        {
                            checkPermission('clientale', 'write') &&
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
        </React.Fragment>
    )
}

export default PartnerForms;