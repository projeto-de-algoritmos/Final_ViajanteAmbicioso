const express = require('express');
const app = express();
const Graph = require('./Algoritmos/graph.js');
const data = require('./Data/rotas.json');
const passeios = require('./Data/passeios.json');
const intervalScheduling = require('./Algoritmos/IntervalScheduling.js');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './public');

app.get('', (req, res) => {
    res.render('index', { showResult: false });
});


console.log(data[0]["Aracaj�:Macei�"].distancia)


var cidadeAtual = 'Aracajú';
var horarioChegada = '09:00';
var horarios = [];
for (var i = 0; i < passeios.length; i++) {
    var obj = passeios[i];
    for (var cidade in obj) {
        var value = obj[cidade];
        if (cidade == cidadeAtual) {
            for (var passeio in value) {
                var value2 = value[passeio];
                console.log(passeio)
                for (let j = 0; j < value2.length; j++) {
                    console.log(value2[j].inicio + " - " + value2[j].fim);
                   var result = {
                        inicio: parseInt(value2[j].inicio.replace(':', '')),
                       fim: parseInt(value2[j].fim.replace(':', '')),
                       passeio: passeio
                    }
                    
                    horarios.push(result)
                }

            }
            console.log(horarios)
            horarios.sort(function (hor1, hor2) {
                if (hor1.fim < hor2.fim) return -1;
                if (hor1.fim > hor2.fim) return 1;
                return 0;
            })
             var interval = new intervalScheduling()
            var horariosScheduling = interval.calculaScheduling(horarios.length, horarios, parseInt(horarioChegada.replace(':', '')))
            console.log(horariosScheduling)

        }

    }
}



app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});
