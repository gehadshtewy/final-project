import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet,Image,ScrollView,FlatList,TouchableOpacity,TouchableWithoutFeedback,TextInput } from "react-native";
import { colors } from "../../global/colores";
import HomeHeader from '../../Componants/HomeHeader'
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { Categories } from "../../global/data";
import CategoriesCom from "../../Componants/CategoriesCom";
import RestaurantCart from '../../Componants/RestaurantCart'
import PopularCom from "../../Componants/PopularCom";

//FIREBASE
import { database, storage } from '../../firebaseConfig'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'


export default function HomeScreen({navigation,route}){

    const [currentSelected,setCurrentSelected]=useState([0])
    const [restaurant, setRestaurant] = useState([])
    const [catagories,setCatagories] =useState([])

    const loadRestaurant = async() => {
      try {
        let q = await getDocs(collection(database, "Restaurand"));
        setRestaurant(q.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })))
        q = await getDocs(collection(database,"Catagory"))
        setCatagories(q.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })))
      } catch (error) {
        toast.error(error)
      }
    }
    useEffect(() => {
      loadRestaurant();
    },[])

    console.log('data:  ',restaurant)
  
    return(
      <View style={{width:'100%',height:'100%',backgroundColor:colors.white,flex:1}}>
        <HomeHeader navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={{width:'100%',height:'100%',backgroundColor:colors.white,position:'relative'}}>
          
         
          <View style={{paddingTop:10,paddingLeft:20}}>
            <Text style={{fontSize:16,opacity:0.5,color:colors.black}}>Food</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:40,color:colors.black,fontWeight:'bold',letterSpacing:2}}>
              <Text style={{fontSize:45,color:colors.accentRed}}>D</Text>eli<Text style={{color:colors.accentRed}}>V</Text>ery</Text>
              <Icon name='trending-up' style={{marginLeft:5,paddingTop:20}} color={colors.accent} size={32}/>
            </View>
          </View>
           {/*section search */}
          <View style={{paddingHorizontal:20,paddingVertical:10,flexDirection:'row',alignItems:'center'}}>
             <Icon name='search' style={{color:colors.black,fontSize:20,opacity:0.8}}/>
              <TextInput placeholder='Search...' style={styles.textInputSearch}/>
          </View>
            
            {/*render catigory */}
            <Text style={styles.categoryText}>Categories</Text>
             
             <CategoriesCom categories={catagories} currentSelected={currentSelected} setCurrentSelected={setCurrentSelected}  />
             

             {/* render Restaurant */}
             <Text style={styles.popularText}>Restaurant</Text>
              <RestaurantCart restaurant={restaurant} navigation={navigation} />

            {/* popular 
           <Text style={styles.popularText}>Popular</Text>
            <PopularCom  categories={Categories} currentSelected={currentSelected} setCurrentSelected={setCurrentSelected} navigation={navigation}  />
            */}
           {/*Categories[currentSelected].items.map(renderItems)*/}
             
        </View>
      </ScrollView>
    </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    textInputSearch:{
        color:colors.black,
        fontSize:16,
        paddingVertical:5,
        borderBottomWidth:1,
        borderBottomColor:colors.black + 20,
        width:'90%',
        marginLeft:10
      },
    
      categoryText:{
        paddingTop:20,
        paddingHorizontal:20,
        fontSize:20,
        fontWeight:'bold',
        color:colors.black,letterSpacing:1
      },
      renderCategoriesStyle:{
        width:120,
        height:150,
        justifyContent:'space-evenly',
        alignItems:'center',
        borderRadius:20,margin:10,
        elevation:5
      },
      iconstycatigory:{
        width:30,
        height:30,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center'
      },
      popularText:{
        paddingTop:20,
        paddingHorizontal:20,
        fontSize:18,
        fontWeight:'bold',
        color:colors.black
      },
      boxpopular:{
        width:'90%',
        height:160,
        backgroundColor:colors.white,
        borderRadius:20,elevation:4,
        position:'relative',
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }

})