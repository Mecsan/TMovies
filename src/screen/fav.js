import { View, Text } from 'react-native'
import React, { useContext } from 'react';
import Mycontex from '../compo/contex';
import Myfav from '../compo/Myfav';
import Logintocon from '../compo/logintocon';



const Fav = ({ navigation }) => {

  let { authtoken } = useContext(Mycontex);
  return (
    <View style={{flex:1}}>
      {
        authtoken ?
          <Myfav navigation={navigation}/>
          : <Logintocon navigation={navigation} />
      }

    </View>
  )
}

export default Fav