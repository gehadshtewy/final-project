import { View, Text } from 'react-native'
import React from 'react';
import {createStackNavigator} from'@react-navigation/stack';


import shopping from '../Screens/shopping/shopping'
import MapScreen from '../Screens/shopping/MapScreen';
import PaymentScreen from '../Screens/shopping/PaymentScreen';



const ShoppingStack1 = createStackNavigator();

export default function ShoppingStack() {
  return (
    <ShoppingStack1.Navigator>

        <ShoppingStack1.Screen
          name="shopping"
          component={shopping}
          options={
            ()=>({
                headerShown:false
            })
          }
        />

        <ShoppingStack1.Screen
          name="MapScreen"
          component={MapScreen}
          options={
            ()=>({
                headerShown:false
            })
          }
        />

        <ShoppingStack1.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={
            ()=>({
                headerShown:false
            })
          }
        />
       

        
    </ShoppingStack1.Navigator>
  )
}