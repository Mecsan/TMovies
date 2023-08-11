import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart as reg } from '@fortawesome/free-regular-svg-icons';
import { faHeart as sol } from '@fortawesome/free-solid-svg-icons';
import LoginbModal from './loginmodalcon';
import Mycontex from "./contex";

const AddTofav = ({ navigation, id }) => {

    let [isfav, setisfav] = useState(null);
    let [open, setopen] = useState(false);

    let { authtoken } = useContext(Mycontex);

    let closemodal = () => {
        setopen(false);
    }


    useEffect(() => {

        if (authtoken) {

            let url = "https://tmovies-v29u.onrender.com/movies/" + id;

            setisfav(null)

            fetch(url, {
                headers: {
                    "authtoken": authtoken
                }
            }).then((res) => res.json()).
                then((data) => {
                    setisfav(data.msg);
                })

        }
    }, [])

    let handlefav = () => {
        if (authtoken) {
            if (isfav) {
                // remove from fav

                setisfav(null);

                let url = "https://tmovies-v29u.onrender.com/movies/" + id;
                fetch(url, {
                    headers: {
                        "authtoken": authtoken
                    },
                    method: "DELETE",
                }).
                    then((res) => res.json()).
                    then((data) => {
                        if (data.success) {
                            setisfav(false);
                        }
                    })


            } else {
                // add in fav

                setisfav(null);

                let url = "https://tmovies-v29u.onrender.com/movies/";
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authtoken": authtoken
                    },
                    body: JSON.stringify({ id: id })

                }).
                    then((res) => res.json()).
                    then((data) => {
                        if (data.success) {
                            setisfav(true);
                        }
                    })
            }
        } else {
            setopen(true);
        }
    }

    return (
        <>
            <TouchableOpacity style={[style.abs, isfav && style.fav]} onPress={handlefav}>
                {

                    <>

                        <Text style={style.text}>
                            {isfav == null ?
                                <ActivityIndicator size={30} /> :
                                isfav ? "Remove" : "Add"}</Text>
                        {isfav ?
                            <FontAwesomeIcon icon={sol} size={23} color="red" /> :
                            <FontAwesomeIcon icon={sol} size={23} color="white" />
                        }
                    </>
                }
            </TouchableOpacity>
            <Modal
                animationType='fade'
                visible={open}
                transparent={true}
            >
                <LoginbModal close={closemodal} navigation={navigation} />
            </Modal>
        </>
    )
}

let style = StyleSheet.create({
    abs: {
        flexDirection: "row",
        justifyContent: "center",
        width: "50%",
        paddingVertical: 12,
        borderRadius: 18,
        backgroundColor: "#11a125"
    },
    text: {
        fontSize: 18,
        color: "white",
        fontWeight: "600",
        letterSpacing: 1,
        paddingRight: 15
    }

})

export default AddTofav