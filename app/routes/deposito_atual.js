/* 
 * Este arquivo é responsável por controlar o comportamento da rota '/deposito_atual'. 
 */

// Importação da conexão com o banco de dados. 
var dbConnection = require('../../config/dbConnection')

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada quando a rota '/deposito_atual'
 * é chamada atráves do método 'GET'. 
 */
module.exports = function(application) { 

    /*
    * Utilizando o método 'get' do express para capturar requisições e enviar respostas
    * para o client quando estiver em um determinada página. 
    * Como parâmetro passamos o endereço da página e uma função de callback que vai 
    * lidar com as resquições 'req' e respostas 'res'.
    */
    application.get('/deposito_atual', function(req, res) {
        application.app.controllers.deposito_atual.exibir_deposito_atual(application, req, res)
    })
}