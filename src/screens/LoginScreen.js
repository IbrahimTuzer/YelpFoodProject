import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { LoginButton } from '../components'
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';

const LoginScreen = ({navigation}) => {

  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [handleErrorMessage, setHandleErrorMessage]= useState("")
//.....................................................................

  const dispatch = useDispatch();
  const {errorMessage} = useSelector((state)=> state.user)

//.....................................................................


useEffect(() => {
  const invalidEmail = 'Firebase: Error (auth/invalid-email)'

  if(invalidEmail == errorMessage){
    setHandleErrorMessage('Invalid Email or Password! Try Again')
  }

  setHandleErrorMessage(errorMessage)


}, [errorMessage])

//.....................................................................

const handleOnPress=()=>{
  dispatch(login({email, password}))
}

//.....................................................................


  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
          <Entypo name="login" size={22} color="white" />
             {"  "}
            LOGIN</Text>
          <TextInput style={styles.email}
          placeholder='Email'
          onChangeText={(text)=> setEmail(text.toLowerCase())}
          value={email}
          />
          <TextInput style={styles.password}
          placeholder='Password'
          onChangeText={setPassword}
          value={password}/>
        </View>

        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorText}>{handleErrorMessage}</Text>
        </View>

        <LoginButton
        name="Login"
        handleButtonData={handleOnPress}
        />

      </View>

      <Pressable 
          style={styles.forgotContainer}
          onPress={()=> navigation.navigate("ForgotPassword") }>
            <Text style={styles.forgotText}>ForgotPassword</Text>
          </Pressable>

          <Pressable style={styles.signUpContainer}
          onPress={()=> navigation.navigate("Register")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Pressable>

    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "#2A0040"
    
  },
  container:{
    width:"95%",
    alignItems:"center",
    justifyContent:"center",
  
  },
  loginContainer:{
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:10,
    
  },
  loginText:{
    fontSize:25,
    fontWeight: "bold",
    color: "white",
  },
  email:{
    borderWidth:0.2,
    width:"100%",
    paddingVertical:10,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#fff",
    borderRadius:5,
    textAlign:"center",
    marginVertical:10,
  },
  password:{
    borderWidth:0.2,
    width:"100%",
    paddingVertical:10,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#fff",
    borderRadius:5,
    textAlign:"center",
    
  },
  errorMessageContainer:{
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:10,
  },
  errorText:{
    fontWeight:"bold",
    color:"red",
  },
  forgotContainer:{
    marginTop:5,
    width: "100%",
    alignItems:"center",
    justifyContent:"center",
  },
  signUpContainer:{
    marginTop:10,
    width: "100%",
    alignItems:"center",
    justifyContent:"center",
  },
  forgotText:{
    fontSize:16,
    fontWeight:"bold",
    color:"white",
    textDecorationLine:"underline",

  },
  signUpText:{
    fontSize:16,
    fontWeight:"bold",
    color:"white",
    textDecorationLine:"underline",

  }
  
})