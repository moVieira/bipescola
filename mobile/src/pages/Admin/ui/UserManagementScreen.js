import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ResponsiveContainer } from '@shared/ui/ResponsiveContainer/ResponsiveContainer';
import { Feather } from '@expo/vector-icons';
import { listUsersAPI, deleteUserAPI } from '@shared/api/adminApi';

export const UserManagementScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await listUsersAPI();
      setUsers(res.data || []);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id, nome) => {
    Alert.alert('Atenção', `Deseja realmente excluir ${nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Excluir', 
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteUserAPI(id);
            Alert.alert('Sucesso', 'Usuário excluído!');
            fetchUsers();
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
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.role}>Perfil: {item.role}</Text>
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
          <Text style={styles.headerTitle}>Gerenciar Usuários</Text>
          <Text style={styles.headerSubtitle}>Lista de Professores, Pais e Admins</Text>
        </View>
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
      ) : (
        <FlatList 
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
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
  email: {
    fontSize: 12,
    fontFamily: 'Roboto_300Light',
    color: '#555',
    marginTop: 2,
  },
  role: {
    fontSize: 10,
    fontFamily: 'Roboto_500Medium',
    color: '#000',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  actionBtn: {
    padding: 8,
    marginLeft: 8,
  },
});
