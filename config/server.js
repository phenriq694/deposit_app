/* 
 * Este arquivo é responsável por criar um servidor express e importar diveros os módulos utitlizados
 * na aplicação. 
 * Também configura a inicialização de diversos arquivos automaticamente na inicialização da aplicação. 
 */

//Importação do módulo Express
var express = require('express')

//Atribuição da função retornada pelo módulo express e execução
var app = express()

/*
 * Importação do módulo do Consign
 * Consign: módulo para carregar todas as rotas no ínicio a aplicação
 */
var consign = require('consign')

/* 
 * Importação do módulo Body-Parser 
 * Body-Parser: Conversor dos dados que retornam de uma requisição pelo método POST. 
 */
var bodyParser = require('body-parser')

/*
 * Importação do módulo Express-Validator
 * Express-Validator: utilizado para fazer testes nos dados informados pelo o usuário. 
 */
var expressValidator = require('express-validator')

/*
 * Alteração da propriedade do express que controla a renderização das páginas
 * para o ejs. 
 * EJS: módulo que ajuda a mesclar HTML com comandos JavaScript.
 */
app.set('view engine', 'ejs')

//Alteração da propriedade do express que localiza onde estão as views do projeto 
app.set('views', './app/views')

//Middlewares
app.use(bodyParser.urlencoded({extended: true}))

app.use(expressValidator())

app.use(express.static('./app/public'))

/*
 * Utilizando a função 'consign' que ele escaneia todos os arquivos do projeto
 * podemos usar o 'include()' que carrega todos os arquivos daquele diretório na inicalização
 * do aplicativo, incluido dentro do módulo do servidor com o 'into(app)'. 
 * Com a função 'then' podemos inserir outros módulos que queremos carregar automaticamente. 
 * Para carregar o banco de dados em todos os módulo que precisarem, referênciamos a pasta e o nome do arquivo
 * pois na mesma pasta está o arquivo do server. Colocando só o nome da pasta causaraia um loop na aplicação
 */
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app)

/*
 * Exportando o servidor express.
 * Será importada no arquivo 'app.js'.
 */
module.exports = app