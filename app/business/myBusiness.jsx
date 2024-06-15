import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { query } from 'firebase/database';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import BusinessListCard from "../../components/BusinessList/BusinessListCard"
import { useNavigation } from 'expo-router';

const myBusiness = () => {

    const [bussinessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const { user } = useUser();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'My Businesses',
            headerShown: true
        })

        user && getUserBusiness()
    }, [user])

    // get business list by user email
    const getUserBusiness = async () => {
        setLoading(true)
        setBusinessList([]);
        const q = query(collection(db, "BusinessList"), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }]);
        })
        setLoading(false);
    }

    return (
        <View style={{
            padding: 20,
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>
                My Business
            </Text>

            <FlatList
                data={bussinessList}
                onRefresh={getUserBusiness}
                refreshing={loading}
                renderItem={({ item, index }) => (
                    <BusinessListCard business={item} key={index} />
                )}
            />
        </View>
    )
}

export default myBusiness