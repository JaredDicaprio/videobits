import React from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import TutorialPic from '../../../assets/tutorial.png';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign'
import I18n from '../../utils/i18n';

export default function Tutorial() {

    return (
        <View style={styles.contianer}>
            <Text style={styles.myWorkText}>{I18n.t("vidTutTitle")}</Text>
            <View style={styles.imageContienr}> 
            <ImageBackground
                source={TutorialPic}
                imageStyle={{ borderRadius: 25 }}
                style={styles.image}>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['rgba(247, 122, 131, 0.8)', 'rgba(238, 115, 123, 0.8)', 'rgba(236, 102, 132, 0.8)', 'rgba(221, 86, 133, 0.8)']}
                    style={styles.layer}>
                        <AntDesign name="play" style={styles.icon} />
                </LinearGradient>
            </ImageBackground>
        </View>
            <View style={{ height: 0 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    contianer: {
        width: '94%',
        alignSelf: 'center',
        marginTop: 20,
    },
    myWorkText: {
        color: 'grey',
        fontSize: 18,
        paddingBottom: 10
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        overflow: 'hidden'
    },
    layer: {
        // backgroundColor: 'rgba(236, 102, 132, 0.7)',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContienr: {
        borderRadius: 10
    },
    icon: {
        color: 'white',
        fontSize: 36
    }
})