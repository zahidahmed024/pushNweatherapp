import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import {Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from 'react-navigation';
import Cities from './components/Cities';
import Map from './components/Map';
import Testnotify from './components/Testnotify';
import Geolocation from '@react-native-community/geolocation';
import BackgroundFetch from 'react-native-background-fetch';
import firebase from 'react-native-firebase';
import {notificationManager} from './components/Notify';

const RootStack = createStackNavigator(
  {
    Cities: {
      screen: Cities,
    },
    Map: {
      screen: Map,
    },
  },
  {
    initialRouteName: 'Cities',
  },
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.localNotify = null;
    this.state = {
      temp: null,
    };
  }
  componentDidMount() {
    SplashScreen.hide();
    this.getlocation();
    /////////////////sorry... forgot to use any try catch block in async operations///
    // notifications
    this.localNotify = notificationManager;
    this.localNotify.configure(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
    //notification ends
    //////////////////////
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true, // Default
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
      },
      async taskId => {
        console.log('[js] Received background-fetch event: ', taskId);
        this.getlocation();
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.log('[js] RNBackgroundFetch failed to start');
      },
    );

    // Optional: Query the authorization status.
    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled');
          break;
      }
    });
  }
  onRegister(token) {
    console.log('register:', token);
  }
  onNotification(notify) {
    console.log('onnotification', notify);
  }
  onOpenNotification(notify) {
    console.log('onOpenNotification', notify);
    Alert.alert('open notification');
  }
  sendNotification = temp => {
    const options = {
      soundName: 'default',
      playload: true,
      vibrate: true,
    };
    this.localNotify.showNotification(
      1,
      'weather app',
      `current temperature ${temp}\u00b0c`,
      {},
      options,
    );
  };
  getlocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos.coords);
        this.getInfoByLocation(pos.coords.latitude, pos.coords.longitude);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  getInfoByLocation = async (latitude, longitude) => {
    let req = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&&appid=e384f9ac095b2109c751d95296f8ea76`,
    );
    let response = await req.json();
    console.log(response);
    // this.setState({temp: response.main.temp}, () => {
    this.sendNotification(response.main.temp);
    // console.log(this.state.temp);
    // });
  };

  render() {
    return <RootStack />;
  }
}
