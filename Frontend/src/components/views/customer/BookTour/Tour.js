import React, {Component} from "react";
import {
    MDBRow,
    MDBModal,
    MDBModalHeader, MDBModalBody, MDBContainer, MDBAlert, MDBBtn
} from 'mdbreact';
import {MDBCard, MDBCardBody} from 'mdbreact';

export default class Tour extends Component {

    render() {
        const {
            name,personCount, cost,onChangePersonCount,submitBooking} = this.props;
        return (

            <MDBModalBody>
                <MDBCard>
                    <MDBCardBody className="mx-2">
                        <div className="text-center">
                            <h2 className="loginh3 mb-1">
                                <strong className="loginh3 ">Book {name}</strong>
                            </h2>
                        </div>
                        <form className="needs-validation" onSubmit={submitBooking} noValidate>
                            <MDBRow>
                                <label htmlFor="personCount" className="grey-text">PersonCount</label>
                                <input value={personCount}
                                       name="personCount"
                                       onChange={onChangePersonCount}
                                       type="text" id="personCount" className="form-control"
                                       placeholder="First name" required/>
                                <div className="invalid-feedback">Please provide Person Count.</div>
                                <label htmlFor="costId" className="grey-text">Cost</label>
                                <input value={cost}
                                       type="text"
                                       id="costId" className="form-control"
                                       name="cost"
                                       placeholder="Your Cost" disabled/>
                                <div className="invalid-feedback">Please provide Cost.</div>
                            </MDBRow>
                            <br/>

                            <br></br>
                            <MDBBtn gradient="blue" rounded className="btn-block z-depth-1a" type="submit">
                                Save
                            </MDBBtn>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBModalBody>
        );
    }
}

