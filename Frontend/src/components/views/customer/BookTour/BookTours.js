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
    MDBMask, MDBModal, MDBModalHeader,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBView
} from "mdbreact";
import "react-datepicker/dist/react-datepicker.css";
import {findalltours} from "../../../services/tour.service";
import * as Swal from "sweetalert2";
import {bookTour} from "../../../services/tour.book.service";
import Tour from "./Tour";

export class BookTours extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tourList: [],
            tourListStatus: false,
            modal: false,
            model2: false,
            personCount:1,
            personCost:0,
            cost:0,
            tourId :''
        }
        this.getAllTours = this.getAllTours.bind(this);
        this.getTour = this.getTour.bind(this);
        this.onChangePersonCount = this.onChangePersonCount.bind(this);
        this.submitBooking = this.submitBooking.bind(this);
        this.getAllTours();
    }

    componentDidMount() {
        if(localStorage.getItem("CustomerLogged")!=="CustomerLogged"){
            this.props.history.push('/');
        }
    }

    getAllTours() {
        findalltours().then(res => {
            this.setState({
                tourList: res.data,
                tourListStatus: true
            })
        }).catch(error => console.error(error));
    }

    onChangePersonCount(event) {
        this.setState({
            personCount: event.target.value,
            cost : this.state.personCost * event.target.value
        })
    }

    submitBooking(event){
        event.preventDefault();
        const tourBookDetails={
            user :localStorage.getItem("CustomerId"),
            tour :this.state.tourId
        }
        bookTour(tourBookDetails).then(res=>{
            if (res.data.success === 'successful') {
                this.setState({
                    cost :0,
                    personCount:1,
                    modal2 :false
                })
                Swal.fire(
                    '',
                    'Added Success',
                    'success'
                )
                this.props.history.push('/mybookings');

            } else {
                Swal.fire(
                    '',
                    'Added fail',
                    'error'
                )
            }
        }).catch(error => console.error(error));
    }


    getTour(data){
        this.setState({
            modal2: !this.state.model2,
            name :data.place,
            personCost:data.cost,
            cost:data.cost,
            tourId:data._id
        });
    }
    toggle3 = () => {
        this.setState({
            modal2: false,
        });
    }

    render() {
        return (
            <div>
                <MDBRow className="justify-content-center">
                    <MDBCol md="3" lg="9">
                        <section className="text-center pb-3">
                            <MDBRow className="d-flex justify-content-center">
                                {
                                    this.state.tourListStatus ?
                                        this.state.tourList.map(tour => {
                                            const base64String = btoa(new Uint8Array(tour.image.data.data).reduce(function (data, byte) {
                                                return data + String.fromCharCode(byte);
                                            }, ''));
                                            return (
                                                <div className="col-sm-4 cardMarginTop">
                                                    <MDBCard className="d-flex mb-5">
                                                        <MDBView>
                                                            <img
                                                                xl="5"
                                                                src={`data:image/jpeg;base64,${base64String}`}
                                                                alt="Project" className="img-fluid"/>
                                                            <MDBMask overlay="white-slight"/>
                                                        </MDBView>
                                                        <MDBCardBody>
                                                            <MDBCardTitle className="font-bold mb-3">
                                                                <strong>{tour.place}</strong>
                                                            </MDBCardTitle>
                                                            <MDBCardText>{tour.description}</MDBCardText>
                                                            <span className="h5 text-right mb-4">Duration</span> :<span
                                                            style={{fontWeight: "bold"}}>{tour.duration} Days</span>
                                                            <br/>
                                                            <span className="h5 text-left mb-4">Start Date</span> :<span
                                                            style={{fontWeight: "bold"}}>{tour.startDate.substring(0, 10)}</span>
                                                            <br/>
                                                            <span className="h5 text-left mb-4">End  Date</span> :<span
                                                            style={{fontWeight: "bold"}}> {tour.endDate.substring(0, 10)}</span>
                                                            <br/>
                                                            <span
                                                                className="h5 text-left mb-4">Cost(One Person)</span>: <span
                                                            style={{fontWeight: "bold"}}>RS:{tour.cost}</span>
                                                            <br/>
                                                            <span className="h5 text-left mb-4">Transport</span> :<span
                                                            style={{fontWeight: "bold"}}>{tour.transport}</span>
                                                        </MDBCardBody>
                                                        <MDBCardFooter className="links-light profile-card-footer">
                                                            <p>
                                                                <MDBBtn outline color="info" size="sm"
                                                                        onClick={()=>this.getTour(tour)} >
                                                                    Book Tour
                                                                </MDBBtn>
                                                            </p>
                                                        </MDBCardFooter>
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
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal2} toggle={this.toggle3}>
                        <MDBModalHeader toggle={this.toggle3}></MDBModalHeader>
                        <Tour
                            name ={this.state.name}
                            personCount ={this.state.personCount}
                            cost={this.state.cost}
                            onChangePersonCount={this.onChangePersonCount}
                            submitBooking={this.submitBooking}
                        />
                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}

