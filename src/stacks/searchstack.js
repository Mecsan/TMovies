import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screen/search';
import SearchInfo from '../screen/searchinfo';


const Searchstack = () => {

    let seStack = createNativeStackNavigator();

    return (
        <seStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <seStack.Screen name='search' component={Search} />
            <seStack.Screen name='seDetail' component={SearchInfo} />
        </seStack.Navigator>
    )
}

export default Searchstack