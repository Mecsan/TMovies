import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const Filters = ({ filter,setfilter  }) => {
    
    let select = (id) => {
        let newfilter = filter.map((item) => {
            if (item.id == id) {
                return {
                    ...item,
                    isselected: !item.isselected
                }
            }
            return item
        })
        setfilter(newfilter);
    }

    let isthisselected = (id) => {

        let one = filter.find((item) => {
            return item.id == id
        })

        return one.isselected;

    }

    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20 }}>
            {
                filter.map(item => {
                    return (
                        <Text key={item.id} style={[{
                            color: "black",
                            marginRight: 10,
                            backgroundColor: "white",
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            borderRadius: 10,
                            marginBottom: 10,
                        }, isthisselected(item.id) && {
                            backgroundColor: "#11a125",
                            color: "white"
                        }]}

                            onPress={() => { select(item.id) }}>

                            {item.name}
                        </Text>
                    )
                })
            }
        </View>
    )
}

export default Filters