import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/';
import Dashboard from './pages/Dashboard/';
import Registration from './pages/Registration/';
import EventsPage from './pages/EventsPage/';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/login' exact component={Login} />
                <Route path='/registration' exact component={Registration} />
                <Route path='/events' component={EventsPage} />
            </Switch>
        </BrowserRouter>
    );
}