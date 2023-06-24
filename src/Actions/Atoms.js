import { atom } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const localStorageEffect = key => async ({ setSelf, onSet }) => {
    const savedValue = await AsyncStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue))
    }
    onSet(async (newValue) => {
        await AsyncStorage.setItem(key, JSON.stringify(newValue))
    })
}

export const loadingState = atom({
    key: 'loadingState',
    default: {
        status: false,
        type: ""
    }
});

export const authState = atom({
    key: 'authState',
    default: null,
    effects: [
        localStorageEffect('authData'),
    ]
});

export const forgotState = atom({
    key: 'forgotState',
    default: {}
});

export const fcmTokenState = atom({
    key: 'fcmTokenState',
    default: null,
    effects: [
        localStorageEffect('fcmToken'),
    ]
});

export const profileState = atom({
    key: 'profileState',
    default: {}
});

export const messageState = atom({
    key: 'messageState',
    default: {
        type: "",
        status: false,
        message: ""
    },
});

export const testListState = atom({
    key: 'testListState',
    default: [],
});

export const testByIDState = atom({
    key: 'testByIDState',
    default: {},
});

export const appTourState = atom({
    key: 'appTourState',
    default: "add",
    effects: [
        localStorageEffect('appTour')
    ]
});
