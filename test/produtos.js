var express = require('../config/express')();
var request = require('supertest')(express);

describe('Produtos Controller', function () {

    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query('delete from livros', function(err, result){
            if(!err){
                done();
            }
        });
    });

    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#cadastro de novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({ titulo: "", descricao: "novo livro" })
            .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', function (done) {
        request.post('/produtos')
            .send({ titulo: "titulo novo", descricao: "novo livro", preco: 20.51 })
            .expect(302, done);
    });

    // it('#listagem html', function (done) {
    //     request.get('/produtos')
    //         .set('Accept', 'application/html')
    //         .expect('Content-Type', /json/)
    //         .expect(200, done);
    // });

});