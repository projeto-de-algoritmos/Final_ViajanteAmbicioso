const express = require('express');
const app = express();
const Graph = require('./Algoritmos/graph.js');
const data = require('./Data/rotas.json');
const passeios = require('./Data/passeios.json');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './public');

app.get('', (req, res) => {
    res.render('index', { showResult: false });
});


console.log(data[0]["Aracaj�:Macei�"].distancia)


console.log(passeios[0]['Aracajú']['City Tour Aracaju'][0].inicio)
for (var i = 0; i < passeios.length; i++) {
    var obj = passeios[i];
    for (var cidade in obj) {
        var value = obj[cidade];
        console.log("------------------------------------------------------")
        console.log(cidade)
        for (var passeio in value) {
            var value2 = value[passeio];
            console.log("**************************************************")
            console.log(passeio)
            for (let j = 0; j < value2.length; j++) {
                console.log(value2[j].inicio + " - " + value2[j].fim);
            }

        }
    }
}



app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});
