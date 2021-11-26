import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Alert,
    FlatList,
    Image,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';


export default function UploadImager() {

    const [list,setList] = useState([]);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
        getImages();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
        
        if (!result.cancelled) {
            let newFile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test/${result.uri.split(".")[1]}`
            }
            handleUploader(newFile);
        }
    };

    const handleUploader = (img) => {
        const data = new FormData()
        data.append('file', img)
        data.append('upload_preset', 'fameApp')
        data.append('cloud_name', 'fame-storage')

        fetch('https://api.cloudinary.com/v1_1/fame-storage/image/upload', {
            method: 'post',
            body: data             
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            uploadImageToMongo(data.url)  //calling a function
        })
    }

    const getImages = () => {
        fetch('https://fame-server.herokuapp.com/getImages',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            setList(data);
        })
    }

    // This function is used in handleUploader {line - 45}
    const uploadImageToMongo = (link) => {
        fetch('https://fame-server.herokuapp.com/uploader',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uri : link
            })
        }).then(Alert.alert('Success'))
        .catch(error => console.error(error));
    }
    //-end

    return (
        <View style={styles.container}>
            <Text style={styles.headder}>Upload image</Text>
            <Button title="Upload" onPress={pickImage}/>
            <FlatList
            data = {list}
            keyExtractor={(item, index) => index.toString()}
            renderItem = {({item}) => {
                return(
                    <View style={styles.item}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.uri}}
                            resizeMode={'cover'}
                        />
                    </View>
                )}
            }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headder:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    image:{
        width: 200,
        height: 200,
        marginTop: 5,
        marginBottom: 5,
    },
});