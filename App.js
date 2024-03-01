import React, { createContext, useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// >>> TABLE OF CONTENTS <<<
// COMPONENTS
// SCREENS
// --> STANDS SCREEN
// --> PITS SCREEN
// --> SETTINGS SCREEN
// NAVIGATION
// STYLES

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

// >>> SCREENS <<<
// >>> --> STANDS SCREEN <<<

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
  
  const { userTeamNumber, competition, updateParams } = useContext(MyContext);

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
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

      <Pressable style={[styles.criteriaButton2, {marginBottom: '5%'}]} onPress={() => console.log({userTeamNumber}, {competition})}>
        <Text>Generate QR</Text>
      </Pressable>

    </ScrollView>
  );
}

// >>> --> PITS SCREEN <<<

function PitsScreen() {
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
    <ScrollView style={styles.scoutingScreenContainer}>
      <View>
          <ShortTextInput 
            label='Team Number'
            placeholder='4308'
            onChangeText={setTeamNumber}
            keyboardType='numeric'
            maxLength={4}
          />

        <Pressable style={[styles.criteriaButton2, {marginTop: '5%'}]}>
          <Text>Generate QR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// >>> --> SETTINGS SCREEN <<<

function SettingsScreen({ navigation }) {
  const { userTeamNumber, competition, updateParams } = useContext(MyContext);

  const [newParam1, setNewParam1] = useState('');
  const [newParam2, setNewParam2] = useState('');

  const updateParamsWithTextInput = () => {
    if (newParam1 !== '') {
      updateParams({ userTeamNumber: newParam1, competition });
    }
    if (newParam2 !== '') {
      updateParams({ userTeamNumber, competition: newParam2 });
    }
    navigation.navigate('homeScreen')
  };

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <ShortTextInput
        label='Scouter Name'
        placeholder='Benjamin "100" Lu'
      />
      <ShortTextInput
        label='Scouter Team'
        placeholder='4308'
        keyboardType='numeric'
        onChangeText={setNewParam1}
        value={newParam1}
        maxLength={4}
      />
      <ShortTextInput
        label='Competition'
        placeholder='Humber College'
        onChangeText={setNewParam2}
        value={newParam2}
      />
      <Pressable style={[styles.criteriaButton2, {marginTop: '5%'}]} onPress={updateParamsWithTextInput}>
        <Text>Save Settings</Text>
      </Pressable>
    </ScrollView>
  );
}

// >>> NAVIGATION <<<

function HomeScreen({ navigation }) {
  const { userTeamNumber, competition, updateParams } = useContext(MyContext);

  return (
    <View style={styles.homeContainer}>
      <Image style={styles.homeCrescendoImage} source={require('./assets/images/crescendo.png')} />
      
      <View style={[styles.generalText, styles.homeTitleText]}>
        <Text style={[styles.generalText, { fontSize: 55, fontWeight: 'bold' }]}>{userTeamNumber}</Text>
        <Text style={[styles.generalText, { fontSize: 30 }]}>{competition}</Text>
      </View>

      <View style={styles.homeNavigationButtonContainer}>
        <Pressable style={[styles.homeNavigationButton, {backgroundColor: '#c3423f'}]} onPress={() => navigation.navigate('standsScreen')}>
          <Text style={styles.homeNavigationButtonText}>Stands</Text>
        </Pressable>

        <Pressable style={[styles.homeNavigationButton, {backgroundColor: '#5bc0eb'}]} onPress={() => navigation.navigate('pitsScreen')}>
          <Text style={styles.homeNavigationButtonText}>Pits</Text>
        </Pressable>

        <Pressable style={[styles.homeNavigationButton, {backgroundColor: '#959595'}]} onPress={() => navigation.navigate('settingsScreen')}>
          <Text style={styles.homeNavigationButtonText}>Settings</Text>
        </Pressable>
      </View>

      <StatusBar barStyle='light-content' />
    </View>
  );
}

const Stack = createStackNavigator();
const MyContext = createContext();

export default function App() {
  const [params, setParams] = useState({ userTeamNumber: '9999', competition: 'Woodlands Asylum' });
  const [playoffs, setPlayoffs] = useState(false)

  const updateParams = (newParams) => {
    setParams({ ...params, ...newParams });
  };

  return (
    <NavigationContainer>
      <MyContext.Provider value={{ ...params, updateParams }}>
        <Stack.Navigator initialRouteName="settingsScreen">
          <Stack.Screen name="homeScreen" component={HomeScreen} options={{title: 'Home', headerShown: false}} />
          <Stack.Screen name="standsScreen" component={StandsScreen} options={{
            title: 'Stands',
            headerRight: () => (
              <Pressable
              style={[
                styles.headerResetButton,
                {
                  backgroundColor: playoffs ? '#007d23' : '#7d0000',
                },
              ]}
              onPress={() => setPlayoffs(!playoffs)}>
                <Text style={[styles.generalText, { color: '#fff' }]}>Playoffs</Text>
              </Pressable>
            ),
            
            headerStyle: {
              backgroundColor: '#191919',
              borderBottomColor: '#fff',
              borderWidth: 1,
            },
            
            headerTintColor: '#fff',
          }} />
          <Stack.Screen name="pitsScreen" component={PitsScreen} options={{
            title: 'Pits',
            
            headerStyle: {
              backgroundColor: '#191919',
              borderBottomColor: '#fff',
              borderWidth: 1,
            },
            
            headerTintColor: '#fff',
          }} />
          <Stack.Screen name="settingsScreen" component={SettingsScreen} options={{
            title: 'Settings',
            
            headerStyle: {
              backgroundColor: '#191919',
              borderBottomColor: '#fff',
              borderWidth: 1,
            },
            
            headerTintColor: '#fff',
          }} />
        </Stack.Navigator>
      </MyContext.Provider>
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
    flex: 3,
    top: 30,
    width: '80%',
    objectFit: 'contain',
  },
  
  homeNavigationButtonContainer: {
    flex: 3,
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
  
  scoutingScreenContainer: {
    flex: 1,
    backgroundColor: '#191919',
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

  homeTitleText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
  },

  criteriaButton2: {
    backgroundColor: '#fff',
    padding: '3%',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  }
});
