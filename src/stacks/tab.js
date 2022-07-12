import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import All from '../screen/all'
import Stack from './stack'
import Favstack from './favstack'
import Search from '../screen/search'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faSearch, faHeart } from '@fortawesome/free-solid-svg-icons'
import Mycontex from '../compo/contex'
import Searchstack from './searchstack'





const Tabnav = () => {
    let { globaldisplay } = useContext(Mycontex);


    const bottomTab = createBottomTabNavigator();

    return (
        <bottomTab.Navigator
            initialRouteName='start'
            // tabBar={() => {
            //     return (
            //         <View>
            //             <Text>dhs</Text>
            //         </View>
            //     )
            // }}

            screenOptions={({ route, navigation }) => {
                return (
                    {
                        headerShown: false,

                        // for custom tab button 
                        // tabBarButton: props => {
                        //     return (

                        //         <TouchableOpacity style={{flex:1,alignItems:"center",justifyContent:"center"}} onPress={() => {
                        //             navigation.navigate(route.name)
                        //         }} >
                        //             {
                        //                 props.accessibilityState.selected ?
                        //                     <Text>{route.name}</Text>
                        //                     : <Text>World</Text>

                        //             }
                        //         </TouchableOpacity>

                        //     )
                        // },


                        tabBarLabel: ({ focused }) => {
                            // console.log(route.name)
                            if (focused) {
                                return <View>
                                    <Text style={
                                        {
                                            fontSize: 10,
                                            color: "grey",
                                            marginTop: -8,
                                            marginBottom: 10
                                            // borderBottomColor:"red"
                                        }
                                    }>{route.name == 'start' && 'Home'}
                                        {route.name == 'favstack' && 'Fav'}
                                        {route.name == 'searchstack' && 'Find'}</Text>

                                </View>
                            }
                        },
                        tabBarShowLabel: true,
                        tabBarActiveTintColor: "#11a125"

                    }

                )
            }
                // tabBarLabelPosition:"beside-icon",
                // headerTitle: () => {
                //     return <Text>Hello</Text>
                // },

                // tabBarBackground: () => {
                //     return (
                //         <View style={{backgroundColor:"red",height:"100%"}}>
                //         </View>
                //     )
                // },
            }>

            <bottomTab.Screen name="start" component={Stack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesomeIcon icon={faHome} color={color} size={size} />
                    },
                    tabBarStyle: {
                        display: globaldisplay,
                        backgroundColor: "black",
                        height: 65,
                        borderTopWidth: 0
                    }
                }} />

            <bottomTab.Screen name="searchstack" component={Searchstack}

                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesomeIcon icon={faSearch} color={color} size={size} />
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: {
                        display: globaldisplay,
                        backgroundColor: "black",
                        height: 65,
                        borderTopWidth: 0
                    }

                }
                }
            />

            <bottomTab.Screen name="favstack" component={Favstack}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesomeIcon icon={faHeart} color={color} size={size} />
                    },
                    tabBarStyle: {
                        display: globaldisplay,
                        backgroundColor: "black",
                        height: 65,
                        borderTopWidth: 0
                    }

                }} />
        </bottomTab.Navigator >
    )
}

export default Tabnav