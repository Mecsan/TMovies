import { View, Text } from 'react-native'
import React from 'react'
import Iteminfo from '../compo/ItemInfo'

const Favinfo = ({route,navigation}) => {
  return (
    <View style={{flex:1}}>
       <Iteminfo route={route} navigation={navigation}/>
    </View>
  )
}

export default Favinfo