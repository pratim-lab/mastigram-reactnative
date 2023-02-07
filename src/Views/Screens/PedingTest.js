import { View, Text, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Main from '../Components/Main'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRecoilValue } from 'recoil'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import moment from 'moment'
import ImageHeader from '../Components/ImageHeader'
import { getTestByIDAction } from '../../Actions/TestActions'
import { profileState, testByIDState } from '../../Actions/Atoms'
import { GothamBook } from '../../assets/fonts/font'

const windowWidth = Dimensions.get('window').width;

const PedingTest = ({ route }) => {

    const { id } = route.params;
    const testData = useRecoilValue(testByIDState)
    const profileData = useRecoilValue(profileState)
    const currentTime = moment()
    const testTime = moment(`${testData?.test_date} ${testData?.test_time}`, "YYYY-MM-DD HH:mm:ss")
    const timeDiff = moment.duration(currentTime.diff(testTime)).asSeconds().toFixed(2)
    const remainingData = (Number(profileData?.alert_hour ? profileData?.alert_hour : 7) * 60 * 60) - Number(timeDiff)
    const resultSubmitTime = moment(`${testData?.test_date} ${testData?.test_time}`, "YYYY-MM-DD HH:mm:ss").add(Number(profileData?.alert_hour ? profileData?.alert_hour : 7), "hours").format("YYYY-MM-DD HH:mm:ss")

    useEffect(() => {
        getTestByIDAction({
            test_id: id
        })
    }, [id])

    return (
        <Main>
            <View style={{
                flex: 1,
                marginVertical: -15,
                marginHorizontal: -15,
                paddingHorizontal: 15,
                backgroundColor: "#FFFFFF"
            }}>
                <ImageHeader
                    source={require('../../Resources/Images/banner4.png')}
                    subText={`Test pending`}
                    text={`Cow: ${testData?.cow_no}`}
                    backgroundColor="#7f7f7f"
                    iconColor="#FFFFFF" />
                <View style={{ flex: 1 }}>
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
                            {`${moment(testData?.test_date, "YYYY-MM-DD").format("DD MMM YYYY")} | ${moment(testData?.test_time, "HH:mm:ss").format("HH:mm")}`}
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {testData?.test_date &&
                            <CountdownCircleTimer
                                isPlaying
                                duration={(profileData?.alert_hour ? profileData?.alert_hour : 7) * 60 * 60}
                                initialRemainingTime={remainingData}
                                colors={['#F65C00', '#D0D0D0']}
                                colorsTime={[0, remainingData]}
                                size={windowWidth * .85}
                            >
                                {({ remainingTime }) => <View style={{
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: "600",
                                        marginBottom: 6,
                                        fontFamily: GothamBook
                                    }}>Enter results in</Text>
                                    <Text style={{
                                        fontSize: 60,
                                        fontWeight: "700",
                                        fontFamily: GothamBook
                                    }}>{moment.utc(remainingTime * 1000).format('HH:mm:ss')}</Text>
                                    {/* <Text style={{
                                        fontSize: 16,
                                        marginTop: 10,
                                        fontWeight: "500",
                                        fontFamily: GothamBook
                                    }}><MaterialCommunityIcons name="bell" size={16} color="black" />  {resultSubmitTime}</Text> */}
                                </View>}
                            </CountdownCircleTimer>}
                    </View>
                </View>
            </View>
        </Main>
    )
}

export default PedingTest