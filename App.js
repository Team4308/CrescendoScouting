import React, { createContext, useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import Touchable from "./components/Touchable"
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  style,
  keyboardType,
  maxLength,
}) => (
  <View style={styles.criteriaContainer}>
    <Text style={styles.criteriaText}>{label}</Text>
    <TextInput
      style={[styles.criteriaTextInput, style]}
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
    <View
      style={{
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10,
        height: 100,
        // centering the picker
        justifyContent: "center",
      }}
    >
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  </View>
);

const ToggleButton = ({ title, value, onPress }) => {
  return (
    <View style={[styles.criteriaContainer]}>
      <Touchable
        style={[
          styles.criteriaButton,
          {
            backgroundColor: value ? "#00ab30" : "#7d0000",
          },
        ]}
        onPress={onPress}
      >
        <Text style={styles.generalText}>{title}</Text>
      </Touchable>
    </View>
  );
};

const IncrementDecrementButton = ({
  title,
  value,
  increment,
  decrement,
  absolute,
}) => {
  return (
    <View style={[styles.criteriaContainer, styles.criteriaHorzContainer]}>
      <Touchable
        style={[styles.criteriaButton, { backgroundColor: "#ad0000" }]}
        onPress={decrement}
      >
        <Text style={styles.generalText}>-{absolute}</Text>
      </Touchable>

      <Text style={styles.criteriaText}>
        {title}: {value}
      </Text>

      <Touchable
        style={[styles.criteriaButton, { backgroundColor: "#00ab30" }]}
        onPress={increment}
      >
        <Text style={styles.generalText}>+{absolute}</Text>
      </Touchable>
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
  const [fumAmp, setFumAmp] = useState(0);
  const [fumSpeaker, setFumSpeaker] = useState(0);
  const [penalties, setPenalties] = useState(0);
  const [driverSkill, setDriverSkill] = useState("");
  const [strategyDetails, setStrategyDetails] = useState("");
  const [scoringDetails, setScoringDetails] = useState("");
  const [comments, setComments] = useState("");

  const { userTeamNumber, competition, updateParams } = useContext(MyContext);

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
        decrement={() => setAutoAmp((prev) => prev - 2)}
        increment={() => setAutoAmp((prev) => prev + 2)}
        absolute={2}
      />

      <IncrementDecrementButton
        title="Auto Speaker"
        value={autoSpeaker}
        decrement={() => setAutoSpeaker((prev) => prev - 5)}
        increment={() => setAutoSpeaker((prev) => prev + 5)}
        absolute={5}
      />

      <IncrementDecrementButton
        title="Tele Amp"
        value={teleAmp}
        decrement={() => setTeleAmp((prev) => prev - 1)}
        increment={() => setTeleAmp((prev) => prev + 1)}
        absolute={1}
      />

      <View style={[styles.criteriaContainer, styles.criteriaHorzContainer]}>
        <Touchable
          style={[styles.criteriaButton, { backgroundColor: "#ad0000" }]}
          onPress={() => setTeleSpeaker((prev) => prev - 5)}
        >
          <Text style={styles.generalText}>-5</Text>
        </Touchable>
        <Touchable
          style={[styles.criteriaButton, { backgroundColor: "#7d0000" }]}
          onPress={() => setTeleSpeaker((prev) => prev - 2)}
        >
          <Text style={styles.generalText}>-2</Text>
        </Touchable>

        <Text style={styles.criteriaText}>Tele Speaker: {teleSpeaker}</Text>

        <Touchable
          style={[styles.criteriaButton, { backgroundColor: "#007d23" }]}
          onPress={() => setTeleSpeaker((prev) => prev + 2)}
        >
          <Text style={styles.generalText}>+2</Text>
        </Touchable>
        <Touchable
          style={[styles.criteriaButton, { backgroundColor: "#00ab30" }]}
          onPress={() => setTeleSpeaker((prev) => prev + 5)}
        >
          <Text style={styles.generalText}>+5</Text>
        </Touchable>
      </View>

      <IncrementDecrementButton
        title="Fum Amp"
        value={fumAmp}
        decrement={() => setFumAmp((prev) => prev - 1)}
        increment={() => setFumAmp((prev) => prev + 1)}
        absolute={1}
      />

      <IncrementDecrementButton
        title="Fum Speaker"
        value={fumSpeaker}
        decrement={() => setFumSpeaker((prev) => prev - 1)}
        increment={() => setFumSpeaker((prev) => prev + 1)}
        absolute={1}
      />

      <View style={[styles.criteriaContainer, styles.criteriaHorzContainer]}>
        <Touchable
          style={[styles.criteriaButton, { backgroundColor: "#ad0000" }]}
          onPress={() => setPenalties((prev) => prev - 5)}
        >
          <Text style={styles.generalText}>-5</Text>
        </Touchable>
        <Touchable
          style={[styles.criteriaButton, { backgroundColor: "#7d0000" }]}
          onPress={() => setPenalties((prev) => prev - 2)}
        >
          <Text style={styles.generalText}>-2</Text>
        </Touchable>

        <Text style={styles.criteriaText}>Penalties: {penalties}</Text>

        <Touchable
          style={[styles.criteriaButton, { backgroundColor: "#007d23" }]}
          onPress={() => setPenalties((prev) => prev + 2)}
        >
          <Text style={styles.generalText}>+2</Text>
        </Touchable>
        <Touchable
          style={[styles.criteriaButton, { backgroundColor: "#00ab30" }]}
          onPress={() => setPenalties((prev) => prev + 5)}
        >
          <Text style={styles.generalText}>+5</Text>
        </Touchable>
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
          style={[styles.criteriaTextInput, { marginBottom: "5%" }]}
          placeholder={"N/A."}
          onChangeText={setComments}
          placeholderTextColor="#959595"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <Touchable
        style={[styles.criteriaButton2, { marginBottom: "5%" }]}
        onPress={() => console.log({ userTeamNumber }, { competition })}
      >
        <Text>Generate QR</Text>
      </Touchable>
    </ScrollView>
  );
}

// >>> --> PITS SCREEN <<<

function PitsScreen() {
  const [teamNumber, setTeamNumber] = useState(0);
  const [drivetrain, setDrivetrain] = useState("");
  const [centerOfGravity, setCenterOfGravity] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [scoringMech, setScoringMech] = useState("");
  const [canFitUnderStage, setCanFitUnderStage] = useState(false);
  const [canBuddyClimb, setCanBuddyClimb] = useState(false);

  const { userTeamNumber, competition, updateParams } = useContext(MyContext);

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <View
        style={{
          flex: 1,
          marginVertical: 10,
        }}
      >
        <ShortTextInput
          label="Team Number"
          placeholder="4308"
          onChangeText={setTeamNumber}
          keyboardType="numeric"
          maxLength={4}
        />
        <DropdownInput
          label="Drivetrain"
          options={["Tank", "Swerve", "Mecanum", "H-Drive", "X-Drive", "Omni"]}
          selectedOption={drivetrain}
          setSelectedOption={setDrivetrain}
        />
        <DropdownInput
          label="Center of Gravity"
          options={["Low", "Medium", "High"]}
          selectedOption={centerOfGravity}
          setSelectedOption={setCenterOfGravity}
        />
        <ShortTextInput
          label="Length"
          placeholder="69"
          onChangeText={setLength}
          keyboardType="numeric"
          maxLength={2}
        />
        <ShortTextInput
          label="Width"
          placeholder="69"
          onChangeText={setWidth}
          keyboardType="numeric"
          maxLength={2}
        />
        <ShortTextInput
          label="Height"
          placeholder="69"
          onChangeText={setHeight}
          keyboardType="numeric"
          maxLength={2}
        />
        <DropdownInput
          label="Scoring Mechanism"
          options={[
            "Shooter",
            "Dumper",
            "Intake",
            "Lift",
            "Claw",
            "Spinner",
            "Hanger",
          ]}
          selectedOption={scoringMech}
          setSelectedOption={setScoringMech}
        />
        <ToggleButton
          title="Can Fit Under Stage"
          value={canFitUnderStage}
          onPress={() => setCanFitUnderStage((prev) => !prev)}
        />
        <ToggleButton
          title="Can Buddy Climb"
          value={canBuddyClimb}
          onPress={() => setCanBuddyClimb((prev) => !prev)}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginBottom: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Touchable
          style={[styles.criteriaButton2, { marginTop: "5%" }]}
          onPress={() => console.log({ userTeamNumber }, { competition })}
        >
          <Text>Generate QR</Text>
        </Touchable>
      </View>
    </ScrollView>
  );
}

// >>> --> SETTINGS SCREEN <<<

function SettingsScreen({ navigation }) {
  const { userTeamNumber, competition, updateParams } = useContext(MyContext);

  const [newParam1, setNewParam1] = useState(0);
  const [newParam2, setNewParam2] = useState("");

  const updateParamsWithTextInput = () => {
    console.log(newParam1, newParam2);
    updateParams({
      userTeamNumber: newParam1 || userTeamNumber,
      competition: newParam2 || competition,
    });
    navigation.navigate("homeScreen");
  };

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <ShortTextInput label="Scouter Name" placeholder='Benjamin "100" Lu' />
      <ShortTextInput
        label="Scouter Team"
        placeholder="4308"
        keyboardType="numeric"
        onChangeText={setNewParam1}
        value={newParam1}
        maxLength={4}
      />
      {/* <ShortTextInput
        label="Competition"
        placeholder="Humber College"
        onChangeText={setNewParam2}
        value={newParam2}
      /> */}
      <DropdownInput
        label="Competition"
        options={[
          "Humber College",
          "Centennial College",
          "McMaster University",
          "Provincial Championship",
        ]}
        selectedOption={newParam2}
        setSelectedOption={setNewParam2}
      />
      <Touchable
        style={[styles.criteriaButton2, { marginTop: "5%" }]}
        onPress={updateParamsWithTextInput}
      >
        <Text>Save Settings</Text>
      </Touchable>
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
        <Touchable
          style={[styles.homeNavigationButton, { backgroundColor: "#c3423f" }]}
          onPress={() => navigation.navigate("standsScreen")}
        >
          <Text style={styles.homeNavigationButtonText}>Stands</Text>
        </Touchable>

        <Touchable
          style={[styles.homeNavigationButton, { backgroundColor: "#5bc0eb" }]}
          onPress={() => navigation.navigate("pitsScreen")}
        >
          <Text style={styles.homeNavigationButtonText}>Pits</Text>
        </Touchable>

        <Touchable
          style={[styles.homeNavigationButton, { backgroundColor: "#959595" }]}
          onPress={() => navigation.navigate("settingsScreen")}
        >
          <Text style={styles.homeNavigationButtonText}>Settings</Text>
        </Touchable>
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
    competition: "Woodlands Asylum",
  });
  const [playoffs, setPlayoffs] = useState(false);

  const updateParams = (newParams) => {
    setParams({ ...params, ...newParams });
  };

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
                <Touchable
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
                </Touchable>
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
      </GestureHandlerRootView>
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
    justifyContent: "space-around",
  },
  
  homeNavigationButton: {
    height: "40%",
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
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    borderRadius: 10,
    marginRight: "8%"
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
    textAlign: "center"
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
    paddingVertical: "10%",
    paddingHorizontal: "5%",
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
