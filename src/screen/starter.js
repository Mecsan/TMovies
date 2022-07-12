import { View, Text, TouchableOpacity,SafeAreaView,StyleSheet } from 'react-native'
import React from 'react'

const Starter = ({ navigation }) => {
    return (
        <SafeAreaView style={style.main}>
            <Text>Starter</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate("login")
            }}>
                <Text>Login to your acc</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

let style = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Starter