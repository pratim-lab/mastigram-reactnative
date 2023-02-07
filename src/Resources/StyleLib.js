import { StyleSheet } from 'react-native'
import Colors from './Colors';

const StyleLib = StyleSheet.create({
    container: {
        flex: 1,
     },
     contentContainer:{
        padding: 15,
        backgroundColor: Colors.lightColor,
     },
     row: {
        flexDirection: 'row'
     },
     spacedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
     },
})

export default StyleLib