import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createPostAPI } from '@shared/api/schoolApi';
import { listParentsAPI } from '@shared/api/adminApi';

export const NoticeCreateScreen = () => {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Lógica para Dropdown de Pais
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null); // null = Todos
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const res = await listParentsAPI();
        // Assume que a API retorna os dados no formato esperado
        setParents([{ id: 'todos', nome: 'Todos os Pais (Geral)' }, ...(res || [])]);
        setSelectedParent({ id: 'todos', nome: 'Todos os Pais (Geral)' });
      } catch (error) {
        console.error("Erro ao carregar pais", error);
      }
    };
    fetchParents();
  }, []);

  const handleCreate = async () => {
    if (!titulo || !conteudo) {
      Alert.alert('Atenção', 'Preencha o título e o conteúdo do aviso.');
      return;
    }

    try {
      setLoading(true);
      // Incluímos destinatario_id no payload, mas avisaremos o back-end para aceitá-lo!
      const payload = { 
        titulo, 
        conteudo,
        destinatario_id: selectedParent?.id === 'todos' ? null : selectedParent?.id
      };
      await createPostAPI(payload);
      Alert.alert('Sucesso', 'Aviso publicado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao criar aviso.');
    } finally {
      setLoading(false);
    }
  };

  const selectParent = (parent) => {
    setSelectedParent(parent);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Avisos</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
          <Feather name="chevron-right" size={20} color="#D92D20" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.screenTitle}>Criar Aviso</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Destinatário (Pai/Responsável) [Frontend Pronto]</Text>
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.input, { color: selectedParent ? '#000' : '#666' }]}>
              {selectedParent ? selectedParent.nome : 'Selecione um pai...'}
            </Text>
            <Feather name="chevron-down" size={20} color="#8B1A1A" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Título (Assunto)</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Ex: Reunião de Pais" 
              placeholderTextColor="#666" 
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Conteúdo do Aviso</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="Insira o texto completo aqui..." 
              placeholderTextColor="#F06292"
              multiline
              textAlignVertical="top"
              value={conteudo}
              onChangeText={setConteudo}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.submitBtn} 
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Publicar Aviso</Text>}
        </TouchableOpacity>
      </ScrollView>

      {/* Dropdown Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Destinatário</Text>
            <FlatList
              data={parents}
              keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectParent(item)}>
                  <Text style={styles.modalItemText}>{item.nome || item.email}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#D92D20',
    fontSize: 12,
    marginRight: 4,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
  },
  screenTitle: {
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
    fontWeight: 'bold',
    color: '#8B1A1A',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Roboto_700Bold',
    fontWeight: 'bold',
    color: '#8B1A1A',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#F8BBD0', 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F06292',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  textAreaContainer: {
    height: 120,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  textArea: {
    height: '100%',
  },
  submitBtn: {
    backgroundColor: '#F06292',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
    color: '#8B1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseBtn: {
    marginTop: 16,
    alignItems: 'center',
    padding: 12,
  },
  modalCloseText: {
    color: '#D92D20',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
