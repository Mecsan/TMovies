
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import Stack from './stack';
// import Aboutstack from './aboutstack';
import Tabnav from './tab'
import LoginStack from './loginstack';
import CustomDrawer from '../compo/customDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faAddressCard } from '@fortawesome/free-solid-svg-icons';

const Drawer = () => {
    let drawer = createDrawerNavigator();
    return (

        <drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={
                {
                    drawerPosition: "right",
                    drawerType: 'front',
                    drawerStyle: {
                        backgroundColor: "white",
                        width: "85%"
                    },
                    drawerItemStyle: {
                        borderWidth: 2,
                        borderColor: "black",
                    },
                    drawerActiveBackgroundColor: "#191919",
                    drawerActiveTintColor: "white",
                    drawerInactiveBackgroundColor: "white",
                    drawerInactiveTintColor: "black",
                    headerShown: false,
                    swipeEnabled:false
                }
            }
        >
              

            <drawer.Screen
                name="tab"
                component={Tabnav}

                options={
                    {
                       
                        // drawerItemStyle:{
                        //     borderColor:"red",
                        //     borderWidth:2
                        // },
                        drawerIcon: ({ color }) => {
                            return <FontAwesomeIcon icon={faHome} color={color} size={20} />
                        }

                    }
                } />
                 <drawer.Screen
                name="signin"
                component={LoginStack}
            />

            {/* <drawer.Screen
                name="aboutstack"
                component={Aboutstack}
                options={
                    {
                        headerShown: false,
                        drawerIcon: ({ color }) => {
                            return <FontAwesomeIcon icon={faAddressCard} color={color} size={20} />
                        }
                    }
                } /> */}


         




        </drawer.Navigator>

    )
}

export default Drawer