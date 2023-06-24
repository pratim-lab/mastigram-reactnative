import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Main from '../Components/Main'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import { useFormik } from 'formik'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-date-picker'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import moment from 'moment'
import ImageHeader from '../Components/ImageHeader'
import { getTestByIDAction, logResultAction } from '../../Actions/TestActions'
import { messageState, testByIDState } from '../../Actions/Atoms'
import { TouchableOpacity } from 'react-native'
import TextFieldOutline from '../Components/Modules/TextFieldOutline'
import { useCallback } from 'react'
import { GothamBook } from '../../assets/fonts/font'
import { useIsFocused } from '@react-navigation/native'
import TreatmentNoteDialog from '../Components/TreatmentNoteDialog'

const windowWidth = Dimensions.get('window').width;

const LogResult = ({ route, navigation }) => {

    const { id, mode } = route.params;
    const testData = useRecoilValue(testByIDState)
    const setMessage = useSetRecoilState(messageState)
    const isFocused = useIsFocused();

    const getActionCall = useCallback(() => {
        getTestByIDAction({
            test_id: id
        })
    }, [id])

    useEffect(() => {
        getActionCall();
    }, [isFocused])

    const [datepickerStatus, setDatepickerStatus] = useState({
        status: false,
        type: "date",
        date: moment().toDate(),
    })

    const { setFieldValue, handleSubmit, values, isSubmitting } = useFormik({
        enableReinitialize: true,
        initialValues: {
            test_id: id,
            test_result: mode === "E" ? testData?.test_result : "",
            result_date: mode === "E" ? testData?.result_date : moment().format("YYYY-MM-DD"),
            result_time: mode === "E" ? testData?.result_time : moment().format("HH:mm"),
            treatment: mode === "E" ? testData?.treatment : "",
            product_name: mode === "E" ? testData?.product_name : "",
            withhold: mode === "E" ? testData?.withhold : 0,
            notesVisible: false,
            treatment_note: mode === "E" ? testData?.treatment_note : "",
        },
        onSubmit: (values, actions) => {
            if (
                values?.test_result === "" ||
                values?.result_date === "" ||
                values?.result_time === ""
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
                    result_time: moment(values?.result_time, "HH:mm:ss").format("HH:mm"),
                    treatment: values?.treatment,
                    product_name: values?.product_name,
                    withhold: values?.withhold,
                    treatment_note: values?.treatment_note
                }
                logResultAction(data, actions, navigation)
                // console.log(data);
                // actions.setSubmitting(false)
            }
        }
    })

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <Main>
                <View style={{
                    flex: 1,
                    marginVertical: -20,
                    marginHorizontal: -15,
                    paddingHorizontal: 15,
                    backgroundColor: "#FFFFFF"
                }}>
                    <ImageHeader
                        source={require('../../Resources/Images/banner2.png')}
                        subText={`ENTER TEST RESULT`}
                        text={`Cow: ${testData?.cow_no ? testData?.cow_no : ""}`}
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
                                    {`${moment(testData?.test_date, "YYYY-MM-DD").format("DD MMM YYYY")} | ${moment(testData?.result_time, "HH:mm:ss").format("HH:mm")}`}
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
                                            onPress={() => setDatepickerStatus({
                                                status: true,
                                                date: testData?.result_date ? moment(values?.result_date, "YYYY-MM-DD").toDate() : moment().toDate(),
                                                type: "date"
                                            })}
                                            style={{
                                                backgroundColor: "rgba(208, 208, 208, 1)",
                                                borderRadius: 4,
                                                paddingHorizontal: 8,
                                                paddingVertical: 6
                                            }}>
                                            <Text style={{ fontFamily: GothamBook, fontWeight: "500", fontSize: 18 }}>{moment(values?.result_date).format("DD MMM YYYY")}</Text>
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
                                            onPress={() => setDatepickerStatus({
                                                status: true,
                                                date: testData?.result_time ? moment(values?.result_time, "HH:mm:ss").toDate() : moment().toDate(),
                                                type: "time"
                                            })}
                                            style={{
                                                backgroundColor: "rgba(208, 208, 208, 1)",
                                                borderRadius: 4,
                                                paddingHorizontal: 8,
                                                paddingVertical: 6
                                            }}>
                                            <Text style={{ fontFamily: GothamBook, fontWeight: "500", fontSize: 18 }}>{values?.result_time ? moment(values?.result_time, "HH:mm:ss").format("HH:mm") : moment().format("HH:mm")}</Text>
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
                                    defaultValue={values?.product_name}
                                    onChangeText={(text) => setFieldValue("product_name", text)}
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
                                            onPress={() => setFieldValue("withhold", values?.withhold - 1)}
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
                                            onPress={() => setFieldValue("withhold", values?.withhold + 1)}
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
                                    onPress={() => setFieldValue("notesVisible", true)}
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
                            // borderTopWidth: 1,
                            marginHorizontal: -55,
                            borderColor: "#D0D0D0"
                        }}>
                            <View style={{ width: windowWidth * .5 }}>
                                <ButtonSolidRound
                                    title="Submit"
                                    onPress={() => handleSubmit()}
                                    loading={isSubmitting}
                                    contentStyle={{ height: 55, width: windowWidth * .5 }} />
                            </View>
                        </View>
                    </View>
                </View>
                <TreatmentNoteDialog setFieldValue={setFieldValue} values={values} />
                {datepickerStatus?.status &&
                    <DatePicker
                        modal
                        mode={datepickerStatus?.type}
                        open={datepickerStatus?.status}
                        date={datepickerStatus?.date}
                        onConfirm={(date) => {
                            setDatepickerStatus({ status: false, date: moment(date).toDate(), type: "date" })
                            datepickerStatus?.type === "date" ?
                                setFieldValue("result_date", moment(date).format("YYYY-MM-DD")) :
                                setFieldValue("result_time", moment(date).format("HH:mm:ss"))
                        }}
                        onCancel={() => {
                            setDatepickerStatus({ status: false, date: moment().toDate(), type: "" })
                        }}
                    />}
            </Main>
        </KeyboardAwareScrollView >
    )
}

export default LogResult