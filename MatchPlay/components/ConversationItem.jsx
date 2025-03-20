import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConversationItem = ({ user, lastMessage, timestamp }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.userName}>{user}</Text>
            <Text style={styles.lastMessage}>{lastMessage}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    lastMessage: {
        color: '#666',
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
    },
});

export default ConversationItem;