import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons'; 
import { useCarrinho } from './CarrinhoContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CarrinhoScreen = ({ navigation }) => {
  const { carrinho, setCarrinho } = useCarrinho();

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.price, 0);
  };

  const removerDoCarrinho = (id) => {
    const novoCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(novoCarrinho);
  };

  const finalizarCompra = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Erro', 'Usuário não encontrado. Faça o login novamente.');
        return;
      }

      const orderData = {
        userId,
        products: carrinho.map(item => item.id),
        total: calcularTotal(),
      };

      const response = await axios.post('http://192.168.15.58:5000/api/orders', orderData);

      setCarrinho([]);
      Alert.alert('Compra Finalizada', 'Sua compra foi finalizada com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error) {
      console.error('Erro ao finalizar a compra:', error.response || error.message);
      Alert.alert('Erro', 'Não foi possível finalizar a compra.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id ? item.id.toString() : item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemPrice}>R$ {item.price.toLocaleString('pt-BR')}</Text>
            
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removerDoCarrinho(item.id)}
            >
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.total}>Total: R$ {calcularTotal().toLocaleString('pt-BR')}</Text>

      <TouchableOpacity style={styles.finalizarButton} onPress={finalizarCompra}>
        <MaterialIcons name="check-circle" size={24} color="white" />
        <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
    color: '#6a1b9a',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#6a1b9a',
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: '#ff3333',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 16,
    color: '#6a1b9a',
  },
  finalizarButton: {
    backgroundColor: '#6a1b9a',
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  finalizarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CarrinhoScreen;
