import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PaymentScreen</Text>
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})