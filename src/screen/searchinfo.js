import { View, Text } from 'react-native'
import React from 'react'
import Iteminfo from '../compo/ItemInfo'

const SearchInfo = ({ route, navigation }) => {
    return (
        <Iteminfo route={route} navigation={navigation} />
    )
}

export default SearchInfo