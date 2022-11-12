import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react'
import jsPDF from "jspdf";
import 'jspdf-autotable'
import MenuIcon from '@mui/icons-material/Menu';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme, alpha } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import { useNavigate } from 'react-router-dom'
import DashboardUser from '../Dashboard/Dashboard'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Grid } from '@mui/material';
import axios from 'axios';
import url from '../url';
import { Avatar } from '@mui/material'
import { Dropdown, Menu, Form } from 'antd'
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import Products from '../Products/Products';
import Customers from '../Customers/Customers';
import StaffMembers from '../StaffMembers/StaffMembers';
import ContactsIcon from '@mui/icons-material/Contacts';
import { useLocation } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  CRow,
  CCol,
  CButton,
  CBreadcrumb,
  CFormTextarea,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { Table, Button, Input, Space, Badge, Checkbox, Tooltip, message, Modal } from 'antd';
import SupplyOrders from '../SupplyOrders/SupplyOrders';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { LogoutOutlined } from '@ant-design/icons';
import LogoutIcon from '@mui/icons-material/Logout';
import SalesOrder from '../SalesOrder/SalesOrder';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PieChartIcon from '@mui/icons-material/PieChart';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
const drawerWidth = 240;
const useStyles = makeStyles({
  BackGround: {
    backgroundColor: '#ebedef',
    color: 'black',
    padding: '0px',
    margin: '0px'
    // paddingLeft: '65px',
  }, appBarColor: {
    backgroundColor: 'white',
    color: 'grey'
  }, iconColor: {
    color: '#9a9cab'
  },
  Header: {
    // backgroundColor: '#2ab97b',
    // borderRadius:' 0px 0px 50% 50%',
    height: '10px',
    margin: '20px auto',
  }, ListStyle1: {
    marginTop: '-10px'
  }, listStyle: {
    backgroundColor: '#eceff1',
    fontFamily: 'Roboto Slab',
    color: '#9a9cab',
    height: '100vh',
    overflowY: 'hidden',
    cursor: 'pointer'
  }, head: {
    backgroundColor: '#eceff1',
    borderBottom: '1px solid white',
    color: '#9a9cab',
  }, btnSubmit: {
    width: '50%',
    backgroundColor: '#36f195',
    height: '50px',
    fontSize: '15px',
    fontFamily: 'Roboto Slab',
    border: 'transparent',
    borderRadius: '5px',
    fontFamily: 'Tiro Gurmukhi, serif',
    color: 'white',
    textAlign: 'center',
    marginLeft: '200px'
  }, inputStyle: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: '5px',
    border: '1px solid grey',
    height: '20px'
  }, TextStyle: {
    color: 'black',
    marginTop: '10px',
    fontFamily: 'Tiro Gurmukhi, serif',
    fontWeight: 'bold',
    fontFamily: 'Roboto Slab',
  }, DetailHead: {
    fontWeight: 700,
  }
  , Detail: {
    fontSize: '14px'
  }, marginHead: {
    marginTop: '20px'
  }

})

const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "#cadbe7",
      fontWeight: '700',
      "& .MuiListItemIcon-root": {
        color: "#fed731"
      }
    },
    "&$selected:hover": {
      backgroundColor: "#cadbe7",
      color: "white",

      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "#cadbe7",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    }
  },
  selected: {}
})(MuiListItem);
// Drawer Header 
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const MarginTop = {
  // paddingTop: "70px",
  // padding: '0',
  overflow: 'hidden',
}
const paddingGrid = {
  // marginRight: '300px',
  // marginLeft: '300px',
  backgroundColor: 'white'

}
// Main 
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // backgroundColor: '#eceff1',
    height: '100%',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
// appbar 


function SalesOrderDetails(props) {
  const { state } = useLocation();

  const columnsSalesPartsView = [

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
  const columnsSalesPartsCheck = [
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
  const [validated, setValidated] = useState(false)

  const columnsSalesView = [

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
  const [showHideDemo2, setshowHideDemo2] = useState(false)
  const [showHideDemo1, setshowHideDemo1] = useState(true)


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const classes = useStyles();
  const getAllData = () => {
    setemail(state.data)
    // axios.get(`${url}admin/get-admin`, {
    //   params: {
    //     _id: props.Iduser
    //   }
    // })
    //   .then((response) => {
    //     const allData = response.data;
    //     console.log('get profile state')
    //     console.log(allData);
    //     setemail(allData.email)
    //     setusername(allData.username)
    //     setpassword(allData.password)
    //     setdobUser(allData.Dob)
    //     setImgUserData(allData.image)

    //   })
    //   .catch(error => console.error(`Error:${error}`));

  }
  const [dataSales, setDataSales] = useState('');
  const [dataSalesView, setDataSalesView] = useState([]);

  const [refNo, setRefNo] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [dateOfOrder, setDateOfOrder] = useState('');
  const [orderValidTill, setorderValidTill] = useState('');
  const [orderType, setorderType] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [addressCus, setAddressCus] = useState('');
  const [cnicCus, setCnicCus] = useState('');
  const [phoneCus, setPhoneCus] = useState('');
  const [ntnNumberCus, setntnNumberCus] = useState('');
  const [salesTaxCus, setSalesTaxCus] = useState('');
  const [typeOfCustomerCus, setTypeOfCustomerCus] = useState('');
  const [TaxCus, setTaxCus] = useState([]);

  const [dataSalesParts, setDataSalesParts] = useState([]);
  const [idPartPackSize, setIdPartPackSize] = useState('');
  const [idPartQuantity, setIdPartQuantity] = useState('');

  const [visibleViewSales, setVisibleViewSales] = useState(false)
  const [valueSalePID, setvalueSalePID] = useState('')



  const addSalesParts = () => {
    setVisibleViewSales(true)
  }







  const getAllDataSales = () => {
    axios.get(`${url}customer/getSalesOrder`, {
      params: {
        _id: state.salesId
      }
    })
      .then((response) => {
        console.log('History')
        const allData = response.data;
        console.log(allData);
        // setDataSales(response.data.saleOrderProducts)
        setRefNo(response.data.supplyOrderId.refNumber)
        setCategory(response.data.supplyOrderId.SPCategory)
        setStatus(response.data.supplyOrderId.Status)
        setDateOfOrder(response.data.supplyOrderId.dateOfOrder)
        setorderValidTill(response.data.supplyOrderId.orderValidTill)
        setorderType(response.data.supplyOrderId.typeOforder)
        setSpecialInstructions(response.data.supplyOrderId.specialInstructions)
        setDataSalesParts(response.data.salePartsId)
        console.log(response.data.salePartsId)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataSupply = () => {
    axios.get(`${url}customer/getSupplyorder`, {
      params: {
        _id: state.SupplyId
      }
    })
      .then((response) => {
        console.log('1')
        const allData = response.data;
        console.log(allData);
        setDataSales(response.data.orderedProductId)
        setCustomerName(response.data.customerId.name)
        setAddressCus(response.data.customerId.address)
        setCnicCus(response.data.customerId.cnicOfPropreitor)
        setPhoneCus(response.data.customerId.phone)
        setntnNumberCus(response.data.customerId.ntnNumber)
        setSalesTaxCus(response.data.customerId.salesTaxNumber)
        setTypeOfCustomerCus(response.data.customerId.typeOfCustomer)
        setTaxCus(response.data.customerId.applicabletax)




        // setRefNo(response.data.supplyOrderId.refNumber)
        // setCategory(response.data.supplyOrderId.SPCategory)
        // setStatus(response.data.supplyOrderId.Status)
        // setDateOfOrder(response.data.supplyOrderId.dateOfOrder)
        // setorderValidTill(response.data.supplyOrderId.orderValidTill)
        // setorderType(response.data.supplyOrderId.typeOforder)
        // setSpecialInstructions(response.data.supplyOrderId.specialInstructions)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  const getAllDataOrderedProduct = () => {
    axios.get(`${url}customer/getProductSupplyOrder`, {
      params: {
        supplyOrderId: state.SupplyId
      }
    })
      .then((response) => {
        console.log('1sddfsdfsdf')
        const allData = response.data;
        console.log(response.data);
        setDataSalesView(response.data)
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
  useEffect(() => {
    getAllData();
    getAllDataSales();
    getAllDataSupply();
    getAllDataOrderedProduct();
    getAllStaffSales();
    getAllStaffDelivery();

  }, []);
  const AddOrderSalesParts = () => {
    if (idPartPackSize === '' || idPartQuantity === '' || valueSalePID === '') {
      message.error('Please Fill All Fields');
      setvalueSalePID('');
      setIdPartQuantity('')
      setIdPartPackSize('')

    } else {
      console.log(idPartQuantity)
      console.log(idPartPackSize)
      console.log(valueSalePID)
      console.log(state.salesId)


      axios.post(`${url}customer/addSaleOrderPart`, {
        saleOrderId: state.salesId,
        quantity: idPartQuantity,
        packSize: idPartPackSize,
        productId: valueSalePID

      }, { headers }).then(response => {
        console.log(response)
        setvalueSalePID('');
        setIdPartQuantity('')
        setIdPartPackSize('')
        getAllData();
        getAllDataSales();
        getAllDataSupply();
        getAllDataOrderedProduct();


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
    NormalSpacing: 16,

  };
  const columnsInvoice = [

    {
      title: 'Batch No',
      dataIndex: 'batchNo',
      key: 'batchNo',
      width: '20%',
    },

    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      width: '20%',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      width: '20%',
    },
    {
      title: 'Pack Size',
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
      title: 'Total ',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '20%',
    },

  ];
  const [StaffSales, setStaffSales] = useState([])
  const [StaffDelivery, setStaffDelivery] = useState([])


  const [SupplyCusDetails, setSupplyCusDetails] = useState([])
  const [BillingCusDetails, setBillingCusDetails] = useState([])
  const [SaleProductsDetails, setSaleProductsDetails] = useState([])
  const [SummaryInvoice, setSummaryInvoice] = useState('')
  const [DeliveryChallanInvoice, setDeliveryChallanInvoice] = useState('')
  const [DiscountInvoice, setDiscountInvoice] = useState('')
  const [NotesInvoice, setNotesInvoice] = useState('')


  const [BookedByInvoice, setBookedByInvoice] = useState('')
  const [DeliveredByInvoice, setDeliveredByInvoice] = useState('')
  const [TypeOfInvoice, setTypeOfInvoice] = useState('')
  const [showHideDemoAdd, setshowHideDemoAdd] = useState(false)




  const [disableInvoiceInput, setDisableInvoiceInput] = useState(false)

  const [InvoiceId, setInvoiceId] = useState('')
  const [showHideDemoSelect, setShowHideDemoSelect] = useState(true)

  const [dueDateInvoice, setDueDateInvoice] = useState(new Date())
  const CreateProductInvoice = (Checked, record) => {
    console.log("record.productId")
    // console.log(record)
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
  const CreateInvoice = () => {
    axios.post(`${url}invoice/addInvoice`, {
      typeOfInvoice: TypeOfInvoice,
      supplyOrderId: SPIDEdit,
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
  const PdfData = () => {
    axios.get(`${url}invoice/GetInvoice`, {
      params: {
        _id: InvoiceId
      }
    })
      .then((response) => {
        console.log('Historyyyyyyyyyyyyyyyyy')
        const allData = response.data;
        console.log(allData);
        // ?/Pdf 

      })
      .catch(error => console.error(`Error:${error}`));
    // End 
  }

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

  const [ViewInvoice, setViewInvoice] = useState(false)
  const [TotalPayable, setTotalPayable] = useState([])
  const [customerTax, setCustomerTax] = useState([])
  const [SPIDEdit, setSPIDEdit] = useState('')



  const EditInvoice = () => {
    axios.get(`${url}customer/getSalesOrder`, {
      params: {
        _id: state.salesId
      }
    })
      .then((response) => {
        console.log('Historyyyyyyyyyyyyyyyyy')
        const allData = response.data;
        console.log(allData);
        setSupplyCusDetails(response.data.supplyOrderId)
        setBillingCusDetails(response.data.customerId)
        setCustomerTax(response.data.customerId.applicabletax)
        // setSaleProductsDetails(response.data.salePartsId)
        // let result = Object.values(SaleProductsDetails.reduce((c, {saleOrderId,totalAmountPayable}) => {
        //   c[saleOrderId] = c[saleOrderId] || {saleOrderId,totalAmountPayable: 0};
        //   c[saleOrderId].totalAmountPayable+= parseInt(totalAmountPayable);
        //   return c;
        // }, {}));

        // console.log( result);
        // setTotalPayable(result)
        // Open Modal 
        setViewInvoice(true)
        // PrintData()
        // setProductIdEdit(response.data._id)
        setCustomerNameEdit(response.data.CustomerName)
        setCustomerPhoneEdit(response.data.PhoneNumber)
        setCustomerCPEdit(response.data.ContactPerson)
        setrefNumberEdit(response.data.SO_refNumber)
        setSPCategoryEdit(response.data.supplyOrderId.SPCategory)
        setSPIDEdit(response.data.supplyOrderId._id)

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
  console.log('appbar session')
  console.log(state.data);
  console.log(state.Iduser);
  console.log(state.salesId);
  console.log(state.SupplyId)

  const [SPCategoryEdit, setSPCategoryEdit] = useState('');

  const [productIdEdit, setProductIdEdit] = useState('');
  const [refNumberEdit, setrefNumberEdit] = useState('');
  const [typeOforderEdit, settypeOforderEdit] = useState('');
  const [dateOfOrderEdit, setdateOfOrderEdit] = useState('');
  const [orderValidTillEdit, setorderValidTillEdit] = useState('');
  const [StatusEdit, setStatusEdit] = useState('');
  const [saleOrderStateEdit, setsaleOrderStateEdit] = useState('');
  const [dateOfInvoice, setdateOfInvoice] = useState(new Date());
  const [deliveryStatusEdit, setdeliveryStatusEdit] = useState('');
  const [CustomerNameEdit, setCustomerNameEdit] = useState('');
  const [CustomerPhoneEdit, setCustomerPhoneEdit] = useState('');
  const [CustomerCPEdit, setCustomerCPEdit] = useState('');
  const [loading1, setLoading1] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(3);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  // Pages
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);

  const [show4, setShow4] = React.useState(false);
  const [show5, setShow5] = React.useState(false);
  const [show6, setShow6] = React.useState(true);

  const headers = {
    'Content-Type': 'application/json'
  }
  // Logout Admin Profile
  const logout = () => {
    navigate('/')
    // console.log('Logout');
    // axios.get(`${url}api/admin/logout`,
    //  { headers }).then(response => {
    //   console.log(response);
    //   console.log('Logout Successful');
    //   navigate('/')
    // })
    //   .catch(err => {
    //     console.log(err)
    //   })
  };
  // Modal 
  // Second modal Account
  const [visibleAccount, setVisibleAccount] = useState(false);
  const [confirmLoadingAccount, setConfirmLoadingAccount] = useState(false);
  const [modalTextAccount, setModalTextAccount] = useState('Content of the modal');

  const showModalAccount = () => {
    setAnchorEl(null);
    setVisibleAccount(true);
  };

  const handleOkAccount = () => {
    setModalTextAccount('The modal will be closed after two seconds');
    setConfirmLoadingAccount(true);
    setTimeout(() => {
      setVisibleAccount(false)
      Modal.success({
        content: 'Password Updated Successfully',
      });

      // Account Update 
      // axios.put(`${url}api/admin/updateAdminPassword/`, {
      //   email: email,
      //   newPassword: password,
      //   adminId:props.Iduser
      // }, { headers }).then(response => {
      //   console.log(response.data);
      //   console.log('Updated Account Successfully');
      //   setVisibleAccount(false);
      //   setConfirmLoadingAccount(false);
      //   Modal.success({
      //     content: 'Password Updated Successfully',
      //   });

      // })
      //   .catch(err => {
      //     console.log(err)
      //     Modal.error({
      //       title: 'Error ',
      //       content: 'Password Update Failed',
      //     });
      //   })


    }, 2000);
  };

  const handleCancelAccount = () => {
    console.log('Clicked cancel button');
    setVisibleAccount(false);
  };

  // Menu 

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setAnchorEl(null);
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('Updating Profile');
    setConfirmLoading(true);
    setVisible(false)
    setTimeout(() => {
      Modal.success({
        content: 'Profile Updated Successfully',
      });
      setshowHideDemo2(false);
      setshowHideDemo1(true);
      // Api update profile 
      // axios.put(`${url}admin/update-admin`, {
      //   _id: props.Iduser,
      //   username: username,
      //   Dob: dobUser,
      //   image: selectedFile1,

      // }, { headers }).then(response => {
      //   console.log(response.data);
      //   console.log('Updated Profie Successfully');
      //   setVisible(false);
      //   setConfirmLoading(false);
      //   Modal.success({
      //     content: 'Profile Updated Successfully',
      //   });
      //   getAllData();
      //   setSelectedFile1("")

      // })
      //   .catch(err => {
      //     console.log(err)
      //     Modal.error({
      //       title: 'Error ',
      //       content: 'Profile Update Failed',
      //     });
      //   })

    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  // Menu 
  const menu = (
    <Menu
      items={[
        {
          label: (
            <div style={{ color: 'grey', fontWeight: '500', cursor: 'text' }} disabled>
              Welcome User
            </div>
          ),
        },
        {
          icon: <AccountCircleOutlinedIcon style={{ color: 'grey' }} />,
          key: '1',
          label: (
            <a onClick={showModal}>
              Profile
            </a>
          ),
        },
        {
          key: '2',
          icon: <SettingsOutlinedIcon style={{ color: 'grey' }} />,
          label: (
            <a onClick={showModalAccount}>
              Settings
            </a>
          ),
        },
        {
          key: '3',
          icon: <LogoutIcon style={{ color: 'red' }} />,
          label: (
            <a onClick={logout}>
              Logout
            </a>
          ),
        },
      ]}
    />
  );


  const [openProfile, setOpenProfile] = React.useState(false);


  const handleMenu = () => {
    setOpenProfile(true)
  };

  const handleClose = () => {
    setOpenProfile(false)

  };
  const [open3, setOpen3] = React.useState(false);

  // submit add 
  const [email, setemail] = useState([]);
  const [password, setpassword] = useState([]);
  const [username, setusername] = useState([]);
  const [ImgUserData, setImgUserData] = useState([]);
  const [dobUser, setdobUser] = useState([]);

  // Upload File
  const [selectedFile1, setSelectedFile1] = useState('')
  const onFileChange = (e) => {
    console.log(e)
    const formData = new FormData();
    formData.append(
      "image",
      e,
    );
    axios.post(`${url}upload-image`, formData,
      { headers }).then(response => {
        console.log(response.data)
        setSelectedFile1(response.data)

      })

  }
  const [openInventory, setOpenInventory] = React.useState(false);

  const handleClickInventory = () => {
    setOpenInventory(!openInventory);
  };

  const [openSales, setOpenSales] = React.useState(false);

  const handleClickSales = () => {
    setOpenSales(!openSales);
  };
  const drawer = (
    <div style={{ overflow: 'hidden' }}>
      <DrawerHeader className={classes.head}>
        <div className={classes.Header} onClick={() => {
          setShow(true);
          setShow1(false);
          setShow2(false)
          setShow3(false)
          setShow4(false)
          setShow5(false)
          setShow6(false)




        }}>
          <Typography variant="h6" noWrap component="div">
            Logo
          </Typography>
          {/* <Avatar src={image} variant="square" style={logoStyle} ></Avatar> */}
        </div>

      </DrawerHeader>
      <List className={classes.listStyle}>
        <ListItem disablePadding button
          selected={selectedIndex === 0}
          onClick={(event) => {
            handleListItemClick(event, 0)
            setShow(true);
            setShow1(false);
            setShow2(false)
            setShow3(false)
            setShow4(false)
            setShow5(false)
            setShow6(false)



          }}>
          <ListItemIcon>
            {/* className={classes.iconColor} */}
            <DashboardIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />


        </ListItem>

        <ListItem disablePadding onClick={handleClickInventory}

        >
          <ListItemIcon>
            {/* className={classes.iconColor} */}
            <ListAltIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
          {openInventory ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openInventory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 1}
              onClick={(event) => {
                handleListItemClick(event, 1)
                setShow(false);
                setShow1(true);
                setShow2(false)
                setShow3(false)
                setShow4(false)
                setShow6(false)

                setShow5(false)


              }}

            >
              <ListItemIcon>
                <MedicalServicesIcon className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem disablePadding onClick={handleClickSales}

        >
          <ListItemIcon>
            <TrendingUpIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Sales" />
          {openSales ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSales} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 2}
              onClick={(event) => {
                handleListItemClick(event, 2)
                setShow(false);
                setShow1(false);
                setShow2(true)
                setShow3(false)
                setShow4(false)
                setShow5(false)
                setShow6(false)



              }}

            >
              <ListItemIcon>
                <PeopleIcon className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4)
                setShow(false);
                setShow1(false);
                setShow2(false)
                setShow3(false)
                setShow4(true)
                setShow5(false)
                setShow6(false)



              }}

            >
              <ListItemIcon>
                <ViewStreamIcon className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary="Supply Order" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3)
                setShow(false);
                setShow1(false);
                setShow2(false)
                setShow3(false)
                setShow4(false)
                setShow5(true)
                setShow6(false)




              }}

            >
              <ListItemIcon>
                <PieChartIcon className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary="Sales Order" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 6}
              onClick={(event) => {
                handleListItemClick(event, 6)
                setShow(false);
                setShow1(false);
                setShow2(false)
                setShow3(false)
                setShow4(false)
                setShow5(true)
                setShow6(false)




              }}

            >
              <ListItemIcon>
                <ReceiptIcon className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary="Invoice" />
            </ListItemButton>
          </List>
        </Collapse>


        <ListItem disablePadding selected={selectedIndex === 5} onClick={(event) => {
          handleListItemClick(event, 5)
          setShow(false);
          setShow1(false);
          setShow2(false)
          setShow3(true)
          setShow4(false)
          setShow5(false)
          setShow6(false)


        }}>
          <ListItemIcon>
            {/* className={classes.iconColor} */}
            <ContactsIcon className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary="Staff Members" />
        </ListItem>

      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  // App bar 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
    <Box sx={{ display: 'flex' }}>

      {/* <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
         <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' }, backgroundColor: 'black',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer> 
      </Box> */}
      <Box
        open={open}
        sx={{
          // marginTop:'-30px',
          width: '100%',
          height: "100%",
          backgroundColor: 'white',
        }}
      >
        <Toolbar style={{ borderBottom: '2px solid #f1ebeb' }}>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: '#455a64' }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <NotificationsNoneOutlinedIcon style={{ color: '#889397' }} />
            </IconButton>
            <Dropdown overlay={menu}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircleOutlinedIcon style={{ color: '#889397' }} />
                <h6 style={{ marginTop: '5px', color: '#889397' }}>Username</h6>
              </IconButton>
            </Dropdown>
          </Box>

          <Modal
            visible={visible}
            // onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={null}

          >
            {showHideDemo2 &&
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} >
                    <h5>Profile Details</h5>

                  </Grid>
                  <Grid item xs={12} md={6} >
                    <h6>Image</h6>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Avatar alt="Admin" className="AvatarProfile" src={`${url}${ImgUserData}`} />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <h6>Email</h6>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <CFormInput
                      type="text"
                      required
                      className='itemPadding'

                      value={email}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <h6>Dob</h6>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <CFormInput
                      type="text"
                      required
                      value={dobUser}
                      className='itemPadding'
                      onChange={
                        (e) => setdobUser(e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <h6>Upload Image</h6>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <input
                      className='itemPadding'
                      type="file" onChange={(e) => onFileChange(e.target.files[0])} />

                  </Grid>
                  <Grid item xs={12} md={12} align="center" >
                    <div className="d-grid gap-2 col-12 mx-auto">
                      <CButton color="primary" onClick={handleOk}>Save</CButton>
                    </div>
                  </Grid>
                </Grid>

              </Form>
            }
            {/* Second Edit  */}
            {showHideDemo1 &&
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} >
                    <h5>Profile Details</h5>

                  </Grid>
                  <Grid item xs={12} md={6} >
                    <h6>Image</h6>

                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Avatar alt="Admin" className="AvatarProfile" src={`${url}${ImgUserData}`} />

                  </Grid>
                  <Grid item xs={12} md={6} >
                    <h6>Username</h6>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <h6 className='textmodal'>{username}</h6>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <h6>Email</h6>
                  </Grid>

                  <Grid item xs={12} md={6} >
                    <h6 className='textmodal'>{email}</h6>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <h6>Dob</h6>
                  </Grid>

                  <Grid item xs={12} md={6} >
                    <h6 className='textmodal'>{dobUser}</h6>
                  </Grid>
                  <Grid item xs={12} md={12} align="center" >
                    <div className="d-grid gap-2 col-12 mx-auto">
                      <CButton color="primary" onClick={() => {
                        setshowHideDemo2(true);
                        setshowHideDemo1(false);
                      }}>Edit</CButton>
                    </div>
                  </Grid>
                </Grid>

              </Form>
            }
          </Modal>

          <Modal
            visible={visibleAccount}
            // onOk={handleOkAccount}
            confirmLoading={confirmLoadingAccount}
            onCancel={handleCancelAccount}
            footer={null}
          >
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} >
                  <h5>Account Details</h5>
                </Grid>
                <Grid item xs={12} md={6} >
                  <h6>Email</h6>
                </Grid>
                <Grid item xs={12} md={6} >
                  <CFormInput
                    type="text"
                    required
                    className='itemPadding'
                    value={email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6} >
                  <h6>Password</h6>
                </Grid>
                <Grid item xs={12} md={6} >
                  <CFormInput
                    type="text"
                    required
                    className='itemPadding'
                    onChange={
                      (e) => setpassword(e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} md={12} align="center" >
                  <div className="d-grid gap-2 col-12 mx-auto">
                    <CButton color="primary" onClick={handleOkAccount}>Save</CButton>
                  </div>
                </Grid>
              </Grid>
            </Form>
          </Modal>
        </Toolbar>
        <Main open={open} style={MarginTop} className={classes.BackGround}>

          <Grid container spacing={2}>
            <Grid item xs={12} md={3} >
            </Grid>

            <Grid item xs={12} md={9} style={paddingGrid}>
              {/* data={props.data} */}
              {show ? <DashboardUser /> : null}
              {show1 ? <Products /> : null}
              {show2 ? <Customers /> : null}
              {show3 ? <StaffMembers /> : null}
              {show4 ? <SupplyOrders /> : null}
              {show5 ? <SalesOrder data={state.data} Iduser={state.iduser} /> : null}
              {show6 ?
                <>
                  <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 1 }} style={{ backgroundColor: 'grey' }}>
                    <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 6 }} >
                      <CCol xs style={{ flexGrow: 1 }} >
                        <CButton color="secondary" onClick={() => navigate('/home')}>Back</CButton>

                      </CCol>
                      <CCol xs>
                        <CButton color="warning" onClick={EditInvoice}>Export To Pdf</CButton>

                      </CCol>
                    </CRow>



                    <CCol xs>
                      <h5>Supply Order Details</h5>
                      <hr></hr>
                      <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 2 }} >
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Ref No:</span> {refNo}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Category:</span>{category} </CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Status:</span>{status}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Date of Order:</span>{dateOfOrder}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Order Valid Till:</span>{orderValidTill}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Type Of Order:</span>{orderType}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Special Instructions :</span>{specialInstructions}</CCol>
                        {/* Customer Details  */}
                        <CCol xs></CCol>
                      </CRow>
                      <h5 className={classes.marginHead}>Customer Details</h5>
                      <hr></hr>
                      <CRow xs={{ cols: 1, gutter: 2 }} md={{ cols: 2 }}>


                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Customer Name :</span>{customerName}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Address :</span>{addressCus}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>CNIC :</span>{cnicCus}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Phone :</span>{phoneCus}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>NTN No :</span>{ntnNumberCus}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Sales Tax No :</span>{salesTaxCus}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Type Of Customer :</span>{typeOfCustomerCus}</CCol>
                        <CCol xs className={classes.Detail}><span className={classes.DetailHead}>Applicable Tax :</span>{TaxCus}</CCol>

                      </CRow>
                      <h5 className={classes.marginHead}>Product Details</h5>
                      <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 1 }}>
                        <div className='tableResponsive'>
                          <Table columns={columnsSalesView} dataSource={dataSales} size='small' bordered />
                        </div>


                      </CRow>

                      {/* Second Row  */}

                    </CCol>
                    <CCol xs>
                      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 6 }}>
                        <CCol xs style={{ flexGrow: 1 }} >
                          <h5>Sales Order Details</h5>
                        </CCol>
                        <CCol xs >
                          <CButton color="primary" style={{ marginTop: '-20px' }} onClick={addSalesParts}>+ Sales</CButton>

                        </CCol>
                        {/* <CCol xs >
                          <CButton color="primary" onClick={EditInvoice}>Invoice</CButton>

                        </CCol> */}

                      </CRow>

                      <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 12 }}>
                        <div className='tableResponsive'>
                          <Table columns={columnsSalesPartsView} dataSource={dataSalesParts} size='small' bordered />
                        </div>


                      </CRow>
                    </CCol>
                    <CCol xs>
                      <CRow>
                        <CModal visible={ViewInvoice} size="xl" onClose={() => setViewInvoice(false)}>
                          <CModalHeader onClose={() => setViewInvoice(false)}>
                            <CModalTitle> Invoice Details</CModalTitle>
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
                        {/* View  Sales*/}
                        <CModal visible={visibleViewSales} onClose={() => {
                          setVisibleViewSales(false);
                        }}>
                          <CModalHeader onClose={() => {
                            setVisibleViewSales(false)
                          }}>
                            <CModalTitle> Sales Order Details</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <CForm
                              noValidate
                              className="row g-3 needs-validation"
                            // validated={validated}
                            >
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
                                  <CCol xs>

                                    <CFormSelect label="Customer Name"
                                      value={valueSalePID}
                                      className='itemPadding'
                                      onChange={(e) => setvalueSalePID(e.target.value)}
                                    >
                                      <option value="">Select Product</option>
                                      {dataSalesView.map((row) => (
                                        <option value={row._id}>{row.productName}</option>
                                      ))}

                                    </CFormSelect>
                                  </CCol>
                                  <CCol xs>
                                  </CCol>


                                </CRow>
                                <CRow xs={{ cols: 1, gutter: 1 }} md={{ cols: 12 }}>
                                  <CButton color="primary" style={{ float: 'right' }} onClick={AddOrderSalesParts}>Save</CButton>
                                </CRow>


                              </>
                            </CForm>

                          </CModalBody>
                        </CModal>
                      </CRow>

                    </CCol>
                  </CRow>
                </> : null}
            </Grid>
          </Grid>
        </Main>
      </Box>

    </Box>
  );
}

SalesOrderDetails.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SalesOrderDetails;