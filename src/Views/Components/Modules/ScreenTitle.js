import { View, Text } from 'react-native'
import React from 'react'
import { GothamBook } from '../../../assets/fonts/font'

const ScreenTitle = ({children, color}) => {
    return (
        <View>
            <Text style={{
                fontFamily: GothamBook,
                fontSize: 18,
                color: color ? color : "#000000"
            }}>{children}</Text>
        </View>
    )
}

export default ScreenTitle