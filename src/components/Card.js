import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ children, onPress }) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        height: 53,
        backgroundColor: '#454d65',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 5
    },
    text: {
        color: '#c4c6ce'
    }
})

export default Card;
