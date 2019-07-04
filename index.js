import React from 'react';
import { render } from 'react-dom';
import { Provider }from 'react-redux';
import store from './store';
import Homepage from '@container/Homepage';

const container = document.querySelector('#container');
render(
    <Provider store={store}>
        <Homepage />
    </Provider>
, container);
