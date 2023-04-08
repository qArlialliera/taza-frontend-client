/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// global.FormData = global.originalFormData ? global.originalFormData : global.FormData;
AppRegistry.registerComponent(appName, () => App);
