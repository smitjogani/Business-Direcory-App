import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { query } from 'firebase/database';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from "../../Config/FirebaseConfig"
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

const businessListByCategory = () => {

    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const { category } = useLocalSearchParams();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        })
        getBusinessList()
    }, []);

    // get business list by category
    const getBusinessList = async () => {
        setLoading(true);
        const q = query(collection(db, 'BusinessList'), where("category", "==", category));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            // console.log(doc.data());
            setBusinessList(prev => [...prev, doc.data()])
        })
        setLoading(false);
    }

    return (
        <View>
            {businessList?.length > 0 && loading==flase? <FlatList
                data={businessList}
                renderItem={({ item, index }) => (
                    <BusinessListCard key={index} business={item} />
                )}
            />
                :
                loading?<ActivityIndicator
                style={{
                    marginTop: '10%'
                }}
                    size={'large'}
                    color={Colors.PRIMARY}
                />:
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '50%'
                }}>

                    <Image source={require('../../assets/images/empty.png')}
                        style={{
                            width: 150,
                            height: 150,
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 20,
                            color: Colors.GRAY  
                        }}
                    >
                        No Business Found
                    </Text>

                </View>
            }
        </View>
    )
}

export default businessListByCategory; 