import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';

export default function TrimsOptions({navigation}) {

    const handleNavigate = (d) => {
        console.log("navigating");
        navigation.navigate("Picker", {to: d})
    }

    return (
        <View style={styles.cotnianre}>
            <View style={styles.seciondContianre}>
            <View style={styles.chooseCOntiaenr}>
            <Text style={styles.textEdut}>Chose status</Text>
            </View>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#5867a5', '#5a73a8', '#526da4', '#38548f'].reverse()}
                    style={styles.btnCOntianer}>
                    <TouchableOpacity
                        onPress={()=> handleNavigate("fb")}
                        style={styles.btn}
                    >
                        <FontAwesome name="facebook-f" style={styles.icon} />
                        <Text style={styles.text}>Facebook Status</Text>
                        <View />
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#01c69d', '#00d290', '#02e284', '#00f572']}
                    style={styles.btnCOntianer}>
                    <TouchableOpacity
                        onPress={()=>handleNavigate("wa")}
                        style={styles.btn}
                    >

                        <FontAwesome name="whatsapp" style={styles.icon} />
                        <Text style={styles.text}>Whatsapp Status</Text>
                    <View />
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#9241a6', '#af387c', '#da3150', '#f52d2e']}
                    style={styles.btnCOntianer}>
                    <TouchableOpacity
                        onPress={handleNavigate}
                        style={styles.btn}
                    >
                        <FontAwesome name="instagram" style={styles.icon} />
                        <Text style={styles.text}>Instagram Status</Text>
                        <View />
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={['#f74640', '#f44147', '#ec375a', '#e32b6b']}
                    style={styles.btnCOntianer}>
                    <TouchableOpacity
                        onPress={handleNavigate}
                        style={styles.btn}
                    >
                        <FontAwesome name="youtube" style={styles.icon} />
                        <Text style={styles.text}>Youtube Status</Text>
                        <View />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    btnCOntianer: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: 'blue',
        height: '8%',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        marginTop: 30
    },
    cotnianre: {
        flex: 1
    },
    seciondContianre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: 'white',
        fontSize: 33,
        paddingLeft: 20
    },
    text: {
        color: 'white',
        fontSize: 22,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    chooseCOntiaenr: {
        width: '80%',
        alignSelf: 'center'
    },
    textEdut: {
        fontSize: 20,
        color: 'grey'
    },
  
})