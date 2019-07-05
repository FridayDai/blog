import { LOGIN } from "../action/loginDao";
import { Action } from './index';
import { LoginProps } from "../container/Login";

const initState: LoginProps = {
    'isLogin': false,
    'errMsg': ''
};

const homepageState = (state: LoginProps = initState, action: Action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                ...initState,
                'isLogin': action.data.code === 10000,
                'errMsg': action.data.msg ? action.data.msg : ''
            });
        default:
            return state;
    }
};

export default homepageState;
