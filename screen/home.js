import React, { useState } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet
} from 'react-native';

export default function HomeScreen() {

    const [datas, setDatas] = useState([]);

    function getData() {
        fetch('http://10.0.2.2:3000/ok', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => setDatas(data))
            .catch(error => console.error(error));
    }

    getData();

    return (
        <View style={styles.container}>
            <FlatList
                data={datas}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.flatContainer}>
                            <Text>Name : {item.name}</Text>
                            <Text>Phone : {item.phone}</Text>
                            <Text>Email : {item.email}</Text>
                            <Text>Salary : {item.salary}</Text>
                            <Text>Position : {item.position}</Text>
                            <Text style={styles.mongo}>Mongo DB ID :{item._id}</Text>
                        </View>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        marginVertical: 10,
    },
    flatContainer: {
        marginVertical: 8,
        padding: 10,
        borderWidth: 2,
    },
    mongo:{
        color: "#f57",
        marginTop: 10,
    },

});