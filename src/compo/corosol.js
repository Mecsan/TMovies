import { View, Text, Dimensions, Image, StyleSheet, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Cors_item = ({ item }) => {

    return (
        <View style={style.cors_con}>
            <ImageBackground style={style.img} source={
                {
                    uri: `https://image.tmdb.org/t/p/w500${item.url}`
                }
            }>
                <LinearGradient style={style.grad} colors={['transparent', '#00000063', 'black']}>
                    <Text style={style.text}>{item.title}</Text>
                </LinearGradient>
            </ImageBackground>

        </View >
    )
}






const Corosol = ({ navigation }) => {

    let type = 'movie';

    let [Corosoldata, setcorosoldata] = useState(null);
    let CorRef = useRef(null);

    const info = (id) => {
        navigation.navigate('movie', { id });
    }


    let specialIds = [
        453395, 317442, 587412, 155, 372058
    ]

    let fetchOne = async (id) => {
        let Api_key = "653fe092082699726c7906a0ec132639";
        let url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${Api_key}`;
        let res = await fetch(url);
        let data = await res.json();
        return data;
    }

    let fetchSpecials = async (arr) => {

        let Alldata = [];
        for (let i of arr) {
            let data = await fetchOne(i);
            Alldata.push({
                id: data.id,
                title: data.title,
                url: data.backdrop_path
            })
            // console.log(data.backdrop_path,data.title,data.id);
        }
        return Alldata;
    }




    useEffect(() => {
        fetchSpecials(specialIds).then(
            (data) => {
                // console.log(data);
                setcorosoldata(data);
            }
        )
    }, [])

    return (
        <View style={{
            paddingVertical: 20,
            paddingHorizontal: 0,
        }}>

            {
                Corosoldata ?
                    <Carousel
                        ref={CorRef}
                        layout='default'
                        data={Corosoldata}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity activeOpacity={1} onPress={() => info(item.id)}>
                                    <Cors_item item={item} />
                                </TouchableOpacity>
                            )
                        }}

                        sliderWidth={Dimensions.get("window").width}
                        itemWidth={Dimensions.get("window").width - 90}
                        // itemHeight={800}
                        // sliderHeight={300}
                        inactiveSlideScale={0.8}
                        

                        inactiveSlideOpacity={0.5}
                        // inactiveSlideShift={10}
                        activeAnimationType='timing'
                        slideStyle={
                            {
                                // backgroundColor: "red",

                                // width:200
                            }
                        }
                        autoplay={true}
                    // loop={true}
                    // loopClonesPerSide={1}

                    // onScroll={(e) => {
                    //     console.log(e)
                    // }}

                    // onSnapToItem={(e) => {
                    //     console.log(e)
                    // }}
                    />
                    : <View></View>
            }

        </View>
    )
}

export default Corosol

let style = StyleSheet.create({
    cors_con: {
    }, grad: {
        position: "relative",
        width: "100%",
        height: 200,
    }, text: {
        position: "absolute",
        bottom: 25,
        left: 15,
        color: "white",
        fontSize: 13,
        width: "70%"

    }, img: {
        borderRadius: 10,
        overflow: "hidden"
    }
})