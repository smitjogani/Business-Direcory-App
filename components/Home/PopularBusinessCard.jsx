import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

const PopularBusinessCard = ({ business }) => {
    return (
        <View style={{
            marginLeft: 15,
            padding: 10,
            borderRadius: 15,
            backgroundColor: '#fff',
            marginBottom: 10
        }}>
            <Image source={{ uri: business?.imageUrl }} style={{
                width: 250,
                height: 150,
                borderRadius: 10,
            }} />

            <View style={{ marginTop: 2 }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 15,
                    padding: 5,

                }}>{business.name}</Text>

                <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 13,
                    padding: 5,
                    color: Colors.GRAY

                }}>{business.address}</Text>
            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    paddingTop: 4
                }}>
                    <Image source={require('../../assets/images/star.png')} style={{
                        width: 15,
                        height: 15,
                    }} />
                    <Text style={{
                        fontFamily: 'outfit'
                    }}>4.5</Text>
                </View>
                <Text
                style={{
                    fontFamily: 'outfit',
                    backgroundColor: Colors.PRIMARY,
                    color: '#fff',
                    padding: 4,
                    fontSize: 10,
                    borderRadius: 5 
                }}
                >{business.category}</Text>
            </View>
        </View>
    )
}

export default PopularBusinessCard