import React, { useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Snackbar } from 'react-native-paper'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { authState, messageState } from '../../Actions/Atoms'
import { getProfileAction } from '../../Actions/AuthActions'
import Loader from './Loader'

const Main = ({ children }) => {
    const messageData = useRecoilValue(messageState)
    // console.log(messageData);
    const resetMessage = useResetRecoilState(messageState)
    const authData = useRecoilValue(authState)


    const getActionCall = useCallback(() => {
        if (authData?.token) {
            getProfileAction();
        }
    }, [authData])

    useEffect(() => {
        getActionCall()
    }, [])

    return (
        <View style={styles.container}>
            {children}
            <View style={{
                width: "100%",
                justifyContent: "center",
                zIndex: 999
            }}>
                <Snackbar
                    duration={3000}
                    visible={messageData?.status}
                    onDismiss={() => resetMessage()}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            resetMessage()
                        },
                    }}
                    style={{ color: "#FFFFFF" }}
                    theme={{ colors: { accent: '#FFFFFF' } }}>
                    {messageData?.message}
                </Snackbar>
            </View>
            <Loader />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        padding: 15,
        backgroundColor: "#F4F6F7",
        height: "100%"
    }
})

export default Main
