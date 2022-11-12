import React, { useState, useRef, useEffect } from 'react'
import {
    CRow,
    CCol,
    CButton,
    CBreadcrumb,
    CBreadcrumbItem,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Typography from '@mui/material/Typography';
import { DeleteTwoTone, SearchOutlined, EyeTwoTone, EditTwoTone, OrderedListOutlined, PrinterTwoTone } from '@ant-design/icons';
import { Table, Space, Button, Input, Badge, message, Radio } from 'antd';
import { Tooltip } from 'antd';
import jsPDF from "jspdf";
import Highlighter from 'react-highlight-words';
import 'jspdf-autotable'
import axios from "axios";
import url from '../url'
function SupplyOrders() {
    const [size, setSize] = useState('');
    // Get all 
    const [data, setData] = useState([]);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);

    const getAllData = () => {
        axios.get(`${url}customer/getAllSupplyOrder`)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllData1 = () => {
        axios.get(`${url}customer/getAllCustomers`)
            .then((response) => {
                console.log(response.data);
                setDataCustomer(response.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllDataProduct = () => {
        axios.get(`${url}inventory/getAllProducts`)
            .then((response) => {
                console.log(response.data);
                setDataProduct(response.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData();
        getAllData1();
        getAllDataProduct();

    }, []);

    const columns1 = [
        {
            title: 'Name',
            dataIndex: 'productName',
            key: 'productName',
            width: '20%',
        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            width: '10%',
        },

        {
            title: 'Packing',
            dataIndex: 'packing',
            key: 'packing',
            width: '10%',
        },
        {
            title: 'Rate Per Unit',
            dataIndex: 'ratePerUnit',
            key: 'ratePerUnit',
            width: '10%',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10%',
        }, {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: '10%',
        },
        {
            title: 'Action',
            width: '10%',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Update">

                        <h6 className='linkBtn' onClick={() => {
                            EditProductOrder(record._id)
                        }}><EditTwoTone /></h6>
                    </Tooltip>
                    <Tooltip title="Delete">

                        <h6 className='linkBtn' onClick={() => {
                            DeleteOrderProduct(record._id)
                        }}><DeleteTwoTone twoToneColor="red" />
                        </h6>
                    </Tooltip>
                </Space>
            ),
        },

    ];
    // ADD MRP 
    const addOrderProduct = () => {
        axios.post(`${url}customer/createOrderProduct`, {
            productId: productIDD,
            supplyOrderId: supplyOrderId,
            packing: packing,
            ratePerUnit: ratePerUnit,
            quantity: quantity,

        }, { headers }).then(response => {
            console.log(response)
            if (response.data === "Product Already Exist for this Supply Order") {
                console.log("Added Already")
            } else {
                setDataProduct([]);
                setsupplyOrderId('')
                setpacking('')
                setratePerUnit('')
                setproductIDD('')
                setquantity('');
                settotalAmount('')
                OrderedProducts(supplyOrderId)
            }

            // MRPData(response.data.productId)
        })
            .catch(err => {
                console.log(err)
            })
    }
    // ADD MRP 
    const updateOrderProduct = () => {
        settotalAmountEdit(quantityEdit * amountEdit)
        axios.put(`${url}customer/updateOrderProduct`, {
            _id: orderProductIdEdit,
            packing: packingEdit,
            ratePerUnit: ratePerUnitEdit,
            quantity: quantityEdit,
            amount: amountEdit,
            totalAmount: totalAmountEdit
            // customerId: customerEdit,
            // packing: MRPEdit,

        }, { headers }).then(response => {
            console.log(response);
            // MRPData(ProductIDEdit)
            setshowHideDemoAdd(true)
            setshowHideDemo2(false)
            OrderedProducts(supplyOrderIdEdit)
        })
            .catch(err => {
                console.log(err)
            })
    }
    const DeleteOrderProduct = (idData) => {
        axios.delete(`${url}customer/removeOrderproduct`, {
            data: {
                _id: idData
            }
        }, { headers })
            .then(res => {
                console.log(res);
                console.log(res.data);
                // MRPData(productIDD)
                OrderedProducts(supplyOrderId)

            }).catch(err => {
                console.log(err)
            })
    }
    const EditProductOrder = (idData) => {
        // setshowHideDemo2(false)
        setshowHideDemoAdd(false)
        axios.get(`${url}customer/getOrderProduct`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log(response)
                setproductIDDEdit(response.data.productId)
                settotalAmountEdit(response.data.totalAmount)
                setpackingEdit(response.data.packing)
                setamountEdit(response.data.amount)
                setratePerUnitEdit(response.data.ratePerUnit)
                setsupplyOrderIdEdit(response.data.supplyOrderId)
                setquantityEdit(response.data.quantity)
                setorderProductIdEdit(response.data._id)
                // setcustomerEdit(response.data.customerId._id)
                // setMRPEdit(response.data.packing)
                setshowHideDemo2(true)
                message.success("Order Updated Successfully")
            })
            .catch(error => console.error(`Error:${error}`));
    }
    const [supplyOrderId, setsupplyOrderId] = useState('');
    const [packing, setpacking] = useState('');
    const [ratePerUnit, setratePerUnit] = useState('');
    const [quantity, setquantity] = useState('');
    const [amount, setamount] = useState('');
    const [totalAmount, settotalAmount] = useState('');
    const [visibleViewMRP, setVisibleViewMRP] = useState(false)
    const [showHideDemoAdd, setshowHideDemoAdd] = useState(true)
    const [supplyOrderIdEdit, setsupplyOrderIdEdit] = useState('');
    const [packingEdit, setpackingEdit] = useState('');
    const [ratePerUnitEdit, setratePerUnitEdit] = useState('');
    const [quantityEdit, setquantityEdit] = useState('');
    const [amountEdit, setamountEdit] = useState('');
    const [totalAmountEdit, settotalAmountEdit] = useState('');
    const [productIDDEdit, setproductIDDEdit] = useState('')
    const [orderProductIdEdit, setorderProductIdEdit] = useState('')
    const [showHideDemo2, setshowHideDemo2] = useState(false)
    const [data1, setData1] = useState([]);

    const [productIDD, setproductIDD] = useState('')
    const OrderedProducts = (idData) => {
        setsupplyOrderId(idData)
        axios.get(`${url}customer/getProductSupplyOrder`, {
            params: {
                supplyOrderId: idData
            }
        })
            .then((response) => {
                console.log(response)
                if (response.data.length === 0) {
                    console.log("empty")
                    setData1([]);
                    setVisibleViewMRP(true)


                } else {
                    setData1(response.data);
                    setVisibleViewMRP(true)
                    console.log("emptysddsd")
                }

            })
            .catch(error => console.error(`Error:${error}`));
    }
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                  
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
       
        {
            title: 'Category',
            dataIndex: 'SPCategory',
            key: 'SPCategory',
            width: '20%',
        },
        {
            title: 'Ref No',
            dataIndex: 'refNumber',
            key: 'refNumber',
            width: '20%',
            ...getColumnSearchProps('refNumber'),

        },
        {
            title: 'Date of order',
            dataIndex: 'dateOfOrder',
            key: 'dateOfOrder',
            width: '20%',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">
                    {/* Verify User */}

                    {record.Status === "Pending" ? <Badge count='Pending' style={{
                        backgroundColor: 'orange',
                    }} />
                        : null}
                    {record.Status === "Partial" ? <Badge count='Partial' style={{
                        backgroundColor: 'grey',
                    }} />
                        : null}
                    {record.Status === "Completed" ? <Badge count='Completed' style={{
                        backgroundColor: '#52c41a',
                    }} />
                        : null}
                </Space>
            ),
        },

        {
            title: 'Type Of Order',
            dataIndex: 'typeOforder',
            key: 'typeOforder',
            width: '20%',
            // ...getColumnSearchProps('orderValidTill'),
            render: (_, record) => (
                <Space size="middle">
                    {/* Verify User */}

                    {record.typeOforder === "Market" ? <Badge count='Market' style={{
                        backgroundColor: '#52c41a',
                    }} />
                        : null}
                    {record.typeOforder === "Institutional" ? <Badge count='Institutional' style={{
                        backgroundColor: 'orange',
                    }} />
                        : null}
                    {record.typeOforder === "Others" ? <Badge count='Others' style={{
                        backgroundColor: 'blue',
                    }} />
                        : null}
                </Space>
            ),
        },
        {
            title: 'Action',
            width: '50%',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Update">

                        <h6 className='linkBtn' onClick={() => {
                            EditData(record._id)
                        }}><EditTwoTone /></h6>

                    </Tooltip>
                    <Tooltip title="Ordered Products">

                        <h6 className='linkBtn' onClick={() => {
                            OrderedProducts(record._id)
                        }}><OrderedListOutlined twoToneColor="green" />
                        </h6>
                    </Tooltip>
                    <Tooltip title="Generate Report">
                        <h6 className='linkBtn' onClick={() => {
                            PrintData(record._id)

                        }}><PrinterTwoTone twoToneColor="orange" /></h6>
                    </Tooltip>
                    <Tooltip title="View">
                        <h6 className='linkBtn' onClick={() => {
                            ViewData(record._id)
                        }}><EyeTwoTone twoToneColor="grey" /></h6>
                    </Tooltip>
                    <Tooltip title="Delete">

                        <h6 className='linkBtn' onClick={() => {
                            deleteData(record._id)
                        }}><DeleteTwoTone twoToneColor="red" />
                        </h6>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    const columnsPdf = [
       
        {
            title: 'Batch No',
            dataIndex: 'batchNo',
            key: 'batchNo',
            width: '20%',
        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            width: '20%',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            width: '20%',
        },
        {
            title: 'Packing',
            dataIndex: 'packing',
            key: 'packing',
            width: '20%',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '20%',
        },
        {
            title: 'Rate Per Unit',
            dataIndex: 'ratePerUnit',
            key: 'ratePerUnit',
            width: '20%',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: '20%',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: '20%',
        },

    ];
    //   Validation 
    const [validated, setValidated] = useState(false)
    // Model Add
    const [visible, setVisible] = useState(false)
    const [customerId, setcustomerId] = useState('');
    const [productId, setProductId] = useState('');
    const [SPCategory, setSPCategory] = useState('');
    const [dateOfOrder, setdateOfOrder] = useState(new Date());
    const [typeOforder, settypeOforder] = useState('');
    const [specialInstructions, setspecialInstructions] = useState();
    const [orderValidTill, setorderValidTill] = useState(new Date());

    const headers = {
        'Content-Type': 'application/json'
    }
    const submitHandler = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()

        }
        setValidated(true)
        if (customerId === '' || dateOfOrder === '' || typeOforder === '' || specialInstructions === '' || orderValidTill === '') {
            console.log('fill all fields')
        } else {
            // POst Request Create Driver
            axios.post(`${url}customer/addSupplyOrder`, {
                customerId: customerId,
                // SPCategory: SPCategory,
                dateOfOrder: dateOfOrder,
                typeOforder: typeOforder,
                specialInstructions: specialInstructions,
                orderValidTill: orderValidTill,

            }, { headers }).then(response => {
                console.log(response)
                setVisible(false)
                getAllData();
                setcustomerId('');
                setSPCategory('');
                setdateOfOrder(new Date());
                settypeOforder('');
                setspecialInstructions('');
                setorderValidTill(new Date());
                setValidated(false)


            })
                .catch(err => {
                    console.log(err)
                })
        }

    }
    // Delete 
    const deleteDataProduct = () => {
        setVisibleDelete(false)
        axios.delete(`${url}customer/removeSupplyOrder`, {
            data: {
                _id: productId
            }
        }, { headers })
            .then(res => {
                console.log(res);
                console.log(res.data);
                getAllData();
            }).catch(err => {
                console.log(err)
            })
    }

    const [visibleDelete, setVisibleDelete] = useState(false)
    const deleteData = (idData) => {
        setVisibleDelete(true)
        setProductId(idData)
    }
    // Update 
    const UpdateProductData = () => {
        setVisibleEdit(false)
        axios.put(`${url}customer/updateSupplyOrder`, {
            _id: productIdEdit,
            customerId: customerIdEdit,
            SPCategory: SPCategoryEdit,
            dateOfOrder: dateOfOrderEdit,
            typeOforder: typeOforderEdit,
            specialInstructions: specialInstructionsEdit,
            orderValidTill: orderValidTillEdit,

        }, { headers }).then(response => {
            console.log(response);
            getAllData()

        })
            .catch(err => {
                console.log(err)
            })
    }
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [customerIdEdit, setcustomerIdEdit] = useState('');

    const [productIdEdit, setProductIdEdit] = useState('');
    const [refNumberEdit, setrefNumberEdit] = useState('');
    const [SPCategoryEdit, setSPCategoryEdit] = useState('');
    const [dateOfOrderEdit, setdateOfOrderEdit] = useState(new Date());
    const [typeOforderEdit, settypeOforderEdit] = useState('');
    const [specialInstructionsEdit, setspecialInstructionsEdit] = useState('');
    const [orderValidTillEdit, setorderValidTillEdit] = useState(new Date());
    const EditData = (idData) => {
        axios.get(`${url}customer/getSupplyOrder`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setProductIdEdit(response.data._id)
                setcustomerIdEdit(response.data.customerId)
                setrefNumberEdit(response.data.refNumber)
                setSPCategoryEdit(response.data.SPCategory)
                setdateOfOrderEdit(response.data.dateOfOrder)
                settypeOforderEdit(response.data.typeOforder)
                setspecialInstructionsEdit(response.data.specialInstructions)
                setorderValidTillEdit(response.data.orderValidTill)
            })
            .catch(error => console.error(`Error:${error}`));
        setVisibleEdit(true)
    }
    // View 
    const [visibleView, setVisibleView] = useState(false)

    const ViewData = (idData) => {
        axios.get(`${url}customer/getSupplyOrder`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setProductIdEdit(response.data._id)
                setcustomerIdEdit(response.data.customerId)
                setrefNumberEdit(response.data.refNumber)
                setSPCategoryEdit(response.data.SPCategory)
                setdateOfOrderEdit(response.data.dateOfOrder)
                settypeOforderEdit(response.data.typeOforder)
                setspecialInstructionsEdit(response.data.specialInstructions)
                setorderValidTillEdit(response.data.orderValidTill)
                setVisibleView(true)
            })
            .catch(error => console.error(`Error:${error}`));
    }

    const [pdfRef, setPdfRef] = useState('')
    const [pdfDate, setPdfDate] = useState('')
    const [pdfValid, setPdfValid] = useState('')
    const [pdfSOData, setPdfSOData] = useState('')
    const pdfHead = "Supply Order Details"

    const PrintData = (idData) => {

        console.log(idData)
        axios.get(`${url}customer/getSupplyOrder`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setPdfSOData(response.data.orderedProductId)
                setPdfRef(response.data.refNumber)
                setPdfDate(response.data.dateOfOrder)
                setPdfValid(response.data.orderValidTill)

            })
            .catch(error => console.error(`Error:${error}`));
        if (pdfSOData.length === 0 || pdfRef === '' || pdfDate === '' || pdfValid === '') {
            message.error('Could Not Export Your Data Right Now! Try Again Later')
        } else {
            const doc = new jsPDF('p', 'mm', 'a4');
            doc.setFontType('bold');
            doc.setFontSize(12)
            doc.text(pdfHead, 80, 10)
            doc.setFontType('normal');
            doc.setFontSize(9)
            doc.text("Ref No :", 20, 20)
            doc.text(pdfRef, 32, 20)
            doc.text("Date of Order :", 20, 30)
            doc.text(pdfDate, 42, 30)
            doc.text("Order Valid Till :", 20, 40)
            doc.text(pdfValid, 45, 40)
            doc.setFontType('bold');
            doc.setFontSize(12)
            doc.text("Ordered Product Details", 80, 50)
            doc.autoTable({
                startY: 60,
                theme: 'grid',
                columns: columnsPdf.map(col => ({ ...col, dataKey: col.dataIndex })),
                body: pdfSOData
            })
            // doc.save("Supply Order Details.pdf")
            var string = doc.output('datauristring');
            var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
            var x = window.open();
            x.document.open();
            x.document.write(embed);
            x.document.close();
        }

    };
    const [DateToday, setDateToday] = useState(new Date());
    const ReportDMW = (valueData) => {
        if (valueData === "Daily") {
            axios.get(`${url}customer/getDailySupplyOrder`, {
                params: {
                    dateOfOrder: DateToday
                }
            })
                .then((response) => {
                    console.log('History')
                    const allData = response.data;
                    console.log(allData);
                    setData(response.data)
                    setSize(valueData)

                })
                .catch(error => console.error(`Error:${error}`));

            // setData

        } else if (valueData === "Weekly") {
            setSize(valueData)

        } else {
            setSize(valueData)
        }
    }

    return (
        <>

            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }} >
                <CCol xs>
                    <CBreadcrumb style={{ marginBottom: '40px' }}>
                        <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
                        <CBreadcrumbItem active>Supply Orders</CBreadcrumbItem>
                    </CBreadcrumb>

                </CCol>
            </CRow>
            <CRow xs={{ cols: 2, gutter: 4 }} md={{ cols: 6 }}>
                <CCol xs style={{ flexGrow: 1 }}>
                    <h4>Supply Orders</h4>
                </CCol>

                <CCol xs style={{ flexGrow: 2 }}>
                    <Radio.Group value={size} onChange={(e) => ReportDMW(e.target.value)}>
                        <Radio.Button value="Daily">Daily</Radio.Button>
                        <Radio.Button value="Weekly">Weekly</Radio.Button>
                        <Radio.Button value="Monthly">Monthly</Radio.Button>
                    </Radio.Group>
                </CCol>  
                <CCol xs>
                    <CButton style={{ marginTop: '-20px' }} color="primary" onClick={() => setVisible(!visible)}>+ Order</CButton>
                </CCol>
            </CRow>
            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 12 }}>
                <div className='tableResponsive'>
                    <Table columns={columns} dataSource={data} size='small' bordered/>
                </div>
            </CRow>
            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }}>
                {/* Delete  */}
                <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
                    <CModalHeader onClose={() => setVisibleDelete(false)}>
                        <CModalTitle>Delete order</CModalTitle>
                    </CModalHeader>
                    <CModalBody>Are you sure you want to delete this Order!</CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                            No
                        </CButton>
                        <CButton color="primary" onClick={deleteDataProduct}>Yes</CButton>
                    </CModalFooter>
                </CModal>
                {/* View  */}
                <CModal visible={visibleView} onClose={() => setVisibleView(false)}>
                    <CModalHeader onClose={() => setVisibleView(false)}>
                        <CModalTitle> Supply Order Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {/* <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                            <CCol xs>
                                <h6>Name:</h6>
                                <h6>Cnic:</h6>
                                <h6>Age:</h6>
                                <h6>Qualification:</h6>
                                <h6>Roles:</h6>
                                <h6>Salary:</h6>
                                <h6>Gender:</h6>
                                <h6>Dob:</h6>
                                <h6>Attendence Record:</h6>
                                </CCol>
                            <CCol xs>
                                <h6>{refNumberEdit}</h6>
                                <h6>{customerIdEdit}</h6>
                                <h6>{SPCategoryEdit}</h6>
                                <h6>{employeeQualificationEdit}</h6>
                                <h6>{orderValidTillEdit}</h6>
                                <h6>{dateOfOrderEdit}</h6>
                                <h6>{typeOforderEdit}</h6>
                                <h6>{specialInstructionsEdit}</h6>
                                <h6>{attendenceRecordEdit}</h6>
                            </CCol>
                        </CRow> */}
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                                <CCol xs>

                                    <CFormInput
                                        type="text"
                                        id="refNumber"
                                        label="Ref Number"
                                        // placeholder="Enter Name"
                                        aria-describedby="refNumber"
                                        required className='itemPadding'
                                        disabled
                                        value={refNumberEdit}
                                        onChange={(e) => setrefNumberEdit(e.target.value)
                                        }
                                    />

                                    <CFormSelect label="Customer Name"
                                        value={customerIdEdit}
                                        disabled
                                        className='itemPadding'
                                        onChange={(e) => setcustomerIdEdit(e.target.value)}>
                                        <option value="">Select Customer</option>
                                        {dataCustomer.map((row) => (
                                            <option value={row._id}>{row.name}</option>
                                        ))}

                                    </CFormSelect>
                                    <CFormSelect value={SPCategoryEdit}
                                        label="Category"
                                        disabled
                                        onChange={(e) => setSPCategoryEdit(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Category</option>
                                        <option value="Advanced Supply Order">Advanced Supply Order</option>
                                        <option value="Confirmed Supply Order">Confirmed Supply Order</option>

                                    </CFormSelect>
                                    <CFormInput
                                        type="text"
                                        disabled
                                        label="Order Valid Till"
                                        // placeholder="Enter Name"
                                        required className='itemPadding'
                                        value={orderValidTillEdit}
                                        onChange={(e) => setorderValidTillEdit(e.target.value)
                                        }
                                    />
                                    {/* <Typography variant="h6" style={{ fontSize: '16px' }}>Select Order Valid Till</Typography>
                                    <DatePicker className='itemPadding' wrapperClassName="date-picker" selected={orderValidTillEdit}
                                     onChange={(date: Date) => setorderValidTillEdit(date)} /> */}

                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="refNumber"
                                        disabled
                                        label="Date Of order"
                                        // placeholder="Enter Name"
                                        aria-describedby="refNumber"
                                        required className='itemPadding'
                                        value={dateOfOrderEdit}
                                        onChange={(e) => setdateOfOrderEdit(e.target.value)
                                        }
                                    />
                                    {/* <Typography variant="h6" style={{ fontSize: '16px' }}>Select Date of Order</Typography>
                                    <DatePicker className='itemPadding' wrapperClassName="date-picker"  selected={dateOfOrderEdit}  onChange={(date: Date) => setdateOfOrderEdit(date)} /> */}
                                    <CFormSelect value={typeOforderEdit}
                                        label="Type of Order"
                                        disabled
                                        onChange={(e) => settypeOforderEdit(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Order type</option>
                                        <option value="Market">Market</option>
                                        <option value="Institutional">Institutional</option>
                                        <option value="Others">Others</option>


                                    </CFormSelect>
                                    <CFormTextarea
                                        disabled label="Special Instructions" value={specialInstructionsEdit}
                                        required className='itemPadding'
                                        onChange={(e) => setspecialInstructionsEdit(e.target.value)
                                        } id="exampleFormControlTextarea1" rows="3"></CFormTextarea>


                                </CCol>
                            </CRow>
                        </CForm>

                    </CModalBody>
                </CModal>
                {/* Edit  */}
                <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
                    <CModalHeader onClose={() => setVisibleEdit(false)}>
                        <CModalTitle>Update Order Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                                <CCol xs>

                                    <CFormInput
                                        type="text"
                                        id="refNumber"
                                        label="Ref Number"
                                        // placeholder="Enter Name"
                                        aria-describedby="refNumber"
                                        required className='itemPadding'
                                        disabled
                                        value={refNumberEdit}
                                        onChange={(e) => setrefNumberEdit(e.target.value)
                                        }
                                    />

                                    <CFormSelect label="Customer Name"
                                        value={customerIdEdit}
                                        className='itemPadding' disabled
                                        onChange={(e) => setcustomerIdEdit(e.target.value)}>
                                        <option value="">Select Customer</option>
                                        {dataCustomer.map((row) => (
                                            <option value={row._id}>{row.name}</option>
                                        ))}

                                    </CFormSelect>
                                    <CFormSelect value={SPCategoryEdit}
                                        label="Category"
                                        onChange={(e) => setSPCategoryEdit(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Category</option>
                                        <option value="Advanced Supply Order">Advanced Supply Order</option>
                                        <option value="Confirmed Supply Order">Confirmed Supply Order</option>

                                    </CFormSelect>
                                    <CFormInput
                                        type="text"
                                        label="Order Valid Till"
                                        // placeholder="Enter Name"
                                        required className='itemPadding'
                                        value={orderValidTillEdit}
                                        onChange={(e) => setorderValidTillEdit(e.target.value)
                                        }
                                    />
                                    {/* <Typography variant="h6" style={{ fontSize: '16px' }}>Select Order Valid Till</Typography>
                                    <DatePicker className='itemPadding' wrapperClassName="date-picker" selected={orderValidTillEdit}
                                     onChange={(date: Date) => setorderValidTillEdit(date)} /> */}

                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="refNumber"
                                        label="Date Of order"
                                        // placeholder="Enter Name"
                                        aria-describedby="refNumber"
                                        required className='itemPadding'
                                        value={dateOfOrderEdit}
                                        onChange={(e) => setdateOfOrderEdit(e.target.value)
                                        }
                                    />
                                    {/* <Typography variant="h6" style={{ fontSize: '16px' }}>Select Date of Order</Typography>
                                    <DatePicker className='itemPadding' wrapperClassName="date-picker"  selected={dateOfOrderEdit}  onChange={(date: Date) => setdateOfOrderEdit(date)} /> */}
                                    <CFormSelect value={typeOforderEdit}
                                        label="Type of Order"
                                        onChange={(e) => settypeOforderEdit(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Order type</option>
                                        <option value="Market">Market</option>
                                        <option value="Institutional">Institutional</option>
                                        <option value="Others">Others</option>


                                    </CFormSelect>
                                    <CFormTextarea label="Special Instructions" value={specialInstructionsEdit}
                                        required className='itemPadding'
                                        onChange={(e) => setspecialInstructionsEdit(e.target.value)
                                        } id="exampleFormControlTextarea1" rows="3"></CFormTextarea>


                                </CCol>
                            </CRow>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <CButton color="primary" onClick={UpdateProductData}>Save</CButton>
                        </div>

                    </CModalFooter>
                </CModal>
                {/* Add  */}
                <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                        <CModalTitle>Add Supply Order</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                                <CCol xs>
                                    <CFormSelect label="Customer Name*"
                                        value={customerId}
                                        className='itemPadding'
                                        onChange={(e) => setcustomerId(e.target.value)}>
                                        <option value="">Select Customer</option>
                                        {dataCustomer.map((row) => (
                                            <option value={row._id}>{row.name}</option>
                                        ))}

                                    </CFormSelect>

                                    <Typography variant="h6" style={{ fontSize: '16px' }}>Select Date of Order*</Typography>
                                    <DatePicker className='itemPadding' wrapperClassName="date-picker"b selected={dateOfOrder} onChange={(date) => setdateOfOrder(date)} />

                                    <CFormTextarea label="Special Instructions*" value={specialInstructions}
                                        required className='itemPadding'
                                        onChange={(e) => setspecialInstructions(e.target.value)
                                        } id="exampleFormControlTextarea1" rows="3"></CFormTextarea>

                                </CCol>
                                <CCol xs>
                                    <Typography variant="h6" style={{ fontSize: '16px' }}>Select Order Valid Till*</Typography>
                                    <DatePicker className='itemPadding' wrapperClassName="date-picker" selected={orderValidTill} onChange={(date) => setorderValidTill(date)} />
                                    <CFormSelect value={typeOforder}
                                        label="Type of Order*"
                                        onChange={(e) => settypeOforder(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Order type</option>
                                        <option value="Market">Market</option>
                                        <option value="Institutional">Institutional</option>
                                        <option value="Others">Others</option>
                                    </CFormSelect>

                                </CCol>
                            </CRow>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <CButton color="primary" onClick={submitHandler}>Save</CButton>
                        </div>

                    </CModalFooter>
                </CModal>
                {/* Ordered Products  */}
                {/* MRP  */}
                <CModal size="lg" visible={visibleViewMRP} onClose={() => setVisibleViewMRP(false)}>
                    <CModalHeader onClose={() => setVisibleViewMRP(false)}>
                        <CModalTitle> Ordered Product</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {showHideDemoAdd &&
                            <>
                                <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }} >
                                    <CCol xs>
                                        <CFormInput
                                            type="text"
                                            required
                                            placeholder="Packing"
                                            value={packing}
                                            className='itemPadding'
                                            onChange={(e) => setpacking(e.target.value)
                                            }
                                        />
                                        <CFormInput
                                            type="text"
                                            required
                                            placeholder="Rate Per Unit"
                                            className='itemPadding'
                                            value={ratePerUnit}
                                            onChange={(e) => setratePerUnit(e.target.value)
                                            }
                                        />
                                    </CCol>

                                    <CCol xs>
                                        <CFormInput
                                            type="text"
                                            required
                                            placeholder="Quantity"
                                            className='itemPadding'
                                            value={quantity}
                                            onChange={(e) => setquantity(e.target.value)
                                            }
                                        />
                                        {/* <CFormInput
                                            type="text"
                                            required
                                            placeholder="Amount"
                                            className='itemPadding'
                                            value={amount}
                                            onChange={(e) => setamount(e.target.value)
                                            }
                                        /> */}

                                    </CCol>
                                    <CCol xs>
                                        <CFormSelect className='itemPadding' value={productIDD}
                                            onChange={(e) => setproductIDD(e.target.value)
                                            }>
                                            <option value=" ">Select Product</option>
                                            {dataProduct.map((row) => (
                                                <option value={row._id}>{row.itemName}</option>
                                            ))}

                                        </CFormSelect>
                                        {/* <CFormInput
                                            type="text"
                                            required
                                            className='itemPadding'
                                            placeholder="Total Amount"
                                            value={totalAmount}
                                            onChange={(e) => settotalAmount(e.target.value)
                                            }
                                        /> */}
                                    </CCol>
                                </CRow>
                                <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }} >
                                    <CCol xs>
                                        <CButton style={{ marginBottom: '50px' }} onClick={addOrderProduct} color="primary">Add</CButton>
                                    </CCol>
                                </CRow>
                            </>
                        }
                        {/* <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 12 }}> */}

                        {showHideDemo2 &&
                            <>
                                <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }} >
                                    <CCol xs>
                                        <CFormInput
                                            type="text"
                                            required
                                            label="Packing"
                                            placeholder="Packing"
                                            value={packingEdit}
                                            className='itemPadding'
                                            onChange={(e) => setpackingEdit(e.target.value)
                                            }
                                        />
                                        <CFormInput
                                            type="text"
                                            required
                                            label="Rate Per Unit"
                                            placeholder="Rate Per Unit"
                                            className='itemPadding'
                                            value={ratePerUnitEdit}
                                            onChange={(e) => setratePerUnitEdit(e.target.value)
                                            }
                                        />


                                    </CCol>

                                    <CCol xs>
                                        <CFormInput
                                            type="text"
                                            required
                                            label="Quantity"

                                            placeholder="Quantity"
                                            className='itemPadding'
                                            value={quantityEdit}
                                            onChange={(e) => setquantityEdit(e.target.value)
                                            }
                                        />
                                        <CFormInput
                                            type="text"
                                            required
                                            label="Amount"
                                            disabled
                                            placeholder="Amount"
                                            className='itemPadding'
                                            value={amountEdit}
                                            onChange={(e) => setamountEdit(e.target.value)
                                            }
                                        />

                                    </CCol>
                                    <CCol xs>
                                        <CFormSelect className='itemPadding'
                                            disabled
                                            label="Product Name"
                                            value={productIDDEdit}
                                            onChange={(e) => setproductIDDEdit(e.target.value)
                                            }>
                                            <option value=" ">Select Product</option>

                                            {dataProduct.map((row) => (
                                                <option value={row._id}>{row.itemName}</option>
                                            ))}

                                        </CFormSelect>
                                        <CFormInput
                                            type="text"
                                            required
                                            label="Total Amount"
                                            disabled
                                            className='itemPadding'
                                            placeholder="Total Amount"
                                            value={totalAmountEdit}
                                            onChange={(e) => settotalAmountEdit(e.target.value)
                                            }
                                        />
                                    </CCol>
                                </CRow>
                                <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }} >
                                    <CCol xs>
                                        <CButton style={{ marginTop: '10px', marginBottom: '20px' }} onClick={updateOrderProduct} color="primary">Update</CButton>
                                    </CCol>
                                </CRow>
                            </>
                        }


                        {/* </CRow> */}

                        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 12 }}>
                            <div className='tableResponsive'>
                                <Table columns={columns1} dataSource={data1} size='small' bordered/>
                            </div>
                        </CRow>


                    </CModalBody>
                </CModal>
            </CRow>
        </>
    )
}


export default SupplyOrders