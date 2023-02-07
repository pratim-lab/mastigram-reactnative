import * as React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { loadingState } from '../../Actions/Atoms';
import Colors from '../../Resources/Colors'

const Loader = () => {
  const loadingData = useRecoilValue(loadingState)
  const isLoading = loadingData?.type === "screen" ? loadingData?.status : false
  // console.log("Loading", loadingData);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isLoading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size={25}
            animating={true}
            color={Colors.colorBasic}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: '#00000010',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 40,
    width: 40,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  }
});

export default Loader