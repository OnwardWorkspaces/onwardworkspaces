import React, { useEffect, useState } from 'react';
import Header from '../../layouts/Header'
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col, Modal, ModalBody, Table } from 'reactstrap'
import { Button } from 'react-bootstrap';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { del, get, post, put } from '../../helper/api_helper';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import ConfirmModal from '../../components/ConfirmModal';
import Footer from '../../layouts/Footer';
import moment from 'moment';

export default function Lead() {

    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [currentData, setCurrentData] = useState(null);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (user?.token)
            getData();
    }, [user]);

    useEffect(() => {
        // setColumns([
        //     {
        //         name: "Name",
        //         selector: row => row?.name,
        //         maxWidth: '200px',
        //         sortable: true
        //     },
        //     {
        //         name: 'Email',
        //         selector: row => row?.email,
        //         maxWidth: '250px',
        //         sortable: true
        //     },
        //     {
        //         name: 'Mobile',
        //         selector: row => row?.mobile,
        //         // maxWidth: '180px',
        //         sortable: true
        //     },
        //     {
        //         name: 'From',
        //         selector: row => row?.from,
        //         // maxWidth: '180px',
        //         sortable: true
        //     },
        //     {
        //         name: 'Created At',
        //         selector: row => moment(row?.createdAt).format("DD-MMM-YYYY hh:mm a"),
        //         maxWidth: '180px',
        //         sortable: true
        //     },
        //     {
        //         cell: (row) => <>
        //             <Button onClick={() => handleDeleteProj(row)}
        //                 title={"Delete"}
        //                 style={{ marginRight: 10, padding: 5, paddingLeft: 8, paddingRight: 8, border: 'none' }}><span className="ri-delete-bin-6-line" style={{ fontSize: 20 }}></span></Button>
        //         </>,
        //         name: 'Action',
        //         ignoreRowClick: true,
        //         maxWidth: '100px'
        //     },
        // ])
        if (data?.length) {
            let column = [];
            let obj = data[0].form;
            obj?.forEach((item) => {
                column.push({
                    name: item?.title,
                    selector: row => row?.form?.find(x => x.title == item?.title)?.value,
                    cell: (row) => <span title={row?.form?.find(x => x.title == item?.title)?.value}>
                        {row?.form?.find(x => x.title == item?.title)?.value?.length > 75 ? row?.form?.find(x => x.title == item?.title)?.value?.substring(0, 75) + "..." : row?.form?.find(x => x.title == item?.title)?.value}
                    </span>
                });
            });
            column.push({
                name: "From",
                selector: row => row?.from,
            })
            column.push({
                name: "Created At",
                selector: row => moment(row?.createdAt).format("DD MMM, YYYY hh:mm a"),
            })
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

    const getData = () => {
        if (!loading) {
            setLoading(true);
            get("lead", { token: user?.token })
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

    const handleDeleteProj = (row) => {
        setCurrentData({ ...row, actionType: "Delete" });
        setConfirm(true);
    }

    const onConfirm = () => {
        if (!loading) {
            setLoading(true);
            let body = {
                leadId: currentData?._id,
                token: user?.token
            }
            if (currentData?.actionType == 'Status') {
                body = { ...body, isActive: !currentData?.isActive }
                put("lead", body)
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
                del("lead", body)
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
            <div className="main main-app p-3 p-lg-4">
                <Card>
                    <Row className='mb-4'>
                        <Col md={11}>
                            <CardBody>
                                <CardTitle><b>Leads</b></CardTitle>
                                <CardSubtitle>Users who have filled the lead form</CardSubtitle>
                            </CardBody>
                        </Col>
                    </Row>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        expandableRows
                        expandableRowsComponent={({ data }) =>
                            <div className='expended_box'>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Interested In
                                            </th>
                                            <th>
                                                Form Position
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {data?.interestedIn}
                                            </td>
                                            <td>
                                                {data?.formPosition}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        }
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
