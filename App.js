import 'react-native-gesture-handler';
import Drawer from "./src/stacks/drawer"
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import Mycontex from './src/compo/contex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ani from './src/ani';






export default function App() {

  let getauth = async () => {
    let token = await AsyncStorage.getItem("@AuthToken")
    setauthtoken(token ? token : false);
  }

  useEffect(() => {
    getauth();
  }, [])

  let [authtoken, setauthtoken] = useState(null);
  let [globaldisplay, setdisplay] = useState("flex");

  return (<>

    <NavigationContainer>
      <Mycontex.Provider value={{ authtoken, setauthtoken, globaldisplay, setdisplay }}>
        <Drawer />
      </Mycontex.Provider>
    </NavigationContainer>

    {/* <Ani /> */}
  </>
  );
}