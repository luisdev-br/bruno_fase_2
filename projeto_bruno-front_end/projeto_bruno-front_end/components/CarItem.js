import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CarItem = ({ car, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <Image source={car.image} style={styles.image} />
      <Text style={styles.name}>{car.name}</Text>
      <Text style={styles.price}>R$ {car.price.toLocaleString('pt-BR')}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onAddToCart(car)}>
        <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#6a1b9a',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CarItem;