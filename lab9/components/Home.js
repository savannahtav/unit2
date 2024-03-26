import React from 'react';
import { View, FlatList, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  const exercises = [
    { title: 'Push Ups', screen: 'Push Ups', activity: 'Push Ups', suggested: 'Running' },
    { title: 'Running', screen: 'Running', activity: 'Running', suggested: 'Planks' },
    { title: 'Planks', screen: 'Planks', activity: 'Planks', suggested: 'Swimming' },
    { title: 'Swimming', screen: 'Swimming', activity: 'Swimming', suggested: 'Push Ups' }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Button
        title={item.title}
        onPress={() => navigation.navigate(item.screen, { activity: item.activity, suggested: item.suggested })}
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
