/* 
 * Este arquivo é responsável por inicializar a aplicação, 
 * importando o servidor e configurando a porta que ele irá escutar. 
 */

// Importando as configurações do servidor para a variável 'app'
var app = require('./config/server')

/*
 * Importações descenecessários com o consign 
Importando a função de 'home.js'
var rotaHome = require('./app/routes/home')
Executando a função passando as configurações do servidro como parâmetro
rotaHome(app)

Importando a função de 'deposito_atual.js'
var rotaDepositoAtual = require('./app/routes/deposito_atual')
Executando a função passando as configurações do servidro como parâmetro
rotaDepositoAtual(app)

Importando a função de 'novos_equipamentos.js'
var rotaNovosEquipamentos = require('./app/routes/novos_equipamentos')
Executando a função passando as configurações do servidro como parâmetro
rotaNovosEquipamentos(app)
*/

/*
 * Utilizando o método 'listen' para ele escutar uma porta.
 * Passando como parâmetro o número da porta que quermos que ouça (3000) e
 * uma função de callback que será executada assim que o servidor subir. 
 */
app.listen(3000, function() {
    console.log("Servidor ON")
})