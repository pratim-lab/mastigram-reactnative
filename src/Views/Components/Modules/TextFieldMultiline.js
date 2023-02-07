import React from 'react'
import { TextInput } from 'react-native-paper'

const TextFieldMultiline = (props) => {
    const { label, value, onChangeText, error } = props
    return (
        <TextInput
            mode="outlined"
            label={label}
            value={value}
            onChangeText={onChangeText}
            theme={{ roundness: 8 }}
            error={error}
            style={{ backgroundColor: "#FFFFFF", height: 120, textAlignVertical: "top" }}
            {...props}
        />

    )
}

export default TextFieldMultiline