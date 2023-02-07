import { View, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Main from '../Components/Main'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import { useFormik } from 'formik'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-date-picker'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Modal, Portal } from 'react-native-paper'
import { TextInput } from 'react-native'
import moment from 'moment'
import ImageHeader from '../Components/ImageHeader'
import { getTestByIDAction, logResultAction } from '../../Actions/TestActions'
import { messageState, testByIDState } from '../../Actions/Atoms'
import { TouchableOpacity } from 'react-native'
import TextFieldOutline from '../Components/Modules/TextFieldOutline'
import { useCallback } from 'react'
import { GothamBook } from '../../assets/fonts/font'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LogResult = ({ route, navigation }) => {

    const { id, mode } = route.params;
    const testData = useRecoilValue(testByIDState)
    const setMessage = useSetRecoilState(messageState)

    const getActionCall = useCallback(() => {
        getTestByIDAction({
            test_id: id
        })
    }, [id])

    useEffect(() => {
        getActionCall()
    }, [])

    const formik = useFormik({
        // enableReinitialize: true,
        // validationSchema: null,
        initialValues: {
            test_id: id,
            test_result: mode === "E" ? testData?.test_result : "",
            datepickerStatus: {
                status: false,
                type: "",
                date: moment().format(),
            },
            result_date: mode === "E" ? moment(testData?.result_date, "YYYY-MM-DD").format() : moment().format(),
            result_time: mode === "E" ? moment(testData?.result_time, "HH:mm:ss").format() : moment().format(),
            treatment: mode === "E" ? testData?.treatment : "",
            product_name: mode === "E" ? testData?.product_name : "",
            withhold: mode === "E" ? testData?.withhold : 0,
            notesVisible: false,
            treatment_note: mode === "E" ? testData?.treatment_note : "",
        },
        onSubmit: (values, actions) => {
            // console.log(values);
            if (
                values?.test_result === "" ||
                values?.result_date === "" ||
                values?.result_time === ""
                // values?.treatment === "" ||
                // values?.product_name === ""
                // values?.withhold < 1
            ) {
                actions.setSubmitting(false)
                setMessage({
                    type: 'success',
                    status: true,
                    message: "Please fill all the required field."
                });
            } else {
                const data = {
                    test_id: values?.test_id,
                    test_result: values?.test_result,
                    result_date: moment(values?.result_date).format("YYYY-MM-DD"),
                    result_time: moment(values?.result_time).format("HH:mm"),
                    treatment: values?.treatment,
                    product_name: values?.product_name,
                    withhold: values?.withhold,
                    treatment_note: values?.treatment_note
                }
                logResultAction(data, actions, navigation)
            }
        }
    })

    const { setFieldValue, handleChange, handleSubmit, values, isSubmitting } = formik

    // console.log(values);

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <Main>
                <View style={{
                    flex: 1,
                    marginVertical: -15,
                    marginHorizontal: -15,
                    paddingHorizontal: 15,
                    backgroundColor: "#FFFFFF"
                }}>
                    <ImageHeader
                        source={require('../../Resources/Images/banner2.png')}
                        subText={`ENTER TEST RESULT`}
                        text={`Cow: ${testData?.cow_no}`}
                        backgroundColor="#F65C00"
                        iconColor="#FFFFFF" />
                    <View style={{ flex: 1 }}>
                        <View style={{ paddingBottom: 30 }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 60,
                                borderColor: "#D0D0D0",
                                borderBottomWidth: 1
                            }}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <Feather name="clock" size={22} color="#000000" />
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: "500",
                                        marginLeft: 5,
                                        fontFamily: GothamBook
                                    }}>Test Taken</Text>
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    color: "#7F7F7F",
                                    fontWeight: "700",
                                    fontFamily: GothamBook
                                }}>
                                    {`${moment(testData?.test_date, "YYYY-MM-DD").format("DD MMM YYYY")} | ${moment(testData?.test_time, "HH:mm:ss").format("HH:mm")}`}
                                </Text>
                            </View>
                            <View style={{
                                borderColor: "#D0D0D0",
                                borderBottomWidth: 1,
                                paddingVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 19,
                                    fontWeight: "500",
                                    marginBottom: 10,
                                    fontFamily: GothamBook,
                                }}>Test Result<Text style={{ color: "red" }}>*</Text></Text>
                                {/* Test Result */}
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        setFieldValue("test_result", "Positive");
                                        setFieldValue("treatment", "Antibiotics");
                                    }}>
                                        <View
                                            style={{
                                                width: windowWidth * .42,
                                                height: 60,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderColor: values?.test_result === "Positive" ? "#F65C00" : "rgba(208, 208, 208, 1)",
                                                borderWidth: 1,
                                                borderRadius: 8
                                            }}>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: "500",
                                                fontFamily: GothamBook,
                                                color: values?.test_result === "Positive" ? "#F65C00" : "#000000"
                                            }}>Mastigram+</Text>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: "500",
                                                fontFamily: GothamBook,
                                                color: values?.test_result === "Positive" ? "#F65C00" : "#000000"
                                            }}>Positive</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setFieldValue("test_result", "Negative");
                                        setFieldValue("treatment", "Anti-Inflammatory");
                                    }}>
                                        <View
                                            style={{
                                                width: windowWidth * .42,
                                                height: 60,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderColor: values?.test_result === "Negative" ? "#F65C00" : "rgba(208, 208, 208, 1)",
                                                borderWidth: 1,
                                                borderRadius: 8
                                            }}>
                                            <Text style={{
                                                fontSize: 16,
                                                fontFamily: GothamBook,
                                                fontWeight: "500",
                                                color: values?.test_result === "Negative" ? "#F65C00" : "#000000"
                                            }}>Mastigram+</Text>
                                            <Text style={{
                                                fontSize: 16,
                                                fontFamily: GothamBook,
                                                fontWeight: "500",
                                                color: values?.test_result === "Negative" ? "#F65C00" : "#000000"
                                            }}>Negative</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {values?.test_result !== "" && <>
                                    {/* Result Date */}
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: 28
                                    }}>
                                        <Text style={{ fontFamily: GothamBook, fontWeight: "500", fontSize: 18 }}>Result Date</Text>
                                        <TouchableOpacity
                                            onPress={() => setFieldValue("datepickerStatus", {
                                                status: true,
                                                date: testData?.result_date ? moment(testData?.result_date, "YYYY-MM-DD").toDate() : moment().toDate(),
                                                type: "date"
                                            })}
                                            style={{
                                                backgroundColor: "rgba(208, 208, 208, 1)",
                                                borderRadius: 4,
                                                paddingHorizontal: 8,
                                                paddingVertical: 6
                                            }}>
                                            <Text style={{ fontFamily: GothamBook, fontWeight: "500", fontSize: 18 }}>{testData?.result_date ? moment(values?.result_date).format("DD MMM YYYY") : moment().format("DD MMM YYYY")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* Result Time */}
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: 28
                                    }}>
                                        <Text style={{ fontFamily: GothamBook, fontWeight: "500", fontSize: 18 }}>Result Time</Text>
                                        <TouchableOpacity
                                            onPress={() => setFieldValue("datepickerStatus", {
                                                status: true,
                                                date: testData?.result_time ? moment(testData?.result_time, "HH:mm:dd").toDate() : moment().toDate(),
                                                type: "time"
                                            })}
                                            style={{
                                                backgroundColor: "rgba(208, 208, 208, 1)",
                                                borderRadius: 4,
                                                paddingHorizontal: 8,
                                                paddingVertical: 6
                                            }}>
                                            <Text style={{ fontFamily: GothamBook, fontWeight: "500", fontSize: 18 }}>{moment(values?.result_time, "HH:mm:ss").format("HH:mm")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>}
                            </View>
                            <View style={{
                                borderColor: "#D0D0D0",
                                borderBottomWidth: 1,
                                paddingVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 19,
                                    fontFamily: GothamBook,
                                    fontWeight: "500",
                                    marginBottom: 10
                                }}>Treatment<Text style={{ color: "red" }}>*</Text></Text>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: values?.test_result === "" ? "space-around" : "flex-start",
                                }}>
                                    {(values?.test_result === "Positive" || values?.test_result === "") &&
                                        <View onPress={() => setFieldValue("treatment", "Antibiotics")}>
                                            <View
                                                style={{
                                                    width: windowWidth * .38,
                                                    height: 45,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderColor: values?.treatment === "Antibiotics" ? "#F65C00" : "rgba(208, 208, 208, 1)",
                                                    borderWidth: 1,
                                                    borderRadius: 50
                                                }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontFamily: GothamBook,
                                                    fontWeight: "500",
                                                    color: values?.treatment === "Antibiotics" ? "#F65C00" : "rgba(127, 127, 127, 1)"
                                                }}>Antibiotics</Text>
                                            </View>
                                        </View>}
                                    {(values?.test_result === "Negative" || values?.test_result === "") &&
                                        <View onPress={() => setFieldValue("treatment", "Anti-Inflammatory")}>
                                            <View
                                                style={{
                                                    width: windowWidth * .48,
                                                    height: 45,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderColor: values?.treatment === "Anti-Inflammatory" ? "#F65C00" : "rgba(208, 208, 208, 1)",
                                                    borderWidth: 1,
                                                    borderRadius: 50
                                                }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontFamily: GothamBook,
                                                    fontWeight: "500",
                                                    color: values?.treatment === "Anti-Inflammatory" ? "#F65C00" : "rgba(127, 127, 127, 1)"
                                                }}>Anti-Inflammatory</Text>
                                            </View>
                                        </View>}
                                </View>
                            </View>
                            <View style={{
                                borderColor: "#D0D0D0",
                                borderBottomWidth: 1,
                                paddingVertical: 20
                            }}>
                                <Text style={{
                                    fontSize: 19,
                                    fontWeight: "500",
                                    marginBottom: 10,
                                    fontFamily: GothamBook
                                }}>Treatment Details</Text>
                                <TextFieldOutline
                                    label="Product Name"
                                    value={values?.product_name}
                                    onChangeText={handleChange("product_name")}
                                />
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 20
                                }}>
                                    <View>
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}>
                                            <MaterialCommunityIcons name="timer-sand-empty" size={18} color="black" />
                                            <Text style={{
                                                fontSize: 18,
                                                fontFamily: GothamBook
                                            }}>Withhold Period</Text>
                                        </View>
                                        <Text style={{ marginLeft: 20, fontFamily: GothamBook }}>Number of Days</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        borderRadius: 50,
                                        borderColor: "rgba(208, 208, 208, 1)",
                                        borderWidth: 1,
                                        width: 110,
                                        height: 40
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => { setFieldValue("withhold", values?.withhold - 1) }}
                                            disabled={values?.withhold < 1}
                                            style={{
                                                width: 20,
                                                height: 40,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: "600",
                                                fontFamily: GothamBook
                                            }}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={{
                                            fontSize: 18,
                                            fontFamily: GothamBook
                                        }}>{values?.withhold}</Text>
                                        <TouchableOpacity
                                            onPress={() => { setFieldValue("withhold", values?.withhold + 1) }}
                                            style={{
                                                width: 20,
                                                height: 40,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                            <Text style={{
                                                color: "#F65C00",
                                                fontSize: 20,
                                                fontWeight: "600",
                                                fontFamily: GothamBook
                                            }}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                borderColor: "#D0D0D0",
                                borderBottomWidth: 1,
                                paddingVertical: 20
                            }}>
                                <TouchableOpacity
                                    onPress={() => { setFieldValue("notesVisible", true) }}
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                    <Text style={{
                                        fontSize: 19,
                                        fontWeight: "500",
                                        fontFamily: GothamBook
                                        // marginBottom: 10
                                    }}>Treatment Notes</Text>
                                    <MaterialIcons name="chevron-right" size={26} color="black" />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: GothamBook }}>{values?.treatment_note}</Text>
                            </View>
                        </View>
                        <View style={{
                            height: 100,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopWidth: 1,
                            marginHorizontal: -55,
                            borderColor: "#D0D0D0"
                        }}>
                            <View style={{ width: windowWidth * .5 }}>
                                <ButtonSolidRound
                                    title="Submit"
                                    onPress={handleSubmit}
                                    loading={isSubmitting}
                                    contentStyle={{ height: 55, width: windowWidth * .5 }} />
                            </View>
                        </View>
                    </View>
                </View>
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
                                    value={values?.treatment_note}
                                    onChangeText={handleChange("treatment_note")}
                                    placeholder="Add notes here on treatment."
                                    placeholderTextColor="#7F7F7F"
                                    numberOfLines={6}
                                    multiline={true}
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        textAlignVertical: 'top',
                                        height: 120,
                                        textInputHeight: 44,
                                        marginBottom: 10,
                                        textAlignVertical: 'top'
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                </Portal>
                {values?.datepickerStatus?.status &&
                    <DatePicker
                        modal
                        mode={values?.datepickerStatus?.type}
                        open={values?.datepickerStatus?.status}
                        date={values?.datepickerStatus?.date}
                        onConfirm={(date) => {
                            setFieldValue("datepickerStatus", { status: false, date: date, type: "date" })
                            values?.datepickerStatus?.type === "date" ?
                                setFieldValue("result_date", moment(date).format()) :
                                setFieldValue("result_time", moment(date).format())
                        }}
                        onCancel={() => {
                            setFieldValue("datepickerStatus", { status: false, date: new Date(), type: "" })
                        }}
                    />}
            </Main>
        </KeyboardAwareScrollView>
    )
}

export default LogResult