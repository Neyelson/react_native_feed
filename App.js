import React, { Component, useEffect, useState, setState, state, LogBox } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity, View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import MainScreen from './src/MainScreen.js';

export default class App extends Component {

    render() {
        return (
            <>
            <MainScreen> </MainScreen>
            </>
        )
    }

}

//abaixo são estilos personalizados
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
    },
    title: {
        textAlign: "left",
        textTransform: 'uppercase',
        fontSize: 17
    },
});
