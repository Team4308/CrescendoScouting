import { View, StyleSheet, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

// >>> COMPONENTS <<<

const ShortTextInput = ({ label, placeholder, onChangeText, style, keyboardType, maxLength }) => (
  <View style={styles.criteriaContainer}>
    <Text style={styles.criteriaText}>{label}</Text>
    <TextInput
      style={[styles.criteriaTextInput, style]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor='#959595'
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  </View>
);

const IncrementDecrementButton = ({ title, value, increment, decrement, absolute}) => {
  return (
    <View style={[styles.criteriaContainer, styles.criteriaHorzContainer]}>
      <Pressable style={[styles.criteriaButton, { backgroundColor: '#ad0000' }]} onPress={decrement}>
        <Text style={styles.generalText}>-{absolute}</Text>
      </Pressable>

      <Text style={styles.criteriaText}>{title}: {value}</Text>

      <Pressable style={[styles.criteriaButton, { backgroundColor: '#00ab30' }]} onPress={increment}>
        <Text style={styles.generalText}>+{absolute}</Text>
      </Pressable>
    </View>
  );
};

// >>> STANDS SCREEN <<<

function StandsScreen() {
  const [teamNumber, setTeamNumber] = useState('');
  const [matchNumber, setMatchNumber] = useState('');
  const [autoAmp, setAutoAmp] = useState(0);
  const [autoSpeaker, setAutoSpeaker] = useState(0);
  const [teleAmp, setTeleAmp] = useState(0);
  const [teleSpeaker, setTeleSpeaker] = useState(0);
  const [fumAmp, setFumAmp] = useState(0);
  const [fumSpeaker, setFumSpeaker] = useState(0);
  const [penalties, setPenalties] = useState(0);
  const [driverSkill, setDriverSkill] = useState('');
  const [strategyDetails, setStrategyDetails] = useState('');
  const [scoringDetails, setScoringDetails] = useState('');
  const [comments, setComments] = useState('');


  return (
    <ScrollView style={styles.standsScoutingContainer}>
      <View style={styles.criteriaHorzContainer}>
        <ShortTextInput 
          label='Team Number'
          placeholder='4308'
          onChangeText={setTeamNumber}
          style={{marginTop: '6%'}}
          keyboardType='numeric'
          maxLength={4}
        />
        <ShortTextInput 
          label='Match Number'
          placeholder='69'
          onChangeText={setMatchNumber}
          style={{marginTop: '6%'}}
          keyboardType='numeric'
          maxLength={2}
        />
      </View>

      <IncrementDecrementButton
        title="Auto Amp"
        value={autoAmp}
        decrement={() => setAutoAmp(prev => prev - 2)}
        increment={() => setAutoAmp(prev => prev + 2)}
        absolute={2}
      />

      <IncrementDecrementButton
        title="Auto Speaker"
        value={autoSpeaker}
        decrement={() => setAutoSpeaker(prev => prev - 5)}
        increment={() => setAutoSpeaker(prev => prev + 5)}
        absolute={5}
      />

      <IncrementDecrementButton
        title="Tele Amp"
        value={teleAmp}
        decrement={() => setTeleAmp(prev => prev - 1)}
        increment={() => setTeleAmp(prev => prev + 1)}
        absolute={1}
      />
      
      <View style={[styles.criteriaContainer, styles.criteriaHorzContainer]}>
        <Pressable style={[styles.criteriaButton, {backgroundColor: '#ad0000'}]} onPress={() => setTeleSpeaker(prev => prev - 5)}>
          <Text style={styles.generalText}>-5</Text>
        </Pressable>
        <Pressable style={[styles.criteriaButton, {backgroundColor: '#7d0000'}]} onPress={() => setTeleSpeaker(prev => prev - 2)}>
          <Text style={styles.generalText}>-2</Text>
        </Pressable>

        <Text style={styles.criteriaText}>Tele Speaker: {teleSpeaker}</Text>

        <Pressable style={[styles.criteriaButton, {backgroundColor: '#007d23'}]} onPress={() => setTeleSpeaker(prev => prev + 2)}>
          <Text style={styles.generalText}>+2</Text>
        </Pressable>
        <Pressable style={[styles.criteriaButton, {backgroundColor: '#00ab30'}]} onPress={() => setTeleSpeaker(prev => prev + 5)}>
          <Text style={styles.generalText}>+5</Text>
        </Pressable>        
      </View>

      <IncrementDecrementButton
        title="Fum Amp"
        value={fumAmp}
        decrement={() => setFumAmp(prev => prev - 1)}
        increment={() => setFumAmp(prev => prev + 1)}
        absolute={1}
      />

      <IncrementDecrementButton
        title="Fum Speaker"
        value={fumSpeaker}
        decrement={() => setFumSpeaker(prev => prev - 1)}
        increment={() => setFumSpeaker(prev => prev + 1)}
        absolute={1}
      />

      <View style={[styles.criteriaContainer, styles.criteriaHorzContainer]}>
        <Pressable style={[styles.criteriaButton, {backgroundColor: '#ad0000'}]} onPress={() => setPenalties(prev => prev - 5)}>
          <Text style={styles.generalText}>-5</Text>
        </Pressable>
        <Pressable style={[styles.criteriaButton, {backgroundColor: '#7d0000'}]} onPress={() => setPenalties(prev => prev - 2)}>
          <Text style={styles.generalText}>-2</Text>
        </Pressable>

        <Text style={styles.criteriaText}>Penalties: {penalties}</Text>

        <Pressable style={[styles.criteriaButton, {backgroundColor: '#007d23'}]} onPress={() => setPenalties(prev => prev + 2)}>
          <Text style={styles.generalText}>+2</Text>
        </Pressable>
        <Pressable style={[styles.criteriaButton, {backgroundColor: '#00ab30'}]} onPress={() => setPenalties(prev => prev + 5)}>
          <Text style={styles.generalText}>+5</Text>
        </Pressable>        
      </View>

      <ShortTextInput
        label="Driver Skill"
        placeholder="Very good."
        onChangeText={setDriverSkill}
      />
      <ShortTextInput
        label="Strategy Details"
        placeholder="Offensive."
        onChangeText={setStrategyDetails}
      />
      <ShortTextInput
        label="Scoring Details"
        placeholder="Likes to amp."
        onChangeText={setScoringDetails}
      />
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Comments</Text>
        <TextInput
          style={[styles.criteriaTextInput, {marginBottom: '5%'}]}
          placeholder={'N/A.'}
          onChangeText={setComments}
          placeholderTextColor='#959595'
          multiline={true}
          numberOfLines={4}
          textAlignVertical='top'
        />
      </View>


    </ScrollView>
  );
}

// >>> PITS SCREEN <<<

function PitsScreen() {
  return (
    <View style={styles.standsScoutingContainer}>
      <Text>You are on the second screen.</Text>
    </View>
  );
}

// >>> NAVIGATION <<<

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
              <Text style={[styles.generalText, {color: '#fff'}]}>Playoffs</Text>
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

// >>> STYLES <<<

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

  generalText: {
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

  criteriaTextInput: {
    padding: 5,
    paddingLeft: 12,
    marginTop: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
  },

  criteriaHorzContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  criteriaButton: {
    backgroundColor: '#fff',
    padding: '3%',
    borderRadius: 10,
  },
});
