import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NoticeCard } from '../components/NoticeCard';
import { listPostsAPI } from '@shared/api/schoolApi';

export const NoticeListScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [role, setRole] = useState('PARENT'); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const userStr = await AsyncStorage.getItem('@bipescola_user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setRole(user.role);
        }
        
        const res = await listPostsAPI();
        setPosts(res || []);
      } catch (error) {
        console.error("Erro ao carregar avisos", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (isFocused) {
      fetchPosts();
    }
  }, [isFocused]);

  const renderHeader = () => (
    <View style={styles.listHeader}>
      {role !== 'PARENT' && (
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={() => navigation.navigate('NoticeCreate')}
        >
          <Text style={styles.createButtonText}>Criar aviso</Text>
          <Feather name="plus" size={20} color="#F06292" />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.semesterFilter}>
        <Text style={styles.semesterText}>Recentes</Text>
        <Feather name="chevron-down" size={16} color="#F06292" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mural de Avisos</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#F06292" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NoticeCard notice={{
              id: item.id.toString(),
              authorName: item.autor_nome || 'Escola',
              authorRole: 'Comunicação', 
              avatarUrl: 'https://ui-avatars.com/api/?name=' + (item.autor_nome || 'A'),
              subject: item.titulo,
              content: item.conteudo,
              date: new Date(item.data_criacao).toLocaleDateString('pt-BR')
            }} />
          )}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20}}>Nenhum aviso encontrado.</Text>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    fontWeight: 'bold',
    color: '#8B1A1A',
  },
  listContent: {
    padding: 24,
    paddingBottom: 100, 
  },
  listHeader: {
    marginBottom: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  createButtonText: {
    fontSize: 16,
    color: '#F06292',
    fontWeight: 'bold',
    marginRight: 8,
  },
  semesterFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  semesterText: {
    fontSize: 14,
    color: '#F06292',
    fontWeight: 'bold',
    marginRight: 4,
  },
});
