// 🛠️ Importando driver de conexão com Postgres
const pg = require("pg");

// 🌐 Definindo a URL de conexão com o banco de dados
const database = new pg.Client({
    connectionString: 'postgres://avnadmin:AVNS_qU6kLgZPgBVTJVFLNh8@data-pipeline-test-dvd-rental-pg-barbara-0012.f.aivencloud.com:22538/defaultdb',
    ssl: {
      rejectUnauthorized: false // Permitir certificados autoassinados
    }
  });

// 🔌 Abrindo conexão com banco de dados
database.connect((erro) => {
  if (erro) {
    return console.log("Não foi possível se conectar com o ElephantSQL", erro);
  } else {
    return console.log("Conectado ao ElephantSQL!");
  }
});

// 📤 Exportando conexão para ser utilizada em outras partes do projeto
module.exports = database;
