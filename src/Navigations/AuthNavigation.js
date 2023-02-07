import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import LoginScreen from '../Views/Screens/LoginScreen';
// import WelcomeScreen from '../Views/Screens/WelcomeScreen';
import SignupScreen from '../Views/Screens/SignupScreen';
import ForgotPassword from '../Views/Screens/ForgotPassword';

const AuthNavigator = () => {
   const Stack = createNativeStackNavigator();
   return (
      <View style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="#000000" />
         <Stack.Navigator
            screenOptions={{
               initialRouteName: "Login",
               headerShown: false,
               gestureEnabled: true,
               gestureDirection: "horizontal",
               ...TransitionPresets.SlideFromRightIOS
            }}>
            {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
         </Stack.Navigator>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
})

export default AuthNavigator