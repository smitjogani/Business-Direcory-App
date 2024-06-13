import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

const ActionButton = ({ business }) => {

    const actionButtonMenu = [
        {
            id: 1,
            name: 'Call',
            icon: require('../../assets/images/call.png'),
            url: 'tel:' + business?.contanct
        },
        {
            id: 2,
            name: 'Location',
            icon: require('../../assets/images/pin.png'),
            url: 'https://www.google.com/maps/search/?api=1&query=' + business?.address
        },
        {
            id: 3,
            name: 'Website',
            icon: require('../../assets/images/web.png'),
            url: business?.website
        },
        {
            id: 4,
            name: 'Share',
            icon: require('../../assets/images/share.png'),
            url: business?.website
        }
    ]

    const openOnPressHandler = (item) => {
        if (item.name == 'Share') {
            return;
        }
        Linking.openURL(item?.url)
    }

    return (
        <View style={{
            backgroundColor: '#fff',
            padding: 20
        }}>

            <FlatList
                data={actionButtonMenu}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => openOnPressHandler(item)}>
                        <Image source={item?.icon} style={{
                            width: 50,
                            height: 50
                        }} />
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            textAlign: 'center',
                            marginTop: 3
                        }}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}

export default ActionButton