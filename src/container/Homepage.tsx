import * as React from 'react';
import Loadable from 'react-loadable';
import { Route, Link, Switch, withRouter } from "react-router-dom";
import { Loading } from './Loading';
import '../../LearnAllLife/React/react';

const Login = Loadable({
    'loader': () => import('./Login'),
    'loading': Loading
});

const Write = Loadable({
    'loader': () => import('./Write'),
    'loading': Loading
});

const Doc = Loadable({
    'loader': () => import('./Doc'),
    'loading': Loading
});
const Test = Loadable({
    'loader': () => import('../../LearnAllLife/css/HOC'),
    'loading': Loading
});

// import Login from './Login';
// import Write from './Write';
// import Doc from './Doc';
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
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/write' component={Write} />
                    <Route exact path='/doc' component={Doc} />
                    <Route exact path='/test' component={Test} />
                </Switch>
            </div>
        );
    }
}

export default Bind(Homepage);
