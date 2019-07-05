import { combineReducers } from 'redux';
import homepageState from './homepageState';

export interface Action {
    type: string,
    data?: any
}

const rootReducer = combineReducers({
    homepageState
});

export default rootReducer;
