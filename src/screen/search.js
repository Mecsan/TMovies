import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faL, faSearch } from '@fortawesome/free-solid-svg-icons'
import Movie from '../compo/item'
import Item2col from '../compo/item2col'
import Filters from '../compo/filters'


const Search = ({ navigation }) => {

  let [search, setsearch] = useState("");
  let [totalpage, settotalpage] = useState(0);
  let [end, setend] = useState(false);
  let [refresh, setrefresh] = useState(false);
  let [page, setpage] = useState(1);
  let [pending, setpending] = useState(false);
  let [mdata, setdata] = useState([]);
  let [err, seterr] = useState(null);
  let [focus, setfocus] = useState(false);
  let [showfilter, setshowfilter] = useState(false);
  let [filter, setfilter] = useState(
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


  let [prevY, setprey] = useState(0);

  let [searchstyle, setstyle] = useState(null);

  let handleSearchAnimate = (e) => {


    let curry = e.nativeEvent.contentOffset.y;
    // console.log(prevY,curry);
    if (Math.abs(prevY) > curry) {
      setstyle({
        top: 0
      })
    } else {
      setstyle({
        top: -60
      })
    }
    setprey(curry);

  }

  let Api_key = "653fe092082699726c7906a0ec132639";

  let handleSearch = () => {
    setend(false);
    let allfilters = filter.filter((val) => {
      return val.isselected;
    })
    setpending(true);


    let url = `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&query=${search}`

    fetch(`${url}&page=${page}`).then(res => res.json()).then((data) => {
      settotalpage(data.total_pages);
      if (data.total_results == 0) {
        seterr("No movie found");
        setdata([]);
      } else {

        seterr(null);
        let allmoviesar = [...mdata, ...data.results];
        if (allfilters.length) {

          let newMovies = allmoviesar.filter((movie) => {
            return Allincludes(allfilters, movie.genre_ids)
          })

          if (newMovies.length) {
            setdata(newMovies);
          } else {
            seterr("No movie found");
            setdata([]);
          }

        } else {
          setdata(allmoviesar);
        }
      }
      setpending(false);
    })
  }



  let fetchMovieswithGenres = (filters, bol) => {

    // bol is indicating wether this function is called by updaeting filter or 
    // changing the page if bol == true means chnagimg the page

    let genrestr = filters.map((filter) => filter.id).join(",");
    let genr_url = `https://api.themoviedb.org/3/discover/movie?api_key=${Api_key}&with_genres=${genrestr}`;

    if (filters.length) {
      setpending(true);

      fetch(`${genr_url}&page=${bol ? page : 1}`).then(res => res.json())
        .then((data) => {
          settotalpage(data.total_pages);
          if (bol) {
            if (data.results.length) {
              let moviesar = [...mdata, ...data.results];
              setdata(moviesar);
            }
          } else {

            if (data.results.length) {
              setdata(data.results);
              seterr(null);
            } else {
              seterr("No movie found");
              setdata([]);
            }
          }
          setpending(false);
        })
    } else {
      setdata([]);
    }

  }

  let Allincludes = (towatch, toin) => {
    for (let i of towatch) {
      if (toin?.indexOf(i.id) == -1) {
        return false;
      }
    };
    return true;
  }

  useEffect(() => {

    setend(false);

    let allfilters = filter.filter((val) => {
      return val.isselected;
    })

    if (search) {
      handleSearch();
    } else {
      fetchMovieswithGenres(allfilters, false);
    }


  }, [filter]);

  useEffect(() => {
    if (page != 1) {
      if (page > totalpage || page > 500) {
        setend(true);
      }
      else if (search) {
        handleSearch();
        setend(false);

      }
      else {
        setend(false);

        let allfilters = filter.filter((val) => {
          return val.isselected;
        })
        fetchMovieswithGenres(allfilters, true);
      }
    }
  }, [page])

  let resetall = () => {
    setend(false);
    setrefresh(true);
    setpage(1);
    setdata([]);
    setfilter((pre) => {
      let newp = pre.map((one) => {
        return {
          ...one,
          isselected: false
        }
      })
      return newp;
    });
    setrefresh(false);
  }

  return (

    <TouchableOpacity activeOpacity={1} onPress={() => {
      Keyboard.dismiss()
    }} style={{ flex: 1 }}>

      <View style={{ flex: 1, backgroundColor: "#0d1216" }}>

        <View style={[, {
          position: "relative",
          top: 0,
        }, searchstyle]}>
          <View style={[style.contain]}>
            <TextInput
              placeholder='Search here'
              style={[style.se, focus && {
                borderColor: "#11a12591",
                borderWidth: 1,
              }]}
              placeholderTextColor="grey"
              value={search}
              onFocus={() => { setfocus(true) }}
              onBlur={() => { setfocus(false) }}
              onSubmitEditing={handleSearch}
              onChangeText={(text) => {
                setsearch(text);
              }} />
            <TouchableOpacity onPress={handleSearch}>
              <FontAwesomeIcon icon={faSearch} color="#b8c0b9" size={20} />
            </TouchableOpacity>
          </View>
          {
            showfilter ? <>
              <Filters filter={filter} setfilter={setfilter} />
              <Text style={{ color: 'white', width: "100%", textAlign: "center", marginBottom: 15 }} onPress={() => {
                setshowfilter((pre) => !pre)
              }}>Hide filters</Text>
            </> : <Text style={{ color: 'white', width: "100%", textAlign: "center", marginBottom: 15 }} onPress={() => {
              setshowfilter((pre) => !pre)
            }}>show filters</Text>

          }
        </View>

        {err ? <View style={style.err}>
          <Text style={{ color: "white" }}>{err}</Text>
        </View>
          : <>
            {mdata.length ? <View style={[style.moviecon]}>
              <FlatList
                refreshControl={<RefreshControl
                  refreshing={refresh}
                  onRefresh={resetall}
                />}
                numColumns={2}
                data={mdata}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return <Item2col item={item} navigation={navigation} desti='seDetail' />
                }}

                ListFooterComponent={() => {
                  return (

                    end ? <Text style={{
                      color: "grey", textAlign: "center", paddingVertical: 10
                    }}>No more movies</Text> :
                      <ActivityIndicator size={33} />

                  )
                }
                }
                onEndReached={() => {
                  if (!end) {
                    setpage(pre => pre + 1)
                  }
                }}

              />
            </View> : null
            }
          </>
        }
      </View>
    </TouchableOpacity >

  )
}

let style = StyleSheet.create({
  se: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    fontSize: 15,
    backgroundColor: "#24292f",
    borderRadius: 10,
    flex: 0.95,
    color: "#b8c0b9"
  },
  contain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  moviecon: {
    paddingHorizontal: 20,
    flex: 1

  }, err: {
    justifyContent: "center",
    alignItems: "center",
    height: 200
  }
})

export default Search