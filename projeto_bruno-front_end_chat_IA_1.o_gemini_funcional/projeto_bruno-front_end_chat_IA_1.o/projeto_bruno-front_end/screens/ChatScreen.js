import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

class Message {
  constructor(text, sentBy) {
    this.text = text;
    this.sentBy = sentBy;
  }
}

let ws;

const ChatScreen = () => {
  const scrollRef = useRef(null);
  const [chat, setChat] = useState({ messages: [] });
  const [text, setText] = useState('');

  useEffect(() => {
    ws = new WebSocket('ws://192.168.15.58:5000'); // Substitua pelo IP da máquina, se necessário

    ws.onopen = () => {
      console.log('WebSocket conectado!');
    };

    ws.onmessage = ({ data }) => {
      setChat((prev) => ({
        messages: [...prev.messages, new Message(data, 'ai')],
      }));
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (text.trim() !== '') {
      ws.send(text);
      setChat((prev) => ({
        messages: [...prev.messages, new Message(text, 'user')],
      }));
      setText('');
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        item.sentBy === 'user' ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text style={item.sentBy === 'user' ? styles.userMessageText : styles.aiMessageText}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Cabeçalho */}

          {/* Lista de mensagens */}
          <FlatList
            ref={scrollRef}
            data={chat.messages}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
          />

          {/* Input e Botão */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Digite sua mensagem..."
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Estilos gerais
  container: { flex: 1 },
  inner: { flex: 1, padding: 16, backgroundColor: '#f4f6f9' },

  // Estilo para a mensagem do usuário
  userMessage: {
    backgroundColor: '#fff',  // Fundo branco para as mensagens do usuário
    alignSelf: 'flex-end',     // Alinhado à direita
    borderRadius: 10,         // Bordas arredondadas
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',          // Limita a largura
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userMessageText: {
    fontSize: 16,
    color: '#333',  // Texto preto para as mensagens do usuário
  },

  // Estilo para a mensagem da IA
  aiMessage: {
    backgroundColor: '#6a1b9a',  // Fundo roxo para a resposta da IA
    alignSelf: 'flex-start',      // Alinhado à esquerda
    borderRadius: 10,             // Bordas arredondadas
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',              // Limita a largura
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  aiMessageText: {
    fontSize: 16,
    color: '#fff',  // Texto branco para a resposta da IA
  },

  // Estilos do input e botão
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: '#6a1b9a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatScreen;
