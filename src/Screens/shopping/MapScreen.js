import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MapScreen = () => {
  return (
    <View style={styles.contianer}>
      <Text>MapScreen</Text>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
    contianer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})