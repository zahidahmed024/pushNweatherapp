import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

class NotificationManager{
   configure=(onRegister,onNotification,onOpenNotification)=>{
       PushNotification.configure({
           onRegister:function(token){
              onRegister(token)
               console.log("on register token",token)
           },
           onNotification:function(notification){
               console.log("on notification",notification);

               if (Platform.OS=='ios') {
                   if (notification.data.openedInForeground) {
                       notification.userInteraction=true
                   }
                }else{
                    notification.userInteraction=true
                   }
                   if(notification.userInteraction){
                      onOpenNotification(notification)     
                   }else{
                     onNotification(notification)
                   }
               
            }
       })
   }
  _builAndroidNotification=(id,title,message,data={},options={})=>{
      return{
          id:id,
          autoCancel:true,
          largeIcon:options.largeIcon||"ic_launcher",
          smallIcon:options.smallIcon||"ic_launcher",
          bigtext:message||'',
          subtext:title||'',
          vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            priority: "high", // (optional) set notification priority, default: high
            importance: "high",
              data:data
      }
  }
  showNotification=(id,title,message,data={},options={})=>{
      PushNotification.localNotification({
        ...this._builAndroidNotification(id,title,message,data,options),
        title:title||"",
        message:message||'',
        playSound:options.playSound||false,
        soundName:options.soundName||'default',
        userInteraction:false,
        repeatType:"time",
        repeatTime:40000
      })
  }
  cancelAllNotification=()=>{
      if(Platform.OS=='android'){
          PushNotification.cancelAllLocalNotifications();
      }
  }
  unregister=()=>{
      PushNotification.unregister();
  }
}
export const notificationManager= new NotificationManager()