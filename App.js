const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },

]

import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    //SafeAreaProvider é obrigatorio para web, não sei o motivo
    <SafeAreaProvider >
    <SafeAreaView style={styles.container}>

      <Card style={styles.card} elevation={7}>
      <TouchableOpacity >
        <Card.Title style={styles.title}>13º missão da Rocket Lab fracassa e satélites são perdidos</Card.Title>
        <Card.Image source={{ uri: "https://rocketsciencebrasil.com/wp-content/uploads/2020/07/rocketlabfail.jpg" }} />
        <Text style={{ marginTop: 10 }}>Um problema desconhecido com o foguete Electron, da empresa Rocket Lab, ocasionou falha na missão e houve perda total dos satélites que deveriam ter sido entregues hoje.</Text>
        </TouchableOpacity>
      </Card>
   
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {

  },
  title: {
    textAlign: "left",
    textTransform:'uppercase'
  },
});
