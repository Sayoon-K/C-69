import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import React from "react"
import { BarCodeScanner } from 'expo-barcode-scanner';
import *as Permissions from "expo-permissions"
export default class TransactionScreen extends React.Component {
  constructor(){
    super()
    this.state={
      bookid:"",
      studentid:"",
      hascamerapermission:null,
      buttonstate:"normal",
      scanned:false,
      scanneddata:""
    }
  }
  getcamerapermission=async(buttonstate)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hascamerapermission:status==="granted",
      buttonstate:buttonstate,
      scanned:false
    })
  }
  handlbarcodescanned=async({type,data})=>{
    this.setState({
      scanneddata:data,
      buttonstate:"normal",
      scanned:true
    })
  }
  render(){
    const {buttonstate,hascamerapermission,scanneddata,scanned}=this.state
    if(buttonstate==="clicked"){
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handlbarcodescanned}
        style={StyleSheet.absoluteFillObject}
        />
      )
    }
    else{
  return (
    <View>
      <Text>ELIB</Text>
      <Text>
        {hascamerapermission?scanneddata:"request for camera permission"}
      </Text>
      <TextInput
      placeholder='Book Id'

      />
      <TouchableOpacity
      onPress={()=>this.getcamerapermission("clicked")}
      
      >
        <Text>Scan</Text>
      </TouchableOpacity>
    </View>
  );}
}
}
