import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { db } from "../../Config/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import { doc, getDoc } from 'firebase/firestore';
import BusinessIntro from '../../components/BusinessDetail/BusinessIntro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Reviews from "../../components/BusinessDetail/Reviews";

const businessDetails = () => {

    const { businessid } = useLocalSearchParams();
    const [businessDetails, setBusinessDetails] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getBusinessDetailsById();
    }, []);

    const getBusinessDetailsById = async () => {
        setLoading(true);
        const docRef = doc(db, 'BusinessList', businessid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setBusinessDetails({ id: docSnap.id, ...docSnap.data() });
            setLoading(false);
        }
        else {
            console.log("No Such Document");
        }
    }

    return (
        <ScrollView>
            {loading ?
                <ActivityIndicator
                    style={{
                        marginTop: '10%'
                    }}
                    size={'large'}
                    color={Colors.PRIMARY}

                /> :
                <View>
                    {/* Intro */}
                    <BusinessIntro business={businessDetails} />

                    {/* Action Buttons */}
                    <ActionButton business={businessDetails} />

                    {/* About Section */}
                    <About business={businessDetails} />

                    {/* Review Section */}
                    <Reviews business={businessDetails} />

                </View>
            }
        </ScrollView>
    )
}

export default businessDetails