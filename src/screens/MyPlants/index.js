import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function MyPlantsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>My Plants Screen</Text>
      <TouchableOpacity
        style={{ backgroundColor: "blue", padding: 10, marginTop: 10 }}
        onPress={() => navigation.navigate("RemindersScreen")}
      >
        <Text style={{ color: "white" }}>Go to Reminders</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MyPlantsScreen;
