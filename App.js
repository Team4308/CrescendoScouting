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
      <View style={styles.criteriaHorzContainer}>
        <View style={styles.criteriaContainer}>
          <Text style={[styles.criteriaText, {marginTop: '6%'}]}>Team Number</Text>
          <TextInput
            style={styles.criteriaTeamNumberInput}
            placeholder='4308'
            placeholderTextColor='#959595'
            keyboardType='numeric'
            maxLength={4}
          />
        </View>
        <View style={styles.criteriaContainer}>
          <Text style={[styles.criteriaText, {marginTop: '6%'}]}>Match Number</Text>
          <TextInput
            style={styles.criteriaMatchNumberInput}
            placeholder='69'
            placeholderTextColor='#959595'
            keyboardType='numeric'
            maxLength={2}
          />
        </View>
      </View>
      
      <View style={styles.criteriaContainer}>
        <Pressable>

        </Pressable>

        <Text style={styles.criteriaText}>Tele Speaker</Text>

        <Pressable>
          
        </Pressable>        
      </View>
      
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Driver Skill</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Scoring Preference</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Strategy</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Scoring</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Penalties</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Comments</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Auto Speaker</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Auto Amp</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Tele Amp</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Fumbled Speaker</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
        />
      </View>
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Fumbled Amp</Text>
        <TextInput
          style={styles.criteriaMatchNumberInput}
          placeholder='Yes'
          placeholderTextColor='#959595'
          maxLength={2}
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
              <Text style={[styles.headerResetButtonText, {color: '#fff'}]}>Playoffs</Text>
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
    width: '50%',
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
    marginHorizontal: 20,
    marginVertical: 10,
  },

  criteriaText: {
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
  },

  criteriaMatchNumberInput: {
    padding: 5,
    paddingLeft: 12,
    marginTop: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
  },

  criteriaHorzContainer: {
    flexDirection: 'row',
  },
});
