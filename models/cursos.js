module.exports = function (app) {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var curso = Schema({
        nome: {type: String, require: true},
        duracao: {type: String},
        dtinicio: { type: Date },
        dtinicio: { type: Date },
        categoria: {type: String}
    });

    return mongoose.model('cursos', curso);
};