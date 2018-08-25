module.exports = function (app) {

    var Curso = app.models.cursos;
    var dateFormat = require('dateformat');

    var CursosController = {
        //chamadas a páginas via get
        menu: function (request, response) {

            Curso.find(function (erro, cursos) {
                if (erro) {
                    response.render('/');
                }
                else {
                    var usuario = request.session.usuario,
                        params = { usuario: usuario, cursos: cursos };
                    response.render('cursos/menu', params);
                }
            });

        },
        novocurso: function (request, response) {
            var usuario = request.session.usuario

            var now = new Date();

            var curso = { nome: "", duracao: "", dtinicio: dateFormat(now, "yyyy-mm-dd") };

            var params = { usuario: usuario, curso: curso, cursoid: '' };

            response.render('cursos/formCurso', params);
        },
        editcurso: function (request, response) {

            Curso.findById(request.query.id, function (erro, ecurso) {
                if (erro) {
                    response.redirect('/menu');
                }
                else {
                    var usuario = request.session.usuario;

                    var curso = { nome: ecurso.nome, duracao: ecurso.duracao, dtinicio: dateFormat(ecurso.dtinicio, "yyyy-mm-dd") };

                    var params = { usuario: usuario, curso: curso, cursoid: ecurso._id };
                    response.render('cursos/formCurso', params);
                }

            });
        },
        salvarcurso: function (request, response) {

            console.log("Curso id: "+request.body.cursoid);
            console.log("Salvando curso: " + request.body.curso.nome + " " + request.body.curso.duracao + "" + request.body.curso.dtinicio);

            var cursoid = request.body.cursoid;
            var nome = request.body.curso.nome;
            var duracao = request.body.curso.duracao;
            var dtinicio = request.body.curso.dtinicio.split('-');

            var objDate = new Date(dtinicio[0], dtinicio[1] - 1, dtinicio[2]);

            if (nome.trim().length == 0) {
                response.redirect('/menu');
            }
            else {

                if (cursoid.trim().length == 0) {
                    //Salva novo curso
                    var curso = { nome: nome, duracao: duracao, dtinicio: objDate }
                    Curso.create(curso, function (erro, curso) {
                        if (erro) {
                            //response.redirect('/novocurso');
                            console.log("Erro ao gravas o curso!");
                        }
                        else {
                            // response.redirect('/menu');
                            console.log("Curso gravado com sucesso!");
                        }
                    });
                    Curso.save
                } else {
                    //Localiza curso existente
                    Curso.findById(cursoid, function (erro, curso) {
                        if (erro) {
                            response.redirect('/menu');
                        }
                        else {     
                            //Salva alterações no curso
                            
                            curso.nome = nome;
                            curso.duracao = duracao;
                            curso.dtinicio = objDate;
        
                            curso.save(function(erro) {
                                if (erro) {
                                    console.log("Erro ao alterar o curso!");
                                } else {
                                    console.log("Curso alterado com sucesso!");
                                }
                            });
                        }
        
                    });
                }
            }
            response.redirect('/menu');
        },
        deletecurso: function (request, response) {

            Curso.remove({ _id: request.query.id }, function (erro) {
                if (erro) {
                    response.redirect('/menu');
                }
                else {
                    response.redirect('/menu');
                }
            });

        }
    };
    return CursosController;
};