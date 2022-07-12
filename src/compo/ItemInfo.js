import { View, Text, Image, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, image, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState, useContext, useRef } from 'react'
import Mycontex from './contex';
import { useFocusEffect } from '@react-navigation/native';
import AddTofav from './addTofav';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import BackButton from './back'
import Cast from './cast';
import Photos from './photos';

const Iteminfo = ({ route, navigation }) => {


    let { id } = route.params;
    // console.log(route);

    let { globaldisplay, setdisplay } = useContext(Mycontex);

    let Api_key = "653fe092082699726c7906a0ec132639";

    // let url = `https://www.omdbapi.com/?i=${id}&apikey=bced5b32`;

    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_key}`;
    let [pending, setpending] = useState(true);
    let [movieInfo, setmovieInfo] = useState(null);
    let [top, settop] = useState(0);




    let posterUri = "https://image.tmdb.org/t/p/w500";

    useFocusEffect(() => {
        setdisplay("none");

        return () => {
            setdisplay("flex")
        }
    })

    useEffect(() => {
        let fetchMovieInfo = async () => {
            let res = await fetch(url);
            let data = await res.json();
            setmovieInfo(data);
            setpending(false);
        }
        fetchMovieInfo();
        // console.log(globaldisplay)
    }, [id]);


    let goback = () => {
        navigation.goBack();
    }

    let handleAnimate = (e) => {
        let newVal = e.nativeEvent.contentOffset.y * .4;
        settop(newVal);

    }



    return (
        <View >
            <BackButton press={goback} />

            <ScrollView onScroll={(e) => {
                handleAnimate(e);
            }}>
                {
                    !pending &&
                    <>
                        <ImageBackground
                            style={[style.image, { top: top }]}
                            source={
                                {
                                    uri: posterUri + movieInfo.poster_path
                                }
                            }>
                            <LinearGradient style={style.lineGrad} colors={['transparent', '#0c08099e', 'black']}>




                            </LinearGradient>
                        </ImageBackground>




                        <View style={[style.rel, {}]}>
                            <View style={style.upcon}>

                                <Text style={style.title}>{movieInfo.title}</Text>


                                <View style={style.hor}>


                                    <Text style={style.runtime}> {Math.floor(movieInfo.runtime / 60)}h {movieInfo.runtime % 60} min
                                    </Text>
                                    <FontAwesomeIcon style={style.mar} icon={faCircle} size={5} color="#b8c0c5" />
                                    <Text style={style.year}>
                                        {movieInfo.release_date.toString().substr(0, 4)}
                                        {movieInfo.status != 'Released' && " (soon)"}
                                    </Text>
                                    <FontAwesomeIcon style={style.mar} icon={faCircle} size={5} color="#b8c0c5" />
                                    <Text style={style.lan}>
                                        {movieInfo.original_language}
                                    </Text>



                                </View>

                                <ScrollView horizontal contentContainerStyle={style.gencon}>

                                    {
                                        movieInfo.genres.map((val) => {
                                            return (
                                                <Text style={style.genr} key={val.id}>{val.name}</Text>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>



                            <View style={style.black}>


                                <View style={style.favrate}>
                                    <AddTofav navigation={navigation} id={movieInfo.id} />
                                    <View style={style.rate}>
                                        <Text style={style.rateval}>
                                            {movieInfo.vote_average}
                                            <Text style={{ fontSize: 13 }}>/10</Text>
                                        </Text>
                                        <FontAwesomeIcon icon={faStar} color="#FFD700" size={20} />
                                    </View>
                                </View>




                                <Text style={style.about}>
                                    {movieInfo.overview}{movieInfo.tagline}
                                </Text>

                                <Cast id={id} />
                                <Photos id={id} />


                            </View>
                        </View>

                    </>
                }


            </ScrollView>





        </View>
    )
}

let style = StyleSheet.create({


    lineGrad: {
        width: "100%",
        paddingHorizontal: 20,
        height: "100%",
        // justifyContent: "flex-end"
    },
    image: {
        position: "relative",
        width: "100%",
        height: 600,
        // borderRadius: 20,
        overflow: "hidden",
        alignSelf: "center"
    },

    rel: {
        position: "relative",
        top: -180,
        marginBottom: -180
        // paddingHorizontal:20,
    },
    upcon: {
        paddingHorizontal: 20,
    },
    title: {
        color: "white",
        width: "80%",
        fontSize: 25,
        fontWeight: "600",
        paddingBottom: 7
    },
    hor: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 8,
    },
    runtime: {
        color: "#b8c0c5"
    },
    mar: {
        margin: 10
    },
    year: {
        color: "#b8c0c5"
    },
    lan: {
        color: "#b8c0c5",
        textTransform: "uppercase"
    },
    genr: {
        backgroundColor: "#344bb1",
        color: "white",
        fontWeight: "600",
        paddingVertical: 2,
        paddingHorizontal: 13,
        borderRadius: 10,
        marginRight: 10
    },
    gencon: {
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    favrate: {
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rate: {
        flexDirection: "row",
        alignItems: "center"
    },
    rateval: {
        color: "white",
        fontSize: 25,
        marginRight: 10
    },
    black: {
        paddingHorizontal: 20,
        backgroundColor: "black",
        paddingBottom: 100
    },
    about: {
        color: "white",
        textAlign: "justify",
        fontSize: 16,
        paddingVertical: 10,
        color: "#cbcdcf"

    },



})

export default Iteminfo
