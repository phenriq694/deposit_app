/* 
 * Este arquivo é responsável por controlar o que será executado quando a rota 
 * '/retirar_equipamento/historico_retirada' for chamada. 
 */

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada dentro do método 'GET'
 * do arquivo 'routes/retirar_equipamneto.js' quando a rota '/retirar_equipamento/historico_retirada'
 * é chamada.
 */
module.exports.exibir_historico_retirada = function(application, req, res) {
    /*
     * Atribuindo a função do módulo 'dbConnection.js' na variável 'connection'.
     * Essa função só é executada quando esta rota é acessada.
     */
    var connection = application.config.dbConnection()

    /*
     * Atribuindo um nova instância do módulo 'Historico_RetiradaDb' na variável 'historicoModel'.
     * Passamos como parâmetro a conexão com o banco 'connection'.
     */
    var historicoModel = new application.app.models.Historico_RetiradaDb(connection)

    /*
     * Utilizando o método 'getHistoricoRetirada' da instância do módulo 'Historico_RetiradaDb' 
     * atribuido a 'historicoModel' para acessar o banco de dados e retornar uma 
     * resposta para o client.
     * Passamos como parâmetro a função de callback que retorna a resposta.
     * Função de callback: o que vai ser feito após a consulta.
     * Essa função de callback espera dois parâmetros, um erro ou um resultado. 
     */
    historicoModel.getHistoricoRetirada(function(error, result) {
        /* 
         * Renderizando a página index.ejs para o client e passando um
         * JSON com o resultado da consulta ao banco. 
         */
        res.render('consultas/historico_retirada', {historico: result})
    })
}

