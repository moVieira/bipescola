import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ResponsiveContainer } from '@shared/ui/ResponsiveContainer/ResponsiveContainer';
import { Feather } from '@expo/vector-icons';

export const AdminMenuScreen = ({ navigation }) => {
  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Painel do Administrador</Text>
        <Text style={styles.headerSubtitle}>Gerencie os usuários e alunos do sistema</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('UserManagement')}>
          <Feather name="users" size={32} color="#000" />
          <Text style={styles.cardTitle}>Gerenciar Usuários</Text>
          <Text style={styles.cardDesc}>Lista, edita e remove Professores, Pais e Admins</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentManagement')}>
          <Feather name="book-open" size={32} color="#000" />
          <Text style={styles.cardTitle}>Gerenciar Alunos</Text>
          <Text style={styles.cardDesc}>Lista, edita e remove alunos matriculados</Text>
        </TouchableOpacity>
      </ScrollView>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    color: '#000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: 'Roboto_300Light',
    color: '#555',
  },
  content: {
    padding: 24,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 24,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    color: '#000',
    marginTop: 12,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    fontFamily: 'Roboto_300Light',
    color: '#555',
    textAlign: 'center',
  },
});
