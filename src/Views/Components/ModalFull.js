import { View, Text } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'

const ModalFull = (props) => {
    const {visible, } = props
    return (
        <Portal>
            <Modal
                visible={visible}
                animationType="slide"
                contentContainerStyle={{
                    backgroundColor: '#FFFFFF',
                    height: windowHeight,
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
                        <View style={{
                            flex: 1,
                            paddingTop: 40,
                            marginHorizontal: -15,
                            marginVertical: -15,
                            backgroundColor: "#FFFFFF"
                        }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontFamily: GothamBook, fontSize: 26, fontWeight: "700" }}>Export Records</Text>
                            </View>
                            <View style={{
                                width: "100%",
                                paddingHorizontal: 15,
                                marginTop: 40,
                                flex: 1,
                                justifyContent: "space-between"
                            }}>
                                <View style={{ flex: 1 }}>
                                    <KeyboardAvoidingView showsVerticalScrollIndicator={false}>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <Text style={{ fontSize: 22, fontWeight: "500", marginBottom: 20 }}>{`Date(s)`}</Text>
                                        </View>
                                        <View style={{
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderColor: "#CCCCCC",
                                            paddingVertical: 10
                                        }}>
                                            <DateRangePicker
                                                onSelectDateRange={(range) => {
                                                    // setFieldValue("dateRange", range);
                                                }}
                                                blockSingleDateSelection={true}
                                                responseFormat="YYYY-MM-DD"
                                                maxDate={moment()}
                                                minDate={moment().subtract(3, "M")}
                                                confirmBtnTitle={false}
                                                font={RobotoRegular}
                                                selectedDateContainerStyle={{
                                                    height: 35,
                                                    width: "100%",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#FEEBE0"
                                                }}
                                                selectedDateStyle={{
                                                    fontWeight: "bold",
                                                    color: "#000000",
                                                }}
                                            />
                                        </View>
                                    </KeyboardAvoidingView>
                                </View>
                                <View style={{
                                    height: 100,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginHorizontal: -55,
                                }}>
                                    <View style={{ width: windowWidth * .5 }}>
                                        <ButtonSolidRound
                                            title="Export"
                                            // onPress={handleSubmit}
                                            // loading={isSubmitting}
                                            contentStyle={{ height: 55, width: windowWidth * .5 }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default ModalFull