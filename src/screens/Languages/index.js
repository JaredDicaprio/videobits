import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from "i18n-js";
import RNRestart from 'react-native-restart'; // Import package from node modules

export default function Languages({ navigation }) {

    const [selected, setSelected] = useState("");

    useEffect(() => {
        getLang()
    }, [])

    const getLang = async () => {
        const lan = await AsyncStorage.getItem("lan");
        if (lan) {
            setSelected(lan)
        }
    }

    const selectLanguage = (lan) => {
        console.log(lan)
        setSelected(lan);
    }

    const handleContunue = () => {
        AsyncStorage.setItem("lan", selected);
        if(selected === "English"){
            I18n.locale = 'en'
        }else if(selected === "French"){
            I18n.locale = 'fr'
        }
        RNRestart.Restart();
        navigation.goBack();
    }

    return (

        <ScrollView style={styles.container}>
            <View style={styles.main}>
    <Text style={styles.pick}>{I18n.t("lanPickYour")}</Text>
                <Text style={styles.lan}>{I18n.t("languageBtnTitle")}</Text>
                <Text style={styles.cuur}>{I18n.t("lanCurr")} {selected}</Text>
                <View style={styles.btn}>
                    <TouchableOpacity style={[styles.actBtn, selected == "English" && { backgroundColor: '#0277bd' }]}
                        onPress={() => selectLanguage("English")}>
                        <Text style={[styles.lansel, selected == "English" ? { color: 'white' } : { color: 'black' }]}>ENGLISH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => selectLanguage("French")}
                        style={[styles.actBtn, { marginLeft: '12%' }, selected == "French" && { backgroundColor: '#0277bd' }]}>
                        <Text style={[styles.lansel, selected == "French" ? { color: 'white' } : { color: 'black' }]}>French</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actBtn, { marginLeft: '12%' }]}>
                        <Text style={styles.lansel}>ENGLISH</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.actBtn}>
                        <Text style={styles.lansel}>ENGLISH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actBtn, { marginLeft: '12%' }]}>
                        <Text style={styles.lansel}>ENGLISH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actBtn, { marginLeft: '12%' }]}>
                        <Text style={styles.lansel}>ENGLISH</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.selectBtn} onPress={handleContunue}>
                <Text style={styles.textCont}>{I18n.t("lanCon")}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    main: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    pick: {
        fontSize: 34,
        fontWeight: 'bold'
    },
    lan: {
        color: '#00c88e',
        fontSize: 34,
        fontWeight: 'bold'
    },
    cuur: {
        marginLeft: 2,
        marginTop: 10,
        color: 'grey',
    },
    btn: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    lansel: {
        fontWeight: '700'
    },
    actBtn: {
        backgroundColor: '#eeecec',
        width: '25%',
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    selectBtn: {
        marginTop: 40,
        alignSelf: 'center',
        backgroundColor: '#0277bd',
        width: '40%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    textCont: {
        color: 'white'
    }
})