import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
    MainBanner,
    TopCard,
    Works,
    Tutorial
} from '../../components/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Home({ navigation }) {

    const sendRequest = async () => {
        try {
            const res = await fetch("http://192.168.0.104:80/trim", {
                method: "post",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: { data: "data" }
            })
            console.log(res)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ScrollView style={{}} contentContainerStyle={styles.contianer}>
            <MainBanner />
            <View style={styles.secondCOntainer}>
                <View style={styles.secondCard}>
                    <TopCard
                        title="Trim"
                        navigate={() => navigation.navigate("TrimeOptions")}
                        icon={<Feather
                            style={styles.icon}
                            name="scissors" />}
                        colors={['#f1525a', '#ed6679', '#ed6b8d', '#dc6988']} />
                    <TopCard

                        title="Slideshow"
                        icon={<MaterialIcons
                            style={styles.icon}
                            name="slideshow" />}
                        colors={['#9e73ed', '#b073d8', '#c473c3', '#d573ac']} />
                    <TopCard
                        icon={<FontAwesome5
                            style={styles.icon}
                            name="compress" />}
                        navigate={() => navigation.navigate("compress")}
                        title="compress"
                        iconName="slideshow"
                        colors={['#7d4bb1', '#8652b9', '#8652b9', '#9f5ae3']} />
                    <TopCard
                        title="Slideshow"
                        iconName="slideshow"
                        colors={['#ee737b', '#ed6679', '#e85779', '#db5778']} />
                </View>
                <Works navigation={navigation} />
                <Tutorial />
                {/* <Text style={styles.hello}>Hello, Friend</Text>
                <Text style={styles.creat}>Lets Create something new!</Text>

                <View style={styles.cardContainer}>
                    <TouchableOpacity onPress={sendRequest}>
                    <HomeCard color="#ffb74d"  name="Camera" iconElement={<Icon name={"camerao"} style={styles.icon}/>} />
                    </TouchableOpacity>
                    <HomeCard navigation={navigation} color="#4db6ab" toGo={"Picker"}  name="Trim" iconElement={<Entypo name={"scissors"} style={styles.icon}/>} />

                </View> */}
                <View style={{height: 10}}/>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    contianer: {
        backgroundColor: '#282e33',
        backgroundColor: "white"
    },
    secondCOntainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30
    },
    hello: {
        fontSize: 20,
        fontFamily: "Montserrat-SemiBold",
        // color: 'white'
    },
    creat: {
        marginTop: 6,
        fontSize: 17,
        color: 'grey',
    },
    cardContainer: {
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    icon: {
        paddingVertical: 10,
        color: "white",
        fontSize: 35
    },
    secondCard: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    icon: {
        color: 'white',
        fontSize: 28
    },
})