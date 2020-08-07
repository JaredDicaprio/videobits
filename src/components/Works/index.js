import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import Background from '../../../assets/video-editing.jpg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as FileSystem from 'expo-file-system';
import * as VideoThumbnails from 'expo-video-thumbnails';
import I18n from '../../utils/i18n';

const width = Dimensions.get("window").width;


export default function Works({ navigation }) {

    const [files, setFiles] = useState([]);
    const [image, setImage] = useState([]);
    useEffect(() => {
        getFiles()
    }, []);

    const getFiles = async () => {
        const fileLink = `${FileSystem.documentDirectory}vid`;
        const files = await FileSystem.readDirectoryAsync(fileLink);
        // console.log(files);
        setFiles(files);
        let temp = []
        for (let i = 0; i < files.length; i++) {
            const url = await generateThumbnail(`${FileSystem.documentDirectory}vid/${files[i]}`);
            // console.log(url)
            temp.push(url)
        }
        setImage(temp)
    }

    const generateThumbnail = async (url) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                url,
                {
                    time: 15,
                }
            );
            return uri;
        } catch (e) {
            console.warn(e);
        }
    };

    return (
        <View style={styles.contianer}>
            <Text style={styles.myWorkText}>{I18n.t("worksTitle")}</Text>
            <ScrollView contentContainerStyle={styles.scroll} horizontal={true}>
                {!!image.length && image.map((e, i) => {
                    const file = `${FileSystem.documentDirectory}vid/${files[i]}`
                    // console.log(e)
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("PlayWorks", { data: file })}
                            key={i} style={styles.imageContianer}>
                            <ImageBackground
                                source={{uri: e}}
                                style={styles.image}>
                                <AntDesign name="play" style={styles.play} />
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    contianer: {
        // backgroundColor: 'red',
        width: '94%',
        alignSelf: 'center',
        marginTop: 10
    },
    myWorkText: {
        color: 'grey',
        fontSize: 18,
    },
    imageContianer: {
        width: width / 4,
        height: 90,
        marginTop: 10,
        marginRight: 10
    },
    image: {
        width: width / 4,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 5
    },
    scroll: {
        flexDirection: 'row',
    },
    play: {
        fontSize: 24,
        color: 'black'
    }
})