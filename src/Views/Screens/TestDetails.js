import { View, Text } from 'react-native'
import Share from 'react-native-share';
import React, { useCallback, useEffect, useRef } from 'react'
import RNFS from 'react-native-fs';
import Main from '../Components/Main'
import ButtonSolidRound from '../Components/Modules/ButtonSolidRound'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRecoilValue } from 'recoil'
import moment from 'moment'
import ViewShot from "react-native-view-shot";
import ImageHeader from '../Components/ImageHeader'
import { getTestByIDAction } from '../../Actions/TestActions'
import { testByIDState } from '../../Actions/Atoms'
import { GothamBook } from '../../assets/fonts/font';


// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

const TestDetails = ({ route, navigation }) => {

    const screenRef = useRef();
    const { id } = route.params;
    const testData = useRecoilValue(testByIDState)
    // const setMessage = useSetRecoilState(messageState)

    useEffect(() => {
        getTestByIDAction({
            test_id: id
        })
    }, [id])

    const onCapture = useCallback(() => {
        screenRef.current.capture().then(uri => {
            console.log("do something with ", uri);
            // onShare(uri)
            RNFS.readFile(uri, 'base64').then((res) => {
                let urlString = 'data:image/jpeg;base64,' + res;
                let options = {
                    url: urlString,
                    type: 'image/jpeg',
                };
                Share.open(options)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        err && console.log(err);
                    });
            })
        })
    }, []);

    return (
        <Main>
            <View style={{ flex: 1 }}>
                <ViewShot
                    ref={screenRef}
                    style={{
                        flex: 1,
                        marginVertical: -15,
                        marginHorizontal: -15,
                        paddingHorizontal: 15,
                        backgroundColor: "#FFFFFF"
                    }}
                    options={{ format: 'jpg', quality: 0.9 }}>
                    <ImageHeader
                        source={require('../../Resources/Images/banner3.png')}
                        text={`Cow: ${testData?.cow_no}`}
                        backgroundColor="#000000"
                        iconColor="rgba(208, 208, 208, 1)" />
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ paddingBottom: 30 }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                height: 95,
                                borderColor: "#D0D0D0",
                                borderBottomWidth: 1
                            }}>
                                <View>
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
                                        fontSize: 14,
                                        marginTop: 8,
                                        color: "rgba(127, 127, 127, 1)",
                                        fontWeight: "600",
                                        fontFamily: GothamBook,
                                    }}>
                                        {`${moment(testData?.test_date, "YYYY-MM-DD").format("DD MMM YYYY")} | ${moment(testData?.test_time, "HH:mm:ss").format("HH:mm")}`}
                                    </Text>
                                </View>
                                <View>
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
                                        }}>Result Entered</Text>
                                    </View>
                                    <Text style={{
                                        fontSize: 14,
                                        marginTop: 8,
                                        color: "rgba(127, 127, 127, 1)",
                                        fontWeight: "600",
                                        fontFamily: GothamBook
                                    }}>
                                        {`${moment(testData?.test_date, "YYYY-MM-DD").format("DD MMM YYYY")} | ${moment(testData?.test_time, "HH:mm:ss").format("HH:mm")}`}
                                    </Text>
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
                                }}>Test Result</Text>
                                {/* Test Result */}
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <ButtonSolidRound
                                        title={testData.test_result === "Negative" ? "Mastigram+ Negative" : "Mastigram+ Positive"}
                                        disabled={true}
                                        contentStyle={{
                                            height: 32,
                                            padding: 0,
                                            backgroundColor: testData.test_result === "Positive" ? "rgba(243, 210, 219, 1)" : "rgba(218, 232, 208, 1)",
                                        }}
                                        labelStyle={{
                                            fontSize: 12,
                                            color: testData.test_result === "Positive" ? "rgba(195, 28, 74, 1)" : "rgba(106, 164, 66, 1)"
                                        }} />
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
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    marginBottom: 10,
                                    fontFamily: GothamBook
                                }}>{testData?.treatment}</Text>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    marginBottom: 10
                                }}>
                                    <FontAwesome5 name="prescription-bottle" size={12} color="#7F7F7F" />
                                    <Text style={{ fontFamily: GothamBook, fontSize: 14 }}> Product Name: {testData.product_name}</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}>
                                    <MaterialCommunityIcons name="timer-sand-empty" size={15} color="#7F7F7F" />
                                    <Text style={{ fontFamily: GothamBook, fontSize: 14 }}>Withold period: {testData.withhold} {testData.withhold > 1 ? "Days" : "Day"}</Text>
                                </View>
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
                                }}>Treatment Notes</Text>
                                <Text style={{ fontFamily: GothamBook, fontSize: 14 }}>{testData?.treatment_note}</Text>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </ViewShot>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    marginHorizontal: -15,
                    marginBottom: -15,
                    paddingBottom: 15
                }}>
                    <View style={{ marginRight: 10 }}>
                        <ButtonSolidRound
                            title="Edit Entry"
                            onPress={() => navigation.navigate("LogResult", { id: id, mode: "E" })}
                            icon={"pencil-outline"}
                            contentStyle={{
                                height: 40,
                                backgroundColor: "#e5e5e5",
                                width: 150
                            }}
                            labelStyle={{ color: "#000000" }} />
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <ButtonSolidRound
                            title="Share"
                            onPress={() => {
                                onCapture();
                                // onShare()
                            }}
                            icon={() => <Ionicons name="share-outline" color={"black"} size={18} />}
                            contentStyle={{
                                height: 40,
                                backgroundColor: "#e5e5e5",
                                width: 150
                            }}
                            labelStyle={{ color: "#000000" }} />
                    </View>
                </View>
            </View>
        </Main>
    )
}

export default TestDetails