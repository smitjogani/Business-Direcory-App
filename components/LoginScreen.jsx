import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("Outh error", err);
    }
  }, []);


  return (
    <View>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 140,

      }}>
        <Image source={require('../assets/images/login.png')}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000"
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'outfit-bold',
            textAlign: "center"
          }}
        >Your Ultimate
          <Text style={{
            color: Colors.PRIMARY,
          }}> Community Business Directory </Text>
          App</Text>

        <Text style={{
          textAlign: 'center',
          fontFamily: 'outfit',
          fontSize: 15,
          marginVertical: 15,
          color: Colors.GRAY
        }}>Find your Favourite Business near you and post your business to your community.</Text>


        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'outfit', fontSize: 18 }}>Let's get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#fff',
    padding: 22,
    marginTop: -22
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  }
})

export default LoginScreen