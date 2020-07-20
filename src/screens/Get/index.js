import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Background from '../../../assets/video-editing.jpg'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LoginContext } from '../../Context/LoginProvider';
import { Asset, Constants, FileSystem, Permissions } from 'react-native-unimodules';

export default function Get({ navigation }) {
    const { user, login } = useContext(LoginContext);
    const [userData, setUserData] = user
    const [isLogin, setIsLogin] = login

    const handleGo = () => {
        // navigation.navigate("Main")
        setIsLogin(true)
    }

    useEffect(() => {
        createDir()
    }, [])

    const createDir = async () => {
        const waut = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}vid`);
        console.log(waut.exists)
        if (!waut.exists) {
            FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}vid`);
        }

    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={Background}>
                <View style={styles.texCpmtoanmer}>
                    <Text style={styles.para}>Eiusmod incididunt magna cupidatat laborum. Minim nisi cillum culpa veniam voluptate reprehenderit sit cupidatat veniam adipisicing. Consectetur dolor Lorem fugiat aliqua ea velit eu sit.</Text>
                    <TouchableOpacity
                        onPress={handleGo}
                        style={styles.btnContianer}>
                        <AntDesign name="arrowright" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    texCpmtoanmer: {
        alignSelf: 'flex-end',
        width: '90%',
        marginLeft: '5%'
    },
    para: {
        textAlign: 'center',
        // color: 'white',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    btnContianer: {
        alignSelf: 'center',
        marginBottom: 30,
        backgroundColor: 'white',
        width: 45,
        height: 45,
        borderRadius: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    icon: {
        color: '#5b77ca',
        fontSize: 22
    }
})