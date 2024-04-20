import React from "react";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Icon } from "react-native-elements";
import HomeScreen from "../Screens/store/HomeScreen";
import FavoriteScreen from "../Screens/favorites/favorite";
import ShoppingScreen from "../Screens/shopping/shopping";
import ProductStack from "./ProductStack";
import ShoppingStack from "./ShoppingStack";
const Tabs = createBottomTabNavigator();

export default function TabNavigation(){
    return(
         <Tabs.Navigator>

            <Tabs.Screen
                   name="ProductStack"
                   component={ProductStack}
                   options={
                    {
                      headerShown:false,
                      tabBarLabel:'Home',
                      tabBarIcon:({color,size})=>(
                        <Icon
                          name="home"
                          type="material"
                            color={color}
                             size={28}
                        />
                      )
                  
                    }}
            />
              
              <Tabs.Screen
                   name="favoriteScreen"
                   component={FavoriteScreen}
                   options={
                    {
                      headerShown:false,
                      tabBarLabel:'Favorite',
                      tabBarIcon:({color,size})=>(
                        <Icon
                          name="favorite"
                          type="MaterialIcons"
                            color={color}
                             size={28}
                        />
                      )
                  
                    }}
            />
            
            <Tabs.Screen
                   name="ShoppingStack"
                   component={ShoppingStack}
                   options={
                    {
                      headerShown:false,
                      tabBarLabel:'Shopping',
                      tabBarIcon:({color,size})=>(
                        <Icon
                          name="shopping-cart"
                          type="MaterialIcons"
                            color={color}
                             size={28}
                        />
                      )
                  
                    }}
            />
         </Tabs.Navigator>
    )
}

