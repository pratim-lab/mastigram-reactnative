import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const XDate = require('xdate');

const DateRangePicker = (props) => {

    const { onSuccess, initialRange } = props
    const theme = { markColor: 'rgba(246, 92, 0, 1)', markTextColor: '#FFFFFF' }

    const [isFromDatePicked, setIsFromDatePicked] = useState(false)
    const [isToDatePicked, setIsToDatePicked] = useState(false)
    const [markedDates, setMarkedDates] = useState({})
    const [fromDate, setFromDate] = useState("")

    const setupInitialRange = () => {
        if (!initialRange) {
            return null
        } else {
            const [fromDate, toDate] = initialRange
            const markedDates = { [fromDate]: { startingDay: true, color: theme.markColor, textColor: theme.markTextColor } }
            const [mMarkedDates] = setupMarkedDates(fromDate, toDate, markedDates)
            setMarkedDates(mMarkedDates)
            setFromDate(fromDate)
        }
    }

    useEffect(() => {
        setupInitialRange()
    }, [])

    const onDayPress = (day) => {
        if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
            setupStartMarker(day)
        } else if (!isToDatePicked) {
            // const markedDates = { ...markedDates }
            const [mMarkedDates, range] = setupMarkedDates(fromDate, day.dateString, markedDates)
            if (range >= 0) {
                setIsFromDatePicked(true)
                setIsToDatePicked(true)
                setFromDate(day.dateString)
                setMarkedDates(mMarkedDates)
                onSuccess(fromDate, day.dateString)
            } else {
                setupStartMarker(day)
            }
        }
    }

    const setupStartMarker = (day) => {
        const markedDates = {
            [day.dateString]: {
                startingDay: true,
                color: theme.markColor,
                textColor: theme.markTextColor
            }
        }
        setIsFromDatePicked(true)
        setIsToDatePicked(false)
        setFromDate(day.dateString)
        setMarkedDates(markedDates)
    }

    const setupMarkedDates = (fromDate, toDate, markedDates) => {
        const mFromDate = new XDate(fromDate)
        const mToDate = new XDate(toDate)
        const range = mFromDate.diffDays(mToDate)
        if (range >= 0) {
            if (range == 0) {
                markedDates = {
                    [toDate]: {
                        color: theme.markColor,
                        textColor: theme.markTextColor
                    }
                }
            } else {
                for (var i = 1; i <= range; i++) {
                    const tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
                    if (i < range) {
                        markedDates[tempDate] = {
                            color: theme.markColor,
                            textColor: theme.markTextColor
                        }
                    } else {
                        markedDates[tempDate] = {
                            endingDay: true,
                            color: theme.markColor,
                            textColor: theme.markTextColor
                        }
                    }
                }
            }
        }
        return [markedDates, range]
    }

    return (
        <Calendar
            {...props}
            markingType={'period'}
            current={fromDate}
            markedDates={markedDates}
            onDayPress={(day) => { onDayPress(day) }}
            theme={{
                textSectionTitleColor: '#000000',
                dayTextColor: '#000000',
                arrowColor: "rgba(246, 92, 0, 1)",
                monthTextColor: '#000000',
                textMonthFontWeight: 'bold',
                textMonthFontSize: 16,
            }} />
    )
}

export default DateRangePicker