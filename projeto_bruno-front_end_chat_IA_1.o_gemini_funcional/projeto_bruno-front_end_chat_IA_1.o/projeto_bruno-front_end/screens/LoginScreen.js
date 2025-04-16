import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons'; // Adicionando ícones
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await axios.post('http://192.168.15.58:5000/api/auth/login', {
        email,
        password,
      });

      const { token, userId } = response.data;
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('token', token);

      Alert.alert('Sucesso', 'Login bem-sucedido!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', error.response ? error.response.data.msg : 'Erro no servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#6a1b9a" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={20} color="#6a1b9a" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerButtonText}>Não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    color: '#6a1b9a',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: '#6a1b9a',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#6a1b9a',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#6a1b9a',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
