import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';


const width = Dimensions.get("window").width;


export default function VideoTrimmed(){

    const [fileUri, setFileuri] = useState(null)

    useEffect(()=>{
        setgetVider()
    },[])

    const getFile = async() => {
        const fileUri = await AsyncStorage.getItem("fileLink");
        return fileUri;
    }

    const setgetVider = async ()=> {
        const file = await getFile();
        setFileuri(file)

    }   

    return(
        <View style={styles.container}>
            <Text>Success</Text>
            {!!fileUri && <Video
                    source={{ uri: fileUri }}
                    style={styles.vid}
                    controls={true}
                    // ref={videoRef}
                    resizeMode={"cover"}
                />}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    vid: {
        width: width,
        height: '35%',
    },
})