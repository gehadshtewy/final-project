import * as React from "react";
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from "./TabNavigation";
import { Icon } from "react-native-elements";
import { colors } from "../global/colores";
import BusinessConsole from "../Screens/Business/BusinessConsole";
import BusinessStack from "./BusinessStack";
import DrawerContent from "../Componants/DrawerContent";
const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
    return(
          <Drawer.Navigator
            drawerContent={props =><DrawerContent {...props} />}
          >
            <Drawer.Screen 
              name="TabNavigation"
              component={TabNavigation}

              options={{
                title:'Client',
                headerShown:false,
                drawerIcon:({foucssed,size})=>(
                    <Icon
                      type="material-community"
                      name="home"
                      color={foucssed ? '#7cc' : colors.accent}
                      size={30}
                    />
                )
              }}
            />

            <Drawer.Screen 
              name="Business Console"
              component={BusinessStack}

              options={{
                title:'Business console',
                headerShown:false,
                drawerIcon:({foucssed,size})=>(
                    <Icon
                      type="material"
                      name="business"
                      color={foucssed ? '#7cc' : colors.accent}
                      size={30}
                    />
                )
              }}
            />
          </Drawer.Navigator>
    )
}