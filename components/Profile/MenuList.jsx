import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import {Colors} from "../../constants/Colors"

const MenuList = () => {

    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: require('../../assets/images/add.png'),
            path: ''
        },
        {
            id: 2,
            name: 'My Business',
            icon: require('../../assets/images/business-and-trade.png'),
            path: ''
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('../../assets/images/share_1.png'),
            path: ''
        },
        {
            id: 4,
            name: 'Logout',
            icon: require('../../assets/images/logout.png'),
            path: ''
        },
    ]

    return (
        <View style={{
            marginTop: 35
        }}>
            <FlatList
            numColumns={2}
                data={menuList}
                renderItem={({item, index}) => (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        flex: 1,
                        padding:10,
                        borderWidth: 1,
                        borderRadius: 15,
                        margin:  10,
                        borderColor: Colors.PRIMARY,
                        backgroundColor: '#fff'
                    }}>
                        <Image source={item.icon} style={{
                            width: 50,
                            height: 50
                        }}/>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 16,
                            flex: 1
                        }}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default MenuList