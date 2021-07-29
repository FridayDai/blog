import React from 'react';
import classnames from 'classnames';
import { withRouter } from "react-router-dom";
import { StatefulInput } from 'baseui/input';
import { Button, KIND } from 'baseui/button';
import { login } from '../action/loginDao';
import '@style/login.less';
import { toast } from 'react-component-dy';
import { connect } from 'react-redux';
import { record, Replayer, getReplayConsolePlugin, getRecordConsolePlugin } from 'rrweb';

let defaultPrefix = 'login-container';

interface LoginState {
    username: string,
    password: string,
    event: []
}
export interface LoginObject {
    progressValue: number
}

export interface LoginProps {
    homepageState: LoginObject,
    history?: any
}

const events = [];
let stopFn = record({
    emit(event) {
        // const defaultLog = console.log["__rrweb_original__"] ? console.log["__rrweb_original__"] : console.log;
        // defaultLog(event);
        // @ts-ignore
        events.push(event);
    },
    plugins: [getRecordConsolePlugin()],
});

class Login extends React.Component<LoginProps, LoginState> {
    private login: React.ReactNode;

    constructor(props:any) {
        super(props);
        this.state = {
            'username': '',
            'password': '',
            'event': []
        };
        this.pressEnter = this.pressEnter.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keypress', this.pressEnter);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.pressEnter);
    }

    pressEnter(e) {
        if(e.keyCode === 13) {
            this.handleLogin();
        }
    }

    getContainer = (node: React.ReactNode) => {
        this.login = node;
    };

    handleReplay = () => {
        console.log(events);
        const replayer = new Replayer(events, {
            plugins: [
                // @ts-ignore
                getReplayConsolePlugin({level: ['info', 'log', 'warn', 'error']}),
            ],
        });
        replayer.play();
    }

    handleLogin = async() => {
        console.log('lalalalal');

        const { history } = this.props;
        const { username, password } = this.state;

        if(!username) {
            toast.error('请填写用户名');
            return;
        }
        if(!password) {
            toast.error('请填写密码');
            return;
        }

        const res = await login(username, password);
        if(res.status === 200) {
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('readOnly', res.data.readOnly);
            setTimeout(() => history.push('/doc'), 0);
        } else {
            toast.error(res.msg);
        }
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
                    <div>
                        <Button
                            overrides={{ 'BaseButton': { 'style': { 'width': '100%' } }}}
                            kind={KIND.tertiary}
                            onClick={this.handleReplay}
                        >
                            停止录制
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

const Bind = (Component, mapStateToProps = (state) => state) => {
    return withRouter(connect(mapStateToProps)(Component));
};

export default Bind(Login);
