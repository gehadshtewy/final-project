import { View, Text } from 'react-native'
import React from 'react';
import {createStackNavigator} from'@react-navigation/stack';

import BusinessConsole from '../Screens/Business/BusinessConsole';
import CreateFood from '../Screens/Business/CreateFood';
import Additives from '../Screens/Business/Additives';



const BusinessStack1 = createStackNavigator();

export default function BusinessStack() {
  return (
    <BusinessStack1.Navigator>

        <BusinessStack1.Screen
          name="BusinessConsole"
          component={BusinessConsole}
          options={
            ()=>({
                headerShown:false
            })
          }
        />

        <BusinessStack1.Screen
          name="CreateFood"
          component={CreateFood}
          options={
            ()=>({
                headerShown:false
            })
          }
        />

        <BusinessStack1.Screen
          name="Additives"
          component={Additives}
          options={
            ()=>({
                headerShown:false
            })
          }
        />

       

        
    </BusinessStack1.Navigator>
  )
}