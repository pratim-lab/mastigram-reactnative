import React from 'react'
import { TextInput } from 'react-native-paper';
import { RobotoRegular } from '../../../assets/fonts/font';

const TextField = (props) => {
    const { onChangeText, value, label, error } = props
    return (
        <TextInput
            mode="outlined"
            label={label}
            value={value}
            onChangeText={onChangeText}
            theme={{ roundness: 8 }}
            error={error}
            style={{
                fontFamily: RobotoRegular,
                backgroundColor: "#FFFFFF",
                height: 45,
                marginBottom: 10,
                width: "100%",
                padding: 0,
                textAlignVertical: "top"
                // textAlignVertical: "center"
                // position: "relative"
            }}
            conta
            {...props}
        />
    )
}

export default TextField