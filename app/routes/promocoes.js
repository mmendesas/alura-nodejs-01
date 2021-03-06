module.exports = function (app) {
    app.get('/promocoes/form', function (req, res) {
        var connection = app.infra.connectionFactory();
        var produtos = new app.infra.ProdutosDAO(connection);

        produtos.lista(function (error, results, fields) {
            res.render('promocoes/form', { lista: results });
        });
        connection.end();
    });

    app.post("/promocoes", function (req, res) {
        var promocao = req.body;
        app.get('io').emit('novaPromocao', promocao);
        res.redirect('/promocoes/form');
    });
}