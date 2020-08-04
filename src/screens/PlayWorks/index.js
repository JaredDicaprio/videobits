import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Share from "react-native-share";

const width = Dimensions.get("window").width;


export default function PlayWorks({ navigation, route }) {

    const handleShare = () => {
        console.log("sharing")
        Share.open({url: route.params.data })
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
    } 

    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <MaterialCommunityIcons 
                onPress={() => navigation.goBack()}
                style={styles.icons} name="keyboard-backspace" />
                <MaterialCommunityIcons
                                onPress={handleShare}
                name="share-variant" style={styles.icons} />
            </View>
            <View style={styles.contaienr}>
                <Video
                    source={{ uri: route.params.data }}
                    style={styles.vid}
                    controls={true}
                    resizeMode={"cover"}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    vid: {
        width: width,
        height: '35%',
    },
    contaienr: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    icons: {
        color: 'white',
        fontSize: 26
    },
    main: {
        backgroundColor: 'black',
        flex: 1
    }
})