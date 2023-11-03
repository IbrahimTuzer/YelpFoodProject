import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {LoginButton, Loading} from "../components"
import {register} from "../redux/userSlice"

const Register = ({navigation}) => {

const [email, setEmail]= useState("")
const [password, setPassword]= useState("")
const [confirmPassword, setConfirmPassword]= useState("")
const [handleErrorMessage, setHandleErrorMessage ]= useState(errorMessage)
const [isButtonDisable, setIsButtonDisable] = useState(false)



const dispatch = useDispatch();
const {errorMessage, isLoading} = useSelector((state)=> state.user)



useEffect(() => {
  const handleConfirmPassword =()=>{
    if( email.length === 0 
                || password.length === 0 
                || password !== confirmPassword ){
      setIsButtonDisable(true)
    }else{
      setIsButtonDisable(false)
    }
    setHandleErrorMessage('Password dismatch!')
  }
  
  handleConfirmPassword()
}, [password, confirmPassword])


const handleOnPress = () =>{
  dispatch(register({email, password}))
}

if(isLoading){
  return <Loading/>
}
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>

        <View style={styles.registerContainer}>
         
          <Text style={styles.registerText}>
            <AntDesign name="adduser" size={24} color="white" />
            {" "}
            REGISTER
          </Text>

          <TextInput style={styles.registerInputContainer}
             placeholder='Enter Your Email'
             onChangeText={(text)=> setEmail(text.toLocaleLowerCase())}
             value={email}/>

          <TextInput style={styles.registerInputContainer}
             placeholder='Enter Your Password'
             onChangeText={setPassword}
             value={password}/>

          <TextInput style={styles.registerInputContainer}
             placeholder='Re-Enter Your Password'
             onChangeText={setConfirmPassword}
             value={confirmPassword}/>
        </View>

        <View style={styles.errorContainer}>
          <Text style={{fontWeight:"bold", color:"red"}}>{handleErrorMessage}</Text>
        </View>

       <LoginButton
          name="Sign Up"
          handleButtonData={handleOnPress}
          disable={isButtonDisable}/>
      </View>

      <Pressable style={styles.loginBack}
            onPress={()=> navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>


    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#2A0040",
    
  },
  mainContainer:{
    width:"95%",
    alignItems:"center",
    justifyContent:"center",
  },
  registerContainer:{
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    paddingVertical: 10,
    
  },
  registerText:{
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  registerInputContainer:{
    width: "100%",
    paddingVertical: 10,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "white",
    marginBottom: 5,
  },
  errorContainer:{
    width: "100%",
    marginVertical: 5,
    alignItems:"center",
    justifyContent:"center",
    paddingVertical: 10,

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