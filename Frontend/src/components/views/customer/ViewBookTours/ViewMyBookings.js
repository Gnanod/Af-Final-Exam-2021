import React, {Component} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer, MDBIcon,
    MDBMask,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBView
} from "mdbreact";
import "react-datepicker/dist/react-datepicker.css";
import {findalltours} from "../../../services/tour.service";
import src1 from "../../../../assets/img-1.jpg";
import {findallBookedtours} from "../../../services/tour.book.service";

export class ViewMyBookings extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tourList: [],
            tourListStatus: false
        }
        this.getAllMyTours = this.getAllMyTours.bind(this);
        this.getAllMyTours();
    }

    getAllMyTours() {
        findallBookedtours(localStorage.getItem("CustomerId")).then(res => {
            console.log(res.data)
            this.setState({
                tourList: res.data,
                tourListStatus: true
            })
        }).catch(error => console.error(error));
    }


    render() {
        return (
            <MDBRow className="justify-content-center">
                <MDBCol md="6" lg="9">
                    <section className="text-center pb-3">
                        <MDBRow className="d-flex justify-content-center">
                            {
                                this.state.tourListStatus ?
                                    this.state.tourList.map(tour => {
                                        const base64String = btoa(new Uint8Array(tour.tour[0].image.data.data).reduce(function (data, byte) {
                                            return data + String.fromCharCode(byte);
                                        }, ''));
                                        console.log(tour)
                                        return (

                                            <div className="col-sm-4 cardMarginTop">
                                                <MDBCard className="d-flex mb-5">

                                                    <MDBCardImage   className="img-fluid"
                                                                  src={`data:image/jpeg;base64,${base64String}`}
                                                                  waves/>
                                                    <MDBCardBody>
                                                        <MDBCardTitle className="font-bold mb-3">
                                                            <strong>{tour.tour[0].place}</strong>
                                                        </MDBCardTitle>
                                                        <MDBCardText>Some quick example text to build on the card
                                                            title
                                                            and make up the bulk of the card's
                                                            content.</MDBCardText>
                                                        <span className="h5 text-right mb-4">Duration</span> :<span
                                                        style={{fontWeight: "bold"}}>{tour.tour[0].duration} Days</span>
                                                        <br/>
                                                        <span className="h5 text-left mb-4">Start Date</span> :<span
                                                        style={{fontWeight: "bold"}}>{tour.tour[0].startDate.substring(0, 10)}</span>
                                                        <br/>
                                                        <span className="h5 text-left mb-4">End  Date</span> :<span
                                                        style={{fontWeight: "bold"}}> {tour.tour[0].endDate.substring(0, 10)}</span>
                                                        <br/>
                                                        <span
                                                            className="h5 text-left mb-4">Cost(One Person)</span>: <span
                                                        style={{fontWeight: "bold"}}>RS:{tour.tour[0].cost}</span>
                                                        <br/>
                                                        <span className="h5 text-left mb-4">Transport</span> :<span
                                                        style={{fontWeight: "bold"}}>{tour.tour[0].transport}</span>
                                                        <br/>
                                                        <span className="h5 text-left mb-4">Person Count </span> :<span
                                                        style={{fontWeight: "bold"}}>{tour.personCount}</span>
                                                        <br/>
                                                        <span className="h5 text-left mb-4">Full Cost</span> :<span
                                                        style={{fontWeight: "bold"}}>{tour.fullCost}</span>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            </div>
                                        )
                                    })
                                    : ''
                            }
                        </MDBRow>
                    </section>
                </MDBCol>
            </MDBRow>
        );
    }

}

