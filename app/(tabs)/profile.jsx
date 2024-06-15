import { View, Text } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

const profile = () => {
  return (
    <View style={{
      padding: 20,
      paddingTop: 40
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25
      }}>Profile</Text>

      
        {/* User Intro */}
        <UserIntro/>

        {/* MenuList */}
        <MenuList/>

    </View>
  )
}

export default profile