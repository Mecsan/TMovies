import {
    View, Text, StyleSheet, ImageBackground, TextInput, Switch, ScrollView, KeyboardAvoidingView, TouchableOpacity, Image, Keyboard
} from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons"
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mycontex from '../compo/contex';
import { showMessage, hideMessage } from "react-native-flash-message";
import BackButton from '../compo/back';




const Signup = ({ navigation }) => {

    let { setauthtoken,setuser } = useContext(Mycontex);
    // console.log("dsjds")

    useEffect(() => {
        setcaret(false);
        setmycaret(false);
    }, [])

    let [caret, setcaret] = useState(true);
    let [mycaret, setmycaret] = useState(true);

    let [name, setname] = useState({
        text: "",
        err: ""
    });
    let [mail, setmail] = useState({
        text: "",
        err: ""
    });
    let [psd, setpsd] = useState({
        text: "",
        err: ""
    });

    let nameRef = useRef(null);
    let mailRef = useRef(null);
    let psdRef = useRef(null);

    let resetAll = () => {
        setname({
            text: "",
            err: ""
        });
        setmail({
            text: "",
            err: ""
        });
        setpsd({
            text: "",
            err: ""
        });
    }


    let validateName = (text) => {
        let ar = text?.trim().split(" ");
        let ok = true;
        if (text?.trim() == "") {
            ok = false;
            setname((name) => {
                return {
                    ...name,
                    err: "Name can't be empty"
                }
            })
        } else if (text?.trim().length < 3) {
            ok = false;
            setname((name) => {
                return {
                    ...name,
                    err: "Minimum 3 char"
                }
            })
        } else {
            setname((name) => {
                return {
                    ...name,
                    err: null
                }
            })
        }
        return ok;

    }


    let validateEmail = (text) => {
        let ok = true;

        let mailRegx = /^[a-z0-9_.-]{3,}@[a-z]{2,12}\.[a-z.]{2,}$/;
        if (text?.trim() == "") {
            ok = false;

            setmail((mail) => {
                return {
                    ...mail,
                    err: "Email must be required"
                }
            })

        } else if (/[A-Z]/.test(text)) {
            ok = false;

            setmail((mail) => { return { ...mail, err: "Capital letters are not allowed" } })
        } else if (!mailRegx.test(text)) {
            ok = false;

            setmail((mail) => { return { ...mail, err: "Enter proper mail" } });
        } else {
            setmail((mail) => { return { ...mail, err: "" } });
        }
        return ok;

    }

    let validatepsd = (text) => {
        let ok = true;

        let psdRegx = /^[a-z!@#$%^&*_.A-Z0-9]{8,16}$/

        if (text == "") {
            setpsd((psd) => { return { ...psd, err: "Password can't be empty" } });
            ok = false;

        } else if (!psdRegx.test(text)) {
            setpsd((psd) => { return { ...psd, err: "Password should be 8-16 char" } });
            ok = false;

        } else {
            setpsd((psd) => { return { ...psd, err: null } });
        }
        return ok;

    }

    let validateForm = () => {
        let ismail = validateEmail(mail.text);
        let ispsd = validatepsd(psd.text);
        let isName = validateName(name.text);

        return ismail && ispsd && isName;
    }


    let handleSignUp = async () => {
        if (validateForm()) {
            let formData = {
                name: name.text,
                mail: mail.text,
                password: psd.text,
            }

            let res = await fetch("https://tmovies-v29u.onrender.com/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            let data = await res.json();
            console.log(data)

            if (data.success) {
                resetAll();
                setauthtoken(data.msg);
                try {
                    await AsyncStorage.setItem("AuthToken", data.msg);
                    navigation.navigate("home")
                }
                catch (e) {
                    console.log(e);
                }
            } else {
                showMessage({
                    message: data.msg,
                    type: "danger",
                    icon: "danger",
                    duration: 10000
                })
            }
        }
    }
    let [activeinput, setactiveinput] = useState(0);

    let clearselect = () => {
        // console.log("dsbjhds")
        setactiveinput(0);
    }

    let gotoLogin = () => {
        navigation.navigate("login")
    }

    let goback = () => {
        navigation.goBack();
    }

    return (
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => {
            Keyboard.dismiss()
        }}>

            <BackButton press={goback} />

            <ImageBackground
                style={{ flex: 1 }}

                source={{
                    uri: "https://images8.alphacoders.com/100/thumb-1920-1003220.png"
                }}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#11a12545', "black"]}>

                    <View style={{ flex: 1, justifyContent: "center", paddingTop: 50 }}>
                        <Text style={signup.header}>Sign up</Text>
                        <View >
                            <LinearGradient style={signup.maincon} colors={['#0e0e0e9e', 'transparent']} >






                                <View style={{ paddingVertical: 10 }}>


                                    <View>
                                        <TextInput
                                            ref={nameRef}
                                            placeholder='Name'
                                            value={name.text}
                                            onChangeText={(text) => {
                                                setname((name) => { return { ...name, text } })
                                                validateName(text);
                                            }
                                            }
                                            style={[signup.input, activeinput === 1 && signup.active,
                                            name.err && {
                                                borderColor: "red",
                                                marginTop: 5,
                                            }]}
                                            onFocus={() => {
                                                setactiveinput(1);
                                            }}
                                            onSubmitEditing={() => {
                                                mailRef.current.focus();
                                            }}
                                            onBlur={clearselect} />

                                        {name.err ? <Text style={signup.texterr} > {name.err}</Text> : null}

                                    </View>
                                    <View>
                                        <TextInput
                                            caretHidden={caret}
                                            keyboardType='email-address'
                                            ref={mailRef}
                                            placeholder='Email'
                                            value={mail.text}
                                            onChangeText={(text) => {
                                                setmail({ ...mail, text })
                                                validateEmail(text);
                                            }
                                            }
                                            style={[signup.input, activeinput === 2 && signup.active,
                                            mail.err && {
                                                borderColor: "red",
                                                marginTop: 5,
                                            }]}
                                            onSubmitEditing={() => {
                                                psdRef.current.focus();
                                            }} onFocus={() => {
                                                setactiveinput(2);
                                            }}
                                            onBlur={clearselect} />

                                        {mail.err ? <Text style={signup.texterr} > {mail.err}</Text> : null}

                                    </View>
                                    <View>
                                        <TextInput
                                            ref={psdRef}
                                            placeholder='Password'
                                            value={psd.text}
                                            onChangeText={(text) => {
                                                setpsd((psd) => { return { ...psd, text } });
                                                validatepsd(text);
                                            }

                                            }
                                            style={[signup.input, activeinput === 4 && signup.active, psd.err && {
                                                borderColor: "red",
                                                marginTop: 5,
                                            }]} onFocus={() => {
                                                setactiveinput(4);
                                            }}
                                            secureTextEntry
                                            onSubmitEditing={() => {

                                            }}
                                            onBlur={clearselect} />

                                        {psd.err ? <Text style={signup.texterr} > {psd.err}</Text> : null}

                                    </View>


                                    <TouchableOpacity onPress={() => { handleSignUp() }}>
                                        <Text style={signup.submit}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>




                                <Text style={{ fontSize: 15, color: "white", alignSelf: "center", marginTop: 15, marginLeft: 5 }}>Already have an account?
                                    <Text onPress={gotoLogin} style={{ color: "#11a125" }}> Log in</Text>
                                </Text>


                            </LinearGradient>


                        </View>

                    </View >
                </LinearGradient>

            </ImageBackground>
        </TouchableOpacity>




    )
}

let signup = StyleSheet.create({
    maincon: {
        paddingBottom: 20,
        // backgroundColor: "#2d2b2cb3",
        borderRadius: 15,
        margin: 12,
        padding: 0,
        paddingHorizontal: 20,
    },
    header: {
        height: 160,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 15,
        backgroundColor: "#0d0d0e61"
    },
    active: {
        color: "black",
        borderColor: "#11a125",
        borderWidth: 2,
    },
    input: {
        backgroundColor: "#ffffff",
        borderColor: "white",
        borderRadius: 7,
        borderWidth: 1.5,
        fontSize: 15,
        paddingHorizontal: 17,
        paddingVertical: 10,
        fontSize: 17,
        marginTop: 14,
        color: "grey"
    },
    texterr: {
        color: "red",
        textAlign: 'right'
    },
    submit: {
        backgroundColor: "#11a125",
        color: "white",
        padding: 15,
        marginTop: 14,
        borderRadius: 5,
        fontWeight: '700',
        fontSize: 17,
        textAlign: 'center'
    },
    header: {
        fontSize: 30,
        color: "white",
        fontWeight: "900",
        marginLeft: 20,
        marginBottom: 15,
        letterSpacing: 1,
    }




})

export default Signup

