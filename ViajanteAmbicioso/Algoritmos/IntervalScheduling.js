module.exports = class IntervalScheduling {
 
    calculaScheduling(qtd, horarios, horarioAtual){
        var max = [];
        var anterior = 0

        for (var i = 0; i < qtd; i++) {
            if (horarios[i].inicio >= anterior && horarios[i].inicio>=horarioAtual) {
                max.push(horarios[i])
                anterior = horarios[i].fim
            }
        }
        return max
    }

}