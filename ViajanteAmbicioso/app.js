const express = require('express');
const app = express();
const Graph = require('./Algoritmos/graph.js');
const data = require('./Data/rotas.json');
const rotaWH = require('./Data/rotasWH.json');
const passeios = require('./Data/passeios.json');
const intervalScheduling = require('./Algoritmos/IntervalScheduling.js');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './public');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const grafo = new Graph();
for (let i = 0; i < rotaWH.length; i++) {
    let objeto = rotaWH[i];
    let name;
    let objLiteral = {}
    for (let chave in objeto) {
        name = chave.substring(0, chave.indexOf(":"));
        objLiteral[chave.substring(chave.indexOf(':') + 1)] = objeto[chave];
    }
    grafo.adicionaVertice(name, objLiteral);
}
app.get('', (req, res) => {
    res.render('index', { destinos: 0 });
});
var origem, destino, passeioCadaCidade, horaPartida;
app.post('/rota', (req, res) => {
    origem = req.body.origem;
    destino = req.body.destino;
    passeioCadaCidade = req.body.queroPassear;
    horaPartida = parseFloat(req.body.partidaHora.replace(':', ''));
    var interval = new intervalScheduling()
    let destinos
    if (req.body.queroPassear != null) {
        destinos = grafo.menorCaminho(origem, destino, true).concat([origem]).reverse()
    } else {
        destinos = grafo.menorCaminho(origem, destino, false).concat([origem]).reverse()
    }
    let tempoTotal = [];
    if (req.body.queroPassear != null) {
        tempoTotal.push(grafo.tempoTotal[0] + horaPartida / 100)
        for (let i = 1; i < grafo.tempoTotal.length; i++) {
            if (grafo.tempoTotal[i] < 24) {
                //Menos de um dia
                tempoTotal.push(grafo.tempoTotal[i])
            } else {
                //Se passar de um dia essa é a hora que chega
                tempoTotal.push(grafo.tempoTotal[i] % 24)
            }
        }
    } else {
        tempoTotal = grafo.tempoTotalUnico
    }
    console.log(tempoTotal)
    console.log(' Sua rota é ' + destinos)
    var l = 1;
    var resultado = [];
    let x = 0;
    let destinoEjs = []
    while (destinos.length > l) {

        var ultimaCidade = destinos[destinos.length - 1];
        var cidadeAtual = destinos[l];
        //  if (passeioCadaCidade != 'on') {cidadeAtual=ultimaCidade}
        var horarios = [];
        for (var i = 0; i < passeios.length; i++) {
            var obj = passeios[i];
            for (var cidade in obj) {
                var value = obj[cidade];
                if (cidade == cidadeAtual) {
                    for (var passeio in value) {
                        var value2 = value[passeio];
                        //   console.log(passeio)
                        for (let j = 0; j < value2.length; j++) {
                            //    console.log(value2[j].inicio + " - " + value2[j].fim);
                            var result = {
                                inicio: parseInt(value2[j].inicio.replace(':', '')),
                                fim: parseInt(value2[j].fim.replace(':', '')),
                                passeio: passeio
                            }

                            horarios.push(result)
                        }

                    }
                    //console.log(horarios)
                    horarios.sort(function (hor1, hor2) {
                        if (hor1.fim < hor2.fim) return -1;
                        if (hor1.fim > hor2.fim) return 1;
                        return 0;
                    })

                    if (req.body.queroPassear != null) {
                        var horariosScheduling = interval.calculaScheduling(horarios.length, horarios, tempoTotal[x])
                        for (let index = 0; index < horariosScheduling.length; index++) {
                            resultado.push([destinos[l], `${horariosScheduling[index].passeio}: inicio: ${[horariosScheduling[index].inicio.toString().slice(0, 2), ":", horariosScheduling[index].inicio.toString().slice(2)].join('')}; fim: ${[horariosScheduling[index].fim.toString().slice(0, 2), ":", horariosScheduling[index].fim.toString().slice(2)].join('')}.`])
                        }
                        destinoEjs.push(destinos[l])
                        console.log(tempoTotal[x])
                    } else if (l == destinos.length - 1) {
                        var horariosScheduling = interval.calculaScheduling(horarios.length, horarios, tempoTotal)
                        for (let index = 0; index < horariosScheduling.length; index++) {
                            resultado.push([destinos[l], `${horariosScheduling[index].passeio}: inicio: ${[horariosScheduling[index].inicio.toString().slice(0, 2), ":", horariosScheduling[index].inicio.toString().slice(2)].join('')}; fim: ${[horariosScheduling[index].fim.toString().slice(0, 2), ":", horariosScheduling[index].fim.toString().slice(2)].join('')}.`])
                        }
                        destinoEjs.push(destinos[l])
                    }


                    /*   if (passeioCadaCidade != 'on') {
                           console.log(horariosScheduling)
                           break;
                       } 
                       else {
                           console.log(horariosScheduling)
                       }*/

                }

            }
        }
        l++
        x++
    }
    res.render('index', { result: resultado, destinos: destinoEjs });
})








app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});
