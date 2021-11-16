import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { useFonts, FiraSans_500Medium } from "@expo-google-fonts/fira-sans";
import AreaMap from "../screens/AreaMap";
import IAmSafe from "../screens/IAmSafe";
import VideoFeed from "../screens/VideoFeed";
import ReportIncident from "../screens/ReportIncident";
import Injured from "../screens/Injured";
import Critical from "../screens/Critical";


const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            fontSize: 23,
            color: "#1296D4",
            fontWeight: "bold",
            fontFamily: "FiraSans_500Medium",
          },
        }}
      />
      <Stack.Screen
        name="ReportIncident"
        component={ReportIncident}
        options={{
          title: "Report Incident",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            fontSize: 23,
            color: "#1296D4",
            fontWeight: "bold",
            fontFamily: "FiraSans_500Medium",
          },
        }}
      />
      <Stack.Screen
        name="IAmSafe"
        component={IAmSafe}
        options={{
          title: "I am Safe",
          headerStyle: {
            backgroundColor: "#1296D4",
          },
          headerTitleStyle: {
            fontSize: 23,
            color: "white",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="AreaMap"
        component={AreaMap}
        options={{
          title: "Area Map",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            fontSize: 23,
            color: "#1296D4",
            fontWeight: "bold",
            fontFamily: "FiraSans_500Medium",
          },
        }}
      />
      <Stack.Screen
        name="VideoFeed"
        component={VideoFeed}
        options={{
          title: "Video Feed",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            fontSize: 23,
            color: "#1296D4",
            fontWeight: "bold",
            fontFamily: "FiraSans_500Medium",
          },
        }}
      />
      <Stack.Screen
        name="Injured"
        component={Injured}
        options={{
          title: "Injured",
          headerStyle: {
            backgroundColor: "#FF8F1F",
          },
          headerTitleStyle: {
            fontSize: 23,
            color: "white",
            fontWeight: "bold",
            fontFamily: "FiraSans_500Medium",
          },
        }}
      />
                  <Stack.Screen
        name="Critical"
        component={Critical}
        options={{
          title: "Critical",
          headerStyle: {
            backgroundColor: "#E50000",
          },
          headerTitleStyle: {
            fontSize: 23,
            color: "white",
            fontWeight: "bold",
            fontFamily: "FiraSans_500Medium",
          },
        }}
      />
    </Stack.Navigator>
  );
}
