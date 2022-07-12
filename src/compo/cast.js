import { View, Text, FlatList, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'

const Cast = ({ id }) => {


    let [cast, setcast] = useState(null);
    let Api_key = "653fe092082699726c7906a0ec132639";
    let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${Api_key}`;
    let posterUri = "https://image.tmdb.org/t/p/w500";


    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {
            let onlycast = data.cast.filter((val, idx) => {
                return val.known_for_department == "Acting"
            })
            let topcast = onlycast.sort((a, b) => b.popularity - a.popularity);
            setcast(topcast.slice(0, 10));
        })
    }, [])

    return (
        <View style={{
            paddingVertical: 20
        }}>
            {
                cast &&
                <>
                    <FlatList
                        horizontal={true}
                        data={cast}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    marginHorizontal: 7,
                                    borderRadius: 10,
                                    overflow: "hidden",
                                    position: "relative"
                                }}>
                                    <Image style={{ height: 150, width: 120 }} source={
                                        {
                                            uri: posterUri + item.profile_path
                                        }
                                    } />


                                    <View style={{
                                        position: 'absolute', bottom: 0,
                                        // backgroundColor: "grey",
                                        width: "100%",

                                    }}>
                                        <ImageBackground style={{
                                            paddingHorizontal: 5,
                                            paddingVertical: 3
                                        }} blurRadius={80} source={{
                                            uri: posterUri + item.profile_path
                                        }}>
                                            <Text style={{ color: "white", fontSize: 10 }}>{item.name}</Text>

                                            <Text style={{ color: "white", fontSize: 10 }}>
                                                {item.character.split("/")[0]}</Text>
                                        </ImageBackground>

                                    </View>
                                </View>
                            )
                        }} />
                </>


            }
        </View>
    )
}

export default Cast