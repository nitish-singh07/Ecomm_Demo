import React from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import DetailsScreen from "../screens/DetailsScreen";
import TabsNavigator, { TabsStackParamList } from "./TabsNavigator";
import { Ionicons } from "@expo/vector-icons";

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  Details: {
    id: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
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
