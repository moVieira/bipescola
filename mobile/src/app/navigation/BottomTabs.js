import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PresenceNavigator } from "@pages/Presence";
import { ProfileScreen } from "@pages/Profile";
import { NoticesNavigator } from "@pages/Notices";
import { EvaluationNavigator } from "@pages/Evaluation";
import { AdminNavigator } from "@pages/Admin";

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [role, setRole] = useState(null);

  useEffect(() => {
    const loadRole = async () => {
      try {
        const userStr = await AsyncStorage.getItem('@bipescola_user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setRole(user.role);
        }
      } catch (e) {
        console.error('Erro ao buscar role:', e);
      }
    };
    loadRole();
  }, []);

  if (!role) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#02386A" />
      </View>
    );
  }

  // Regras de negócio de visibilidade
  const canSeeNotices = ['ADM', 'PROF', 'PARENT'].includes(role);
  const canSeeAdmin = ['ADM'].includes(role);
  const canSeeEvaluation = ['ADM', 'PROF', 'PARENT'].includes(role);
  // Porteiro tem acesso exclusivo a presença para ler QR Code, além do app comum
  const canSeePresence = ['ADM', 'PROF', 'PARENT', 'PORTEIRO'].includes(role);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar, 
          { 
            height: 70 + insets.bottom,
            paddingBottom: 10 + insets.bottom,
            alignSelf: 'center',
            width: '100%',
            maxWidth: isTablet ? (width > 900 ? 750 : '85%') : '100%',
            borderTopWidth: 0,
            elevation: 0,
          }
        ],
        tabBarShowLabel: false,
      }}
    >
      {canSeeNotices && (
        <Tab.Screen
          name="Avisos"
          component={NoticesNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && { backgroundColor: "#FFCDD2" }]}>
                <Feather name="bell" size={24} color={focused ? "#000" : "#000"} />
                <Text style={styles.iconText}>Avisos</Text>
              </View>
            ),
          }}
        />
      )}

      {canSeePresence && (
        <Tab.Screen
          name="Presence"
          component={PresenceNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && { backgroundColor: "#C5E1A5" }]}>
                <Feather name="check-circle" size={24} color={focused ? "#000" : "#000"} />
                <Text style={styles.iconText}>Presença</Text>
              </View>
            ),
          }}
        />
      )}

      {canSeeAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && { backgroundColor: "#C1B4D8" }]}>
                <Feather name="briefcase" size={24} color={focused ? "#000" : "#000"} />
                <Text style={styles.iconText}>Painel ADM</Text>
              </View>
            ),
          }}
        />
      )}

      {canSeeEvaluation && (
        <Tab.Screen
          name="Evaluation"
          component={EvaluationNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && { backgroundColor: "#FDE68A" }]}>
                <Feather name="clipboard" size={24} color={focused ? "#000" : "#000"} />
                <Text style={styles.iconText}>Avaliação</Text>
              </View>
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && { backgroundColor: "#A0C4E1" }]}>
              <Feather name="user" size={24} color={focused ? "#000" : "#000"} />
              <Text style={styles.iconText}>Perfil</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    paddingTop: 10,
    // Adiciona sombra suave no tablet para combinar com o ResponsiveContainer
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  activeIconContainer: {
    backgroundColor: "#C1B4D8", // Light purple background when selected
  },
  iconText: {
    fontSize: 10,
    fontFamily: "Roboto_500Medium",
    color: "#000",
    marginTop: 4,
  },
});
