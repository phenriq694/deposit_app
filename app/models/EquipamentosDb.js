/* 
 * Este arquivo tem como função cria um modelo de 'Equipamento' para fazer as conexões com o banco
 * de dados. 
 */

/* 
 * Classe 'Equipamentos' que tem como atributo a conexão com o banco de dados.
 * É criada uma nova instância dessa classe em:
 * * controllers.deposito_atual.exibir_deposito_atual
 * * controllers.admin.salvar_equipamentos
 * * controllers.admin.novos_equipamentos_adicionar
 * * controllers.admin.salvar_equipamento_adicionado
 * * controllers.admin.salvar_registro_retirada
 */
function Equipamentos(connection) {
    this._connection = connection
}

/*
 * Inserindo um método na clase 'Equipamentos'.
 * Este método tem como função consultar os dados da tabela 'equipamento' dentro banco.
 * O retorno dos dados será efetuado por uma função de callback. 
 * Passamos como parâmetro a função de callback que vai responder a requisição do client com os dados. 
 * É chamada em:
 * * controllers.deposito_atual.exibir_deposito_atual
 * * controllers.admin.novos_equipamentos_adicionar
 * * controllers.admin.salvar_equipamento_adicionado
 */
Equipamentos.prototype.getEquipamentos = function(equipamento, callback) {
    /* 
     * Com a função 'query' do atributo '_connection' podemos fazer
     * consultas no banco de dados. 
     * Ela espera dois parâmetros:
     * * comando sql
     * * função de callback: o que vai ser feito após a consulta.
     */
    this._connection.query('select * from equipamento', equipamento, callback) 
 }

/*
 * Inserindo um método na clase 'Equipamentos'.
 * Este método tem como função inserir os dados da tabela 'equipamento' dentro banco.
 * O retorno dos dados será efetuado por uma função de callback. 
 * Passamos como parâmetro a variável 'equipamento' com as informações retornadas do form e
 * a função de callback que vai responder a requisição do client com a inclusão dos dados. 
 * É chamada em:
 * * controllers.admin.salvar_equipamentos
 * * controllers.admin.salvar_equipamento_adicionado
 */
 Equipamentos.prototype.salvarEquipamentos = function(equipamento, callback) {
    /* 
    * Com a função 'query' do atributo '_connection' podemos fazer inclusões no banco de dados. 
    * Ela espera 3 parâmetros:
    * * comando sql
    * * JSON com chaves iguais com o mesmo nome das colunas da tabela no banco e com os valores informados
    * * pelo o usuário. 
    * * função de callback: o que vai ser feito após a consulta.
    */
    this._connection.query('insert into equipamento set ? ', equipamento, callback)
}

/*
 * Inserindo um método na clase 'Equipamentos'.
 * Este método tem como função remover dados da tabela 'equipamento' dentro banco.
 * O retorno dos dados será efetuado por uma função de callback. 
 * Passamos como parâmetro a variável 'ativo' com as informações retornadas do form relacionadas ao 
 * item que queremos excluir.
 * A função de callback que vai responder a requisição do client com a remoção dos dados. 
 * É chamada em:
 * * controllers.admin.salvar_registro_retirada
 */
Equipamentos.prototype.retirar_equipamento = function(ativo, callback)  {
   /* 
    * Com a função 'query' do atributo '_connection' podemos fazer exclusões no banco de dados. 
    * Ela espera dois parâmetros:
    * * comando sql + o valor do item que quermos excluir. 
    * * função de callback: o que vai ser feito após a consulta.
    */
    this._connection.query("delete from equipamento where ativo = '" + ativo + "'", callback)
}

module.exports = function() {
    return Equipamentos
}