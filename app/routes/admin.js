/* 
 * Este arquivo é responsável por controlar o comportamento das rotas que alteram informações no banco, 
 * como salvar ou remover um item do banco. 
 */

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada quando as rotas:
 * '/novos_equipamentos/cadastrar_novo_equipamento',
 * '/novos_equipamentos/adicionar_novo_equipamento',
 * '/retirar_equipamento/retirar'
 * é chamada atráves do método 'GET'. 
 * E
 * '/novos_equipamentos/cadastrar_novo_equipamento/salvar',
 * '/novos_equipamentos/adicionar_novo_equipamento/salvar',
 * '/retirar_equipamento/retirar/retirada_efetuada'
 * é chamada atráves do método 'POST'. 
 */
module.exports = function(application) { 
    /*
    * Utilizando o método 'get' do express para capturar requisições e enviar respostas
    * para o client quando estiver em um determinada página. 
    * Como parâmetro passamos o endereço da página e uma função de callback que vai 
    * lidar com as resquições 'req' e respostas 'res'.
    */
    application.get('/novos_equipamentos/cadastrar_novo_equipamento', function(req, res) {
        //Instância do controllers que tem a lógica para essa rota
        application.app.controllers.admin.novos_equipamentos_cadastrar(application, req, res)
    })

    /*
     * Utilizando o método POST para recuperar as informações do formulário.
     */
    application.post('/novos_equipamentos/cadastrar_novo_equipamento/salvar', function(req, res) {
        //Instância do controllers que tem a lógica para essa rota
        application.app.controllers.admin.salvar_equipamentos(application, req, res)
    })

    /*
    * Utilizando o método 'get' do express para capturar requisições e enviar respostas
    * para o client quando estiver em um determinada página. 
    * Como parâmetro passamos o endereço da página e uma função de callback que vai 
    * lidar com as resquições 'req' e respostas 'res'.
    */
   application.get('/novos_equipamentos/adicionar_novo_equipamento', function(req, res) {
        //Instância do controllers que tem a lógica para essa rota
        //res.render('admin/adicionar_novo_equipamento', {validacao : {}, equipamento : {}})
        application.app.controllers.admin.novos_equipamentos_adicionar(application, req, res)

    })

    /*
     * Utilizando o método POST para recuperar as informações do formulário.
     */
    application.post('/novos_equipamentos/adicionar_novo_equipamento/salvar', function(req, res) {
        //Instância do controllers que tem a lógica para essa rota
        application.app.controllers.admin.salvar_equipamento_adicionado(application, req, res)
    })

    application.get('/retirar_equipamento/retirar', function(req, res) {
        application.app.controllers.admin.retirar_equipamento(application, req, res)
    })

    /*
     * Utilizando o método POST para recuperar as informações do formulário.
     */
    application.post('/retirar_equipamento/retirar/retirada_efetuada', function(req, res) {
        //Instância do controllers que tem a lógica para essa rota
        application.app.controllers.admin.salvar_registro_retirada(application, req, res)
    })
}

