import { setRecoil } from "recoil-nexus";
import { authState, messageState, profileState, fcmTokenState, forgotState } from "./Atoms";
import Api from "./Api";
import { saveToken } from "../Resources/pushNotificationManager";

export const signupAction = async (values, actions, navigation) => {
    // console.log(values);
    Api.post(`auth/signup`, values)
        .then(async({ data }) => {
            // console.log("signupAction", data);
            if (data.status === true) {
                await setRecoil(authState, {
                    token: data?.token,
                    data: data?.data
                })
                setRecoil(messageState, {
                    type: 'success',
                    status: true,
                    message: data.message
                });
                navigation.navigate("Login")
                actions.resetForm();
                await saveToken()
            } else {
                setRecoil(messageState, {
                    type: 'warn',
                    status: true,
                    message: data.message
                });
            }
            actions.setSubmitting(false)
        }).catch((error) => {
            actions.setSubmitting(false)
            console.log(error);
        })
}

export const loginAction = async (values, actions) => {
    Api.post(`auth/login`, values)
        .then(async({ data }) => {
            // console.log("loginAction", data);
            if (data.status === true) {
                await setRecoil(authState, {
                    token: data?.token,
                    data: data?.data
                })
                await actions.resetForm();
                await saveToken()
            } else {
                setRecoil(messageState, {
                    type: 'warn',
                    status: true,
                    message: data?.message
                });
            }
            actions.setSubmitting(false)
        }).catch((error) => {
            setRecoil(messageState, {
                type: 'error',
                status: true,
                message: "Something went wrong. Please try again."
            });
            actions.setSubmitting(false)
        })
}

export const getProfileAction = async () => {
    Api.post(`my-profile`)
        .then(({ data }) => {
            // console.log("getProfileAction", data);
            if (data.status === true) {
                setRecoil(profileState, data?.data)
            } else {
                setRecoil(messageState, {
                    type: 'warn',
                    status: true,
                    message: data?.message
                });
            }
        }).catch((error) => {
            console.log(error);
        })
}

export const saveProfileAction = async (values) => {
    Api.post(`change-profile-setting`, values)
        .then(({ data }) => {
            // console.log(data);
            if (data.status === true) {
                setRecoil(profileState, data?.data)
                setRecoil(messageState, {
                    type: 'success',
                    status: true,
                    message: data?.message
                });
            } else {
                setRecoil(messageState, {
                    type: 'warn',
                    status: true,
                    message: data?.message
                });
            }
        }).catch((error) => {
            console.log(error);
        })
}


export const saveFCMTomen = async (values) => {
    // console.log("saveFCMTomen value", values);
    Api.post(`save-device-token`, values)
        .then(({ data }) => {
            // console.log("saveFCMTomen Responce", data);
            if (data.status === true) {
                setRecoil(fcmTokenState, values.deviceToken)
            }
        }).catch((error) => {
        })
}


export const forgotPasswordAction = async (values, actions, setOpenOtp) => {
    Api.post(`auth/forgot-password`, values)
        .then(async({ data }) => {
            // console.log("loginAction", data);
            if (data.status === true) {
                setOpenOtp(true)
                setRecoil(messageState, {
                    type: 'success',
                    status: true,
                    message: data?.message
                });
            } else {
                setRecoil(messageState, {
                    type: 'warn',
                    status: true,
                    message: data?.message
                });
            }
            actions.setSubmitting(false)
        }).catch((error) => {
            setRecoil(messageState, {
                type: 'error',
                status: true,
                message: "Something went wrong. Please try again."
            });
            actions.setSubmitting(false)
        })
}

export const resetPasswordAction = async (values, actions, setOpenOtp, navigation) => {
    Api.post(`auth/reset-password`, values)
        .then(async({ data }) => {
            // console.log("loginAction", data);
            if (data.status === true) {
                setOpenOtp(false)
                await setRecoil(forgotState, {
                    data: data?.data
                })
                setRecoil(messageState, {
                    type: 'success',
                    status: true,
                    message: data?.message
                });
                navigation.navigate("Login")
            } else {
                setRecoil(messageState, {
                    type: 'warn',
                    status: true,
                    message: data?.errorMessage
                });
            }
            actions.setSubmitting(false)
        }).catch((error) => {
            setRecoil(messageState, {
                type: 'error',
                status: true,
                message: "Something went wrong. Please try again."
            });
            actions.setSubmitting(false)
        })
}
