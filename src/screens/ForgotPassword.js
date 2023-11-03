import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import { useState, useEffect} from 'react';
import React from 'react'
import {LoginButton} from "../components"
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import {resetPassword} from "../redux/userSlice"

const ForgotPassword = ({navigation}) => {

 const [handleErrorMessage, setHandleErrorMessage ]= useState(errorMessage)
 const [isButtonDisable, setIsButtonDisable] = useState(true)
 const [email, setEmail] = useState("")

 const dispatch = useDispatch();
 const {errorMessage} = useSelector((state)=> state.user)

 const handleOnPress = () => {
   dispatch(resetPassword(email))
 }

 useEffect(() => {
  if(email.length !== 0 ){
    setIsButtonDisable(false)
  }else{
    setIsButtonDisable(true)
  }

}, [email])

  return (
    <View style={styles.container}>
    
      <Text style={styles.forgotText}> 
       <FontAwesome5 name="key" size={24} color="white" />
        {"  "}
        ForgotPassword
      </Text>
      
      <View style={styles.errorMessageContainer}> 
        <Text style={{fontWeight:"bold", color:"red"}}>{handleErrorMessage}</Text>
      </View>

      <View style={styles.forgotBoxContainer}>

        <TextInput style={styles.textInput}
          placeholder='Enter Your Email '
          onChangeText={(text)=> setEmail(text.toLocaleLowerCase())}
          value={email}/>

        <LoginButton
           name="Reset Password"
           handleButtonData={handleOnPress}
           disable={isButtonDisable}
        />

      </View>

      <Pressable style={styles.loginBack}
            onPress={()=> navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>



    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "tomato",
    backgroundColor: "#2A0040"
  
  },
  forgotText:{
    fontSize: 24,
    fontWeight:"bold",
    color: "white",
    marginBottom: 5,

  },
  errorMessageContainer:{
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",

  },
  forgotBoxContainer:{
    width: "95%",
  },
  textInput:{
    borderWidth:0.2,
    width:"100%",
    paddingVertical:10,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#fff",
    borderRadius:5,
    textAlign:"center",
    marginVertical:5,
  },
  loginBack:{
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  loginText:{
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textDecorationLine: "underline",
  },
})