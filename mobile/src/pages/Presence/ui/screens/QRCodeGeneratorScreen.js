import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { ResponsiveContainer } from '@shared/ui/ResponsiveContainer/ResponsiveContainer';
import { Feather } from "@expo/vector-icons";
import { Button } from "@shared/ui/Button/Button";
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

export const QRCodeGeneratorScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [alunoId, setAlunoId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userStr = await AsyncStorage.getItem('@bipescola_user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserData(user);
          
          if (user.role === 'PARENT') {
            const { apiClient } = require('@shared/api/apiClient');
            const res = await apiClient(`/students/pai/${user.id}`, { method: 'GET' });
            if (res && res.data && res.data.length > 0) {
              setAlunoId(res.data[0].id);
            }
          } else {
             setAlunoId(user.id);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, []);

  const qrValue = alunoId ? `aluno_${alunoId}` : 'loading';

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(qrValue);
    alert('Código copiado!');
  };

  return (
    <ResponsiveContainer style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QR Code</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerButtonText}>Voltar</Text>
          <Feather name="chevron-right" size={20} color="#D92D20" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Código QR para{"\n"}validação de presença
        </Text>

        <View style={styles.qrContainer}>
          {!userData ? (
             <ActivityIndicator size="large" color="#33691E" />
          ) : (
             <QRCode
               value={qrValue}
               size={200}
               color="black"
               backgroundColor="white"
             />
          )}
        </View>

        <View style={styles.codeContainer}>
          <View>
            <Text style={styles.codeLabel}>Código da Matrícula</Text>
            <Text style={styles.codeValue}>{userData ? qrValue : '...'}</Text>
          </View>
          <TouchableOpacity onPress={copyToClipboard}>
            <Feather name="copy" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Copiar código"
            backgroundColor="#9DCC65"
            textColor="#33691E"
            style={styles.copyBtn}
            onPress={copyToClipboard}
          />
        </View>
      </View>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    color: "#33691E",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButtonText: {
    color: "#D92D20",
    fontSize: 12,
    marginRight: 4,
    fontFamily: "Roboto_500Medium",
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    color: "#000",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  qrContainer: {
    marginBottom: 32,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 48,
  },
  codeLabel: {
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
    color: "#33691E",
    marginBottom: 4,
  },
  codeValue: {
    fontSize: 14,
    fontFamily: "Roboto_300Light",
    color: "#000",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  copyBtn: {
    width: 200,
  },
});
