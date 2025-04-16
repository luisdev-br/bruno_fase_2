const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const WebSocket = require('ws');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const http = require('http');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

// Rotas principais
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/gemini', require('./routes/geminiRoutes')); // 💡 Nova rota da IA

// Iniciando servidor HTTP separado
const server = http.createServer(app);

// WebSocket
const wss = new WebSocket.Server({ server });

// Gemini - inicialização
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });


// Conexão WebSocket
wss.on('connection', (ws) => {
  console.log('Novo cliente conectado via WebSocket');

  ws.on('message', async (message) => {
    console.log(`Mensagem recebida: ${message}`);

    try {
      const prompt = `Responda sempre em português brasileiro. Pergunta: ${message.toString()}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      ws.send(text); // Envia a resposta da IA
    } catch (error) {
      console.error('Erro na Gemini via WebSocket:', error);
      ws.send("Erro ao obter resposta da IA.");
    }
  });

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });
});

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
