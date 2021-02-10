import React, {Component} from 'react';
import './TourAddCss.css'
import {
    MDBAlert,
    MDBBtn,
    MDBCard,
    MDBCardBody, MDBCardHeader, MDBCardImage, MDBCol, MDBContainer,
    MDBRow
} from "mdbreact";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Swal from "sweetalert2";
import {saveTour} from "../../../services/tour.service";

export class TourAdd extends Component {


    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            startDateString: '',
            endDate: new Date(),
            endDateString: '',
            place: '',
            duration: '',
            transport: 'Bus',
            cost: '',
            description: '',
            imageName: '',
            imageURLValidation: false,
            imageValidation: false,
            image: '',
            imageUrl: '',
            dateValidation: false
        };
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.setPlace = this.setPlace.bind(this);
        this.setDuration = this.setDuration.bind(this);
        this.setTransport = this.setTransport.bind(this);
        this.setCost = this.setCost.bind(this);
        this.getDifferenceInDays = this.getDifferenceInDays.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.onchangeFile = this.onchangeFile.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
    }


    setStartDate = date => {
        this.setState({
            startDate: date,
        });
    }
    setEndDate = date => {
        this.setState({
            endDate: date,
        });
    }
    setPlace = place => {
        this.setState({
            place: place.target.value
        });
    }

    setDuration = duration => {
        this.setState({
            duration: duration.target.value
        });
    }
    setTransport = transport => {
        this.setState({
            transport: transport.target.value
        });
    }
    setCost = cost => {
        this.setState({
            cost: cost.target.value
        });
    }

    setDescription = description => {
        this.setState({
            description: description.target.value
        });
    }

    getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return (diffInMs / (1000 * 60 * 60 * 24)).toFixed();
    }

    onchangeFile(e) {

        // if (URL.createObjectURL(e.target.files[0]) !== ' ') {
        if (e.target.files.length) {
            this.setState({
                image: e.target.files[0],
                imageUrl: URL.createObjectURL(e.target.files[0]),
                imageURLValidation: true,
                imageValidation: false,
                imageName: e.target.files[0].name
            });
        }
        // }
    }

    removePhoto() {
        this.setState({
            image: ' ',
            imageUrl: ' ',
            imageURLValidation: false,
            imageValidation: false,
            imageName: ' '
        })

    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        // var startDate = new Date(this.state.startDate);
        // var endDate = new Date(this.state.endDate);
        // if (endDate > startDate) {
            let formData = new FormData();
            formData.append('image', this.state.image);
            formData.append('place', this.state.place);
            formData.append('startDate', this.state.startDate);
            formData.append('endDate', this.state.endDate);
            formData.append('duration', this.getDifferenceInDays(this.state.endDate, this.state.startDate));
            formData.append('cost', this.state.cost);
            formData.append('transport', this.state.transport);
            formData.append('description', this.state.description);
            saveTour(formData).then(res => {
                if (res.data.success === 'successful') {
                    this.setState({
                        place: '',
                        duration: '',
                        cost: '',
                        email: '',
                        transport: 'Bus',
                        dateValidation: false,
                        startDate: new Date(),
                        endDate: new Date(),
                    })
                    Swal.fire(
                        '',
                        'Added Success',
                        'success'
                    )
                    this.props.history.push('/tourviewadmin');

                } else {
                    Swal.fire(
                        '',
                        'Added fail',
                        'error'
                    )
                }
            }).catch(error => console.error(error));
        // } else {
        //     this.setState({
        //         dateValidation: true
        //     })
        //     console.log(this.state.dateValidation)
        // }
    };

    render() {
        return (
            <MDBContainer>
                <MDBCard className="mb-4">
                    <MDBCardHeader>
                        <p className="h2 text-left mb-4">Tour Add</p>
                    </MDBCardHeader>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md="6">
                                <form className="needs-validation"
                                      onSubmit={this.submitHandler}
                                      noValidate>
                                    <label htmlFor="place" className="grey-text">
                                        Place
                                    </label>
                                    <input type="text"
                                           id="place"
                                           value={this.state.place}
                                           className="form-control"
                                           onChange={place => this.setPlace(place)}
                                           required/>
                                    <div className="invalid-feedback">Please provide Place.</div>
                                    <br/>
                                    <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                                        Description
                                    </label>
                                    <textarea type="text"
                                              id="defaultFormContactMessageEx"
                                              value={this.state.description}
                                              className="form-control"
                                              onChange={description => this.setDescription(description)}
                                              rows="3"
                                              required
                                    />
                                    <div className="invalid-feedback">Please provide Description.</div>

                                    <br/>
                                    <label htmlFor="StartDate" className="grey-text">
                                        Start Date
                                    </label>
                                    <label htmlFor="EndDate" className="grey-text" style={{marginLeft: 160}}>
                                        End Date
                                    </label>
                                    <br/>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        value={this.state.startDate}
                                        className="form-control" required
                                        onChange={date => this.setStartDate(date)}/>
                                    <label style={{marginLeft: 10}}> </label>
                                    <DatePicker
                                        selected={this.state.endDate}
                                        value={this.state.endDate}
                                        className="form-control" required
                                        onChange={date => this.setEndDate(date)}/>
                                    {/*{this.state.dateValidation ?*/}
                                        {/*<div className="invalid-feedback">Start Date Should be Smaller than End*/}
                                            {/*Date</div>*/}
                                        {/*: ''*/}
                                    {/*}*/}
                                    <br/>
                                    <br/>
                                    <label htmlFor="Cost" className="grey-text">
                                        Cost(1 Person)
                                    </label>
                                    <input
                                        type="number"
                                        id="Cost"
                                        className="form-control"
                                        value={this.state.cost}
                                        onChange={cost => this.setCost(cost)}
                                        required/>
                                    <div className="invalid-feedback">Please provide Cost.</div>
                                    <br/>
                                    <label htmlFor="Transport" className="grey-text">
                                        Transport
                                    </label>
                                    <select
                                        className="browser-default custom-select"
                                        value={this.state.transport}
                                        onChange={transport => this.setTransport(transport)}>
                                        >
                                        <option value="Bus">Bus</option>
                                        <option value="Train">Train</option>
                                    </select>
                                    <br/>
                                    <br/>
                                    <MDBRow>
                                        <MDBCol size="4">
                                            {
                                                this.state.imageURLValidation ?
                                                    <MDBCol style={{maxWidth: "14rem"}}>
                                                        <MDBCard>
                                                            <MDBCardImage className="img-fluid "
                                                                          src={this.state.imageUrl}
                                                                          waves/>
                                                        </MDBCard>
                                                    </MDBCol>

                                                    : ''
                                            }

                                            {
                                                this.state.imageURLValidation ?
                                                    <button className="btnClass"
                                                            onClick={this.removePhoto}>Remove</button> : ''
                                            }

                                        </MDBCol>

                                    </MDBRow>
                                    <br/>
                                    <MDBRow>
                                        <MDBCol size="9">

                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="inputGroupFileAddon01">
                                                              Upload
                                                    </span>
                                                </div>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        className="custom-file-input"
                                                        id="inputGroupFile01"
                                                        aria-describedby="inputGroupFileAddon01"
                                                        onChange={this.onchangeFile}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">Please Insert Image</div>
                                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                        {this.state.imageName}
                                                    </label>
                                                </div>
                                            </div>
                                        </MDBCol>

                                    </MDBRow>

                                    <div className="text-center mt-4">
                                        <MDBBtn color="unique" type="submit">
                                            Save
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }

}

