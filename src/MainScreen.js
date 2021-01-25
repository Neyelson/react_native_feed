import React, { Component, useEffect, useState, setState, state, LogBox } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity, View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import HTML from 'react-native-render-html';
import Constants from 'expo-constants';

var postsporpagina = 10;

export default class MainScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoadingBottom: false,
      dataSource: null,
    }
  }

  getData() {
    if (postsporpagina == 10) {
      this.setState({
        isLoading: true,
        isLoadingBottom: false,
      })
    }

    if (postsporpagina > 10) {
      this.setState({
        isLoadingBottom: true,
      })
    }

    fetch('https://rocketsciencebrasil.com/wp-json/wp/v2/posts?per_page=' + postsporpagina)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          isLoadingBottom: false,
          dataSource: responseJson,
        })
      })
      .catch((error) => console.error(error))
  }

  componentDidMount() {
    this.getData();
  }

  onRefresh() {
    postsporpagina = 10;
    //Clear old data of the list
    this.setState({ dataSource: [] });
    //Call the Service to get the latest data
    this.getData();
  }

  bottomReached = () => {
    postsporpagina = postsporpagina + 10;
    this.getData();
    console.log('dae')
  }

  render() {

    if (this.state.isLoading) {
      return (
        <SafeAreaProvider >
          <SafeAreaView style={styles.container}>
            <View style={{
              justifyContent: 'center', //Centered vertically
              flex: 1
            }}><ActivityIndicator style={styles.loadingTop} size="large" color="grey" /></View>
          </SafeAreaView>
        </SafeAreaProvider>
      );
    } else { //tudo abaixo está dentro do else
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

      //o componente "view" é necessario por algum motivo que eu não sei, isso evita da onEndReached não saber quando é o bottom
      return (
        <SafeAreaProvider >
          <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, height: 1 }}>

              <FlatList
                bounces={true}
                showsVerticalScrollIndicator={true}
                data={this.state.dataSource}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => (
                  <Posts titulo={item.title.rendered} imagem={item.jetpack_featured_media_url} descricao={item.excerpt.rendered} />
                )}
                refreshControl={
                  <RefreshControl enabled={true} refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} size="large" tintColor="#ff0000" colors={["grey"]} />
                }
                onEndReached={this.bottomReached}
              />
              {this.state.isLoadingBottom ? <ActivityIndicator style={styles.loadingBottom} size="large" color="grey" /> : null}

            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      );

      //else termina aqui
    }
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
  loadingTop: {
    padding: 10,
    borderColor: "grey",

  },
  loadingBottom: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: "lightgrey",
  },
});
