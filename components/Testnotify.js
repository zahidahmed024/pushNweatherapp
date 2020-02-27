import React, { Component } from 'react';
import { View, Text, Alert,Button } from 'react-native';
import { notificationManager } from './Notify';

export default class Testnotify extends Component {
  constructor(props) {
    super(props);
    this.localNotify=null
    this.state = {
    };
  }
componentDidMount(){
    this.localNotify= notificationManager;
    this.localNotify.configure(this.onRegister,this.onNotification,this.onOpenNotification)
}
onRegister(token){
    console.log("register:",token)
}
onNotification(notify){
console.log("onnotification",notify)
}
onOpenNotification(notify){
    console.log("onOpenNotification",notify)
    Alert.alert("open notification")
}
sendNotification=()=>{
    const options={
        soundName:'default',
        playload:true,
        vibrate:true
    }
    this.localNotify.showNotification(
      1,
      "weather app",
      "local notification",
      {},
      options
    )
}
  render() {
    return (
      <View>
        <Button
        title="onpress"
        onPress={this.sendNotification}
        />
      </View>
    );
  }
}
