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

const CreateFood = ({navigation,route}) => {
    const restaurantId = route.params;
     console.log("res:",restaurantId)
    const [image, setImage] = useState(null);
    const storage = getStorage();

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
        value.restaurantId=restaurantId;
        //add blob file to firebase
        const res = await fetch(image);
        const blob = await res.blob();
        const storageRef = ref(storage, 'foodsImage/' + Date.now() + 'jpg');

        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).then((res) => {
            getDownloadURL(storageRef).then(async (downlodUrl) => {
                console.log(downlodUrl);
                value.image = downlodUrl;

                const docRef = await addDoc(collection(database, "Foods"), value)
                if (docRef.id) {
                    console.log("docment add");
                    const uidf=docRef.id;
                    console.log(uidf);
                    navigation.navigate('Additives',{foodId:uidf});
                }

            })
        });


    }

    return (
        <View style={styles.continer}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backIcon}>
                <   Icon name='navigate-before' size={28} color={colors.black}  />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('Ingredient')} style={styles.backIcon}>
                <   Icon name='navigate-next' size={28} color={colors.black}  />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 30, fontWeight: 'bold',marginLeft:50 }}>Add New <Text style={{ color: colors.accentRed }}>Post</Text></Text>
            <Text style={{ fontSize: 18 }}>Create your food product and make mony...</Text>

            {/* add form to create the restaurant */}
            <View style={{ paddingTop: 10 }}>
                <Formik
                    initialValues={{ foodName: '', description: '', foodPrice: '', image: '', foodRating: '',
                    foodSize:'',foodCrust:'',delivery:'',availabling:''
                    }}
                    onSubmit={value=>onSubmitMethod(value)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>

                            <TouchableOpacity onPress={pickImage}>
                                {
                                    image ? <Image source={{ uri: image }}
                                        style={{ width: 120, height: 120, borderRadius: 15, marginLeft: 0, marginBottom: 5 }}
                                    />
                                        :
                                        <Image source={require('../../../assets/image/placeholder.jpg')}
                                            style={{ width: 120, height: 120, borderRadius: 15, marginLeft: 0, marginBottom: 5 }}
                                        />
                                }
                            </TouchableOpacity>
                            <TextInput
                                style={styles.textInput}
                                placeholder='food Name'
                                value={values.foodName}
                                onChangeText={handleChange('foodName')}
                            />


                            <TextInput
                                style={[styles.textInput, { marginTop: 5, textAlignVertical: 'top', }]}
                                placeholder='Description'
                                value={values.description}
                                numberOfLines={5}
                                onChangeText={handleChange('description')}
                            />

                            <TextInput
                                style={[styles.textInput, { marginTop: 5, }]}
                                placeholder='Price'
                                value={values.foodPrice}
                                onChangeText={handleChange('foodPrice')}
                            />

                            <TextInput
                                style={[styles.textInput, { marginTop: 5, }]}
                                placeholder='Rating'
                                value={values.foodRating}
                                onChangeText={handleChange('foodRating')}
                            />

                            <TextInput
                                style={[styles.textInput, { marginTop: 5, }]}
                                placeholder='Size'
                                value={values.foodSize}
                                onChangeText={handleChange('foodSize')}
                            />

                            <TextInput
                                style={[styles.textInput, { marginTop: 5, }]}
                                placeholder='Crust'
                                value={values.foodCrust}
                                onChangeText={handleChange('foodCrust')}
                            />

                            <TextInput
                                style={[styles.textInput, { marginTop: 5, }]}
                                placeholder='delivery'
                                value={values.delivery}
                                onChangeText={handleChange('delivery')}
                            />

                            <TextInput
                                style={[styles.textInput, { marginTop: 5, }]}
                                placeholder='availabling'
                                value={values.availabling}
                                onChangeText={handleChange('availabling')}
                            />


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

export default CreateFood

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