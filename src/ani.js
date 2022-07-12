import React, { useState, useEffect,useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView,Animated,Easing } from "react-native";
import Lottie from 'lottie-react-native';

const Ani=()=>{
  const animationProgress = useRef(new Animated.Value(0));
  const animationOpacity = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();

    Animated.timing(animationOpacity.current, {
        toValue: 1,
        duration: 5000,
        delay:1000,
        easing: Easing.linear,
        useNativeDriver: false
      }).start();



  }, [])

    return(
        
< >
<Lottie
      source={require('./data.json')}
      progress={animationProgress.current}
    autoplay
    loop
    />
   
   <Animated.View style={{paddingTop:550,justifyContent:"center",alignItems:"center",opacity:animationOpacity.current}}>
    <TouchableOpacity style={{width:"20%",backgroundColor:"red",borderRadius:10}}>
      <Text style={{fontSize:22,color:"white",padding:7,left:10,}}>
        start
      </Text>
    </TouchableOpacity>
   </Animated.View>
   </>
    );
};

const styles = StyleSheet.create({

}
);

export default Ani;