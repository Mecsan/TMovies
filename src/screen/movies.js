import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Slider from '../compo/Slider'
import Corosol from '../compo/corosol'
import Customheader from '../compo/customheader'

const Movies = ({ navigation }) => {

 
  return (
    <ScrollView>

      <View style={
        {
          backgroundColor: "#031407",
          padding: 1
        }
      }
      >
        <Customheader navigation={navigation}/>
        <Corosol navigation={navigation} />
        <Slider navigation={navigation} type="movie" option="popular" />
        <Slider navigation={navigation} type="movie" option="top_rated"
        />
        <Slider navigation={navigation} type="movie" option="now_playing"
        />
        <Slider navigation={navigation} type="movie" option="upcoming"
        />

      </View >
    </ScrollView>

  )
}

export default Movies