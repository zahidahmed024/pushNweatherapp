/**
 * @format
 */
import BackgroundFetch from "react-native-background-fetch";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

 /////tesing
let BackgroundFetchHeadlessTask = async (event) => {
    console.log('[BackgroundFetch HeadlessTask] start');
  
    let url = "http://tracker.transistorsoft.com/devices?company_token=transistor-rn";
    let response = await fetch(url);
    let json = await response.json();
    console.log('[BackgroundFetch] response: ', json);
  
    console.log('[BackgroundFetch HeadlessTask] finished');
  
    BackgroundFetch.finish();
  }
////testing ends
AppRegistry.registerComponent(appName, () => App);

BackgroundFetch.registerHeadlessTask(BackgroundFetchHeadlessTask)