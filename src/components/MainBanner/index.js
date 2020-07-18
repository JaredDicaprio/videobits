import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Heart from '../../../assets/heart.png'
import LinearGradient from 'react-native-linear-gradient';

export default function MainBanner() {

    return (
        <View style={styles.continer}>
            <ImageBackground
                source={Heart}
                style={styles.image}>
                    <LinearGradient 
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    colors={['rgba(247, 122, 131, 0.8)', 'rgba(238, 115, 123, 0.8)', 'rgba(236, 102, 132, 0.8)','rgba(221, 86, 133, 0.8)']} 
                    style={styles.layer}>
                <Text style={styles.heading}>Edit Your Videos</Text>
                <Text style={styles.desx}>Grab attention by transferring your video clips in eye catching videos </Text>
                    </LinearGradient>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    continer: {
        // backgroundColor: 'yellow',
        height: '30%',
        width: '95%',
        alignSelf: 'center',
    },
    image: {
        height: '100%',
        resizeMode: 'contain'
    },
    layer: {
        // backgroundColor: 'rgba(236, 102, 132, 0.7)',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading:{
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    desx: {
        width: '70%',
        textAlign: 'center',
        color: 'white',
        fontSize: 12
    }
})