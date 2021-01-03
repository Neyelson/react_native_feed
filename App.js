const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },

]

import React from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    //SafeAreaProvider é obrigatorio para web, não sei o motivo
    <SafeAreaProvider >
    <SafeAreaView style={styles.container}>

      <Card style={styles.card} elevation={10}>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: "https://i.ytimg.com/vi/xyzW59BQwoI/maxresdefault.jpg" }} />
        <Text style={{ marginTop: 10 }}>Although the docs says it is relevant only for iOS, when I used React's SafeAreaView it acted differently on different.</Text>
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
});
