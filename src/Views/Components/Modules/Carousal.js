import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { GothamBold } from "../../../assets/fonts/font";

const { width, height } = Dimensions.get('window');


export default Carousal = ({ data }) => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  console.log(width * .8, height);

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  return (
    <View style={{
      height: height * .64,
      // backgroundColor: "green"
    }}>
      <ScrollView
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          setSliderPage(event);
        }}>
        {data?.map((item, index) =>
          <View style={{
            width: width,
            height: height * .6,
            alignItems: "center",
            justifyContent: "center"
          }} key={index}>
            <Image source={item.image} style={styles.imageStyle} />
            <View style={{marginBottom: 15}}>
              <Text style={styles.title}>{item.title1}</Text>
              <Text style={[styles.title]}>{item.title2}</Text>
            </View>
            <View>
              <Text style={styles.subTitle}>{item.text1}</Text>
              <Text style={styles.subTitle}>{item.text2}</Text>
              <Text style={styles.subTitle}>{item.text3}</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(3).keys()).map((key, index) => (
          <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 350,
    height: 235,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 15
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 29,
    fontFamily: GothamBold,
  },
  subTitle: {
    color: "#FFFFFF",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 18,
    fontFamily: GothamBold
  },
  paginationWrapper: {
    flexDirection: 'row',
    alignSelf: "center"
  },
  paginationDots: {
    height: 5,
    width: 30,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
  },
});