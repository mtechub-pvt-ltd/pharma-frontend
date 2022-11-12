import { useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, Grid } from '@mui/material'
import image from '../Components/Images/logo.png'
import { useNavigate } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import url from '../Components/url'
import background from '../Components/Images/backgroundImg.png'
import { LockOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import 'antd/dist/antd.css'
import './stylesheet.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Modal } from 'antd';

const logoStyle = {
  width: '20%',
  height: '100%',
  marginBottom: '20px',
  // marginTop:'100px'
}
const logo = {
  padding: '40px 140px'
}
const ContainerStyle = {
  // paddingTop: '50px',
  backgroundColor: 'white',
  color: 'black',
  height: '110vh',
  backgroundImage: 'linear-gradient(to right, #32cd32 , #657e58)',
  // backgroundImage: `url(${background})` ,
  // backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 800px'
}
const ContainerStyle3 = {
  paddingTop: '150px',
  justifyContent: 'center',
  color: 'white',
  height: '110vh',
  backgroundImage: 'linear-gradient(to right, #32cd32 , #657e58)',
}

const headingStyle = {
  fontSize: '20px',
  fontFamily: 'Roboto Slab',
  color: 'black'

}
const gridCont = {
  backgroundColor: 'transparent',
  paddingTop: '140px'
}
const override = {
  display: ' block',
  margin: '0 auto',
}

const color = "white"

const heading = "Forget Password"
function ForgetPass() {
  // Loading 
  const [loading, setLoading] = useState("");
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

    }, 3000)
  }, [])

  //    Get 
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [disabledOtp, setdisabledOtp] = useState(true);
  const [OtpMatch, setOtpMatch] = useState(true);


  const [password, setPassword] = useState("");
  const [session, setSession] = useState("");
  const headers = {
    'Content-Type': 'application/json'
  }
  const EmailVerify = () => {
    axios.post(`${url}api/user/userForgetPassword`, {
      email: email,
    }, { headers }).then(response => {
      console.log(response.data)
      if (response.data.status === "pending") {
        message.success(response.data.message);
        setdisabledOtp(false)
        setOtpMatch(response.data.data.otp)
      } else {
        Modal.error({
          title: 'Invalid Email',
          content: 'Please Check your Email',
        });
      }
    })
      .catch(err => {
        console.log(err)
        Modal.error({
          title: 'Invalid Email',
          content: 'Please Check your Email',
        });
      })
  }
  const FinishData = () => {
    setLoading1(true)
    setTimeout(() => {
      setLoading1(false)
      axios.post(`${url}api/user/verifyOTP`, {
        userEnteredOtp: password,
        email: email
      }, { headers }).then(response => {
        console.log(response)
        if (response.data.message === "user found , OTP successfully matched") {
          console.log('matched')
          const Id =response.data.data.userId;
          const EmailData =response.data.data.email;
          console.log(EmailData);
          navigate('/updatePass'
                ,
                {
                  state: {
                    ID:Id ,
                    email: EmailData,
                  }
                }
              );
        } else {
          console.log("not matched")
          Modal.error({
            title: 'Invalid OTP',
            content: 'Check OTP to continue',
          });
        }
      })
        .catch(err => {
          console.log(err)
          Modal.error({
            title: 'Invalid OTP',
            content: 'Check OTP to continue',
          });
        })
    }, 3000)
  };
  return (
    <div >
      {loading ?
        // style={ContainerStyle3}
        < Grid container spacing={2} style={ContainerStyle3}>
          <ClipLoader color={color} loading={loading} css={override} size={30} />
        </Grid>
        :
        < Grid container spacing={2} style={ContainerStyle}>

          <Grid item xs={12} md={4} > </Grid>

          <Grid item xs={12} md={4} style={gridCont}>
            <Grid align='center'>
              {/* <Avatar src={image} variant="square" style={logoStyle} ></Avatar> */}
              <Card sx={{ minWidth: 275, borderRadius: 5 }}>
                {/* <CardContent> */}
                <h6 style={headingStyle}>Logo</h6>

                <h6 style={headingStyle}>{heading}</h6>

                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                // onFinish={onFinish}
                >
                  <Form.Item
                    name="email"

                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                    ]}
                  >
                    < Grid container spacing={2} >

                      <Grid item xs={10} md={10} >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                          className="inputField"
                          value={email}
                          onChange={
                            (e) => setEmail(e.target.value)
                          }
                          placeholder="Enter Email to Verify" /></Grid>
                      <Grid item xs={2} md={2} >
                        <CheckCircleOutlined className="email-Verify" onClick={EmailVerify} />
                      </Grid>

                    </Grid>


                  </Form.Item>
                  <Form.Item
                    name="OTP"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your OTP!',
                      },
                    ]}
                  >
                    <Input

                      prefix={<LockOutlined className="site-form-item-icon" />}
                      value={password}
                      onChange={
                        (e) => setPassword(e.target.value)
                      }
                      placeholder="Enter OTP "
                      disabled={disabledOtp}
                      className="inputField"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={FinishData} disabled={disabledOtp}>
                      {loading1 ? <ClipLoader color={color} loading={loading1} css={override} size={10} /> : <h5>
                        Verify</h5>}
                    </Button>
                    <a className="forgetPass" onClick={EmailVerify} disabled={disabledOtp}>Resend OTP</a>
                  </Form.Item>
                </Form>

                {/* </CardContent> */}
              </Card>

            </Grid>

          </Grid>
          <Grid item xs={12} md={4} > </Grid>

        </Grid>
      }
    </div>

  )
}

export default ForgetPass