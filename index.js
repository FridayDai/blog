import React from 'react';
import { render } from 'react-dom';
import { Provider }from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from "react-router-dom";
import Homepage from '@container/Homepage';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import '@style/index.less';

const engine = new Styletron();

const container = document.querySelector('#container');
render(
    <Provider store={store}>
        <Router>
            <StyletronProvider value={engine}>
                <BaseProvider theme={LightTheme}>
                    <Homepage />
                </BaseProvider>
            </StyletronProvider>
        </Router>
    </Provider>
, container);
