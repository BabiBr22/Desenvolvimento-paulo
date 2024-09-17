// 🛠️ Importando conexão com Postgres no controlador
const database = require("./database");

// 🔄 Realizando operação de SELECT (listar produtos)
exports.get = (req, res) => {
  const query = "SELECT * FROM produto";
  
  database.query(query).then(
    (resultado) => {
      res.status(200).send({ produtos: resultado.rows });
    },
    (erro) => {
      res.status(500).send({ erro: erro });
    }
  );
};

// 🔄 Realizando operação de INSERT
exports.post = (req, res) => {
  const query = "INSERT INTO produto(nome, preco, descricao) VALUES ($1, $2, $3);";
  const values = [req.body.nome, req.body.preco, req.body.descricao];

  database.query(query, values).then(
    () => {
      res.status(200).send({ mensagem: "Produto cadastrado com sucesso!" });
    },
    (erro) => {
      res.status(500).send({ erro: erro });
    }
  );
};

// ❌ Realizando operação de DELETE
exports.delete = (req, res) => {
  const query = "DELETE FROM produto WHERE produto_id=$1;";
  const values = [req.params.id];

  database.query(query, values).then(
    () => {
      res.status(200).json({ mensagem: "Produto removido com sucesso!" });
    },
    (erro) => {
      res.status(500).send({ erro: erro });
    }
  );
};

// 🔄 Realizando operação de UPDATE
exports.put = (req, res) => {
  const query = "UPDATE produto SET nome=$1, preco=$2, descricao=$3 WHERE produto_id=$4;";
  const values = [
    req.body.nome,
    req.body.preco,
    req.body.descricao,
    req.params.id,
  ];

  database.query(query, values).then(
    () => {
      res.status(200).send({ mensagem: "Produto atualizado com sucesso!" });
    },
    (erro) => {
      res.status(500).send({ erro: erro });
    }
  );
};
