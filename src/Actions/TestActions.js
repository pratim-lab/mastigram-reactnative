import { setRecoil } from "recoil-nexus";
import { loadingState, messageState, testListState, testByIDState } from "./Atoms";
import Api from "./Api";

export const getTestListAction = async (values) => {
    // console.log("getTestListAction value", values);
    setRecoil(loadingState, {
        status: true,
        type: "screen"
    })
    Api.post(`get-test-list`, values)
        .then(({ data }) => {
            // console.log("log-test", data);
            if (data.status === true) {
                setRecoil(testListState, data?.data?.data);
            } else {
                setRecoil(testListState, []);
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

export const getTestByIDAction = async (values) => {
    setRecoil(loadingState, {
        status: true,
        type: "screen"
    })
    Api.post(`get-test-by-id`, values)
        .then(({ data }) => {
            // console.log("log-test_by_id", data);
            if (data.status === true) {
                setRecoil(testByIDState, data?.data);
            } else {
                setRecoil(testByIDState, {});
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

export const logTestAction = async (values, actions, navigation) => {
    // console.log(values);
    Api.post(`log-test`, values)
        .then(({ data }) => {
            console.log("log-test", data);
            if (data.status === true) {
                setRecoil(messageState, {
                    type: 'success',
                    status: true,
                    message: data.message
                });
                navigation.navigate("TestRecords")
                actions.resetForm();
            } else {
                actions.setErrors(data.error)
                // setRecoil(messageState, {
                //     type: 'warn',
                //     status: true,
                //     message: data?.error?.email?.[0]
                // });
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

export const logResultAction = async (values, actions, navigation) => {
    // console.log(values);
    Api.post(`log-test-result`, values)
        .then(({ data }) => {
            console.log("log-result", data);
            if (data.status === true) {
                setRecoil(messageState, {
                    type: 'success',
                    status: true,
                    message: data.message
                });
                // navigation.navigate("TestRecords")
                navigation.navigate("TestDetails", { id: values.test_id })
                actions.resetForm();
            } else {
                setRecoil(messageState, {
                    type: 'warn',
                    status: true,
                    message: "Something went wrong. Please try again."
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

export const exportAction = async (values, actions, navigation) => {
    console.log(values);
    Api.post(`sendTestResultMail`, values)
        .then(({ data }) => {
            console.log("log-result-export", data);
            if (data.status) {
                // setRecoil(messageState, {
                //     type: 'success',
                //     status: true,
                //     message: data.message
                // });
                navigation.navigate("ExportSuccess")
                actions.resetForm();
            } else {
                // navigation.navigate("ExportSuccess")
                setRecoil(messageState, {
                    type: 'warn',
                    status: true,
                    message: data.message
                });
            }
            actions.setSubmitting(false)
        }).catch((error) => {
            console.log(error);
            actions.setSubmitting(false)
        })
}

export const deleteMultiAction = async (values, setOpenCheckbox, closeSwipeable) => {
    console.log(values);
    setRecoil(loadingState, {
        status: true,
        type: "screen"
    })
    Api.post(`testMultipleDelete`, values)
        .then(({ data }) => {
            console.log("log-result-export", data);
            if (data.status) {
                setRecoil(messageState, {
                    type: 'success',
                    status: true,
                    message: data.message
                });
                setOpenCheckbox && setOpenCheckbox(false)
                closeSwipeable && closeSwipeable()

                getTestListAction({
                    result_type: "active"
                })
            } else {
                setRecoil(messageState, {
                    type: 'warn',
                    status: true,
                    message: data.message
                });
            }
            setRecoil(loadingState, {
                status: false,
                type: "screen"
            })
        }).catch((error) => {
            console.log(error);
        })
}

export const sendReporMultiAction = async (values, actions, setOpenCheckbox, setOpenEmail, setEmailAddress) => {
    // console.log(values);
    setRecoil(loadingState, {
        status: true,
        type: "screen"
    })
    Api.post(`shareTestResultMail`, values)
        .then(({ data }) => {
            // console.log("log-result-export", data?.error?.testIds);
            if (data.status) {
                setRecoil(messageState, {
                    type: 'success',
                    status: true,
                    message: data.message
                });
                setOpenCheckbox(false)
                setOpenEmail(false)
                setEmailAddress()
            } else {
                actions.setErrors(data?.error)
            }
            setRecoil(loadingState, {
                status: false,
                type: "screen"
            })
        }).catch((error) => {
            console.log(error);
        })
}