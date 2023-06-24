import { View, Dimensions, TouchableOpacity, StatusBar, Linking } from 'react-native'
import React, { useState } from 'react'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import TextField from '../Components/Modules/TextField'
import { useFormik } from 'formik'
import * as Yup from "yup";
import Main from '../Components/Main'
import { Text } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CountryPicker from 'react-native-country-picker-modal'
import { signupAction } from '../../Actions/AuthActions'
import { GothamBook, GothamMedium } from '../../assets/fonts/font'

const SignupScreen = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [openCountry, setOpenCountry] = useState(false)

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address.')
            .required('Please enter email address'),
        farm_name: Yup.string()
            .min(2, 'Farm name is too Short!')
            .max(25, 'Farm name is too Long!')
            .required('Please enter farm name.'),
        no_of_cow: Yup.string()
            .min(1, 'Number of cows is too Short!')
            .max(10, 'Number of cows is too Long!')
            .required('Please enter number of cows.'),
        country: Yup.object()
            .required('Please enter country.')
            .typeError('Please enter country.'),
        password: Yup.string()
            .min(6, 'The password must be at least 6 characters.')
            .max(50, 'Password is too Long!')
            .required('Please enter password.'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: {
            email: __DEV__ ? "test31@domain.com" : "",
            farm_name: __DEV__ ? "Test Farm3" : "",
            no_of_cow: __DEV__ ? "10" : "",
            country: {cca2: "US", country: {callingCode: ["1"], cca2: "US", currency: ["USD"], flag: "flag-us", name: "United States", region: "Americas", subregion: "North America"}},
            password: __DEV__ ? "Asdf@7390" : ""
        },
        onSubmit: (values, actions) => {
            const data = {
                email: values.email,
                farm_name: values.farm_name,
                no_of_cow: values.no_of_cow,
                country: values?.country?.country?.name,
                password: values?.password
            }
            // console.log(data);
            signupAction(data, actions, navigation)
        }
    })

    const { handleChange, setFieldValue, handleSubmit, values, errors, touched, isSubmitting } = formik

    // console.log(values.country);

    return (
        <Main>
            <StatusBar translucent backgroundColor={"#f5f5f5"} barStyle="dark-content" />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    height: windowHeight,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 30,
                }}>
                    <View style={{
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <Text style={{
                            fontFamily: GothamMedium,
                            fontStyle: "normal",
                            fontSize: 24,
                            fontWeight: "700",
                            textAlign: "center",
                            marginBottom: 10
                        }}>Welcome to Mastigram+</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                textAlign: "center",
                                color: "#6a6a6a",
                                marginBottom: 20,
                                fontFamily: GothamBook,
                            }}>Create an account to get started. You will share this account across your farm to track mastitis cases and export results to your HMS.</Text>
                        <TextField
                            label={errors.email && touched.email ? errors.email : "Email Address*"}
                            value={values.email}
                            onChangeText={handleChange("email")}
                            keyboardType="email-address"
                            error={touched.email && errors.email}
                            autoCapitalize="none"
                        />
                        <TextField
                            label={errors.farm_name && touched.farm_name ? errors.farm_name : "Farm Name*"}
                            value={values.farm_name}
                            onChangeText={handleChange("farm_name")}
                            error={touched.farm_name && errors.farm_name}
                        />
                        <TextField
                            label={errors.no_of_cow && touched.no_of_cow ? errors.no_of_cow : "Number of Cows*"}
                            value={values.no_of_cow}
                            onChangeText={handleChange("no_of_cow")}
                            keyboardType="numeric"
                            error={touched.no_of_cow && errors.no_of_cow}
                        />
                        <View style={{ width: "100%", position: "relative" }}>
                            <CountryPicker
                                onSelect={(value) => setFieldValue("country", { country: value, cca2: value.cca2 })}
                                cca2={values?.country?.cca2}
                                placeholder={<Text style={{ color: errors.country && touched.country ? "#b32323" : "#000000", fontFamily: GothamBook }}>{values?.country?.country?.name ? values?.country?.country?.name : "Country*"}</Text>}
                                translation='eng'
                                withFilter={true}
                                withAlphaFilter={true}
                                withFlagButton={true}
                                withModal={true}
                                filterFocus={true}
                                containerButtonStyle={{
                                    width: "100%",
                                    borderWidth: errors.country && touched.country ? 2 : 1,
                                    borderColor: errors.country && touched.country ? "#b32323" : "#888888",
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: 8,
                                    paddingHorizontal: 15,
                                    paddingVertical: 12,
                                    marginVertical: 10,
                                }}
                                modalProps={{
                                    visible: openCountry
                                }}
                                onOpen={() => setOpenCountry(true)}
                                onClose={() => setOpenCountry(false)}
                                visible={openCountry}
                            />
                            <MaterialIcons
                                name="arrow-drop-down"
                                size={24}
                                color="black"
                                style={{
                                    position: "absolute",
                                    right: 10,
                                    top: "20%",
                                }} />
                        </View>
                        <TextField
                            label={errors.password && touched.password ? errors.password : "Password*"}
                            value={values.password}
                            onChangeText={handleChange("password")}
                            secureTextEntry={true}
                            error={touched.password && errors.password}
                        />
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexWrap: 'wrap'
                        }}>
                            <Text style={{ fontFamily: GothamBook, fontSize: 12 }}>By continuing, you agree to Mastigram+'s </Text>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => Linking.openURL("https://www.zoetis.com/terms-of-use")}>
                                <Text style={{ color: "#F65C00", fontFamily: GothamBook, fontSize: 12 }}>Terms & Conditions </Text>
                            </TouchableOpacity>
                            <Text style={{ fontFamily: GothamBook, fontSize: 12 }}>and </Text>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => Linking.openURL("https://www.zoetis.com/terms-of-use")}>
                                <Text style={{ color: "#F65C00", fontFamily: GothamBook, fontSize: 12 }}>Privacy Policy.</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <ButtonSolidRound
                                title="Create an Account"
                                contentStyle={{ width: windowWidth * .7, height: 45 }}
                                onPress={handleSubmit}
                                loading={isSubmitting} />
                        </View>
                        <View style={{
                            marginTop: 70,
                            flexDirection: "row"
                        }}>
                            <Text style={{
                                fontSize: 18,
                                color: "#6a6a6a",
                                alignSelf: "center",
                                fontWeight: "400",
                                fontFamily: GothamBook
                            }}>Already have an account?</Text>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => navigation.navigate('Login')}>
                                <Text style={{
                                    color: "#F65C00",
                                    fontSize: 18,
                                    fontWeight: "500",
                                    fontFamily: GothamBook
                                }}> Log in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Main >
    )
}

export default SignupScreen