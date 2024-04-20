import React, { useState,useEffect } from "react";
import { View,Text,StyleSheet, ScrollView,FlatList,TouchableOpacity,Image } from "react-native";
import { Icon } from "react-native-elements";
//FIREBASE
import { database, storage } from '../../firebaseConfig'
import { collection, addDoc, getDocs ,deleteDoc, doc,} from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable, getStorage, uploadBytes } from 'firebase/storage'
import { colors } from "../../global/colores";
import { firebase } from "@react-native-firebase/auth";


export default function ShoppingScreen({navigation}){
    const [carts,setCarts] = useState([])

    const loadCarts = async()=>{
        try {
            const q = await getDocs(collection(database,"Cart"))
            setCarts(q.docs.map((doc) => ({
              uid: doc.id,
              ...doc.data()
            })))
          } catch (error) {
            toast.error(error)
          }
    }
    useEffect(() => {
        loadCarts();
    },[])

    
      
    const deleteCart = async(id)=>{
        console.log("id//////: ",id)
        await deleteDoc(doc(database,'Cart',id))
        .then(()=>{
            console.log('deleted');
        })
        .catch(()=>{
            console.log('not');
        })
    }
    
    return(
        <View style={styles.container}>
           <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}> 
             <Text style={{fontSize:25,fontWeight:'bold'}}><Text style={{fontSize:25,fontWeight:'bold',color:colors.accentRed}}>Y</Text>our 
             <Text><Text style={{fontSize:25,fontWeight:'bold',color:colors.accentRed}}>C</Text>art</Text></Text>
             <Text style={{marginTop:5}}>here you can to see all the items you are selected...</Text>
           </View>
           <ScrollView showsVerticalScrollIndicator={false}>
             {
                carts&&carts.map((item,index)=>(
                    <View key={index} activeOpacity={0.9} style={styles.viewCart}>
                        <View style={styles.boxCart}>
                            <View style={{width:100,height:100,}}>
                                <Image src={item.foodImage} style={{width:'100%',height:'100%',resizeMode:'stretch'}} />
                            </View>
                            <View style={{position:'relative',bottom:30,left:50,}}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:colors.orange}}>{item.foodName}</Text>
                                
                            </View>

                            <TouchableOpacity onPress={()=>deleteCart(item.uid)} style={{position:'absolute',top:5,right:10}}>
                              <Icon name='delete-outline' color={colors.accentRed} size={28}/>
                            </TouchableOpacity>

                            <View style={{position:'absolute',left:120}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Price: <Text style={{color:colors.orange}}>{item.foodPrice} ₪</Text></Text>
                            </View>
                            
                            <View style={{position:'absolute',bottom:10,right:50,flexDirection:'row'}}>
                                <Text style={{fontSize:18,fontWeight:'bold'}}>Reting:<Text style={{color:colors.orange}}>{item.foodRating}</Text></Text>
                                <Text> | </Text>
                                <Text style={{fontSize:18,fontWeight:'bold'}}>Time: <Text style={{color:colors.orange}}>{item.delivery}</Text> min</Text>
                            </View>
                            
                            <View style={{flexDirection:'row',margin:5,marginTop:10}}>
                                
                                <Icon name='remove-circle' style={{}} color={colors.accent} size={32}/>
                                <Text style={{width:10,height:20,marginTop:6,marginRight:2,marginLeft:2}}>0</Text>
                                <Icon name='add-circle' style={{}} color={colors.accent} size={32}/>
                            </View>
                            
                        </View>
                        
                    </View>
                    
                ))
             }
           </ScrollView>
            <TouchableOpacity onPress={()=> navigation.navigate('PaymentScreen')} style={styles.viewTotal}>
                <Text style={{fontSize:20,fontWeight:'bold',margin:10,marginLeft:30}}>total price:</Text>
                <Icon name='emoji-nature' style={{marginTop:8}} color={colors.accentRed} size={32}/>
                <Icon name='emoji-nature' style={{marginTop:8}} color={colors.accentRed} size={32}/>
                <Icon name='emoji-nature' style={{marginTop:8}} color={colors.accentRed} size={32}/>
                <Text style={{fontSize:20,fontWeight:'bold',marginRight:30,marginTop:12}}>500 <Text style={{color:colors.accentRed}}>₪</Text></Text>
                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:40
    },
    viewCart:
    {
        width:'100%',
        height:130,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    boxCart:{
        width:'90%',
        height:120,
        backgroundColor:colors.white,
        borderRadius:20,elevation:4,
        padding:15,
        position:'relative',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      },
      viewTotal:
      {
        width:'100%',
        height:60,
        borderWidth:1,
        backgroundColor:colors.accent,
        borderTopRightRadius:50,
        borderBottomLeftRadius:50,
        flexDirection:'row',
        justifyContent:'space-between'

    
    }
})