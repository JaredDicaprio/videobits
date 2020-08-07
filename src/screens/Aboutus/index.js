import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import ENtypo from 'react-native-vector-icons/Entypo';
import I18n from "i18n-js";

export default function Help({ navigation }) {

    return (
        <View styles={styles.container}>
            <View style={styles.header}>
    <Text style={styles.textHeader}>{I18n.t("weAre")}</Text>
                <Text style={styles.textHeader}>VideoBits</Text>
            </View>
            <View style={styles.secondContiaer}>
            <View style={styles.fielcontiner}>
                <Text>{I18n.t("number")}</Text>
                <Text>0100101010100</Text>
            </View>
            <View style={styles.fielcontiner}>
                <Text>{I18n.t("email")}</Text>
                <Text>0100101010100</Text>
            </View>
            <View style={styles.fielcontiner}>
                <Text>{I18n.t("Address")}</Text>
                <Text>0100101010100</Text>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    header: {
        backgroundColor: '#01c8ff',
        height: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 42,
        color: 'white',
        fontWeight: 'bold'
    },
    iconHElp: {
        fontSize: 85,
        color: 'white',
    },
    secondContiaer: {
        height: "55%",
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center'
    },
    fielcontiner:{
        justifyContent: 'space-between',
        marginBottom: 30,
        flexDirection: 'row'
    }
})