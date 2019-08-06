import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './src/reducer/index';

const enhancer = compose(applyMiddleware(thunk, createLogger));

const store = createStore(reducer, enhancer);

export const dispatch: Function = store.dispatch;

export default store;
