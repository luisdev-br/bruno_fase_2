import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons'; // Ícones para interação

const FAQScreen = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const faqData = [
    { id: '1', question: ' Quais carros você tem disponíveis?', answer: 'Temos Honda Civic, Toyota Corolla, Ford KA, Porsche 911 e outros modelos.' },
    { id: '2', question: ' Como posso comprar um carro?', answer: 'Você pode comprar através do nosso site ou visitar uma de nossas lojas.' },
    { id: '3', question: ' Há algum financiamento disponível?', answer: 'Sim, oferecemos diversas opções de financiamento com condições facilitadas.' },
    { id: '4', question: ' Os carros têm garantia?', answer: 'Todos os carros têm garantia de fábrica e você pode estender com nossos planos de garantia.' },
  ];

  const handleQuestionClick = (id) => {
    setSelectedQuestion(selectedQuestion === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perguntas Frequentes</Text>
      <FlatList
        data={faqData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.faqItem}>
            <TouchableOpacity onPress={() => handleQuestionClick(item.id)}>
              <Text style={styles.question}>
                <MaterialIcons name="question-answer" size={20} color="#6a1b9a" />
                {item.question}
              </Text>
            </TouchableOpacity>
            {selectedQuestion === item.id && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        )}
      />
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
  faqItem: {
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
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  answer: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});

export default FAQScreen;
