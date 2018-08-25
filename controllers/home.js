module.exports = function (app) {

    var HomeController = {
        index: function (req, res) {
            res.render('home/index');
        },
        login: function (request, response) {

            var nome = request.body.usuario.nome ;
            var senha = request.body.usuario.senha;

            if (nome == 'admin' && senha == '123') {
                console.log('Authenticated!');

                console.log("Login Usuário " + nome);
                
                var usuario = request.body.usuario;
                request.session.usuario = usuario;
                response.redirect('/menu');
            }
        
            else {
                
                console.log('Authentication failed!');
                response.redirect('/');
            }
        },
        logout: function (request, response) {
            request.session.destroy();
            response.redirect('/');
        }
    };
    return HomeController;
}; 