import { View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import TextField from '../Components/Modules/TextField'
import { useFormik } from 'formik'
import * as Yup from "yup";
import Main from '../Components/Main'
import { Text, TextInput } from 'react-native-paper'
import Ionicons from "react-native-vector-icons/Ionicons"
import { GothamBook } from '../../assets/fonts/font'
import { forgotPasswordAction, resetPasswordAction } from '../../Actions/AuthActions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ForgotPassword = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [openOtp, setOpenOtp] = useState(false)
    const [passwordVisable, setPasswordVisable] = useState(false)


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address.')
            .required('Please enter email address')
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: {
            email: __DEV__ ? "pallab_pki@hotmail.com" : ""
        },
        onSubmit: (values, actions) => {
            forgotPasswordAction(values, actions, setOpenOtp)

            // otpRef?.current?.focus()
        }
    })

    const { handleChange, handleSubmit, values, errors, touched, isSubmitting } = formik

    const otpValidationSchema = Yup.object().shape({
        otp: Yup.string()
            .min(6, 'Please enter valid otp')
            .max(6, 'Please enter valid otp')
            .required('Please enter valid otp')
            .typeError('Please enter valid otp'),
        password: Yup.string()
            .required('Please enter password')
            .typeError('Please enter password')
    });

    const formikOtp = useFormik({
        enableReinitialize: true,
        validationSchema: otpValidationSchema,
        initialValues: {
            otp: "",
            password: "",
            confirm_password: ""
        },
        onSubmit: (values, actions) => {
            resetPasswordAction(values, actions, setOpenOtp, navigation)
        }
    })

    return (
        <Main>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} extraHeight={30}>
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
                            <>
                                <TextField
                                    label="OTP"
                                    value={formikOtp.values.otp}
                                    onChangeText={formikOtp.handleChange("otp")}
                                    keyboardType="numeric"
                                    maxLength={6}
                                    error={formikOtp.touched.otp && formikOtp.errors.otp}
                                    autoCapitalize="none"
                                />
                                <TextField
                                    label="Password"
                                    value={formikOtp.values.password}
                                    onChangeText={(text) => {
                                        formikOtp.setFieldValue("password", text);
                                        formikOtp.setFieldValue("confirm_password", text);
                                    }}
                                    error={formikOtp.touched.password && formikOtp.errors.password}
                                    autoCapitalize="none"
                                    secureTextEntry={passwordVisable}
                                    right={<TextInput.Icon
                                        rippleColor="rgba(255,0,0, 0)"
                                        name={() =>
                                            <TouchableOpacity
                                                onPress={() => setPasswordVisable(!passwordVisable)}
                                                style={{
                                                    marginTop: 6
                                                }}>
                                                <Ionicons name={passwordVisable ? "eye-sharp" : "eye-off-sharp"} size={24} color="black" />
                                            </TouchableOpacity>} />}
                                />
                            </>}
                        <View style={{ marginTop: 30, width: "100%" }}>
                            <ButtonSolidRound
                                title={openOtp ? "Verify now" : "Submit"}
                                contentStyle={{ width: windowWidth * .7, height: 50 }}
                                loading={isSubmitting || formikOtp.isSubmitting}
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
            </KeyboardAwareScrollView>
        </Main >
    )
}

export default ForgotPassword