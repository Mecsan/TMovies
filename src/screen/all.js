import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import Mycontex from '../compo/contex';
import Item2col from '../compo/item2col';
import Customheader from '../compo/customheader';
import Filters from '../compo/filters';
const All = ({ route, navigation }) => {

    let { globaldisplay, setdisplay } = useContext(Mycontex);

    let [filter, setfilter] = React.useState(
        [
            {
                id: 28,
                name: "action",
                isselected: false
            },
            {
                id: 35,
                name: "comdey",
                isselected: false
            },
            {
                id: 12,
                name: "adventure",
                isselected: false
            }, {
                id: 16,
                name: "animation",
                isselected: false
            }, {
                id: 80,
                name: "crime",
                isselected: false
            }, {
                id: 18,
                name: "drama",
                isselected: false
            }, {
                id: 14,
                name: "fantasy",
                isselected: false
            },
            {
                id: 27,
                name: "horror",
                isselected: false
            },
            {
                id: 53,
                name: 'thriller',
                isselected: false
            },
            {
                id: 10749,
                name: 'Rommance',
                isselected: false
            },
            {
                id: 878,
                name: 'sci-fi',
                isselected: false
            }
        ]
    )

    let { type, option } = route.params;



    let Api_key = "653fe092082699726c7906a0ec132639";

    let url = `https://api.themoviedb.org/3/${type}/${option}?api_key=${Api_key}`;


    const [filtermovies, setfiltermovies] = useState([]);
    let [movies, setmovies] = useState(null);
    let [filtershow, setfiltershow] = useState(false);


    let [page, setpage] = useState(1);


    let Allincludes = (towatch, toin) => {
        // towatch is like [{id:12,name:"action",isseleced:true},
        //                  {id:38,name:"horror",isselected:true},...{...}]
        // toin is a perticluar movies genres ids like
        // [12,56,37]
        // now we have only return true if a movie contain all the genres is seleced by user that is in the towatch
        for (let i of towatch) {
            if (toin?.indexOf(i.id) == -1) {
                return false;
            }
        };
        return true;
    }

    let fetchmovies = async () => {


        let res = await fetch(`${url}&page=${page}`);
        let data = await res.json();
        if (movies) {
            let newMovies = [...movies, ...data.results]
            setmovies(newMovies);
        } else {
            setmovies(data.results);
        }
        // console.log(JSON.stringify(data, null, 2))


    }

    useEffect(() => {
        let allfilters = filter.filter((val) => {
            return val.isselected;
        })
        if (allfilters.length) {
            let newMovies = movies?.filter((movie) => {
                return Allincludes(allfilters, movie.genre_ids);
            })
            // console.log(newMovies.length);
            setfiltermovies(newMovies);
            // if (newMovies.length > 2) {

            // } else {
            //     setpage(pre => pre + 1)
            // }

        } else {
            setfiltermovies(movies);
        }
    }, [filter])

    useEffect(() => {
        let allfilters = filter.filter((val) => {
            return val.isselected;
        });

        if (allfilters.length) {

            let newMovies = movies.filter((movie) => {
                return Allincludes(allfilters, movie.genre_ids)
            });





            // whenever movies get changed(means page has changed then only movies can
            //  changed) so now it is possible that in filtermovie we didnt get any new 
            //  movie because of applied filters we didnt get any movie that satisfy our
            //   filter means there is no change in our filter movie so we cant 
            //   scoll below as we aleady at last, so we cant fetch more movies so
            //    we will be fetching movies until we get more filter movies then previous 
            //    filtered

            if (newMovies.length > filtermovies.length + 2) {
                setfiltermovies(newMovies);
            } else {
                setpage(pre => pre + 1)
            }



        } else {
            setfiltermovies(movies);
        }
    }, [movies])


    useEffect(() => {
        fetchmovies();
    }, [page])

    useFocusEffect(() => {
        setdisplay("none");

        return () => {
            setdisplay("flex");
        }
    })
    return (
        <View style={{ backgroundColor: "black", flex: 1 }}>
            <Headerwithback filtershow={filtershow} setfiltershow={setfiltershow} navigation={navigation}
                title={`${option} ${type}s`} />
            {filtershow && <Filters filter={filter} setfilter={setfilter} />}

            <View style={{ flex: 1 }}>

                {filtermovies?.length ?
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        scrollEnabled={true}
                        numColumns={2}
                        data={filtermovies}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Item2col item={item} navigation={navigation} desti='movie' />
                            )
                        }}
                        onScroll={() => {
                            // console.log("i am scrolling")
                        }}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => {
                            console.log("reacched");
                            setpage((page) => page + 1)
                        }}
                        ListFooterComponent={() => {
                            return <ActivityIndicator size="large" style={{ padding: 10 }} />
                        }}
                    /> :
                    <Text style={{ color: "white", textAlign: "center" }}>No movie found</Text>
                }


            </View>
        </View>
    )
}


let Headerwithback = ({ title, navigation, setfiltershow, filtershow }) => {
    return (
        <View style={style.header}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("home")
            }}>
                <FontAwesomeIcon icon={faAngleLeft} size={25} color="white" />
            </TouchableOpacity>
            <Text style={style.title}>{title}</Text>
            <Text style={style.filter} onPress={() => {
                setfiltershow(pre => !pre)
            }}>{filtershow ? 'Hide' : "Filters"}</Text>
        </View>
    )
}





export default All

let style = StyleSheet.create({
    header: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        // backgroundColor: 'red',
        // marginHorizontal:20,
        marginVertical: 10,
        borderRadius: 20
    }, title: {
        fontWeight: "600",
        flex: 1,
        fontSize: 18,
        color: "white",
        textTransform: 'capitalize',
        textAlign: "center",
    }, filter: {
        color: "#11a125",
        fontSize: 15
    }
})


