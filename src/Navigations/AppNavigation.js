import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AppHeader from '../Views/Components/AppHeader';
// import HomeScreen from '../Views/Screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestRecords from '../Views/Screens/TestRecords';
import ExportScreen from '../Views/Screens/ExportScreen';
import SettingsScreen from '../Views/Screens/SettingsScreen';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogTest from '../Views/Screens/LogTest';
import LogResult from '../Views/Screens/LogResult';
import TestDetails from '../Views/Screens/TestDetails';
import PedingTest from '../Views/Screens/PedingTest';
import ExportSuccess from '../Views/Screens/ExportSuccess';
import { appTourState } from '../Actions/Atoms';
import { useRecoilState } from 'recoil';
import AppTooltrip from '../Views/Components/Modules/AppTooltrip';

const Stack = createNativeStackNavigator();

const TestRecordTab = () => {
    return (
        <Stack.Navigator
            initialRouteName="TestRecords"
            headerMode="screen"
            screenOptions={{
                headerShown: false,
                // header: ({ scene, previous, navigation }) => (
                //     <AppHeader scene={scene} previous={previous} navigation={navigation} />
                // )
            }}>
            <Stack.Screen name="TestRecords" component={TestRecords} options={{ headerTitle: "Test Records" }} />
            <Stack.Screen name="LogTest" component={LogTest} options={{ headerTitle: "Log a Test" }} />
            <Stack.Screen name="LogResult" component={LogResult} options={{ headerTitle: "Log Result" }} />
            <Stack.Screen name="TestDetails" component={TestDetails} options={{ headerTitle: "Log Result" }} />
            <Stack.Screen name="PendingTest" component={PedingTest} options={{ headerTitle: "Peding Test" }} />
        </Stack.Navigator>
    )
}

const ExportTab = () => {
    return (
        <Stack.Navigator
            initialRouteName="Export"
            headerMode="screen"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Export" component={ExportScreen} options={{ headerTitle: "Export Records" }} />
            <Stack.Screen name="ExportSuccess" component={ExportSuccess} options={{ headerTitle: "Export Success" }} />
        </Stack.Navigator>
    )
}

const SettingsTab = () => {
    return (
        <Stack.Navigator
            initialRouteName="Settings"
            headerMode="screen"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: "Settings" }} />
        </Stack.Navigator>
    )
}


const Tab = createBottomTabNavigator();

export default function AppNavigation() {

    const [appTour, setAppTour] = useRecoilState(appTourState)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: "#4c4c4c",
                tabBarActiveTintColor: '#000000',
                tabBarLabelStyle: { fontSize: 12 },
                unmountOnBlur: true
            }}>
            <Tab.Screen
                name="TestRecordTab"
                component={TestRecordTab}
                options={{
                    tabBarLabel: "Tests",
                    tabBarIcon: ({ color, size, focused }) => focused ?
                        <Ionicons name="md-list-circle-sharp" color={color} size={32} /> :
                        <Ionicons name="md-list-circle-outline" color={color} size={32} />
                }} />
            <Tab.Screen
                name="ExportTab"
                component={ExportTab}
                options={{
                    tabBarLabel: "Export",
                    tabBarIcon: ({ color, size, focused }) => focused ?
                        <Ionicons name="share-sharp" color={color} size={30} /> :
                        <AppTooltrip isVisible={appTour === "export"}>
                            <Ionicons name="share-outline" color={color} size={30} />
                        </AppTooltrip>
                }} />
            <Tab.Screen
                name="SettingsTab"
                component={SettingsTab}
                options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size, focused }) => focused ?
                        <Ionicons name="ios-settings-sharp" color={color} size={size} /> :
                        <Ionicons name="ios-settings-outline" color={color} size={size} />,
                }} />
        </Tab.Navigator>
    );
}