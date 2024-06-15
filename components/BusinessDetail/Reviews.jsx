import { View, Text, TextInput, Button, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native'
import { Rating } from 'react-native-ratings';
import { Colors } from "../../constants/Colors";
import { db } from "../../Config/FirebaseConfig"
import React, { useState } from 'react';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';


const Reviews = ({ business }) => {

  const [rating, setRating] = useState();
  const [userInput, setUserInput] = useState();
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, 'BusinessList', business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        shopeRating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress
      })
    })

    ToastAndroid.show("Thanks for Review", ToastAndroid.BOTTOM);
  }

  return (
    <View style={{
      padding: 20,
      backgroundColor: '#fff'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>
        Review
      </Text>

      <View>
        <Rating
          showRating={false}
          imageSize={28}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          onChangeText={(value) => setUserInput(value)}
          placeholder='Write Your Comment'
          numberOfLines={4}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: 'top'
          }} />
        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            fontFamily: 'outfit-bold',
            borderRadius: 6,
            marginTop: 10
          }}>
          <Text style={{
            fontFamily: 'outfit',
            color: '#fff',
            textAlign: 'center',
          }}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Display Previous Reviews */}
      <View>
        {business?.reviews?.map((item, index) => (
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.GRAY,
            borderRadius: 10,
            marginTop: 20
          }}>
            <Image source={{ uri: item.userImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99
              }}
            />
            <View style={{
              display: 'flex',
              gap: 5
            }}>
              <Text
                style={{
                  fontFamily: 'outfit-medium'
                }}
              >{item.userName}</Text>
              
              <Rating
                style={{
                  alignItems: 'flex-start'
                }}
                imageSize={20}
                ratingCount={item.shopeRating}
                readonly
                startingValue={item.shopeRating}
              />

              <Text>{item.comment}</Text>

            </View>
          </View>
        ))}
      </View>

    </View>
  )
}

export default Reviews