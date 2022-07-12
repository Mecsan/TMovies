import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Mycontex from './contex'

const Customheader = ({ navigation }) => {

    let { authtoken } = useContext(Mycontex);

    let [name, setname] = useState("sanket");

    let handlepress = () => {
        if (authtoken) {
            navigation.openDrawer();
        } else {
            navigation.navigate("signin")
        }
    }

    let style = StyleSheet.create({
        con: {
            justifyContent:name?'space-between': "flex-end",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingTop: 25,
            paddingBottom: 10
        }
    })

    return (
        <View style={style.con}>

            {name ? <View style={{ flexDirection: "column",paddingRight:20 }}>
                <Text style={{color:'white',fontSize:13}}>
                    Hello,<Text style={{color:"green",fontSize:15}}> {name} </Text>
                </Text>
                <Text style={{color:'grey',fontSize:12}}>
                    Enjoy your stay here
                </Text>




            </View> : null}
            <TouchableOpacity onPress={handlepress} activeOpacity={1} style={{
                backgroundColor: "#506059b0",
                padding: 10,
                borderRadius: 13
            }}>
                <FontAwesomeIcon icon={faUser} size={18} color="white" />
            </TouchableOpacity>
        </View>
    )
}



export default Customheader