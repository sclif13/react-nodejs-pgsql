import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Admin from './Admin';

const Status = ({ code, children }) => (
    <Route render={({ staticContext }) => {
        if (staticContext)
            staticContext.status = code
        return children
    }} />
)
const NotFound = () => (
    <Status code={404}>
        <div>
            <h1>404 Not Found</h1>
        </div>
    </Status>
)

export default (
    <Switch>
        <Route exact path='/' component={App}></Route>
        <Route path='/admin' component={Admin}></Route>
        <Route component={NotFound}></Route>
    </Switch>
)