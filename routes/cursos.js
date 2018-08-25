module.exports = function (app) {
    var valida = require('./../middlewares/valida');
    var cursos = app.controllers.cursos;
    app.get('/menu', valida, cursos.menu);
    app.get('/novocurso', valida, cursos.novocurso);
    app.get('/editcurso', valida, cursos.editcurso);
    app.post('/salvarcurso', valida, cursos.salvarcurso);
    app.get('/deletecurso', valida, cursos.deletecurso);
};
