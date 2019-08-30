/* 
 * Este arquivo é responsável por controlar o comportamento da rota 
 * home '/filtrar_lista'. 
 */

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada quando a rota '/filtrar_lista' 
 * é chamada atráves do método 'GET'. 
 */
module.exports = function(application) { 
    /*
    * Utilizando o método 'get' do express para capturar requisições e enviar respostas
    * para o client quando estiver em um determinada página. 
    * Como parâmetro passamos o endereço da página e uma função de callback que vai 
    * lidar com as resquições 'req' e respostas 'res'.
    */
    application.get('/filtrar_lista', function(req, res) {
        application.app.controllers.admin.exibir_opcoes_filtro(application, req, res)
    })

    /*
     * Utilizando o método POST para recuperar as informações do formulário.
     */
    application.post('/filtrar_lista/filtro', function(req, res) {
        //Instância do controllers que tem a lógica para essa rota
        application.app.controllers.admin.filtrar(application, req, res)
    })
}  