import { View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import TextField from '../Components/Modules/TextField'
import { useFormik } from 'formik'
import * as Yup from "yup";
import Main from '../Components/Main'
import { Text } from 'react-native-paper'
import { GothamBook, RobotoRegular } from '../../assets/fonts/font'

const ForgotPassword = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [openOtp, setOpenOtp] = useState(false)
    const otpRef = React.useRef();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address.')
            .required('Please enter email address')
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: {
            email: ""
        },
        onSubmit: values => {
            setOpenOtp(true);
            otpRef?.current?.focus()
        }
    })

    const { handleChange, handleSubmit, values, errors, touched } = formik

    const otpValidationSchema = Yup.object().shape({
        otp: Yup.string()
            .min(4, 'Please enter valid otp')
            .max(4, 'Please enter valid otp')
            .required('Please enter valid otp')
    });

    const formikOtp = useFormik({
        enableReinitialize: true,
        validationSchema: otpValidationSchema,
        initialValues: {
            otp: ""
        },
        onSubmit: values => console.log(values)
    })

    return (
        <Main>
            <View style={{
                height: windowHeight,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 30,
                paddingRight: 30
            }}>
                <View style={{
                    height: openOtp ? 340 : 250,
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>
                    <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 20, fontFamily: GothamBook }}>Forgot password</Text>
                    <TextField
                        label="Email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        keyboardType="email-address"
                        error={touched.email && errors.email}
                        autoCapitalize="none"
                        onFocus={() => setOpenOtp(false)}
                    />
                    {openOtp &&
                        <TextField
                            label="OTP"
                            value={formikOtp.values.otp}
                            onChangeText={formikOtp.handleChange("otp")}
                            keyboardType="numeric"
                            error={formikOtp.touched.otp && formikOtp.errors.otp}
                            autoCapitalize="none"
                            autoFocus={true}
                            // ref={otpRef}
                        />}
                    <View style={{ marginTop: 30, width: "100%" }}>
                        <ButtonSolidRound
                            title={openOtp ? "Verify now" : "Submit"}
                            contentStyle={{ width: windowWidth * .7, height: 50 }}
                            onPress={openOtp ? formikOtp.handleSubmit : handleSubmit} />
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 25
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: "#6a6a6a",
                                fontWeight: "400",
                                fontFamily: GothamBook
                            }}>Back to </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}>
                                <Text style={{ fontFamily: GothamBook, fontSize: 18, color: "#F65C00", fontWeight: "500" }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Main >
    )
}

export default ForgotPassword