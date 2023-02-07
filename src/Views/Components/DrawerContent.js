import React from "react";
import Icons from "../../Resources/Icons";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { StyleSheet, TouchableOpacity, View, Image, StatusBar } from "react-native";
import { Drawer } from "react-native-paper";
import Animated from "react-native-reanimated";
import Colors from '../../Resources/Colors';
import { CommonActions } from '@react-navigation/native';
export default function DrawerContent(props) {

  return (
    <DrawerContentScrollView {...props}>
      <StatusBar barStyle="default" backgroundColor={Colors.themeColor} />
      <Animated.View
        style={ styles.drawerContent }>
        <View style={styles.userInfoSection}>
          <View style={styles.drawerHeaderContainer}>
            <TouchableOpacity
              style={styles.drawerHeader}
              onPress={() => { props.navigation.navigate("Shop details") }}
            >
              <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                {/* <Avatar.Image
                  style={styles.draderHeaderImage}
                  source={profileData && profileData.shops && profileData.shops.length > 0 && profileData.shops[0].logo_url ?
                    { uri: profileData.shops[0].logo_url } :
                    require('../../Resources/Images/d-profile.png')}
                  size={50}
                /> */}
                {/* <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    {profileData && profileData.shops && profileData.shops.length > 0 ? profileData.shops[0].name : "Shop Name"}
                  </Paragraph>
                </View> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.MaterialCommunityIcons
                name="view-dashboard-outline"
                color={color}
                size={size}
              />
            )}
            onPress={() => { props.navigation.navigate('Dashboard') }}
            label="Dashboard"
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.MaterialCommunityIcons
                name="chair-rolling"
                color={color}
                size={size}
              />
            )}
            onPress={() => { props.navigation.navigate('Barber list', {route: "Chair"}) }}
            label="Manage Chair"
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.Entypo
                name="back-in-time"
                color={color}
                size={size}
              />
            )}
            label="Working Hours"
            onPress={() => { props.navigation.navigate("WorkingHour") }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.Fontisto
                name="shopping-store"
                color={color}
                size={20}
              />
            )}
            label="Manage Shop"
            onPress={() => props.navigation.dispatch(
              CommonActions.navigate('Shop details')
            )}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.MaterialCommunityIcons
                name="scissors-cutting"
                color={color}
                size={size}
              />
            )}
            label="Barbers"
            onPress={() => { props.navigation.navigate("Barbers") }}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.AntDesign
                name="infocirlceo"
                color={color}
                size={size}
              />
            )}
            label="About"
            onPress={() => { props.navigation.navigate("About") }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.AntDesign
                name="questioncircleo"
                color={color}
                size={size}
              />
            )}
            label="FAQs"
            onPress={() => { props.navigation.navigate("Faqs") }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.AntDesign
                name="customerservice"
                color={color}
                size={size}
              />
            )}
            label="Support"
            onPress={() => { props.navigation.navigate("Support") }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.Ionicons
                name="ios-globe"
                color={color}
                size={size}
              />
            )}
            label="Online Portal"
            onPress={() => { props.navigation.navigate("OnlinePortal") }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icons.MaterialCommunityIcons
                name="shield-check-outline"
                color={color}
                size={size}
              />
            )}
            label="Security"
            onPress={() => { props.navigation.navigate("Security") }}
          />
        </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  // userInfoSection: {
  //   paddingLeft: 20
  // },

  drawerHeaderContainer: {
    backgroundColor: Colors.themeColor,
    marginLeft: -20,
    marginTop: -75,
    marginRight: -20,
    paddingTop: 50,
    alignItems: 'center'
  },
  drawerHeader: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: -20
  },
  draderHeaderImage: {
    // marginTop: 20,
    width: 60,
    height: 60,
    resizeMode: 'stretch',
    margin: 10
  },
  title: {
    marginTop: 20,
    fontWeight: "bold"
  },
  caption: {
    fontSize: 14,
    lineHeight: 14
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
    color: Colors.lightColor
  },
  drawerSection: {
    marginTop: 15
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16
  }
});