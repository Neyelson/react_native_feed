import React, { Component, useEffect, useState } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity, View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import HTML from 'react-native-render-html';
import Constants from 'expo-constants';

//abaixo é para o scrollview update
const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default App = () => {

    //abaixo é para o status do fetch
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    //abaixo é a função para pegar os dados da API
    getData = () => {
        setRefreshing(true);
        fetch('https://rocketsciencebrasil.com/wp-json/wp/v2/posts?per_page=10')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
            .finally(() => setRefreshing(false));
    }

    //abaixo é para o scrollview update
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        this.getData();
        //wait(1000).then(() => setRefreshing(false));
    }, []);

    //abaixo é o fetch api
    useEffect(() => {
        this.getData();
    }, []);

    //abaixo é um componente para mostrar os cartões
    function Posts({ titulo, imagem, descricao }) {
        return (
            <Card style={styles.card} elevation={7}>
                <TouchableOpacity >
                    <Card.Title style={styles.title} >{titulo}</Card.Title>
                    <Card.Image source={{ uri: imagem }} />
                    <HTML source={{ html: descricao }} />
                </TouchableOpacity>
            </Card>
        )
    }

    //abaixo renderiza o que deve ser mostrado na tela
    return (
        <SafeAreaProvider >
            <SafeAreaView style={styles.container}>

                {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                    bounces={true}

                        keyExtractor={(item, index) => item.id.toString()}
                        data={data}
                        refreshControl={
                            <RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} title="Pull to refresh" tintColor="#fff" titleColor="#fff" colors={["red", "green", "blue"]} />
                        }
                        renderItem={({ item }) => (
                            <Posts titulo={item.title.rendered} imagem={item.jetpack_featured_media_url} descricao={item.excerpt.rendered} />
                        )}
                    />
                )}

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

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