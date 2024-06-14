import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Colors } from "../../constants/Colors";
import { Ionicons } from '@expo/vector-icons';


const Header = () => {

    const { user } = useUser();

    return (
        <View style={{
            backgroundColor: Colors.PRIMARY,
            paddingTop: 50,
            padding: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
        }} >
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,

            }}>
                <Image source={{ uri: user?.imageUrl }}
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 99,
                    }}
                />
                <View>
                    <Text style={{ color: '#fff' }}>Welcome </Text>
                    <Text style={{
                        fontSize: 17,
                        fontFamily: 'outfit-medium',
                        color: '#fff'
                    }}>{user.fullName}</Text>
                </View>
            </View>

            {/* Searchbar */}
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: "#fff",
                marginVertical: 10,
                padding:10,
                marginTop:15,
                borderRadius: 8
            }}>
                <Ionicons name="search" size={24} color={Colors.PRIMARY} />
                <TextInput placeholder='Search...' style={{fontSize: 20, fontFamily: 'outfit'}}/>
            </View>
        </View>
    )
}

export default Header