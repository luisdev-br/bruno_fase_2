import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons'; 
import { useCarrinho } from '../screens/CarrinhoContext';
import axios from 'axios';


const imageMap = {
  "car1.jpg": require('../assets/car1.jpg'),
  "car2.jpg": require('../assets/car2.jpg'),
  "car3.jpg": require('../assets/car3.jpg'),
  "car4.jpg": require('../assets/car4.jpg'),
  "car5.jpg": require('../assets/car5.jpg'),
  "car6.jpg": require('../assets/car6.jpg'),
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { carrinho, setCarrinho } = useCarrinho();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.15.58:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  const adicionarAoCarrinho = (carro) => {
    setCarrinho([...carrinho, carro]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carros Disponíveis</Text>
      <FlatList
        data={products}  
        keyExtractor={(item) => item._id ? item._id.toString() : item.id.toString()} 
        renderItem={({ item }) => {
          
          const carImage = imageMap[item.imageUrl]; 

          return (
            <View style={styles.carItem}>
              <Image source={carImage} style={styles.carImage} />
              <Text style={styles.carName}>{item.name}</Text>
              <Text style={styles.carPrice}>R$ {item.price.toLocaleString('pt-BR')}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => adicionarAoCarrinho(item)}>
                <MaterialIcons name="add-shopping-cart" size={24} color="white" />
                <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate('Carrinho')}
      >
        <MaterialIcons name="shopping-cart" size={24} color="white" />
        <Text style={styles.viewCartButtonText}>Ver Carrinho ({carrinho.length})</Text>
      </TouchableOpacity>
      
      {}
      <TouchableOpacity
        style={styles.faqButton}
        onPress={() => navigation.navigate('FAQ')}
      >
        <MaterialIcons name="help-outline" size={24} color="white" />
        <Text style={styles.faqButtonText}>Perguntas Frequentes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#6a1b9a',
  },
  carItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  carImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  carPrice: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#6a1b9a',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  viewCartButton: {
    backgroundColor: '#6a1b9a',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  viewCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  
  faqButton: {
    backgroundColor: '#6a1b9a',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  faqButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default HomeScreen;
