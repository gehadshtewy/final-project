import React,{useState,useContext,useEffect} from "react";
import { Icon,Button,Avatar } from "react-native-elements";
import { View,Text,StyleSheet,Linking,Alert,Switch,Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItemList,DrawerItem} from '@react-navigation/drawer'
import { colors } from "../global/colores";


//FIREBASE
import { database, storage,auth } from '../firebaseConfig'
import { collection, addDoc, getDocs, } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable, getStorage, uploadBytes } from 'firebase/storage'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged } from 'firebase/auth';


export default function DrawerContent(props){

    const [userData,setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState([]);

    {/*const loadUser = async() => {
        try {
          const q = await getDocs(collection(database, "User"));
          setUserData(q.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })))
          
        } catch (error) {
          toast.error(error)
        }
    }
   useEffect(()=>{
    loadUser();
   },[])
console.log(userData)*/}
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // No user is signed in
        setCurrentUser([]);
      }
    });
  
    return unsubscribe; // Cleanup the listener when component unmounts
  }, []); 
  
  
    return(
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
              <View style={{backgroundColor:colors.accent}}>
                <View style={styles.viewAvatar}>
                    <Avatar
                        rounded  
                        styles={styles.avatar} 
                        size={75}
                        source={{uri:'https://dubai010.com/wp-content/uploads/2020/11/%D9%85%D8%B7%D8%B9%D9%85-%D8%A8%D9%8A%D8%AA%D8%B2%D8%A7-%D9%87%D8%AA..-640x360.png'}}
                        
                    />
                    <View style={{marginLeft:10}}>
                        <Text style={styles.userName}>jihad</Text>
                        <Text style={styles.emailAdrees}>{currentUser.email}</Text>
                    </View>

                    
                </View>
                <View style={{flexDirection:'row',justifyContent:"space-evenly",paddingBottom:10}}>
                    <View style={{flexDirection:'row',marginTop:0}}>
                        <View style={{marginLeft:10,alignItems:'center',justifyContent:'center'}}>
                           <Text style={{fontSize:18,fontWeight:'bold',color:colors.white}}>1</Text>
                           <Text style={{fontSize:14,color:colors.white}}>My Favorites</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',marginTop:0}}>
                        <View style={{marginLeft:10,alignItems:'center',justifyContent:'center'}}>
                           <Text style={{fontSize:18,fontWeight:'bold',color:colors.white}}>0</Text>
                           <Text style={{fontSize:14,color:colors.white}}>My Cart</Text>
                        </View>
                    </View>
                </View>
              </View>

               
                
                <DrawerItemList {...props} />

                    <DrawerItem
                        label="Payment"
                        icon={({color,size})=>(
                            <Icon
                            type="material-community"
                            name="credit-card-outline"
                            color={color}
                            size={size}
                            />
                        )}
                    />

                    <DrawerItem
                        label="Promotions"
                        icon={({color,size})=>(
                            <Icon
                            type="material-community"
                            name="tag-heart"
                            color={color}
                            size={size}
                            />
                        )}
                    />

                    <DrawerItem
                        label="Sitting"
                        icon={({color,size})=>(
                            <Icon
                            type="material-community"
                            name="cog-outline"
                            color={color}
                            size={size}
                            />
                        )}
                    />

                    <DrawerItem
                        label="Help"
                        icon={({color,size})=>(
                            <Icon
                            type="material-community"
                            name="lifebuoy"
                            color={color}
                            size={size}
                            />
                        )}
                    />

                    <View style={{borderTopWidth:1,borderTopColor:colors.grey}}>
                        <Text style={styles.preferences}>Preferences</Text>

                        <View style={styles.switchText}>
                            <Text style={styles.tagThemeText}>Dark Theme</Text>
                            <View style={{paddingRight:10}}>
                               <Switch
                                  trackColor={{false:"#767577", true: "#81boff"}}
                                  thumbColor="#f4f3f4"
                                />
                            </View>
                           
                        </View>
                    </View>

                    

            </DrawerContentScrollView>

                    <DrawerItem
                        label="Sing Out"
                        icon={({color,size})=>(
                            <Icon
                            type="material-community"
                            name="logout-variant"
                            color={color}
                            size={size}
                            />
                        )}
                    />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    avatar:{
        borderWidth:4,
        borderColor:colors.white,
        resizeMode:'stretch'
    },
    userName:{
        fontWeight:"bold",color:colors.white,
        fontSize:18
    },
    emailAdrees:{
       fontSize:14,color:colors.white
    },

    viewAvatar:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
        paddingVertical:10
        
    },
    preferences:{
        fontSize:16,
        paddingTop:10,
        paddingLeft:20,color:colors.grey1
    },
    switchText:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:20,
        paddingVertical:5,
        paddingRight:10
    },
    tagThemeText:{
        fontSize:16,
        fontWeight:'bold',
        color:colors.black,
        paddingTop:10
    },
})