import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import MyHeader from '../components/MyHeader'
import Card from '../components/Card'


export default class SearchScreen extends Component {
    state = {
        text: "",
        cities: []
    }

    fetchCities = (text) => {
        console.log(text)
        this.setState({ text })
        console.log("fetchCities:1", this.state.text)

        fetch(`http://autocomplete.wunderground.com/aq?query=${text}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pin: 212,
            })
        })

            .then(data => data.json())
            .then(city => {
                this.setState({
                    cities: city.RESULTS.slice(0, 9)
                })
            })


    }



    async  listclicked(name) {
        this.setState({
            text: name
        })

        await AsyncStorage.setItem("mericity", name)
        this.props.navigation.navigate('Home', { city: name })

    }
    render() {
        renderCity = <Card><Text>No city</Text></Card>
        if (this.state.cities.length > 0) {
            renderCity = this.state.cities.map(city => {
                return (
                    <Card key={city.name} onPress={() => this.listclicked(city.name)}>
                        <Text >{city.name}</Text>
                    </Card>
                )
            })
        }
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <MyHeader title="Search City" />

                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    value={this.state.text}
                    onChangeText={text => this.fetchCities(text)}
                />

                <ScrollView>
                    {
                        renderCity
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    input: {
        borderBottomColor: '#c2c2c2',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    button: {
        backgroundColor: '#e9446a',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        textTransform: 'uppercase'
    }
})