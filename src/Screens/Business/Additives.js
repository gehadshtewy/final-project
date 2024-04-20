import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../global/colores'
import { Icon } from "react-native-elements";
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';

//FIREBASE
import { database, storage } from '../../firebaseConfig'
import { collection, addDoc, getDocs, } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable, getStorage, uploadBytes } from 'firebase/storage'


const Additives = ({navigation,route}) => {

    const foodId = route.params;
     console.log("foodId:",foodId)
    const [image, setImage] = useState(null);

    {/* used picker image */ }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    
    const onSubmitMethod = async (value) => {
         value.foodId=foodId;
        //add blob file to firebase
        const res = await fetch(image);
        const blob = await res.blob();
        const storageRef = ref(storage, 'AdditivesImage/' + Date.now() + 'jpg');

        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).then((res) => {
            getDownloadURL(storageRef).then(async (downlodUrl) => {
                console.log(downlodUrl);
                value.image = downlodUrl;

                const docRef = await addDoc(collection(database, "Additives"), value)
                if (docRef.id) {
                    console.log("docment add");
                }

            })
        });


    }
  return (
    <View style={styles.continer}>
    <View>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backIcon}>
        <   Icon name='navigate-before' size={28} color={colors.black}  />
        </TouchableOpacity>
    </View>
    <Text style={{ fontSize: 30, fontWeight: 'bold',marginLeft:50 }}>Add New <Text style={{ color: colors.accentRed }}>Post</Text></Text>
    <Text style={{ fontSize: 18 }}>Add your Additives for your food...</Text>

    {/* add form to create the restaurant */}
    <View style={{ paddingTop: 10 }}>
        <Formik
            initialValues={{ image: '' }}
            onSubmit={value=>onSubmitMethod(value)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>

                    <TouchableOpacity onPress={pickImage} style={{alignItems:'center',justifyContent:'center'}}>
                        {
                            image ? <Image source={{ uri: image }}
                                style={{ width: 160, height: 160, borderRadius: 15, marginRight:20, marginBottom: 5 }}
                            />
                                :
                                <Image source={require('../../../assets/image/placeholder.jpg')}
                                    style={{ width: 160, height: 160, borderRadius: 15,marginRight:20, marginBottom: 5 }}
                                />
                        }
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.btnCreate, { marginTop: 10, backgroundColor: colors.accentRed, borderColor: colors.accentRed, width: '60%', marginLeft: 70}]}
                        onPress={handleSubmit}>
                        <Text style={{ fontSize: 20, color: colors.black, fontWeight: 'bold' }}>submit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    </View>

    
</View>
  )
}

export default Additives

const styles = StyleSheet.create({
    continer: {
        marginTop: 30,
        padding: 20,
        paddingLeft: 40
    },
    backIcon:{
        width:40,
        height:40,
        borderRadius:10,
        borderWidth:1,
        borderColor:colors.lightGray,
        backgroundColor:colors.accent,
        justifyContent:'center',
        alignItems:'center'
      },
    textInput:{
       padding:10,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:colors.white,
    },
    btnCreate:{
        backgroundColor:colors.orange,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12,
        borderWidth:1,
        borderColor:colors.grey,
        height:50,
        paddingHorizontal:20,

    },
})