import 'react-native-gesture-handler';
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
  Vibration,
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
        android_ripple={{color: '#191919'}}
      >
        <Text style={styles.generalText}>-</Text>
      </Pressable>

      <Text style={styles.criteriaText}>
        {title}: {value}
      </Text>

      <Pressable
        style={[styles.criteriaButton, { backgroundColor: "#00ab30", width: '12%', alignItems: 'center' }]}
        onPress={increment}
        android_ripple={{color: '#191919'}}
      >
        <Text style={styles.generalText}>+</Text>
      </Pressable>
    </View>
  );
};

// >>> SCREENS <<<
// >>> --> STANDS SCREEN <<<

function StandsScreen({ navigation }) {
  const [teamNumber, setTeamNumber] = useState(0);
  const [matchNumber, setMatchNumber] = useState(0);
  const [playoffs, setPlayoffs] = useState(false);
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
          placeholder="8257"
          onChangeText={setTeamNumber}
          style={{ marginTop: "6%" }}
          keyboardType="numeric"
          maxLength={4}
        />
        <ShortTextInput
          label="Match Number"
          placeholder="24"
          onChangeText={setMatchNumber}
          style={{ marginTop: "6%" }}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <Pressable
        style={[
          styles.headerResetButton, styles.criteriaContainer,
          {
            backgroundColor: playoffs ? "#007d23" : "#7d0000",
          },
        ]}
        onPress={() => setPlayoffs(!playoffs)}
        android_ripple={{color: '#232323'}}
      >
        <Text style={styles.generalText}>
          Playoffs Game
        </Text>
      </Pressable>

      <IncrementDecrementButton
        title="Auto Amp"
        value={autoAmp}
        decrement={() => {
          if (autoAmp > 0) {
            setAutoAmp((prev) => prev - 1)
          }
        }}
        increment={() => setAutoAmp((prev) => prev + 1)}
        onPress={Vibration.vibrate(70)} // I have no clue how this manages to call for every other button on the screen, even the playoffs button that's defined in completely different function/component
      />

      <IncrementDecrementButton
        title="Auto Speaker"
        value={autoSpeaker}
        decrement={() => {
          if (autoSpeaker > 0) {
            setAutoSpeaker((prev) => prev - 1)
          }
        }}
        increment={() => setAutoSpeaker((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Tele Amp"
        value={teleAmp}
        decrement={() => {
          if (teleAmp > 0) {
            setTeleAmp((prev) => prev - 1)
          }
        }}
        increment={() => setTeleAmp((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Amped Tele Speaker"
        value={ampedTeleSpeaker}
        decrement={() => {
          if (ampedTeleSpeaker > 0) {
            setAmpedTeleSpeaker((prev) => prev - 1)
          }
        }}
        increment={() => setAmpedTeleSpeaker((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Tele Speaker"
        value={teleSpeaker}
        decrement={() => {
          if (teleSpeaker > 0) {
            setTeleSpeaker((prev) => prev - 1)
          }
        }}
        increment={() => setTeleSpeaker((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Fum Amp"
        value={fumAmp}
        decrement={() => {
          if (fumAmp > 0) {
            setFumAmp((prev) => prev - 1)
          }
        }}
        increment={() => setFumAmp((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Fum Speaker"
        value={fumSpeaker}
        decrement={() => {
          if (fumSpeaker > 0) {
            setFumSpeaker((prev) => prev - 1)
          }
        }}
        increment={() => setFumSpeaker((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Penalties"
        value={penalties}
        decrement={() => {
          if (penalties > 0) {
            setPenalties((prev) => prev - 1)
          }
        }}
        increment={() => setPenalties((prev) => prev + 1)}
      />

      <IncrementDecrementButton
        title="Technical Penalties"
        value={techPenalties}
        decrement={() => {
          if (techPenalties > 0) {
            setTechPenalties((prev) => prev - 1)
          }
        }}
        increment={() => setTechPenalties((prev) => prev + 1)}
      />

      <View style={styles.criteriaContainer}>
        <View style={[styles.criteriaHorzContainer, {justifyContent: 'space-between'}]}>
          <Pressable
          style={{
            backgroundColor: scoredTrap ? "#007d23" : "#7d0000",
            padding: 10,
            width: '40%',
            alignItems: 'center',
            borderRadius: 15
          }}
          android_ripple={{color: '#232323'}}
          onPress={() => setScoredTrap(!scoredTrap)}
          >
            <Text style={styles.generalText}>Trap</Text>
          </Pressable>
          <Pressable
          style={{
            backgroundColor: spotlight ? "#007d23" : "#7d0000",
            padding: 10,
            width: '40%',
            alignItems: 'center',
            borderRadius: 15
          }}
          android_ripple={{color: '#232323'}}
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
        options={["Speaker", "Amp", "Both", "Neither", "Other"]}
        selectedOption={scoringPreference}
        setSelectedOption={setScoringPreference}
      />
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Comments</Text>
        <TextInput
          style={styles.criteriaTextInput}
          placeholder={"Bot broke down for some seconds."}
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
        style={[styles.criteriaButton2, { marginBottom: "10%", marginTop: "3%" }]}
        onPress={
          // DO NOT CHANGE FORMATTING, THIS IS A STRING LITERAL
          () => {setQRData(`\{scouterName: "${userName}"\}, \{scouterTeam: "${userTeamNumber}"\}, \{compName: "${competition}"\}, \{teamNum: "${teamNumber}"\}, \{matchNum: "${matchNumber}"\}, \{isPlayoffs: "${playoffs}"\}, \{autonAmp: "${autoAmp}"\}, \{autonSpeaker: "${autoSpeaker}"\}, \{teleAmp: "${teleAmp}"\}, \{teleAmpedSpeaker: "${ampedTeleSpeaker}"\}, \{teleSpeaker: "${teleSpeaker}"\}, \{fumbledAmp: "${fumAmp}"\}, \{fumbledSpeaker: "${fumSpeaker}"\}, \{penalties: "${penalties}"\}, \{techPenalties: "${techPenalties}"\}, \{scoredTrap: "${scoredTrap}"\}, \{"spotlight: "${spotlight}"\}, \{driverSkill: "${driverSkill}"\}, \{strategyDesc: "${strategyDetails}"\}, \{scoringDesc: "${scoringDetails}"\}, \{scoringPreference: "${scoringPreference}"\}, \{comments: "${comments}"\}`); Vibration.vibrate(100)}
        }
        android_ripple={{color: '#007d23'}}
      >
        <Text>Generate QR</Text>
      </Pressable>

      <StatusBar barStyle="light-content" />
    </ScrollView>
  );
}

// >>> --> PITS SCREEN <<<

function PitsScreen({ navigation }) {
  const [teamNumber, setTeamNumber] = useState(0)
  const [drivetrain, setDrivetrain] = useState("Other")
  const [centerOfGravity, setCenterOfGravity] = useState("Middle") 
  const [length, setLength] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [intakeMech, setIntakeMech] = useState("")
  const [scoringMech, setScoringMech] = useState("")
  const [scoringPreference, setScoringPreference] = useState("Speaker")
  const [canFitUnderStage, setCanFitUnderStage] = useState(false)
  const [canBuddyClimb, setCanBuddyClimb] = useState(false)
  const [comments, setComments] = useState("")
  const [QRData, setQRData] = useState("EMPTY QR")

  const { userName, userTeamNumber, competition } = useContext(MyContext);

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <ShortTextInput
        label="Team Number"
        placeholder="3161"
        onChangeText={setTeamNumber}
        style={{ marginTop: "6%" }}
        keyboardType="numeric"
        maxLength={4}
      />

      <DropdownInput
        label="Drivetrain"
        options={["Swerve", "Tank", "Other"]} // DEFAULT VALUE MUST BE OTHER OTHERWISE DROPDOWN REQUIRES EMPTY DEFAULT
        selectedOption={drivetrain}
        setSelectedOption={setDrivetrain}
      />

      <DropdownInput
        label="Center of Gravity"
        options={["Very High", "High", "Middle", "Low", "Very low"]} // DEFAULT VALUE MUST BE MIDDLE OTHERWISE DROPDOWN REQUIRES EMPTY DEFAULT
        selectedOption={centerOfGravity}
        setSelectedOption={setCenterOfGravity}
      />

      <ShortTextInput
        label="Length"
        placeholder="30 (in inches)"
        onChangeText={setLength}
        keyboardType="numeric"
        maxLength={3}
      />
      
      <ShortTextInput
        label="Width"
        placeholder="40 (in inches)"
        onChangeText={setWidth}
        keyboardType="numeric"
        maxLength={3}
      />
      
      <ShortTextInput
        label="Height"
        placeholder="120 (in inches)"
        onChangeText={setHeight}
        keyboardType="numeric"
        maxLength={3}
      />

      <ShortTextInput
        label="Intake Mechanism"
        placeholder="Rollers."
        onChangeText={setIntakeMech}
      />

      <ShortTextInput
        label="Scoring Mechanism"
        placeholder="Shooter."
        onChangeText={setScoringMech}
      />

      <DropdownInput
        label="Scoring Preference"
        options={["Speaker", "Amp", "Both", "Neither", "Other"]}
        selectedOption={scoringPreference}
        setSelectedOption={setScoringPreference}
      />

      <View style={styles.criteriaContainer}>
        <View style={styles.criteriaHorzContainer}>
          <Pressable
          style={{
            backgroundColor: canFitUnderStage ? "#007d23" : "#7d0000",
            padding: 10,
            width: '45%',
            alignItems: 'center',
            borderRadius: 15
          }}
          onPress={() => {setCanFitUnderStage(!canFitUnderStage); Vibration.vibrate(70)}}
          android_ripple={{color: '#232323'}}
          >
            <Text style={styles.generalText}>Fits Under Stage</Text>
          </Pressable>
          <Pressable
          style={{
            backgroundColor: canBuddyClimb ? "#007d23" : "#7d0000",
            padding: 10,
            width: '45%',
            alignItems: 'center',
            borderRadius: 15
          }}
          onPress={() => {setCanBuddyClimb(!canBuddyClimb); Vibration.vibrate(70)}}
          android_ripple={{color: '#232323'}}
          >
            <Text style={styles.generalText}>Can Buddy Climb</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Comments</Text>
        <TextInput
          style={styles.criteriaTextInput}
          placeholder={"Bot has battery issues."}
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
          // DO NOT CHANGE FORMATTING, THIS IS A STRING LITERAL
          () => {setQRData(`\{scouterName: "${userName}"\}, \{scouterTeam: "${userTeamNumber}"\}, \{compName: "${competition}"\}, \{teamNum: "${teamNumber}"\}, \{driveTrain: "${drivetrain}"\}, \{centerOfGravity: "${centerOfGravity}"\}, \{length: "${length}"\}, \{width: "${width}"\}, \{height: "${height}"\}, \{intakeMechanism: "${intakeMech}"\}, \{scoringMech: "${scoringMech}"\}, \{scoringPreference: "${scoringPreference}"\}, \{canFitUnderStage: "${canFitUnderStage}"\}, \{canBuddyClimb: "${canBuddyClimb}"\}, \{comments: "${comments}"\}`); Vibration.vibrate(100)}
        }
        android_ripple={{color: '#007d23'}}
      >
        <Text>Generate QR</Text>
      </Pressable>

      <StatusBar barStyle="light-content" />
    </ScrollView>
  );
}

// >>> --> SETTINGS SCREEN <<<

function SettingsScreen({ navigation }) {
  const { userName, userTeamNumber, competition, updateParams } = useContext(MyContext);

  const [newParam1, setNewParam1] = useState("");
  const [newParam2, setNewParam2] = useState(0);
  const [newParam3, setNewParam3] = useState("");
  const [newParam4, setNewParam4] = useState(false);

  const updateParamsWithTextInput = () => {
    updateParams({
      userName: newParam1 || userName,
      userTeamNumber: newParam2 || userTeamNumber,
      competition: newParam3 || competition,
    });
    navigation.navigate("homeScreen");
    Vibration.vibrate(100);
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
        android_ripple={{color: '#007d23'}}
      >
        <Text>Save Settings</Text>
      </Pressable>

      <StatusBar barStyle="light-content" />
    </ScrollView>
  );
}

// >>> NAVIGATION <<<

function HomeScreen({ navigation }) {
  const { userTeamNumber, competition } = useContext(MyContext);

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
          android_ripple={{color: '#000'}}
        >
          <Text style={styles.homeNavigationButtonText}>Stands</Text>
        </Pressable>

        <Pressable
          style={[styles.homeNavigationButton, { backgroundColor: "#5bc0eb" }]}
          onPress={() => {navigation.navigate("pitsScreen"); Vibration.vibrate(100);}}
          android_ripple={{color: '#000'}}
        >
          <Text style={styles.homeNavigationButtonText}>Pits</Text>
        </Pressable>

        <Pressable
          style={[styles.homeNavigationButton, { backgroundColor: "#959595" }]}
          onPress={() => {navigation.navigate("settingsScreen"); Vibration.vibrate(100)}}
          android_ripple={{color: '#000'}}
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
    userName: "Satoshi Nakamoto",
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
        <Stack.Navigator initialRouteName="homeScreen">
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
    backgroundColor: "#959595",
    minHeight: '2%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
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
