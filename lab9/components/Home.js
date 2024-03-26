import React from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  const exercises = [
    { title: 'Push Ups', screen: 'Push Ups', activity: 'Push Ups' },
    { title: 'Running', screen: 'Running', activity: 'Running' },
    { title: 'Planks', screen: 'Planks', activity: 'Planks' },
    { title: 'Swimming', screen: 'Swimming', activity: 'Swimming' }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Button
        title={item.title}
        onPress={() => navigation.navigate(item.screen, { activity: item.activity })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  item: {
    marginVertical: 10
  }
});

export default Home;
