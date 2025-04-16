import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons'; // Adicionando ícones
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await axios.post('http://192.168.15.58:5000/api/auth/register', {
        name,
        email,
        password
      });

      Alert.alert('Sucesso', response.data.msg);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', error.response ? error.response.data.msg : 'Erro no servidor');
    }
  };

  return (
    <View style={styles.container}>
      {/* Título removido */}

      {/* Cabeçalho modernizado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Registro</Text>
      </View>

      {/* Campos de entrada */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={20} color="#6a1b9a" />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
      </View>

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

      {/* Botão de registro */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 22,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 26,
    fontWeight: '300',
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
  registerButton: {
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
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RegisterScreen;
