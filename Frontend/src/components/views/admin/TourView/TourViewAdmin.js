import React, {Component} from 'react';
import {
    MDBCard,
    MDBCardBody, MDBCardHeader, MDBContainer,
    MDBTable, MDBTableBody, MDBTableHead
} from "mdbreact";
import "react-datepicker/dist/react-datepicker.css";
import {findalltours} from "../../../services/tour.service";

export class TourViewAdmin extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tourList: [],
            tourListStatus: false
        }
        this.getAllTours = this.getAllTours.bind(this);
        this.getAllTours();
    }

    getAllTours() {
        findalltours().then(res => {
            this.setState({
                tourList: res.data,
                tourListStatus: true
            })
        }).catch(error => console.error(error));
    }


    render() {
        return (
            <MDBContainer>
                <MDBCard className="mb-4">
                    <MDBCardHeader>
                        <p className="h2 text-left mb-4">Tour View</p>
                    </MDBCardHeader>
                    <MDBCardBody>
                        <MDBTable>
                            <MDBTableHead color="primary-color" textWhite>
                                <tr>
                                    <th>Place</th>
                                    <th>Duration</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Cost</th>
                                    <th>Transport</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    this.state.tourListStatus ?
                                        this.state.tourList.map(tour => {
                                            return (
                                                <tr>
                                                    <td>{tour.place}</td>
                                                    <td>{tour.duration}</td>
                                                    <td>{tour.startDate.substring(0, 10)}</td>
                                                    <td>{tour.endDate.substring(0, 10)}</td>
                                                    <td>{tour.cost}</td>
                                                    <td>{tour.transport}</td>
                                                </tr>
                                            )
                                        })
                                        : ''
                                }
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }

}

