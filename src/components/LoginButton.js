import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoginButton = (props) => {

  const  name = props.name
  const  handleButtonData = props.handleButtonData
  const  disable = props?.disable



  return (
    <Pressable  style={({pressed})=> [{backgroundColor: props.isDisable ? "gray" : (pressed ? "gray" : "tomato")},styles.buttonContainer]}
    onPress={handleButtonData}
    disabled={disable}>

        <Text style={styles.buttonText}>{name}</Text>

    </Pressable>
  )
}

export default LoginButton

const styles = StyleSheet.create({

  buttonContainer:{
    width:"100%",
    marginVertical:5,
    paddingVertical:10,
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
  },
  buttonText:{
    fontSize:18,
    fontWeight:"bold",
    color:"white",
  }

})