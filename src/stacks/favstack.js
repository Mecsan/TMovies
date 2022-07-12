import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Fav from '../screen/fav';
import Favinfo from '../screen/Favinfo';

const Favstack = () => {

    let favstack = createNativeStackNavigator();
    return (
        <favstack.Navigator screenOptions={{
            headerShown: false
        }}>
            <favstack.Screen name='fav' component={Fav}   />
            <favstack.Screen name='favinfo' component={Favinfo}
                
            />
        </favstack.Navigator>
    )
}

export default Favstack