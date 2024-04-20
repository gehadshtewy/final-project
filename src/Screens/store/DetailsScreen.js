import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import { colors } from '../../global/colores';
import { Image } from 'react-native';

//FIREBASE
import { database, storage } from '../../firebaseConfig'
import { collection, addDoc, getDocs , } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable, getStorage, uploadBytes } from 'firebase/storage'


const DetailsScreen = ({navigation,route}) => {
  const {data} = route.params;
    
  const addToCart = async(data) =>{
    const docRef = await addDoc(collection(database,"Cart"),data)
    if(docRef.id){
      console.log('item added')
    }else{
      console.log('not adding')
    }
  }

  return (
    <View style={{paddingTop:40,width:'100%',height:'100%',backgroundColor:colors.white}}>
     
      <View style={{padding:20}}>
       
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backIcon}>
          <Icon name='navigate-before' size={28} color={colors.black}  />
        </TouchableOpacity>
      </View>

      <Text style={{fontSize:28,fontWeight:'800',paddingHorizontal:20,
          maxWidth:310,color:colors.black}}>
          {data.foodName}
      </Text>
          {/*Price */}
      <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:20}}>
        <Text style={{fontSize:28,color:colors.accentRed,fontWeight:'900',paddingRight:5,
              paddingBottom:8}}>₪</Text>
        <Text style={{fontSize:38,color:colors.accentRed,fontWeight:'900'}}>{data.foodPrice}</Text>
      </View>
           {/*Size,crust,delivery */}
      <View style={{flexDirection:'row',maxHeight:330,width:'100%',alignItems:'center'}}>
        <View style={{paddingHorizontal:20}}>

           <View style={{paddingVertical:20}}>
             <Text style={{fontSize:16,color:colors.black,opacity:1}}>Size</Text>
             <Text style={{fontSize:25,color:colors.black,fontWeight:'700'}}>{data.foodWeight}</Text>
           </View>

           <View style={{paddingVertical:20}}>
             <Text style={{fontSize:16,color:colors.black,opacity:1}}>Crust</Text>
             <Text style={{fontSize:25,color:colors.black,fontWeight:'700'}}>{data.foodCrust}</Text>
           </View>

           <View style={{paddingVertical:20}}>
             <Text style={{fontSize:16,color:colors.black,opacity:1}}>Delivery</Text>
             <Text style={{fontSize:25,color:colors.black,fontWeight:'700'}}>{data.delivery} min</Text>
           </View>

        </View>
           {/* Image Look */}
        <View style={{width:350,height:380}}>
          <Image src={data.foodImage} style={{width:'100%',height:'100%',resizeMode:'contain'}}/>
        </View>

      </View>
      

      <Text style={{paddingTop:20,paddingHorizontal:20,fontSize:20,fontWeight:'700',color:colors.black}}>
          Ingredients
      </Text>
       {/*<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
         {
          data.ingredients.map((item,index)=>{
            return(
              <View key={index} style={styles.viewIngredients}>
                <Image source={item} style={{width:'100%',height:'100%',resizeMode:'contain'}} />
              </View>
            )
          })
         }

        </ScrollView>*/}

       <TouchableOpacity onPress={()=>addToCart(data)} style={styles.bottomAdd}>
          <Text style={{fontSize:38,fontWeight:'900',color:colors.accentRed}}>ADD</Text>
       </TouchableOpacity>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
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
  viewIngredients:{
    margin:12,
    width:80,
    height:80,
    borderRadius:20,
    backgroundColor:colors.white,
    elevation:5
  },
  bottomAdd:{
    width:200,
    height:60,
    marginLeft:'27%',
    bottom:10,
    borderTopRightRadius:30,
    borderBottomLeftRadius:30,
    backgroundColor:colors.accent,
    justifyContent:'center',
    alignItems:'center'
  }
})