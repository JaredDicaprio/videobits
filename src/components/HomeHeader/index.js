import React from 'react';
import {
    View, 
    Text,
    StyleSheet
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function HomeHeader(){
    const navigation = useNavigation();

    return(
        <View style={styles.contaienr}>
            <View/>
            <Text style={styles.title}>VidBit</Text>
            <AntDesign 
                name="setting"
                style={styles.iconSetting}
                onPress={() => navigation.navigate("Settings")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    contaienr: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconSetting: {
        fontSize: 22
    },
    title: {
        color: '#e32b6b',
        fontWeight: 'bold',
        fontSize: 22
    }
})