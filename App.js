import 'react-native-gesture-handler';
import Drawer from "./src/stacks/drawer"
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Mycontex from './src/compo/contex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Children } from 'react';

export default function App() {
  let [authtoken, setauthtoken] = useState(null);
  let [user, setuser] = useState(null);
  let [globaldisplay, setdisplay] = useState("flex");

  let getauth = async () => {
    if (!authtoken) {
      let token = await AsyncStorage.getItem("@AuthToken")
      setauthtoken(token ? token : false);
      return;
    }

    let res = await fetch("http://192.168.243.184:5000/user/info", {
      headers: {
        "authtoken": authtoken
      },
    });
    let data = await res.json();
    setuser(data.msg);
  }


  useEffect(() => {
    getauth();
  }, [authtoken])



  return (<>

    <NavigationContainer>
      <Mycontex.Provider value={{ authtoken, user, setuser, setauthtoken, globaldisplay, setdisplay }}>
        <Drawer />
      </Mycontex.Provider>
    </NavigationContainer>

    {/* <Ani /> */}
  </>
  );
}