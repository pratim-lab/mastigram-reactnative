import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native'
import { Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

const AppDropdown = (props) => {
   const { content, label, error, disabled, value, onSelect } = props
   const [onChange, setOnChange] = useState('');
   const [visable, setVisable] = useState(false);
   const filterData = content?.filter(item => item?.label?.toLowerCase().includes(onChange.toLowerCase()))

   return (
      <View>
         <TouchableOpacity onPress={() => setVisable(true)}>
            <View style={styles.inputContainer}>
               <TextInput
                  mode="outlined"
                  label={label}
                  error={error}
                  editable={false}
                  disabled={disabled ? disabled : false}
                  pointerEvents={disabled ? "auto" : "none"}
                  value={value}
                  outlineColor={"#CCCCCC"}
                  theme={{ roundness: 8 }}
                  style={{ backgroundColor: "#FFFFFF" }}
               />
               <SimpleLineIcons style={styles.dropIcon} name="arrow-down" size={20} color="black" />
            </View>
         </TouchableOpacity>
         <Portal>
            <Dialog visible={visable} onDismiss={() => (setVisable(false), setOnChange(''))}>
               <TouchableOpacity
                  onPress={() => (setVisable(false), setOnChange(''))}
                  style={styles.closeButton}>
                  <Ionicons name="close-circle-outline" size={38} color={""} />
               </TouchableOpacity>
               <Dialog.Title>
                  {label}
               </Dialog.Title>
               <Dialog.Content style={styles.container}>
                  {/* <TextInput
                     value={onChange}
                     style={{}}
                     right={<TextInput.Icon name="magnify" />}
                     onChangeText={text => setOnChange(text)}
                  /> */}
                  <FlatList
                     style={styles.itemContainer}
                     data={filterData && filterData}
                     keyExtractor={(item, index) => index.toString()}
                     renderItem={rowData =>
                        <TouchableOpacity onPress={() => (onSelect(rowData.item), setVisable(false), setOnChange(''))}>
                           <Paragraph style={styles.itemLabel}>{rowData.item.label}</Paragraph>
                           <View style={{}}></View>
                        </TouchableOpacity>
                     }
                  />
               </Dialog.Content>
            </Dialog>
         </Portal>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      maxHeight: 450,
      minHeight: 120,
      overflow: 'scroll'
   },
   itemContainer: {
      flex: 1
   },
   label: {
      fontSize: 14,
      position: 'absolute',
      top: -8,
      zIndex: 999,
      paddingLeft: 3,
      paddingRight: 3,
      backgroundColor: '#FFF',
      marginLeft: 15
   },
   inputContainer: {
      position: "relative"
   },
   dropIcon: {
      position: 'absolute',
      right: 10,
      top: 25
   },
   // inputContainer: {
   //    borderWidth: 1,
   //    borderColor: Colors.themeColor,
   //    borderRadius: 3,
   //    width: "100%",
   //    height: 50,
   //    marginBottom: 8,
   //    justifyContent: 'center',
   //    padding: 10
   // },
   inputText: {
      fontSize: 16
   },
   spacedRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   closeButton: {
      position: 'absolute',
      right: 10,
      top: 5,
      zIndex: 999
   },
   itemLabel: {
      paddingTop: 12,
      paddingBottom: 12,
      fontSize: 20
   }
})

export default AppDropdown