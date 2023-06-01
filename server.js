/* alguns campos estao puxando como nulls, irei resolver esse bug assim que estiver com tempo. */


const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3080;

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database: 'projeto03'
});


connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conexão bem-sucedida ao banco de dados!');
});
  
  // Configuração do corpo da solicitação
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use(express.static(__dirname)); // Define o diretório raiz para servir arquivos estáticos
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

  
  // Rota para receber o formulário
  app.post('/processar', (req, res) => {
    const { IDUSUARIOS, MUSICA, IDIOMA, COMIDA, PAIS, NOME, ESTADO, idade, TELEFONE} = req.body;
  
    const query = 'INSERT INTO usuarios(IDUSUARIOS, MUSICA, IDIOMA, COMIDA, PAIS, NOME, ESTADO, IDADE, TELEFONE) VALUES (?,?, ?, ?, ?, ?, ? ,?)';
    const values = [IDUSUARIOS, MUSICA, IDIOMA, COMIDA, PAIS, NOME, ESTADO, idade, TELEFONE];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados no banco de dados:', err);
        return;
      }
      console.log('Dados inseridos com sucesso!');
      res.send('Dados inseridos com sucesso!');
    });
});
  
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

