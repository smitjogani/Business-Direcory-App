import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

const CategoryItem = ({ category, onCategoryPress }) => {
  return (
    <TouchableOpacity onPress={(c) => onCategoryPress(category)}>
      <View style={{
        padding: 10,
        backgroundColor: Colors.ICON_BG,
        borderRadius: 99,
        marginRight: 15,
        marginLeft: 15,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
      }}>
        <Image source={{ uri: category.icon }}
          style={{
            width: 40,
            height: 40,
          }}

        />

        
      </View>
      <Text style={{
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        marginTop: 5,
      }}>{category.name}</Text>
    </TouchableOpacity>
  )
}

export default CategoryItem
