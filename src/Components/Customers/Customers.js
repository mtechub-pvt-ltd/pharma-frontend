import React, { useState, useEffect, useRef } from 'react'
import {
    CCardBody,
    CCardTitle,
    CRow,
    CCol,
    CCard,
    CButton,
    CCardText,
    CFormSelect,
    CContainer,
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
    CToast,
    CToastBody,
    CToastHeader
} from '@coreui/react'
import jsPDF from "jspdf";
import 'jspdf-autotable'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteTwoTone, EyeTwoTone, PrinterTwoTone, FileTwoTone, EditTwoTone } from '@ant-design/icons';
import { Table, Button, Input, Space, Badge,message } from 'antd';
import { Tooltip } from 'antd';
// import './stylesheet.css'
import axios from "axios";
import '../tableStyle.css'
import url from '../url'
function Customers() {
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
    const [loading, setLoading] = useState(false);
    const getAllData = () => {
        axios.get(`${url}customer/getAllCustomers`)
            .then((response) => {
                const allData = response.data;
                console.log(response.data);
                setData(response.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
    useEffect(() => {
        getAllData();

    }, []);
    const columns = [
        {
            title: 'License No',
            dataIndex: 'licenseNumber',
            key: 'licenseNumber',
            width: '20%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '10%',
            // ...getColumnSearchProps('name'),
        },
        {
            title: 'Contact Person',
            dataIndex: 'contactPerson',
            key: 'contactPerson',
            width: '20%',
            ...getColumnSearchProps('contactPerson'),
        },
        {
            title: 'Type of Customer',
            dataIndex: 'typeOfCustomer',
            key: 'typeOfCustomer',
            width: '20%',
            // ...getColumnSearchProps('typeOfCustomer'),
            render: (_, record) => (
                <Space size="middle">
                    {/* Verify User */}

                    {record.typeOfCustomer == "Distributer" ? <Badge count='Distributer' style={{
                        backgroundColor: '#52c41a',
                    }} />
                        : <>
                            {record.typeOfCustomer == "Retailer" ? <Badge count='Retailer' style={{
                                backgroundColor: 'orange',
                            }} />
                                : <Badge count='Institution' style={{
                                    backgroundColor: '#3c4b64',
                                }} />}</>
                        //    <Badge count='Not Verified' style={{
                        //     backgroundColor: 'red',
                        //   }} />
                    }
                </Space>
            ),
        },
        {
            title: 'Tax',
            dataIndex: 'applicabletax',
            key: 'applicabletax',
            width: '10%',
            // ...getColumnSearchProps('name'),
        },
        {
            title: 'Action',
            width: '50%',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Tax">

                        <h6 className='linkBtn' onClick={() => {
                            ViewTaxData(record._id)
                        }}><FileTwoTone twoToneColor="orange" />
                        </h6>
                    </Tooltip>
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
            title: 'Ref No',
            dataIndex: 'refNumber',
            key: 'refNumber',
            width: '20%',
        },
        {
            title: 'Type Of Order',
            dataIndex: 'typeOforder',
            key: 'typeOforder',
            width: '20%',
        },
        {
            title: 'Date of Order',
            dataIndex: 'dateOfOrder',
            key: 'dateOfOrder',
            width: '20%',
        },
        {
            title: 'Order Valid Till',
            dataIndex: 'orderValidTill',
            key: 'orderValidTill',
            width: '20%',
        },
        {
            title: 'Category',
            dataIndex: 'SPCategory',
            key: 'SPCategory',
            width: '20%',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: '20%',
        },

    ];
    // Print 
    const PrintData = (idData) => {
        axios.get(`${url}customer/getCustomerSupplyOrder`, {
            params: {
                customerId: idData
            }
        })
            .then((response) => {
                console.log('History')
                if(response.data==""){
                    message.error("No Supply Order for that Customer")
                }else{
                    const allData = response.data;
                    console.log(allData);
                    var doc = new jsPDF('p', 'pt', 'a4');
                    var startX = 40;
                    var InitialstartY = 50;
                    var startY = 0;
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
                    // //-------Customer Info Billing---------------------
                    var startBilling = startY;
                    doc.text("Customer Details,", startX, startY += lineSpacing.NormalSpacing);
                    doc.text(response.data[0].customerId.name, startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontSize(fontSizes.NormalFontSize);
                    doc.setFontType('bold');
                    doc.text("Phone", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data[0].customerId.phone, 85, startY);
                    doc.setFontSize(fontSizes.NormalFontSize);
                    doc.setFontType('bold');
                    doc.text("CNIC", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data[0].customerId.cnicOfPropreitor, 85, startY);
                    doc.setFontType('bold');
                    doc.text("Address", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data[0].customerId.address, 85, startY);
                    doc.setFontType('bold');
                    doc.text("NTN :", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data[0].customerId.ntnNumber, 85, startY);
                    doc.setFontType('bold');
                    doc.text("Reg No :", startX, startY += lineSpacing.NormalSpacing);
                    doc.setFontType('normal');
                    doc.text(response.data[0].customerId.salesTaxNumber, 85, startY);
                    doc.setFontType('bold');
                    doc.setFontSize(fontSizes.Head2TitleFontSize);
                    doc.text("Supply Order Details :", 200, startY += lineSpacing.NormalSpacing);
                    //-------Customer Info Shipping---------------------
                    startY = startBilling;
                    doc.setFontSize(8);
                    doc.setFontStyle('normal');
                    doc.autoTable({
                        startY: 200,
                        theme: 'grid',
                        columns: columnsInvoice.map(col => ({ ...col, dataKey: col.dataIndex })),
                        body: response.data
                    })
    
                    // doc.save('Customer.pdf');
                    var string = doc.output('datauristring');
                    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
                    var x = window.open();
                    x.document.open();
                    x.document.write(embed);
                    x.document.close();
    
    
                }
              

            })
            .catch(error => console.error(`Error:${error}`));

    };
    // Search Data 
    // Toast 
    const [toast, addToast] = useState(0)
    const [toastDelete, addToastDelete] = useState(0)

    const toaster = useRef()
    const exampleToast = (
        <CToast>
            <CToastHeader closeButton>
                <svg
                    className="rounded me-2"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                >
                    <rect width="100%" height="100%" fill="#007aff"></rect>
                </svg>
                <strong className="me-auto">Message</strong>
            </CToastHeader>
            <CToastBody>Product Added Successfully.</CToastBody>
        </CToast>
    )
    const exampleToastDelete = (
        <CToast>
            <CToastHeader closeButton>
                <svg
                    className="rounded me-2"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                >
                    <rect width="100%" height="100%" fill="#007aff"></rect>
                </svg>
                <strong className="me-auto">Message</strong>
            </CToastHeader>
            <CToastBody>Product Deleted Successfully.</CToastBody>
        </CToast>
    )
    const exampleToastUpdate = (
        <CToast>
            <CToastHeader closeButton>
                <svg
                    className="rounded me-2"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    role="img"
                >
                    <rect width="100%" height="100%" fill="#007aff"></rect>
                </svg>
                <strong className="me-auto">Message</strong>
            </CToastHeader>
            <CToastBody>Product Updated Successfully.</CToastBody>
        </CToast>
    )
    //   Validation 
    const [validated, setValidated] = useState(false)
    // Model Add
    const [visible, setVisible] = useState(false)
    const [name, setname] = useState('');

    const [productId, setProductId] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [cnicOfPropreitor, setcnicOfPropreitor] = useState('');
    const [accountNumber, setaccountNumber] = useState('');
    const [salesTaxNumber, setsalesTaxNumber] = useState('');
    const [typeOfCustomer, settypeOfCustomer] = useState('');
    const [contactPerson, setcontactPerson] = useState('');
    const [ntnNumber, setntnNumber] = useState('');
    const [applicabletax, setapplicabletax] = useState('');
    const [licenseNumber, setlicenseNumber] = useState('');
    const [CustomerEditId, setCustomerEditId] = useState('');

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
        if (name === '' || address === '' || phone === '' || cnicOfPropreitor === '' || accountNumber === '' || salesTaxNumber === '' || typeOfCustomer === '' || contactPerson === '' || ntnNumber === '' || licenseNumber === '') {
            console.log('fill fieklds')

        } else {
            // POst Request Create Driver
            axios.post(`${url}customer/addCustomer`, {
                name: name,
                address: address,
                phone: phone,
                cnicOfPropreitor: cnicOfPropreitor,
                accountNumber: accountNumber,
                salesTaxNumber: salesTaxNumber,
                typeOfCustomer: typeOfCustomer,
                contactPerson: contactPerson,
                ntnNumber: ntnNumber,
                applicabletax: applicabletax,
                licenseNumber: licenseNumber

            }, { headers }).then(response => {
                console.log(response)
                setVisible(false)
                setCustomerEditId(response.data._id)
                getAllData();
                addToast(exampleToast)
                setaddress('');
                setname('');
                setphone('');
                setcnicOfPropreitor('');
                setaccountNumber('');
                setsalesTaxNumber('');
                settypeOfCustomer('');
                setcontactPerson('');
                setntnNumber('');
                setapplicabletax('');
                setlicenseNumber('')
                setValidated(false)
                setVisibleViewTax(true)
                console.log(response._id)
                setCustomerUpdateTax(false)
                setCustomerAddTax(true)
               

                // ViewTaxData(response._id)

            })
                .catch(err => {
                    console.log(err)
                })

        }




    }
    // Delete 
    const deleteDataProduct = () => {
        setVisibleDelete(false)
        axios.delete(`${url}customer/removeCustomer`, {
            data: {
                _id: productId
            }
        }, { headers })
            .then(res => {
                console.log(res);
                console.log(res.data);
                // addToast(exampleToastDelete)

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
        axios.put(`${url}customer/updateCustomer`, {
            _id: productIdEdit,
            name: nameEdit,
            address: addressEdit,
            phone: phoneEdit,
            cnicOfPropreitor: cnicOfPropreitorEdit,
            accountNumber: accountNumberEdit,
            salesTaxNumber: salesTaxNumberEdit,
            typeOfCustomer: typeOfCustomerEdit,
            contactPerson: contactPersonEdit,
            ntnNumber: ntnNumberEdit,
            applicabletax: applicabletaxEdit,
            licenseNumber: licenseNumberEdit

        }, { headers }).then(response => {
            console.log(response);
            message.success("Updated Customer Successfully")
            getAllData()

        })
            .catch(err => {
                console.log(err)
            })
    }
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [nameEdit, setnameEdit] = useState('');

    const [productIdEdit, setProductIdEdit] = useState('');
    const [addressEdit, setaddressEdit] = useState('');
    const [phoneEdit, setphoneEdit] = useState('');
    const [cnicOfPropreitorEdit, setcnicOfPropreitorEdit] = useState('');
    const [accountNumberEdit, setaccountNumberEdit] = useState('');
    const [salesTaxNumberEdit, setsalesTaxNumberEdit] = useState('');
    const [typeOfCustomerEdit, settypeOfCustomerEdit] = useState('');
    const [contactPersonEdit, setcontactPersonEdit] = useState('');
    const [ntnNumberEdit, setntnNumberEdit] = useState('');
    const [applicabletaxEdit, setapplicabletaxEdit] = useState('');
    const [licenseNumberEdit, setlicenseNumberEdit] = useState('');




    const EditData = (idData) => {
        axios.get(`${url}customer/getCustomer`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setProductIdEdit(response.data._id)
                setnameEdit(response.data.name)
                setaddressEdit(response.data.address)
                setphoneEdit(response.data.phone)
                setcnicOfPropreitorEdit(response.data.cnicOfPropreitor)
                setaccountNumberEdit(response.data.accountNumber)
                setsalesTaxNumberEdit(response.data.salesTaxNumber)
                settypeOfCustomerEdit(response.data.typeOfCustomer)
                setcontactPersonEdit(response.data.contactPerson)
                setntnNumberEdit(response.data.ntnNumber)
                setapplicabletaxEdit(response.data.applicabletax)
                setlicenseNumberEdit(response.data.licenseNumber)
            })
            .catch(error => console.error(`Error:${error}`));
        setVisibleEdit(true)
    }
    // View 
    const [visibleView, setVisibleView] = useState(false)


    const ViewData = (idData) => {
        axios.get(`${url}customer/getCustomer`, {
            params: {
                _id: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                console.log(allData);
                setProductIdEdit(response.data._id)
                setnameEdit(response.data.name)
                setaddressEdit(response.data.address)
                setphoneEdit(response.data.phone)
                setcnicOfPropreitorEdit(response.data.cnicOfPropreitor)
                setaccountNumberEdit(response.data.accountNumber)
                setsalesTaxNumberEdit(response.data.salesTaxNumber)
                settypeOfCustomerEdit(response.data.typeOfCustomer)
                setcontactPersonEdit(response.data.contactPerson)
                setntnNumberEdit(response.data.ntnNumber)
                setapplicabletaxEdit(response.data.applicabletax)
                setlicenseNumberEdit(response.data.licenseNumber)


                setVisibleView(true)
            })
            .catch(error => console.error(`Error:${error}`));
    }

    // Tax 
    const [CustomerId, setCustomerId] = useState('');
    const [TaxDataId, setTaxDataId] = useState('');
    const [salesTaxEdit, setsalesTaxEdit] = useState('');
    const [generalSalesTaxEdit, setgeneralSalesTaxEdit] = useState('');
    const [advanceTaxEdit, setadvanceTaxEdit] = useState('');
    const [furtherTaxEdit, setfurtherTaxEdit] = useState('');
    const [visibleViewTax, setVisibleViewTax] = useState(false)
    const [CustomerUpdateTax, setCustomerUpdateTax] = useState(false);
    const [CustomerAddTax, setCustomerAddTax] = useState(false);
    const [TaxDataIdAdd, setTaxDataIdAdd] = useState('');
    const [salesTaxAdd, setsalesTaxAdd] = useState('');
    const [generalSalesTaxAdd, setgeneralSalesTaxAdd] = useState('');
    const [advanceTaxAdd, setadvanceTaxAdd] = useState('');
    const [furtherTaxAdd, setfurtherTaxAdd] = useState('');



    const ViewTaxData = (idData) => {
        axios.get(`${url}customer/getCustomerTax`, {
            params: {
                customerId: idData
            }
        })
            .then((response) => {
                console.log('History')
                if (response.data === undefined || response.data.length == 0) {
                    console.log("Empty")
                    setCustomerId(idData)
                    setCustomerAddTax(true)
                    setCustomerUpdateTax(false)
                    setVisibleViewTax(true)

                } else {
                    console.log("Not Empty")
                    setCustomerId(idData)
                    setCustomerAddTax(false)
                    setTaxDataId(response.data[0]._id)
                    setsalesTaxEdit(response.data[0].salesTax)
                    setgeneralSalesTaxEdit(response.data[0].generalSalesTax)
                    setadvanceTaxEdit(response.data[0].advanceTax)
                    setfurtherTaxEdit(response.data[0].furtherTax)
                    setCustomerUpdateTax(true)
                    setVisibleViewTax(true)

                }
            })
            .catch(error => console.error(`Error:${error}`));
    }
    const UpdateTaxData = () => {
        axios.put(`${url}customer/updateTaxCustomer`, {
            _id: TaxDataId,
            salesTax: salesTaxEdit,
            generalSalesTax: generalSalesTaxEdit,
            advanceTax: advanceTaxEdit,
            furtherTax: furtherTaxEdit,
        }, { headers }).then(response => {
            console.log(response);
            getAllData()
            setVisibleViewTax(false)
            setCustomerAddTax(false)
            setCustomerUpdateTax(false)
            setCustomerId('')
            setTaxDataId('')
            setsalesTaxEdit('')
            setgeneralSalesTaxEdit('')
            setadvanceTaxEdit('')
            setfurtherTaxEdit('')
            message.success('Updated Tax Successfully');


        })
            .catch(err => {
                console.log(err)
            })
    }
    // Add tax 
    const addTaxCustomer = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()


        }
        setValidated(true)
        if (salesTaxAdd === '' || generalSalesTaxAdd === '' || advanceTaxAdd === '' || furtherTaxAdd === '') {
            console.log('fill fields')
        } else {
            console.log(CustomerEditId)
            // POst Request Create Driver
            axios.post(`${url}customer/addTaxCustomer`, {
                customerId: CustomerEditId,
                salesTax: salesTaxAdd,
                generalSalesTax: generalSalesTaxAdd,
                advanceTax: advanceTaxAdd,
                furtherTax: furtherTaxAdd,
            }, { headers }).then(response => {
                console.log(response)
                getAllData();
                setCustomerId('');
                setsalesTaxAdd('');
                setgeneralSalesTaxAdd('');
                setadvanceTaxAdd('');
                setfurtherTaxAdd('');
                setCustomerAddTax(false)
                setCustomerUpdateTax(false)
                setVisibleViewTax(false)
                setValidated(false)
                message.success('Added Customer Successfully');

            })
                .catch(err => {
                    console.log(err)
                })

        }

    }

    return (
        <>
            <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 1 }} >
                <CCol xs>
                    <CBreadcrumb >
                        <CBreadcrumbItem href="/home">Home</CBreadcrumbItem>
                        <CBreadcrumbItem active>Customers</CBreadcrumbItem>
                    </CBreadcrumb>
                </CCol>
                {/* <hr /> */}
                {/* <CRow xs={{ cols: 1, gutter: 1 }}  md={{ cols: 1 }} >
                <CCol xs>
                    <CBreadcrumb style={{ marginBottom: '40px'}} >
                        <CBreadcrumbItem href="/home">Home</CBreadcrumbItem>
                        <CBreadcrumbItem active>Customers</CBreadcrumbItem>
                    </CBreadcrumb>

                </CCol>
            </CRow> */}
                <CRow xs={{ cols: 2, gutter: 4 }} md={{ cols: 6 }}>
                    <CCol xs style={{ flexGrow: 1 }}>
                        <h4>Customers</h4>
                    </CCol>

                    <CCol xs>
                        <CButton style={{ marginTop: '-20px' }} color="primary" onClick={() => setVisible(!visible)}>+ Customer</CButton>

                    </CCol>
                </CRow>
                <CRow xs={{ cols: 1 }} md={{ cols: 12 }}>
                    <div className='tableResponsive'>
                        <Table columns={columns} dataSource={data} size='small'
                            bordered
                        />
                    </div>
                </CRow>
                <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }}>
                    {/* Delete  */}
                    <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
                        <CModalHeader onClose={() => setVisibleDelete(false)}>
                            <CModalTitle>Delete Customer</CModalTitle>
                        </CModalHeader>
                        <CModalBody>Are you sure you want to delete this customer!</CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                                No
                            </CButton>
                            <CButton color="primary" onClick={deleteDataProduct}>Yes</CButton>
                        </CModalFooter>
                    </CModal>
                    {/* Modal For Tax  */}
                    <CModal visible={visibleViewTax} onClose={() => setVisibleViewTax(false)}>
                        <CModalHeader onClose={() => setVisibleViewTax(false)}>
                            <CModalTitle>Customer Tax Details</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <CForm
                                noValidate
                                className="row g-3 needs-validation"
                                validated={validated}
                            >
                                {CustomerUpdateTax &&
                                    <>
                                        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                                            <CCol xs>

                                                <CFormInput
                                                    type="text"
                                                    label=" Sales Tax*"
                                                    required className='itemPadding'
                                                    value={salesTaxEdit}
                                                    onChange={(e) => setsalesTaxEdit(e.target.value)
                                                    }
                                                />
                                                <CFormInput
                                                    type="text"
                                                    label=" Advance Tax*"
                                                    value={advanceTaxEdit}
                                                    onChange={(e) => setadvanceTaxEdit(e.target.value)
                                                    }
                                                />

                                            </CCol>
                                            <CCol xs>
                                                <CFormInput
                                                    type="text"
                                                    label="General Sales Tax*"
                                                    required className='itemPadding'
                                                    value={generalSalesTaxEdit}
                                                    onChange={(e) => setgeneralSalesTaxEdit(e.target.value)
                                                    }
                                                />
                                                <CFormInput
                                                    type="text"
                                                    label=" Further Tax*"
                                                    value={furtherTaxEdit}
                                                    onChange={(e) => setfurtherTaxEdit(e.target.value)
                                                    }
                                                />


                                            </CCol>
                                        </CRow>
                                        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }}>
                                            <CCol xs>
                                                <div className="d-grid gap-2 col-12 mx-auto">
                                                    <CButton color="primary" onClick={UpdateTaxData}>Update</CButton>

                                                </div>

                                            </CCol>
                                        </CRow>
                                    </>
                                }
                                {/* Add  */}
                                {CustomerAddTax &&
                                    <>
                                        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                                            <CCol xs>

                                                <CFormInput
                                                    type="text"
                                                    label=" Sales Tax*"
                                                    required className='itemPadding'
                                                    value={salesTaxAdd}
                                                    onChange={(e) => setsalesTaxAdd(e.target.value)
                                                    }
                                                />
                                                <CFormInput
                                                    type="text"
                                                    label=" Advance Tax*"
                                                    value={advanceTaxAdd}
                                                    onChange={(e) => setadvanceTaxAdd(e.target.value)
                                                    }
                                                />

                                            </CCol>
                                            <CCol xs>
                                                <CFormInput
                                                    type="text"
                                                    label="General Sales Tax*"
                                                    required className='itemPadding'
                                                    value={generalSalesTaxAdd}
                                                    onChange={(e) => setgeneralSalesTaxAdd(e.target.value)
                                                    }
                                                />
                                                <CFormInput
                                                    type="text"
                                                    label=" Further Tax*"
                                                    value={furtherTaxAdd}
                                                    onChange={(e) => setfurtherTaxAdd(e.target.value)
                                                    }
                                                />


                                            </CCol>
                                        </CRow>
                                        <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }}>
                                            <CCol xs>
                                                <div className="d-grid gap-2 col-12 mx-auto">
                                                    <CButton color="primary" onClick={addTaxCustomer}>Save</CButton>

                                                </div>

                                            </CCol>
                                        </CRow>
                                    </>
                                }
                            </CForm>
                        </CModalBody>
                    </CModal>
                    {/* View  */}
                    <CModal visible={visibleView} onClose={() => setVisibleView(false)}>
                        <CModalHeader onClose={() => setVisibleView(false)}>
                            <CModalTitle> Customer Details</CModalTitle>
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
                                            id="name"
                                            label=" Name"
                                            // placeholder="Enter name"
                                            aria-describedby="name"
                                            required className='itemPadding'
                                            value={nameEdit}

                                            disabled
                                            onChange={(e) => setnameEdit(e.target.value)
                                            }
                                        />


                                    </CCol>
                                    <CCol xs>
                                        <CFormInput
                                            type="text"
                                            id="phone"
                                            label="Phone No*"
                                            required className='itemPadding'
                                            disabled
                                            aria-describedby="phone"
                                            value={phoneEdit}
                                            onChange={(e) => setphoneEdit(e.target.value)
                                            }
                                        />


                                    </CCol>
                                </CRow>
                                <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                    <CCol xs>
                                        <CFormTextarea label="Address" value={addressEdit}
                                            required className='itemPadding'
                                            disabled
                                            onChange={(e) => setaddressEdit(e.target.value)
                                            } id="exampleFormControlTextarea1" rows="3"></CFormTextarea>

                                    </CCol>
                                    <CRow xs={{ cols: 1 }} md={{ cols: 2 }}>
                                        <CCol xs>
                                            <CFormInput
                                                type="text"
                                                id="cnicOfPropreitor"
                                                disabled

                                                label="Cnic Of Propreitor"
                                                required className='itemPadding'
                                                // placeholder="Enter Cnic Of Propreitor"
                                                aria-describedby="cnicOfPropreitor"
                                                value={cnicOfPropreitorEdit}
                                                onChange={(e) => setcnicOfPropreitorEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="accountNumber"
                                                label="Account No"
                                                required className='itemPadding'
                                                disabled

                                                // placeholder="Enter Account No"
                                                aria-describedby="accountNumber"
                                                value={accountNumberEdit}
                                                onChange={(e) => setaccountNumberEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="salesTaxNumber"
                                                label="Sales Tax Number"
                                                // placeholder="Enter Sales Tax Number"
                                                required className='itemPadding'
                                                disabled

                                                aria-describedby="salesTaxNumber"
                                                value={salesTaxNumberEdit}
                                                onChange={(e) => setsalesTaxNumberEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="ntnNumber"
                                                label="NTN Number"
                                                disabled

                                                // placeholder="Enter NTN Number"
                                                required className='itemPadding'
                                                aria-describedby="ntnNumber"
                                                value={ntnNumberEdit}
                                                onChange={(e) => setntnNumberEdit(e.target.value)
                                                }
                                            />

                                        </CCol>
                                        <CCol xs>
                                            <CFormSelect value={typeOfCustomerEdit}
                                                label="Type of Customer"
                                                disabled

                                                onChange={(e) => settypeOfCustomerEdit(e.target.value)
                                                } required className='itemPadding' aria-label="Default select example">
                                                <option disabled>Type of Customer</option>
                                                <option value="Distributer">Distributer</option>
                                                <option value="Retailer">Retailer</option>
                                                <option value="Institution" >Institution</option>
                                            </CFormSelect>

                                            <CFormInput
                                                type="text"
                                                disabled

                                                id="contactPerson"
                                                label="Contact Person"
                                                required className='itemPadding'
                                                // placeholder="Enter Contact Person"
                                                aria-describedby="contactPerson"
                                                value={contactPersonEdit}
                                                onChange={(e) => setcontactPersonEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="licenseNumber"
                                                disabled

                                                label="License Number"
                                                // placeholder="Enter License Number"
                                                required className='itemPadding'
                                                aria-describedby="licenseNumber"
                                                value={licenseNumberEdit}
                                                onChange={(e) => setlicenseNumberEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="applicabletax"
                                                label="Applicable Tax"
                                                disabled


                                                // placeholder="Enter Applicable Tax"
                                                required className='itemPadding'
                                                aria-describedby="applicabletax"
                                                value={applicabletaxEdit}
                                                onChange={(e) => setapplicabletaxEdit(e.target.value)
                                                }
                                            />
                                        </CCol>
                                    </CRow>
                                </CRow>

                            </CForm>


                        </CModalBody>
                    </CModal>
                    {/* Edit  */}
                    <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
                        <CModalHeader onClose={() => setVisibleEdit(false)}>
                            <CModalTitle>Update Customer</CModalTitle>
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
                                            id="name"
                                            label=" Name*"
                                            aria-describedby="name"
                                            required className='itemPadding'
                                            value={nameEdit}
                                            onChange={(e) => setnameEdit(e.target.value)
                                            }
                                        />


                                    </CCol>
                                    <CCol xs>
                                        <CFormInput
                                            type="text"
                                            id="phone"
                                            label="Phone No*"
                                            required className='itemPadding'
                                            aria-describedby="phone"
                                            value={phoneEdit}
                                            onChange={(e) => setphoneEdit(e.target.value)
                                            }
                                        />


                                    </CCol>
                                </CRow>
                                <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                    <CCol xs>
                                        <CFormTextarea label="Address*" value={addressEdit}
                                            required className='itemPadding'
                                            onChange={(e) => setaddressEdit(e.target.value)
                                            } id="exampleFormControlTextarea1" rows="3"></CFormTextarea>

                                    </CCol>
                                    <CRow xs={{ cols: 1 }} md={{ cols: 2 }}>
                                        <CCol xs>
                                            <CFormInput
                                                type="text"
                                                id="cnicOfPropreitor"
                                                label="Cnic Of Propreitor*"
                                                required className='itemPadding'
                                                aria-describedby="cnicOfPropreitor"
                                                value={cnicOfPropreitorEdit}
                                                onChange={(e) => setcnicOfPropreitorEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="accountNumber"
                                                label="Account No*"
                                                required className='itemPadding'
                                                aria-describedby="accountNumber"
                                                value={accountNumberEdit}
                                                onChange={(e) => setaccountNumberEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="salesTaxNumber"
                                                label="Sales Tax Number*"
                                                required className='itemPadding'
                                                aria-describedby="salesTaxNumber"
                                                value={salesTaxNumberEdit}
                                                onChange={(e) => setsalesTaxNumberEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="ntnNumber"
                                                label="NTN Number*"
                                                required className='itemPadding'
                                                aria-describedby="ntnNumber"
                                                value={ntnNumberEdit}
                                                onChange={(e) => setntnNumberEdit(e.target.value)
                                                }
                                            />

                                        </CCol>
                                        <CCol xs>
                                            <CFormSelect value={typeOfCustomerEdit}
                                                label="Type of Customer*"
                                                onChange={(e) => settypeOfCustomerEdit(e.target.value)
                                                } required className='itemPadding' aria-label="Default select example">
                                                <option disabled>Type of Customer</option>
                                                <option value="Distributer">Distributer</option>
                                                <option value="Retailer">Retailer</option>
                                                <option value="Institution" >Institution</option>
                                            </CFormSelect>

                                            <CFormInput
                                                type="text"
                                                id="contactPerson"
                                                label="Contact Person*"
                                                required
                                                className='itemPadding'
                                                aria-describedby="contactPerson"
                                                value={contactPersonEdit}
                                                onChange={(e) => setcontactPersonEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="licenseNumber"
                                                label="License Number*"
                                                required className='itemPadding'
                                                aria-describedby="licenseNumber"
                                                value={licenseNumberEdit}
                                                onChange={(e) => setlicenseNumberEdit(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="applicabletax"
                                                label="Applicable Tax"
                                                disabled
                                                required className='itemPadding'
                                                aria-describedby="applicabletax"
                                                value={applicabletaxEdit}
                                                onChange={(e) => setapplicabletaxEdit(e.target.value)
                                                }
                                            />
                                        </CCol>
                                    </CRow>
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
                            <CModalTitle>Add Customer</CModalTitle>
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
                                            id="name"
                                            label=" Name*"
                                            // placeholder="Enter Name"
                                            aria-describedby="name"
                                            required className='itemPadding'

                                            value={name}
                                            onChange={(e) => setname(e.target.value)
                                            }
                                        />
                                        {/* <CFormInput
                                        type="text"
                                        id="address"
                                        label="Address"

                                        // placeholder="Enter Address"
                                        aria-describedby="address"
                                        required className='itemPadding'
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)
                                        }
                                    /> 
                                    
                                    <CFormSelect value={typeOfCustomer}

                                        label="Type of Customer"
                                        onChange={(e) => settypeOfCustomer(e.target.value)
                                        } required className='itemPadding' aria-label="Default select example">
                                        <option disabled>Type of Customer</option>
                                        <option value="Distributer">Distributer</option>
                                        <option value="Retailer">Retailer</option>
                                        <option value="Institution" >Institution</option>
                                    </CFormSelect>

                                    <CFormInput
                                        type="text"
                                        id="contactPerson"
                                        label="Conatact Person"

                                        required className='itemPadding'
                                        // placeholder="Enter Conatct Person"
                                        aria-describedby="contactPerson"
                                        value={contactPerson}
                                        onChange={(e) => setcontactPerson(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="licenseNumber"
                                        label="License Number"

                                        // placeholder="Enter License Number"
                                        required className='itemPadding'
                                        aria-describedby="licenseNumber"
                                        value={licenseNumber}
                                        onChange={(e) => setlicenseNumber(e.target.value)
                                        }
                                    /> */}
                                    </CCol>
                                    <CCol xs>
                                        <CFormInput
                                            type="text"
                                            id="phone"
                                            label="Phone No*"

                                            // placeholder="Enter Phone No"
                                            required className='itemPadding'
                                            aria-describedby="phone"
                                            value={phone}
                                            onChange={(e) => setphone(e.target.value)
                                            }
                                        />
                                        {/* <CFormInput
                                        type="text"
                                        id="cnicOfPropreitor"

                                        label="Cnic Of Propreitor"
                                        required className='itemPadding'
                                        // placeholder="Enter Cnic Of Propreitor"
                                        aria-describedby="cnicOfPropreitor"
                                        value={cnicOfPropreitor}
                                        onChange={(e) => setcnicOfPropreitor(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="accountNumber"
                                        label="Account Number"

                                        required className='itemPadding'
                                        // placeholder="Enter Account Number"
                                        aria-describedby="accountNumber"
                                        value={accountNumber}
                                        onChange={(e) => setaccountNumber(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="salesTaxNumber"
                                        label="Sales Tax No"

                                        // placeholder="Enter Sales Tax No"
                                        required className='itemPadding'
                                        aria-describedby="salesTaxNumber"
                                        value={salesTaxNumber}
                                        onChange={(e) => setsalesTaxNumber(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="ntnNumber"
                                        label="NTN No"
                                        // placeholder="Enter NTN No"
                                        required className='itemPadding'
                                        aria-describedby="ntnNumber"

                                        value={ntnNumber}
                                        onChange={(e) => setntnNumber(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="applicabletax"
                                        label="Applicable Tax"

                                        // placeholder="Enter Applicable Tax"
                                        required className='itemPadding'
                                        aria-describedby="applicabletax"
                                        value={applicabletax}
                                        onChange={(e) => setapplicabletax(e.target.value)
                                        }
                                    /> */}

                                    </CCol>
                                </CRow>
                                <CRow xs={{ cols: 1 }} md={{ cols: 1 }}>
                                    <CCol xs>
                                        <CFormTextarea label="Address*" value={address}
                                            required className='itemPadding'
                                            onChange={(e) => setaddress(e.target.value)
                                            } id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
                                    </CCol>
                                    <CRow xs={{ cols: 1 }} md={{ cols: 2 }}>
                                        <CCol xs>
                                            <CFormInput
                                                type="text"
                                                id="cnicOfPropreitor"

                                                label="Cnic Of Propreitor*"
                                                required className='itemPadding'
                                                // placeholder="Enter Cnic Of Propreitor"
                                                aria-describedby="cnicOfPropreitor"
                                                value={cnicOfPropreitor}
                                                onChange={(e) => setcnicOfPropreitor(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="accountNumber"
                                                label="Account Number*"

                                                required className='itemPadding'
                                                // placeholder="Enter Account Number"
                                                aria-describedby="accountNumber"
                                                value={accountNumber}
                                                onChange={(e) => setaccountNumber(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="salesTaxNumber"
                                                label="Sales Tax No*"

                                                // placeholder="Enter Sales Tax No"
                                                required className='itemPadding'
                                                aria-describedby="salesTaxNumber"
                                                value={salesTaxNumber}
                                                onChange={(e) => setsalesTaxNumber(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="ntnNumber"
                                                label="NTN No*"
                                                // placeholder="Enter NTN No"
                                                required className='itemPadding'
                                                aria-describedby="ntnNumber"

                                                value={ntnNumber}
                                                onChange={(e) => setntnNumber(e.target.value)
                                                }
                                            />

                                        </CCol>
                                        <CCol xs>

                                            <CFormSelect value={typeOfCustomer}

                                                label="Type of Customer*"
                                                onChange={(e) => settypeOfCustomer(e.target.value)
                                                } required className='itemPadding' aria-label="Default select example">
                                                <option value="">Type of Customer</option>
                                                <option value="Distributer">Distributer</option>
                                                <option value="Retailer">Retailer</option>
                                                <option value="Institution" >Institution</option>
                                            </CFormSelect>
                                            {/* <CFormInput
                                            type="text"
                                            id="applicabletax"
                                            label="Applicable Tax"

                                            // placeholder="Enter Applicable Tax"
                                            required className='itemPadding'
                                            aria-describedby="applicabletax"
                                            value={applicabletax}
                                            onChange={(e) => setapplicabletax(e.target.value)
                                            }
                                        /> */}
                                            <CFormInput
                                                type="text"
                                                id="contactPerson"
                                                label="Contact Person*"

                                                required className='itemPadding'
                                                // placeholder="Enter Conatct Person"
                                                aria-describedby="contactPerson"
                                                value={contactPerson}
                                                onChange={(e) => setcontactPerson(e.target.value)
                                                }
                                            />
                                            <CFormInput
                                                type="text"
                                                id="licenseNumber"
                                                label="License Number*"

                                                // placeholder="Enter License Number"
                                                required className='itemPadding'
                                                aria-describedby="licenseNumber"
                                                value={licenseNumber}
                                                onChange={(e) => setlicenseNumber(e.target.value)
                                                }
                                            />
                                        </CCol>

                                    </CRow>
                                </CRow>

                            </CForm>
                        </CModalBody>
                        <CModalFooter>
                            <div className="d-grid gap-2 col-12 mx-auto">
                                <CButton color="primary" onClick={submitHandler}>Save and Continue</CButton>
                            </div>

                        </CModalFooter>
                    </CModal>
                </CRow>

            </CRow>

        </>
    )
}

export default Customers