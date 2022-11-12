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
    CFormTextarea,

    CFormInput,
    CFormSelect
} from '@coreui/react'
import Typography from '@mui/material/Typography';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteTwoTone, EyeTwoTone, PrinterTwoTone, EditTwoTone } from '@ant-design/icons';
import { Table, Button, Input, Space, Checkbox, message, Steps } from 'antd';
import { Tooltip } from 'antd';
import '../Products/stylesheet.css'
import axios from "axios";
import url from '../url'
import jsPDF from "jspdf";
import 'jspdf-autotable'
import DatePicker from "react-datepicker";
import '../Products/stylesheet.css'
const { Step } = Steps;
function Invoicing() {
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
    const getAllData = () => {
        axios.get(`${url}invoice/getAllInvoice`)
            .then((response) => {
                setData(response.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllStaffSales = () => {
        axios.get(`${url}staff/getAllSalesMan`)
            .then((response) => {
                console.log('SalesMan')
                const allData = response.data;
                console.log(response.data);
                setStaffSales(response.data)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllStaffDelivery = () => {
        axios.get(`${url}staff/getAllDeliveryMan`)
            .then((response) => {
                console.log('Delivery man')
                const allData = response.data;
                console.log(response.data);
                setStaffDelivery(response.data)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const getAllSales= () => {
        axios.get(`${url}customer/getAllSalesOrder`)
            .then((response) => {
                console.log('sales')
                const allData = response.data;
                console.log(response.data);
                setDataSales(response.data)
            })
            .catch(error => console.error(`Error:${error}`));

    }

    useEffect(() => {
        getAllData();
        getAllStaffDelivery();
        getAllStaffSales();
        getAllSales()

    }, []);
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
    const columnsInvoice = [
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
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: '20%',
        },

    ];
    const PrintData = (idData) => {
        axios.get(`${url}invoice/GetInvoice`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                if (response.data == "") {
                    message.error("Invoice View Error")
                } else {
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
                    doc.text("Supply Order Date :", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.supplyOrderDate, 134, startY);
                    doc.setFontType('bold');
                    doc.text("Valid Till :", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.SupplyOrderValid, 90, startY);
                    doc.setFontType('bold');
                    doc.text("EMAIL", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(comapnyJSON.companyEmail, 80, startY);
                    doc.setFontType('bold');
                    doc.text("Phone: ", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(comapnyJSON.companyPhno, 80, startY);
                    var tempY = InitialstartY;
                    doc.setFontType('bold');
                    doc.text("INVOICE NO: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.invoiceNo, rightStartCol2, tempY);
                    doc.setFontType('bold');
                    doc.text("INVOICE type: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.typeOfInvoice, rightStartCol2, tempY);
                    doc.setFontType('bold');
                    doc.text("INVOICE Date: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.invoiceDate, rightStartCol2, tempY);
                    doc.setFontType('bold');
                    doc.text("INVOICE Due: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.dueDate, rightStartCol2, tempY);
                    doc.setFontType('bold');
                    doc.text("Reference No: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.SuplyRefNo, rightStartCol2, tempY);
                    doc.setFontType('bold');
                    doc.text("Summary No: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.pickSummaryNo, rightStartCol2, tempY);
                    doc.setFontType('bold');
                    doc.text("Total: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.totalPayable, rightStartCol2, tempY);
                    doc.setFontType('normal');
                    doc.setLineWidth(1);
                    doc.setFontSize(fontSizes.Head2TitleFontSize);
                    doc.setFontType('bold');
                    doc.setFontSize(fontSizes.NormalFontSize);
                    doc.setFontType('bold');
                    //-------Customer Info Billing---------------------
                    var startBilling = startY;
                    doc.text("Customer Details,", startX, startY += lineSpacing.NormalSpacing);
                    doc.text(response.data.customerName, startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontSize(fontSizes.NormalFontSize);
                    doc.setFontType('bold');
                    doc.text("Phone", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.CustomerPhone, 85, startY);
                    doc.setFontSize(fontSizes.NormalFontSize);
                    doc.setFontType('bold');
                    doc.text("CNIC", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.CustomerCNIC, 85, startY);
                    doc.setFontType('bold');
                    doc.text("Address", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.customerAddress, 85, startY);
                    doc.setFontType('bold');
                    doc.text("NTN :", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.CustomerNTN, 85, startY);
                    doc.setFontType('bold');
                    doc.text("Reg No :", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.CustomerSalesTaxRegNo, 85, startY);
                    doc.setFontType('bold');
                    //-------Customer Info Shipping---------------------
                    var rightcol1 = 340;
                    var rightcol2 = 400;
                    startY = startBilling;
                    doc.setFontType('bold');
                    doc.text("Shipping Address,", 310, 210);
                    doc.setFontSize(fontSizes.NormalFontSize);
                    doc.setFontType('bold');
                    doc.text("Address", 310, 230);
                    doc.setFontType('normal');
                    doc.text(response.data.customerAddress, 360, 230);
                    doc.setFontType('bold');
                    doc.text("Phone: ", 310, 250);
                    doc.setFontType('normal');
                    doc.text(response.data.CustomerPhone, 360, 250);

                    var header = function (data) {
                        doc.setFontSize(8);
                        doc.setTextColor(40);
                        doc.setFontStyle('normal');
                    };
                    doc.setFontSize(8);
                    doc.setFontStyle('normal');
                    var options = {
                        beforePageContent: header,
                        margin: {
                            top: 50
                        },
                        styles: {
                            overflow: 'linebreak',
                            fontSize: 8,
                            rowHeight: 'auto',
                            columnWidth: 'wrap'
                        },
                        columnStyles: {
                            1: { columnWidth: 'auto' },
                            2: { columnWidth: 'auto' },
                            3: { columnWidth: 'auto' },
                            4: { columnWidth: 'auto' },
                            5: { columnWidth: 'auto' },
                            6: { columnWidth: 'auto' },
                        },
                        startY: startY += 50
                    };

                    doc.autoTable({
                        startY: 260,
                        theme: 'grid',
                        columns: columnsInvoice.map(col => ({ ...col, dataKey: col.dataIndex })),
                        body: response.data.products
                    })
                    //-------Invoice Footer---------------------
                    var rightcol1 = 340;
                    var rightcol2 = 430;

                    startY = doc.autoTableEndPosY() + 30;
                    doc.setFontSize(fontSizes.NormalFontSize);

                    doc.setFontType('bold');


                    doc.text("Amount,", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.text(response.data.amountRs, rightcol2, startY);
                    doc.setFontSize(fontSizes.NormalFontSize);
                    doc.setFontType('bold');
                    doc.text("Sales Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.salesTax, rightcol2, startY);
                    doc.setFontType('bold');
                    doc.text("General Sales Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.generalSalesTax, rightcol2, startY);
                    doc.setFontType('bold');
                    doc.text("Advance Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.advanceTax, rightcol2, startY);
                    doc.setFontType('bold');
                    doc.text("Further Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.furtherTax, rightcol2, startY);
                    doc.setFontType('bold');
                    doc.text("INVOICE TAX.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.text("Discount.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.invoiceDiscount, rightcol2, startY);

                    doc.setFontType('bold');
                    doc.text("Sales Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.invoiceSalesTax, rightcol2, startY);

                    doc.setFontType('bold');
                    doc.text("General Sales Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.invoiceGeneralSalesTax, rightcol2, startY);

                    doc.setFontType('bold');
                    doc.text("Advance Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.invoiceAdvanceTax, rightcol2, startY);

                    doc.setFontType('bold');
                    doc.text("Further Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.invoiceFurtherTax, rightcol2, startY);

                    doc.setFontType('bold');
                    doc.text("Grand Total Rs.", rightcol1, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data.totalPayable, rightcol2 + 25, startY);
                    doc.setFontType('bold');
                    doc.text('For ' + comapnyJSON.CompanyName + ',', rightcol2, startY += lineSpacing.NormalSpacing + 25);
                    doc.text('Authorised Signatory', rightcol2, startY += lineSpacing.NormalSpacing + 25);
                    // doc.save('Invoice.pdf');
                    var string = doc.output('datauristring');
                    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
                    var x = window.open();
                    x.document.open();
                    x.document.write(embed);
                    x.document.close();

                    // var doc = new jsPDF('p', 'pt', 'a4');
                    // var startX = 40;
                    // var InitialstartY = 50;
                    // var startY = 0;
                    // doc.setFontSize(fontSizes.SubTitleFontSize);
                    // doc.setFont("helvetica");
                    // doc.setFontType('bold');
                    // // doc.addImage(imgData,'JPEG',startX,startY+=50,company_logo.w,company_logo.h);
                    // doc.text(comapnyJSON.CompanyName, startX, startY += 15 + company_logo.h, 'left');
                    // doc.setFontSize(fontSizes.NormalFontSize);
                    // doc.setFontType('bold');
                    // doc.text("Phone: ", startX, startY += lineSpacing.NormalSpacing);
                    // doc.setFontType('normal');
                    // doc.text("000000000", 80, startY);
                    // var tempY = InitialstartY;
                    // doc.setFontType('bold');
                    // // //-------Customer Info Billing---------------------
                    // var startBilling = startY;
                    //   doc.text("Product Details,",startX, startY+=lineSpacing.NormalSpacing);
                    //   doc.text(response.data[0].productName, startX, startY+=lineSpacing.NormalSpacing);
                    //   doc.setFontSize(fontSizes.NormalFontSize);
                    //   doc.setFontType('bold');
                    //   doc.text("Batch No :", startX, startY+=lineSpacing.NormalSpacing);
                    //   doc.setFontType('normal');
                    //   doc.text(response.data[0].batchNo, 92, startY);
                    //   doc.setFontSize(fontSizes.NormalFontSize);
                    //   doc.setFontType('bold');
                    //   doc.text("Company :", startX, startY+=lineSpacing.NormalSpacing);
                    //   doc.setFontType('normal');
                    //   doc.text(response.data[0].companyName, 92, startY);
                    //   doc.setFontType('bold');
                    //   doc.text("Expiry Date :", startX, startY+=lineSpacing.NormalSpacing);
                    //   doc.setFontType('normal');
                    //   doc.text(response.data[0].expiryDate, 100, startY);
                    //   doc.setFontType('bold');
                    //   doc.text("Packing :", startX, startY+=lineSpacing.NormalSpacing);
                    //   doc.setFontType('normal');
                    //   doc.text(response.data[0].packing, 89, startY);
                    //   doc.setFontType('bold');
                    //   doc.text("Quantity :", startX, startY+=lineSpacing.NormalSpacing);
                    //   doc.setFontType('normal');
                    //   doc.text(response.data[0].quantity, 89, startY);
                    //   doc.setFontType('bold');
                    //   doc.text("Amount :", startX, startY+=lineSpacing.NormalSpacing);
                    //   doc.setFontType('normal');
                    //   doc.text(response.data[0].amount, 89, startY);
                    // doc.setFontType('bold');
                    // doc.setFontSize(fontSizes.Head2TitleFontSize);
                    // doc.text("Supply Order Details :", 200, startY += lineSpacing.NormalSpacing);
                    // //-------Customer Info Shipping---------------------
                    // startY = startBilling;
                    // doc.setFontSize(8);
                    // doc.setFontStyle('normal');
                    // doc.autoTable({
                    //     startY: 200,
                    //     theme: 'grid',
                    //     columns: columnsInvoice.map(col => ({ ...col, dataKey: col.dataIndex })),
                    //     body: response.data
                    // })

                    // // doc.save('Product.pdf');
                    // var string = doc.output('datauristring');
                    // var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
                    // var x = window.open();
                    // x.document.open();
                    // x.document.write(embed);
                    // x.document.close();
                }




            })
            .catch(error => console.error(`Error:${error}`));

    };
    const columns = [

        {
            title: 'Invoice No',
            dataIndex: 'invoiceNo',
            key: 'invoiceNo',
            width: '10%',
            ...getColumnSearchProps('invoiceNo'),

        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoiceDate',
            key: 'invoiceDate',
            width: '20%',
            ...getColumnSearchProps('invoiceDate'),
            sorter: (a, b) => a.invoiceDate - b.invoiceDate,

        },

        {
            title: 'Invoice Amount',
            dataIndex: 'totalPayable',
            key: 'totalPayable',
            width: '20%',
            ...getColumnSearchProps('totalPayable'),
        },
        {
            title: 'Status',
            dataIndex: 'totalPayable',
            key: 'totalPayable',
            width: '10%',
            ...getColumnSearchProps('totalPayable'),
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
                    <Tooltip title="Generate Summary">
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


    //   Validation 
    const [validated, setValidated] = useState(false)
    // Model Add
    const [visible, setVisible] = useState(false)
    const [itemName, setitemName] = useState('');

    const [productId, setProductId] = useState('');
    const [itemCode, setitemCode] = useState('');
    const [packSize, setpackSize] = useState('');
    const [registrationNo, setregistrationNo] = useState('');
    const [genericName, setgenericName] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [expiryDate, setexpiryDate] = useState(new Date());
    const [batchNo, setbatchNo] = useState('');
    const [maxRetailPrice, setmaxRetailPrice] = useState('');
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
        if (itemName === '' || itemCode === '' || packSize === '' || registrationNo === '' || genericName === '' || companyName === '' || expiryDate === '' || batchNo === '' || maxRetailPrice === '') {
            console.log('fill fieklds')
        } else {
            // POst Request Create Driver
            axios.post(`${url}inventory/addProduct`, {
                itemName: itemName,
                itemCode: itemCode,
                packSize: packSize,
                registrationNo: registrationNo,
                genericName: genericName,
                companyName: companyName,
                expiryDate: expiryDate,
                batchNo: batchNo,
                maxRetailPrice: maxRetailPrice
            }, { headers }).then(response => {
                console.log(response)
                setVisible(false)
                getAllData();
                message.success("Added Product Successfully")
                setitemName('')
                setitemCode('')
                setpackSize('')
                setregistrationNo('')
                setgenericName('')
                setcompanyName('')
                setexpiryDate(new Date())
                setbatchNo('')
                setmaxRetailPrice('')
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
        axios.delete(`${url}inventory/removeProduct`, {
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
        axios.put(`${url}inventory/updateProduct`, {
            _id: productIdEdit,
            itemName: itemNameEdit,
            itemCode: itemCodeEdit,
            packSize: packSizeEdit,
            registrationNo: registrationNoEdit,
            genericName: genericNameEdit,
            companyName: companyNameEdit,
            expiryDate: expiryDateEdit,
            batchNo: batchNoEdit,
            maxRetailPrice: maxRetailPriceEdit

        }, { headers }).then(response => {
            console.log(response);
            getAllData()
            message.success("Updated Product Successfully")

        })
            .catch(err => {
                console.log(err)
            })
    }
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [itemNameEdit, setitemNameEdit] = useState('');
    const [productIdEdit, setProductIdEdit] = useState('');
    const [itemCodeEdit, setitemCodeEdit] = useState('');
    const [packSizeEdit, setpackSizeEdit] = useState('');
    const [registrationNoEdit, setregistrationNoEdit] = useState('');
    const [genericNameEdit, setgenericNameEdit] = useState('');
    const [companyNameEdit, setcompanyNameEdit] = useState('');
    const [expiryDateEdit, setexpiryDateEdit] = useState('');
    const [batchNoEdit, setbatchNoEdit] = useState('');
    const [maxRetailPriceEdit, setmaxRetailPriceEdit] = useState('');
    const [tradePriceEdit, setTradePriceEdit] = useState('');

    const EditData = (idData) => {
        axios.get(`${url}inventory/getProduct`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response;
                console.log(allData);
                setProductIdEdit(response.data._id)
                setitemNameEdit(response.data.itemName)
                setitemCodeEdit(response.data.itemCode)
                setpackSizeEdit(response.data.packSize)
                setregistrationNoEdit(response.data.registrationNo)
                setgenericNameEdit(response.data.genericName)
                setcompanyNameEdit(response.data.companyName)
                setexpiryDateEdit(response.data.expiryDate)
                setbatchNoEdit(response.data.batchNo)
                setmaxRetailPriceEdit(response.data.maxRetailPrice)
                setTradePriceEdit(response.data.tradePrice)

            })
            .catch(error => console.error(`Error:${error}`));
        setVisibleEdit(true)
    }
    // View 
    const [visibleView, setVisibleView] = useState(false)

    const ViewData = (idData) => {
        axios.get(`${url}inventory/getProduct`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setProductIdEdit(response.data._id)
                setitemNameEdit(response.data.itemName)
                setitemCodeEdit(response.data.itemCode)
                setpackSizeEdit(response.data.packSize)
                setregistrationNoEdit(response.data.registrationNo)
                setgenericNameEdit(response.data.genericName)
                setcompanyNameEdit(response.data.companyName)
                setexpiryDateEdit(response.data.expiryDate)
                setbatchNoEdit(response.data.batchNo)
                setmaxRetailPriceEdit(response.data.maxRetailPrice)
                setTradePriceEdit(response.data.tradePrice)
                setVisibleView(true)
            })
            .catch(error => console.error(`Error:${error}`));
    }

    // ADD MRP 

    const OldItem = (idData) => {
        const Id = idData.target.value
        axios.get(`${url}inventory/getProduct`, {
            params: {
                _id: Id
            }
        })
            .then((response) => {
                console.log(response)
                setitemName(response.data.itemName)
                setcompanyName(response.data.companyName)
                setgenericName(response.data.genericName)
            })
    }
    const columnsSalesPartsCheck = [
        {
            title: '',
            width: '10%',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Checkbox onChange={(e) => { CreateProductInvoiceProduct(e.target.checked, record) }}></Checkbox>
                </Space>
            ),
        },
        {
            title: 'Ref No',
            dataIndex: 'SO_refNumber',
            key: 'SO_refNumber',
            width: '10%',
        },
        {
            title: 'Product Name',
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
            title: 'Batch No',
            dataIndex: 'batchNo',
            key: 'batchNo',
            width: '10%',
        },
        {
            title: 'Pack Size',
            dataIndex: 'packSize',
            key: 'packSize',
            width: '10%',
        },

        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: '10%',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10%',
        },
        {
            title: 'Total Payable',
            dataIndex: 'totalAmountPayable',
            key: 'totalAmountPayable',
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
    const columnsSales = [
        {
            title: '',
            width: '10%',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Checkbox onChange={(e) => { CreateProductInvoice(e.target.checked, record) }}></Checkbox>
                </Space>
            ),
        },
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
        },
        {
            title: 'Delivery Status',
            dataIndex: 'orderDeliveryStatus',
            key: 'orderDeliveryStatus',
            width: '20%',
        },
        {
            title: 'Sale Order State',
            dataIndex: 'saleOrderState',
            key: 'saleOrderState',
            width: '20%',
        },
       

       

    ];
    const GenerateInvoice = () => {
        // Get Invoice 
        axios.get(`${url}invoice/GetInvoice`, {
            params: {
                _id: InvoiceId
            }
        })
            .then((response) => {
                console.log('Historyyyyyyyyyyyyyyyyy')
                const allData = response.data;
                console.log(allData);
                setSaleProductsDetails(response.data.products)
                // PdfData();
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
                doc.text("Supply Order Date :", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.supplyOrderDate, 134, startY);
                doc.setFontType('bold');
                doc.text("Valid Till :", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.SupplyOrderValid, 90, startY);
                doc.setFontType('bold');
                doc.text("EMAIL", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(comapnyJSON.companyEmail, 80, startY);
                doc.setFontType('bold');
                doc.text("Phone: ", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(comapnyJSON.companyPhno, 80, startY);
                var tempY = InitialstartY;
                doc.setFontType('bold');
                doc.text("INVOICE NO: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.invoiceNo, rightStartCol2, tempY);
                doc.setFontType('bold');
                doc.text("INVOICE type: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.typeOfInvoice, rightStartCol2, tempY);
                doc.setFontType('bold');
                doc.text("INVOICE Date: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.invoiceDate, rightStartCol2, tempY);
                doc.setFontType('bold');
                doc.text("INVOICE Due: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.dueDate, rightStartCol2, tempY);
                doc.setFontType('bold');
                doc.text("Reference No: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.SuplyRefNo, rightStartCol2, tempY);
                doc.setFontType('bold');
                doc.text("Summary No: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.pickSummaryNo, rightStartCol2, tempY);
                doc.setFontType('bold');
                doc.text("Total: ", rightStartCol1, tempY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.totalPayable, rightStartCol2, tempY);
                doc.setFontType('normal');
                doc.setLineWidth(1);
                doc.setFontSize(fontSizes.Head2TitleFontSize);
                doc.setFontType('bold');
                doc.setFontSize(fontSizes.NormalFontSize);
                doc.setFontType('bold');
                //-------Customer Info Billing---------------------
                var startBilling = startY;

                doc.text("Customer Details,", startX, startY += lineSpacing.NormalSpacing);
                doc.text(response.data.customerName, startX, startY += lineSpacing.NormalSpacing);
                doc.setFontSize(fontSizes.NormalFontSize);
                doc.setFontType('bold');
                doc.text("Phone", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.CustomerPhone, 85, startY);
                doc.setFontSize(fontSizes.NormalFontSize);
                doc.setFontType('bold');
                doc.text("CNIC", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.CustomerCNIC, 85, startY);
                doc.setFontType('bold');
                doc.text("Address", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.customerAddress, 85, startY);
                doc.setFontType('bold');
                doc.text("NTN :", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.CustomerNTN, 85, startY);
                doc.setFontType('bold');
                doc.text("Reg No :", startX, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.CustomerSalesTaxRegNo, 85, startY);
                doc.setFontType('bold');
                //-------Customer Info Shipping---------------------
                var rightcol1 = 340;
                var rightcol2 = 400;
                startY = startBilling;
                doc.setFontType('bold');
                doc.text("Shipping Address,", 310, 210);
                doc.setFontSize(fontSizes.NormalFontSize);
                doc.setFontType('bold');
                doc.text("Address", 310, 230);
                doc.setFontType('normal');
                doc.text(response.data.customerAddress, 360, 230);
                doc.setFontType('bold');
                doc.text("Phone: ", 310, 250);
                doc.setFontType('normal');
                doc.text(response.data.CustomerPhone, 360, 250);

                var header = function (data) {
                    doc.setFontSize(8);
                    doc.setTextColor(40);
                    doc.setFontStyle('normal');
                };
                doc.setFontSize(8);
                doc.setFontStyle('normal');
                var options = {
                    beforePageContent: header,
                    margin: {
                        top: 50
                    },
                    styles: {
                        overflow: 'linebreak',
                        fontSize: 8,
                        rowHeight: 'auto',
                        columnWidth: 'wrap'
                    },
                    columnStyles: {
                        1: { columnWidth: 'auto' },
                        2: { columnWidth: 'auto' },
                        3: { columnWidth: 'auto' },
                        4: { columnWidth: 'auto' },
                        5: { columnWidth: 'auto' },
                        6: { columnWidth: 'auto' },
                    },
                    startY: startY += 50
                };

                doc.autoTable({
                    startY: 260,
                    theme: 'grid',
                    columns: columnsInvoice.map(col => ({ ...col, dataKey: col.dataIndex })),
                    body: response.data.products
                })
                //-------Invoice Footer---------------------
                var rightcol1 = 340;
                var rightcol2 = 430;

                startY = doc.autoTableEndPosY() + 30;
                doc.setFontSize(fontSizes.NormalFontSize);

                doc.setFontType('bold');


                doc.text("Amount,", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.text(response.data.amountRs, rightcol2, startY);
                doc.setFontSize(fontSizes.NormalFontSize);
                doc.setFontType('bold');
                doc.text("Sales Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.salesTax, rightcol2, startY);
                doc.setFontType('bold');
                doc.text("General Sales Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.generalSalesTax, rightcol2, startY);
                doc.setFontType('bold');
                doc.text("Advance Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.advanceTax, rightcol2, startY);
                doc.setFontType('bold');
                doc.text("Further Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.furtherTax, rightcol2, startY);
                doc.setFontType('bold');
                doc.text("INVOICE TAX.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.text("Discount.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.invoiceDiscount, rightcol2, startY);

                doc.setFontType('bold');
                doc.text("Sales Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.invoiceSalesTax, rightcol2, startY);

                doc.setFontType('bold');
                doc.text("General Sales Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.invoiceGeneralSalesTax, rightcol2, startY);

                doc.setFontType('bold');
                doc.text("Advance Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.invoiceAdvanceTax, rightcol2, startY);

                doc.setFontType('bold');
                doc.text("Further Tax.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.invoiceFurtherTax, rightcol2, startY);

                doc.setFontType('bold');
                doc.text("Grand Total Rs.", rightcol1, startY += lineSpacing.NormalSpacing);
                doc.setFontType('normal');
                doc.text(response.data.totalPayable, rightcol2 + 25, startY);
                doc.setFontType('bold');
                doc.text('For ' + comapnyJSON.CompanyName + ',', rightcol2, startY += lineSpacing.NormalSpacing + 25);
                doc.text('Authorised Signatory', rightcol2, startY += lineSpacing.NormalSpacing + 25);
                doc.save('Invoice.pdf');

                // Empty all 
                setInvoiceId('')
                setNotesInvoice('')
                setDiscountInvoice('')
                setDeliveryChallanInvoice('')
                setSummaryInvoice('')
                setBookedByInvoice('')
                setDeliveredByInvoice('')
                setTypeOfInvoice('')
                setDisableInvoiceInput(false);
                setshowHideDemoAdd(false);
                setShowHideDemoSelect(true);

            })
            .catch(error => console.error(`Error:${error}`));
    }
    const [DataSupplyOrderId,setDataSupplyOrderId]=useState('')
    
    const CreateProductInvoiceProduct = (Checked, record) => {
        console.log("record.productId")
        console.log(record)
        // console.log(record.totalAmountPayable)
        axios.post(`${url}invoice/createInvoiceProduct`, {
          InvoiceId: InvoiceId,
          productId: record.productId,
          quantity: record.quantity,
          packing: record.packSize,
          totalAmount: record.totalAmountPayable,
    
        }, { headers }).then(response => {
          console.log(response)
          // setVisible(false)
          // setInvoiceId(response._id)
          // getAllData();
          // setDisableInvoiceInput(true);
          // setshowHideDemoAdd(true);
          // setShowHideDemoSelect(false);
    
        })
          .catch(err => {
            console.log(err)
          })
    }
    const CreateProductInvoice = (Checked, record) => {
        console.log("record.productId")
        console.log(record)
        setDataSalesParts(record.salePartsId)
        setDataSupplyOrderId(record.supplyOrderId._id)
        setCurrent(1)
        // setCustomerNameEdit(response.data.CustomerName)
        // setCustomerPhoneEdit(response.data.PhoneNumber)
        // setCustomerCPEdit(response.data.ContactPerson)
        // setrefNumberEdit(response.data.SO_refNumber)
        // setSPCategoryEdit(response.data.supplyOrderId.SPCategory)
        // setSPIDEdit(response.data.supplyOrderId._id)

        // settypeOforderEdit(response.data.supplyOrderId.typeOforder)
        // setdateOfOrderEdit(response.data.supplyOrderId.dateOfOrder)
        // setorderValidTillEdit(response.data.supplyOrderId.orderValidTill)
        // setStatusEdit(response.data.supplyOrderId.Status)
        // setsaleOrderStateEdit(response.data.saleOrderState)
        // setdeliveryStatusEdit(response.data.orderDeliveryStatus)

    }
    const CreateInvoice = () => {
        axios.post(`${url}invoice/addInvoice`, {
            typeOfInvoice: TypeOfInvoice,
            supplyOrderId: DataSupplyOrderId,
            invoiceDate: dateOfInvoice,
            dueDate: dueDateInvoice,
            deliveryChallanNo: DeliveryChallanInvoice,
            bookedBy: BookedByInvoice,
            deliveredBy: DeliveredByInvoice,
            pickSummaryNo: SummaryInvoice,
            invoiceDiscount: DiscountInvoice,
            notes: NotesInvoice,
        }, { headers }).then(response => {
            console.log("response.data._id")

            console.log(response.data)
            setVisible(false)
            setInvoiceId(response.data._id)
            getAllData();
            setDisableInvoiceInput(true);
            setshowHideDemoAdd(true);
            setShowHideDemoSelect(false);

        })
            .catch(err => {
                console.log(err)
            })



    }
    const [SPIDEdit, setSPIDEdit] = useState('')

    const [StaffSales, setStaffSales] = useState([])
    const [StaffDelivery, setStaffDelivery] = useState([])
    const [showHideDemoSelect, setShowHideDemoSelect] = useState(true)

    const [InvoiceId, setInvoiceId] = useState('')

    const [SupplyCusDetails, setSupplyCusDetails] = useState([])
    const [BillingCusDetails, setBillingCusDetails] = useState([])
    const [SaleProductsDetails, setSaleProductsDetails] = useState([])
    const [SummaryInvoice, setSummaryInvoice] = useState('')
    const [DeliveryChallanInvoice, setDeliveryChallanInvoice] = useState('')
    const [DiscountInvoice, setDiscountInvoice] = useState('')
    const [NotesInvoice, setNotesInvoice] = useState('')

    const [dateOfInvoice, setdateOfInvoice] = useState(new Date());
    const [dueDateInvoice, setDueDateInvoice] = useState(new Date())

    const [BookedByInvoice, setBookedByInvoice] = useState('')
    const [DeliveredByInvoice, setDeliveredByInvoice] = useState('')
    const [TypeOfInvoice, setTypeOfInvoice] = useState('')
    const [showHideDemoAdd, setshowHideDemoAdd] = useState(false)
    const [customerTax, setCustomerTax] = useState([])

    const [dataSalesParts, setDataSalesParts] = useState([]);

    const [dataSales, setDataSales] = useState([]);


    const [disableInvoiceInput, setDisableInvoiceInput] = useState(false)
    const [current, setCurrent] = useState(0);
    const steps = [
        {
            title: 'Select Sales Order',
            content:  <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 12 }}>
            <div className='tableResponsive'>
                <Table columns={columnsSales} dataSource={dataSales} bordered size='small'/>
            </div>
        </CRow>,
        },
        {
            title: 'Invoice of Selected Order',
            content:  
            <div className='tableResponsive'>
                              <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 4 }}>
                                <CCol xs>
                                  <CFormSelect value={TypeOfInvoice}
                                    label="Type of Invoice"
                                    disabled={disableInvoiceInput}
                                    onChange={(e) => setTypeOfInvoice(e.target.value)
                                    } required className='itemPadding' aria-label="Default select example">
                                    <option value="">Select Type of Invoice</option>
                                    <option value="Tax Invoice">Tax Invoice</option>
                                    <option value="Cash Invoice">Cash Invoice</option>
                                  </CFormSelect>
                                  <CFormSelect label="Booked By"
                                    value={BookedByInvoice}
                                    disabled={disableInvoiceInput}
                                    className='itemPadding'
                                    onChange={(e) => setBookedByInvoice(e.target.value)}
                                  >
                                    <option value="">Select Staff</option>
                                    {StaffSales.map((row) => (
                                      <option value={row._id}>{row.employeeName}</option>
                                    ))}

                                  </CFormSelect>
                                  <CFormInput
                                    type="text"
                                    label="Applicable Tax"
                                    disabled
                                    required className='itemPadding'
                                    // placeholder="Enter Qualification"
                                    value={customerTax}
                                    onChange={(e) => setCustomerTax(e.target.value)
                                    }
                                  />


                                </CCol>
                                <CCol xs>
                                  <Typography variant="h6" style={{ fontSize: '16px' }}>Select Date of Invoice</Typography>
                                  <DatePicker className='itemPadding' wrapperClassName="date-picker" disabled selected={dateOfInvoice} onChange={(date) => setdateOfInvoice(date)} />
                                  <CFormSelect label="Delivered By"
                                    value={DeliveredByInvoice}
                                    disabled={disableInvoiceInput}
                                    className='itemPadding'
                                    onChange={(e) => setDeliveredByInvoice(e.target.value)}
                                  >
                                    <option value="">Select Staff</option>
                                    {StaffDelivery.map((row) => (
                                      <option value={row._id}>{row.employeeName}</option>
                                    ))}

                                  </CFormSelect>
                                </CCol>
                                <CCol xs>
                                  <Typography variant="h6" style={{ fontSize: '16px' }}>Select Due Date</Typography>
                                  <DatePicker className='itemPadding' wrapperClassName="date-picker" disabled={disableInvoiceInput} selected={dueDateInvoice} onChange={(date) => setDueDateInvoice(date)} />

                                  <CFormInput
                                    type="text"
                                    label="Summary No"
                                    disabled={disableInvoiceInput}
                                    required className='itemPadding'
                                    // placeholder="Enter Qualification"
                                    value={SummaryInvoice}
                                    onChange={(e) => setSummaryInvoice(e.target.value)
                                    }
                                  />
                                </CCol>
                                <CCol xs>
                                  <CFormInput
                                    type="text"
                                    label="Delivery Challan No"
                                    disabled={disableInvoiceInput}
                                    required className='itemPadding'
                                    // placeholder="Enter Qualification"
                                    value={DeliveryChallanInvoice}
                                    onChange={(e) => setDeliveryChallanInvoice(e.target.value)
                                    }
                                  />
                                  <CFormInput
                                    type="text"
                                    disabled={disableInvoiceInput}
                                    label="Discount Invoice"
                                    required className='itemPadding'
                                    // placeholder="Enter Qualification"
                                    value={DiscountInvoice}
                                    onChange={(e) => setDiscountInvoice(e.target.value)
                                    }
                                  />
                                </CCol>
                              </CRow>
                              <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                  <CFormTextarea
                                    label="Notes"
                                    value={NotesInvoice}
                                    required
                                    disabled={disableInvoiceInput}
                                    className='itemPadding'
                                    onChange={(e) => setNotesInvoice(e.target.value)
                                    }
                                    rows="3"></CFormTextarea>
                                </CCol>
                              </CRow>
            </div>
        ,
        },
        {
            title: 'Invoice of Sales',
            content:  <div className='tableResponsive'>
            <Table columns={columnsSalesPartsCheck} dataSource={dataSalesParts} />
        </div>,
        },
    ];
    const next = () => {
        if(current==1){
            console.log("Save Invoice")
            axios.post(`${url}invoice/addInvoice`, {
                typeOfInvoice: TypeOfInvoice,
                supplyOrderId: DataSupplyOrderId,
                invoiceDate: dateOfInvoice,
                dueDate: dueDateInvoice,
                deliveryChallanNo: DeliveryChallanInvoice,
                bookedBy: BookedByInvoice,
                deliveredBy: DeliveredByInvoice,
                pickSummaryNo: SummaryInvoice,
                invoiceDiscount: DiscountInvoice,
                notes: NotesInvoice,
            }, { headers }).then(response => {
                console.log("response.data._id")
                console.log(response.data)
                setInvoiceId(response.data._id)
                setDisableInvoiceInput(true);
                setCurrent(current + 1);
    
            })
                .catch(err => {
                    console.log(err)
                })
        }else{
            setCurrent(current + 1);

        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <>
            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }} >
                <CCol xs>
                    <CBreadcrumb style={{ marginBottom: '40px' }}>
                        <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
                        <CBreadcrumbItem active>Invoicing</CBreadcrumbItem>
                    </CBreadcrumb>

                </CCol>
            </CRow>
            <CRow xs={{ cols: 2, gutter: 4 }} md={{ cols: 6 }}>
                <CCol xs style={{ flexGrow: 1 }}>
                    <h4>Invoice</h4>
                </CCol>
                <CCol xs>
                    <CButton style={{ marginTop: '-20px' }} color="primary" onClick={() => setVisible(!visible)}>+ Invoice</CButton>

                </CCol>
            </CRow>
            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 12 }}>
                <div className='tableResponsive'>
                    <Table columns={columns} dataSource={data} size='small' bordered />
                </div>
            </CRow>
            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }}>
                {/* Delete  */}
                <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
                    <CModalHeader onClose={() => setVisibleDelete(false)}>
                        <CModalTitle>Delete Product</CModalTitle>
                    </CModalHeader>
                    <CModalBody>Are you sure you want to delete this product!</CModalBody>
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
                        <CModalTitle> Product Details</CModalTitle>
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
                                        id="itemName"
                                        className='itemPadding'
                                        label="Item Name"
                                        // placeholder="Enter item name"
                                        aria-describedby="itemName"
                                        required
                                        disabled
                                        value={itemNameEdit}
                                        onChange={(e) => setitemNameEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="itemCode"
                                        className='itemPadding'
                                        label="Item Code"
                                        // placeholder="Enter Item Code"
                                        aria-describedby="itemCode"
                                        required
                                        disabled
                                        value={itemCodeEdit}
                                        onChange={(e) => setitemCodeEdit(e.target.value)
                                        }
                                    /> <CFormInput
                                        type="text"
                                        id="packSize"
                                        className='itemPadding'
                                        label="Pack Size"
                                        // placeholder="Enter Pack Size"
                                        required
                                        disabled
                                        aria-describedby="packSize"
                                        value={packSizeEdit}
                                        onChange={(e) => setpackSizeEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="expiryDate"
                                        className='itemPadding'
                                        label="Expiry Date"
                                        required
                                        disabled
                                        // placeholder="Enter Expiry Date"
                                        aria-describedby="expiryDate"
                                        value={expiryDateEdit}
                                        onChange={(e) => setexpiryDateEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        className='itemPadding'
                                        label="Max Retail Price"
                                        required
                                        disabled
                                        // placeholder="Enter Batch No"
                                        value={maxRetailPriceEdit}
                                        onChange={(e) => setmaxRetailPriceEdit(e.target.value)
                                        }
                                    />


                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        className='itemPadding'
                                        id="registrationNo"
                                        label="Registration No"
                                        required
                                        disabled
                                        // placeholder="Enter Registration No"
                                        aria-describedby="registrationNo"
                                        value={registrationNoEdit}
                                        onChange={(e) => setregistrationNoEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="genericName"
                                        label="Generic Name"
                                        required
                                        className='itemPadding'
                                        disabled
                                        // placeholder="Enter Generic Name"
                                        aria-describedby="genericName"
                                        value={genericNameEdit}
                                        onChange={(e) => setgenericNameEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"

                                        label="Company Name"
                                        // placeholder="Enter Company Name"
                                        required
                                        className='itemPadding'
                                        disabled
                                        aria-describedby="companyName"
                                        value={companyNameEdit}
                                        onChange={(e) => setcompanyNameEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="batchNo"
                                        className='itemPadding'
                                        label="Batch No"
                                        required
                                        disabled
                                        // placeholder="Enter Batch No"
                                        aria-describedby="batchNo"
                                        value={batchNoEdit}
                                        onChange={(e) => setbatchNoEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        className='itemPadding'
                                        label="TradePrice"
                                        required
                                        disabled
                                        // placeholder="Enter Batch No"
                                        value={tradePriceEdit}
                                        onChange={(e) => setTradePriceEdit(e.target.value)
                                        }
                                    />

                                </CCol>
                            </CRow>
                        </CForm>

                    </CModalBody>
                </CModal>
                {/* MRP  */}

                {/* Edit  */}
                <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
                    <CModalHeader onClose={() => setVisibleEdit(false)}>
                        <CModalTitle>Update Product</CModalTitle>
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
                                        id="itemName"
                                        label="Item Name*"
                                        // placeholder="Enter item name"
                                        aria-describedby="itemName"
                                        required
                                        className='itemPadding'
                                        value={itemNameEdit}
                                        onChange={(e) => setitemNameEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="itemCode"
                                        label="Item Code*"
                                        // placeholder="Enter Item Code"
                                        aria-describedby="itemCode"
                                        required
                                        className='itemPadding'
                                        value={itemCodeEdit}
                                        onChange={(e) => setitemCodeEdit(e.target.value)
                                        }
                                    /> <CFormInput
                                        type="text"
                                        id="packSize"
                                        label="Pack Size*"
                                        // placeholder="Enter Pack Size"
                                        required
                                        className='itemPadding'
                                        aria-describedby="packSize"
                                        value={packSizeEdit}
                                        onChange={(e) => setpackSizeEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="expiryDate"
                                        label="Expiry Date*"
                                        required
                                        className='itemPadding'
                                        // placeholder="Enter Expiry Date"
                                        aria-describedby="expiryDate"
                                        value={expiryDateEdit}
                                        onChange={(e) => setexpiryDateEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="number"
                                        label="Max Retail Price*"
                                        required
                                        className='itemPadding'
                                        // placeholder="Enter Expiry Date"
                                        value={maxRetailPriceEdit}
                                        onChange={(e) => setmaxRetailPriceEdit(e.target.value)
                                        }
                                    />


                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        id="registrationNo"
                                        label="Registration No*"
                                        required
                                        className='itemPadding'
                                        // placeholder="Enter Registration No"
                                        aria-describedby="registrationNo"
                                        value={registrationNoEdit}
                                        onChange={(e) => setregistrationNoEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="batchNo"
                                        label="Batch No*"
                                        required
                                        className='itemPadding'
                                        // placeholder="Enter Batch No"
                                        aria-describedby="batchNo"
                                        value={batchNoEdit}
                                        onChange={(e) => setbatchNoEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="genericName"
                                        label="Generic Name*"
                                        required
                                        className='itemPadding'
                                        // placeholder="Enter Generic Name"
                                        aria-describedby="genericName"
                                        value={genericNameEdit}
                                        onChange={(e) => setgenericNameEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="companyName"
                                        label="Company Name*"
                                        className='itemPadding'
                                        // placeholder="Enter Company Name"
                                        required
                                        aria-describedby="companyName"
                                        value={companyNameEdit}
                                        onChange={(e) => setcompanyNameEdit(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        className='itemPadding'
                                        label="TradePrice"
                                        required
                                        disabled
                                        // placeholder="Enter Batch No"
                                        value={tradePriceEdit}
                                        onChange={(e) => setTradePriceEdit(e.target.value)
                                        }
                                    />

                                </CCol>
                            </CRow>
                        </CForm>
                    </CModalBody>
                    <CModalFooter >
                        <div className="d-grid gap-2 col-12 mx-auto">
                            <CButton color="primary" onClick={UpdateProductData}>Save</CButton>
                        </div>
                    </CModalFooter>
                </CModal>
                {/* Add  */}
                <CModal
                    // visible={visible} 
                    // onClose={() => setVisible(false)} 
                    size="lg">
                    <CModalHeader >
                        <CModalTitle> Select Supply Order</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <h5>Invoice</h5>
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 4 }}>
                                <CCol xs>
                                    <CFormSelect value={TypeOfInvoice}
                                        label="Type of Invoice"
                                        disabled={disableInvoiceInput}
                                        onChange={(e) => setTypeOfInvoice(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option value="">Select Type of Invoice</option>
                                        <option value="Tax Invoice">Tax Invoice</option>
                                        <option value="Cash Invoice">Cash Invoice</option>
                                    </CFormSelect>
                                    <CFormSelect label="Booked By"
                                        value={BookedByInvoice}
                                        disabled={disableInvoiceInput}
                                        className='itemPadding'
                                        onChange={(e) => setBookedByInvoice(e.target.value)}
                                    >
                                        <option value="">Select Staff</option>
                                        {StaffSales.map((row) => (
                                            <option value={row._id}>{row.employeeName}</option>
                                        ))}

                                    </CFormSelect>
                                    <CFormInput
                                        type="text"
                                        label="Applicable Tax"
                                        disabled
                                        required className='itemPadding'
                                        // placeholder="Enter Qualification"
                                        value={customerTax}
                                        onChange={(e) => setCustomerTax(e.target.value)
                                        }
                                    />


                                </CCol>
                                <CCol xs>
                                    <Typography variant="h6" style={{ fontSize: '16px' }}>Select Date of Invoice</Typography>
                                    <DatePicker className='itemPadding' wrapperClassName="date-picker" disabled selected={dateOfInvoice} onChange={(date) => setdateOfInvoice(date)} />
                                    <CFormSelect label="Delivered By"
                                        value={DeliveredByInvoice}
                                        disabled={disableInvoiceInput}
                                        className='itemPadding'
                                        onChange={(e) => setDeliveredByInvoice(e.target.value)}
                                    >
                                        <option value="">Select Staff</option>
                                        {StaffDelivery.map((row) => (
                                            <option value={row._id}>{row.employeeName}</option>
                                        ))}

                                    </CFormSelect>
                                </CCol>
                                <CCol xs>
                                    <Typography variant="h6" style={{ fontSize: '16px' }}>Select Due Date</Typography>
                                    <DatePicker className='itemPadding' wrapperClassName="date-picker" disabled={disableInvoiceInput} selected={dueDateInvoice} onChange={(date) => setDueDateInvoice(date)} />

                                    <CFormInput
                                        type="text"
                                        label="Summary No"
                                        disabled={disableInvoiceInput}
                                        required className='itemPadding'
                                        // placeholder="Enter Qualification"
                                        value={SummaryInvoice}
                                        onChange={(e) => setSummaryInvoice(e.target.value)
                                        }
                                    />
                                </CCol>
                                <CCol xs>
                                    <CFormInput
                                        type="text"
                                        label="Delivery Challan No"
                                        disabled={disableInvoiceInput}
                                        required className='itemPadding'
                                        // placeholder="Enter Qualification"
                                        value={DeliveryChallanInvoice}
                                        onChange={(e) => setDeliveryChallanInvoice(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        disabled={disableInvoiceInput}
                                        label="Discount Invoice"
                                        required className='itemPadding'
                                        // placeholder="Enter Qualification"
                                        value={DiscountInvoice}
                                        onChange={(e) => setDiscountInvoice(e.target.value)
                                        }
                                    />
                                </CCol>
                            </CRow>
                            <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                <CCol xs>
                                    <CFormTextarea
                                        label="Notes"
                                        value={NotesInvoice}
                                        required
                                        disabled={disableInvoiceInput}
                                        className='itemPadding'
                                        onChange={(e) => setNotesInvoice(e.target.value)
                                        }
                                        rows="3"></CFormTextarea>
                                </CCol>
                            </CRow>
                            {showHideDemoSelect && <>
                                <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                    <CCol xs>
                                        <CButton color="primary" style={{ float: 'right' }} onClick={CreateInvoice}>Select Sale Order</CButton>
                                    </CCol>
                                </CRow>
                            </>}

                            {showHideDemoAdd && <>
                                <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                    <CCol xs>
                                        <h5 style={{ textAlign: 'center' }}>Sale Order Details</h5>
                                    </CCol>
                                </CRow>
                                <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 12 }}>
                                    <div className='tableResponsive'>
                                        <Table columns={columnsSalesPartsCheck} dataSource={dataSalesParts} />
                                    </div>
                                </CRow>
                                <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 12 }}>
                                    <CButton color="primary" style={{ float: 'right' }} onClick={GenerateInvoice}>Generate Invoice</CButton>
                                </CRow>
                            </>
                            }

                        </CForm>

                    </CModalBody>
                </CModal>
                <CModal alignment="center" size='lg' visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                        <CModalTitle>Add Invoice</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <Steps current={current}>
                                {steps.map((item) => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            <div className="steps-content">
                                <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 1 }}>
                                    <CCol xs>
                                        <h5 style={{ textAlign: 'center' }}>{steps[current].title}</h5>

                                    </CCol>

                                </CRow>
                                {steps[current].content}
                            </div>
                            <div className="steps-action">
                                {current < steps.length - 1 && (
                                    <Button type="primary" onClick={() => next()}>
                                        Next
                                    </Button>
                                )}
                                {current === steps.length - 1 && (
                                    <Button type="primary" onClick={GenerateInvoice}>
                                        Generate Invoice
                                    </Button>
                                )}
                                {/* {current > 0 && (
                                    <Button
                                        style={{
                                            margin: '0 8px',
                                        }}
                                        onClick={() => prev()}
                                    >
                                        Previous
                                    </Button>
                                )} */}
                            </div>
                            {/* <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 1 }}>
<CCol xs>
<h5 style={{textAlign:'center'}}>Select from Sale Order</h5>

</CCol>

                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 1 }}>
<CCol xs>
<CFormSelect 
                                // value={OldItem}
                                        label="Select from Invoicing"
                                        onChange={(e) => {OldItem(e)}}
                                        // setOld}
                                            
                                        
                                        // } 
                                        required className='itemPadding' aria-label="Default select example">
                                        <option value="" >Select Product</option>
                                        {data.map((row) => (
                                            <option value={row._id}>{row.itemName}</option>
                                        ))}
                                    </CFormSelect>

    </CCol>
    </CRow>
    <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 1 }}>
<CCol xs>
<h5 style={{textAlign:'center'}}>Add New Product</h5>

</CCol>

                            </CRow>
                            <CRow xs={{ cols: 1 }} md={{ cols: 2 }}>
                                
                            </CRow> */}
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

export default Invoicing