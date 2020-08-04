import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Asset, Constants, FileSystem, Permissions } from 'react-native-unimodules';
import * as ImagePicker from 'expo-image-picker';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { LogLevel, RNFFmpeg, RNFFprobe, RNFFmpegConfig } from 'react-native-ffmpeg';
import { uuid } from 'uuidv4';
import AsyncStorage from '@react-native-community/async-storage';
import * as MediaLibrary from 'expo-media-library';

const width = Dimensions.get("window").width;

export default function compress({navigation}) {

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [happen, setHappen] = useState('Loading')

    const pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result);
            setImage(result);
        }
    };

    const happenSetter = ()=>{
        setHappen("Building the media")
        setTimeout(()=>{
            setHappen("Optimizing the file...");
            setTimeout(()=>{
                setHappen("Compressing the media...")
                setTimeout(() => {
                    setHappen("Finalizing...")
                }, 5000)
            }, 1000)
        },1000)
    }

    const handleCompress = async () => {
        console.log("Trim start", image);
        setLoading(true);
        happenSetter()
        const uid = uuid();
        const fileLink = `${FileSystem.documentDirectory}vid/vidbitcomp${uid}.mp4`;
        AsyncStorage.setItem("fileLink", fileLink);
        if (image.uri) {
            const res = await RNFFmpeg.executeWithArguments([
                '-i',
                `${image.uri}`,
                '-b',
                '800k',
                `${fileLink}`,
            ]);
            console.log(res);
            RNFFmpegConfig.getLastReturnCode().then(async (result) => {
                console.log("Last return code: " + result.lastRc);
                if (result.lastRc === 0) {
                    const fileUri = `${fileLink}`;
                    const asset = await MediaLibrary.createAssetAsync(fileUri)
                    await MediaLibrary.createAlbumAsync("Download", asset, false)
                    // let saved = await MediaLibrary.saveToLibraryAsync(fileUri)
                    // console.log(saved)
                    setLoading(false);
                    navigation.navigate("VideoTrimmed")
                } else {
                    alert("Error occured");
                }
            });
        }
    }




    return (
        <View style={styles.container}>

            {!image &&
                <>
                    <TouchableOpacity
                        onPress={pickImage}
                        style={styles.seconfin}>
                        <MaterialIcons name="library-add" style={styles.add} />
                        <Text style={styles.Textvideo}>Pick a video</Text>
                        <Text style={styles.TextComp}>To compress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={pickImage}
                        style={styles.mainCOntianer}>
                        <Text style={styles.textPick}>Pick</Text>
                    </TouchableOpacity>
                </>
            }

            {!!image && 
                <>
                    <Video
                        source={{ uri: image.uri }}
                        style={styles.vid}
                        controls={false}
                        resizeMode={"cover"}
                    />

                    {/* <View style={styles.detailCon}>
                        <Entypo style={styles.iconImage} name="image" />
                        <Text style={styles.imageName}>Image name</Text>
                    </View>
                    <View style={styles.detailCon}>
                        <MaterialCommunityIcons style={styles.iconImage} name="image-size-select-large" />
                        <Text style={styles.imageName}>Size</Text>
                    </View> */}
                 {!loading && <TouchableOpacity style={styles.mainCOntianer}
                        onPress={handleCompress}>
                        <AntDesign style={styles.icon} name="addfile" />
                        <Text style={styles.text}>Compress</Text>
                    </TouchableOpacity>}
                </>
            }

            {!!loading &&
                <View style={styles.loading}>
                    <Text style={styles.loadingText}>{happen}</Text>
                    <ActivityIndicator color="#9f5ae3" siza={40} />
                </View>
            }

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainCOntianer: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#9f5ae3',
        width: '50%',
        alignSelf: 'center',
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    icon: {
        color: 'white',
        fontSize: 20
    },
    text: {
        color: 'white',
        paddingLeft: 10
    },
    seconfin: {
        justifyContent: 'center',
        flex: 0.8,
        alignItems: 'center'
    },
    Textvideo: {
        color: 'grey',
        fontSize: 20
    },
    TextComp: {
        color: 'grey',
        fontSize: 20,
        paddingTop: 10
    },
    add: {
        fontSize: 42,
        color: 'grey',
        paddingBottom: 10
    },
    textPick: {
        fontSize: 22,
        color: 'white'
    },
    vid: {
        width: width,
        height: '35%',
        marginTop: 30
    },
    detailCon: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconImage: {
        fontSize: 28,
    },
    imageName: {
        marginLeft: 10,
    },
    loading: {
        alignItems: 'center',
        marginTop: 30
    },
    loadingText: {
        fontSize: 22,
        color: 'grey',
        paddingBottom: 20
    }
})