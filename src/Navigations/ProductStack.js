import { View, Text } from 'react-native'
import React from 'react';
import {createStackNavigator} from'@react-navigation/stack';

import HomeScreen from '../Screens/store/HomeScreen';
import DetailsScreen from '../Screens/store/DetailsScreen';
import FoodScreen from '../Screens/store/FoodScreen';




const ProductStack1 = createStackNavigator();

export default function ProductStack() {
  return (
    <ProductStack1.Navigator>

        <ProductStack1.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={
            ()=>({
                headerShown:false
            })
          }
        />

        <ProductStack1.Screen
          name="FoodScreen"
          component={FoodScreen}
          options={
            ()=>({
                headerShown:false
            })
          }
        />

        <ProductStack1.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={
            ()=>({
                headerShown:false
            })
          }
        />

       

        
    </ProductStack1.Navigator>
  )
}