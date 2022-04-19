const express = require('express');
const app = express();
const Graph = require('./graph/graph.js');
const data = require('./data/routes.json');

app.use(express.static('public'));



app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});
