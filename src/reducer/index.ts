import { combineReducers } from 'redux';
import homepageState from './homepageState';

export interface Action {
    type: string,
    data?: any,
    progressValue?: number
}

const rootReducer = combineReducers({
    homepageState
});

export default rootReducer;
