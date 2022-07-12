
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Movies from '../screen/movies';
import All from '../screen/all';
import Movieinfo from '../screen/movieinfo';


const Stack = ({ navigation }) => {

  const stack = createNativeStackNavigator();

  return (


    <stack.Navigator
      backBehavior='history'
      screenOptions={{
        // headerBackVisible:false,
        // headerStyle: {

        //   backgroundColor: "black",
        // },
        // headerTintColor: "white",
        headerShown:false      
      }}>

      <stack.Screen
        name='home'
        component={Movies}
        // options={({ navigation }) => {
        //   return (
        //     { headerTitle: () => <Myheader title="Home" navigation={navigation} /> }
        //   )
        // }}
        options={
          {
            // headerTitle: () => <Myheader title="Home" navigation={navigation} />,

            // headerRight: () => <Mybutton navigation={navigation} />,

            headerStyle: {

              width: "100%",
              // backgroundColor: "black"

            },
            headerTitleStyle: {
              height: 200,
              height: 500,
            }
          }
        }
      />

      <stack.Screen
        name='movie'
        component={Movieinfo}
        options={{
          headerShown: false
        }}
      />

      <stack.Screen
        name='all'
        component={All}
        options={{
          headerShown: false
        }}
      />

    </stack.Navigator>

  )
}

export default Stack