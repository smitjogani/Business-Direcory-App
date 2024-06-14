import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessCard from './BusinessCard'


const ExploreBusinessList = ({ businessList }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
                data={businessList}
                renderItem={({ item, index }) => (
                    <View>
                        <BusinessCard business={item} />
                    </View>
                )}
            />
        </ScrollView>
    )
}

export default ExploreBusinessList