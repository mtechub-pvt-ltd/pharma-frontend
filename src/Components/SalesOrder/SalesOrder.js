import React, { useState, useEffect, useRef } from 'react'
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
} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'

import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteTwoTone, EyeTwoTone, EditTwoTone, PrinterTwoTone, BookTwoTone } from '@ant-design/icons';
import { Table, Button, Input, Space, Badge, Checkbox, Tooltip, message, Modal } from 'antd';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable'
import url from '../url'
function SalesOrder(props) {
    // Get all 
    const [data, setData] = useState([]);

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
                    // placeholder={`Search ${dataIndex}`}
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
    let navigate = useNavigate();

    const getAllData = () => {
        axios.get(`${url}customer/getAllSalesOrder`)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllData1 = () => {
        axios.get(`${url}customer/getAllSupplyOrder`)
            .then((response) => {
                console.log(response.data);
                setDataCustomer(response.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData();
        getAllData1();

    }, []);
    const columns = [
        {
            title: 'Ref No',
            dataIndex: 'SO_refNumber',
            key: 'SO_refNumber',
            width: '10%',

        },
        {
            title: 'Customer Name',
            dataIndex: 'CustomerName',
            key: 'CustomerName',
            width: '20%',
            ...getColumnSearchProps('CustomerName'),

        },
        {
            title: 'Contact person',
            dataIndex: 'ContactPerson',
            key: 'ContactPerson',
            width: '20%',
            ...getColumnSearchProps('ContactPerson'),
        },
        {
            title: 'Phone Number',
            dataIndex: 'PhoneNumber',
            key: 'PhoneNumber',
            width: '20%',
            ...getColumnSearchProps('PhoneNumber'),
        },

        {
            title: 'Sales Order State',
            dataIndex: 'saleOrderState',
            key: 'saleOrderState',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">

                    {record.saleOrderState === "Active" ? <Badge count='Active' style={{
                        backgroundColor: '#52c41a',
                    }} />
                        : null}
                    {record.saleOrderState === "Pending" ? <Badge count='Pending' style={{
                        backgroundColor: 'orange',
                    }} />
                        : null}
                    {record.saleOrderState === "Close" ? <Badge count='Close' style={{
                        backgroundColor: 'blue',
                    }} />
                        : null}

                </Space>
            ),
        },
        {
            title: 'Delivery Status',
            dataIndex: 'orderDeliveryStatus',
            key: 'orderDeliveryStatus',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">

                    {record.orderDeliveryStatus === "Processing" ? <Badge count='Processing' style={{
                        backgroundColor: 'orange',
                    }} />
                        : null}
                    {record.orderDeliveryStatus === "Dispatched" ? <Badge count='Dispatched' style={{
                        backgroundColor: 'grey',
                    }} />
                        : null}
                    {record.orderDeliveryStatus === "Delivered" ? <Badge count='Delivered' style={{
                        backgroundColor: '#52c41a',
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
                    <Tooltip title="All Sales">
                        <h6 className='linkBtn' onClick={() => {
                            ViewDataSales(record.supplyOrderId._id, record._id)
                        }}><BookTwoTone twoToneColor="purple" /></h6>
                    </Tooltip>
                    <Tooltip title="Generate Summary">
                        <h6 className='linkBtn' onClick={() => {
                            PrintData(record._id)
                            // EditInvoice(record._id)

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
    // Print 
    const [pdfRef, setPdfRef] = useState('')
    const [pdfDate, setPdfDate] = useState('')
    const [pdfValid, setPdfValid] = useState('')
    const [pdfSOData, setPdfSOData] = useState('')
    const pdfHead = "Supply Order Details"
    var company_logo = {
        w: 80,
        h: 50
    };
    var comapnyJSON = {
        CompanyName: 'PHARMACY',
        CompanyGSTIN: '37B76C238B7E1Z5',
        CompanyState: 'KERALA (09)',
        CompanyPAN: 'B76C238B7E',
        CompanyAddressLine1: 'ABCDEFGD HOUSE,IX/642-D',
        CompanyAddressLine2: 'ABCDEFGD P.O., NEDUMBASSERY',
        CompanyAddressLine3: 'COCHIN',
        PIN: '683584',
        companyEmail: 'xyz@gmail.com',
        companyPhno: '+918189457845',
    };

    var customer_BillingInfoJSON = {
        CustomerName: 'Customer Name',
        CustomerGSTIN: '37B76C238B7E1Z5',
        NTN: 'NTN No',
        CustomerPAN: 'B76C238B7E',
        CustomerAddressLine1: 'ABCDEFGD HOUSE,IX/642-D',
        CustomerAddressLine2: 'ABCDEFGD P.O., NEDUMBASSERY',
        CustomerAddressLine3: 'COCHIN',
        PIN: '683584',
        SalesTaxRegNo: '214244',
        CustomerEmail: 'abcd@gmail.com',
        CustomerPhno: '+918189457845',
    };


    var customer_ShippingInfoJSON = {
        CustomerName: 'Jino Shaji',
        CustomerGSTIN: '37B76C238B7E1Z5',
        NTN: 'KERALA (09)',
        CustomerPAN: 'B76C238B7E',
        CustomerAddressLine1: 'ABCDEFGD HOUSE,IX/642-D',
        CustomerAddressLine2: 'ABCDEFGD P.O., NEDUMBASSERY',
        CustomerAddressLine3: 'COCHIN',
        PIN: '683584',
        CustomerEmail: 'abcd@gmail.com',
        CustomerPhno: '+918189457845',
    };


    var invoiceJSON = {
        InvoiceNo: 'INV-120152',
        InvoiceDate: '03-12-2017',
        InvoiceType: 'Tax',
        RefNo: 'REF-78445',
        TotalAmnt: 'Rs.1,24,200',
        SubTotalAmnt: 'Rs.1,04,200',
        TotalGST: 'Rs.2,0000',
        TotalCGST: 'Rs.1,0000',
        TotalSGST: 'Rs.1,0000',
        TotalIGST: 'Rs.0',
        TotalCESS: 'Rs.0',
    }

    var fontSizes = {
        HeadTitleFontSize: 18,
        Head2TitleFontSize: 16,
        TitleFontSize: 14,
        SubTitleFontSize: 12,
        NormalFontSize: 10,
        SmallFontSize: 8
    };
    var lineSpacing = {
        NormalSpacing: 12,

    };
    const [SupplyCusDetails, setSupplyCusDetails] = useState([])
    const [BillingCusDetails, setBillingCusDetails] = useState([])
    const [SaleProductsDetails, setSaleProductsDetails] = useState([])
    const [ViewInvoice, setViewInvoice] = useState(false)



    const EditInvoice = (idData) => {
        axios.get(`${url}customer/getSalesOrder`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setSupplyCusDetails(response.data.supplyOrderId)
                setBillingCusDetails(response.data.customerId)
                setSaleProductsDetails(response.data.salePartsId)
                // Open Modal 
                setViewInvoice(true)
                // PrintData()
                setProductIdEdit(response.data._id)
                setCustomerNameEdit(response.data.CustomerName)
                setCustomerPhoneEdit(response.data.PhoneNumber)
                setCustomerCPEdit(response.data.ContactPerson)
                setrefNumberEdit(response.data.SO_refNumber)
                setSPCategoryEdit(response.data.supplyOrderId.SPCategory)
                settypeOforderEdit(response.data.supplyOrderId.typeOforder)
                setdateOfOrderEdit(response.data.supplyOrderId.dateOfOrder)
                setorderValidTillEdit(response.data.supplyOrderId.orderValidTill)
                setStatusEdit(response.data.supplyOrderId.Status)
                setsaleOrderStateEdit(response.data.saleOrderState)
                setdeliveryStatusEdit(response.data.orderDeliveryStatus)
                // setVisibleEdit(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    const columnsInvoiceSales = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            width: '20%',
        },
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
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '20%',
        },
        {
            title: 'Packing',
            dataIndex: 'packSize',
            key: 'packSize',
            width: '20%',
        },
         {
            title: 'Amount',
            dataIndex: 'totalAmountPayable',
            key: 'totalAmountPayable',
            width: '20%',
        },
    ]
    const columnsInvoice = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            width: '20%',
        },
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
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '20%',
        },
        {
            title: 'Packing',
            dataIndex: 'packing',
            key: 'packing',
            width: '20%',
        },
         {
            title: 'Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: '20%',
        },

    ];
    const PrintData = (idData) => {
        axios.get(`${url}customer/getSalesOrder`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                var doc = new jsPDF('p', 'pt', 'a4');
                var rightStartCol1 = 400;
                var rightStartCol2 = 480;
                var InitialstartX = 40;
                var startX = 40;
                var InitialstartY = 50;
                var startY = 0;
                var lineHeights = 12;
                doc.setFontSize(fontSizes.SubTitleFontSize);
                doc.setFont("helvetica");
                doc.setFontType('bold');
                // doc.addImage(imgData,'JPEG',startX,startY+=50,company_logo.w,company_logo.h);
                doc.text(comapnyJSON.CompanyName, startX, startY += 15 + company_logo.h, 'left');
                doc.setFontSize(fontSizes.NormalFontSize);
                doc.setFontType('bold');
                doc.text("Phone: ", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text("000000000", 80, startY);
                var tempY = InitialstartY;
                doc.setFontType('bold');
                doc.text("Ref NO: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.SO_refNumber, rightStartCol2, tempY);
                doc.setFontType('bold');
                doc.text("Delivery Status: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.orderDeliveryStatus, rightStartCol2, tempY);
                doc.setFontType('bold');
                doc.text(" Order State: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.saleOrderState, rightStartCol2, tempY);
                doc.setFontType('bold');
                //-------Customer Info Billing---------------------
                var startBilling = startY;
                  doc.text("Customer Details,",startX, startY+=lineSpacing.NormalSpacing);
                  doc.text(response.data.customerId.name, startX, startY+=lineSpacing.NormalSpacing);
                  doc.setFontSize(fontSizes.NormalFontSize);
                  doc.setFontType('bold');
                  doc.text("Phone", startX, startY+=lineSpacing.NormalSpacing);
                  doc.setFontType('normal');
                  doc.text(response.data.customerId.phone, 85, startY);
                  doc.setFontSize(fontSizes.NormalFontSize);
                  doc.setFontType('bold');
                  doc.text("CNIC", startX, startY+=lineSpacing.NormalSpacing);
                  doc.setFontType('normal');
                  doc.text(response.data.customerId.cnicOfPropreitor, 85, startY);
                //   doc.text("GSTIN", startX, startY+=lineSpacing.NormalSpacing);
                //   doc.setFontType('normal');
                //   doc.text(customer_BillingInfoJSON.CustomerGSTIN, 80, startY);
                  doc.setFontType('bold');
                  doc.text("Address", startX, startY+=lineSpacing.NormalSpacing);
                  doc.setFontType('normal');
                  doc.text(response.data.customerId.address, 85, startY);
                  doc.setFontType('bold');
                  doc.text("NTN :", startX, startY+=lineSpacing.NormalSpacing);
                  doc.setFontType('normal');
                  doc.text(response.data.customerId.ntnNumber, 85, startY);
                  doc.setFontType('bold');
                  doc.text("Reg No :", startX, startY+=lineSpacing.NormalSpacing);
                  doc.setFontType('normal');
                  doc.text(response.data.customerId.salesTaxNumber, 85, startY);
                doc.setFontType('bold');
                doc.setFontSize(fontSizes.Head2TitleFontSize);
                doc.text("Supply Order Details :", 200, startY+=lineSpacing.NormalSpacing);
                //-------Customer Info Shipping---------------------
                var rightcol1 = 340;
                var rightcol2 = 400;
                startY = startBilling;
                var header = function (data) {
                    doc.setFontSize(8);
                    doc.setTextColor(40);
                    doc.setFontStyle('normal');
                    doc.textAlign("Supply Order Product", {align: "center"}, data.settings.margin.left, 50);

                    //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
                    // doc.text("Testing Report", 110, 50);
                };
                doc.setFontSize(8);
                doc.setFontStyle('normal');



                doc.autoTable({
                    startY: 200,
                    theme: 'grid',
                    columns: columnsInvoice.map(col => ({ ...col, dataKey: col.dataIndex })),
                    body: response.data.saleOrderProducts
                })

                // doc.autoTable(columns1, rows, options);
                //-------Invoice Footer---------------------
                var rightcol1 = 340;
                var rightcol2 = 430;

                startY = doc.autoTableEndPosY()+ 30;
                doc.setFontSize(fontSizes.Head2TitleFontSize);

                doc.setFontType('bold');
                doc.text("Sale Order Details,", 200, startY);
                doc.setFontSize(fontSizes.NormalFontSize);
                doc.autoTable({
                    startY: startY+ 30,
                    theme: 'grid',
                    columns: columnsInvoiceSales.map(col => ({ ...col, dataKey: col.dataIndex })),
                    body: response.data.salePartsId

                })

                // doc.setFontSize(fontSizes.NormalFontSize);
                // doc.setFontType('bold');
                // doc.text("Discount on MRP.", rightcol1, startY+=lineSpacing.NormalSpacing);
                // doc.setFontType('normal');
                // doc.text(invoiceJSON.TotalCGST,rightcol2, startY);
                // doc.setFontType('bold');
                // doc.text("Discount on TP.", rightcol1, startY+=lineSpacing.NormalSpacing);
                // doc.setFontType('normal');
                // doc.text(invoiceJSON.TotalSGST,rightcol2, startY);
                // doc.setFontType('bold');
                // doc.text("Disc Amount.", rightcol1, startY+=lineSpacing.NormalSpacing);
                // doc.setFontType('normal');
                // doc.text(invoiceJSON.TotalIGST,rightcol2, startY);
                // doc.setFontType('bold');
                // doc.text("Sales Tax.", rightcol1, startY+=lineSpacing.NormalSpacing);
                // doc.setFontType('normal');
                // doc.text(invoiceJSON.TotalCESS,rightcol2, startY);
                // doc.setFontType('bold');
                // doc.text("General Sales Tax.", rightcol1, startY+=lineSpacing.NormalSpacing);
                // doc.setFontType('normal');
                // doc.text(invoiceJSON.TotalGST,rightcol2, startY);
                // doc.setFontType('bold');
                // doc.text("Advance Tax.", rightcol1, startY+=lineSpacing.NormalSpacing);
                // doc.setFontType('normal');
                // doc.text(invoiceJSON.TotalGST,rightcol2, startY);
                // doc.setFontType('bold');
                // doc.text("Further Tax.", rightcol1, startY+=lineSpacing.NormalSpacing);
                // doc.setFontType('normal');
                // doc.text(invoiceJSON.TotalGST,rightcol2, startY);
                // doc.setFontType('bold');
                // doc.text("Grand Total Rs.", rightcol1, startY+=lineSpacing.NormalSpacing);
                // doc.setFontType('normal');
                // doc.text(invoiceJSON.TotalAmnt,rightcol2+25, startY);
                // doc.setFontType('bold');
                // doc.save('SalesAndSupplyDetails.pdf');
                var string = doc.output('datauristring');
                var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
                var x = window.open();
                x.document.open();
                x.document.write(embed);
                x.document.close();



            })
            .catch(error => console.error(`Error:${error}`));

    };
    //   Validation 
    const [validated, setValidated] = useState(false)
    // Model Add
    const [visible, setVisible] = useState(false)
    const [productId, setProductId] = useState('');
    const [deliveryStatus, setdeliveryStatus] = useState('');
    const [dataCustomer, setDataCustomer] = useState([]);
    const [supplyOrderId, setsupplyOrderId] = useState('');


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
        if (supplyOrderId === '' || deliveryStatus === '') {
            console.log('fill fields')
        } else {
            // POst Request Create Driver
            axios.post(`${url}customer/createSalesOrder`, {
                supplyOrderId: supplyOrderId,
                orderDeliveryStatus: deliveryStatus,

            }, { headers }).then(response => {
                console.log(response)
                setVisible(false)
                getAllData();
                setsupplyOrderId('');
                setdeliveryStatus('');

            })
                .catch(err => {
                    console.log(err)
                })
        }

    }
    // Delete 
    const deleteDataProduct = () => {
        setVisibleDelete(false)
        axios.delete(`${url}customer/removeSalesOrder`, {
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
        axios.put(`${url}customer/updateSalesOrder`, {
            _id: productIdEdit,
            saleOrderState: saleOrderStateEdit,
            orderDeliveryStatus: deliveryStatusEdit,
        }, { headers }).then(response => {
            console.log(response);
            getAllData()
        })
            .catch(err => {
                console.log(err)
            })
    }
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [SPCategoryEdit, setSPCategoryEdit] = useState('');

    const [productIdEdit, setProductIdEdit] = useState('');
    const [refNumberEdit, setrefNumberEdit] = useState('');
    const [typeOforderEdit, settypeOforderEdit] = useState('');
    const [dateOfOrderEdit, setdateOfOrderEdit] = useState('');
    const [orderValidTillEdit, setorderValidTillEdit] = useState('');
    const [StatusEdit, setStatusEdit] = useState('');
    const [saleOrderStateEdit, setsaleOrderStateEdit] = useState('');
    const [deliveryStatusEdit, setdeliveryStatusEdit] = useState('');
    const [CustomerNameEdit, setCustomerNameEdit] = useState('');
    const [CustomerPhoneEdit, setCustomerPhoneEdit] = useState('');
    const [CustomerCPEdit, setCustomerCPEdit] = useState('');

    const EditData = (idData) => {
        axios.get(`${url}customer/getSalesOrder`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setProductIdEdit(response.data._id)
                setCustomerNameEdit(response.data.CustomerName)
                setCustomerPhoneEdit(response.data.PhoneNumber)
                setCustomerCPEdit(response.data.ContactPerson)
                setrefNumberEdit(response.data.SO_refNumber)
                setSPCategoryEdit(response.data.supplyOrderId.SPCategory)
                settypeOforderEdit(response.data.supplyOrderId.typeOforder)
                setdateOfOrderEdit(response.data.supplyOrderId.dateOfOrder)
                setorderValidTillEdit(response.data.supplyOrderId.orderValidTill)
                setStatusEdit(response.data.supplyOrderId.Status)
                setsaleOrderStateEdit(response.data.saleOrderState)
                setdeliveryStatusEdit(response.data.orderDeliveryStatus)
                setVisibleEdit(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    // View 
    const [visibleView, setVisibleView] = useState(false)

    const ViewData = (idData) => {
        axios.get(`${url}customer/getSalesOrder`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setCustomerNameEdit(response.data.CustomerName)
                setCustomerPhoneEdit(response.data.PhoneNumber)
                setCustomerCPEdit(response.data.ContactPerson)
                setrefNumberEdit(response.data.SO_refNumber)
                setSPCategoryEdit(response.data.supplyOrderId.SPCategory)
                settypeOforderEdit(response.data.supplyOrderId.typeOforder)
                setdateOfOrderEdit(response.data.supplyOrderId.dateOfOrder)
                setorderValidTillEdit(response.data.supplyOrderId.orderValidTill)
                setStatusEdit(response.data.supplyOrderId.Status)
                setsaleOrderStateEdit(response.data.saleOrderState)
                setdeliveryStatusEdit(response.data.orderDeliveryStatus)
                setDataSales(response.data.saleOrderProducts)
                // setProductIdEdit(response.data._id)
                // setrefNumberEdit(response.data.refNumber)

                // setorderDeliveryStatusEdit(response.data.orderDeliveryStatus)
                setVisibleView(true)
            })
            .catch(error => console.error(`Error:${error}`));
    }
    // View All Sales 
    // View 
    const [visibleViewSales, setVisibleViewSales] = useState(false)
    const [dataSales, setDataSales] = useState('')
    const [visibleTableCheck, setVisibleTableCheck] = useState(false)
    const [visibleTextCheck, setVisibleTextCheck] = useState(false)
    const [saleOrderId, setSaleOrderId] = useState('')
    const [saleOrderQuantity, setSaleOrderQuantity] = useState('')
    const [saleOrderPackSize, setSaleOrderPackSize] = useState('')
    const [saleOrderAddBtn, setSaleOrderAddBtn] = useState(true)
    const [dataSalesParts, setDataSalesParts] = useState('')



    const ViewDataSales = (idData, salesOrderId) => {
        axios.get(`${url}customer/getAllSupplySales`, {
            params: {
                supplyOrderId: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                navigate('/salesOrder'
                    ,
                    {
                        state: {
                            SupplyId: idData,
                            salesId: salesOrderId,
                            data: props.data,
                            IdUser: props.iduser
                        }
                    }
                );
                // setSaleOrderId(response.data._id)
                // setCustomerNameEdit(response.data.CustomerName)
                // setCustomerPhoneEdit(response.data.PhoneNumber)
                // setCustomerCPEdit(response.data.ContactPerson)
                // setrefNumberEdit(response.data.SO_refNumber)
                // setSPCategoryEdit(response.data.supplyOrderId.SPCategory)
                // settypeOforderEdit(response.data.supplyOrderId.typeOforder)
                // setdateOfOrderEdit(response.data.supplyOrderId.dateOfOrder)
                // setorderValidTillEdit(response.data.supplyOrderId.orderValidTill)
                // setStatusEdit(response.data.supplyOrderId.Status)
                // setsaleOrderStateEdit(response.data.saleOrderState)
                // setdeliveryStatusEdit(response.data.orderDeliveryStatus)
                // setDataSales(response.data.saleOrderProducts)
                // setDataSalesParts(response.data.salePartsId)
                // setVisibleViewSales(true)
            })
            .catch(error => console.error(`Error:${error}`));
    }
    const [valueSalePID, setValueSalePID] = useState([])
    const [visiblePartSales, setVisiblePartSales] = useState(false)

    const onChange = (productId) => {
        // console.log(`checked = ${e.target.checked}`);
        console.log(productId)
        // setValueSalePID(productId)
        valueSalePID.push(productId);
        console.log(valueSalePID)
        // Api saleOrderId

    };
    const updateOrderSalesParts = () => {

        axios.put(`${url}customer/updateSaleOrderPart`, {
            _id: idPart,
            quantity: idPartQuantity,
            packSize: idPartPackSize,

        }, { headers }).then(response => {
            console.log(response)
            setVisibleViewSales(false)
            setVisiblePartSales(false)
            Modal.success({
                content: 'Updated Successfully',
            });

        })
            .catch(err => {
                console.log(err)
            })
    }
    const addOrderSalesParts = () => {
        if (saleOrderQuantity === '' || saleOrderPackSize === '' || valueSalePID.length === 0) {
            setVisibleViewSales(false)
            message.error('Please Fill All Fields');
            setValueSalePID([]);
            setSaleOrderQuantity('')
            setSaleOrderPackSize('')
            setVisibleTableCheck(false)
            setVisibleTextCheck(false)
            setSaleOrderAddBtn(true)
        } else {
            axios.post(`${url}customer/addSaleOrderPart`, {
                saleOrderId: saleOrderId,
                quantity: saleOrderQuantity,
                packSize: saleOrderPackSize,
                productId: valueSalePID

            }, { headers }).then(response => {
                console.log(response)
                setValueSalePID([]);
                setSaleOrderQuantity('')
                setSaleOrderPackSize('')
                // setVisible(false)
                // getAllData();
                // setsupplyOrderId('');
                // setdeliveryStatus('');
                setVisibleTableCheck(false)
                setVisibleTextCheck(false)
                setSaleOrderAddBtn(true)

                setVisibleViewSales(false)

                Modal.success({
                    content: 'Added Sale Successfully',
                });

            })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const columnsSalesView = [
        {
            title: '',
            dataIndex: 'productName',
            width: '5%',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Checkbox onChange={() => onChange(record._id)}></Checkbox>
                </Space>
            )
        },
        {
            title: 'Name',
            dataIndex: 'productName',
            key: 'productName',
            width: '10%',
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
            width: '15%',
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

        // {
        //     title: 'Action',
        //     width: '10%',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Tooltip title="Update">

        //                 <h6 className='linkBtn' onClick={() => {
        //                     EditProductOrder(record._id)
        //                 }}><EditTwoTone /></h6>
        //             </Tooltip>
        //             <Tooltip title="Delete">

        //                 <h6 className='linkBtn' onClick={() => {
        //                     DeleteOrderProduct(record._id)
        //                 }}><DeleteTwoTone twoToneColor="red" />
        //                 </h6>
        //             </Tooltip>
        //         </Space>
        //     ),
        // },

    ];
    const columnsParts = [
        {
            title: 'Name',
            dataIndex: 'CustomerName',
            key: 'CustomerName',
            width: '20%',
        },
        {
            title: 'Ref No',
            dataIndex: 'SO_refNumber',
            key: 'SO_refNumber',
            width: '10%',
        },

        {
            title: 'Pack Size',
            dataIndex: 'packSize',
            key: 'packSize',
            width: '10%',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
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
                            EditProductOrderSale(record._id, record.quantity, record.packSize)
                        }}><EditTwoTone /></h6>
                    </Tooltip>
                    <Tooltip title="Delete">

                        <h6 className='linkBtn' onClick={() => {
                            DeleteOrderProductSale(record._id)
                        }}><DeleteTwoTone twoToneColor="red" />
                        </h6>
                    </Tooltip>
                </Space>
            ),
        },

    ];
    const [idPart, setIdPart] = useState('')
    const [idPartQuantity, setIdPartQuantity] = useState('')
    const [idPartPackSize, setIdPartPackSize] = useState('')


    const EditProductOrderSale = (idData, quantity, packSize) => {
        setIdPart(idData);
        setIdPartQuantity(quantity);
        setIdPartPackSize(packSize)
        setVisiblePartSales(true)

    }
    const DeleteOrderProductSale = (idData) => {
        axios.delete(`${url}customer/removeSaleOrderPart`, {
            data: {
                _id: idData
            }
        }, { headers })
            .then(res => {
                console.log(res);
                console.log(res.data);
                ViewDataSales(saleOrderId)
            }).catch(err => {
                console.log(err)
            })
    }

    const addOrderSales = () => {
        setVisibleTableCheck(true)
        setVisibleTextCheck(true)
        setSaleOrderAddBtn(false)
    }
    return (
        <>

            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }} >
                <CCol xs>
                    <CBreadcrumb style={{ marginBottom: '40px' }}>
                        <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
                        <CBreadcrumbItem active>Sales Orders</CBreadcrumbItem>
                    </CBreadcrumb>
                </CCol>
            </CRow>
            <CRow xs={{ cols: 2, gutter: 4 }} md={{ cols: 6 }}>
                <CCol xs style={{ flexGrow: 1 }}>
                    <h4>Sales Orders</h4>
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
                {/* View  */}
                <CModal visible={ViewInvoice} size="lg" onClose={() => setViewInvoice(false)}>
                    <CModalHeader onClose={() => setViewInvoice(false)}>
                        <CModalTitle> Order Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <h5>Supply Order Details</h5>
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 3 }}>
                                <CCol xs>

                                    <CFormInput
                                        type="text"
                                        id="refNumber"
                                        label="Ref No"
                                        // placeholder="Enter Name"
                                        aria-describedby="refNumber"
                                        required className='itemPadding'
                                        disabled
                                        value={refNumberEdit}
                                        onChange={(e) => setrefNumberEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="SPCategory"
                                        label="Supply Order Category"
                                        // placeholder="Enter Cnic"
                                        aria-describedby="SPCategory"
                                        required className='itemPadding'
                                        disabled
                                        value={SPCategoryEdit}
                                        onChange={(e) => setSPCategoryEdit(e.target.value)
                                        }
                                    />




                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="dateOfOrder"
                                        label="Date Of Order"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Salary"
                                        aria-describedby="dateOfOrder"
                                        value={dateOfOrderEdit}
                                        onChange={(e) => setdateOfOrderEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="orderValidTill"
                                        label="Order Valid Till"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Gender"
                                        aria-describedby="orderValidTill"
                                        value={orderValidTillEdit}
                                        onChange={(e) => setorderValidTillEdit(e.target.value)
                                        }
                                    />


                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="typeOforder"
                                        label="Type Of Order"
                                        // placeholder="Enter Age"
                                        required className='itemPadding'
                                        disabled
                                        aria-describedby="typeOforder"
                                        value={typeOforderEdit}
                                        onChange={(e) => settypeOforderEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="Status"
                                        label="Supply Order Status"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        disabled
                                        aria-describedby="Status"
                                        value={StatusEdit}
                                        onChange={(e) => setStatusEdit(e.target.value)
                                        }
                                    />
                                </CCol>

                            </CRow>
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <h5>Customers Details</h5>
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 3 }}>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        label="Customer Name"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        disabled
                                        value={CustomerNameEdit}
                                        onChange={(e) => setCustomerNameEdit(e.target.value)
                                        }
                                    />
                                    <CCol xs>

                                    </CCol>
                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        label="Customer Phone Number"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        disabled
                                        value={CustomerPhoneEdit}
                                        onChange={(e) => setCustomerPhoneEdit(e.target.value)
                                        }
                                    />
                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        label="Customer Contact Person"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        disabled
                                        value={CustomerCPEdit}
                                        onChange={(e) => setCustomerCPEdit(e.target.value)
                                        }
                                    />
                                </CCol>

                            </CRow>
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <h5>Sales Order Details</h5>
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 3 }}>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="deliveryStatus"
                                        label="Order Delivery Status"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Employee Role"
                                        aria-describedby="deliveryStatus"
                                        value={deliveryStatusEdit}
                                        onChange={(e) => setdeliveryStatusEdit(e.target.value)
                                        }
                                    /></CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="saleOrderState"
                                        label="Sale Order State"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Qualification"
                                        aria-describedby="saleOrderState"
                                        value={saleOrderStateEdit}
                                        onChange={(e) => setsaleOrderStateEdit(e.target.value)
                                        }
                                    />
                                </CCol>

                            </CRow>
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <h5 style={{ textAlign: 'center' }}>Ordered Product Details</h5>
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 12 }}>
                                <div className='tableResponsive'>
                                    <Table columns={columnsSalesView} dataSource={dataSales} />
                                </div>
                            </CRow>

                        </CForm>

                    </CModalBody>
                </CModal>
                {/* Delete  */}
                <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
                    <CModalHeader onClose={() => setVisibleDelete(false)}>
                        <CModalTitle>Delete Order</CModalTitle>
                    </CModalHeader>
                    <CModalBody>Are you sure you want to delete this Sale Order!</CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                            No
                        </CButton>
                        <CButton color="primary" onClick={deleteDataProduct}>Yes</CButton>
                    </CModalFooter>
                </CModal>

                {/* View  Sales*/}
                <CModal visible={visibleViewSales} size="lg" onClose={() => {
                    setVisibleViewSales(false);
                    setVisibleTableCheck(false);
                    setVisibleTextCheck(false);
                    setSaleOrderAddBtn(true)
                    setVisiblePartSales(false)
                }}>
                    <CModalHeader onClose={() => {
                        setVisibleTableCheck(false)
                        setVisibleTextCheck(false)
                        setVisibleViewSales(false)
                        setSaleOrderAddBtn(true)
                        setVisiblePartSales(false)


                    }}>
                        <CModalTitle> Sales Order Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            {visiblePartSales ?
                                <>
                                    <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 2 }}>

                                        <CCol xs>
                                            <CFormInput
                                                type="number"
                                                label="Enter Quantity"
                                                required className='itemPadding'
                                                // placeholder="Enter Qualification"
                                                value={idPartQuantity}
                                                onChange={(e) => setIdPartQuantity(e.target.value)
                                                }
                                            />
                                        </CCol>
                                        <CCol xs>
                                            <CFormInput
                                                type="number"
                                                label="Enter Pack Size"
                                                required
                                                className='itemPadding'
                                                value={idPartPackSize}
                                                onChange={(e) => setIdPartPackSize(e.target.value)
                                                }
                                            />
                                        </CCol>
                                    </CRow>

                                    <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>

                                        <CCol xs>
                                            <CButton color="primary" style={{ float: 'left' }} onClick={updateOrderSalesParts}>Update</CButton>

                                        </CCol>
                                    </CRow>

                                </> : null}
                            {visibleTextCheck ?
                                <>
                                    <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 2 }}>

                                        <CCol xs>
                                            <CFormInput
                                                type="number"
                                                label="Enter Quantity"
                                                required className='itemPadding'
                                                // placeholder="Enter Qualification"
                                                value={saleOrderQuantity}
                                                onChange={(e) => setSaleOrderQuantity(e.target.value)
                                                }
                                            />
                                        </CCol>
                                        <CCol xs>
                                            <CFormInput
                                                type="number"
                                                label="Enter Pack Size"
                                                required
                                                className='itemPadding'
                                                value={saleOrderPackSize}
                                                onChange={(e) => setSaleOrderPackSize(e.target.value)
                                                }
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow xs={{ cols: 1 }} md={{ cols: 12 }}>

                                        <CCol xs>


                                            <h6 >Select Products to Add Sales</h6>
                                        </CCol>
                                    </CRow>
                                    <CRow xs={{ cols: 1 }} md={{ cols: 12 }}>

                                        <CCol xs>


                                            <CButton color="primary" style={{ float: 'right' }} onClick={addOrderSalesParts}>Save</CButton>

                                        </CCol>
                                    </CRow>

                                </> : null}
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 12 }}>
                                {visibleTableCheck ?
                                    <div className='tableResponsive'>
                                        <Table columns={columnsSalesView} dataSource={dataSales} />
                                    </div>
                                    : null
                                    // <div className='tableResponsive'>
                                    //     <Table columns={columnsSales} dataSource={dataSales} />
                                    // </div>
                                }

                            </CRow>
                            {saleOrderAddBtn ?
                                <>
                                    <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 2 }}>
                                        <CCol xs>
                                            <h5 >Sales Orders </h5>
                                        </CCol>
                                        <CCol xs>

                                            <CButton color="primary" style={{ float: 'right' }} onClick={addOrderSales}>+ Sale</CButton>
                                        </CCol>

                                    </CRow>
                                    <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 12 }}>
                                        <div className='tableResponsive'>
                                            <Table columns={columnsParts} dataSource={dataSalesParts} />
                                        </div>
                                    </CRow>
                                </> : null}

                        </CForm>

                    </CModalBody>
                </CModal>
                {/* View  */}
                <CModal visible={visibleView} size="lg" onClose={() => setVisibleView(false)}>
                    <CModalHeader onClose={() => setVisibleView(false)}>
                        <CModalTitle> Order Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <h5>Supply Order Details</h5>
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 3 }}>
                                <CCol xs>

                                    <CFormInput
                                        type="text"
                                        id="refNumber"
                                        label="Ref No"
                                        // placeholder="Enter Name"
                                        aria-describedby="refNumber"
                                        required className='itemPadding'
                                        disabled
                                        value={refNumberEdit}
                                        onChange={(e) => setrefNumberEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="SPCategory"
                                        label="Supply Order Category"
                                        // placeholder="Enter Cnic"
                                        aria-describedby="SPCategory"
                                        required className='itemPadding'
                                        disabled
                                        value={SPCategoryEdit}
                                        onChange={(e) => setSPCategoryEdit(e.target.value)
                                        }
                                    />




                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="dateOfOrder"
                                        label="Date Of Order"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Salary"
                                        aria-describedby="dateOfOrder"
                                        value={dateOfOrderEdit}
                                        onChange={(e) => setdateOfOrderEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="orderValidTill"
                                        label="Order Valid Till"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Gender"
                                        aria-describedby="orderValidTill"
                                        value={orderValidTillEdit}
                                        onChange={(e) => setorderValidTillEdit(e.target.value)
                                        }
                                    />


                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="typeOforder"
                                        label="Type Of Order"
                                        // placeholder="Enter Age"
                                        required className='itemPadding'
                                        disabled
                                        aria-describedby="typeOforder"
                                        value={typeOforderEdit}
                                        onChange={(e) => settypeOforderEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="Status"
                                        label="Supply Order Status"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        disabled
                                        aria-describedby="Status"
                                        value={StatusEdit}
                                        onChange={(e) => setStatusEdit(e.target.value)
                                        }
                                    />
                                </CCol>

                            </CRow>
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <h5>Customers Details</h5>
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 3 }}>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        label="Customer Name"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        disabled
                                        value={CustomerNameEdit}
                                        onChange={(e) => setCustomerNameEdit(e.target.value)
                                        }
                                    />
                                    <CCol xs>

                                    </CCol>
                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        label="Customer Phone Number"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        disabled
                                        value={CustomerPhoneEdit}
                                        onChange={(e) => setCustomerPhoneEdit(e.target.value)
                                        }
                                    />
                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        label="Customer Contact Person"
                                        // placeholder="Enter Date of Birth"
                                        required className='itemPadding'
                                        disabled
                                        value={CustomerCPEdit}
                                        onChange={(e) => setCustomerCPEdit(e.target.value)
                                        }
                                    />
                                </CCol>

                            </CRow>
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <h5>Sales Order Details</h5>
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 3 }}>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="deliveryStatus"
                                        label="Order Delivery Status"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Employee Role"
                                        aria-describedby="deliveryStatus"
                                        value={deliveryStatusEdit}
                                        onChange={(e) => setdeliveryStatusEdit(e.target.value)
                                        }
                                    /></CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="saleOrderState"
                                        label="Sale Order State"
                                        required className='itemPadding'
                                        disabled
                                        // placeholder="Enter Qualification"
                                        aria-describedby="saleOrderState"
                                        value={saleOrderStateEdit}
                                        onChange={(e) => setsaleOrderStateEdit(e.target.value)
                                        }
                                    />
                                </CCol>

                            </CRow>
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <h5 style={{ textAlign: 'center' }}>Ordered Product Details</h5>
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 12 }}>
                                <div className='tableResponsive'>
                                    <Table columns={columnsSalesView} dataSource={dataSales} />
                                </div>
                            </CRow>

                        </CForm>

                    </CModalBody>
                </CModal>
                {/* Edit  */}
                <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
                    <CModalHeader onClose={() => setVisibleEdit(false)}>
                        <CModalTitle>Update Sales Order </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 2 }}>
                                <CCol xs>
                                    <CFormSelect value={deliveryStatusEdit}
                                        label="Delivery Status"
                                        onChange={(e) => setdeliveryStatusEdit(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Status</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Delivered" >Delivered</option>

                                    </CFormSelect></CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="saleOrderState"
                                        disabled
                                        label="Sale Order State"
                                        required className='itemPadding'
                                        // placeholder="Enter Qualification"
                                        aria-describedby="saleOrderState"
                                        value={saleOrderStateEdit}
                                        onChange={(e) => setsaleOrderStateEdit(e.target.value)
                                        }
                                    />

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
                        <CModalTitle>Add Sales Order</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                                <CCol xs>

                                    <CFormSelect label="Supply Order"
                                        value={supplyOrderId}
                                        className='itemPadding'
                                        onChange={(e) => setsupplyOrderId(e.target.value)}>
                                        <option value="">Select Ref No</option>
                                        {dataCustomer.map((row) => (
                                            <option value={row._id}>{row.refNumber}</option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                                <CCol xs>
                                    <CFormSelect value={deliveryStatus}
                                        label="Delivery Status"
                                        onChange={(e) => setdeliveryStatus(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Status</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Dispatched">Dispatched</option>
                                        <option value="Delivered" >Delivered</option>

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
            </CRow>
        </>
    )
}

export default SalesOrder