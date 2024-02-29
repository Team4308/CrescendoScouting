import { View, StyleSheet, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Screen components
function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Image style={styles.homeCrescendoImage} source={require('./assets/images/crescendo.png')} />
      
      <View style={styles.homeNavigationButtonContainer}>
        <Pressable style={[styles.homeNavigationButton, {backgroundColor: '#c3423f'}]} onPress={() => navigation.navigate('standsScreen')}>
          <Text style={styles.homeNavigationButtonText}>Stands</Text>
        </Pressable>

        <Pressable style={[styles.homeNavigationButton, {backgroundColor: '#5bc0eb'}]} onPress={() => navigation.navigate('pitsScreen')}>
          <Text style={styles.homeNavigationButtonText}>Pits</Text>
        </Pressable>

        <Pressable style={[styles.homeNavigationButton, {backgroundColor: '#959595'}]}>
          <Text style={styles.homeNavigationButtonText}>Reset</Text>
        </Pressable>
      </View>

      <StatusBar barStyle='light-content' />
    </View>
  );
}

function StandsScreen() {
  return (
    <ScrollView style={styles.standsScoutingContainer}>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaTeamNumberText}>Team Number</Text>
        <TextInput
          style={styles.criteriaTeamNumberInput}
          placeholder='4308'
          placeholderTextColor='#959595'
          keyboardType='numeric'
          maxLength={4}
        />
      </View>
    </ScrollView>
  );
}

function PitsScreen() {
  return (
    <View style={styles.standsScoutingContainer}>
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
        <Stack.Screen name="homeScreen" component={HomeScreen} options={{title: 'Home', headerShown: false}} />
        <Stack.Screen name="standsScreen" component={StandsScreen} options={{
          title: 'Stands',
          headerRight: () => (
            <Pressable style={styles.headerResetButton}>
              <Text style={[styles.headerResetButtonText, {color: '#fff'}]}>Reset</Text>
            </Pressable>
          ),

          headerStyle: {
            backgroundColor: '#211a1e',
            borderBottomColor: '#fff',
            borderWidth: 1,
          },

          headerTintColor: '#fff',
      }} />
        <Stack.Screen name="pitsScreen" component={PitsScreen} options={{ title: 'Pits' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#191919',
  },
  
  homeCrescendoImage: {
    flex: 1,
    marginTop: '10%',
    width: '80%',
    height: '20%',
    objectFit: 'contain',
  },
  
  homeNavigationButtonContainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'space-evenly',
  },

  homeNavigationButton: {
    height: '18%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },

  homeNavigationButtonText: {
    color: '#fff',
    fontSize: 28,
    textShadowOffset: {
      height: 2,
    },
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowRadius: 5,
  },

  headerResetButton: {
    marginRight: '8%',
    backgroundColor: '#959595',
    width: '30%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  
  standsScoutingContainer: {
    flex: 1,
    backgroundColor: '#211a1e',
  },

  headerResetButtonText: {
    color: '#fff',
    textShadowOffset: {
      height: 2,
    },
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowRadius: 5, 
  },

  criteriaContainer: {
    flex: 1,
    padding: 20,
  },

  criteriaTeamNumberText: {
    color: '#fff',
    fontSize: 20,
  },

  criteriaTeamNumberInput: {
    padding: 5,
    paddingLeft: 12,
    marginTop: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
  }
});
