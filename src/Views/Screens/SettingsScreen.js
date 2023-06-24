import { View, Text, Dimensions, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import Main from '../Components/Main'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authState, fcmTokenState, profileState } from '../../Actions/Atoms'
import { saveProfileAction } from '../../Actions/AuthActions'
import { GothamBook } from '../../assets/fonts/font'

const SettingsScreen = () => {

  const windowWidth = Dimensions.get('window').width;
  const logout = useResetRecoilState(authState)
  const profileData = useRecoilValue(profileState)
  const resetFcmToken = useResetRecoilState(fcmTokenState)

  const handleLogout = async () => {
    logout()
    await AsyncStorage.getAllKeys()
      .then(async (keys) => {
        await AsyncStorage.multiRemove(keys);
        resetFcmToken()
      })
      .then(() => {

      });
  }

  return (
    <Main>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor={"#FFFFFF"} barStyle="dark-content" />
        <View style={{
          flex: 1,
          marginHorizontal: -15,
          marginVertical: -15,
          backgroundColor: "#FFFFFF"
        }}>
          <View style={{
            width: "100%",
            paddingHorizontal: 15,
            marginTop: 30,
            flex: 1,
          }}>
            <Text style={{ fontSize: 15, fontWeight: "500", fontFamily: GothamBook }}>APP SETTINGS</Text>
            <View style={{
              marginTop: 25
            }}>
              <Text style={{ fontWeight: "500", fontSize: 18, fontFamily: GothamBook }}>Alerts</Text>
              <Text style={{ fontSize: 14, marginTop: 10, fontFamily: GothamBook }}>Choose how many hours you want to be notified after taking a test to view results.</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
              <View style={{ marginRight: 10 }}>
                <ButtonSolidRound
                  mode="outlined"
                  title="7 hours"
                  onPress={() => {
                    saveProfileAction({
                      alert_hour: 7
                    })
                  }}
                  contentStyle={{
                    width: 125,
                    height: 40,
                    borderWidth: 1,
                    borderColor: profileData?.alert_hour === 7 ? "rgba(246, 92, 0, 1)" : "#D0D0D0",
                    borderRadius: 50,
                  }}
                  labelStyle={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: profileData?.alert_hour === 7 ? "rgba(246, 92, 0, 1)" : "#000000"
                  }} />
              </View>
              <View style={{ marginLeft: 10 }}>
                <ButtonSolidRound
                  title="8 hours"
                  mode="outlined"
                  onPress={() => {
                    saveProfileAction({
                      alert_hour: 8
                    })
                  }}
                  contentStyle={{
                    width: 125,
                    height: 40,
                    borderWidth: 1,
                    borderColor: profileData?.alert_hour === 8 ? "rgba(246, 92, 0, 1)" : "#D0D0D0",
                    borderRadius: 50,
                  }}
                  labelStyle={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: profileData?.alert_hour === 8 ? "rgba(246, 92, 0, 1)" : "#000000"
                  }} />
              </View>
            </View>
          </View>
        </View>
        <View>
          <ButtonSolidRound
            title="Logout"
            onPress={handleLogout}
            contentStyle={{ width: windowWidth, height: 55 }}
          />
        </View>
      </SafeAreaView>
    </Main>
  )
}

export default SettingsScreen