import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from '../Resources/Colors';
import AuthNavigator from './AuthNavigation';
import AppNavigation from './AppNavigation';
import { useRecoilValue } from 'recoil';
import { authState } from '../Actions/Atoms';

const RootNavigation = () => {

    const authData = useRecoilValue(authState)
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={Colors.themeColor} barStyle="dark-content" />
            <Stack.Navigator
                initialRouteName="AuthNavigator"
                screenOptions={{
                    headerShown: false
                }}>
                {authData?.token ?
                    <Stack.Screen name="AppNavigation" component={AppNavigation} /> :
                    <Stack.Screen name="AuthNavigator" component={AuthNavigator} />}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation