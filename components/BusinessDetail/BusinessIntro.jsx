import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BusinessIntro = ({ business }) => {

  const router = useRouter();

  return (
    <View>
      <View style={{
        position: 'absolute',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        paddingTop: 30
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={36} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={36} color="white" />
      </View>
      <Image source={{ uri: business?.imageUrl }} style={{
        width: '100%',
        height: 400
      }} />

      <View style ={{
          padding: 20,
          marginTop: -20,
          backgroundColor: '#fff',
          borderTopRightRadius: 23,
          borderTopLeftRadius: 23

        }}>
        <Text style={{
          fontSize: 26,
          fontFamily: 'outfit-bold'
        }}>{business?.name}</Text>
        <Text style={{
          fontSize: 18,
          fontFamily: 'outfit'
        }}>{business?.address}</Text>
      </View>
    </View>
  )
}

export default BusinessIntro