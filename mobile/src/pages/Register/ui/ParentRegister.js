import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "@shared/ui/Button/Button";
import { RegisterInput } from "./RegisterInput";

export const ParentRegister = ({ onBack }) => {
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
        <Text style={styles.headerTitle}>Cadastro de Responsavel</Text>
        <Text style={styles.headerSubtitle}>
          Adicione as informações pessoais para concluir{"\n"}o cadastro
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Informações do Responsável</Text>

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

        <Text style={styles.sectionTitle}>
          Informações do Aluno(a)/Alunos(as)
        </Text>
        <Text style={styles.studentLabel}>Aluno(a) 1</Text>

        <View style={styles.form}>
          <RegisterInput label="Nome" placeholder="" />
          <RegisterInput
            label="Cpf"
            placeholder="Ex: 123.456.789-00"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.addStudentButton}>
            <Text style={styles.addStudentText}>Adicionar novo aluno(a)</Text>
            <Feather name="plus" size={16} color="#000" />
          </TouchableOpacity>
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
    paddingBottom: 100, // padding for bottom bar
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
    color: "#000",
    marginBottom: 16,
    marginTop: 8,
  },
  studentLabel: {
    fontSize: 12,
    fontFamily: "Roboto_500Medium",
    color: "#000",
    marginBottom: 8,
  },
  form: {
    marginBottom: 8,
  },
  addStudentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9D9D9D",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: -8, // to pull it closer to the input
    marginBottom: 24,
  },
  addStudentText: {
    fontSize: 10,
    fontFamily: "Roboto_500Medium",
    color: "#000",
    marginRight: 16,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  confirmButton: {
    width: "100%",
  },
});
