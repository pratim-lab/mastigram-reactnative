import { View, Dimensions, TouchableOpacity, FlatList, StatusBar, Platform, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Dialog, FAB, Portal, Text } from 'react-native-paper'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import _ from 'lodash'
import moment from 'moment'
import ScreenTitle from '../Components/Modules/ScreenTitle'
import Main from '../Components/Main'
import Colors from '../../Resources/Colors'
import { deleteMultiAction, getTestListAction, sendReporMultiAction } from '../../Actions/TestActions'
import { useRecoilState, useRecoilValue } from 'recoil'
import { appTourState, authState, fcmTokenState, profileState, testListState } from '../../Actions/Atoms'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import { useIsFocused } from '@react-navigation/native'
import FilterDialog from '../Components/FilterDialog'
import { saveToken } from '../../Resources/pushNotificationManager'
import { GothamBook } from "../../assets/fonts/font";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextFieldMultiline from '../Components/Modules/TextFieldMultiline';
import AppTooltrip from '../Components/Modules/AppTooltrip';

const TestRecords = ({ navigation }) => {

  const isFocused = useIsFocused();
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [tabAction, setTabAction] = useState("active")
  const [isFilter, setIsFilter] = useState(false)
  const [openCheckbox, setOpenCheckbox] = useState(false)
  const [checkedData, setCheckedData] = useState([])
  const [openEmail, setOpenEmail] = useState(false)
  const authData = useRecoilValue(authState)
  const fcmTokenData = useRecoilValue(fcmTokenState)
  const profileData = useRecoilValue(profileState)
  const testData = useRecoilValue(testListState)
  const [appTour, setAppTour] = useRecoilState(appTourState);

  useEffect(() => {
    appTour !== "complete" && setAppTour("add")
  }, [])

  const emailFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: __DEV__ ? "pallab_pki@hotmail.com" : "",
      testIds: checkedData
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        // .email('Please enter email address')
        .required('Please enter email address')
        .typeError("Please enter email address"),
      // testIds: Yup.array()
      //   .min(1, "Please select test.")
      //   .required('Please select test.')
      //   .typeError("Please select test.")
      testIds: Yup.mixed().test({
        message: 'Please select test.',
        test: val => checkedData.length > 0
      })
    }),
    onSubmit: (values, actions) => {
      sendReporMultiAction(values, actions, setOpenCheckbox, setOpenEmail)
    }
  })

  const [openFilter, setOpenFilter] = React.useState({
    status: false,
    data: {
      result_type: "",
      from_date: "",
      to_date: "",
      test_result: "",
    }
  });

  const tableRows = () => testData?.reduce((acc, curr) => {
    const { test_date } = curr;
    const findEl = acc.find(
      (o) => o.test_date === test_date
    );
    if (findEl) {
      findEl.data.push(curr);
    } else {
      acc.push({ test_date, data: [{ ...curr }] });
    }
    return acc;
  }, []);

  const activeTime = (testDate, testTime) => {
    const dateTime = moment(`${testDate} ${testTime}`, "YYYY-MM-DD HH:mm:ss")
    const now = moment()
    return moment.duration(now.diff(dateTime)).asHours().toFixed(2)
  }

  const alertHour = profileData?.alert_hour ? Number(profileData?.alert_hour) : 7

  // console.log(alertHour);

  useEffect(() => {

    getTestListAction({
      result_type: "active"
    })
    setTabAction("active")
    const hasToken = _.isEmpty(fcmTokenData)
    if (authData?.token && hasToken) {
      saveToken()
    }
    setOpenCheckbox(false)

  }, [isFocused, authData?.token, fcmTokenData])

  // console.log(checkedData);
  const handleCheckBox = async (value) => {
    const existingItem = checkedData?.find(item => item === value)
    if (!existingItem) {
      setCheckedData([...checkedData, value])
    } else {
      const removeItem = checkedData?.filter(item => item !== value)
      setCheckedData(removeItem)
    }
  }

  let rowRefs = new Map();

  const handleDelete = (data) => {
    Alert.alert('Are you sure', 'Do you want to delete the record(s)?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => deleteMultiAction(data, setOpenCheckbox) },
    ]);
  }

  const rightSwipeActions = (row) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleDelete({ testIds: [row?.id] })
        }}
        style={{
          backgroundColor: '#ff5353',
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          width: 80,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: '600',
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderItem = ({ item, index }) => (
    <View>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Text style={{
          fontWeight: "500",
          fontSize: Platform.OS === "android" ? 18 : 20,
          marginVertical: 15,
          marginHorizontal: 15,
          fontFamily: GothamBook,
        }}>{`${moment(item.test_date).format('ddd, MMM DD')}`}</Text>
        {index === 0 &&
          <View style={{
            flexDirection: "row",
            marginRight: 15
          }}>
            <TouchableOpacity
              onPress={() => {
                if (!isFilter) {
                  setOpenFilter({ status: true });
                } else {
                  getTestListAction({
                    result_type: tabAction
                  })
                }
                setIsFilter(!isFilter);
              }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20
              }}>
                {isFilter ?
                  <>
                    <MaterialCommunityIcons name="close-thick" size={14} color="red" />
                    <Text style={{ color: "red" }}>Clear Filter</Text>
                  </> :
                  <>
                    <MaterialCommunityIcons name="tune-vertical-variant" size={12} color="black" />
                    <Text>Filter</Text>
                  </>}
              </View>
            </TouchableOpacity>
            {openCheckbox ?
              <TouchableOpacity
                onPress={() => {
                  setOpenCheckbox(false);
                  setCheckedData([])
                }}>
                <Text style={{ fontFamily: GothamBook }}>Done</Text>
              </TouchableOpacity> :
              <TouchableOpacity
                onPress={() => {
                  setOpenCheckbox(true);
                  setCheckedData([])
                }}>
                <Text style={{ fontFamily: GothamBook }}>Select</Text>
              </TouchableOpacity>}
          </View>}
      </View>
      {item?.data?.map((row, idx) =>
        <View
          key={idx}
          style={{
            backgroundColor: "#FFFFFF",
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
            elevation: 4,
            marginBottom: 15,
            borderRadius: 12,
          }}>
          <Swipeable
            key={row.id}
            ref={ref => {
              if (ref && !rowRefs.get(row.id)) {
                rowRefs.set(row.id, ref);
              }
            }}
            onSwipeableWillOpen={() => {
              [...rowRefs.entries()].forEach(([key, ref]) => {
                if (key !== row.id && ref) ref.close();
              });
            }}
            renderRightActions={() => rightSwipeActions(row)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 12,
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (row?.result_date === null) {
                    if (Number(activeTime(row.test_date, row.test_time)) < alertHour) {
                      navigation.navigate("PendingTest", { id: row.id })
                    } else {
                      navigation.navigate("LogResult", { id: row.id })
                    }
                  } else {
                    navigation.navigate("TestDetails", { id: row.id })
                  }
                }}
                onLongPress={() => setOpenCheckbox(true)}>
                <View style={{
                  paddingLeft: 12,
                  paddingVertical: 24,

                }}>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: openCheckbox ? windowWidth * .8 : windowWidth * .86
                    // width: openCheckbox ? windowWidth * .8 : "90%"
                  }}>
                    <View>
                      <Text style={{
                        fontSize: Platform.OS === "android" ? 16 : 18,
                        fontWeight: "600",
                        color: Colors.textColor,
                        fontFamily: GothamBook,
                      }}>Cow #: {row.cow_no}</Text>
                      <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: 7 }}>
                        <EvilIcons name="clock" size={16} color="#7F7F7F" />
                        {row?.result_date === null ? <>
                          <Text style={{
                            color: "#7F7F7F",
                            fontSize: 12,
                            fontFamily: GothamBook
                          }}> Test Taken: </Text>
                          <Text style={{
                            color: "#7F7F7F",
                            fontSize: 12,
                            fontFamily: GothamBook
                          }}>{moment(row.test_time, "HH:mm:ss").format("HH:mm")}</Text>
                        </> :
                          <>
                            <Text style={{
                              color: "#7F7F7F",
                              fontSize: 12,
                              fontFamily: GothamBook
                            }}> Result Entered: </Text>
                            <Text style={{
                              color: "#7F7F7F",
                              fontSize: 12,
                              fontFamily: GothamBook
                            }}>{moment(row.result_time, "HH:mm:ss").format("HH:mm")}</Text>
                          </>}
                      </View>
                    </View>
                    <View>
                      {row?.result_date === null ?
                        <AppTooltrip isVisible={appTour === "result"}>
                          <ButtonSolidRound
                            // onPress={() => {
                            //   Number(activeTime(row.test_date, row.test_time)) < alertHour ?
                            //     navigation.navigate("PendingTest", { id: row.id }) :
                            //     navigation.navigate("LogResult", { id: row.id });
                            // }}
                            title={Number(activeTime(row.test_date, row.test_time)) < alertHour ? "Pending" : "Enter test result"}
                            // disabled={Number(activeTime(row.test_date, row.test_time)) < alertHour}
                            contentStyle={{
                              height: 32,
                              padding: 0,
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: Number(activeTime(row.test_date, row.test_time)) < alertHour ? "#D0D0D0" : "rgba(246, 92, 0, 1)"
                            }}
                            labelStyle={{
                              fontSize: 12,
                              color: "#FFFFFF"
                            }} />
                        </AppTooltrip> :
                        <ButtonSolidRound
                          // onPress={() => navigation.navigate("TestDetails", { id: row.id })}
                          title={row.test_result === "Negative" ? "Mastigram+ Negative" : "Mastigram+ Positive"}
                          // disabled={true}
                          contentStyle={{
                            height: 32,
                            backgroundColor: row.test_result === "Positive" ? "rgba(243, 210, 219, 1)" : "rgba(218, 232, 208, 1)",
                            fontFamily: GothamBook
                          }}
                          labelStyle={{
                            fontSize: 12,
                            color: row.test_result === "Positive" ? "rgba(195, 28, 74, 1)" : "rgba(106, 164, 66, 1)",
                            fontFamily: GothamBook
                          }} />
                      }
                    </View>
                  </View>
                  <View>
                    {row?.result_date !== null &&
                      <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 15,
                        marginLeft: 3,
                      }}>
                        <View style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center"
                        }}>
                          <FontAwesome5 name="prescription-bottle" size={12} color="#7F7F7F" />
                          <Text style={{
                            color: "#7F7F7F",
                            fontSize: 12,
                            fontFamily: GothamBook,
                          }}> {row.product_name}</Text>
                        </View>
                        <View style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          marginLeft: 10
                        }}>
                          <MaterialCommunityIcons name="timer-sand-empty" size={12} color="#7F7F7F" />
                          <Text style={{
                            color: "#7F7F7F",
                            fontSize: 12,
                            fontFamily: GothamBook
                          }}> Withhold: </Text>
                          <Text style={{
                            color: "#7F7F7F",
                            fontSize: 12,
                            fontFamily: GothamBook
                          }}>{row.withhold} {row.withhold > 1 ? "Days" : "Day"}</Text>
                        </View>
                      </View>}
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{ width: windowWidth * .15, justifyContent: "flex-end", alignItems: "flex-end" }}>
                {openCheckbox &&
                  <View style={{
                    marginRight: 20,
                  }}>
                    <Checkbox.Item
                      onPress={(e) => handleCheckBox(row.id)}
                      status={checkedData?.find((item) => item === row?.id) ? 'checked' : 'unchecked'}
                      mode="android"
                      color="rgba(246, 92, 0, 1)"
                      style={{
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                        margin: 0,
                      }} />
                  </View>}
              </View>
            </View>
          </Swipeable>
        </View>)}
    </View>
  );

  return (
    <Main>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor={"#f5f5f5"} barStyle="dark-content" />
        <View style={{ flex: 1, height: windowHeight * .88, position: "relative" }}>
          <View style={{ height: "90%", zIndex: 999 }}>
            <View style={{ marginLeft: 20, marginTop: Platform.OS === "ios" ? 10 : 0 }}>
              <ScreenTitle>Test Records</ScreenTitle>
            </View>
            <View style={{
              height: 45,
              backgroundColor: "rgba(0, 0, 0, 0.06)",
              marginTop: 15,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center"
            }}>
              <TouchableOpacity
                onPress={() => {
                  setTabAction("active");
                  if (isFilter) {
                    getTestListAction({
                      from_date: openFilter?.data?.from_date,
                      to_date: openFilter?.data?.to_date,
                      result_type: "active",
                      test_result: ""
                    })
                  } else {
                    getTestListAction({
                      result_type: "active"
                    })
                  }
                }}
                style={{
                  height: 38,
                  marginLeft: 3,
                  width: "48%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: tabAction === "active" ? "#FFFFFF" : "transparent",
                  borderRadius: 9
                }}>
                <AppTooltrip isVisible={appTour === "active"}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: GothamBook,
                    color: tabAction === "active" ? "rgba(0, 0, 0, 1)" : "#7F7F7F"
                  }}>Active</Text>
                </AppTooltrip>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTabAction("past");
                  if (isFilter) {
                    getTestListAction({
                      from_date: openFilter?.data?.from_date,
                      to_date: openFilter?.data?.to_date,
                      result_type: "past",
                      test_result: ""
                    })
                  } else {
                    getTestListAction({
                      result_type: "past"
                    })
                  }
                }}
                style={{
                  height: 38,
                  marginLeft: 3,
                  width: "48%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: tabAction === "past" ? "#FFFFFF" : "transparent",
                  borderRadius: 9
                }}>
                <AppTooltrip isVisible={appTour === "past"}>
                  <Text style={{
                    fontSize: 16,
                    fontFamily: GothamBook,
                    color: tabAction === "past" ? "rgba(0, 0, 0, 1)" : "#7F7F7F"
                  }}>Past</Text>
                </AppTooltrip>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10, marginBottom: 80, position: "relative" }}>
              {isFilter && tableRows()?.length === 0 &&
                <View style={{
                  flexDirection: "row",
                  marginRight: 15,
                  justifyContent: "flex-end"
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      getTestListAction({
                        result_type: tabAction
                      })
                      setIsFilter(false);
                    }}>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 20
                    }}>
                      <MaterialCommunityIcons name="close-thick" size={14} color="red" />
                      <Text style={{ color: "red" }}>Clear Filter</Text>

                    </View>
                  </TouchableOpacity>
                </View>}
              <GestureHandlerRootView>
                <FlatList
                  nestedScrollEnabled={true}
                  data={tableRows()}
                  renderItem={RenderItem}
                  keyExtractor={item => item.test_date}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={{ marginBottom: 15 }}
                />
              </GestureHandlerRootView>
            </View>
          </View>
          <View style={{
            height: 100,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            // paddingTop: 15,
            backgroundColor: "#FFFFFF",
            zIndex: 999,
            position: "absolute",
            bottom: -15,
            left: -15,
            right: -15,
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          }}>
            <Text style={{
              fontSize: Platform.OS === "android" ? 18 : 20,
              fontFamily: GothamBook,
              fontWeight: Platform.OS === "android" ? "600" : "500"
            }}>Log a Test</Text>
            <AppTooltrip isVisible={appTour === "add"}>
              <FAB
                icon="plus"
                size="large"
                style={{ backgroundColor: "rgba(246, 92, 0, 1)" }}
                onPress={() => navigation.navigate('LogTest', { id: "" })}
              />
            </AppTooltrip>
          </View>
          <FilterDialog
            open={openFilter?.status}
            onClose={() => {
              setOpenFilter(false);
              setIsFilter(false)
            }}
            setData={setOpenFilter}
            tab={tabAction} />
        </View>
        {
          openCheckbox &&
          <View style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 150,
            zIndex: 999,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // width: "100%",
            backgroundColor: "#000000",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <View style={{
              position: "absolute",
              right: 10,
              top: 10
            }}>
              <TouchableOpacity onPress={() => {
                setOpenCheckbox(false)
                setCheckedData([])
              }}>
                <Ionicons name="close-circle-outline" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpenEmail(true)
              }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="share-outline" color={"#FFFFFF"} size={30} />
                <Text style={{
                  color: "#FFFFFF",
                  fontSize: 22,
                  fontFamily: GothamBook,
                  fontWeight: "600",
                  marginLeft: 10
                }}>Share</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // deleteMultiAction({ testIds: checkedData }, setOpenCheckbox)
                handleDelete({ testIds: checkedData })
              }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                <FontAwesome name="trash-o" size={20} color="#FFFFFF" />
                <Text style={{
                  color: "#FFFFFF",
                  marginLeft: 10,
                  fontSize: 18,
                  fontFamily: GothamBook,
                }}>Delete Entries</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      </SafeAreaView>
      <Portal>
        <Dialog visible={openEmail} onDismiss={() => setOpenEmail(false)} style={{ position: "relative" }}>
          <KeyboardAwareScrollView>
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 10 }}
              onPress={() => setOpenEmail(false)}>
              <FontAwesome5 name="times-circle" size={24} color={Colors.errorColor} />
            </TouchableOpacity>
            <Dialog.Title>Email Address</Dialog.Title>
            <Dialog.Content>
              <TextFieldMultiline
                label="E-Mail"
                value={emailFormik.values.email}
                onChangeText={(value) => emailFormik.setFieldValue("email", value)}
              // multiline={true}
              />
              {emailFormik?.errors?.email && emailFormik?.touched?.email && <Text style={{ color: "red" }}>{emailFormik?.errors?.email}</Text>}
              {emailFormik?.errors?.testIds && emailFormik?.touched?.testIds && <Text style={{ color: "red" }}>{emailFormik?.errors?.testIds}</Text>}
              <Text style={{
                marginTop: 5,
                fontSize: 16
              }}>{`For multiple email recipient separate with (;)`}</Text>
            </Dialog.Content>
            <Dialog.Actions style={{
              paddingTop: 0,
              marginTop: 0,
            }}>
              <Button
                mode="contained"
                loading={emailFormik.isSubmitting}
                onPress={emailFormik.handleSubmit}>Done</Button>
            </Dialog.Actions>
          </KeyboardAwareScrollView>
        </Dialog>
      </Portal>
    </Main >
  )
}

export default TestRecords