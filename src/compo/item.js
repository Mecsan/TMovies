import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'


const Item = ({ item, handlepress }) => {


    let posterUri = "https://image.tmdb.org/t/p/w500" + item.poster_path;
    // console.log(item)

    return (
        <TouchableOpacity onPress={() => { handlepress(item.id, item.title) }}>
            <View style={style.itemcon}>
                <Image
                    style={style.poster}
                    source={
                        { uri: posterUri }
                    }
                />
                {/* <Text style={style.text}>{item.title}</Text> */}
                
            </View>
        </ TouchableOpacity>

    )
}

let style = StyleSheet.create({
    itemcon: {
        // width: Dimensions.get('window').width/2.5,
        width:155,
        // height: Dimensions.get("window").height/3.4,
        height:200,
        marginRight:10,
        // paddingRight:10,
        // backgroundColor: "black",
        margin: 1,
    },
    poster: {
        borderColor:"grey",
        borderWidth:0.1,
        height:"100%",
        borderRadius: 10
    },
    text: {
        color: "white",
        textAlign: "center",
        paddingTop: 10
    }
})

export default Item