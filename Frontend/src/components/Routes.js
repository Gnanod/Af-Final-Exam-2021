import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {TourAdd} from "./views/admin/TourAdd/TourAdd";
import {TourViewAdmin} from "./views/admin/TourView/TourViewAdmin";
import {Dashboard} from "./views/admin/Dashboard/Dashboard";
import Logout from "./views/LogOut/Logout";
import {BookTours} from "./views/customer/BookTour/BookTours";
import {ViewMyBookings} from "./views/customer/ViewBookTours/ViewMyBookings";

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/' exact component={Dashboard}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/touradd' component={TourAdd}/>
                <Route path='/tourviewadmin' component={TourViewAdmin}/>
                <Route path='/mybookings' component={ViewMyBookings}/>
                <Route path='/booktours' component={BookTours}/>
                <Route exact path='/logout' component={Logout}/>

            </Switch>
        );
    }
}

export default Routes;
