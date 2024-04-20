import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../global/colores'
import { Icon } from 'react-native-elements'

import { database, storage,auth } from '../../firebaseConfig.js'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from 'firebase/auth';
const SingUpScreen = ({navigation}) => {

  const [fullName,setFullName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const singupAction = async() => {   
    if(email !=="" && password !=="" && fullName !==""){
        try {
          
         const fbuser =await createUserWithEmailAndPassword(auth, email, password);
         
        await addDoc(collection(database,"User"),{
          fullName:fullName,
          email:email,
          password:password
        })
        .then(res => {
          setFullName('')
          setEmail('')
          setPassword('')
        })

        } catch (error) {
         Alert.alert("Authentication", error.message);
        }
     } else{
         Alert.alert("Authentication", "All input are required!!");
     }
}
  return (
    <View style={styles.container}>
      <SafeAreaView style={{marginBottom:30}}>
        <View style={{flexDirection:'row',justifyContent:'flex-start',marginTop:40}}>
            <TouchableOpacity style={styles.touArrow}>
                <Icon 
                name="arrow-left" type="material-community"
                color={colors.white} size={28}
                onPress={()=>navigation.goBack()}
                />  
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
            <Image source={require("../../../assets/AuthImage/signup.png")}
              style={{width:185,height:130}}
            />
        </View>
      </SafeAreaView>

      <View style={styles.boxLogin}>
        <View style={{justifyContent:'space-between'}}>
          <Text style={styles.text}>Full Name</Text>
          <TextInput 
             style={styles.textInput}
             keyboardType='default'
             placeholder='Full Name'
             value={fullName}
             onChangeText={(e) => {setFullName(e)}}
          />

          <Text style={styles.text}>Email Address</Text>
            <TextInput 
              style={styles.textInput}
              keyboardType='email-address'
              placeholder='Email address'
              autoCapitalize='none'
              value={email}
              onChangeText={(e) => {setEmail(e)}}
            />

          <Text style={styles.text}>Password</Text>
            <TextInput 
              style={styles.textInput}
              keyboardType='default'
              placeholder='Password'
              autoCapitalize='none'
              secureTextEntry={true}
              value={password}
              onChangeText={(e) => {setPassword(e)}}
            />

            <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'flex-end',marginVertical:5,marginRight:40}}>
                <Text>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logintext} onPress={singupAction}>
                <Text style={{fontSize:20,fontWeight:'bold',color:colors.white}}>Sing Up</Text>
            </TouchableOpacity>
        </View>

        <Text style={{fontSize:25,fontWeight:'bold',textAlign:'center'}}>Or</Text>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:10}}>
            <TouchableOpacity style={{padding:5,backgroundColor:colors.grey,borderRadius:25}}>
                <Image source={require("../../../assets/AuthImage/google.png")}
                  style={{width:50,height:50}}
                />
            </TouchableOpacity>
           

            <TouchableOpacity style={{padding:5,backgroundColor:colors.grey,borderRadius:25}}>
                <Image source={require("../../../assets/AuthImage/facebook.png")}
                  style={{width:50,height:50}}
                />
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,backgroundColor:colors.grey,borderRadius:25}}>
                <Image source={require("../../../assets/AuthImage/apple.png")}
                  style={{width:50,height:50}}
                />
            </TouchableOpacity>
        </View>

        <View style={{marginTop:10,flexDirection:'row',justifyContent:'center'}}>
            <Text style={{fontWeight:'bold'}}>Already have an account?</Text>

            <TouchableOpacity onPress={()=>navigation.navigate("LoginScreen")}>
                <Text style={{color:colors.accentRed,fontWeight:'bold'}}>Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default SingUpScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.accent
    },
    touArrow:{
        padding:5,
    
        backgroundColor:colors.accentRed,
        borderTopRightRadius:16,
        borderBottomLeftRadius:16,
        marginLeft:15,marginTop:10
    },
    boxLogin:{
        flex:1,
        backgroundColor:colors.white,
        paddingTop:8,paddingHorizontal:8,
        borderTopRightRadius:50,borderTopLeftRadius:50
    },
    text:{
        color:colors.black,
        marginLeft:50,marginTop:10,
        fontSize:16,fontWeight:'bold',marginBottom:5
    },
    textInput:{
        padding:10,marginHorizontal:40,
        borderRadius:15,
        backgroundColor:colors.grey
    },
    logintext:{
        backgroundColor:colors.red,
        borderRadius:20,
        marginTop:20,padding:15,marginHorizontal:35,
        alignItems:'center',justifyContent:'center'
    },
})