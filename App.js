import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/Navigations/TabNavigation'
import { colors } from './src/global/colores';
import AuthStack1 from './src/Navigations/StackAuth';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle = "light-content"
        backgroundColor={colors.accent}
        />
        <AuthStack1 />
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
