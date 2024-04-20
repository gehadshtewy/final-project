import React from "react";
import { View,Text,StyleSheet } from "react-native";

export default function FavoriteScreen(){
    return(
        <View style={styles.container}>
            <Text>favoriteScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
})