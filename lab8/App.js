import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { CheckBox, Text } from '@rneui/themed';
import { FlatList } from 'react-native'
import { TextInput, Button } from 'react-native';
import * as Font from 'expo-font'
import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useState } from 'react'
import { Input, Button as RNButton, Text as RNText } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font))
}

let initTasks = [
  {description: "Task 1", completed: true, key: 1},
  {description: "Task 2", completed: true, key: 2}
]

const Stack = createNativeStackNavigator()

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Todo List" component={TodoScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (username === 'test' && password === 'Test1@') {
        navigation.navigate("Todo List");
        setError("");
        return;
      }

      const users = await AsyncStorage.getItem('users');
      if (users) {
        const loginInfo = JSON.parse(users);
        const foundUser = loginInfo.find(user => user.username === username && user.password === password);
        if (foundUser) {
          navigation.navigate("Todo List");
          setError("");
        } else {
          setError("Incorrect username or password");
        }
      } else {
        setError("No registered users found. Please register first.");
      }
    } catch (error) {
      console.error("Error retrieving login data: ", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.formContainer}>
        <Input
          placeholder="Login"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={setUsername}
          value={username}
          testID="login-username"
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          testID="login-password"
        />
        <Button
          title="Login"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.loginButton}
          onPress={handleLogin}
          testID="login-button"
        />
        <Button
          title="Register"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.registerButton}
          onPress={() => navigation.navigate("Registration")}
          testID="login-register"
        />
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      </View>
    </View>
  );
}

function RegistrationScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(true);

  const validateFields = () => {
    setIsRegisterButtonDisabled(
      !firstName || !lastName || !username || !phoneNumber || !password || !confirmPassword || !email || !zipCode
    );
  };
  
  const handleFirstNameChange = (text) => {
    if (!/^[^\d=?\\/@#%^&*()]+$/.test(text)) {
      setError("Error: First name must only include word or symbol characters, no numbers.");
    } else {
      setError("");
    }
    setFirstName(text);
    validateFields();
  };

  const handleLastNameChange = (text) => {
    if (!/^[^\d=?\\/@#%^&*()]+$/.test(text)) {
      setError("Error: Last name must only include word or symbol characters, no numbers.");
    } else {
      setError("");
    }
    setLastName(text);
    validateFields();
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    validateFields();
  };

  const handlePhoneNumberChange = (text) => {
    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(text)) {
      setError("Error: Phone number must be exactly (xxx) xxx-xxxx and all digits.");
    } else {
      setError("");
    }
    setPhoneNumber(text);
    validateFields();
  };

  const handleEmailChange = (text) => {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(text)) {
      setError("Error: Invalid email format. Must include an '@' sign and at least one period following it.");
    } else {
      setError("");
    }
    setEmail(text);
    validateFields();
  };

  const handlePasswordChange = (text) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    if (!passwordRegex.test(text)) {
      setError("Error: Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
    } else {
      setError("");
    }
    setPassword(text);
    validateFields();
  };

  const handleConfirmPasswordChange = (text) => {
    if (text !== password) {
      setError("Error: Passwords do not match.");
    } else {
      setError("");
    }
    setConfirmPassword(text);
    validateFields();
  };

  const handleZipCodeChange = (text) => {
    if (!/^\d{5}$/.test(text)) {
      setError("Error: ZIP Code must include 5 digits.");
    } else {
      setError("");
    }
    setZipCode(text);
    validateFields();
  };

  const handleNewsletterChange = (value) => {
    setNewsletter(value);
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !phoneNumber || !password || !confirmPassword || !email || !zipCode) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

 let users = [];
 try {
   const existingData = await AsyncStorage.getItem('users');
   if (existingData) {
     users = JSON.parse(existingData);
   }
 } catch (error) {
   console.error("Error retrieving user data:", error);
 }

 const usernameExists = users.some(user => user.username === username);
 if (usernameExists) {
   setError("Username already exists. Please choose a different one.");
   return;
 }

 const newUser = {
   firstName,
   lastName,
   username,
   phoneNumber,
   password,
   email,
   zipCode,
   newsletter,
 };
 users.push(newUser);

 try {
   await AsyncStorage.setItem('users', JSON.stringify(users));
   navigation.navigate("Login");
 } catch (error) {
   console.error("Error saving user data:", error);
   setError("Error registering user");
 }
};

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={handleFirstNameChange}
          value={firstName}
          placeholder="First Name"
          testID="firstname"
        />
        <TextInput
          onChangeText={handleLastNameChange}
          value={lastName}
          placeholder="Last Name"
          testID="lastname"
        />
        <TextInput
          onChangeText={handleUsernameChange}
          value={username}
          placeholder="Username"
          testID="username"
        />
        <TextInput
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
          placeholder="Phone Number (e.g., (xxx) xxx-xxxx)"
          testID="phonenumber"
        />
        <TextInput
          onChangeText={handleEmailChange}
          value={email}
          placeholder="Email"
          testID="email"
        />
        <TextInput
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          testID="password"
        />
        <TextInput
          onChangeText={handleConfirmPasswordChange}
          value={confirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={true}
          testID="confirmpassword"
        />
        <TextInput
          onChangeText={handleZipCodeChange}
          value={zipCode}
          placeholder="ZIP Code"
          test ID="zip"
        />
        <CheckBox
          title="Sign up for newsletter"
          checked={newsletter}
          onPress={handleNewsletterChange}
          testID="newsletter"
        />
        <Button
          title="Register"
          onPress={handleRegister}
          disabled={isRegisterButtonDisabled}
          testID="register-button"
        />
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      </View>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      </View>
  )
}

function TodoScreen({navigation}) {
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
      <View style ={styles.horizontal}>
    <CheckBox
      textStyle={item.completed ? {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
      } : undefined}
      title={item.description}
      checked={item.completed}
      onPress={() => updateTask(item)}
      />
      <Button title ="Details" onPress={() => navigation.navigate("Details")}/>
      </View>
    );
  };

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
  );
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
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: '#007bff',
  },
  registerButton: {
    backgroundColor: '#28a745',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});
