import React from 'react'
import { View, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import { Text } from 'react-native-paper'
// import { Button } from 'react-native-paper'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import TextField from '../Components/Modules/TextField'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Main from '../Components/Main'
import { loginAction } from '../../Actions/AuthActions'
import { GothamBook } from '../../assets/fonts/font'

const LoginScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address.')
      .required('Please enter email address'),
    password: Yup.string()
      .min(2, 'Password is too Short!')
      .max(20, 'Password is too Long!')
      .required('Please enter password.')
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      email: __DEV__ ? "test46@domain.com" : "",
      password: __DEV__ ? "asdf@1234" : ""
    },
    onSubmit: (values, actions) => { loginAction(values, actions) }
  })

  const { handleChange, handleSubmit, values, errors, touched, isSubmitting } = formik

  return (
    <Main>
      <StatusBar translucent backgroundColor={"#f5f5f5"} barStyle="dark-content" />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          height: windowHeight - 30,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 30,
          position: "relative"
        }}>
          <View style={{
            alignItems: "center",
            width: "100%"
          }}>
            <Text style={{
              fontSize: 28,
              fontFamily: GothamBook,
              fontWeight: "700",
              marginBottom: 20
            }}>Login</Text>
            <TextField
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              keyboardType="email-address"
              error={touched.email && errors.email}
              autoCapitalize="none" />
            <TextField
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry={true}
              keyboardType="email-address"
              error={touched.password && errors.password} />
            <TouchableOpacity
              activeOpacity={1}
              style={{ width: "100%" }}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{
                fontFamily: GothamBook,
                fontStyle: "normal",
                fontSize: 16,
                color: "#F65C00",
                fontWeight: "500"
              }}>Forgot password</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 30, width: windowWidth * .65 }}>
              <ButtonSolidRound
                title="Login"
                contentStyle={{ width: windowWidth * .65, height: 45 }}
                onPress={handleSubmit}
                loading={isSubmitting} />
            </View>
          </View>
          <View style={{
            marginTop: 70,
            position: "absolute",
            bottom: 50
          }}>
            <View
              style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "row"
              }}>
              <Text style={{
                fontSize: 16,
                fontFamily: GothamBook,
                color: "#6a6a6a",
                fontWeight: "400"
              }}>New to Mastigram+?</Text>
              <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Signup')}>
                <Text style={{
                  color: "#F65C00",
                  fontSize: 16,
                  fontFamily: GothamBook,
                  fontWeight: "500"
                }}> Create an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Main >
  )
}

export default LoginScreen