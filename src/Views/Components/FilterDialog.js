import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Modal, Portal, Snackbar } from 'react-native-paper'
import CheckBox from '@react-native-community/checkbox';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { useFormik } from 'formik'
import * as Yup from "yup"; import moment from "moment"
import ButtonSolidRound from './Modules/ButtonSolidRound';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { authState, messageState } from '../../Actions/Atoms';
import DateRangePicker from 'rn-select-date-range';
import { GothamBook, RobotoRegular } from '../../assets/fonts/font';
import { getTestListAction } from '../../Actions/TestActions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const FilterDialog = (props) => {
    const { open, setData, onClose, tab } = props
    const [messageData, setMessage] = useRecoilState(messageState)
    const resetMessage = useResetRecoilState(messageState)
    // console.log("authData?.id", authData?.data?.id);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            result_type: tab,
            resultNegative: "",
            resultPositive: "",
            dateRange: {}
        },
        onSubmit: (values, actions) => {
            const data = {
                from_date: values?.dateRange?.firstDate,
                to_date: values?.dateRange?.secondDate,
                result_type: values?.result_type,
                test_result: values?.resultNegative !== "" && values?.resultPositive !== "" ? "" :
                    values?.resultNegative === "Negative" && values?.resultPositive === "" ? "Negative" :
                        values?.resultPositive === "Positive" && values?.resultNegative === "" ? "Positive" : ""
            }
            if (data?.from_date && data?.to_date) {
                getTestListAction(data)
                setData({ status: false, data: data })
                actions.setSubmitting(false)
            } else {
                actions.setSubmitting(false)
                setMessage({
                    type: 'success',
                    status: true,
                    message: "Please select date range."
                });
            }
        }
    })

    const { setFieldValue, handleSubmit, values, errors, touched, isSubmitting } = formik
    return (
        <Portal>
            <Modal
                visible={open}
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
                        }}>Filter</Text>
                        <TouchableOpacity onPress={() => {
                            setData({ status: false });
                            onClose()
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: GothamBook,
                                fontWeight: "500",
                            }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: "100%",
                    paddingHorizontal: 15,
                    marginTop: 15,
                    flex: 1,
                    // justifyContent: "space-between"
                }}>
                    <View style={{ flex: 1 }}>
                        <KeyboardAvoidingView showsVerticalScrollIndicator={false}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Text style={{ fontSize: 22, fontFamily: GothamBook, fontWeight: "500", marginBottom: 20 }}>{`Date(s)`}</Text>
                                {values?.dateRange?.firstDate && values?.dateRange?.secondDate &&
                                    <Text style={{ fontSize: 14, fontFamily: GothamBook, fontWeight: "500", marginBottom: 20, color: "#7F7F7F" }}>
                                        {`${moment(values?.dateRange?.firstDate).format("DD MMM YYYY")} - ${moment(values?.dateRange?.secondDate).format("DD MMM YYYY")}`}
                                    </Text>}
                            </View>
                            <View style={{
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: "#CCCCCC",
                                paddingVertical: 10
                            }}>
                                <DateRangePicker
                                    onSelectDateRange={(range) => {
                                        setFieldValue("dateRange", range);
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
                            <Text style={{ fontSize: 22, fontFamily: GothamBook, marginVertical: 10 }}>Test Results</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <CheckBox
                                    disabled={false}
                                    value={values.resultPositive === "Positive"}
                                    onValueChange={(newValue) => {
                                        setFieldValue("resultPositive", newValue ? "Positive" : "")
                                    }}
                                    boxType="square"
                                    onCheckColor="#FFFFFF"
                                    onFillColor="rgba(246, 92, 0, 1)"
                                    tintColors="rgba(246, 92, 0, 1)"
                                    onTintColor="rgba(246, 92, 0, 1)"
                                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                                />
                                <Text style={{ fontSize: 16, fontFamily: GothamBook, fontWeight: "600" }}>Mastigram+ Positive</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <CheckBox
                                    disabled={false}
                                    value={values.resultNegative === "Negative"}
                                    onValueChange={(newValue) => {
                                        setFieldValue("resultNegative", newValue ? "Negative" : "")
                                    }}
                                    boxType="square"
                                    onCheckColor="#FFFFFF"
                                    onFillColor="rgba(246, 92, 0, 1)"
                                    tintColors="rgba(246, 92, 0, 1)"
                                    onTintColor="rgba(246, 92, 0, 1)"
                                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                                />
                                <Text style={{ fontSize: 16, fontFamily: GothamBook, fontWeight: "600" }}>Mastigram+ Negative</Text>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                    <View style={{
                        height: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopWidth: 1,
                        marginBottom: 60,
                        marginHorizontal: -15,
                        borderColor: "#D0D0D0"
                    }}>
                        <View style={{ width: windowWidth * .5 }}>
                            <ButtonSolidRound
                                title="Submit"
                                onPress={handleSubmit}
                                loading={isSubmitting}
                                contentStyle={{ height: 55, width: windowWidth * .5 }} />
                        </View>
                        <Snackbar
                            visible={messageData?.status}
                            onDismiss={() => resetMessage()}
                            action={{
                                label: 'Ok',
                                onPress: () => {
                                    resetMessage()
                                },
                            }}
                            style={{ color: "#FFFFFF" }}
                            theme={{ colors: { accent: '#FFFFFF' } }}>
                            {messageData?.message}
                        </Snackbar>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default FilterDialog