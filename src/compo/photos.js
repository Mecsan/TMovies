import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-snap-carousel';


const Photos = ({ id }) => {

    let [photos, setphotos] = useState(null);
    let Api_key = "653fe092082699726c7906a0ec132639";
    let url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${Api_key}`;
    let posterUri = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {
            setphotos(data.backdrops.slice(0, 5));
        })
    }, [])

    return (
        <View style={{paddingVertical:30,marginLeft:-20}}>
            {
                photos &&
                <Carousel
                    data={photos}
                    renderItem={({ item }) => {
                        return (
                            <View style={{borderRadius:0,overflow:"hidden"}}>
                                <Image
                                    style={{ height: 200 }}
                                    source={
                                        {
                                            uri: posterUri + item.file_path
                                        }
                                    }

                                />
                            </View>
                        )
                    }}

                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={Dimensions.get("window").width - 150}
                    inactiveSlideOpacity={0.5}
                    inactiveSlideScale={0.8}

                />
            }
        </View>
    )
}

export default Photos