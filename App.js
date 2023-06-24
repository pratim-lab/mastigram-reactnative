import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil'
import RecoilNexus from "recoil-nexus";
import SplashScreen from 'react-native-splash-screen'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigations from './src/Navigations';
import Colors from './src/Resources/Colors';
import 'react-native-gesture-handler';
import { NotificationListener, requestUserPermission } from './src/Resources/pushNotificationManager';
import { GothamBook, GothamLight, GothamMedium } from './src/assets/fonts/font';
import * as RootNavigation from './src/Navigations/RootNavigation';
import { Text, TextInput } from "react-native";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.

const App = () => {

  const navigation = RootNavigation

  const _fontConfig = {
    regular: {
      fontFamily: GothamBook,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: GothamMedium,
      fontWeight: 'normal',
    },
    light: {
      fontFamily: GothamLight,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: GothamLight,
      fontWeight: 'normal',
    },
  }

  const fontConfig = {
    ios: _fontConfig,
    android: _fontConfig
  };

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.themeColor,
      accent: Colors.themeColor,
      error: Colors.errorColor,
    },
    fonts: configureFonts({ config: fontConfig }),
  };

  useEffect(() => {
    SplashScreen.hide();
    requestUserPermission()
    NotificationListener(navigation)
  }, [])

  return (
    <RecoilRoot>
      <RecoilNexus />
      <PaperProvider theme={theme}>
        <Navigations />
      </PaperProvider>
    </RecoilRoot>
  );
}

export default App