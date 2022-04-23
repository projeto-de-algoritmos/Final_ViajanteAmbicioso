module.exports = class IntervalScheduling {
 
    calculaScheduling(qtd, horarios, horarioAtual){
        var max = [];
        var anterior = 0
        var passeioAnterior='';
        for (var i = 0; i < qtd; i++) {
            
            if (horarios[i].inicio >= anterior && horarios[i].inicio >= horarioAtual && horarios[i].passeio != passeioAnterior) {
                max.push(horarios[i])
                anterior = horarios[i].fim
                passeioAnterior = horarios[i].passeio;
               
            }
        }
        return max
    }

}