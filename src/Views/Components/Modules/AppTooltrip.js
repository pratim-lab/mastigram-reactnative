import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Tooltip from 'react-native-walkthrough-tooltip';
import { GothamMedium } from '../../../assets/fonts/font';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { appTourState } from '../../../Actions/Atoms';
import { useRecoilState } from 'recoil';

const AppTooltrip = ({ children, isVisible }) => {

    const [appTour, setAppTour] = useRecoilState(appTourState)

    const tripText = appTour === 'add' ? {
        text: "Tap here to log the Mastigram+ Test that you have just taken.",
        placement: "top",
        count: "1",
        next: "active"
    } : appTour === 'active' ? {
        text: "Once you’ve logged a test, the record will show up here.",
        placement: "bottom",
        count: "2",
        next: "past",
    } : appTour === 'past' ? {
        text: "Click here to view past test records.",
        placement: "bottom",
        count: "3",
        next: "export"
    } : appTour === 'export' ? {
        text: "Click here to export test records and send data to email.",
        placement: "top",
        count: "4",
        next: "result"
    } : {
        text: "Click here to enter test results to keep track of treatment.",
        placement: "bottom",
        count: "5",
        next: "complete"
    }

    return (
        <Tooltip
            isVisible={isVisible || false}
            content={
                <View style={{
                }}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                        width: 230
                    }}>
                        <Text style={{ color: "#FFFFFF" }}>{`${tripText?.count}/5`}</Text>
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                alignItems: "center"
                            }}
                            onPress={() => setAppTour(tripText?.next)}>
                            <Text style={{
                                color: "#FFFFFF",
                                fontFamily: GothamMedium
                            }}>SKIP</Text>
                            <FontAwesome5 name="times" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontFamily: GothamMedium,
                    }}>{tripText?.text}</Text>
                </View>}
            placement={tripText?.placement}
            onClose={() => { }}
            backgroundColor="transparent"
            allowChildInteraction={false}
            contentStyle={{
                backgroundColor: "#000000",
                flexWrap: "wrap",
                height: 100,
                width: 250
            }}
        >
            {children}
        </Tooltip>
    )
}

export default AppTooltrip