import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { ResponsiveContainer } from "@shared/ui/ResponsiveContainer/ResponsiveContainer";
import { Feather } from "@expo/vector-icons";
import { ParentRegister } from "./ParentRegister";
import { EmployeeRegister } from "./EmployeeRegister";

export const RegisterScreen = () => {
  const [registerType, setRegisterType] = useState(null); // 'parent' or 'employee'
  const [modalVisible, setModalVisible] = useState(true);

  const handleSelectType = (type) => {
    setRegisterType(type);
    setModalVisible(false);
  };

  return (
    <ResponsiveContainer style={styles.safeArea}>
      {registerType === "parent" && (
        <ParentRegister onBack={() => setModalVisible(true)} />
      )}
      {registerType === "employee" && (
        <EmployeeRegister onBack={() => setModalVisible(true)} />
      )}

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cadastrar novo usuário</Text>
            <Text style={styles.modalSubtitle}>
              Selecione o tipo de cadastro:
            </Text>

            <TouchableOpacity
              style={[
                styles.typeButton,
                registerType === "parent" && styles.activeTypeButton,
              ]}
              onPress={() => handleSelectType("parent")}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  registerType === "parent" && styles.activeTypeButtonText,
                ]}
              >
                Cadastro de Responsável
              </Text>
              <Feather
                name="plus"
                size={20}
                color={registerType === "parent" ? "#2C1E5C" : "#68519d"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.typeButton}
              onPress={() => handleSelectType("employee")}
            >
              <Text style={styles.typeButtonText}>Cadastro de funcionário</Text>
              <Feather name="plus" size={20} color="#68519d" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 250,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    color: "#000",
    marginBottom: 16,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: "Roboto_300Light",
    color: "#000",
    marginBottom: 24,
  },
  typeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activeTypeButton: {
    backgroundColor: "#C1B4D8",
    borderRadius: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 0,
    marginBottom: 8,
  },
  typeButtonText: {
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
    color: "#68519d",
  },
  activeTypeButtonText: {
    color: "#2C1E5C",
  },
});
