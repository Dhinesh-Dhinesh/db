import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    Button,
} from 'react-native';

export default function New() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [salary,setSalary] = useState('');
    const [position,setPosition] = useState('');

    const submitData = () => {
        fetch('https://fame-server.herokuapp.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                salary,
                position
            })
        }).then(Alert.alert('Success'))
        .catch(error => console.error(error));
    }

    return (
        <View styles={styles.body}>
            <Text style={styles.title}>Enter Details</Text>
            <View style={styles.item}>
                <TextInput placeholder="Name" onChangeText={(text) => setName(text)}/>
            </View>
            <View style={styles.item}>
                <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)}/>
            </View>
            <View style={styles.item}>
                <TextInput placeholder="Phone" onChangeText={(text) => setPhone(text)}/>
            </View>
            <View style={styles.item}>
                <TextInput placeholder="Salary" onChangeText={(text) => setSalary(text)}/>
            </View>
            <View style={styles.item}>
                <TextInput placeholder="Position" onChangeText={(text) => setPosition(text)}/>
            </View>
            <View style={styles.btn}>
                <Button title="Send" onPress={() => {submitData()}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    item: {
        width: '80%',
        height: '10%',
        borderWidth: 1,
        marginTop: 10,
        marginHorizontal: '10%',
        padding: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    btn:{
        width: '50%',
        height: '10%',
        marginTop: 10,
        marginHorizontal: '25%',
        padding: 10,
    }
});