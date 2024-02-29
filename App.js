import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screen components
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Go to Screen One" onPress={() => navigation.navigate('ScreenOne')} />
      <Button title="Go to Screen Two" onPress={() => navigation.navigate('ScreenTwo')} />
    </View>
  );
}

function ScreenOne({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>You are on the first screen.</Text>
    </View>
  );
}

function ScreenTwo({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>You are on the second screen.</Text>
    </View>
  );
}

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="ScreenOne" component={ScreenOne} options={{ title: 'Screen One' }} />
        <Stack.Screen name="ScreenTwo" component={ScreenTwo} options={{ title: 'Screen Two' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
