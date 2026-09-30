import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ResponsiveContainer } from '@shared/ui/ResponsiveContainer/ResponsiveContainer';
import { Feather } from '@expo/vector-icons';
import { listStudentsAPI, deleteStudentAPI } from '@shared/api/adminApi';

export const StudentManagementScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await listStudentsAPI();
      setStudents(res.data || []);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar alunos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id, nome) => {
    Alert.alert('Atenção', `Deseja realmente excluir o aluno ${nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Excluir', 
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteStudentAPI(id);
            Alert.alert('Sucesso', 'Aluno excluído!');
            fetchStudents();
          } catch (error) {
            Alert.alert('Erro', error.message || 'Falha ao excluir');
          }
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.details}>Matrícula: {item.matricula}</Text>
        <Text style={styles.details}>Status: {item.status}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => Alert.alert('Aviso', 'Edição em construção')}>
          <Feather name="edit-2" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(item.id, item.nome)}>
          <Feather name="trash-2" size={20} color="#CC0000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Gerenciar Alunos</Text>
          <Text style={styles.headerSubtitle}>Lista de Alunos Matriculados</Text>
        </View>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : (
        <FlatList 
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20}}>Nenhum aluno encontrado.</Text>}
        />
      )}
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  backBtn: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: 'Roboto_300Light',
    color: '#555',
  },
  listContainer: {
    padding: 24,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Roboto_700Bold',
    color: '#000',
  },
  details: {
    fontSize: 12,
    fontFamily: 'Roboto_300Light',
    color: '#555',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtn: {
    padding: 8,
    marginLeft: 8,
  },
});
