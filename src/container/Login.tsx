import React from 'react';
import classnames from 'classnames';
import { withRouter } from "react-router-dom";
import { StatefulInput } from 'baseui/input';
import { Button, KIND } from 'baseui/button';
import { login } from '../action/loginDao';
import '@style/login.less';

let defaultPrefix = 'login-container';

interface LoginState {
    username: string,
    password: string
}
export interface LoginProps {
    isLogin: boolean,
    errMsg: string
}

export default class Login extends React.Component<LoginProps, LoginState> {
    private login: React.ReactNode;

    constructor(props:any) {
        super(props);
        this.state = {
            'username': '',
            'password': ''
        };
    }

    getContainer = (node: React.ReactNode) => {
        this.login = node;
    };

    handleLogin = () => {
        const { username, password } = this.state;
        login(username, password);
    };

    renderSVG(type) {
        return (
            <svg className="icon" aria-hidden="true">
                <use xlinkHref={type}></use>
            </svg>
        );
    }

    renderComponent = () => {
        const prefix = classnames(defaultPrefix);
        return (
            <div ref={this.getContainer} className={prefix}>
                <div className={`${prefix}-content`}>
                    <div className={`${prefix}-content-item`}>
                        {this.renderSVG('#icon-snorlax')}
                    </div>
                    <div className={`${prefix}-content-item`}>
                        <StatefulInput
                            placeholder={'username'}
                            startEnhancer={this.renderSVG('#icon-superball')}
                            value={this.state.username}
                            onChange={(e) => {
                                this.setState({ 'username': e.currentTarget.value });
                            }}
                        />
                    </div>
                    <div className={`${prefix}-content-item`}>
                        <StatefulInput
                            type='password'
                            placeholder={'password'}
                            startEnhancer={this.renderSVG('#icon-ultra-ball')}
                            value={this.state.password}
                            onChange={(e) => {
                                this.setState({ 'password': e.currentTarget.value });
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            overrides={{ 'BaseButton': { 'style': { 'width': '100%' } }}}
                            kind={KIND.secondary}
                            onClick={this.handleLogin}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        return (<React.Fragment>{this.renderComponent()}</React.Fragment>);
    }
}
