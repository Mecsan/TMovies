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
import BackButton from '../compo/back';


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
      let res = await fetch("http://192.168.243.184:5000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      let data = await res.json();
      if (data.success) {
        setauthtoken(data.msg);
        resetAll();
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
        uri: "https://i.pinimg.com/originals/89/e3/f4/89e3f48f85a29fc958ee70a3f9f943ad.jpg"
      }}  >

        <LinearGradient colors={["#11a12545", "black"]}>

          <View style={login.main}>



            <View style={{position:"relative",alignSelf:"flex-start"}}>
              <BackButton press={handleback} />
            </View>

            <View style={login.form}>

              <Text style={login.header}>
                Log in
              </Text>

              <View style={[login.inputcon, mail.errmsg && {
                marginBottom: 2
              }]}>
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
                    borderColor: "red",

                  }]}
                  value={mail.text}
                  onChangeText={(text) => {
                    validate_Set_Email(text);
                  }
                  }

                />
                {mail.errmsg ? <Text style={login.err}> {mail.errmsg}</Text> : null}
              </View>

              <View style={[login.inputcon, psd.errmsg && {
                marginBottom: 2
              }]}>
                <TextInput
                  ref={psdRef}
                  onFocus={() => { setselectedText(2) }}
                  placeholder='Password'
                  style={[login.input, selectedText === 2 && login.active, psd.errmsg && {
                    borderColor: "red",

                  }]}
                  value={psd.text}
                  secureTextEntry
                  onChangeText={(text) => {
                    validate_Set_Pass(text);
                  }
                  }
                  onBlur={clearselect}
                />
                {psd.errmsg ? <Text style={login.err}>{psd.errmsg}</Text> : null}


              </View>
              <TouchableOpacity onPress={validateForm}>
                <Text style={[login.submit]}>
                  {
                    ispending ? <ActivityIndicator size={28} />
                      :
                      'Log in'
                  }
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={login.footer}>
                Don't have an account?
                <Text style={{ color: "#11a125" }} onPress={gosignup}> Sign up</Text>
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
    backgroundColor: "#19191947",

  },


  inputcon: {
    marginBottom: 10,
  },

  header: {
    marginLeft: 3,
    fontSize: 27,
    color: "white",
    marginBottom: 20,
    fontWeight: "700"
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
    color: "grey"
  },
  active: {
    borderColor: "#11a125",
    borderWidth: 2,
  },
  form: {
    width: "85%",
  },
  submit: {
    backgroundColor: "#11a125",
    color: "white",
    padding: 15,
    borderRadius: 7,
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center'
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