import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Switch,
    TextInput
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Asset, Constants, FileSystem, Permissions } from 'react-native-unimodules';
import { LogLevel, RNFFmpeg, RNFFprobe, RNFFmpegConfig } from 'react-native-ffmpeg';
import * as MediaLibrary from 'expo-media-library';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'
import Video from 'react-native-video';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { uuid } from 'uuidv4';
import CutPic from '../../../assets/Cut.jpeg'
import AsyncStorage from '@react-native-community/async-storage';
import I18n from "i18n-js";


const width = Dimensions.get("window").width;

// to do pause on end of the given limit react native video plater startegy pause


export default function Picker({ navigation, route }) {

    const [image, setImage] = useState(null);
    const [duration, setDuration] = useState(1);
    const [leftSide, setLeftSide] = useState('')
    const [rightSide, setRightSide] = useState('')
    const [hide, setHide] = useState(false)
    const [from, setFrom] = useState(false);
    const [to, setTo] = useState(false)
    const [durantionInSeconds, setDurantionInSeconds] = useState(0);
    const [trimDurantion, setTrimDurantion] = useState(0);
    const [recursiveFrom, setRecursiveFrm] = useState(0);
    const [recursiveTo, setRecursuveTo] = useState(0);
    const [arrOfVid, setArrOfVid] = useState([]);
    const [customDration, setCustomDration] = useState('');
    const [durantionNote, setdurationNote] = useState(false);
    const [isCustom, setIsCustom] = useState(false);

    const [multiSliderValue, setMultiSliderValue] = useState([0, 1]);
    const [loading, setLoading] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);


    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        console.log(isEnabled)
    };

    const videoRef = useRef(null);


    useEffect(() => {
        // console.log( FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}vid`));

        (async () => {
            checkStatus()
            const status = await MediaLibrary.requestPermissionsAsync()

            // await Permissions.askAsync(Permissions.CAMERA_ROLL);
            // console.log(status);
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);


    const handleSetDration = (e) => {
        setCustomDration(e);
        let temp = [];
        const num = parseInt(e);
        const total = duration / 1000;
        console.log(total);
        if (total > e) {
            console.log("mappgin")

            setdurationNote(false);
            setTrimDurantion(num - 0.1);
            setRecursiveFrm(num);
            setRecursuveTo(num * 2);
            let i = 0;
            for (i; i < total; i++) {
                if (i + num < total) {
                    i = i + num
                    // console.log(i)
                    temp.push(i)
                } else {
                    // console.log("remainder",total - i  )
                    // console.log(i)
                    i = i + num;
                    temp.push(total)
                }
            }
            console.log(temp)
            setArrOfVid(temp);
        } else {
            console.log("wrong duration")
            setdurationNote(true);

        }
    }

    const checkStatus = async () => {
        console.log("chceking status")
        const r = route.params.to;
        setDurantionInSeconds(duration / 1000)
        const total = duration / 1000;
        let temp = [];
        if (r) {
            // setHide(true)
            if (r === "fb") {
                console.log("facebook ,", duration / 1000);
                setTrimDurantion(14.9)
                setRecursiveFrm(15);
                setRecursuveTo(15 * 2);
                let i = 0;
                for (i; i < total; i++) {
                    if (i + 15 < total) {
                        i = i + 15
                        // console.log(i)
                        temp.push(i)
                    } else {
                        // console.log("remainder",total - i  )
                        // console.log(i)
                        i = i + 15;
                        temp.push(total)
                    }
                }
                console.log(temp)
                setArrOfVid(temp);
            } else if (r === "wa") {
                console.log("whatsapp ,", duration / 1000);
                setTrimDurantion(29.9)
                setRecursiveFrm(30);
                setRecursuveTo(30 * 2);
                let i = 0;
                for (i; i < total; i++) {
                    if (i + 30 < total) {
                        i = i + 30
                        // console.log(i)
                        temp.push(i)
                    } else {
                        // console.log("remainder",total - i  )
                        // console.log(i)
                        i = i + 30;
                        temp.push(total)
                    }
                }
                console.log(temp)
                setArrOfVid(temp);
            } else if (r === "cs") {
                console.log("custom ,");
                setIsCustom(true)
                if (image) return;
                await pickImage();
            }
        }
    }

    const handleTrim = async (from, to) => {
        // setLoading(true);
     
            if (isCustom && !customDration || customDration > duration / 1000 || customDration === 0 || customDration < 0) {
                alert("wrong custom value")
                return;
            } else {
            if (image.uri) {
                console.log("initiated trim for", route.params.to)
                let isComp = false;
                const uid2 = uuid();
                const file = `${FileSystem.documentDirectory}vid/vidbitComp${uid2}.mp4`;
                if (isEnabled) {
                    console.log("found compress enabled");
                    const res = await RNFFmpeg.executeWithArguments([
                        '-i',
                        `${image.uri}`,
                        '-preset',
                        'veryfast',
                        '-vcodec',
                        'h264',
                        '-acodec',
                        'aac',
                        `${file}`,
                    ])
                    console.log("result of compress =========->", res)
                    if (res.rc === 0) {
                        isComp = true;
                        trim(file);
                    }
                    return;
                } else {
                    console.log("initiating without compress");
                    trim();
                }
            }
        }

        async function trim(file) {
            console.log("trim initiaed");
            for (let i = 0; i < arrOfVid.length; i++) {
                const start = Math.round(arrOfVid[i] - trimDurantion)
                // console.log("start",start > 0 ? start -1 : start)
                const end = arrOfVid[i];
                let realEnd = 0;
                const startFormat = '00:00:00'
                const endFormat = '00:00:00'

                if (end > 60) {
                    realEnd = (end / 60).toFixed(2);
                    let min = Math.floor(end / 60);
                    var sec = end - min * 60;
                    let str = realEnd.toString();
                    var numArray = str.split('.');
                    var a = new Array();
                    a = numArray;
                    // console.log(a[0])
                    // console.log(a[1])
                    endFormat = `00:0${min}:${sec}`
                } else if (end < 60) {
                    realEnd = end
                    endFormat = `00:00:${realEnd}`;
                }

                let realStart = 0;

                if (start > 60) {
                    // console.log("st", start/ 60)
                    // console.log(start)
                    let min = Math.floor(start / 60);
                    var sec = start - min * 60;
                    realStart = (start / 60).toFixed(2);
                    let str = realStart.toString();
                    var numArray = str.split('.');
                    var a = new Array();
                    a = numArray;
                    // console.log(a[0])
                    // console.log(a[1])
                    startFormat = `00:0${min}:${sec}`
                } else {
                    realStart = start;
                    startFormat = `00:00:${realStart}`;
                }

                console.log("start", startFormat)
                console.log("end", endFormat)

                const uid = uuid();
                const fileLink = `${FileSystem.documentDirectory}vid/vidbit${uid}.mp4`;



                AsyncStorage.setItem("fileLink", fileLink);
                const res = await RNFFmpeg.executeWithArguments([
                    '-i',
                    // `${image.uri}`,
                    `${file ? file : image.uri}`,
                    '-ss',
                    `${startFormat}`,
                    '-to',
                    `${endFormat}`,
                    `-async`,
                    '1',
                    `-c:v`,
                    `copy`,
                    `-c:a`,
                    `copy`,
                    `${fileLink}`
                ]);

                console.log(res)

                RNFFmpegConfig.getLastReturnCode().then(async (result) => {
                    console.log("Last return code: " + result.lastRc);
                    if (result.lastRc === 0) {
                        const fileUri = `${fileLink}`;
                        // console.log(fileUri)
                        const asset = await MediaLibrary.createAssetAsync(fileUri)
                        await MediaLibrary.createAlbumAsync("Download", asset, false)


                        // let saved = await MediaLibrary.saveToLibraryAsync(fileUri)
                        // console.log(saved)
                        // setLoading(false);
                        // navigation.navigate("VideoTrimmed")
                    } else {
                        alert("Error occured");
                        i = arrOfVid.length + 1;
                    }
                });
            }
        }
    }

    const pickImage = async () => {
        console.log("picking image")
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
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
    };



    // sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

    const multiSliderValuesChange = values => {
        setMultiSliderValue(values);
        videoRef.current.seek(values[0] / 1000, 50);
        console.log(values[0] / 1000)
    }


    return (
        <View style={styles.container}>

            {!image && !loading && <TouchableOpacity
                onPress={pickImage}
                style={styles.btnContianer}>
                <LinearGradient
                    style={styles.layer}
                    colors={['#f1525a', '#ed6679', '#ed6b8d', '#dc6988']}>
                    <Entypo name="folder-video"
                        style={styles.icon}
                    />
                    <Text style={styles.textBtn}>{I18n.t("pikTIlte")}</Text>
                </LinearGradient>
            </TouchableOpacity>}

            {!!image && !loading &&
                <Video
                    source={{ uri: image.uri }}
                    style={styles.vid}
                    controls={true}
                    ref={videoRef}
                    resizeMode={"cover"}
                />}

            {/* {!!image && !loading && !hide &&
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

                </>
            } */}

            {!!image && !loading && <>
                <View style={styles.switchContainer}>
                    <Text>Reduce video size</Text>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                {!!isCustom && <View style={styles.switchContainer}>
                    <Text>{I18n.t("pikTIlte")}</Text>
                    <TextInput
                        style={styles.textDu}
                        placeholder="0s"
                        value={customDration}
                        keyboardType={"number-pad"}
                        onChangeText={e => handleSetDration(`${e}`)}
                    />
                </View>}
                <View style={styles.switchContainer}>
                    <Text></Text>
                    {!!durantionNote && <Text style={{ color: 'grey', fontSize: 13 }}>{I18n.t("durantionNote")}</Text>}
                </View>
                <TouchableOpacity style={styles.trimCOntianre}
                    onPress={() => handleTrim(multiSliderValue[0], trimDurantion)}
                >
                    <Entypo name="scissors" style={styles.iconTrim} />
                    <Text style={styles.trimText}>{I18n.t("trimText")}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.trimCOntianre}
                    onPress={pickImage}
                >
                    <Entypo name="scissors" style={styles.iconTrim} />
                    <Text style={styles.trimText}>Video</Text>
                </TouchableOpacity> */}

            </>}

            {!!loading &&
                <View style={styles.contianerLoadi}>
                    <Image
                        source={CutPic}
                        style={styles.cutPic}
                    />
                    <ActivityIndicator
                        color='blue'
                        size={44}
                        style={styles.loader} />
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    },
    cutPic: {
        resizeMode: 'contain',
        width: '100%',
        flex: 0.8,
    },
    contianerLoadi: {
        flex: 1
    },
    loader: {
        flex: 0.2,
        color: 'blue',
        fontSize: 33,
    },
    switchContainer: {
        // backgroundColor: 'red',
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 20,
    },
    switch: {
        // backgroundColor: 'black',
        alignSelf: 'flex-end'
    },
    textDu: {
        borderColor: 'black',
        borderWidth: 1,
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})



 // const res = await RNFFmpeg.executeWithArguments([
            //     '-ss',
            //     `${from}`,
            //     '-i',
            //     image.uri,
            //     '-to',
            //     `${to}`,
            //     `${fileLink}`,
            // ]);
            // console.log(res);