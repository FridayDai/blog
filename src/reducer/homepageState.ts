import { AJAX_PROGREESS } from "../action/loginDao";
import { Action } from './index';
import { LoginObject } from "../container/Login";

const initState: LoginObject = {
    'progressValue': 0
};

const homepageState = (state: LoginObject = initState, action: Action) => {
    switch (action.type) {
        case AJAX_PROGREESS:
            return Object.assign({}, state, {
                ...initState,
                'progressValue': action.progressValue
            });
        default:
            return state;
    }
};

export default homepageState;
