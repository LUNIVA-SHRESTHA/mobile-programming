/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  'This method is deprecated',
  'EventEmitter.removeListener',
  'new NativeEventEmitter',
  'Sending `onAnimatedValueUpdate`',
]);

AppRegistry.registerComponent(appName, () => App);
