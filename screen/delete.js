import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    Image,
} from 'react-native';

export default function Delete() {
    
    const [id,setId] = useState('');

    const deleteData = () => {
        fetch('https://fame-server.herokuapp.com/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        }).then(Alert.alert('Data Deleted'))
        .catch(error => console.log(error))
    }

    return (
        <View>
            <Text>Delete Page</Text>
            <TextInput placeholder="Enter ID here" onChangeText={(val)=>setId(val)}/>
            <Button title="Delete Data" onPress={()=>deleteData()}/>
        </View>
    );
}