import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export const RegisterInput = ({ label, placeholder, isPassword, ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#555"
          secureTextEntry={isPassword}
          {...props}
        />
      </View>
      <View style={styles.redDot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9D9D9D", // Gray background
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: "#444",
    fontSize: 10,
    fontFamily: "Roboto_300Light",
    marginBottom: 2,
  },
  input: {
    fontSize: 12,
    fontFamily: "Roboto_300Light",
    color: "#000",
    padding: 0,
    height: 20,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CC0000",
    marginLeft: 8,
  },
});
