import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const Logintocon = ({navigation}) => {
    return (
        <View style={style.con}>
            <Text style={style.text}>Login first to see favourites</Text>
            <TouchableOpacity onPress={()=>{
                navigation.navigate("signin")
            }}>
                <Text style={style.login}>Login </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Logintocon

let style = StyleSheet.create({
    con: {
        height:Dimensions.get('window').height,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#0d1216"
    },
    text: {
        marginBottom:15,
        color: "white",
        borderRadius: 10,
        fontSize: 19
    }, login: {
        paddingVertical:10,
        paddingHorizontal:30,
        borderRadius:20,
        backgroundColor: "#11a125",
        color: "white"
    }

})