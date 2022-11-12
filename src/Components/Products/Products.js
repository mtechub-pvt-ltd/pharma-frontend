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
    CFormSelect
} from '@coreui/react'
import Typography from '@mui/material/Typography';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteTwoTone, EyeTwoTone,PrinterTwoTone, EditTwoTone } from '@ant-design/icons';
import { Table, Button, Input, Space ,message} from 'antd';
import { Tooltip } from 'antd';
import './stylesheet.css'
import axios from "axios";
import url from '../url'
import jsPDF from "jspdf";
import 'jspdf-autotable'
import DatePicker from "react-datepicker";

function Products() {
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
        axios.get(`${url}inventory/getAllProducts`)
            .then((response) => {
                setData(response.data);
                // setLoading(true)
            })
            .catch(error => console.error(`Error:${error}`));

    }
 
    useEffect(() => {
        getAllData();

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
            title: 'Ref No',
            dataIndex: 'supplyOrderRefNo',
            key: 'supplyOrderRefNo',
            width: '20%',
        },
        {
            title: 'Type Of Order',
            dataIndex: 'SPtypeOforder',
            key: 'SPtypeOforder',
            width: '20%',
        },
        {
            title: 'Date of Order',
            dataIndex: 'SPdateOfOrder',
            key: 'SPdateOfOrder',
            width: '20%',
        },
        {
            title: 'Order Valid Till',
            dataIndex: 'SPorderValidTill',
            key: 'SPorderValidTill',
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
            dataIndex: 'SPStatus',
            key: 'SPStatus',
            width: '20%',
        },

    ];
    const PrintData = (idData) => {
        axios.get(`${url}customer/getProductOrderData`, {
            params: {
                productId: idData
            }
        })
            .then((response) => {
                console.log('History')
                const allData = response.data;
                if(response.data==""){
                    message.error("No Supply Order for that Product")
                }else{
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
                      doc.text("Product Details,",startX, startY+=lineSpacing.NormalSpacing);
                      doc.text(response.data[0].productName, startX, startY+=lineSpacing.NormalSpacing);
                      doc.setFontSize(fontSizes.NormalFontSize);
                      doc.setFontType('bold');
                      doc.text("Batch No :", startX, startY+=lineSpacing.NormalSpacing);
                      doc.setFontType('normal');
                      doc.text(response.data[0].batchNo, 92, startY);
                      doc.setFontSize(fontSizes.NormalFontSize);
                      doc.setFontType('bold');
                      doc.text("Company :", startX, startY+=lineSpacing.NormalSpacing);
                      doc.setFontType('normal');
                      doc.text(response.data[0].companyName, 92, startY);
                      doc.setFontType('bold');
                      doc.text("Expiry Date :", startX, startY+=lineSpacing.NormalSpacing);
                      doc.setFontType('normal');
                      doc.text(response.data[0].expiryDate, 100, startY);
                      doc.setFontType('bold');
                      doc.text("Packing :", startX, startY+=lineSpacing.NormalSpacing);
                      doc.setFontType('normal');
                      doc.text(response.data[0].packing, 89, startY);
                      doc.setFontType('bold');
                      doc.text("Quantity :", startX, startY+=lineSpacing.NormalSpacing);
                      doc.setFontType('normal');
                      doc.text(response.data[0].quantity, 89, startY);
                      doc.setFontType('bold');
                      doc.text("Amount :", startX, startY+=lineSpacing.NormalSpacing);
                      doc.setFontType('normal');
                      doc.text(response.data[0].amount, 89, startY);
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
              
                    // doc.save('Product.pdf');
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
    const columns = [
        {
            title: 'Code',
            dataIndex: 'itemCode',
            key: 'itemCode',
            width: '10%',
        },
        {
            title: 'Product Name',
            dataIndex: 'itemName',
            key: 'itemName',
            width: '20%',
            ...getColumnSearchProps('itemName'),
        },

        {
            title: 'Pack Size',
            dataIndex: 'packSize',
            key: 'packSize',
            width: '20%',
        },
        {
            title: 'Generic Name',
            dataIndex: 'genericName',
            key: 'genericName',
            width: '20%',
            ...getColumnSearchProps('genericName'),
        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            width: '20%',
            ...getColumnSearchProps('companyName'),
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
        if (itemName === '' || itemCode === '' || packSize === '' || registrationNo === '' || genericName === '' || companyName === '' || expiryDate === '' || batchNo === ''|| maxRetailPrice === '') {
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
                maxRetailPrice:maxRetailPrice
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
            maxRetailPrice:maxRetailPriceEdit

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
        const Id= idData.target.value
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
    
    return (
        <>
            <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 1 }} >
                <CCol xs>
                    <CBreadcrumb style={{ marginBottom: '40px' }}>
                        <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
                        <CBreadcrumbItem active>Products</CBreadcrumbItem>
                    </CBreadcrumb>

                </CCol>
            </CRow>
            <CRow xs={{ cols: 2, gutter: 4 }} md={{ cols: 6 }}>
                <CCol xs style={{ flexGrow: 1 }}>
                    <h4>Products</h4>
                </CCol>
                <CCol xs>
                    <CButton style={{ marginTop: '-20px' }} color="primary" onClick={() => setVisible(!visible)}>+ Product</CButton>

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
                <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                        <CModalTitle>Add Product</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm
                            noValidate
                            className="row g-3 needs-validation"
                            validated={validated}
                        >
                            <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 1 }}>
<CCol xs>
<h5 style={{textAlign:'center'}}>Select from  Old Product</h5>

</CCol>

                            </CRow>
                            <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 1 }}>
<CCol xs>
<CFormSelect 
                                // value={OldItem}
                                        label="Select from Products"
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
                                <CCol xs>
                              
                                    <CFormInput
                                        type="text"
                                        id="itemName"
                                        label="Item Name*"
                                        className='itemPadding'
                                        // placeholder="Enter item name"
                                        aria-describedby="itemName"
                                        required
                                        value={itemName}
                                        onChange={(e) => setitemName(e.target.value)
                                        }
                                    />
                                    <CFormInput
                                        type="text"
                                        id="itemCode"
                                        label="Item Code*"
                                        className='itemPadding'

                                        // placeholder="Enter Item Code"
                                        aria-describedby="itemCode"
                                        required
                                        value={itemCode}
                                        onChange={(e) => setitemCode(e.target.value)
                                        }
                                    /> <CFormInput
                                        type="text"
                                        id="packSize"
                                        className='itemPadding'

                                        label="Pack Size*"
                                        // placeholder="Enter Pack Size"
                                        required
                                        aria-describedby="packSize"
                                        value={packSize}
                                        onChange={(e) => setpackSize(e.target.value)
                                        }
                                    />
                                    {/* <CFormInput
                                        type="text"
                                        id="expiryDate"
                                        label="Expiry Date*"
                                        required
                                        className='itemPadding'

                                        // placeholder="Enter Expiry Date"
                                        aria-describedby="expiryDate"
                                        value={expiryDate}
                                        onChange={(e) => setexpiryDate(e.target.value)
                                        }
                                    /> */}
                                                                    <Typography variant="h6" style={{ fontSize: '16px' }}>Expiry Date*</Typography>
                                    <DatePicker className='itemPadding' wrapperClassName="date-picker" selected={expiryDate} onChange={(date) => setexpiryDate(date)} />

                                    <CFormInput
                                        type="number"
                                        id="maxRetailPrice"
                                        label="Max Retail Price*"
                                        required
                                        className='itemPadding'

                                        // placeholder="Enter Batch No"
                                        aria-describedby="maxRetailPrice"
                                        value={maxRetailPrice}
                                        onChange={(e) => setmaxRetailPrice(e.target.value)
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
                                        value={registrationNo}
                                        onChange={(e) => setregistrationNo(e.target.value)
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
                                        value={genericName}
                                        onChange={(e) => setgenericName(e.target.value)
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
                                        value={companyName}
                                        onChange={(e) => setcompanyName(e.target.value)
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
                                        value={batchNo}
                                        onChange={(e) => setbatchNo(e.target.value)
                                        }
                                    />
                                   
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

export default Products