import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screen/Login'
import Signup from '../screen/signup'
import FlashMessage from "react-native-flash-message";

const LoginStack = () => {

    const login = createNativeStackNavigator();

    return (
        <>
            <FlashMessage position="top" />

            <login.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                {/* <login.Screen
                name="start"
            component={Starter} /> */}
                <login.Screen
                    name="login"
                    component={Login}
                />
                <login.Screen
                    name="signup"
                    component={Signup} />
            </login.Navigator>

        </>
    )
}

export default LoginStack