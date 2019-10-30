import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const MyHeader = ({ title }) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>
            {title}
        </Text>
    </View>
);
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#e9446a',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginTop: 20
    }
})
export default MyHeader

