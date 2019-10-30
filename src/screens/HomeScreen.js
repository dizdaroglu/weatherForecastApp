import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, AsyncStorage, ScrollView, Alert, Image } from 'react-native';
import MyHeader from '../components/MyHeader'
import Card from '../components/Card'
import { LinearGradient } from 'expo'


export default class HomeScreen extends Component {

    state = {
        info: {
            name: "loading",
            temp: "loading",
            humidity: "loading",
            desc: "loading",
            icon: "loading"
        }
    }

    async getWeather() {
        //https://api.openweathermap.org/data/2.5/weather?q=ankara&units=metric&appid=8206c24ea422091548d1bd5b0a092ccb
        Mycity = await AsyncStorage.getItem('mericity');
        console.log(Mycity)
        Mycity = this.props.navigation.getParam('city', "ankara")

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&appid=8206c24ea422091548d1bd5b0a092ccb`)
            .then(res => res.json())
            .then(data => {

                this.setState({
                    info: {
                        name: data.name,
                        temp: data.main.temp,
                        humidity: data.main.humidity,
                        desc: data.weather[0].description,
                        icon: data.weather[0].icon
                    }
                })
            })
            .catch(err => {
                Alert.alert("Error" + err.message + "please connect to internet", [{ text: "ok" }])
            })
    }
    componentDidMount() {
        this.getWeather()
    }
    render() {
        if (this.props.navigation.getParam('city')) {
            this.getWeather()
        }
        console.log(this.state.info)
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <MyHeader title="Current Weather" />
                <View style={styles.card}>

                    <Text style={styles.text}>{this.state.info.name}</Text>
                    <Image
                        style={{ width: 120, height: 120 }}
                        source={{ uri: "http://openweathermap.org/img/w/" + this.state.info.icon + ".png" }} />
                    <Text style={styles.text}>{this.state.info.temp}</Text>
                    <Text style={styles.text}>{this.state.info.desc}</Text>
                    <Text style={styles.text}>{this.state.info.humidity}</Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    card: {

        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 150,
        marginHorizontal: 15,
        backgroundColor: '#e9446a',
        borderRadius: 10
    },
    text: {
        textTransform: 'uppercase',
        color: 'white',
        marginVertical: 10,
        fontWeight: '600'
    }
})