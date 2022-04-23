var fs = require('fs');
module.exports = class Graph {
    constructor() {
        this.INFINITY = 1 / 0;
        this.vertices = {};
        this.tempoTotal = 0;
    }

    adicionaVertice(name, edges) {
        this.vertices[name] = edges;

    };

    menorCaminho(inicio, fim) {
        var nodes = new PriorityQueue(),
            distances = {},
            previous = {},
            path = [],
            smallest,
            vertex,
            neighbor,
            alt;

        for (vertex in this.vertices) {
            if (vertex === inicio) {
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            } else {
                distances[vertex] = this.INFINITY;
                nodes.enqueue(this.INFINITY, vertex);
            }
            previous[vertex] = null;
        }

        while (!nodes.isEmpty()) {
            smallest = nodes.dequeue();

            if (smallest === fim) {
                path = [];
                while (previous[smallest]) {
                    console.log(this.vertices[smallest][previous[smallest]])
                    this.tempoTotal = this.tempoTotal + this.vertices[smallest][previous[smallest]] / 80;
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }

            if (!smallest || distances[smallest] === this.INFINITY) {
                continue;
            }

            for (neighbor in this.vertices[smallest]) {
                alt = distances[smallest] + this.vertices[smallest][neighbor];

                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;
                    nodes.enqueue(alt, neighbor);
                }
            }
        }
        return path;
    };
}
class PriorityQueue {
    constructor() {
        this._nodes = [];
    }

    enqueue(priority, key) {
        this._nodes.push({ key: key, priority: priority });
        this.sort();
    };
    dequeue() {
        return this._nodes.shift().key;
    };
    sort() {
        this._nodes.sort(function (a, b) {
            return a.priority - b.priority;
        });
    };
    isEmpty() {
        return !this._nodes.length;
    };
}