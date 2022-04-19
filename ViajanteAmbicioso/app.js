const express = require('express');
const app = express();
const Graph = require('./Algoritmos/graph.js');
const data = require('./Data/rotas.json');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './public');

app.get('', (req, res) => {
    res.render('index', { showResult: false });
});




/*const grafo = new Graph();
for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    let name
    let objLiteral = {}
    for (let key in obj) {
        name = key.substring(0, key.indexOf(":"));
        objLiteral[key.substring(key.indexOf(':') + 1)] = obj[key];
    }
    grafo.addVertex(name, objLiteral);
} */



app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});
