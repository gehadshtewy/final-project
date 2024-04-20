import { StyleSheet, Text, View,TouchableOpacity,ScrollView,TextInput, Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import { colors } from '../../global/colores'
import { Icon } from "react-native-elements";
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';


//FIREBASE
import { database, storage,auth } from '../../firebaseConfig'
import { collection, addDoc, getDocs , } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable, getStorage, uploadBytes } from 'firebase/storage'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged } from 'firebase/auth';

const BusinessConsole = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [show,setShow] = useState(false)
  const [catagories,setCatagories] =useState([])
  const [currentUser, setCurrentUser] = useState([]);
  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // No user is signed in
        setCurrentUser([]);
      }
    });
  
    return unsubscribe; // Cleanup the listener when component unmounts
  }, []); 
   
  const loadCatagories = async() => {
      try {
        const q = await getDocs(collection(database,"Catagory"))
        setCatagories(q.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })))
      } catch (error) {
        toast.error(error)
      }
  }
    useEffect(() => {
        loadCatagories();
    },[])

    {/* used picker image */}
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [8, 4],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const onSubmitMethod=async(value,userId)=>{
      value.userId=userId;
      //add blob file to firebase
      const res=await fetch(image);
      const blob = await res.blob();
      const storageRef = ref(storage, 'createRestaurant/'+Date.now()+'jpg');

      uploadBytes(storageRef, blob).then((snapshot) => {
       console.log('Uploaded a blob or file!');
     }).then((res)=>{
       getDownloadURL(storageRef).then(async(downlodUrl)=>{
         console.log(downlodUrl);
         value.image=downlodUrl;

         const docRef = await addDoc(collection(database,"Restaurand"),value)
         if(docRef.id){
          console.log("docment add");
          const uid=docRef.id;
          navigation.navigate('CreateFood',{restuarantId:uid});
          
          
         }
         
       })
     });
     
     
   }
    return (
        <View style={styles.container}>
                {/*<View>
                    <Icon name='add-business' size={55} color={colors.orange} />
                    <Text style={{fontSize:20,fontWeight:'bold',marginLeft:50}}>Not Registered yet</Text>
                    <Text>Build your Business with Delicious compony</Text>
                </View>
    
                <View style={{marginHorizontal:20,marginVertical:10}}>
                    < TouchableOpacity style={styles.btnCreate} onPress={()=>{setShow(true)}}>
                        <Text style={styles.textCreate}>Create Restaurant</Text>
                    </TouchableOpacity>
                  </View>*/}
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backIcon}>
                <   Icon name='navigate-before' size={28} color={colors.black}  />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('CreateFood')} style={styles.backIcon}>
                <   Icon name='navigate-next' size={28} color={colors.black}  />
                </TouchableOpacity>
            </View>

              <Text style={{ fontSize: 30, fontWeight: 'bold',marginLeft:50 }}>Add New <Text style={{ color: colors.accentRed }}>Post</Text></Text>
              <Text style={{ fontSize: 18 }}>Create your Restaurant and make mony...</Text>

                    {/* add form to create the restaurant */}
                    <View style={{paddingTop:10}}>
                      <Formik 
                        initialValues={{restaurantName:'',description:'',address:'',image:'',categoryId:''}}
                        onSubmit={value=>onSubmitMethod(value,currentUser.uid)}
                      >
                        {({handleChange,handleBlur,handleSubmit,values,setFieldValue})=>(
                          <View>

                            <TouchableOpacity onPress={pickImage}>
                              {
                                image? <Image source={{uri:image}}
                                style={{ width: 120, height: 120, borderRadius: 15, marginLeft: 0, marginBottom: 5 }}
                               />
                               :
                               <Image source={require('../../../assets/image/placeholder.jpg')}
                               style={{ width: 120, height: 120, borderRadius: 15, marginLeft: 0, marginBottom: 5 }}
                              />
                              }
                            </TouchableOpacity>
                            <TextInput
                              style={[styles.textInput,{marginTop:10}]}
                              placeholder='Restaurant Name'
                              value={values.restaurantName}
                              onChangeText={handleChange('restaurantName')}
                            />

                             {/* category selected */}
                             <View style={[styles.textInput,{marginTop:10,padding:0}]}>
                              <Picker
                                selectedValue={values.categoryId}
                                onValueChange={itemValue=>setFieldValue('categoryId',itemValue)}
                                
                              >
                                  {catagories&&catagories.map((item,index)=>(
                                    <Picker.Item key={index}
                                      label={item.categoryName}
                                      value={item.id} />
                                  ))}
                                
                              </Picker>
                            </View>
                            
                            <TextInput
                              style={[styles.textInput,{marginTop:10,textAlignVertical:'top',}]}
                              placeholder='Description'
                              value={values.description}
                              numberOfLines={5}
                              onChangeText={handleChange('description')}
                            />

                            <TextInput
                              style={[styles.textInput,{marginTop:10,}]}
                              placeholder='Address'
                              value={values.address}
                              onChangeText={handleChange('address')}
                            />

                           
                            <TouchableOpacity 
                              style={[styles.btnCreate, { marginTop: 20, backgroundColor: colors.white, borderColor: colors.accentRed, width: '60%', marginLeft: 70}]}
                              onPress={handleSubmit}>
                              <Text style={{fontSize:25,color:colors.accentRed,fontWeight:'bold'}}>submit</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </Formik>
                    </View>
         </View>
             
         
       
    )

}

export default BusinessConsole

const styles = StyleSheet.create({

    container:{
        backgroundColor:colors.white,
        marginTop: 40,
        padding: 20,
        paddingLeft: 40,
        flex:1
        
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
    btnCreate:{
        backgroundColor:colors.orange,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12,
        borderWidth:1,
        borderColor:colors.grey,
        height:50,
        paddingHorizontal:20,
        width:"100%"
    },
    textCreate:{
        fontWeight:'bold',
        fontSize:28,
    },
    text:{
        color:colors.black,
        marginLeft:50,marginTop:10,
        fontSize:16,fontWeight:'bold',marginBottom:5
    },
    textInput:{
      padding:10,
      borderRadius:10,
      borderWidth:1,
      backgroundColor:colors.white,
      marginTop:10
    },
    
})