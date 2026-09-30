import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResponsiveContainer } from '@shared/ui/ResponsiveContainer/ResponsiveContainer';
import { Feather } from '@expo/vector-icons';
import { Input } from '@shared/ui/Input/Input';
import { Button } from '@shared/ui/Button/Button';
import { loginUserAPI } from '@shared/api/userApi';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auto-login
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('@bipescola_token');
        if (token) {
          navigation.navigate('Main');
        }
      } catch (e) {}
      setLoading(false);
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha email e senha.');
      return;
    }

    try {
      setLoading(true);
      const response = await loginUserAPI({ email, senha });
      
      await AsyncStorage.setItem('@bipescola_token', response.token);
      await AsyncStorage.setItem('@bipescola_user', JSON.stringify(response.user));
      
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Erro no Login', error.message || 'Credenciais inválidas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveContainer style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../../assets/logo.png')} 
              style={styles.logoImage} 
              resizeMode="contain"
            />
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Fazer Login</Text>
              <Text style={styles.subtitle}>Faça login para obter acesso ao aplicativo</Text>
            </View>

            <View style={styles.inputsContainer}>
              <Input 
                label="Email" 
                placeholder="exemplo@email.com" 
                keyboardType="email-address" 
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <Input 
                label="Senha" 
                placeholder="******" 
                isPassword 
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>

          {/* Button Section */}
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#02386A" />
            ) : (
              <Button title="Fazer login" onPress={handleLogin} />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  logoImage: {
    width: 200,
    height: 80,
  },
  formContainer: {
    width: '100%',
    marginBottom: 48,
  },
  headerTextContainer: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Roboto_300Light',
    color: '#000000',
  },
  inputsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#02386A',
    fontSize: 14,
    fontFamily: 'Inter_300Light',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
});
