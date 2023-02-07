import React from 'react'
import { TextInput } from 'react-native-paper'
import { GothamBook } from '../../../assets/fonts/font'

const TextFieldOutline = (props) => {
    const { label, value, onChangeText, error } = props
    return (
        <TextInput
            mode="outlined"
            label={label}
            value={value}
            onChangeText={onChangeText}
            theme={{
                roundness: 8,
                fonts: {
                    regular: {
                        fontFamily: GothamBook
                    }
                }
            }}
            error={error}
            style={{ backgroundColor: "#FFFFFF" }}
            {...props}
        />

    )
}

export default TextFieldOutline