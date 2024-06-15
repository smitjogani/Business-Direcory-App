import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { query } from 'firebase/database';
import { getDownloadURL, ref as sRef } from 'firebase/storage';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from "../../Config/FirebaseConfig"
import { uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

const addBusiness = () => {

    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const { user } = useUser();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [contact, setContact] = useState();
    const [website, setWebsite] = useState();
    const [about, setAbout] = useState();
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true
        })
        getCategoryList();
    }, [])

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        setImage(result?.assets[0].uri)
    }

    const getCategoryList = async () => {

        setCategoryList([])

        const q = query(collection(db, 'Category'));
        const snapShot = await getDocs(q);

        snapShot.forEach((doc) => {

            // console.log(doc.data())

            setCategoryList(prev => [...prev, {
                label: (doc.data()).name,
                value: (doc.data()).name
            }])

        })
    }

    const onAddNewBusiness = async () => {

        setLoading(true);

        const fileName = Date.now().toString() + ".jpg";
        const resp = await fetch(image);
        const blob = await resp.blob();

        const imageRef = sRef(storage, ' business-app/' + fileName);

        uploadBytes(imageRef, blob).then((snapshot) => {
            console.log("File Uploaded");
        }).then(resp => {
            getDownloadURL(imageRef).then(async (downloadUrl) => {
                // console.log(downloadUrl);
                saveBusinessDetails(downloadUrl);
            })
        })
        setLoading(false);
    }

    const saveBusinessDetails = async (imageUrl) => {
        await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
            name: name,
            address: address,
            contact: contact,
            about: about,
            website: website,
            category: category,
            username: user?.fullName,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userImage: user?.imageUrl,
            imageUrl: imageUrl
        })
        setLoading(false);
        router.push("/")
        ToastAndroid.show('New Business Added', ToastAndroid.LONG);


    }

    return (
        <View style={{
            padding: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25

            }}>
                Add New Business
            </Text>

            <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY
            }}>Fill all  details in order to add new business</Text>

            <TouchableOpacity style={{
                margin: 20
            }}
                onPress={() => onImagePick()}
            >
                {!image ? <Image source={require('../../assets/images/placeholder.png')}
                    style={{
                        width: 100,
                        height: 100
                    }}
                /> :
                    <Image source={{ uri: image }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 15
                        }}
                    />
                }
            </TouchableOpacity>

            <View style={{
                margin: 20
            }}>
                <TextInput placeholder='Name'
                    onChangeText={(value) => setName(value)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        borderColor: Colors.PRIMARY,
                        marginBottom: 10
                    }}
                />

                <TextInput placeholder='Address'
                    onChangeText={(value) => setAddress(value)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        borderColor: Colors.PRIMARY,
                        marginBottom: 10
                    }}
                />

                <TextInput placeholder='Contact'
                    onChangeText={(value) => setContact(value)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        borderColor: Colors.PRIMARY,
                        marginBottom: 10
                    }}
                />

                <TextInput placeholder='Website'
                    onChangeText={(value) => setWebsite(value)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        borderColor: Colors.PRIMARY,
                        marginBottom: 10,
                    }}
                />

                <TextInput placeholder='About'
                    onChangeText={(value) => setAbout(value)}
                    multiline
                    numberOfLines={5}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        borderColor: Colors.PRIMARY,
                        height: 100,
                        marginBottom: 10,
                        display: 'flex',


                    }}
                />

                <View
                    style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        borderColor: Colors.PRIMARY,
                    }}>
                    <RNPickerSelect
                        onValueChange={(value) => setCategory(value)}
                        items={categoryList}
                    />
                </View>


                <TouchableOpacity
                    disabled={loading}
                    style={{
                        padding: 15,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 5,
                        marginTop: 20
                    }}
                    onPress={() => onAddNewBusiness()}
                >

                    {loading ? <ActivityIndicator style={{
                        marginTop: '10%'
                    }}
                        size={'large'}
                        color={Colors.PRIMARY} /> :
                        <Text style={{
                            color: '#fff',
                            fontFamily: 'outfit-medium',
                            textAlign: 'center',
                            fontSize: 16
                        }}>Add New Business</Text>
                    }

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default addBusiness