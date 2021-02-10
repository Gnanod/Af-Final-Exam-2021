import React, {Component} from 'react';
import {
    MDBCard,
    MDBCardBody,MDBCardText, MDBContainer, MDBIcon
} from "mdbreact";
import {findalltours} from "../../../services/tour.service";

export class Dashboard extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tourList: [],
            tourListStatus: false,
            tourCount :0
        }
        this.getAllTours = this.getAllTours.bind(this);
        this.getAllTours();
    }

    getAllTours() {
        findalltours().then(res => {
            this.setState({
                tourList: res.data,
                tourListStatus: true,

            })
        }).catch(error => console.error(error));
    }

    render() {
        return (
            <MDBContainer>
                <MDBCard className="cascading-admin-card">
                    <div className="admin-up">
                        <MDBIcon icon="money-bill-alt" className="primary-color"/>
                        <div className="data">
                            <h3 className="h1 text-left mb-4">Total Tours</h3>
                            <h4>
                                <strong>{this.state.tourListStatus ?this.state.tourList.length :
                                    ''}</strong>
                            </h4>
                        </div>
                    </div>
                    {/*<MDBCardBody>*/}
                    {/*<div className="progress">*/}
                    {/*<div aria-valuemax="100" aria-valuemin="0" aria-valuenow={this.state.tourListStatus ?this.state.tourList.length : ''} className="progress-bar bg-primary" role="progressbar"*/}
                    {/*style={{width: this.state.tourListStatus ?this.state.tourList.length : ''}}></div>*/}
                    {/*</div>*/}
                    {/*</MDBCardBody>*/}
                </MDBCard>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <MDBCard className="cascading-admin-card">
                    <div className="admin-up">
                        <MDBIcon icon="chart-line" className="warning-color"/>
                        <div className="data">
                            <p>Total Bookings</p>
                            <h4>
                                <strong>$2000</strong>
                            </h4>
                        </div>
                    </div>
                    <MDBCardBody>
                        <div className="progress">
                            <div aria-valuemax="100" a
                                 ria-valuemin="0" aria-valuenow="25"
                                 className="progress-bar bg-primary" role="progressbar"
                                 style={{width: '25%'}}></div>
                        </div>
                        <MDBCardText>Better than last week (25%)</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }

}

