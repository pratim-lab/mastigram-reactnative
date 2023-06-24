import { View, Text, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'
import { GothamBook } from '../../assets/fonts/font';

const windowHeight = Dimensions.get('window').height;
const TreatmentNoteDialog = ({values, handleChange, setFieldValue}) => {
    return (
        <Portal>
            <Modal
                visible={values?.notesVisible}
                animationType="slide"
                contentContainerStyle={{
                    backgroundColor: '#FFFFFF',
                    height: "100%",
                    maxHeight: windowHeight,
                    bottom: -40,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}>
                <View style={{
                    height: 55,
                    borderBottomWidth: 1,
                    borderColor: "#D0D0D0",
                    width: "100%",
                    paddingHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                        <Text style={{
                            fontSize: 19,
                            fontWeight: "500",
                            fontFamily: GothamBook
                        }}>Treatment Notes</Text>
                        <TouchableOpacity onPress={() => setFieldValue("notesVisible", false)}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "500",
                                fontFamily: GothamBook
                            }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    paddingHorizontal: 20,
                    width: "100%",
                    marginTop: 20
                }}>
                    <View style={{
                        borderColor: "rgba(208, 208, 208, 1)",
                        borderWidth: 1.5,
                        borderRadius: 8,
                        padding: 10
                    }}>
                        <TextInput
                            defaultValue={values?.treatment_note}
                            onChangeText={(text) => setFieldValue("treatment_note", text)}
                            placeholder="Add notes here on treatment."
                            placeholderTextColor="#7F7F7F"
                            numberOfLines={6}
                            multiline={true}
                            style={{
                                backgroundColor: "#FFFFFF",
                                textAlignVertical: 'top',
                                height: 120,
                                marginBottom: 10,
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default TreatmentNoteDialog