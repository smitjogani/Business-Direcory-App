import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { query } from 'firebase/database'
import { collection, getDocs, limit } from 'firebase/firestore'
import { db } from "../../Config/FirebaseConfig"
import PopularBusinessCard from './PopularBusinessCard'

const PopularBusiness = () => {

    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        getBusinessList();
    }, []);

    const getBusinessList = async () => {
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'),limit(10));
        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            // console.log(doc.data()); 
            setBusinessList(prev => [...prev, { id: doc.id, ...doc.data() }]);
        })
    }

    return (
        <View>
            <View style={{
                padding: 20,
                marginBottom: -5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
                paddingLeft: 15
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-bold',
                }}>Popular Business
                </Text>
                <Text style={{
                    color: Colors.PRIMARY,
                    fontFamily: 'outfit-medium'
                }}>View All</Text>
            </View>

            <FlatList
                data={businessList}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                renderItem={({ item, index }) =>
                (
                    <PopularBusinessCard
                        key={index}
                        business={item}
                    />
                )
                }
            />
        </View>
    )
}

export default PopularBusiness