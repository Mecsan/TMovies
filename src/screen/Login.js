

import {
  View,
  Text, StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native'

import { showMessage, hideMessage } from "react-native-flash-message";
import React, { useRef, useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faL } from '@fortawesome/free-solid-svg-icons'
import LinearGradient from 'react-native-linear-gradient';
import Mycontex from '../compo/contex';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ navigation }) => {


  let [ispending, setpending] = useState(false)
  let { authtoken, setauthtoken } = useContext(Mycontex);
  let [caret, setcaret] = useState(true);

  useEffect(() => {
    setcaret(false);

    return () => {
      setcaret(true);
    }
  }, [])
  let [mail, setmail] = useState(
    {
      text: "",
      errmsg: ""
    }
  );
  let [psd, setpsd] = useState(
    {
      text: "",
      errmsg: ""
    }
  );
  let [selectedText, setselectedText] = useState(0);

  let mailRef = useRef(null);
  let psdRef = useRef(null);

  let handleback = () => {
    navigation.goBack();
  }

  let gosignup = () => {
    navigation.navigate("signup");
  }

  let clearselect = () => {
    setselectedText(0);
  }

  let resetAll = () => {
    setmail({
      text: "",
      err: ""
    });
    setpsd({
      text: "",
      err: ""
    })
  }

  let validate_Set_Email = (text) => {
    var ok = true;
    let mailRegx = /^[a-z0-9_.-]{3,}@[a-z]{2,12}\.[a-z.]{2,}$/;
    if (text == "") {
      setmail((mail) => { return { ...mail, errmsg: "Email must be required" } });
      ok = false;
    } else if (/[A-Z]/.test(text)) {
      setmail((mail) => { return { ...mail, errmsg: "Capital letters are not allowed" } });
      ok = false;
    } else if (!mailRegx.test(text)) {
      setmail((mail) => { return { ...mail, errmsg: "Enter proper mail" } });
      ok = false;
    } else {
      setmail((mail) => { return { ...mail, errmsg: "" } });
    }
    setmail((mail) => { return { ...mail, text } });
    return ok;
  }

  let validate_Set_Pass = (text) => {
    var ok = true;
    let psdRegx = /^[a-z!@#$%^&*_.A-Z0-9]{8,16}$/

    setpsd((psd) => { return { ...psd, text } })
    if (text == "") {
      setpsd((psd) => { return { ...psd, errmsg: "Password can't be empty" } });
      ok = false;
    } else if (!psdRegx.test(text)) {
      setpsd((psd) => { return { ...psd, errmsg: "Password should be 8-16 char" } });
      ok = false;

    } else {
      setpsd((psd) => { return { ...psd, errmsg: null } });
    }
    return ok;
  }

  let validateForm = async () => {
    let ismail = validate_Set_Email(mail.text);
    let ispsd = validate_Set_Pass(psd.text);
    let formData = {
      mail: mail.text,
      password: psd.text
    }
    if (ismail && ispsd) {
      setpending(true);
      let res = await fetch("http://192.168.43.184:5000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      let data = await res.json();
      if (data.success) {
        // setauthtoken(formData.mail);
        resetAll();
        setauthtoken(data.msg);
        console.log(data);
        try {
          await AsyncStorage.setItem("@AuthToken", data.msg);
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
          duration: 3000
        })
      }

      setpending(false);
    }
  }

  return (
    <ScrollView>

      <ImageBackground source={{
        uri: "https://images.unsplash.com/photo-1569591803741-6246fbc6934c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }}  >

        <LinearGradient colors={["transparent", "#00000075"]}>

          <View style={login.main}>


            <View style={login.innermain}>

              <TouchableOpacity onPress={handleback} style={login.back}>
                <FontAwesomeIcon icon={faAngleLeft} size={26} color="white" />
              </TouchableOpacity>

              <View style={login.logo}>
                <Image
                  source={require('../kuch/logo.png')} />
              </View>

              <View style={login.form}>
                <View style={login.inputcon}>
                  <TextInput
                    ref={mailRef}
                    caretHidden={caret}
                    onBlur={clearselect}
                    onSubmitEditing={() => {
                      psdRef.current.focus();
                      // console.log(psdRef.current)
                    }}

                    onFocus={() => { setselectedText(1) }}
                    placeholder='Email'
                    keyboardType='email-address'
                    style={[login.input, selectedText === 1 && login.active, mail.errmsg && {
                      color: "red",
                      borderBottomColor: "red"
                    }]}
                    value={mail.text}
                    onChangeText={(text) => {
                      validate_Set_Email(text);
                    }
                    }

                  />
                  <Text style={login.err}>
                    {mail.errmsg && <Text > {mail.errmsg}</Text>}
                  </Text>
                </View>

                <View style={login.inputcon}>
                  <TextInput
                    ref={psdRef}
                    onFocus={() => { setselectedText(2) }}
                    placeholder='Password'
                    style={[login.input, selectedText === 2 && login.active, psd.errmsg && {
                      color: "red",
                      borderBottomColor: "red"
                    }]}
                    value={psd.text}
                    secureTextEntry
                    onChangeText={(text) => {
                      validate_Set_Pass(text);
                    }
                    }
                    onBlur={clearselect}
                  />
                  <Text style={login.err}>
                    {psd.errmsg && <Text >{psd.errmsg}</Text>}
                  </Text>


                </View>
                <TouchableOpacity onPress={validateForm}>
                  <Text style={[login.submit]}>
                    {
                      ispending ? <ActivityIndicator size={28} />
                        :
                        'Sign in'
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={login.footer}>
                Don't have an account?
                <Text style={{ color: "#e39342" }} onPress={gosignup}> Sign up</Text>
              </Text>
            </View>
          </View >

        </LinearGradient>
      </ImageBackground >
    </ScrollView>
  )
}

let login = StyleSheet.create({
  main: {
    // flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
    height: Dimensions.get("window").height * 1,
    backgroundColor: "#19191947"
  },
  innermain: {
    height: Dimensions.get("window").height * 0.6,
    justifyContent: "space-between"
  },

  input: {
    padding: 0,
    // width:"100%",
    borderBottomColor: "#2f2c2a2b",
    borderBottomWidth: 1,
    fontSize: 17,
    color: "#000000ad",
  },
  inputcon: {
    marginTop: 10,
    marginHorizontal: 20
  },
  active: {
    color: "#b93840",
    // borderBottomColor: "#fb459e"
  },
  form: {
    paddingTop: 30,

    width: Dimensions.get("window").width * 0.87,
    backgroundColor: "white",
  },
  submit: {
    backgroundColor: "#ff8303ad",
    color: "white",
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 12
  },
  back: {
    alignSelf: "flex-start",
    position: "relative",
    left: -10
  },
  footer: {
    color: "white",
    fontSize: 16
  },
  err: {
    display: "flex",
    color: "red",
    flexDirection: "row",
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingRight: 10,
    paddingTop: 2
  },
  logo: {
    scaleX: 0.6,
    scaleY: 0.6
  }

})

export default Login