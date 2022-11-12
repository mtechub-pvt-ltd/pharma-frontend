import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react'
import image from '../Components/Images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import { useNavigate } from 'react-router-dom'
import DashboardUser from '../Components/Dashboard/Dashboard'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Grid } from '@mui/material';
import axios from 'axios';
import url from '../Components/url';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material'
import { Dropdown, Menu, Modal, Form, Input, Button } from 'antd'
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import Products from '../Components/Products/Products';
import Customers from '../Components/Customers/Customers';
import StaffMembers from '../Components/StaffMembers/StaffMembers';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PieChartIcon from '@mui/icons-material/PieChart';
import {
  CButton,
  CFormInput
} from '@coreui/react'
import SupplyOrders from '../Components/SupplyOrders/SupplyOrders';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import SalesOrder from '../Components/SalesOrder/SalesOrder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import StarBorder from '@mui/icons-material/StarBorder';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Invoicing from '../Components/Invoice/Invoicing';
const drawerWidth = 240;
const useStyles = makeStyles({
  BackGround: {
    // backgroundColor: '#ebedef',
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
  padding: 0,
  margin:0
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


function ResponsiveDrawer(props) {
  const [showHideDemo2, setshowHideDemo2] = useState(false)
  const [showHideDemo1, setshowHideDemo1] = useState(true)


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const classes = useStyles();
  const getAllData = () => {
    setemail(props.data)
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
  useEffect(() => {
    getAllData();

  }, []);

  console.log('appbar session')
  console.log(props.data);
  console.log(props.Iduser);

  const [loading1, setLoading1] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
  const [show, setShow] = React.useState(true);
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [show3, setShow3] = React.useState(false);

  const [show4, setShow4] = React.useState(false);
  const [show5, setShow5] = React.useState(false);
  const [show6, setShow6] = React.useState(false);



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
       
        <ListItem disablePadding  onClick={handleClickInventory}
       
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
          setShow5(false)
          setShow6(false)



        }}
        
        >
            <ListItemIcon>
              <MedicalServicesIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItem disablePadding  onClick={handleClickSales}
       
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
          setShow5(false)
          setShow6(true)


  

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

      <Box
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
      </Box>
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
            <Grid item xs={12} md={12} style={paddingGrid}>
              {/* data={props.data} */}
              {show ? <DashboardUser /> : null}
              {show1 ? <Products /> : null}
              {show2 ? <Customers /> : null}
              {show3 ? <StaffMembers /> : null}
              {show4 ? <SupplyOrders /> : null}
              {show5 ? <SalesOrder  data={props.data} Iduser={props.iduser}/> : null}
              {show6 ? <Invoicing /> : null}


              {/* {show4 ? <Hospitals /> : null}
            {show5 ? <Doctors /> : null} */}
            </Grid>
          </Grid>
        </Main>
      </Box>

    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;