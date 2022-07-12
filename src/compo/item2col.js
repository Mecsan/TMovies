import { View, Text, StyleSheet,Dimensions, TouchableOpacity,Image } from 'react-native'
import React from 'react'

const Item2col = ({item,navigation,desti}) => {

    return (

        <TouchableOpacity onPress={() => {
            navigation.navigate(desti, { id: item.id, name: item.title })
        }} style={style.con}>
            <Image style={style.post} source={
                {
                    uri: "https://image.tmdb.org/t/p/w500" + item.poster_path
                }
            } />
            {/* <Text style={style.text}>{item.title}</Text> */}
        </TouchableOpacity  >
    )
}


export default Item2col

let style = StyleSheet.create({
    text: {
        color: "white"
    },

    post: {
        borderRadius: 10,
        width: "100%",
        height: 220,
        marginTop:20
    }, con: {
        padding: 5,
        width:"50%"
    }
})