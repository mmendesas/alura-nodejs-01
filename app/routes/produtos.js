module.exports = function (app) {

	var listaProdutos = function (req, res, next) {
		var connection = app.infra.connectionFactory();
		var produtosBanco = new app.infra.ProdutosDAO(connection);

		produtosBanco.lista(function (erros, resultados) {
			if (erros) {
				return next(erros);
			}
			res.format({
				html: function () {
					res.render('produtos/lista', { lista: resultados });
				},
				json: function () {
					res.json(resultados);
				}
			});
		});

		connection.end();
	};

	app.get('/produtos', listaProdutos);

	app.get('/produtos/form', function (req, res) {
		res.render('produtos/form', { errosValidacao: {}, produto: {} });
	});

	app.post('/produtos/form', function (req, res) {
		res.render('produtos/form', { errosValidacao: erros, produto: produto });
	});

	app.post('/produtos', function (req, res) {

		var produto = req.body;

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		req.assert('titulo', 'Titulo é obrigatório').notEmpty();
		req.assert('preco', 'Formato inválido').isFloat();

		var errors = req.validationErrors();
		if (errors) {
			res.format({
				html: function () {
					res.status(400).render('produtos/form', { errosValidacao: errors, produto: produto });
				},
				json: function () {
					res.status(400).json(errors);
				}
			});
			return;
		}

		produtosDAO.salva(produto, function (erros, resultados) {
			res.redirect('/produtos');
		});
	});
}