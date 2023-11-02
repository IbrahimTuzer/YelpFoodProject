import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'

const Profile = () => {

  const dispatch = useDispatch();

  const handleLogOut=()=>{
    dispatch(logout())

  }



  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Pressable style={({pressed})=> [{backgroundColor: pressed ? "gray" : "white"}, styles.logOutButton]}
                  onPress={handleLogOut}>
        <Text style={styles.textLogOut}>Log Out</Text>
      </Pressable>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#fff",
  },
  textLogOut:{
    fontSize: 16,
    fontWeight:"bold",
    color: "white",
  },
  logOutButton:{
    borderWidth:0.2,
    borderRadius:5,
    width:'80%',
    alignItems:'center',
    paddingVertical: 10,
    marginTop:10,
    backgroundColor:"tomato",

  }

})