import { View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound';

const WelcomeScreen = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <View
            style={{
                flex: 1,
            }}>
            <View style={{
                height: windowHeight * .7,
                flexl: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Text style={{
                    fontFamily: "Gotham-Medium",
                    fontSize: 50,
                    fontWeight: "bold",
                    marginTop: 120
                }}>Mastigram+</Text>
            </View>
            <View style={{
                height: windowHeight * .3,
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <ButtonSolidRound
                    title="Discover the platform"
                    contentStyle={{ width: windowWidth * .7, height: 50 }}
                    onPress={() => navigation.navigate('Signup')} />
                <TouchableOpacity
                    style={{ marginTop: 25 }}
                    onPress={() => navigation.navigate('Login')}>
                    <Text
                        style={{ fontFamily: "Gotham-Medium", fontSize: 16, fontWeight: "600" }}>
                        Have an account? <Text style={{ fontWeight: "900" }}>Log-in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WelcomeScreen