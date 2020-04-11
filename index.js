/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';

import configureStore from './src/reducer/index';

const store = configureStore();

const Redux = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Redux);
