import { View, Text, Dimensions, Linking, StatusBar } from 'react-native'
import React from 'react'
// import DateRangePicker from "rn-select-date-range";
import { Calendar } from 'react-native-calendars';
import Main from '../Components/Main'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import { useFormik } from 'formik'
import * as Yup from "yup";
import moment from "moment"
// import { exportAction } from '../../Actions/TestActions';
import TextField from '../Components/Modules/TextField';
import { GothamBook, RobotoRegular } from '../../assets/fonts/font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { authState, messageState } from '../../Actions/Atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { exportAction } from '../../Actions/TestActions';
import DateRangePicker from '../Components/Modules/DateRangePicker';

const windowWidth = Dimensions.get('window').width;

const ExportScreen = ({ navigation }) => {

  const setMessage = useSetRecoilState(messageState)
  const authData = useRecoilValue(authState)
  // console.log("authData?.id", authData?.data?.id);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address.')
      .required('Please enter email address'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      email: __DEV__ ? "pallab_pki@hotmail.com" : "",
      uid: authData?.data?.id,
      from_date: "",
      to_date: ""
    },
    onSubmit: (values, actions) => {
      if (values?.from_date === "" && values?.to_date === "") {
        actions.setSubmitting(false)
        setMessage({
          type: 'success',
          status: true,
          message: "Please select date range."
        });
      } else {
        exportAction(values, actions, navigation)
      }
    }
  })

  const { setFieldValue, handleSubmit, values, errors, touched, isSubmitting } = formik

  return (
    <Main>
      <StatusBar translucent backgroundColor={"#FFFFFF"} barStyle="dark-content" />
      <View style={{
        flex: 1,
        paddingTop: 40,
        marginHorizontal: -15,
        marginVertical: -15,
        backgroundColor: "#FFFFFF"
      }}>
        <View style={{ alignItems: "center", marginTop: Platform.OS === "ios" ? 10 : 0 }}>
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
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <Text style={{ fontFamily: GothamBook, fontSize: 22, fontWeight: "500", marginBottom: 20 }}>{`Date(s)`}</Text>
                {values?.dateRange?.firstDate && values?.dateRange?.secondDate &&
                  <Text style={{ fontFamily: GothamBook, fontSize: 14, fontWeight: "500", marginBottom: 20, color: "#7F7F7F" }}>
                    {`${moment(values?.dateRange?.firstDate).format("DD MMM YYYY")} - ${moment(values?.dateRange?.secondDate).format("DD MMM YYYY")}`}
                  </Text>}
              </View>
              <View style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: "#CCCCCC",
                paddingVertical: 10
              }}>
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
                    backgroundColor: "#FEEBE0"
                  }}
                  selectedDateStyle={{
                    fontWeight: "bold",
                    color: "#000000",
                  }}
                /> */}

                <DateRangePicker
                  onSuccess={(s, e) => {
                    setFieldValue("from_date", s);
                    setFieldValue("to_date", e);
                  }}
                  theme={{ markColor: 'rgba(246, 92, 0, 1)', markTextColor: 'white' }} />

              </View>
              <Text style={{ fontFamily: GothamBook, fontSize: 22, marginVertical: 20 }}>Recipient</Text>
              <TextField
                label={errors?.email && touched?.email ? errors?.email : "Email Address"}
                error={touched.email && errors.email}
                value={values?.email}
                onChangeText={(text) => setFieldValue("email", text)}
                keyboardType="email-address"
                inputMode="email"
                autoCapitalize={false}
              />
            </KeyboardAwareScrollView>
          </View>
          <View style={{
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: -55,
            backgroundColor: "#FFFFFF"
          }}>
            <View style={{ width: windowWidth * .5 }}>
              <ButtonSolidRound
                title="Export"
                onPress={handleSubmit}
                loading={isSubmitting}
                contentStyle={{ height: 55, width: windowWidth * .5 }} />
            </View>
          </View>
        </View>
      </View>
    </Main>
  )
}

export default ExportScreen