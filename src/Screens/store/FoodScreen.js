import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { colors } from '../../global/colores';
import { Icon } from "react-native-elements";

//FIREBASE
import { database, storage } from '../../firebaseConfig'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'


const FoodScreen = ({navigation,route}) => {
  const {data} = route.params;
  

    const [currentSelected,setCurrentSelected]=useState([0])
    const [food, setFood] = useState([])

    const loadFoods = async() => {
      try {
        const q = await getDocs(collection(database, "Foods"));
        setFood(q.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })));
        
      } catch (error) {
        toast.error(error)
      }
    }
    useEffect(() => {
        loadFoods();
    },[])

  return (
    <View style={{width:'100%',height:'100%',paddingTop:40,backgroundColor:colors.white,flex:1,}}>
       <ScrollView showsVerticalScrollIndicator={false}>
       <View style={{paddingLeft:20,paddingTop:10}}>
       
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backIcon}>
          <Icon name='navigate-before' size={28} color={colors.black}  />
        </TouchableOpacity>
      </View>
       
       <View style={{width:'100%',height:250}}>
          <Image src={data.restaurandImage}
             style={{width:'100%',height:'70%',resizeMode:'stretch'}}          
          />
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
          <Text style={{fontSize:20,marginLeft:10,fontWeight:'bold'}}>{data.restaurandName}</Text>
          <Text style={{fontSize:20,marginLeft:10,fontWeight:'bold'}}>{data.restaurandAddress}</Text>
          </View>
          <Text style={{fontSize:18,fontWeight:'500',textAlign:'center'}}>{data.descrption}</Text>
       </View>
       {
        food.map((data,index) =>{
          return(
            <TouchableOpacity key={index} activeOpacity={0.9} style={{width:'100%',height:180,justifyContent:'center',alignItems:'center'}}
              onPress={()=> navigation.navigate('DetailsScreen',{data:data})}
            >
              <View style={styles.boxpopular}>
                 <View style={{marginBottom:50}}>
                    <View style={{flexDirection:'row',alignItems:'center',
                      display: data.isTopOfTheWeek ? 'flex':'none'}}>
                      <Icon name='star-rate' size={10} color={colors.accent} />
                      <Text style={{fontSize:12,color:colors.black,opacity:0.8,marginLeft:5}}>
                        Top of the week
                      </Text>
                    </View>
      
                    <Text style={{fontSize:22,color:colors.black,fontWeight:'bold',padding:10}}>
                      {data.foodName}
                    </Text>
      
                    <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:20}}>
                      <Text style={{fontSize:28,color:colors.accentRed,fontWeight:'900',paddingRight:5,
                            paddingBottom:8}}>₪</Text>
                      <Text style={{fontSize:28,color:colors.accentRed,fontWeight:'900'}}>{data.foodPrice}</Text>
                    </View>
                 </View>
                   {/* render image of food */}
                 <View style={{height:150,width:150,marginRight:-45}}>
                    <Image src={data.foodImage}
                     style={{width:'100%',height:'100%',resizeMode:'center'}} />
                 </View>
      
                 <View style={{position:'absolute',bottom:0,flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:85,height:50,backgroundColor:colors.accent,
                     borderTopRightRadius:20,borderBottomLeftRadius:20,justifyContent:'center'
                     ,alignItems:'center'}}>
                        <Icon name='add' color={colors.black} size={18} /> 
                   </View>
      
                   <View style={{flexDirection:'row',alignItems:'center',marginLeft:20}}>
                    <Icon name='grade' color={colors.black} size={18} style={{paddingRight:5}}/>
                    <Text style={{fontSize:15,fontWeight:'bold',color:colors.black}}>
                      {data.foodRating}
                    </Text>
                    <Text style={{fontSize:15,fontWeight:'bold',color:colors.black,marginLeft:10}}>
                       {data.descrption}
                    </Text>
                   </View>
                 </View>
              </View>
            </TouchableOpacity>
           )
        })
       }
       </ScrollView>
    </View>
  )
}

export default FoodScreen

const styles = StyleSheet.create({
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
      },
      backIcon:{
        width:40,
        height:40,
        borderRadius:10,
        borderWidth:1,
        borderColor:colors.lightGray,
        backgroundColor:colors.accent,
        justifyContent:'center',
        alignItems:'center'
      },
})