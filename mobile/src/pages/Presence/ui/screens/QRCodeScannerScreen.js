import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button as NativeButton,
} from "react-native";
import { ResponsiveContainer } from "@shared/ui/ResponsiveContainer/ResponsiveContainer";
import { Feather } from "@expo/vector-icons";
import { Button } from "@shared/ui/Button/Button";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { markAttendanceAPI } from "@shared/api/schoolApi";

export const QRCodeScannerScreen = ({ navigation }) => {
  const [scannedData, setScannedData] = useState("");
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();

  if (!permission) {
    return (
      <ResponsiveContainer style={styles.safeArea}>
        <View style={styles.content}>
          <Text>Carregando câmera...</Text>
        </View>
      </ResponsiveContainer>
    );
  }

  if (!permission.granted) {
    return (
      <ResponsiveContainer style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={{ textAlign: "center", marginBottom: 16 }}>
            Precisamos da sua permissão para usar a câmera
          </Text>
          <NativeButton
            onPress={requestPermission}
            title="Conceder Permissão"
          />
        </View>
      </ResponsiveContainer>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
  };

  return (
    <ResponsiveContainer style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scanner</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerButtonText}>Voltar</Text>
          <Feather name="chevron-right" size={20} color="#D92D20" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Aproxime a câmera do{"\n"}Codigo Qr</Text>

        <View style={styles.scannerContainer}>
          {isFocused && (
            <CameraView
              style={[
                StyleSheet.absoluteFillObject,
                { flex: 1, width: "100%", height: "100%" },
              ]}
              facing="back"
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
            />
          )}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        {scanned && (
          <TouchableOpacity
            style={{ marginBottom: 16 }}
            onPress={() => {
              setScanned(false);
              setScannedData("");
            }}
          >
            <Text style={{ color: "#33691E", fontWeight: "bold" }}>
              Escanear novamente
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Aguardando código..."
            placeholderTextColor="#33691E"
            value={scannedData}
            onChangeText={setScannedData}
            editable={false}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Confirmar presença"
            backgroundColor="#9DCC65"
            textColor="#33691E"
            style={styles.confirmBtn}
            onPress={async () => {
              if (!scannedData || !scannedData.startsWith('aluno_')) {
                alert('Código QR inválido!');
                return;
              }
              const aluno_id = scannedData.split('_')[1];
              const dataAtual = new Date().toISOString().split('T')[0];
              try {
                await markAttendanceAPI({ aluno_id, data: dataAtual, presente: true });
                alert("Presença confirmada no sistema!");
                setScannedData("");
                setScanned(false);
              } catch (e) {
                alert("Erro ao salvar: " + (e.message || 'Falha na conexão. Você tem permissão?'));
              }
            }}
          />
        </View>
      </View>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  headerTitle: { fontSize: 20, fontFamily: "Roboto_700Bold", color: "#33691E" },
  headerButton: { flexDirection: "row", alignItems: "center" },
  headerButtonText: { color: "#D92D20", fontSize: 12, marginRight: 4, fontFamily: "Roboto_500Medium" },
  content: { flex: 1, padding: 24, alignItems: "center" },
  title: { fontSize: 18, fontFamily: "Roboto_700Bold", color: "#000", textAlign: "center", marginTop: 24, marginBottom: 48 },
  scannerContainer: { width: 250, height: 250, position: "relative", marginBottom: 24, overflow: "hidden" },
  corner: { position: "absolute", width: 40, height: 40, borderColor: "#9DCC65" },
  topLeft: { top: 0, left: 0, borderTopWidth: 6, borderLeftWidth: 6, borderTopLeftRadius: 16 },
  topRight: { top: 0, right: 0, borderTopWidth: 6, borderRightWidth: 6, borderTopRightRadius: 16 },
  bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 6, borderLeftWidth: 6, borderBottomLeftRadius: 16 },
  bottomRight: { bottom: 0, right: 0, borderBottomWidth: 6, borderRightWidth: 6, borderBottomRightRadius: 16 },
  inputContainer: { width: "100%", marginBottom: 24 },
  input: { backgroundColor: "#C5E1A5", borderRadius: 8, borderWidth: 1, borderColor: "#8FC959", paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, fontFamily: "Roboto_300Light", color: "#33691E", textAlign: "center" },
  buttonContainer: { width: "100%", alignItems: "center" },
  confirmBtn: { width: 200 }
});
