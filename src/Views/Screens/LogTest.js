import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import Main from '../Components/Main'
import TextFieldOutline from '../Components/Modules/TextFieldOutline'
import { Switch } from 'react-native-paper';
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound';
import DatePicker from 'react-native-date-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';
import { logTestAction } from '../../Actions/TestActions';
import ImageHeader from '../Components/ImageHeader';
import { GothamBook } from '../../assets/fonts/font';
import { profileState } from '../../Actions/Atoms';
import { useRecoilValue } from 'recoil';

const LogTest = ({ route, navigation }) => {

    // const { id } = route.params;
    // console.log(id);
    const profileData = useRecoilValue(profileState)

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [datepickerStatus, setDatepickerStatus] = useState({ status: false, date: moment().toDate(), type: "date" })
    const validationSchema = Yup.object().shape({
        cow_no: Yup.string()
            .required('Please enter cow no')
            .typeError('Please enter cow no'),
        test_date: Yup.string()
            .required('Please enter test date.')
            .typeError('Please enter test date.'),
        test_time: Yup.string()
            .required('Please enter test time.')
            .typeError('Please enter test time.'),
    });

    const formik = useFormik({
        // enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: {
            cow_no: "",
            test_date: moment().format(),
            test_time: moment().format(),
            current_time: moment().format(),
            alert: true,
        },
        onSubmit: (values, actions) => {
            const data = {
                cow_no: values.cow_no,
                test_date: moment(values.test_date).format("YYYY-MM-DD"),
                test_time: moment(values.test_time).format("HH:mm:ss"),
                current_time: values?.current_time,
                alert: Boolean(values.alert)
            }
            logTestAction(data, actions, navigation)
        }
    })

    const { setFieldValue, handleSubmit, values, errors, touched, isSubmitting } = formik

    // console.log(moment().format());

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <Main>
                <View style={{
                    flex: 1,
                    // height: Platform.OS === "ios" ? windowHeight : windowHeight - 25,
                    marginVertical: -20,
                    marginHorizontal: -15,
                    paddingHorizontal: 15,
                    backgroundColor: "#FFFFFF"
                }}>
                    <ImageHeader
                        source={require('../../Resources/Images/banner1.png')}
                        text="Log a Test"
                        backgroundColor="#000000" />
                    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                        <View style={{
                            width: "100%",
                            paddingHorizontal: 10,
                            marginTop: 30,
                            flex: 1,
                            justifyContent: "space-between",
                            backgroundColor: "#FFFFFF"
                        }}>
                            <View>
                                <TextFieldOutline
                                    label="Cow Number"
                                    value={values.cow_no}
                                    onChangeText={(event) => {
                                        setFieldValue("cow_no", event)
                                    }}
                                    error={errors.cow_no && touched.cow_no}
                                />
                                {errors.cow_no && touched.cow_no && <Text style={{
                                    color: "red",
                                    textAlign: "left",
                                    alignSelf: "flex-start",
                                    marginTop: 5,
                                    marginBottom: -5,
                                    marginLeft: 5,
                                    fontFamily: GothamBook
                                }}>{errors.cow_no}</Text>}
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: 28
                                }}>
                                    <Text style={{
                                        fontWeight: "500",
                                        fontSize: 18,
                                        fontFamily: GothamBook
                                    }}>Test Date</Text>
                                    <TouchableOpacity
                                        onPress={() => setDatepickerStatus({ status: true, date: moment().toDate(), type: "date" })}
                                        style={{
                                            backgroundColor: "rgba(208, 208, 208, 1)",
                                            borderRadius: 4,
                                            paddingHorizontal: 8,
                                            paddingVertical: 6
                                        }}>
                                        <Text style={{
                                            fontWeight: "500",
                                            fontSize: 18,
                                            fontFamily: GothamBook
                                        }}>{moment(values.test_date).format("DD MMM YYYY")}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: 28
                                }}>
                                    <Text style={{
                                        fontWeight: "500",
                                        fontSize: 18,
                                        fontFamily: GothamBook
                                    }}>Test Time</Text>
                                    <TouchableOpacity
                                        onPress={() => setDatepickerStatus({ status: true, date: moment().toDate(), type: "time" })}
                                        style={{
                                            backgroundColor: "rgba(208, 208, 208, 1)",
                                            borderRadius: 4,
                                            paddingHorizontal: 8,
                                            paddingVertical: 6
                                        }}>
                                        <Text style={{
                                            fontWeight: "500",
                                            fontSize: 18,
                                            fontFamily: GothamBook
                                        }}>{moment(values.test_time).format("HH:mm")}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: 28
                                }}>
                                    <Text style={{
                                        fontWeight: "500",
                                        fontSize: 18,
                                        fontFamily: GothamBook
                                    }}>Alerts</Text>
                                    <Switch
                                        color="#F65C00"
                                        value={values.alert}
                                        onValueChange={(event) => setFieldValue("alert", event)} />
                                </View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => navigation.navigate("SettingsTab")}
                                    style={{ marginTop: 20 }}>
                                    <View style={{
                                        flexDirection: "row",
                                        flexWrap: 'wrap'
                                    }}>
                                        <Text style={{ fontFamily: GothamBook }}>{`Alert will notify you in ${profileData?.alert_hour ? profileData?.alert_hour : "7"} hours, when a sample is ready to test. Change alert in the`}
                                            <Text style={{
                                                color: "#F65C00",
                                                fontWeight: "500",
                                                fontFamily: GothamBook
                                            }}> In App settings. </Text>
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                height: 100,
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopWidth: 1,
                                marginHorizontal: -25,
                                borderColor: "#FFFFFF"
                            }}>
                                <ButtonSolidRound
                                    title="Submit"
                                    onPress={handleSubmit}
                                    loading={isSubmitting}
                                    contentStyle={{ width: windowWidth * .5, height: 55 }} />
                            </View>
                        </View>
                    </View>
                    {datepickerStatus?.status &&
                        <DatePicker
                            modal
                            mode={datepickerStatus?.type}
                            open={datepickerStatus?.status}
                            date={datepickerStatus?.date}
                            maximumDate={new Date(datepickerStatus?.type === "date" ? moment().format("YYYY-MM-DD") : moment().add(1, "d").format("YYYY-MM-DD"))}
                            onConfirm={(date) => {
                                setDatepickerStatus({ status: false, date: date, type: "date" })
                                datepickerStatus?.type === "date" ?
                                    setFieldValue("test_date", moment(date).format()) :
                                    setFieldValue("test_time", moment(date).format())
                            }}
                            onCancel={() => {
                                setDatepickerStatus({ status: false, date: new Date(), type: "" })
                            }}
                        />}
                </View>

            </Main>
        </KeyboardAwareScrollView>
    )
}

export default LogTest