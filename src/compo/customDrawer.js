import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'

import { DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import Mycontex from './contex'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faUserPen, faAngleRight, faLock, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient'




const CustomDrawer = (props) => {

    // for(i in props){
    //     console.log(i,props[i]);
    // }
    let { authtoken, setauthtoken } = useContext(Mycontex);


    let logout = async () => {
        try {
            await AsyncStorage.removeItem("@AuthToken");
        } catch (e) {
            console.log(e)
        }
        setauthtoken(false);
    }

    let gosignin = () => {
        props.navigation.navigate("signin");
    }
    let handleConfirm = () => {
        Alert.alert("Confirm", "Are u sure want to logout ?",
            [
                {
                    text: "cancel",
                    style: "cancel",
                    onPress: () => { props.navigation.closeDrawer() }
                },
                {
                    text: "Yes",
                    onPress: () => {
                        logout();
                        props.navigation.closeDrawer()
                    }
                },
            ])
    }

    let close = () => {
        props.navigation.closeDrawer()
    }

    return (
        <View style={{
            backgroundColor: "black", width: "100%", height: "100%",
            paddingHorizontal: 20
        }} >


            {/* <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="gel" />
            </DrawerContentScrollView> */}


            <View style={style.header}>
                <TouchableOpacity onPress={close}>
                    <FontAwesomeIcon icon={faArrowLeft} size={18} color='white' />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, flex: 1, textAlign: "center", color: "white", fontWeight: '600' }}>Profile</Text>
            </View>


            <View style={style.info}>
                <Text style={{ color: "#c0bcbce0" }}>Sanket</Text>
                <Text style={{ color: "#c0bcbcb8" }}>mecwansanket333@gmail.com</Text>
            </View>


            <View style={{
                padding: 15,
                flexDirection: "column",
                borderColor: "grey",
                borderWidth: 0.2,
                borderRadius: 6

            }}>
                <Text style={{
                    fontSize: 18, marginBottom: 7,
                    marginLeft: 10,
                    color: "white",
                }}>Account</Text>

                <View style={[style.changeitem, {
                    borderBottomColor: "grey",
                    borderBottomWidth: 0.3,
                }]}>
                    <View style={style.icon}>
                        <FontAwesomeIcon icon={faUserPen} color='#11a125' />
                    </View>
                    <Text style={style.changetext}>Change name</Text>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <FontAwesomeIcon icon={faAngleRight} color='#11a125' />
                    </View>
                </View>

                <View style={style.changeitem}>
                    <View style={style.icon}>
                        <FontAwesomeIcon icon={faLock} color='#11a125' />
                    </View>
                    <Text style={style.changetext}>Change password</Text>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <FontAwesomeIcon icon={faAngleRight} color='#11a125' />
                    </View>
                </View>
            </View>


            <TouchableOpacity onPress={handleConfirm} style={style.logout}>
                <Text style={{
                    marginRight: 12,
                    color: 'black'
                }
                }
                >Logout</Text>
                <FontAwesomeIcon icon={faArrowRightFromBracket} color='#11a125' />
            </TouchableOpacity>


        </View>

    )
}

let style = StyleSheet.create({
    header: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: "center"
    }, info: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 0.3,
        borderColor: "grey",
        borderRadius: 10,
        marginBottom: 15
    },
    changeitem: {
        flexDirection: "row",
        alignItems: "center",
        // paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingVertical: 13,
    },
    changetext: {
        color: "#c0bcbce0",
        fontSize: 14
    }, icon: {
        marginRight: 15,
        padding: 5,
        backgroundColor: "#efeded36",
        borderRadius: 10
    }, logout: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        marginLeft: 5
    }
})

export default CustomDrawer