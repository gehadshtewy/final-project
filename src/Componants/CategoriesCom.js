import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { colors } from '../global/colores';
import { Icon } from "react-native-elements";


const CategoriesCom = ({categories,currentSelected,setCurrentSelected}) => {

    const renderCategories = ({item,index}) => {
        return(
          <TouchableOpacity activeOpacity={0.9} onPress={()=>setCurrentSelected(index)}>
            <View style={[styles.renderCategoriesStyle,{backgroundColor:currentSelected == index ? colors.accent : colors.white,}]}>
              <View style={{width:60,height:60}}>
                <Image src={item.categoryImage} style={{width:'100%',height:'100%',resizeMode:'center'}} />
              </View>
              <Text style={{fontSize:16,color:colors.black,fontWeight:'600'}}>{item.categoryName}</Text>
              <View style={[styles.iconstycatigory,
                {backgroundColor:currentSelected == index ? colors.white : colors.accentRed}]}>
                <Icon name='navigate-next' size={20}
                 color={currentSelected == index ? colors.black : colors.white}/>
              </View>
            </View>
          </TouchableOpacity>
        )
       };
  return (
    <View>
        <FlatList
            horizontal={true}
            data={categories}
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
        />
    </View>
  )
}

export default CategoriesCom

const styles = StyleSheet.create({
    renderCategoriesStyle:{
        width:120,
        height:150,
        justifyContent:'space-evenly',
        alignItems:'center',
        borderRadius:20,margin:10,
        elevation:5
      },
})