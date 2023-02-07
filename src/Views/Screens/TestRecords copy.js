import { View, Dimensions, TouchableOpacity, FlatList, Animated, StatusBar, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Dialog, FAB, Portal, Text } from 'react-native-paper'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
// import firebase from '@react-native-firebase/app';
// import messaging from '@react-native-firebase/messaging';
import _ from "lodash"
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment'
import ScreenTitle from '../Components/Modules/ScreenTitle'
import Main from '../Components/Main'
import Colors from '../../Resources/Colors'
import { deleteMultiAction, getTestListAction, sendReporMultiAction } from '../../Actions/TestActions'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authState, fcmTokenState, messageState, profileState, testListState } from '../../Actions/Atoms'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import { useIsFocused } from '@react-navigation/native'
import FilterDialog from '../Components/FilterDialog'
// import { saveFCMTomen } from '../../Actions/AuthActions';
// import { Alert } from 'react-native';
import { saveToken } from '../../Resources/pushNotificationManager'
import { GothamBook } from "../../assets/fonts/font";
import TextField from '../Components/Modules/TextField';

const TestRecords = ({ navigation }) => {

  const isFocused = useIsFocused();
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [tabAction, setTabAction] = useState("active")
  const [isFilter, setIsFilter] = useState(false)
  const [openCheckbox, setOpenCheckbox] = useState(false)
  const [checkedData, setCheckedData] = useState([])
  const [openEmail, setOpenEmail] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")
  const authData = useRecoilValue(authState)
  const fcmTokenData = useRecoilValue(fcmTokenState)
  const profileData = useRecoilValue(profileState)
  const setMessage = useSetRecoilState(messageState)
  // console.log(`Fcm token - ${Platform.OS} - `, fcmTokenData);

  const [openFilter, setOpenFilter] = React.useState({
    status: false,
    data: {
      result_type: "",
      from_date: "",
      to_date: "",
      test_result: "",
    }
  });

  const testData = useRecoilValue(testListState)

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

  useEffect(() => {
    getTestListAction({
      result_type: "active"
    })
    setTabAction("active")

    // Alert.alert("Stored Token", fcmTokenData)
    const hasToken = _.isEmpty(fcmTokenData)
    // console.log(hasToken);
    if (authData?.token && hasToken) {
      saveToken()
    }
  }, [isFocused, authData?.token, fcmTokenData])

  const handleSelect = (value) => {
    setOpenCheckbox(true)
  }

  const handleCheckBox = async (status, value) => {
    if (status === true) {
      setCheckedData([...checkedData, value])
    } else {
      const removeItem = checkedData?.filter(item => item !== value)
      setCheckedData(removeItem)
    }
  }

  const rightSwipeActions = () => {
    return (
      <TouchableOpacity
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
          fontSize: 20,
          marginVertical: 15,
          marginHorizontal: 15,
          fontFamily: GothamBook,
        }}>{`${moment(item.test_date).format('ddd, MMM DD')}`}</Text>
        {index === 0 &&
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
          </TouchableOpacity>}
      </View>
      {item?.data?.map((row, index) =>
        <View
          key={index}
          style={{
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.17,
            shadowRadius: 3.05,
            elevation: 4,
            borderRadius: 12,
            margin: 10
          }}>
          <Swipeable renderRightActions={rightSwipeActions}>
            <TouchableOpacity
              onPress={() => {
                if (row?.result_date === null) {
                  if (Number(activeTime(row.test_date, row.test_time)) < Number(profileData?.alert_hour)) {
                    navigation.navigate("PendingTest", { id: row.id })
                  } else {
                    navigation.navigate("LogResult", { id: row.id })
                  }
                } else {
                  navigation.navigate("TestDetails", { id: row.id })
                }
              }}
              onLongPress={() => handleSelect(item)}>
              <View style={{
                // marginBottom: 10,
                paddingLeft: 12,
                paddingVertical: 24,
              }}>
                <View>
                  <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: openCheckbox ? windowWidth * .8 : windowWidth * .86
                    // width: openCheckbox ? windowWidth * .8 : "90%"
                  }}>
                    <View>
                      <Text style={{
                        fontSize: 18,
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
                        <ButtonSolidRound
                          // onPress={() => {
                          //   Number(activeTime(row.test_date, row.test_time)) < 7 ?
                          //     navigation.navigate("PendingTest", { id: row.id }) :
                          //     navigation.navigate("LogResult", { id: row.id });
                          // }}
                          title={Number(activeTime(row.test_date, row.test_time)) < 7 ? "Pending" : "Enter test result"}
                          // disabled={Number(activeTime(row.test_date, row.test_time)) < 7}
                          contentStyle={{
                            height: 32,
                            padding: 0,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: Number(activeTime(row.test_date, row.test_time)) < 7 ? "#D0D0D0" : "rgba(246, 92, 0, 1)"
                          }}
                          labelStyle={{
                            fontSize: 12,
                            color: "#FFFFFF"
                          }} /> :
                        <ButtonSolidRound
                          // onPress={() => navigation.navigate("TestDetails", { id: row.id })}
                          title={row.test_result === "Negative" ? "Mastigram+ Negative" : "Mastigram+ Positive"}
                          // disabled={true}
                          contentStyle={{
                            height: 32,
                            backgroundColor: row.test_result === "Positive" ? "rgba(243, 210, 219, 1)" : "rgba(218, 232, 208, 1)",
                          }}
                          labelStyle={{
                            fontSize: 12,
                            color: row.test_result === "Positive" ? "rgba(195, 28, 74, 1)" : "rgba(106, 164, 66, 1)"
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
              </View>
            </TouchableOpacity>
          </Swipeable>
          <View style={{ width: windowWidth * .10, justifyContent: "flex-end", alignItems: "flex-end" }}>
            {openCheckbox &&
              <CheckBox
                disabled={false}
                value={item.id}
                onValueChange={(newValue) => handleCheckBox(newValue, row.id)}
                // onChange={(event) => {
                //   console.log("CheckBox", event.target.value);

                // }}
                boxType="square"
                onCheckColor="#FFFFFF"
                onFillColor="rgba(246, 92, 0, 1)"
                tintColors="rgba(246, 92, 0, 1)"
                onTintColor="rgba(96, 90, 86, 1)"
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />}
          </View>
        </View>)}
    </View>
  );

  return (
    <Main>
      <StatusBar translucent backgroundColor={"#f5f5f5"} barStyle="dark-content" />
      <View style={{ flex: 1, paddingTop: 30, height: windowHeight * .88, position: "relative" }}>
        <View style={{ height: "90%", zIndex: 999 }}>
          <View style={{ marginLeft: 20, marginTop: Platform.OS === "ios" ? 10 : 0 }}>
            <ScreenTitle>Test Records</ScreenTitle>
            {/* <Text style={{fontSize: 30}}>MMMMM</Text> */}
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
              <Text style={{
                fontSize: 16,
                fontFamily: GothamBook,
                color: tabAction === "active" ? "rgba(0, 0, 0, 1)" : "#7F7F7F"
              }}>Active Tests</Text>
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
              <Text style={{
                fontSize: 16,
                fontFamily: GothamBook,
                color: tabAction === "past" ? "rgba(0, 0, 0, 1)" : "#7F7F7F"
              }}>Past Tests</Text>
            </TouchableOpacity>
          </View>
          <View style={{ margin: -15, padding: 5 }}>
            <FlatList
              nestedScrollEnabled={true}
              data={tableRows()}
              renderItem={RenderItem}
              keyExtractor={item => item.test_date}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={{
          height: 100,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          // paddingHorizontal: 20,
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
            fontSize: 20,
            fontFamily: GothamBook,
          }}>Log a Test</Text>
          <FAB
            icon="plus"
            size="large"
            style={{ backgroundColor: "rgba(246, 92, 0, 1)" }}
            onPress={() => navigation.navigate('LogTest', { id: "" })}
          />
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
      {openCheckbox &&
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
            // right: 10,
            top: 10
          }}>
            <TouchableOpacity onPress={() => {
              setOpenCheckbox(false)
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
              deleteMultiAction({ testIds: checkedData }, setOpenCheckbox,)
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
        </View>}
      <Portal>
        <Dialog visible={openEmail} onDismiss={() => setOpenEmail(false)}>
          <Dialog.Title>Email Address</Dialog.Title>
          <Dialog.Content>
            <TextField
              label="E-Mail"
              value={emailAddress}
              onChangeText={(value) => setEmailAddress(value)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              onPress={() => {
                if (emailAddress === "") {
                  setOpenCheckbox(false)
                  setMessage({
                    type: 'success',
                    status: true,
                    message: "Please enter valid email address"
                  });
                  setEmailAddress("");
                } else {
                  sendReporMultiAction({
                    email: emailAddress,
                    testIds: checkedData
                  }, setOpenCheckbox, setOpenEmail, setEmailAddress)
                }
              }}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Main>
  )
}

export default TestRecords