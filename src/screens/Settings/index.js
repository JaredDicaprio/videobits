import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import I18n from "i18n-js";
import AsyncStorage from '@react-native-community/async-storage';

export default function Settings({navigation}) {

    const [lan, setLan] = useState("");

    useEffect(()=>{
        fetchLan();
    },[])

    async function fetchLan (){
        const lan = await AsyncStorage.getItem("lan");
        if(lan){
            setLan(lan);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={()=>navigation.navigate("Languages")}
            style={[styles.btnContaienr, { marginTop: 30 }]}>
                <Text style={styles.title}>{I18n.t("languageBtnTitle")}</Text>
    <Text style={styles.opt}>{lan}</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>navigation.navigate("Aboutus")}
            style={styles.btnContaienr}>
                <Text style={styles.title}>{I18n.t("aboutUsBtnTitle")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContaienr}>
                <Text style={styles.title}>{I18n.t("termsAndConditionBtn")}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    btnContaienr: {
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
        alignItems: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.2,
        paddingBottom: 25
    },
    title: {
        fontSize: 20,
        color: 'grey',
    },
    opt: {
        color: 'blue'
    }
})