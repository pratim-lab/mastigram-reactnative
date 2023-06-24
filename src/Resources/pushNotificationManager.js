import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { saveFCMTomen } from '../Actions/AuthActions';
import { getTestListAction } from '../Actions/TestActions';

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
        announcement: true
    });
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        console.log('FCM Authorization status:', authStatus) // you can remove the console.log later
    }
};

export const NotificationListener = (navigation) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        getTestListAction({
            result_type: "active"
        })
        console.log('Notification caused app to open from background state:', remoteMessage?.data?.test_id);
        // navigation.navigate("TestRecordTab", { screen: "LogResult", params: { id: remoteMessage?.data?.test_id } })
        navigation.navigate("TestRecordTab", { screen: "LogResult", params: { id: remoteMessage?.data?.test_id } })
    });

    messaging().getInitialNotification().then(remoteMessage => {
        if (remoteMessage) {
            console.log('Notification caused app to open from quit state:', remoteMessage.notification);
            navigation.navigate("TestRecordTab", { screen: "LogResult", params: { id: remoteMessage?.data?.test_id } })
        }
    });

    messaging().onMessage(async remotemessage => {
        console.log('remote message', JSON.stringify(remotemessage));
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });

};

export const saveToken = async () => {
    const token = await messaging().getToken();
    // console.log(token);
    // Alert.alert("Save Request", JSON.stringify(token))
    token && await saveFCMTomen({ deviceToken: token })
}