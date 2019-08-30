/* 
 * Este arquivo é responsável por controlar o comportamento das rotas '/retirar_equipamentos/retirar' e
 * '/retirar_equipamentos/historico_retirada'. 
 */

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada quando a rota '/retirar_equipamentos/retirar' ou
 * '/retirar_equipamentos/historico_retirada' é chamada atráves do método 'GET'. 
 */
module.exports = function(application) { 
    /*
    * Utilizando o método 'get' do express para capturar requisições e enviar respostas
    * para o client quando estiver em um determinada página. 
    * Como parâmetro passamos o endereço da página e uma função de callback que vai 
    * lidar com as resquições 'req' e respostas 'res'.
    * TESTAR SE É NECESSÁRIO
    */
    application.get('/retirar_equipamento/retirar', function(req, res) {
        res.render('admin/retirar_equipamento')
    })

    /*
    * Utilizando o método 'get' do express para capturar requisições e enviar respostas
    * para o client quando estiver em um determinada página. 
    * Como parâmetro passamos o endereço da página e uma função de callback que vai 
    * lidar com as resquições 'req' e respostas 'res'.
    */
    application.get('/retirar_equipamento/historico_retirada', function(req, res) {
        application.app.controllers.historico_retirada.exibir_historico_retirada(application, req, res)
    })
}