/* 
 * Este arquivo é responsável por controlar o que será executado quando a rota '/' for 
 * chamada. 
 */

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada dentro do método 'GET'
 * do arquivo 'routes/home.js' quando a rota '/' é chamada.
 */
module.exports.index = function(application, req, res) {
    /*
     * Envia como resposta para o client a renderização da página (view) 'index.ejs'. 
     */
    res.render("home/index")
}