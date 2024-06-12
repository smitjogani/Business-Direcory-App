import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from "../../Config/FirebaseConfig.js"

const Slider = () => {

    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        GetSliderList()
    }, [])

    const GetSliderList = async () => {
        setSliderList([]);
        const q = query(collection(db, 'Slider'));
        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            // console.log(doc.data());
            setSliderList(prev => [...prev, doc.data()]);
        })
    }

    return (
        <View>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                padding: 15,
                paddingLeft:15,
                paddingTop: 20,
                marginBottom: -8,
            }}>
                #Special For You
            </Text>
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <Image source={{ uri: item.imageUrl }} style={{
                        width: 300,
                        height: 150,
                        borderRadius: 15,
                        marginRight: 20,
                    }} />
                )}
                style={{paddingLeft: 20}}
            />

        </View>
    )
}

export default Slider