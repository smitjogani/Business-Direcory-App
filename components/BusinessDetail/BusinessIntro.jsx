import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

const BusinessIntro = ({ business }) => {

  const router = useRouter();
  const { user } = useUser();

  const onDelete = async () => {
    Alert.alert("Do you want to delete?", 'Do you really want to delete this business ?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteBusiness()
      }
    ])
  }

  const deleteBusiness = async () => {
    // console.log("Delete Business");
    await deleteDoc(doc(db, "BusinessList", business?.id));

    router.back();
    ToastAndroid.show("Business Deleted", ToastAndroid.LONG);

  }

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

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20,
        backgroundColor: '#fff',
        borderTopRightRadius: 23,
        borderTopLeftRadius: 23
      }}>
        <View style={{
          padding: 20,
          paddingLeft: -12,
          marginTop: -20,
          backgroundColor: '#fff',
          borderTopRightRadius: 23,
          borderTopLeftRadius: 23

        }}>
          <Text style={{
            fontSize: 26,
            fontFamily: 'outfit-bold',
          }}>
            {business?.name}
          </Text>
          <Text style={{
            fontSize: 18,
            fontFamily: 'outfit'
          }}>{business?.address}</Text>
        </View>
        {user?.primaryEmailAddress?.emailAddress == business?.userEmail && <TouchableOpacity onPress={() => onDelete()}>
          <Ionicons name="trash" size={26} color="red" />
        </TouchableOpacity>}
      </View>
    </View>
  )
}

export default BusinessIntro