

import {
    View, Text, StyleSheet, ImageBackground, TextInput, Switch, ScrollView, KeyboardAvoidingView, TouchableOpacity, Image,
} from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react'
import FlashMessage from "react-native-flash-message";


import { Picker } from '@react-native-picker/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faCamera, faL } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons"
import PhoneInput from "react-native-phone-number-input";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mycontex from '../compo/contex';
import { showMessage, hideMessage } from "react-native-flash-message";




const Signup = ({ navigation }) => {

    let { setauthtoken } = useContext(Mycontex);

    useEffect(() => {
        setcaret(false);
        setmycaret(false);
    }, [])

    let [caret, setcaret] = useState(true);
    let [mycaret, setmycaret] = useState(true)

    let [name, setname] = useState({
        text: "",
        err: ""
    });
    let [mail, setmail] = useState({
        text: "",
        err: ""
    });
    let [number, setnumber] = useState({
        text: "",
        err: ""
    });
    let [code, setcode] = useState("US")
    let [psd, setpsd] = useState({
        text: "",
        err: ""
    });
    let [isstudent, setstudent] = useState(false);

    let [university, setuniversity] = useState({
        text: "",
        err: ""
    });
    let [universitymail, setuniversitymail] = useState({
        text: "",
        err: ""
    });
    let [avoid, setavoid] = useState(false);

    let nameRef = useRef(null);
    let mailRef = useRef(null);

    let psdRef = useRef(null);
    let phone = useRef(null);

    let resetAll = () => {
        setname({
            text: "",
            err: ""
        });
        setmail({
            text: "",
            err: ""
        });
        setnumber({
            text: "",
            err: ""
        });
        setpsd({
            text: "",
            err: ""
        });
        setuniversitymail({
            text: "",
            err: ""
        });
        setuniversity({
            text: "",
            err: ""
        });
        phone.current.state.number = "";
    }


    let validateName = (text) => {
        let ar = text?.trim().split(" ");
        let ok = true;
        if (text?.trim() == "") {
            ok = false;
            setname((name) => {
                return {
                    ...name,
                    err: "Full name can't be empty"
                }
            })
        } else if (ar.length < 2) {
            ok = false;
            setname((name) => {
                return {
                    ...name,
                    err: "Enter Full name"
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

    let validateNo = (text) => {
        // console.log(number.text);
        // console.log(phone.current.state)
        let ok = true;

        if (text.trim().length != 10) {
            setnumber((number) => {
                ok = false;
                return {
                    ...number,
                    err: "Phone no should be of 10 digits"
                }
            });
            // if(text.trim().length>10){
            //     setnumber((number)=>{
            //         return {
            //             ...number,
            //             text:Number(text.toString().substr(0,10))
            //         }
            //     })
            //     phone.current.state.number = Number(text.toString().substr(0,10));
        } else {
            setnumber((number) => {
                return {
                    ...number,
                    err: null
                }
            })
        }
        return ok;

    }


    let validateuniversity = (text) => {
        let ok = true;

        if (text == 0) {
            ok = false;
            setuniversity((university) => {
                return {
                    ...university,
                    err: "Please select University"
                }
            })
        } else {
            setuniversity((university) => {
                return {
                    ...university,
                    err: null
                }
            })
        }
        return ok;

    }

    let validateumail = (text) => {
        let mailRegx = /^[a-z0-9_.-]{3,}@[a-z]{2,12}\.[a-z.]{2,}$/;
        let ok = true;
        if (text?.trim() == "") {

            setuniversitymail((mail) => {
                return {
                    ...mail,
                    err: "University Email can't be empty"
                }
            })
            ok = false;

        } else if (/[A-Z]/.test(text)) {
            setuniversitymail((mail) => { return { ...mail, err: "Capital letters are not allowed" } });
            ok = false;

        } else if (!mailRegx.test(text)) {
            setuniversitymail((mail) => { return { ...mail, err: "Enter proper mail" } });
            ok = false;

        } else {
            setuniversitymail((mail) => { return { ...mail, err: "" } });
        }
        return ok;
    }

    let validateForm = () => {
        let ismail = validateEmail(mail.text);
        let ispsd = validatepsd(psd.text);
        let isName = validateName(name.text);
        let isphone = validateNo(number.text);
        if (isstudent) {
            let isuni = validateuniversity(university.text);
            let isunimail = validateumail(universitymail.text);
            return ismail && ispsd && isName && isphone && isuni && isunimail;
        }
        return ismail && ispsd && isName && isphone;
    }


    let handleSignUp = async () => {
        if (validateForm()) {
            let formData = {
                name: name.text,
                mail: mail.text,
                password: psd.text,
                ccode: code,
                phone: number.text,
            }
            if (isstudent) {
                formData['university'] = university.text;
                formData['umail'] = universitymail.text;
            }
            // console.log(formData)

            let res = await fetch("http://192.168.43.184:5000/user/signup", {
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
        setactiveinput(0);
    }

    return (
        <View style={{ flex: 1 }}>

            {/* <KeyboardAvoidingView
                    // style={{ flex: 1 }}
                    behavior='position'
                    enabled={avoid}
                > */}


            <ImageBackground source={require("../kuch/abc.jpg")} style={{
                borderBottomLeftRadius: 28,
                borderBottomRightRadius: 28,
                overflow: 'hidden',

            }}>

                <LinearGradient colors={["transparent", "#ff914c5e", "#ff914c"]}>


                    <View style={signup.header}>
                        <Text style={{ fontSize: 30, color: "white", fontWeight: 'bold' }}>Sign up</Text>
                        <Text style={{ color: "white", fontSize: 15 }}>Please create a new account
                        </Text>
                        <TouchableOpacity style={signup.skip}>
                            <Text style={{ color: "white", fontSize: 12 }}>Skip</Text>
                        </TouchableOpacity>

                    </View>
                </LinearGradient>


            </ImageBackground>

            <ScrollView  >

                <View style={{ flex: 1 }}>


                    <View style={signup.logo}>
                        <View style={
                            {
                                position: "relative",
                                borderRadius: 50,
                                backgroundColor: "#3b3b3b26",
                                padding: 13,
                                borderWidth: 2,
                                borderColor: "#20232a38"
                            }
                        }>
                            <FontAwesomeIcon icon={faUser} size={45} color="grey" />
                            <View style={{ position: "absolute", bottom: -5, right: 0, borderRadius: 50, backgroundColor: "#ff8303", padding: 7, }}>
                                <FontAwesomeIcon icon={faCamera} size={17} color="white"
                                />
                            </View>
                        </View>
                    </View>



                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>


                        <View>
                            <TextInput
                                ref={nameRef}
                                placeholder='Full Name'
                                value={name.text}
                                onChangeText={(text) => {
                                    setname((name) => { return { ...name, text } })
                                    validateName(text);
                                }
                                }
                                style={[signup.input, activeinput === 1 && signup.active,
                                name.err && {
                                    borderColor: "red",
                                }]}
                                onFocus={() => {
                                    setactiveinput(1); setavoid(false)
                                }}
                                onSubmitEditing={() => {
                                    mailRef.current.focus();
                                }}
                                onBlur={clearselect} />

                            {name.err ? <Text > {name.err}</Text> : null}

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
                                }]}
                                onSubmitEditing={() => {
                                    psdRef.current.focus();
                                }} onFocus={() => {
                                    setactiveinput(2);
                                }}
                                onBlur={clearselect} />

                            {mail.err ? <Text > {mail.err}</Text> : null}

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
                                    borderColor: "red"
                                }]} onFocus={() => {
                                    setactiveinput(4); setavoid(false)
                                }}
                                secureTextEntry
                                onSubmitEditing={() => {

                                }}
                                onBlur={clearselect} />

                            {psd.err ? <Text > {psd.err}</Text> : null}

                        </View>
                        <View >
                            <PhoneInput
                                // disableArrowIcon={true}
                                // value={number}
                                ref={phone}
                                defaultValue={number.text}
                                defaultCode={code}
                                value={number.text}

                                containerStyle={[{
                                    borderColor: "#b3b0b0",
                                    borderWidth: 1.5,
                                    borderRadius: 7,
                                    width: "100%",
                                    marginVertical: 7,
                                    padding: 0
                                }, number.err && {
                                    borderColor: "red"
                                }]}

                                textInputStyle={{
                                    padding: 0,
                                    margin: 0
                                }}
                                flagButtonStyle={{
                                    color: "red",
                                    backgroundColor: "transparent",
                                    opacity: 1.5
                                }}
                                layout='first'
                                placeholder="Phone Number"
                                onChangeCountry={(txt) => {
                                    setcode(txt.cca2);
                                }}
                                onChangeText={(text) => {
                                    setnumber((number) => {
                                        return { ...number, text }
                                    });
                                    validateNo(text);
                                }

                                }
                            // style={[signup.input, activeinput === 3 && signup.active]}
                            // onFocus={() => {
                            //     console.log("ddbaj")
                            //     setactiveinput(3); setavoid(false)
                            // }}
                            // onSubmitEditing={() => {
                            //     psdRef.current.focus();
                            // }}
                            // onBlur={clearselect}
                            />

                            {number.err ? <Text> {number.err}</Text> : null}


                        </View>


                        <View>
                            <View style={signup.option}>
                                <Text style={{ color: "black" }}>Are you a student ?</Text>

                                <Switch
                                    value={isstudent}
                                    thumbColor={isstudent ? "#e39342" : "white"}
                                    trackColor={{ "true": "#c3ac71ad", "false": "grey" }}
                                    onValueChange={() => {
                                        setstudent(!isstudent);
                                        setmycaret(false);
                                    }}
                                />
                            </View>
                            {
                                isstudent &&
                                <>
                                    <View>

                                        <View style={[{
                                            borderColor: "#b3b0b0",
                                            color: "black",
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            marginVertical: 7
                                        }, university.err && {
                                            borderColor: "red"
                                        }]}>

                                            <Picker
                                                mode='dropdown'
                                                selectedValue={university.text}
                                                onValueChange={(item) => {
                                                    setuniversity((university) => { return { ...university, text: item } })
                                                    validateuniversity(item);
                                                }}
                                                style={{ color: "gray", padding: 0 }}
                                            >
                                                <Picker.Item label='Select University' value='0' />

                                                <Picker.Item label='Sardar patel' value='Sardar patel' />

                                                <Picker.Item label='DDU' value='DDU' />

                                                <Picker.Item label='GTU' value='GTU' />

                                            </Picker>

                                        </View>
                                        {university.err ? <Text> {university.err}</Text> : null}
                                    </View>
                                    <View>

                                        <TextInput

                                            placeholder='University Email'
                                            style={[signup.input, activeinput === 5 && signup.active, universitymail.err && {
                                                borderColor: "red"
                                            }]}
                                            value={universitymail.text}
                                            onChangeText={(text) => {
                                                setuniversitymail((universitymail) => {
                                                    return {
                                                        ...universitymail, text
                                                    }
                                                })
                                                validateumail(text);
                                            }}
                                            keyboardType='email-address'
                                            onBlur={clearselect}
                                            onFocus={() => {
                                                setmycaret(false)
                                                setactiveinput(5);
                                                setavoid(false)
                                            }}
                                            caretHidden={mycaret} />

                                        {universitymail.err ? <Text > {universitymail.err}
                                        </Text> : null}
                                    </View>
                                </>
                            }

                        </View>

                        <TouchableOpacity onPress={() => { handleSignUp() }}>
                            <Text style={signup.submit}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={signup.footer}>
                        <Text style={signup.topmar}>OR</Text>
                        <Text style={[signup.topmar, {
                            color: "black"
                        }]}>Enter via social networks</Text>
                        <View style={[{
                            flexDirection: 'row', justifyContent: "center",
                        }, signup.topmar]}>

                            <View style={[signup.circle, { backgroundColor: "#DB4437", marginRight: 15 }]}>
                                <FontAwesomeIcon icon={faGoogle} size={22} color="white" />
                            </View>
                            <View style={[signup.circle, { backgroundColor: "#4267B2" }]}>
                                <FontAwesomeIcon icon={faFacebookF} size={22} color="white" />
                            </View>

                        </View>
                        <View style={signup.topmar}></View>
                        <Text style={signup.topmar}>
                            Already have an account?
                            <Text onPress={() => {
                                navigation.navigate("login")
                            }} style={signup.color}> Sign in</Text>
                        </Text>
                        <Text style={signup.topmar}>
                            By creating account you agree with our
                            <Text style={signup.color}> Terms of Use</Text>
                        </Text>
                    </View>

                </View>

            </ScrollView >
            {/* </KeyboardAvoidingView > */}

        </View >


    )
}

let signup = StyleSheet.create({
    header: {
        height: 160,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 15,
        backgroundColor: "#0d0d0e61"
    },
    logo: {
        alignItems: "center",
        paddingTop: 10
    },
    active: {
        color: "black",
        borderColor: "#e39342",
        borderWidth: 2,
    },
    input: {
        borderColor: "#b3b0b0",
        borderRadius: 7,
        borderWidth: 1.5,
        fontSize: 15,
        paddingHorizontal: 17,
        paddingVertical: 12,
        fontSize: 17,
        marginVertical: 7
    },
    skip: {

        position: "absolute", top: 20, right: 20,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        backgroundColor: "#ff914c"

    }
    ,
    submit: {
        backgroundColor: "#ff914c",
        color: "white",
        padding: 15,
        marginTop: 10,
        borderRadius: 5,
        fontWeight: '600',
        fontSize: 17,
        textAlign: 'center'
    },
    option: {
        marginVertical: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        left: 5
    },
    color: {
        color: "#ff8303"
    },
    footer: {
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    topmar: {
        marginVertical: 2
    },
    circle: {

        borderRadius: 50,
        padding: 13
    }
})

export default Signup

