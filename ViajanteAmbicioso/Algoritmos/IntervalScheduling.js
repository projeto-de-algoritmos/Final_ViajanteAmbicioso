module.exports = class IntervalScheduling {
 
    calculaScheduling(qtd, horarios){
        var max = [];
        var anterior = 0

        for (var i = 0; i < qtd; i++) {
            if (horarios[i].inicio >= anterior) {
                max.push(horarios[i])
                anterior = horarios[i].fim
            }
        }
        return max
    }

}