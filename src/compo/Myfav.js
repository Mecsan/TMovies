import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useCallback, useEffect } from 'react'
import Item2col from './item2col';
import Mycontex from './contex';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


const Myfav = ({ navigation }) => {

    let { authtoken } = useContext(Mycontex);

    let [fav, setfav] = useState(null)

    let fetchFavmovies = async () => {

        let url = "https://tmovies-v29u.onrender.com/movies/";
        let Api_key = "653fe092082699726c7906a0ec132639";

        let res = await fetch(url, {
            headers: {
                'authtoken': authtoken
            }
        });

        let data = await res.json();
        if (data.success) {
            let allIds = data.favMovies;
            if (allIds.length) {

                for (let id of allIds) {
                    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_key}`;

                    fetch(url).then(res => res.json()).then((data) => {
                        setfav((fav) => {
                            return [...fav, data]
                        })
                    })

                }
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            setfav([]);
            fetchFavmovies();
        }, [navigation])
    )

    let handlepress = () => {
        navigation.openDrawer();
    }




    return (
        <View style={{ padding: 20, backgroundColor: '#0d1216', flex: 1 }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <Text style={{ color: "green", fontSize: 18 }}>Favourites</Text>
                <TouchableOpacity onPress={handlepress} activeOpacity={1} style={{
                    backgroundColor: "#506059b0",
                    padding: 10,
                    borderRadius: 13
                }}>
                    <FontAwesomeIcon icon={faUser} size={18} color="white" />
                </TouchableOpacity>
            </View>
            {

                <>
                    {!fav ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 18 }}>Nothing to show here</Text>
                        </View>
                        :
                        <FlatList

                            numColumns="2"
                            data={fav}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return <Item2col item={item} navigation={navigation} desti="favinfo" />
                            }}

                        />
                    }
                </>

            }

        </View>
    )
}

export default Myfav