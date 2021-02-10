import React, {Component} from "react";
import {
    MDBRow,
    MDBModal,
    MDBModalHeader, MDBModalBody, MDBContainer, MDBAlert, MDBBtn
} from 'mdbreact';
import {MDBCard, MDBCardBody} from 'mdbreact';

export default class Signup extends Component {

    render() {
        const {
            submitUser, firstName, onChangeFname, email,
            onChaneEmail, onChangePassword, password, onChangeConfirmPassword, confirmpass} = this.props;
        return (
            <MDBModalBody>
                <MDBCard>
                    <MDBCardBody className="mx-2">
                        <div className="text-center">
                            <h2 className="loginh3 mb-1">
                                <strong className="loginh3 ">REGISTER</strong>
                            </h2>
                        </div>
                        <form className="needs-validation" onSubmit={submitUser} noValidate>
                            <MDBRow>
                                <label htmlFor="firstnameid" className="grey-text">First name</label>
                                <input value={firstName}
                                       name="fname"
                                       onChange={onChangeFname}
                                       type="text" id="firstnameid" className="form-control"
                                       placeholder="First name" required/>
                                <div className="invalid-feedback">Please provide the first name.</div>
                                <label htmlFor="emailid" className="grey-text">Email</label>
                                <input value={email}
                                       onChange={onChaneEmail}
                                       type="email"
                                       id="emailid" className="form-control"
                                       name="email"
                                       placeholder="Your Email address" required/>
                                <div className="invalid-feedback">Please provide an email.</div>
                            </MDBRow>
                            <MDBRow>
                                <label htmlFor="passwordid" className="grey-text">Password</label>
                                <input onChange={onChangePassword}
                                       value={password}
                                       type="password"
                                       id="passwordid" className="form-control"
                                       name="password" placeholder="Password" required/>
                                <div className="invalid-feedback">Please provide the password</div>
                                <label htmlFor="conpasswordid" className="grey-text">Confirm
                                    Password</label>
                                <input onChange={onChangeConfirmPassword} type="password"
                                       value={confirmpass} id="conpasswordid"
                                       className="form-control" name="confirmpass"
                                       placeholder="Confirm Password" required/>
                                <div className="invalid-feedback">Please provide the confirm password</div>
                                {
                                    password != confirmpass ?
                                        <MDBAlert color="danger">
                                            password and confirm password does not match
                                        </MDBAlert> : ''
                                }
                            </MDBRow>
                            <br/>

                            <br></br>
                            <MDBBtn gradient="blue" rounded className="btn-block z-depth-1a" type="submit">
                                REGISTER
                            </MDBBtn>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBModalBody>
        );
    }
}

