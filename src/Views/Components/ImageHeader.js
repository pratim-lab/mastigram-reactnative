import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import { Image } from 'react-native'
import { GothamBook } from '../../assets/fonts/font'
import { Dimensions } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const windowWidth = Dimensions.get('window').width;

const ImageHeader = (props) => {
    const { source, subText, text, backgroundColor, iconColor } = props
    const navigation = useNavigation();
    return (
        <View>
            <StatusBar translucent backgroundColor={backgroundColor ? backgroundColor : "#000000"} barStyle="light-content" />
            <View style={{
                position: "relative",
                backgroundColor: backgroundColor ? backgroundColor : "#000000",
                height: 180,
                marginHorizontal: -15,
            }}>
                <IconButton
                    onPress={() => navigation.goBack()}
                    icon="chevron-left-circle"
                    color={iconColor ? iconColor : 'rgba(208, 208, 208, 1)'}
                    size={35}
                    style={{
                        position: "absolute",
                        top: 30,
                        left: 0,
                        zIndex: 999,
                    }} />
                <Image
                    source={source}
                    style={{
                        width: windowWidth,
                        height: 200,
                        resizeMode: "contain",
                        position: "absolute",
                        zIndex: 998,
                        bottom: -26
                    }} />
                <View style={{
                    position: "absolute",
                    zIndex: 999,
                    left: 20,
                    bottom: 20
                }}>
                    {subText &&
                        <Text style={{
                            color: "#FFFFFF",
                            fontSize: 14,
                            fontFamily: GothamBook,
                            fontWeight: "600",
                            marginBottom: 5
                        }}>{subText}</Text>}
                    <Text style={{
                        color: "#FFFFFF",
                        fontSize: 23,
                        fontFamily: GothamBook,
                        fontWeight: "700"
                    }}>{text}</Text>
                </View>
            </View>
        </View>
    )
}

export default ImageHeader