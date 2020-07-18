import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


export default function HomeCard({icon, name, iconElement, color, toGo, navigation}){
    
    return(
        <TouchableOpacity style={[styles.contianer, {backgroundColor: color}]}
            onPress={() => navigation.navigate(toGo)}
        >
           {iconElement}
            <Text style={styles.textColor}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    contianer: {
        backgroundColor: "#ffb74d",
        width: '45%',
        padding: 10,
        borderRadius: 15,
        marginTop: 20,
        marginHorizontal: '2%'
    },
    textColor: {
        color: 'white',
        fontFamily: "Montserrat-SemiBold",
        fontSize: 22
    },
   
})