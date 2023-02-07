import { View, Text, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import Main from '../Components/Main';
import { GothamBook } from '../../assets/fonts/font';

const windowWidth = Dimensions.get('window').width;

const ExportSuccess = ({ navigation }) => {
    return (
        <Main>
            <StatusBar translucent backgroundColor={"#FFFFFF"} barStyle="dark-content" />
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: "700",
                    textAlign: "center",
                    fontFamily: GothamBook
                }}>Test records have</Text>
                <Text style={{
                    fontSize: 30,
                    fontWeight: "700",
                    textAlign: "center",
                    fontFamily: GothamBook
                }}>been sent</Text>
                <View style={{ width: windowWidth * .5, marginTop: 20 }}>
                    <ButtonSolidRound
                        title="Return Home"
                        onPress={() => navigation.navigate("TestRecordTab")}
                        contentStyle={{ height: 55, width: windowWidth * .5 }}
                        labelStyle={{ fontSize: 18, fontWeight: "700" }} />
                </View>
            </View>
        </Main>
    )
}

export default ExportSuccess