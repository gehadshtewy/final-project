import { View, Text } from 'react-native'
import React from 'react';
import {createStackNavigator} from'@react-navigation/stack';

import ProductStack from './ProductStack';
import LoginScreen from '../Screens/auth/LoginScreen';
import SingUpScreen from '../Screens/auth/SingUpScreen';
import DrawerNavigator from './DrawerNavigation';

const Auth = createStackNavigator();

export default function AuthStack1(){
    return(
        <Auth.Navigator>

            <Auth.Screen 
               name="LoginScreen"
               component={LoginScreen}
               options={
                 ()=>({
                     headerShown:false
                 })
               }
            />

            <Auth.Screen 
               name="SingUpScreen"
               component={SingUpScreen}
               options={
                 ()=>({
                     headerShown:false
                 })
               }
            />

             <Auth.Screen 
               name="DrawerNavigator"
               component={DrawerNavigator}
               options={
                 ()=>({
                     headerShown:false
                 })
               }
            />

    
        </Auth.Navigator>
    )
}