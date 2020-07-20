import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Asset, Constants, FileSystem, Permissions } from 'react-native-unimodules';
import { LogLevel, RNFFmpeg, RNFFprobe,RNFFmpegConfig } from 'react-native-ffmpeg';
import * as MediaLibrary from 'expo-media-library';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'
import Video from 'react-native-video';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { uuid } from 'uuidv4';

const width = Dimensions.get("window").width;

// to do pause on end of the given limit react native video plater startegy pause


export default function Picker() {

    const [image, setImage] = useState(null);
    const [duration, setDuration] = useState(1);
    const [leftSide, setLeftSide] = useState('')
    const [rightSide, setRightSide] = useState('')

    const [sliderOneChanging, setSliderOneChanging] = useState(false);
    const [sliderOneValue, setSliderOneValue] = useState([5]);
    const [multiSliderValue, setMultiSliderValue] = useState([1, 1]);

    const videoRef = useRef(null);


    useEffect(() => {
        // console.log( FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}vid`));
        

        (async () => {
        
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, [duration]);


    const handleTrim = async () => {
        console.log("Trim start", image);
        const uid = uuid();
         if (image.uri) {
            const res = await RNFFmpeg.executeWithArguments([
                '-ss',
                `${10}`,
                '-i',
                image.uri,
                '-to',
                `${20}`,
                `${FileSystem.documentDirectory}vid/mp4-trimmed14.mp4`,
            ]);
            console.log(res);
            const fileUri = `${FileSystem.documentDirectory}vid/mp4-trimmed${uid}.mp4`;
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
            let saved = await MediaLibrary.saveToLibraryAsync(fileUri)
            // console.log(saved)
            RNFFmpegConfig.getLastReturnCode().then(result => {
                console.log("Last return code: " + result.lastRc);
            });
        }
    }

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
            setDuration(result.duration);
            setMultiSliderValue([1, result.duration])
        }
        // if (!result.cancelled) {
        //     setImage(result.uri);
        //     const res = await RNFFmpeg.executeWithArguments([
        //         '-ss',
        //         `${10}`,
        //         '-i',
        //         result.uri,
        //         '-to',
        //         `${20}`,
        //         `${FileSystem.documentDirectory}vid/mp4-trimmed14.mp4`,
        //     ]);
        //     console.log(res);
        //     const fileUri = `${FileSystem.documentDirectory}vid/mp4-trimmed14.mp4`;
        //     const asset = await MediaLibrary.createAssetAsync(fileUri)
        //     await MediaLibrary.createAlbumAsync("Download", asset, false)
        //     let saved = await MediaLibrary.saveToLibraryAsync(fileUri)
        //     console.log(saved)
        // }
    };



    // sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

  const multiSliderValuesChange = values => {
        setMultiSliderValue(values);
        videoRef.current.seek(values[0] / 1000, 50);
        console.log(values[0] / 1000)
    }

    return (
        <View style={styles.container}>

            {!image && <TouchableOpacity
                onPress={pickImage}
                style={styles.btnContianer}>
                <LinearGradient
                    style={styles.layer}
                    colors={['#f1525a', '#ed6679', '#ed6b8d', '#dc6988']}>
                    <Entypo name="folder-video"
                        style={styles.icon}
                    />
                    <Text style={styles.textBtn}>Pick Video</Text>
                </LinearGradient>
            </TouchableOpacity>}

            {!!image && <Video
                source={{ uri: image.uri }}
                style={styles.vid}
                controls={true}
                ref={videoRef}
                resizeMode={"cover"}
            />}

            {!!image &&
                <>
                    <View style={styles.trimmerContienr}>
                        <View style={styles.indo}>
                            <Text>0</Text>
                            <Text>100</Text>
                        </View>
                        <MultiSlider
                            values={[multiSliderValue[0], multiSliderValue[1]]}
                            sliderLength={width - (width / 5)}
                            onValuesChange={multiSliderValuesChange}
                            min={0}
                            max={duration}
                            step={1}
                            snapped
                        />
                    </View>
                    <TouchableOpacity style={styles.trimCOntianre}
                        onPress={handleTrim}
                    >
                        <Entypo name="scissors" style={styles.iconTrim}/>
                        <Text style={styles.trimText}>Trim</Text>
                    </TouchableOpacity>
                </>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContianer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    layer: {
        width: '80%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    icon: {
        color: 'white',
        fontSize: 70
    },
    textBtn: {
        color: 'white',
        marginTop: 5,
        fontSize: 18
    },
    vid: {
        width: width,
        height: '35%',
    },
    trimmerContienr: {
        width: width,
        marginLeft: width / 10
    },
    trimmer: {
        width: width
    },
    indo: {
        flexDirection: 'row',
        marginTop: 10,
        width: width - (width / 5),
        justifyContent: 'space-between'
    },
    trimCOntianre: {
        alignSelf: 'center',
        marginTop: 40,
        backgroundColor: "#e09913",
        width: '22%',
        height: '12%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    trimText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    iconTrim: {
        color: 'white',
        fontSize: 22
    }
})