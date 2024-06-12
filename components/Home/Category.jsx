import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'

const Category = () => {

  const [categoryList, setCategoryList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, [])

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setCategoryList(prev => [...prev, doc.data()],);
    })
  }

  return (
    <View>
      <View style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingLeft: 15
      }}>
        <Text style={{
          fontSize: 20,
          fontFamily: 'outfit-bold',
        }}>Category
        </Text>
        <Text style={{
          color: Colors.PRIMARY,
          fontFamily: 'outfit-medium'
        }}>View All</Text>
      </View>

      <FlatList showsHorizontalScrollIndicator={false} horizontal={true} data={categoryList} renderItem={({ item, index }) => (
        <CategoryItem
          category={item}
          key={index}
          onCategoryPress={(category) => router.push('/businesslist/' + item.name)}
        />
      )} />

    </View>
  )
}

export default Category