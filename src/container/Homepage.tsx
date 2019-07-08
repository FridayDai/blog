import * as React from 'react';
import { Route, Link, Switch, withRouter } from "react-router-dom";
import Login from './Login';
import Test from './Test';
import { connect } from 'react-redux';

let defaultPrefix = 'homepage-container';

const Bind = (Component, mapStateToProps = (state) => state) => {
    return withRouter(connect(mapStateToProps)(Component));
};

class Homepage extends React.Component<any, {}> {
    constructor(props) {
        super(props);
    }

    render () {
        return(
            <div className={defaultPrefix}>
                <Switch>
                    <Route exact path='/' component={Bind(Login)} />
                    <Route exact path='/login' component={Bind(Login)} />
                    <Route exact path='/test' component={Bind(Test)} />
                </Switch>
            </div>
        );
    }
}

export default Bind(Homepage);
