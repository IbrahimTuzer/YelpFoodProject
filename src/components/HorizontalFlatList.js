import { Pressable, StyleSheet, Text, View, Image  } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const HorizontalFlatList = (props) => {

    const city = props.data?.location.city
    const img = props.img
    const name = props.data?.name
    const rating = props.data?.rating
    const count = props.data.review_count

    const navigation = useNavigation();

    const handleButton = ()=> {
        navigation.navigate("Detail",
        {
            data: props.data
        })
    }

  return (

   <Pressable tyle={({pressed})=> [{transform: [{translateY: pressed ? 3 : 0}]}]}
   onPress={handleButton}>

    <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: img}}/>
        <Text style={styles.cityText}>{city}</Text>
    </View>

    <View style={styles.rateContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
            <AntDesign name="star" size={15} color="#FCCE05" />
             {""}
             {rating}
            </Text>
            <Text style={styles.countText}>({count} Reviews)</Text>
        </View>
    </View>
   </Pressable>

  )
}

export default HorizontalFlatList

const styles = StyleSheet.create({
    imageContainer:{
        width: "100%",
        alignItems: "center",
    },
    image:{
        width:150,
        height:200,
        margin: 10,
        borderRadius:10,
        borderWidth:2,
        borderColor:'white'
    },
    cityText:{
        position:'absolute',
        backgroundColor:'white',
        borderRadius:8,
        fontSize:16,
        fontWeight:'bold',
        padding:2,
        bottom: 10,
    },
    rateContainer:{
        alignItems: "center",
    },
    nameText:{
        fontSize: 16,
        fontWeight: "bold",
        color: "white",

    },
    ratingContainer:{
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText:{
        fontWeight:"bold",
        color: "white",
    },
    countText:{
        color:  "white",
    },
})