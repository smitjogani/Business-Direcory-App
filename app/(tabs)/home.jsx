import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'

const Home = () => {
  return (
    <View>
      {/* Header */}
      <Header/>
      {/* slidder */}
      <Slider/>
      {/* catagory */}
      <Category/>

      {/* popular Business List */}

    </View>
  )
}

export default Home