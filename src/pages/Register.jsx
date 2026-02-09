import React, { useState, useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import GoogleOAuth from '../components/Auth/GoogleOAuth'
import Divider from '@mui/material/Divider'
function Register() {
    let Navigate = useNavigate()
    let [credentials, setCredential] = useState({})
    let [pwdError, setpwdError] = useState("")

    function handleChange(e) {
        let { name, value, files } = e.target
        setCredential((prev) => (
            {
                ...prev,
                [name]: files ? files[0] : value
            }
        ))
    }
    function handleSubmit(e) {
        e.preventDefault();

        if (!credentials.password?.trim() || !credentials.cpassword?.trim()) {
            setpwdError("Passwords must not be empty");
            return;
        } else if (credentials.password !== credentials.cpassword) {
            setpwdError("Passwords do not match");
            return;
        } else {
            setpwdError("");
        }

        const formData = new FormData();
        for (let key in credentials) {
            formData.append(key, credentials[key]);
        }

        axios.post("http://127.0.0.1:8000/auth/register/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                console.log(response.data);
                Navigate("/signin")
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

    }, [])
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    return (
        <div className='main-container'>
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Col md={6}>
                        <h1 className='my-3 text-center'>Register New User Account</h1>
                        <Form onSubmit={handleSubmit}>
                            <TextField fullWidth label="First Name" type="text" name="first_name" onChange={handleChange} className='my-2' />
                            <TextField fullWidth label="Last Name" type="text" name="last_name" onChange={handleChange} className='my-2' />
                            <TextField fullWidth label="User Name" type="text" name="username" onChange={handleChange} className='my-2' />
                            <TextField fullWidth label="Email Address" type="email" name="email" onChange={handleChange} className='my-2' />
                            <TextField fullWidth label="Mobile No." type="text" name="phno" onChange={handleChange} className='my-2' />
                            <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} className='my-2' />
                            <TextField fullWidth label="Confirm Password" type="password" name="cpassword" onChange={handleChange} className='my-2' />
                            <p className='text-danger'>{pwdError}</p>
                            <div className="d-flex justify-content-center">
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="outlined"
                                    color='success'
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Profile Picture
                                    <VisuallyHiddenInput
                                        hidden
                                        type="file"
                                        onChange={(event) => console.log(event.target.files)}

                                    />
                                </Button>
                            </div>

                            <br />
                            <Button type="submit" variant='contained' color='primary' className='my-2 w-100'>Register</Button>

                            <Divider className='fs-4'>Or</Divider>
                            <div className="d-flex justify-content-center py-3">
                                <div className="px-3">
                                    <GoogleOAuth behaviour="signup" />
                                    <span className='text-start' style={{ marginLeft: -3 }}>Google</span>
                                </div>
                            </div>

                            <p className='lead mb-5 pb-5 text-center'><span>Already have a account? </span><Link className='text-decoration-none' to="/signin">Sign In <ArrowRightAltIcon /></Link></p>
                        </Form>
                    </Col>
                </Row>



            </Container>
        </div>
    )
}

export default Register