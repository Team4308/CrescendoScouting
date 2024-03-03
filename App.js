import React, { createContext, useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import QRCode from 'react-native-qrcode-svg';

// >>> TABLE OF CONTENTS <<<
// COMPONENTS
// SCREENS
// --> STANDS SCREEN
// --> PITS SCREEN
// --> SETTINGS SCREEN
// NAVIGATION
// STYLES

// >>> COMPONENTS <<<

const ShortTextInput = ({
  label,
  placeholder,
  onChangeText,
  keyboardType,
  maxLength,
}) => (
  <View style={styles.criteriaContainer}>
    <Text style={styles.criteriaText}>{label}</Text>
    <TextInput
      style={styles.criteriaTextInput}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor="#959595"
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  </View>
);

const DropdownInput = ({
  label,
  options,
  selectedOption,
  setSelectedOption,
}) => (
  <View style={styles.criteriaContainer}>
    <Text style={styles.criteriaText}>{label}</Text>
    <View style={{
      borderWidth: 1,
      borderColor: '#fff',
      marginTop: 10,
      color: "#fff",
    }}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
        style={{color: '#fff'}}
        dropdownIconColor={'#fff'}
      >
        {options.map((option, index) => (
          <Picker.Item
            key={index}
            label={option}
            value={option}
          />
        ))}
      </Picker>
    </View>
  </View>
);

const IncrementDecrementButton = ({
  title,
  value,
  increment,
  decrement,
}) => {
  return (
    <View style={[styles.criteriaContainer, styles.criteriaHorzContainer]}>
      <Pressable
        style={[styles.criteriaButton, { backgroundColor: "#ad0000", width: '12%', alignItems: 'center'}]}
        onPress={decrement}
      >
        <Text style={styles.generalText}>-</Text>
      </Pressable>

      <Text style={styles.criteriaText}>
        {title}: {value}
      </Text>

      <Pressable
        style={[styles.criteriaButton, { backgroundColor: "#00ab30", width: '12%', alignItems: 'center' }]}
        onPress={increment}
      >
        <Text style={styles.generalText}>+</Text>
      </Pressable>
    </View>
  );
};

// >>> SCREENS <<<
// >>> --> STANDS SCREEN <<<

function StandsScreen() {
  const [teamNumber, setTeamNumber] = useState(0);
  const [matchNumber, setMatchNumber] = useState("");
  const [autoAmp, setAutoAmp] = useState(0);
  const [autoSpeaker, setAutoSpeaker] = useState(0);
  const [teleAmp, setTeleAmp] = useState(0);
  const [teleSpeaker, setTeleSpeaker] = useState(0);
  const [ampedTeleSpeaker, setAmpedTeleSpeaker] = useState(0);
  const [fumAmp, setFumAmp] = useState(0);
  const [fumSpeaker, setFumSpeaker] = useState(0);
  const [penalties, setPenalties] = useState(0);
  const [techPenalties, setTechPenalties] = useState(0);
  const [driverSkill, setDriverSkill] = useState("");
  const [strategyDetails, setStrategyDetails] = useState("");
  const [scoringDetails, setScoringDetails] = useState("");
  const [comments, setComments] = useState("");
  const [scoringPreference, setScoringPreference] = useState("Speaker") // DEFAULT VALUE MUST BE SPEAKER OTHERWISE DROPDOWN REQUIRES EMPTY DEFAULT
  const [scoredTrap, setScoredTrap] = useState(false)
  const [spotlight, setSpotlight] = useState(false)
  const [QRData, setQRData] = useState("EMPTY QR")

  const { userName, userTeamNumber, competition } = useContext(MyContext);

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <View style={styles.criteriaHorzContainer}>
        <ShortTextInput
          label="Team Number"
          placeholder="4308"
          onChangeText={setTeamNumber}
          style={{ marginTop: "6%" }}
          keyboardType="numeric"
          maxLength={4}
        />
        <ShortTextInput
          label="Match Number"
          placeholder="69"
          onChangeText={setMatchNumber}
          style={{ marginTop: "6%" }}
          keyboardType="numeric"
          maxLength={2}
        />
      </View>

      <IncrementDecrementButton
        title="Auto Amp"
        value={autoAmp}
        decrement={() => setAutoAmp((prev) => prev - 1)}
        increment={() => setAutoAmp((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Auto Speaker"
        value={autoSpeaker}
        decrement={() => setAutoSpeaker((prev) => prev - 1)}
        increment={() => setAutoSpeaker((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Tele Amp"
        value={teleAmp}
        decrement={() => setTeleAmp((prev) => prev - 1)}
        increment={() => setTeleAmp((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Amped Tele Speaker"
        value={ampedTeleSpeaker}
        decrement={() => setAmpedTeleSpeaker((prev) => prev - 1)}
        increment={() => setAmpedTeleSpeaker((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Tele Speaker"
        value={teleSpeaker}
        decrement={() => setTeleSpeaker((prev) => prev - 1)}
        increment={() => setTeleSpeaker((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Fum Amp"
        value={fumAmp}
        decrement={() => setFumAmp((prev) => prev - 1)}
        increment={() => setFumAmp((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Fum Speaker"
        value={fumSpeaker}
        decrement={() => setFumSpeaker((prev) => prev - 1)}
        increment={() => setFumSpeaker((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Penalties"
        value={penalties}
        decrement={() => setPenalties((prev) => prev - 1)}
        increment={() => setPenalties((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Technical Penalties"
        value={techPenalties}
        decrement={() => setTechPenalties((prev) => prev - 1)}
        increment={() => setTechPenalties((prev) => prev + 1)}
      />

      <View style={styles.criteriaContainer}>
        <View style={[styles.criteriaHorzContainer, {justifyContent: 'space-around'}]}>
          <Pressable
          style={{
            backgroundColor: scoredTrap ? "#007d23" : "#7d0000",
            padding: 10,
            width: '30%',
            alignItems: 'center',
            borderRadius: 15
          }}
          onPress={() => setScoredTrap(!scoredTrap)}
          >
            <Text style={styles.generalText}>Trap</Text>
          </Pressable>
          <Pressable
          style={{
            backgroundColor: spotlight ? "#007d23" : "#7d0000",
            padding: 10,
            width: '30%',
            alignItems: 'center',
            borderRadius: 15
          }}
          onPress={() => setSpotlight(!spotlight)}
          >
            <Text style={styles.generalText}>Spotlight</Text>
          </Pressable>
        </View>
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
        placeholder="Moves close to speaker."
        onChangeText={setScoringDetails}
      />
      <DropdownInput
        label="Scoring Preference"
        options={["Speaker", "Amp"]}
        selectedOption={scoringPreference}
        setSelectedOption={setScoringPreference}
      />
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Comments</Text>
        <TextInput
          style={styles.criteriaTextInput}
          placeholder={"I love 4308!"}
          onChangeText={setComments}
          placeholderTextColor="#959595"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={[styles.criteriaContainer, {alignItems: 'center', backgroundColor: '#fff', padding: 20}]}>
          <QRCode value={QRData} size={300} />
      </View>

      <Pressable
        style={[styles.criteriaButton2, { marginBottom: "5%", marginTop: "3%" }]}
        onPress={
          () => setQRData(`
            ${teamNumber},
            ${matchNumber},
            ${autoAmp},
            ${autoSpeaker},
            ${teleSpeaker},
            ${ampedTeleSpeaker},
            ${teleSpeaker},
            ${fumAmp},
            ${fumSpeaker},
            ${penalties},
            ${techPenalties},
            ${scoredTrap},
            ${spotlight},
            ${driverSkill},
            ${strategyDetails},
            ${scoringDetails},
            ${scoringPreference},
            ${comments}
          `)
        }
      >
        <Text>Generate QR</Text>
      </Pressable>
    </ScrollView>
  );
}

// >>> --> PITS SCREEN <<<

function PitsScreen() {
  const [teamNumber, setTeamNumber] = useState("");
  const [matchNumber, setMatchNumber] = useState("");
  const [autoAmp, setAutoAmp] = useState(0);
  const [autoSpeaker, setAutoSpeaker] = useState(0);
  const [teleAmp, setTeleAmp] = useState(0);
  const [teleSpeaker, setTeleSpeaker] = useState(0);
  const [fumAmp, setFumAmp] = useState(0);
  const [fumSpeaker, setFumSpeaker] = useState(0);
  const [penalties, setPenalties] = useState(0);
  const [driverSkill, setDriverSkill] = useState("");
  const [strategyDetails, setStrategyDetails] = useState("");
  const [scoringDetails, setScoringDetails] = useState("");
  const [comments, setComments] = useState("");

  const { userName, userTeamNumber, competition } = useContext(MyContext);

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <View>
        <ShortTextInput
          label="Team Number"
          placeholder="4308"
          onChangeText={setTeamNumber}
          keyboardType="numeric"
          maxLength={4}
        />

        <Pressable
          style={[styles.criteriaButton2, { marginTop: "5%" }]}
          onPress={() => console.log({ userTeamNumber }, { competition })}
        >
          <Text>Generate QR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// >>> --> SETTINGS SCREEN <<<

function SettingsScreen({ navigation }) {
  const { userName, userTeamNumber, competition, updateParams } = useContext(MyContext);

  const [newParam1, setNewParam1] = useState("");
  const [newParam2, setNewParam2] = useState(0);
  const [newParam3, setNewParam3] = useState("");

  const updateParamsWithTextInput = () => {
    console.log(newParam1, newParam2, newParam3);
    updateParams({
      userName: newParam1 || userName,
      userTeamNumber: newParam2 || userTeamNumber,
      competition: newParam3 || competition,
    });
    navigation.navigate("homeScreen");
  };

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <ShortTextInput
        label="Scouter Name"
        placeholder="Benjamin Lu"
        onChangeText={setNewParam1}
        value={newParam1}
      />
      <ShortTextInput
        label="Scouter Team"
        placeholder="4308"
        keyboardType="numeric"
        onChangeText={setNewParam2}
        value={newParam2}
        maxLength={4}
      />
      <DropdownInput
        label="Competition"
        options={["Humber College", "Centennial College", "McMaster University", "Provincial Championship"]}
        selectedOption={newParam3}
        setSelectedOption={setNewParam3}
      />
      <Pressable
        style={[styles.criteriaButton2, { marginTop: "5%" }]}
        onPress={updateParamsWithTextInput}
      >
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
      <Image
        style={styles.homeCrescendoImage}
        source={require("./assets/images/crescendo.png")}
      />

      <View style={[styles.generalText, styles.homeTitleText]}>
        <Text
          style={[styles.generalText, { fontSize: 55, fontWeight: "bold" }]}
        >
          {userTeamNumber}
        </Text>
        <Text style={[styles.generalText, { fontSize: 30 }]}>
          {competition}
        </Text>
      </View>

      <View style={styles.homeNavigationButtonContainer}>
        <Pressable
          style={[styles.homeNavigationButton, { backgroundColor: "#c3423f" }]}
          onPress={() => navigation.navigate("standsScreen")}
        >
          <Text style={styles.homeNavigationButtonText}>Stands</Text>
        </Pressable>

        <Pressable
          style={[styles.homeNavigationButton, { backgroundColor: "#5bc0eb" }]}
          onPress={() => navigation.navigate("pitsScreen")}
        >
          <Text style={styles.homeNavigationButtonText}>Pits</Text>
        </Pressable>

        <Pressable
          style={[styles.homeNavigationButton, { backgroundColor: "#959595" }]}
          onPress={() => navigation.navigate("settingsScreen")}
        >
          <Text style={styles.homeNavigationButtonText}>Settings</Text>
        </Pressable>
      </View>

      <StatusBar barStyle="light-content" />
    </View>
  );
}

const Stack = createStackNavigator();
const MyContext = createContext();

export default function App() {
  const [params, setParams] = useState({
    userTeamNumber: "9999",
    competition: "Humber College", // DEFAULT VALUE MUST BE HUMBER COLLEGE OTHERWISE DROPDOWN REQUIRES EMPTY DEFAULT
  });
  const [playoffs, setPlayoffs] = useState(false);

  const updateParams = (newParams) => {
    setParams({ ...params, ...newParams });
  };

  return (
    <NavigationContainer>
      <MyContext.Provider value={{ ...params, updateParams }}>
        <Stack.Navigator initialRouteName="settingsScreen">
          <Stack.Screen
            name="homeScreen"
            component={HomeScreen}
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="standsScreen"
            component={StandsScreen}
            options={{
              title: "Stands",
              headerRight: () => (
                <Pressable
                  style={[
                    styles.headerResetButton,
                    {
                      backgroundColor: playoffs ? "#007d23" : "#7d0000",
                    },
                  ]}
                  onPress={() => setPlayoffs(!playoffs)}
                >
                  <Text style={[styles.generalText, { color: "#fff" }]}>
                    Playoffs
                  </Text>
                </Pressable>
              ),

              headerStyle: {
                backgroundColor: "#191919",
                borderBottomColor: "#fff",
                borderWidth: 1,
              },

              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="pitsScreen"
            component={PitsScreen}
            options={{
              title: "Pits",

              headerStyle: {
                backgroundColor: "#191919",
                borderBottomColor: "#fff",
                borderWidth: 1,
              },

              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="settingsScreen"
            component={SettingsScreen}
            options={{
              title: "Settings",

              headerStyle: {
                backgroundColor: "#191919",
                borderBottomColor: "#fff",
                borderWidth: 1,
              },

              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      </MyContext.Provider>
    </NavigationContainer>
  );
}

// >>> STYLES <<<

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#191919",
  },

  homeCrescendoImage: {
    flex: 3,
    top: 30,
    width: "80%",
    objectFit: "contain",
  },

  homeNavigationButtonContainer: {
    flex: 3,
    width: "80%",
    justifyContent: "space-evenly",
  },

  homeNavigationButton: {
    height: "18%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  homeNavigationButtonText: {
    color: "#fff",
    fontSize: 28,
    textShadowOffset: {
      height: 2,
    },
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowRadius: 5,
  },

  headerResetButton: {
    marginRight: "8%",
    backgroundColor: "#959595",
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  scoutingScreenContainer: {
    flex: 1,
    backgroundColor: "#191919",
  },

  generalText: {
    color: "#fff",
    textShadowOffset: {
      height: 2,
    },
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowRadius: 5,
  },

  criteriaContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  criteriaText: {
    color: "#fff",
    fontSize: 20,
  },

  criteriaTeamNumberInput: {
    padding: 5,
    paddingLeft: 12,
    marginTop: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
  },

  criteriaTextInput: {
    padding: 5,
    paddingLeft: 12,
    marginTop: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
  },

  criteriaHorzContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  criteriaButton: {
    backgroundColor: "#fff",
    padding: "3%",
    borderRadius: 10,
  },

  homeTitleText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },

  criteriaButton2: {
    backgroundColor: "#fff",
    padding: "3%",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
});
