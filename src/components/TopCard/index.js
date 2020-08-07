import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default function TopCard({ title, icon, colors, navigate }) {

    return (
        <TouchableOpacity 
        onPress={navigate}
        style={styles.contianer}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={colors}
                style={styles.layer}>
                {icon}
                <Text style={styles.title}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    contianer: {
        width: '45%',
        margin: '2.5%',
    },

    title: {
        color: 'white',
        marginTop: 5
    },
    layer: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 90
    },
    trimmer: {
    }
})