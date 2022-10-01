import React, {Component} from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";


export default class InputNumberButton extends Component{
    render(){
        const {value, handOnPress} = this.props;
        return(
            <TouchableOpacity  
            style={style.container}
            onPress = {() => handOnPress(value)}>
            <Text style={style.text}>{value}</Text>
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        margin: 1,
        backgroundColor: "#420363",
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 30,
        color: 'white'
    }
})