import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { colors } from '../global/colores';
import { Icon } from "react-native-elements";

const PopularCom = ({categories,currentSelected,setCurrentSelected,navigation}) => {

    const renderItems = (data,index) =>{
        return(
         <TouchableOpacity key={index} activeOpacity={0.9} style={{width:'100%',height:180,justifyContent:'center',alignItems:'center'}}
           //onPress={()=> navigation.navigate('DetailsScreen',{data:data})}
         >
           <View style={styles.boxpopular}>
              <View style={{marginBottom:50}}>
                 <View style={{flexDirection:'row',alignItems:'center',
                   display: data.isTopOfTheWeek ? 'flex':'none'}}>
                   <Icon name='star-rate' size={10} color={colors.accent} />
                   <Text style={{fontSize:12,color:colors.black,opacity:0.8,marginLeft:5}}>
                     Top of the week
                   </Text>
                 </View>
   
                 <Text style={{fontSize:22,color:colors.black,fontWeight:'bold',padding:10}}>
                   {data.name}
                 </Text>
   
                 <Text style={{fontSize:12,opacity:0.5,color:colors.black}}>
                   {data.weight}
                 </Text>
              </View>
                {/* render image of food */}
              <View style={{height:150,width:150,marginRight:-45}}>
                 <Image source={data.image}
                  style={{width:'100%',height:'100%',resizeMode:'center'}} />
              </View>
   
              <View style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center'}}>
                <View style={{width:85,height:50,backgroundColor:colors.accent,
                  borderTopRightRadius:20,borderBottomLeftRadius:20,justifyContent:'center'
                  ,alignItems:'center'}}>
                     <Icon name='add' color={colors.black} size={18} /> 
                </View>
   
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:20}}>
                 <Icon name='grade' color={colors.black} size={18} style={{paddingRight:5}}/>
                 <Text style={{fontSize:15,fontWeight:'bold',color:colors.black}}>
                   {data.rating}
                 </Text>
                </View>
              </View>
           </View>
         </TouchableOpacity>
        )
      }

  return (
    <View>
      {categories[currentSelected].items.map(renderItems)}
    </View>
  )
}

export default PopularCom

const styles = StyleSheet.create({
    boxpopular:{
        width:'90%',
        height:160,
        backgroundColor:colors.white,
        borderRadius:20,elevation:4,
        position:'relative',
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }
})