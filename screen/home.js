import React, { useState } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Button,
} from 'react-native';

export default function HomeScreen({navigation}) {

    const [datas, setDatas] = useState([]);
    const [refresh, setRefreshing] = useState(false);

    function getData() {
        fetch('https://fame-server.herokuapp.com/ok', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => setDatas(data))
            .catch(error => console.error(error));
    }

    getData();

    const onRefresh = () => {
        setRefreshing(true);
        getData();
        setRefreshing(false);
    }

    return (
        <ScrollView
        style={styles.body}
        refreshControl={
            <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
            />
        }>
        <Button title="Create" onPress={()=> navigation.navigate("CreateUser")}/> 
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
        </ScrollView>
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
    body: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },

});