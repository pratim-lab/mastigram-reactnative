import React from 'react'
import { TextInput, View } from 'react-native'
import { Text } from 'react-native-paper'
import { GothamBook } from '../../../assets/fonts/font'
// import { TextInput } from 'react-native-paper';

const TextField = (props) => {
    const { onChangeText, value, label, error } = props
    return (
        <View style={{ width: "100%" }}>
            <TextInput
                // label={label}
                value={value}
                onChangeText={onChangeText}
                placeholder={label}
                style={{ width: "100%", height: 50, borderRadius: 5, backgroundColor: "#FBEEFF", paddingLeft: 15, paddingRight: 15 }}
                // outlineStyle={{ borderRadius: 50, opacity: 0 }}
                // underlineStyle={{ borderRadius: 50 }}
                placeholderTextColor="#676767"
                mode="outlined"
                {...props}
            />
            {Boolean(error) && <Text style={{ fontFamily: GothamBook, color: "red", textAlign: "left", alignSelf: "flex-start", marginTop: 5, marginBottom: -5, marginLeft: 5 }}>{error}</Text>}
        </View>
    )
}

export default TextField