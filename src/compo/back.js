import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


const BackButton = ({press}) => {
    return (
        <TouchableOpacity onPress={press} style={style.backbu}>
            <FontAwesomeIcon icon={faAngleLeft} size={20} color="white" />
        </TouchableOpacity>
    )
}

let style = StyleSheet.create({

    backbu: {
        zIndex: 10,
        position: "absolute",
        top: 20,
        width: 40,
        left: 20,
        backgroundColor: "#506059b0",
        padding: 10,
        borderRadius: 10
    }

})

export default BackButton