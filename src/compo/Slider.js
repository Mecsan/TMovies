import { View, Text, RefreshControl, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Item from './item';
import Seemore from './seemore';

const Slider = ({ navigation, type, option }) => {

    // let url = "https://omdbapi.com/?s=avenger&apikey=bced5b32&type=movie";

    let Api_key = "653fe092082699726c7906a0ec132639";

    let url = `https://api.themoviedb.org/3/${type}/${option}?api_key=${Api_key}`;

    let [movies, setmovies] = useState(null);
    let [pending, setpending] = useState(true);


    // let [page, setpage] = useState(1);
    // let [totalpages, settotalpages] = useState(null);
    // let [refresh, setrefresh] = useState(false);

    useEffect(
        () => {
            let fetchmovies = async () => {
                setpending(true);
                let res = await fetch(url);
                let data = await res.json();
                setmovies(data.results);
                // console.log(data.results);
                // settotalpages(data.totalResults);
                setpending(false);
            }
            fetchmovies();
        }, []
    )

    let handleabout = () => {
        navigation.navigate("about");
    }

    let handlemoviepress = (id, Title) => {
        // console.log(id, Title)
        navigation.navigate("movie", { id, name: Title })
    }

    // let handleRefresh = () => {
    //     setrefresh(true);
    //     let possible = Math.round(totalpages / 10);
    //     let ranpage = Math.random() * possible + 1;
    //     setpage(ranpage);
    //     setrefresh(false);
    // }

    let handleMore = () => {
        navigation.navigate("all", { type, option });
    }

    return (
        <View style={[style.slidercontainer,
        ]}>
            <View style={{paddingVertical:5,paddingHorizontal:7, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[style.sliderTitle]}>{option}</Text>
                <TouchableOpacity onPress={handleMore}>
                    <Text style={[style.seeall]}>View all</Text>
                </TouchableOpacity>
            </View>
            <View style={style.moviescontainer}>
                {pending ?
                    <ActivityIndicator size="large" />
                    :
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={movies}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return <Item item={item} handlepress={handlemoviepress} />
                        }}
                        ListFooterComponent={
                            <Seemore fun={handleMore} />
                        }

                    // refreshControl={
                    //     <RefreshControl
                    //         onRefresh={handleRefresh}
                    //         refreshing={refresh} />
                    // }
                    />
                }
            </View>
        </View>
    )
}
let style = StyleSheet.create({
    moviescontainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "#181c2e"
    },
    slidercontainer: {
        // marginTop: 5,
        // backgroundColor:"white",
        padding: 10,
    },
    sliderTitle: {
        paddingVertical: 5,
        fontSize: 15,
        textTransform: "capitalize",
        color: "white"
    }, seeall: {
        // backgroundColor:"red",
        fontSize: 13,
        color:"grey",
        fontWeight: '600'
    }
})

export default Slider