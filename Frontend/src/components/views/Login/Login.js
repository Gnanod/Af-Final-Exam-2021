import React, {Component} from "react";
import {
    MDBMask,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBAnimation,
    MDBAlert,
    MDBModal,
    MDBModalHeader, MDBModalBody, MDBModalFooter, MDBCardImage
} from 'mdbreact';
import './Login.css';
import {MDBCard, MDBCardBody, MDBInput} from 'mdbreact';
import Signup from "../SignUp/Signup";
import {getUser, saveUser} from "../../services/signup.service";
import {loginUser} from "../../services/login.service";
import * as Swal from "sweetalert2";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            modal: false,
            model2: false,
            fname: '',
            email: '',
            password: '',
            confirmpass: '',
            loginEmail: '',
            loginPass: '',
            loginEmailV: false,
            loginPassV: false,

        };

        this.onClick = this.onClick.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeEmailV = this.onChangeEmailV.bind(this);
        this.onChangePassV = this.onChangePassV.bind(this);
    }


    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggle2 = () => {
        this.setState({
            modal: !this.state.modal,
            modal2: !this.state.model2
        });
    }

    toggle3 = () => {
        this.setState({
            modal2: false,
            fname: "",
            email: "",
            password: "",
            confirmpass: ""

        });
    }
    onChangeEmailV(event) {
        this.setState({
            loginEmail: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangePassV(event) {
        this.setState({
            loginPass: event.target.value,
            [event.target.name]: event.target.value
        })
    }


    onChangeFname(event) {
        console.log(event.target.value)
        this.setState({
            fname: event.target.value,
            [event.target.name]: event.target.value
        })
    }


    onChangeEmail(event) {
        this.setState({
            email: event.target.value,
            [event.target.name]: event.target.value
        })
    }


    onChangePassword(event) {
        this.setState({
            password: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    onChangeConfirmPassword(event) {
        this.setState({
            confirmpass: event.target.value,
            [event.target.name]: event.target.value
        })
    }


    submitUser(event) {
        event.preventDefault();
        event.target.className += " was-validated";
        if (this.state.password == this.state.confirmpass) {
            if (this.state.fname != '') {
                if (this.state.email != '') {
                    if (this.state.password != '') {
                        if (this.state.confirmpass != '') {
                            const userDetail = {
                                userName: this.state.fname,
                                email: this.state.email,
                                password: this.state.password,
                                userType: 'Customer'
                            }
                            getUser(this.state.email).then(res => {
                                if(res.data.message === 'not found'){
                                    saveUser(userDetail).then(res=>{
                                        if (res.data.success === 'successful') {
                                            this.setState({
                                                fname: '',
                                                password: '',
                                                confirmpass: '',
                                                email: '',
                                                modal2 :false
                                            })
                                            Swal.fire(
                                                '',
                                                'Added Success',
                                                'success'
                                            )
                                        } else {
                                            Swal.fire(
                                                '',
                                                'Added fail',
                                                'error'
                                            )
                                        }
                                    }).catch(error => console.error(error));
                                }else {
                                    Swal.fire(
                                        '',
                                        'You Cant Use This Email Please Enter Another One',
                                        'error'
                                    )
                                }
                            }).catch(error => console.error(error));
                        } else {
                        }
                    } else {
                    }

                } else {
                }

            } else {
            }
        } else {
            Swal.fire('',
                'password and confirm password are not the same !',
                'error');
        }
    };

    validateUser(event) {
        event.preventDefault();
        if (this.state.loginEmail != '') {
            this.setState({
                loginEmailV: false
            })
            if (this.state.loginPass != '') {
                this.setState({
                    loginPassV: false
                })
                loginUser(this.state.loginEmail,this.state.loginPass).then(res => {
                    if (res.data.message !== 'not found') {
                        if(res.data.message.userType==='Customer'){
                            localStorage.setItem("CustomerLogged", "CustomerLogged");
                            localStorage.setItem("UserLogged", "UserLogged");
                            localStorage.setItem("CustomerId",res.data.message._id);
                            this.props.history.push('/mybookings');
                            this.setState({
                                loginEmail: '',
                                loginPass: '',
                                loginEmailV: false,
                                loginPassV: false
                            });
                        }else{
                            localStorage.setItem("UserLogged", "UserLogged");
                            localStorage.setItem("AdminLogged", "AdminLogged");
                            localStorage.setItem("CustomerId",res.data.message._id);
                            this.props.history.push('/dashboard');
                            this.setState({
                                loginEmail: '',
                                loginPass: '',
                                loginEmailV: false,
                                loginPassV: false
                            });
                        }
                    } else {
                        Swal.fire(
                            '',
                            'Login unsuccessful  !',
                            'error'
                        )
                    }
                }).catch(error => console.error(error));
            } else {
                console.log('email field empty');
                this.setState({
                    loginPassV: true
                })
            }
        } else {
            console.log('email field empty');
            this.setState({
                loginEmailV: true
            })
        }
    }
    ;


    render() {
        return (
            <div id='apppage'>
                <MDBView>
                    <MDBMask className='white-text gradient'/>
                    <MDBContainer
                        style={{height: '100%', width: '100%', paddingTop: '10rem'}}
                        className='d-flex justify-content-center white-text align-items-center'
                    >
                        <MDBRow>
                            <MDBCol md='12' className='text-center text-md-left mt-xl-5 mb-5'>
                                <MDBAnimation type='fadeInLeft' delay='.3s'>
                                    <MDBCard className="loginContainer">
                                        <form className="needs-validation"
                                              onSubmit={this.validateUser}>
                                            <MDBCardBody className="mx-4">
                                                <div className="text-center">
                                                    <h3 className="dark-grey-text mb-5">
                                                        <strong> Login</strong>
                                                    </h3>
                                                </div>
                                                <MDBInput label="Your email" group type="email" validate error="wrong"
                                                          success="right" value={this.state.loginEmail}
                                                          onChange={this.onChangeEmailV}/>
                                                {
                                                    this.state.loginEmailV ?
                                                        <MDBAlert color="danger">
                                                            Please enter a value for email !
                                                        </MDBAlert> : ''
                                                }

                                                {/*<input value={this.state.loginPass} onChange={this.onChangePassV}/>*/}
                                                <MDBInput label="Your password" group type="password" validate
                                                          containerClass="mb-0" value={this.state.loginPass}
                                                          onChange={this.onChangePassV}/>
                                                {
                                                    this.state.loginPassV ?
                                                        <MDBAlert color="danger">
                                                            Please enter a value for email !
                                                        </MDBAlert> : ''
                                                }

                                                <div className="text-center mb-3">
                                                    <MDBBtn type="submit" color='blue'
                                                            className="btn-block z-depth-1a buttonSign ">
                                                        LOGIN
                                                    </MDBBtn>
                                                </div>
                                                <MDBModalFooter className="mx-5 pt-3 mb-1">
                                                    <p className="font-small grey-text d-flex justify-content-end">
                                                        Not a member?
                                                        <MDBBtn outline color="info" size="sm" onClick={this.toggle2}>
                                                            Sign Up</MDBBtn>
                                                    </p>
                                                </MDBModalFooter>
                                            </MDBCardBody>
                                        </form>

                                    </MDBCard>
                                </MDBAnimation>
                            </MDBCol>

                        </MDBRow>
                    </MDBContainer>
                </MDBView>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal2} toggle={this.toggle3}>
                        <MDBModalHeader toggle={this.toggle3}></MDBModalHeader>
                        <Signup
                            modelOne ={this.state.modal}
                            submitUser={this.submitUser}
                            firstName={this.state.fname}
                            onChangeFname={this.onChangeFname}
                            email ={this.state.email}
                            onChaneEmail ={this.onChangeEmail}
                            onChangePassword={this.onChangePassword}
                            password={this.state.password}
                            onChangeConfirmPassword ={this.onChangeConfirmPassword}
                            confirmpass ={this.state.confirmpass}
                        />
                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}
