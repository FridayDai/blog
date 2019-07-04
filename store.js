import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from '@reducer/index';

const enhancer = compose(applyMiddleware(thunk, createLogger));

const store = createStore(reducer, enhancer);

export const { dispatch } = store;

export default store;
