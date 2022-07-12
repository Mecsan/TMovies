import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Seemore = ({fun}) => {
    return (
        <TouchableOpacity style={style.seecon} onPress={fun}>
            {/* <Text>All</Text> */}
            <FontAwesomeIcon icon={faAngleRight} color='grey' size={30}/>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    seecon: {
        height: 180,
        width:80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center"
    }
})

export default Seemore