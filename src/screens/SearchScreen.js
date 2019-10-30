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
        fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
            .then(data => data.json())
            .then(city => {
                this.setState({
                    cities: city.RESULTS.slice(0, 9)
                })
            })
        console.log(this.state.cities)
    }


    async  onSaveChange() {
        this.props.navigation.navigate('Home', { city: this.state.text })
        await AsyncStorage.setItem("mericity", this.state.text)
    }
    async  listclicked(name) {
        this.setState({ text: name })
        await AsyncStorage.setItem("mericity", this.state.text)
        this.props.navigation.navigate('Home', { city: this.state.text })

    }
    render() {
        renderCity = <Card><Text>No city</Text></Card>
        if (this.state.cities.length > 0) {
            renderCity = this.state.cities.map(city => {
                return (
                    <Card key={city.lat} onPress={() => this.listclicked(city.name)}>
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
                <TouchableOpacity style={styles.button} onPress={() => onSaveChange()}>
                    <Text style={styles.buttonText}> Save Changes</Text>
                </TouchableOpacity>
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