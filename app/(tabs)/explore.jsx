import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import Category from "../../components/Home/Category"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../Config/FirebaseConfig'
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList"

const explore = () => {

    const [businessList, setBusinessList] = useState([]);

    const GetBusinessByCategory = async (category) => {
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), where('category', '==', category));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            // console.log(doc.data())
            setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }])
        })
    }

    return (
        <View style={{
            padding: 20,
            paddingTop: 40
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>Explore More</Text>

            {/* Searchbar */}
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: "#fff",
                marginVertical: 10,
                padding: 10,
                marginTop: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: Colors.PRIMARY
            }}>
                <Ionicons name="search" size={24} color={Colors.PRIMARY} />
                <TextInput placeholder='Search...' style={{ fontSize: 20, fontFamily: 'outfit', color: Colors.PRIMARY }} />
            </View>

            {/* Category */}
            <Category explore={true} onCategorySelect={(category) => GetBusinessByCategory(category)} />

            {/* BusinessList */}
            <ExploreBusinessList businessList={businessList} />
        </View>
    )
}

export default explore