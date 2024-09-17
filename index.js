const express = require('express');
const produtoController = require('./produtoController');
const app = express();
const database = require('./database.js')

app.use(express.json());

// Rotas para operações de CRUD
app.get('/produtos', produtoController.get);  // Listar produtos
app.post('/produtos', produtoController.post);  // Inserir produto
app.put('/produtos/:id', produtoController.put);  // Atualizar produto
app.delete('/produtos/:id', produtoController.delete);  // Deletar produto

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
