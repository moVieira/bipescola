import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import { ResponsiveContainer } from '@shared/ui/ResponsiveContainer/ResponsiveContainer';
import { Feather } from "@expo/vector-icons";
import { listStudentsAPI } from '@shared/api/adminApi';
import { markAttendanceAPI } from '@shared/api/schoolApi';

export const ClassListScreen = ({ navigation, route }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await listStudentsAPI();
        setStudents(res.data || []);
      } catch (error) {
        console.error("Erro ao buscar alunos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleMarkAttendance = (student) => {
    Alert.alert(
      "Registrar Presença",
      `Deseja registrar presença hoje para ${student.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Falta", 
          style: "destructive",
          onPress: () => submitAttendance(student.id, false)
        },
        { 
          text: "Presente", 
          onPress: () => submitAttendance(student.id, true)
        }
      ]
    );
  };

  const submitAttendance = async (aluno_id, presente) => {
    const today = new Date().toISOString().split('T')[0];
    try {
      await markAttendanceAPI({ aluno_id, data: today, presente });
      Alert.alert('Sucesso', `Registro salvo: ${presente ? 'Presente' : 'Falta'}`);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao registrar presença.');
    }
  };

  return (
    <ResponsiveContainer style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Validação de Presença</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.headerButtonText}>Voltar</Text>
          <Feather name="chevron-right" size={20} color="#D92D20" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Alunos (Geral)</Text>
        <Text style={styles.sectionSubtitle}>Selecione um aluno para lançar presença hoje</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#33691E" style={{ marginTop: 20 }} />
        ) : students.length === 0 ? (
          <Text style={{textAlign: 'center', marginTop: 20}}>Nenhum aluno cadastrado.</Text>
        ) : (
          students.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={styles.studentItem}
              onPress={() => handleMarkAttendance(student)}
            >
              <Text style={styles.studentItemText}>
                {student.nome} (Matrícula: {student.matricula})
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    color: "#33691E",
    marginBottom: 8,
    marginTop: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Roboto_300Light",
    color: "#666",
    marginBottom: 16,
  },
  studentItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  studentItemActive: {
    backgroundColor: "#C5E1A5",
  },
  studentItemText: {
    fontSize: 16,
    fontFamily: "Roboto_300Light",
    color: "#8FC959",
  },
  studentItemTextActive: {
    fontFamily: "Roboto_500Medium",
    color: "#33691E",
  },
});
