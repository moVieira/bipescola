import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ResponsiveContainer } from '@shared/ui/ResponsiveContainer/ResponsiveContainer';
import { Feather } from "@expo/vector-icons";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    email: "...",
    role: "...",
    image: "https://i.pravatar.cc/150?img=68", // [TODO]: Implementar rota de foto
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userStr = await AsyncStorage.getItem('@bipescola_user');
        if (userStr) {
          setUserData(JSON.parse(userStr));
        }
      } catch (e) {
        console.error("Failed to load user", e);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@bipescola_token');
    await AsyncStorage.removeItem('@bipescola_user');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const messages = [
    {
      id: 1,
      senderName: "Sara Soares",
      senderRole: "Professora",
      avatar: "https://i.pravatar.cc/150?img=47",
      aspect: "Aspecto",
      grade: "5",
      comment:
        "Feedback inicial que serve para orientar o desenvolvimento futuro e identificar pontos fracos.",
      date: "12 de dez. 2026",
    },
    {
      id: 2,
      senderName: "Larissa Sato",
      senderRole: "Professora",
      avatar: "https://i.pravatar.cc/150?img=41",
      aspect: "Aspecto",
      grade: "5",
      comment:
        "Feedback inicial que serve para orientar o desenvolvimento futuro e identificar pontos fracos.",
      date: "12 de dez. 2026",
    },
  ];

  return (
    <ResponsiveContainer style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Informações Pessoais</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Feather name="log-out" size={24} color="#CC0000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Section */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: "https://i.pravatar.cc/150?img=68" }} style={styles.profileImage} />
          <Text style={styles.todoText}>[TODO] Backend: API de alterar foto</Text>
          <Text style={styles.profileName}>{userData.nome}</Text>
          <Text style={styles.profileRole}>Perfil: {userData.role}</Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Informações da Conta</Text>

          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Email:</Text> {userData.email}
          </Text>
          
          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="lock" size={16} color="#02386A" />
            <Text style={styles.actionBtnText}>Alterar Senha [TODO: Criar rota backend]</Text>
          </TouchableOpacity>
        </View>

        {/* Messages Section */}
        <View style={styles.messagesSection}>
          <Text style={styles.sectionTitle}>
            {userData.role === "RESPONSAVEL"
              ? "Mensagens Recentes"
              : "Mensagens enviadas recentemente"}
          </Text>

          <TouchableOpacity style={styles.semesterDropdown}>
            <Text style={styles.semesterText}>Semestre X</Text>
            <Feather name="chevron-down" size={20} color="#5A9BD6" />
          </TouchableOpacity>

          {messages.map((msg) => (
            <View key={msg.id} style={styles.messageCard}>
              <View style={styles.messageHeader}>
                <Image
                  source={{ uri: msg.avatar }}
                  style={styles.messageAvatar}
                />
                <View>
                  <Text style={styles.messageSenderName}>{msg.senderName}</Text>
                  <Text style={styles.messageSenderRole}>{msg.senderRole}</Text>
                </View>
              </View>

              <View style={styles.messageBody}>
                <Text style={styles.messageDetail}>
                  <Text style={styles.detailLabel}>{msg.aspect}</Text>
                  {"\n"}
                  Nota: <Text style={styles.boldText}>{msg.grade}</Text>
                </Text>

                <Text style={styles.detailLabel}>Comentário</Text>
                <Text style={styles.messageText}>{msg.comment}</Text>
              </View>

              <Text style={styles.messageDate}>{msg.date}</Text>
            </View>
          ))}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#D0E4F5", // light blue line under header
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    color: "#02386A",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    color: "#000",
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    fontFamily: "Roboto_300Light",
    color: "#666",
  },
  detailsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    color: "#02386A",
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "Roboto_300Light",
    color: "#333",
    marginBottom: 8,
    lineHeight: 20,
  },
  detailLabel: {
    fontFamily: "Roboto_700Bold",
    color: "#02386A",
  },
  boldText: {
    fontFamily: "Roboto_700Bold",
    color: "#000",
  },
  messagesSection: {
    marginBottom: 16,
  },
  semesterDropdown: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  semesterText: {
    fontSize: 14,
    fontFamily: "Roboto_500Medium",
    color: "#5A9BD6",
    marginRight: 4,
  },
  messageCard: {
    borderWidth: 1,
    borderColor: "#5A9BD6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  messageSenderName: {
    fontSize: 16,
    fontFamily: "Roboto_700Bold",
    color: "#02386A",
  },
  messageSenderRole: {
    fontSize: 12,
    fontFamily: "Roboto_300Light",
    color: "#5A9BD6",
  },
  messageBody: {
    marginBottom: 8,
  },
  messageDetail: {
    fontSize: 14,
    fontFamily: "Roboto_300Light",
    color: "#000",
    marginBottom: 8,
    lineHeight: 20,
  },
  messageText: {
    fontSize: 14,
    fontFamily: "Roboto_300Light",
    color: "#000",
    lineHeight: 20,
  },
  messageDate: {
    fontSize: 10,
    fontFamily: "Roboto_300Light",
    color: "#5A9BD6",
    textAlign: "right",
    marginTop: 8,
  },
  logoutBtn: {
    padding: 8,
  },
  todoText: {
    color: '#CC0000',
    fontSize: 10,
    marginBottom: 8,
    fontFamily: 'Roboto_300Light',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionBtnText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#02386A',
    fontFamily: 'Roboto_500Medium',
  },
});
