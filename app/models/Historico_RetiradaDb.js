/* 
 * Este arquivo tem como função cria um modelo de 'HisoricoRetirada' para fazer as conexões com o banco
 * de dados. 
 */

/* 
 * Classe 'HistoricoRetirada' que tem como atributo a conexão com o banco de dados.
 * É criada uma nova instância dessa classe em:
 * * controllers.historico_retirada.exibir_historico_retirada
 * * controllers.admin.salvar_registro_retirada
 */
function HistoricoRetirada(connection) {
    this._connection = connection
}

/*
 * Inserindo um método na clase 'HistoricoRetirada'.
 * Este método tem como função consultar o dados da tabela 'historico_retirada' dentro banco. 
 * O retorno dos dados será efetuado por uma função de callback. 
 * Passamos como parâmetro a função de callback que vai responder a requisição do client com os dados. 
 * É chamada em:
 * * controllers.historico_retirada.exibir_historico_retirada
 */
HistoricoRetirada.prototype.getHistoricoRetirada = function(callback) {
    /* 
     * Com a função 'query' do atributo '_connection' podemos fazer
     * consultas no banco de dados. 
     * Ela espera dois parâmetros:
     * * comando sql
     * * função de callback: o que vai ser feito após a consulta.
     */
    this._connection.query('select * from historico_retirada', callback) 
 }

 /*
 * Inserindo um método na clase 'HistoricoRetirada'.
 * Este método tem como função inserir o dados da tabela 'historico_retirada' dentro banco. 
 * O retorno dos dados será efetuado por uma função de callback. 
 * Passamos como parâmetro a variável 'registro' com as informações retornadas do form e a 
 * função de callback que vai responder a requisição do client com os dados. 
 * É chamada em:
 * * controllers.admin.salvar_registro_retirada
 */
 HistoricoRetirada.prototype.salvarRetirada = function(registro, callback) {
    /* 
    * Com a função 'query' do atributo '_connection' podemos fazer inclusões no banco de dados. 
    * Ela espera 3 parâmetros:
    * * comando sql
    * * JSON com chaves iguais com o mesmo nome das colunas da tabela no banco e com os valores informados
    * * pelo o usuário. 
    * * função de callback: o que vai ser feito após a consulta.
    */
    this._connection.query('insert into historico_retirada set ? ', registro, callback)
}

module.exports = function() {
    return HistoricoRetirada
}