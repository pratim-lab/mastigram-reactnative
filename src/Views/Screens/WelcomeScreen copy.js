import { View, Dimensions, TouchableOpacity, SafeAreaView, Image, StyleSheet, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Button, Text } from 'react-native-paper';
import { GothamBold, GothamBook } from '../../assets/fonts/font';
import Carousal from '../Components/Modules/Carousal';
import Colors from '../../Resources/Colors';

const WelcomeScreen = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const carouselItems = [
        {
            title1: "Take and log",
            title2: "Mastigram+ tests",
            text1: "Detect Gram-Positive",
            text2: "mastitis cases in the time",
            text3: "between milkings",
            image: require("../../Resources/Images/Slider/Onboarding1.png")
        },
        {
            title1: "Keep track of test",
            title2: "results and treatment",
            text1: "Use the results to",
            text2: "determine the best",
            text3: "treatment for every cow",
            image: require("../../Resources/Images/Slider/Onboarding2.png")
        },
        {
            title1: "Share test",
            title2: "results",
            text1: "Share test results with your",
            text2: "team and track your",
            text3: "mastitis cases in one place",
            image: require("../../Resources/Images/Slider/Onboarding3.png")
        }
    ]

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#000000',
            // justifyContent: "space-between"
        }}>
            <StatusBar backgroundColor={Colors.themeColor} barStyle="light-content" />
            <View style={{
                flex: 1
            }}>
                <View style={{
                    width: "100%",
                    height: windowHeight * .15,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    position: "relative"
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        style={{
                            borderRadius: 50,
                            borderColor: "#FFFFFF",
                            borderWidth: 1.5,
                            top: 15,
                            right: 15,
                            paddingHorizontal: 20,
                            paddingVertical: 5,
                            zIndex: 999,
                            position: "absolute",
                        }}>
                        <Text style={{
                            color: "#FFFFFF",
                            fontSize: 18,
                            fontWeight: "600"
                        }}>Skip</Text>
                    </TouchableOpacity>
                    <Text style={{
                        textAlign: "center",
                        color: "#FFFFFF",
                        fontSize: 38,
                        fontFamily: GothamBold,
                        fontWeight: "700"
                    }}>Mastigram+</Text>
                </View>
                <Carousal data={carouselItems} />
                <View style={{
                    height: windowHeight * .12,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Button
                        onPress={() => navigation.navigate("Login")}
                        mode="contained"
                        color="#F65C00"
                        contentStyle={{
                            height: 50,
                            alignSelf: "center"
                        }}
                        style={{
                            borderRadius: 50,
                            width: windowWidth * .7,
                        }}>Get Started</Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: "#FFFFFF",
        textAlign: "center",
        flexWrap: "wrap",
        fontSize: 29,
        fontFamily: GothamBook
    },
    subTitle: {
        color: "#FFFFFF",
        textAlign: "center",
        flexWrap: "wrap",
        fontSize: 18,
        fontFamily: GothamBook
    }
})

export default WelcomeScreen