/* Esta arquivo é responsável por criar a conexão com o banco de dados */

// Importanto o módulo mysql
var mysql = require('mysql')

/*
 * Atribuindo a função de conexão com o banco de dados em um variável. 
 * Assim retornamos a variável e não a função, evitando uso desnecessário da conexão
 * com o banco de dados, já que com consign, estamos carregando este arquivo na inicialização
 * da aplicação. 
 */
var connMySql = function() {
   /*
    * Conexão com o banco de dados através do método 'createConnection()'. 
    * Os parâmetros passados para ele são em JSON. 
    */
   return mysql.createConnection({
        host : 'localhost',
        user : 'root', 
        password : 'Paulo666',
        database : 'webapp_deposito_suporteti'
    })
}

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * É importado em (VERIFICAR SE É NECESSÁRIO):
 * * routes/deposito_atual.js
 * É criada uma conexão em:
 * * controllers.deposito_atual.exibir_deposito_atual
 * * controllers.historico_retirada.exibir_historico_retirada 
 */
module.exports = function() {
    return connMySql
}

