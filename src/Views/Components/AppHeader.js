import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Appbar, TextInput, Searchbar } from "react-native-paper";
import Colors from '../../Resources/Colors';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../Resources/Icons';
import StyleLib from '../../Resources/StyleLib';
// import { logoutAction } from '../../Redux/Actions/AuthAction';


const AppHeader = ({ scene, previous, navigation }) => {

   // const { options } = scene?.descriptor;
   const windowWidth = Dimensions.get('window').width;
   const safeNavigation = useNavigation();

   const cartIcon = require('../../Resources/app-icon/cart.png')
   const heartIcon = require('../../Resources/app-icon/heart.png')

   const [text, setText] = React.useState('');

   return (
      <Appbar.Header style={styles.headerContainer}>
         <View style={{
            justifyContent: 'flex-start',
            width: windowWidth * .1,
            padding: 0,
            margin: 0
         }}>
            {previous ?
               <Appbar.BackAction
                  onPress={() => safeNavigation.goBack()}
               /> :
               // <TouchableOpacity onPress={() => navigation.openDrawer()}>
               <TouchableOpacity>
                  <Icons.Entypo name="menu" size={30} color="#FFF" />
               </TouchableOpacity>}
         </View>
         <View style={{
            width: windowWidth * .62,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center'
         }}>
            <TextInput
               placeholder="Search"
               value={text}
               onChangeText={text => setText(text)}
               style={{
                  height: 40,
                  width: '100%',
                  backgroundColor: 'rgb(45, 73, 125)',
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 20
               }}
               selectionColor={'#FFF'}
               theme={{
                  colors: {
                     text: '#FFF',
                     placeholder: '#FFF',
                  },
                  roundness: 20
               }}
            />
         </View>
         <View style={{
            justifyContent: 'flex-end',
            width: windowWidth * .15
         }}>
            <View style={[StyleLib.row, { justifyContent: 'space-around', alignItems: 'center' }]}>
               <Image
                  source={heartIcon}
                  style={{
                     width: windowWidth * .05,
                     height: windowWidth * .05,
                  }} />
               <Image
                  source={cartIcon}
                  style={{
                     width: windowWidth * .060,
                     height: windowWidth * .060,
                  }} />
            </View>
         </View>
      </Appbar.Header>
   )
}

const styles = StyleSheet.create({
   headerContainer: {
      paddingLeft: 10,
      paddingRight: 20,
      justifyContent: 'space-around'
   }
})

export default AppHeader