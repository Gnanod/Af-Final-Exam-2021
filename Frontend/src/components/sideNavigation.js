import React from 'react';
import logo from "../assets/sidebar.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush">
                {
                    localStorage.getItem("AdminLogged") === "AdminLogged" ?
                        <NavLink exact={true} to="/dashboard" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="chart-pie" className="mr-3"/>
                                Dashboard
                            </MDBListGroupItem>
                        </NavLink> : ''
                }

                {
                    localStorage.getItem("AdminLogged") === "AdminLogged" ?
                        <NavLink to="/touradd" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="table" className="mr-3"/>
                                Tour Add
                            </MDBListGroupItem>
                        </NavLink> : ''
                }

                {
                    localStorage.getItem("AdminLogged") === "AdminLogged" ?
                        <NavLink to="/tourviewadmin" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="map" className="mr-3"/>
                                Tour View
                            </MDBListGroupItem>
                        </NavLink> : ''
                }
                {
                    localStorage.getItem("CustomerLogged") === "CustomerLogged" ?
                        <NavLink to="/mybookings" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="map" className="mr-3"/>
                                My Bookings
                            </MDBListGroupItem>
                        </NavLink>: ''
                }

                {
                    localStorage.getItem("CustomerLogged") === "CustomerLogged" ?
                        <NavLink to="/booktours" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon icon="table" className="mr-3"/>
                                Book Tours
                            </MDBListGroupItem>
                        </NavLink>: ''
                }

                <NavLink to="/logout" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="sign-out-alt" className="mr-3"/>
                        LogOut
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;