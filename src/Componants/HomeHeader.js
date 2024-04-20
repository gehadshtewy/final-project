import React from "react";
import {View,Text,StyleSheet } from 'react-native'
import { colors } from "../global/colores";
import {withBadge,Icon} from 'react-native-elements'


export default function HomeHeader({navigation}){

   const BadgeIcon = withBadge(0)(Icon)


    return(
        <View style={styles.header}>
             <View style={{alignItems:'center',justifyContent:'center',marginLeft:15}}>
                <Icon
                  type="material-community" 
                  name="menu"
                  color={colors.accent}
                  size={32}
                  onPress={()=>{
                     navigation.toggleDrawer()
                  }}
                  
                />
             </View>

             {/*<View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:colors.accent,fontSize:25,fontWeight:'bold'}}>Delicious</Text>
               </View>*/}
            
             <View style={{alignItems:'center',justifyContent:'center',marginRight:15}}>
                <BadgeIcon
                   type = "material-community"
                   name = "cart"
                   size = {35}
                   color={colors.accent}
                />
             </View>

        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        backgroundColor:colors.white,
        height:40,
        marginTop:38,
        justifyContent:'space-between'
    },
})