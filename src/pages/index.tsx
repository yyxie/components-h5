import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Home from './Home';
import Success from './Success';
import AuthFailOne from './AuthFailOne';
import AuthFailMore from './AuthFailMore';

export default function () {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/success">
                    <Success />
                </Route>
                <Route path="/auth-fail-one">
                    <AuthFailOne />
                </Route>
                <Route path="/auth-fail-more">
                    <AuthFailMore />
                </Route>
            </Switch>
        </Router>
    )
};
