import * as React from 'react';
import { Route, Link, Switch } from "react-router-dom";
import Login from './Login';

let defaultPrefix = 'homepage-container';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <div className={defaultPrefix}>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </div>
        );
    }
}
