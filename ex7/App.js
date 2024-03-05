import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { CheckBox, Text } from '@rneui/themed';
import { FlatList } from 'react-native'
import { TextInput, Button } from 'react-native';
import * as Font from 'expo-font'



import FontAwesome from '@expo/vector-icons/FontAwesome'

import { useState } from 'react'

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font))
}

let initTasks = [
  {description: "Task 1", completed: true, key: 1},
  {description: "Task 2", completed: true, key: 2}
]
export default function App() {
  cacheFonts([FontAwesome.font])
  let [tasks, setTasks] = useState(initTasks)
  let [input, setInput] = useState("")
  let updateTask = (task) => {
    console.log(task)
    task.completed = !task.completed
    setTasks([...tasks])
  }
  
  let addTask = () => {
    let maxKey = 0
    tasks.forEach(task => {
      if(task.key > maxKey) {
        maxKey = task.key
      }

    })
    setTasks([...tasks, {
      description: input,
      completed: false,
      key: maxKey+1
    }])
    console.log(tasks)
    setInput("")
  }

  let renderItem = ({item}) => {
    return (
    <CheckBox
      textStyle={item.completed ? {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
      } : undefined}
      title={item.description}
      checked={item.completed}
      onPress={() => updateTask(item)}
      />
    )

  }
  return (
    <View style={[styles.container]}>
      <StatusBar style="auto" />
        <FlatList data={tasks} renderItem={renderItem} />
        <View style={[styles.horizontal]}>
      <TextInput
        onChangeText={setInput}
        value={input}
        placeholder="New task..."
      ></TextInput>< Button title="Add Task" onPress={addTask}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 1,
    width: '50%',
    backgroundColor: '#0553',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },

});
