import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native'
import { Button, ButtonGroup, CheckBox, Input, Text } from '@rneui/themed'
import * as Font from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from 'react';

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font))
}

const Stack = createNativeStackNavigator()
const sampleData = [
  {
    prompt: 'What city is the capital of Florida?',
    type: 'multiple-choice',
    choices: ['Miami', 'Orlando', 'Tallahassee', 'Sarasota'],
    correct: 2, // Tallahassee
  },
  {
    prompt: 'Which of the following are mammals',
    type: 'multiple-answer',
    choices: ['Snake', 'Dog', 'Eagle', 'Elephant'],
    correct: [1, 3], // Dog and Elephant
  },
  {
    prompt: 'Is the sky blue?',
    type: 'true-false',
    choices: ['True', 'False'],
    correct: 0, // True
  },
]

function Question({ navigation, route }) {
  console.log(route.params)
  const { questionNumber, userChoices, data } = route.params
  let { choices, prompt, type } = data[questionNumber]
  let initialSelection = 0
  let [selectedIndex, setSelectedIndex] = useState(0)
  let [selectedIndexes, setSelectedIndexes] = useState([])
  let nextQuestion = () => {
    let nextQuestion = questionNumber + 1
    console.log(selectedIndex)
    if (type != 'multiple-answer') {
      userChoices.push(selectedIndex)
    } else {
      userChoices.push(selectedIndexes)
    }
    if (nextQuestion < sampleData.length) {
      console.log('Navigating to next question...')
      console.log({ questionNumber: nextQuestion, sampleData, userChoices })
      navigation.navigate('Question', {
        questionNumber: nextQuestion,
        sampleData,
        userChoices,
      })
    } else {
      navigation.navigate('SummaryScreen', {
        questionNumber: nextQuestion,
        sampleData,
        userChoices,
      })
    }
  }
  return (
    <View style={styles.container}>
    <Text>{prompt}</Text>
    {type != 'multiple-answer' ? (
      <ButtonGroup
      testID="choices"
      buttons={choices}
      vertical
      selectedIndex={selectedIndex}
      onPress={(value) => {
        console.log(value)
        console.log(selectedIndex)
        setSelectedIndex(value)
      }}
      containerStyle={{ marginBottom: 20, width: '70% ' }}
      />
    ) : (
      <ButtonGroup
      testID="choices"
      buttons={choices}
      vertical
      selectMultiple
      selectedIndexes={selectedIndexes}
      onPress={(value) => {
        setSelectedIndexes(value)
      }}
      containerStyle={{ marginBottom: 20, width: '70%' }}
      />
    )}
    <Button
      testID="next-question"
      onPress={nextQuestion}
      title="Submit"
      buttonStyle={{ width: 100 }}
      ></Button>
    </View>
    )
  }

  function SummaryScreen({ route }) {
    let calculateCorrect = (userSelected, correct, type) => {
      let userCorrect = false;
      if (type === 'multiple-choice' || type === 'true-false') {
        userCorrect = userSelected === correct;
      } else if (type === 'multiple-answer') {
        if (!Array.isArray(userSelected)) {
          userSelected = [userSelected];
        }
        userCorrect = correct.every((item) => userSelected.includes(item)) &&
                      userSelected.every((item) => correct.includes(item));
      }
      return userCorrect;
    };
  
    let totalScore = 0;
    for (let i = 0; i < route.params.data.length; i++) {
      let { correct, type } = route.params.data[i];
      let userSelected = route.params.userChoices[i];
      console.log(`Question ${i + 1}: userSelected = ${JSON.stringify(userSelected)}, correct = ${JSON.stringify(correct)}, type = ${type}`);
      let userCorrect = calculateCorrect(userSelected, correct, type);
  
      if (userCorrect) { 
        totalScore++;
      }
    }
  
    return (
      <View style={styles.container}>
        <FlatList
          data={route.params.data}
          renderItem={({ item, index }) => {
            let { choices, prompt, type, correct } = item;
            let userSelected = route.params.userChoices[index];
            let userCorrect = calculateCorrect(userSelected, correct, type);
  
            return (
              <View style={styles.questionContainer} key={index}>
                <Text style={styles.questionText}>{prompt}</Text>
                {choices.map((value, choiceIndex) => {
                  let userDidSelect = Array.isArray(userSelected) ? userSelected.includes(choiceIndex) : userSelected === choiceIndex;
                  let isCorrectChoice = Array.isArray(correct) ? correct.includes(choiceIndex) : correct === choiceIndex;
  
                  return (
                    <View
                      style={{
                        backgroundColor: userDidSelect
                          ? isCorrectChoice ? 'lightgreen' : 'red'
                          : undefined,
                        padding: 10,
                        borderRadius: 5,
                        marginVertical: 5,
                      }}
                      key={value}
                    >
                      <Text
                        style={{
                          textDecorationLine: userDidSelect && !isCorrectChoice
                            ? 'line-through'
                            : undefined,
                        }}
                      >
                        {value}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
        <Text style={styles.scoreText}>Score: {totalScore}</Text>
      </View>
    );
  }
  
export default function App() {
  cacheFonts([FontAwesome.font])
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName ="Question">
          <Stack.Screen
            initialParams={{
              questionNumber: 0,
              data: sampleData,
              userChoices: [],
            }}
            name="Question"
            options={{ headerShown: false }}
            >
              {(props) => <Question {...props} />}
            </Stack.Screen>
            <Stack.Screen
            name="SummaryScreen"
            initialParams={{
              questionNumber: sampleData.length - 1,
              data: sampleData,
              userChoices: [1, [0, 2], 1],
            }}
            options={{ headerShown: false }}
            component={SummaryScreen}
        ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
      },
      questionContainer: {
        marginBottom: 20,
      },
      questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      choiceContainer: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
      },
      choiceText: {
        fontSize: 16,
      },
      scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
      },
      contentContainer: {
        flexGrow: 1,
      },
    });
