import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Button } from "@shared/ui/Button/Button";
import { RegisterInput } from "./RegisterInput";
import { Feather } from "@expo/vector-icons";

export const EmployeeRegister = ({ onBack }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // mock register
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso.");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cadastro de Funcionário</Text>
        <Text style={styles.headerSubtitle}>
          Adicione as informações pessoais para concluir{"\n"}o cadastro
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

        <View style={styles.form}>
          <RegisterInput label="Nome" placeholder="" />
          <RegisterInput
            label="Telefone"
            placeholder="Ex: (79) 91234-5678"
            keyboardType="phone-pad"
          />
          <RegisterInput
            label="Email"
            placeholder="Ex: example@gmail.com"
            keyboardType="email-address"
          />
          <RegisterInput
            label="Cpf"
            placeholder="Ex: 123.456.789-00"
            keyboardType="numeric"
          />
          <RegisterInput label="Senha" placeholder="" isPassword />
        </View>

        <Text style={styles.sectionTitle}>Cargo</Text>

        <View style={styles.roleDropdown}>
          <Text style={styles.roleDropdownText}>Professor</Text>
          <View style={styles.roleDropdownIconGroup}>
            <Feather name="chevron-down" size={16} color="#000" />
            <View style={styles.redDot} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#666666" />
          ) : (
            <Button
              title="Cadastrar"
              style={styles.confirmButton}
              backgroundColor="#666666"
              textColor="#fff"
              onPress={handleRegister}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    color: "#000",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: "Roboto_300Light",
    color: "#555",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
    color: "#000",
    marginBottom: 16,
    marginTop: 8,
  },
  form: {
    marginBottom: 8,
  },
  roleDropdown: {
    backgroundColor: "#9D9D9D",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  roleDropdownText: {
    fontSize: 12,
    fontFamily: "Roboto_300Light",
    color: "#444",
  },
  roleDropdownIconGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CC0000",
    marginLeft: 8,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  confirmButton: {
    width: "100%",
  },
});
