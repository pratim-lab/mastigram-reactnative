import React from 'react'
import { Button } from 'react-native-paper'
import { GothamBook } from '../../../assets/fonts/font'

const ButtonSolidRound = (props) => {
    const { onPress, title } = props
    return (
        <Button
            mode='contained'
            uppercase={false}
            style={{
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                elevation: 0
            }}
            labelStyle={{
                fontSize: 16,
                fontWeight: "700",
                fontFamily: GothamBook
            }}
            onPress={onPress}
            {...props}>{title}</Button>
    )
}

export default ButtonSolidRound