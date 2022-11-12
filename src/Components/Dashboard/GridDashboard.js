import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GroupIcon from '@mui/icons-material/Group';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import UpdateIcon from '@mui/icons-material/Update';
import { MedicineBoxOutlined, LikeOutlined, TableOutlined } from '@ant-design/icons'
import axios from 'axios';
import url from '../url'
import '../tableStyle.css'

const useStyles = makeStyles({
    number: {
        fontSize: '20px',
        lineHeight: '32px',
        display: 'flex'

    },
    remarks: {
        lineHeight: '25px',
        marginTop: '10px',
        fontSize: '13px',
        color: '#9a9cab',
        fontFamily: 'Roboto Slab',
    },
    btn: {
        border: ' none',
        width: '70px',
        fontSize: ' 32px',
        cursor: 'pointer',
        borderRadius: '20px',
    },
    btn1: {
        backgroundColor: '#fc9494',
        border: ' none',
        color: 'black',
        padding: '12px 16px',
        fontSize: ' 16px',
        cursor: 'pointer',
        borderRadius: '5px'
    },
    btn2: {
        backgroundColor: '#ada6f2',
        border: ' none',
        color: 'white',
        padding: '12px 16px',
        fontSize: ' 16px',
        cursor: 'pointer',
        borderRadius: '5px'
    },
    btn4: {
        backgroundColor: '#5044c9',
        border: ' none',
        color: 'white',
        padding: ' 11px 24px',
        fontSize: '39px',
        cursor: 'pointer',
        borderRadius: '17px'
    },
    iconStyle: {
        marginTop: '3px',
        marginRight: '4px'
    }, HeadingWelcome: {
        fontSize: '26px',

    }, remarksHeader: {
        fontSize: '16px',
        marginTop: '-15px'
        // padding: '10px',
        // display: 'flex'
    }, remarksImg: {
        padding: "20px",
        alignContent: 'center'
    }, remarksHeader2: {
        padding: "10px",
        alignContent: "center",
        fontSize: '20px',
        fontWeight: '500',
        marginLeft: '30px'
    },
    remarksHeader3: {
        padding: '5px',
        alignContent: "center",
        fontSize: '14px'
    }
})
const styleBtn = {
    border: ' none',
    width: '100px',
    height: '100px',
    fontSize: ' 32px',
    cursor: 'pointer',
    borderRadius: '24px',

}
function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'white'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'black' : 'black'),

                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};


function GridDashboard() {
    const classes = useStyles();
    //get-all-topics
    const [data, setData] = useState([]);
    const getAllData = () => {
        axios.get(`${url}api/doctor/allDoctors`)
            .then((response) => {
                const allData = response.data;
                // console.log(allData.length);
                setData(allData.length);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    //get-all-transactions
    const [data1, setData1] = useState([]);
    const getAllData1 = () => {
        axios.get(`${url}api/hospital/allHospital`)
            .then((response) => {
                const allData = response.data;
                // console.log(allData.length);
                setData1(allData.length);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const [data2, setData2] = useState([]);
    const getAllData2 = () => {
        // axios.get(`${url}admin/get-all-promo`)
        //     .then((response) => {
        //         const allData = response.data;
        //         console.log(allData.length);
        //         setData2(allData.length);
        //     })
        //     .catch(error => console.error(`Error:${error}`));

    }
    const [data3, setData3] = useState([]);
    const getAllData3 = () => {
        axios.get(`${url}api/hospitalType/getAllHospitalTypes`)
            .then((response) => {
                const allData = response.data.data;
                console.log(allData.length);
                setData3(allData.length);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const [data4, setData4] = useState([]);

    const getAllData4 = () => {
        axios.get(`${url}user/get-completed`)
            .then((response) => {
                const allData = response.data;
                console.log(allData.length);
                setData4(allData.length);
            })
            .catch(error => console.error(`Error:${error}`));

    }
    const [data5, setData5] = useState([]);

    const getAllData5 = () => {
        axios.get(`${url}user/get-pendings`)
            .then((response) => {
                const allData = response.data;
                console.log(allData.length);
                setData5(allData.length);
            })
            .catch(error => console.error(`Error:${error}`));

    }

    useEffect(() => {
        getAllData();
        getAllData1();
        getAllData2();
        getAllData3();
        getAllData4();
        getAllData5();

    }, []);

    return (
        <div>
            <Grid container spacing={2} >
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                            <Box
                                className="card_style"
                            >
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3} >
                                            <MedicineBoxOutlined className='iconStyleCard' />
                                        </Grid>
                                        <Grid item xs={12} md={9} >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader2}>{data}</div>

                                                </Grid>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader}>Total Doctors</div>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Second  */}
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                            <Box
                                className="card_style"
                            >
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3} >
                                            <TableOutlined className='iconStyleCard1' />
                                        </Grid>
                                        <Grid item xs={12} md={9} >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader2}>{data1}</div>

                                                </Grid>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader}>Total Hospitals</div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                {/* 4Th large  */}
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} >
                            <Box
                                className="card_style"
                            >
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3} >
                                            <MedicineBoxOutlined className='iconStyleCard' />
                                        </Grid>
                                        <Grid item xs={12} md={9} >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader2}>{data3}</div>

                                                </Grid>
                                                <Grid item xs={12} md={12} >
                                                    <div className={classes.remarksHeader}>Total Hospital Types</div>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>


                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default GridDashboard