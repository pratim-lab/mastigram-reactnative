import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Checkbox, Modal, Portal, Snackbar } from 'react-native-paper'
import { useFormik } from 'formik'
import moment from "moment"
import ButtonSolidRound from './Modules/ButtonSolidRound';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { messageState } from '../../Actions/Atoms';
// import DateRangePicker from 'rn-select-date-range';
import { GothamBook, RobotoRegular } from '../../assets/fonts/font';
import { getTestListAction } from '../../Actions/TestActions';
import DateRangePicker from './Modules/DateRangePicker'

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
            resultNegative: false,
            resultPositive: false,
            from_date: "",
            to_date: "",
            dateRange: {}
        },
        onSubmit: (values, actions) => {
            const data = {
                // from_date: values?.dateRange?.firstDate,
                // to_date: values?.dateRange?.secondDate,
                from_date: values?.from_date,
                to_date: values?.to_date,
                result_type: values?.result_type,
                test_result: values?.resultPositive && values?.resultNegative ? "" :
                    values?.resultPositive ? "Positive" :
                        values?.resultNegative ? "Negative" : ""
            }
            // console.log(data);
            if (data?.from_date && data?.to_date) {
                getTestListAction(data, "F", setData)
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

    const { setFieldValue, handleSubmit, values, errors, touched, isSubmitting, resetForm } = formik
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
                            onClose();
                            resetForm();
                            getTestListAction({
                                result_type: tab
                            })
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontFamily: GothamBook,
                                fontWeight: "500",
                            }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{
                    flex: 1,
                    width: windowWidth
                }}>
                    <View style={{
                        width: "100%",
                        paddingHorizontal: 15,
                        marginTop: 15,
                        flex: 1,
                        // justifyContent: "space-between"
                    }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Text style={{ fontSize: 22, fontFamily: GothamBook, fontWeight: "500", marginBottom: 20 }}>{`Date(s)`}</Text>
                                {values?.from_date && values?.to_date &&
                                    <Text style={{ fontSize: 14, fontFamily: GothamBook, fontWeight: "500", marginBottom: 20, color: "#7F7F7F" }}>
                                        {`${moment(values?.from_date).format("DD MMM YYYY")} - ${moment(values?.to_date).format("DD MMM YYYY")}`}
                                    </Text>}
                                {/* <Text style={{ fontSize: 22, fontFamily: GothamBook, fontWeight: "500", marginBottom: 20 }}>{`Date(s)`}</Text>
                                {values?.dateRange?.firstDate && values?.dateRange?.secondDate &&
                                    <Text style={{ fontSize: 14, fontFamily: GothamBook, fontWeight: "500", marginBottom: 20, color: "#7F7F7F" }}>
                                        {`${moment(values?.dateRange?.firstDate).format("DD MMM YYYY")} - ${moment(values?.dateRange?.secondDate).format("DD MMM YYYY")}`}
                                    </Text>} */}
                            </View>
                            <View style={{
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: "#CCCCCC",
                                paddingVertical: 10
                            }}>
                                <DateRangePicker
                                    onSuccess={(s, e) => {
                                        setFieldValue("from_date", s);
                                        setFieldValue("to_date", e);
                                    }} />
                                {/* <DateRangePicker
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
                                        backgroundColor: "rgba(246, 92, 0, .8)",
                                    }}
                                    selectedDateStyle={{
                                        fontWeight: "bold",
                                        color: "#FFFFFF",
                                    }}
                                /> */}
                            </View>
                            <Text style={{ fontSize: 22, fontFamily: GothamBook, marginVertical: 10 }}>Test Results</Text>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <Checkbox.Item
                                    label={"Mastigram+ Positive"}
                                    status={values.resultPositive ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setFieldValue("resultPositive", !values.resultPositive)
                                    }}
                                    color={"rgba(246, 92, 0, 1)"}
                                    mode="android"
                                    position="leading"
                                    labelStyle={{
                                        textTransform: "capitalize",
                                        fontSize: 16,
                                        fontFamily: GothamBook,
                                        fontWeight: "600"
                                    }}
                                />
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <Checkbox.Item
                                    label={"Mastigram+ Negative"}
                                    status={values.resultNegative ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setFieldValue("resultNegative", !values.resultNegative)
                                    }}
                                    color={"rgba(246, 92, 0, 1)"}
                                    mode="android"
                                    position="leading"
                                    labelStyle={{
                                        textTransform: "capitalize",
                                        fontSize: 16,
                                        fontFamily: GothamBook,
                                        fontWeight: "600"
                                    }}
                                />
                                {/* <Text style={{ fontSize: 16, fontFamily: GothamBook, fontWeight: "600" }}>Mastigram+ Negative</Text> */}
                            </View>
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
                                duration={3000}
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
                </ScrollView>
            </Modal>
        </Portal>
    )
}

export default FilterDialog