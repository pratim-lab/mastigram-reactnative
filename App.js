import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil'
import RecoilNexus from "recoil-nexus";
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigations from './src/Navigations';
import Colors from './src/Resources/Colors';
import 'react-native-gesture-handler';
import { NotificationListener, requestUserPermission } from './src/Resources/pushNotificationManager';
import { GothamBook, GothamLight, GothamMedium } from './src/assets/fonts/font';

const App = () => {

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
    requestUserPermission()
    NotificationListener()
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