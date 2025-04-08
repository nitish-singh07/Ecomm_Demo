import React from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import DetailsScreen from "../screens/DetailsScreen";
import TabsNavigator, { TabsStackParamList } from "./TabsNavigator";
import { Ionicons } from "@expo/vector-icons";
import OnboardingScreen from "../screens/onBoarding";

// Define the parameter list for the Root Stack
export type RootStackParamList = {
  OnboardingScreen: undefined;
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  Details: {
    id: string;
  };
};

// Create the navigator and screen props types
const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Define the stack navigator
const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="OnboardingScreen">
      {/* Initial screen: Onboarding */}
      <RootStack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Tabs stack */}
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />

      {/* Details screen */}
      <RootStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTitleAlign: "center",
          headerRight: () => (
            <Ionicons name="share-outline" size={24} color="#000" />
          ),
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
