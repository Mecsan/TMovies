import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


const LoginbModal = ({close,navigation}) => {
    return (
        <View style={style.back}>
            <View style={style.con}>
                <Text onPress={close} style={{alignSelf:"flex-end",position:"relative",top:-10}}>
                    <FontAwesomeIcon icon={faX} size={23} color='red'/>
                </Text>
                <Text onPress={()=>{
                    close();
                    navigation.navigate("signin")
                }} style={style.login}>Login </Text>
                <Text style={style.big}>to continue</Text>
            </View>
        </View>
    )
}


let style = StyleSheet.create({
    con: {
        position: "absolute",
        top:Dimensions.get("window").height/2.5,
        left:"25%",
        right:"25%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "white",
        padding:20,
        borderRadius:20,
    },
    login: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginBottom: 10,
        backgroundColor: "black",
        color: "white"
    }, big: {
        fontSize: 20,
        fontWeight: "900"
    },
    back:{
        width:Dimensions.get("window").width,
        height:Dimensions.get("window").height,
        backgroundColor:"#000000d6",
        position:"relative"
    }
})
export default LoginbModal