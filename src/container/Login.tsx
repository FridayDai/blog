import React from 'react';
import classnames from 'classnames';
import { withRouter } from "react-router-dom";
import { StatefulInput } from 'baseui/input';
import { Button, KIND } from 'baseui/button';
import '@style/login.less';

let defualtPrefix = 'login-container';

interface LoginState {
    username: string,
    password: string
}

class Login extends React.Component<any, LoginState> {
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
        console.log(username, password);
    };

    test = () => {
        /* tslint:disable-next-line */
        return ;
    };

    renderComponent = () => {
        const prefix = classnames(defualtPrefix);
        return (
            <div ref={this.getContainer} className={prefix}>
                <div className={`${prefix}-content`}>
                    <div className={`${prefix}-content-item`}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-snorlax"></use>
                        </svg>
                    </div>
                    <div className={`${prefix}-content-item`}>
                        <StatefulInput
                            placeholder={'username'}
                            startEnhancer={
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-superball"></use>
                                </svg>
                            }
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
                            startEnhancer={
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-ultra-ball"></use>
                                </svg>
                            }
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

export default withRouter(Login);
