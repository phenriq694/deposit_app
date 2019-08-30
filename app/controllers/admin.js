/* 
 * Este arquivo é responsável por controlar o que será executado quando as rotas do arquivo routs/admin.js
 * forem chamadas. 
 */

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada dentro do método 'GET'
 * do arquivo 'routes/admin.js' quando a rota '/novos_equipamentos/cadastrar_novo_equipamento é chamada.
 */
module.exports.novos_equipamentos_cadastrar = function(application, req, res) {
    /* 
     * Renderizando a página index.ejs para o client passando um JSON com 
     * outros dois JSONs 'validacao' e 'equipamento' vazio.
     * Isso é feito pois esses dois JSONs são referenciados no código da página 'cadastrar_novo_equipamento.ejs'
     * e este método (novos_equipamentos_cadastrar) renderiza essa página quando chamado. 
     * Caso esses valores não sejam pelo menos definidos agora, poderá dar erro ao carregar a página. 
     */
    res.render("admin/cadastrar_novo_equipamento", {
                validacao : {}, 
                equipamento : {}, 
    })
}

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada dentro do método 'POST'
 * do arquivo 'routes/admin.js' quando a rota '/novos_equipamentos/cadastrar_novo_equipamento/salvar é chamada.
 */
module.exports.salvar_equipamentos = function(application, req, res) {
   /*
    * Atribuindo os valores retornado no corpo da requisição pelo post para a variável
    * 'equipamentos'.
    */
    var equipamento = req.body 

    /*
    * Através do método 'assert' da requisição, podemos validar as informações inseridas 
    * nos campos do formulário. 
    * Ela recebe dois parâmetros:
    * * name do elemento do formulário
    * * Mensagem de erro. 
    * Após isso podemos utilizar um método para cada validação que queremo fazer.
    * Por exemplo, para saber se o campo está em branco ou não, podemos usar o 'notEmpty()'
    */
    req.assert('ativo', 'O ativo é obrigatório').notEmpty()
    req.assert('tipo_equipamento', 'O tipo de equipamento é obrigatório').notEmpty()
    req.assert('marca', 'A marca é obrigatório').notEmpty()
    req.assert('modelo', 'O modelo é obrigatório').notEmpty()

    /*
    * Através do método 'validationErrors()' da requisição podemos coletar os erros que 
    * ocorreram na validação dos campos. E eles são atribuidos na variável 'erros' e são do tipo JSON. 
    */
    var erros = req.validationErrors()

    /*
    * Se existirem erros, entra nesse bloco, rederiza a página de formulários novamente e 
    * returna a função não inserindo os dados no banco.
    */
    if(erros) {
        /*
        * Além da página que será renderizada também passados um JSON com os 
        * erros coletados na validação das informações inseridas para serem exibos ao usuário.
        * O JSON equipamento é passado como valor da variável 'equipamento' pois contem as 
        * informações dos campo que já foram preenchidos, 
        * assim o usuáiro não precisa preencher novamente. 
        */
        res.render("admin/cadastrar_novo_equipamento", {validacao : erros, equipamento: equipamento})
        return
    }

    /* 
    * Atribuindo a função do módulo 'dbConnection.js' na variável 'connection'.
    * Essa função só é executada quando esta rota é acessada.
    */
    var connection = application.config.dbConnection()

    /*
    * Atribuindo um nova instância do módulo 'EquipamentosDb' na variável 'equipamentosModel'.
    * Passamos como parâmetro a conexão com o banco 'connection'.
    */
    var equipamentosModel = new application.app.models.EquipamentosDb(connection)

    /*
    * Utilizando o método 'savarEquipamentos' da instância do módulo 'EquipamentosDb' 
    * atribuido a 'equipamentosModel' para acessar acessar o banco de dados e inserir os dados.
    * Passamos como parâmetro a variável 'equipamento' com as informações retornadas do form e
    * uma função de callback que retorna a resposta para o client.
    * Função de callback: o que vai ser feito após a consulta.
    * Essa função de callback espera dois parâmetros, um erro ou um resultado. 
    */
    equipamentosModel.salvarEquipamentos(equipamento, function(error, result) {
        /* 
        * Redireciona a página para '/deposito_atual' após inserir os dados no banco.
        * Assim evita do usuário dar um f5 na página de inserção dos dados e duplicar eles no banco.  
        */
        res.redirect('/deposito_atual')
    })
}

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada dentro do método 'GET'
 * do arquivo 'routes/admin.js' quando a rota '/novos_equipamentos/adicionar_novo_equipamento' é chamada.
 */
module.exports.novos_equipamentos_adicionar = function(application, req, res) {  

    /*
    * Atribuindo a função do módulo 'dbConnection.js' na variável 'connection'.
    * Essa função só é executada quando esta rota é acessada.
    */
    var connection = application.config.dbConnection()

    /*
    * Atribuindo um nova instância do módulo 'EquipamentosDb' na variável 'equipamentosModel'.
    * Passamos como parâmetro a conexão com o banco 'connection'.
    */
    var equipamentosModel = new application.app.models.EquipamentosDb(connection)

    /*
    * Utilizando o método 'getEquipamentos' da instância do módulo 'EquipamentosDb' 
    * atribuido a 'equipamentosModel' para acessar o banco de dados e retornar uma 
    * resposta para o client.
    * Passamos como parâmetro a função de callback que retorna a resposta.
    * Função de callback: o que vai ser feito após a consulta.
    * Essa função de callback espera dois parâmetros, um erro ou um resultado. 
    * Esse método (novos_equipamentos_adicionar) tem essa função de recurar os dados do banco, pois
    * utiliza os itens das colunas 'tipo_equipamento', 'marca' e 'modelo' da tabela 'equipamento', 
    * para pegar todos os itens já cadastrados e listar eles nos '<select>'. 
    */
    equipamentosModel.getEquipamentos(function(error, result) {

        /*
        * Essas funções atribuidas nas variáveis a seguir, retorna uma lista de cada coluna referenciada, 
        * do banco com os valores filtrados parar ter apenas um exemplo de cada item na listagem nos '<select>'
        */
        tipoEquipamento = tipoEquipamentoList(result)
        marca = marcaList(result)
        modelo = modeloList(result)

        /*
        * Além da página que será renderizada também passamos dois JSONs (validacao e equipaemnto)
        * vazios, pois eles são referênciados dentro do código das páginas e serão utilizados no método
        * 'salvar_equipamento_adicionado' deste módulo para não dar problema ao carregar a página 
        * e outros 3 JSONs com os resultados dos filtros de cada coluna referênciada do 
        * banco para serem adicionadas aos <select>. 
        */
        res.render("admin/adicionar_novo_equipamento", {
            validacao : {}, 
            equipamento : {},
            tipoEquipamento : tipoEquipamento, 
            marca : marca, 
            modelo : modelo})   
    })    
}

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada dentro do método 'POST'
 * do arquivo 'routes/admin.js' quando a rota '/novos_equipamentos/adicionar_novo_equipamento/salvar' 
 * é chamada.
 */
module.exports.salvar_equipamento_adicionado = function(application, req, res) {

    /* 
        * Atribuindo a função do módulo 'dbConnection.js' na variável 'connection'.
        * Essa função só é executada quando esta rota é acessada.
        */
    var connection = application.config.dbConnection()

    /*
    * Atribuindo um nova instância do módulo 'EquipamentosDb' na variável 'equipamentosModel'.
    * Passamos como parâmetro a conexão com o banco 'connection'.
    */
    var equipamentosModel = new application.app.models.EquipamentosDb(connection)

    /*  
        * Atribuindo os valores retornado no corpo da requisição pelo post para a variável
        * 'equipamentos'.
        */
    var equipamento = req.body

    /*
    * Através do método 'assert' da requisição, podemos validar as informações inseridas 
    * nos campos do formulário. 
    * Ela recebe dois parâmetros:
    * * name do elemento do formulário
    * * Mensagem de erro. 
    * Após isso podemos utilizar um método para cada validação que queremo fazer.
    * Por exemplo, para saber se o campo está em branco ou não, podemos usar o 'notEmpty()'
    */
    req.assert('ativo', 'O ativo é obrigatório').notEmpty()
    req.assert('tipo_equipamento', 'O tipo de equipamento é obrigatório').notEmpty()
    req.assert('marca', 'A marca é obrigatório').notEmpty()
    req.assert('modelo', 'O modelo é obrigatório').notEmpty()

    /*
    * Através do método 'validationErrors()' da requisição podemos coletar os erros que 
    * ocorreram na validação dos campos. E eles são atribuidos na variável 'erros' e são do tipo JSON. 
    */
    var erros = req.validationErrors()

    /*
        * Se existirem erros, entra nesse bloco, rederiza a página de formulários novamente e 
        * return a função não inserindo os dados no banco.
        */
    if(erros) {

        /*
        * O método 'getEquipamento' é utilizado aqui para pegar os itens das colunas 
        * 'tipo_equipamento', 'marca' e 'modelo' da tabela 'equipamento' e listar todos os 
        * itens já cadastrados nos '<select>'. 
        * A variável 'equipamento' é passada como parâmetro, pois contem as informações dos 
        * campo que já foram preenchidos, assim o usuáiro não precisa preencher novamente. 
        */
        equipamentosModel.getEquipamentos(equipamento, function(error, result) {
            
            /*
            * Essas funções atribuidas nas variáveis a seguir, retorna uma lista de cada coluna referenciada, 
            * do banco com os valores filtrados parar ter apenas um exemplo de cada item na listagem nos '<select>'
            */
            tipoEquipamento = tipoEquipamentoList(result)
            marca = marcaList(result)
            modelo = modeloList(result)

            /*
            * Além da página que será renderizada também passamos um JSON com os 
            * erros coletados na validação das informações inseridas, um JSON com as informações já
            * inseridas corretamente pelo o usuário, para não digitar novamente e outros 3 JSONs com
            * os resultados dos filtros de cada coluna referênciada do banco para serem adicionadas aos
            * <select> 
            */
            res.render("admin/adicionar_novo_equipamento", {
                validacao : erros, 
                equipamento: equipamento,
                tipoEquipamento : tipoEquipamento, 
                marca : marca,
                modelo : modelo
            })
        })  

        return 
    }

    /*
    * Utilizando o método 'savarEquipamentos' da instância do módulo 'EquipamentosDb' 
    * atribuido a 'equipamentosModel' para acessar o banco de dados e inserir os dados.
    * Passamos como parâmetro a variável 'equipamento' com as informações retornadas do form e
    * uma função de callback que retorna a resposta para o client.
    * Função de callback: o que vai ser feito após a consulta.
    * Essa função de callback espera dois parâmetros, um erro ou um resultado. 
    */
    equipamentosModel.salvarEquipamentos(equipamento, function(error, result) {
        /* 
            * Redireciona a página para '/deposito_atual' após inserir os dados no banco.
            * Assim evita do usuário dar um f5 na página de inserção dos dados e duplicar eles no banco.  
            */
        res.redirect('/deposito_atual')
    })
}

//Funções internas

// Arrays para armazenar os itens de suas respectivas colunas no banco sem repetir
var tipoEquipamento = []
var marca = []
var modelo = []

// Variáveis para controle do resultados 
var primeira = ""
var comparacao = []

// Função para filtrar os itens da coluna 'tipo_equipamento'
function tipoEquipamentoList(result) {
    /* 
    * Estrutra de repetição que utiliza os dados do banco retornados pelo 'result'
    * para separar em 3 arrays (tipoEquipamento, marca, modelo) e armazena apenas os itens,
    * não repetidos. 
    * Se repete enquanto 'i' for menor que o número total de itens em 'result'. 
    */
    // Valores da coluna tipo_equipamento
    for(var i = 0; i < result.length; i++) {
                
        //Armazena um valor da coluna do banco que queremos separar e filtrar
        primeira = result[i].tipo_equipamento

        /*
        * Testa se o valor já existe no Array 'comparacao' utilizando o método 'indexOf'. 
        * Caso o valor retornado for '-1' então ele não está no Array e entra na condição. 
        * Utilizei dois Arrays (comparacao e tipoEquipaemnto) pois com a comparacao eu fiz o teste
        * com o indexOf colocando o valor em minisculo, pra garantir que valores iguais mas com letras
        * maiusculas ou minuscula atrapalhassem o testes. dell ou DeLl por exemplo. 
        * Caso entre na condição, então o valor também é adicionado ao Array tipoEquipamento sem 
        * alterações. 
        */
        if(comparacao.indexOf(primeira.toLowerCase()) == -1){
            comparacao.push(primeira.toLowerCase())
            tipoEquipamento.push(primeira)
        }
    }

    return tipoEquipamento
}

// Função para filtrar os itens da coluna 'marca'
function marcaList(result) {
    /* 
    * Estrutra de repetição que utiliza os dados do banco retornados pelo 'result'
    * para separar em 3 arrays (tipoEquipamento, marca, modelo) e armazena apenas os itens,
    * não repetidos. 
    * Se repete enquanto 'i' for menor que o número total de itens em 'result'. 
    */
    // Valores da coluna tipo_equipamento
    for(var i = 0; i < result.length; i++) {
                
        //Armazena um valor da coluna do banco que queremos separar e filtrar
        primeira = result[i].marca

        /*
        * Testa se o valor já existe no Array 'comparacao' utilizando o método 'indexOf'. 
        * Caso o valor retornado for '-1' então ele não está no Array e entra na condição. 
        * Utilizei dois Arrays (comparacao e tipoEquipaemnto) pois com a comparacao eu fiz o teste
        * com o indexOf colocando o valor em minisculo, pra garantir que valores iguais mas com letras
        * maiusculas ou minuscula atrapalhassem o testes. dell ou DeLl por exemplo. 
        * Caso entre na condição, então o valor também é adicionado ao Array tipoEquipamento sem 
        * alterações. 
        */
        if(comparacao.indexOf(primeira.toLowerCase()) == -1){
            comparacao.push(primeira.toLowerCase())
            marca.push(primeira)
        }
    }

    return marca
}

// Função para filtrar os itens da coluna 'modelo'
function modeloList(result) {
    /* 
    * Estrutra de repetição que utiliza os dados do banco retornados pelo 'result'
    * para separar em 3 arrays (tipoEquipamento, marca, modelo) e armazena apenas os itens,
    * não repetidos. 
    * Se repete enquanto 'i' for menor que o número total de itens em 'result'. 
    */
    // Valores da coluna tipo_equipamento
    for(var i = 0; i < result.length; i++) {
                
        //Armazena um valor da coluna do banco que queremos separar e filtrar
        primeira = result[i].modelo

        /*
        * Testa se o valor já existe no Array 'comparacao' utilizando o método 'indexOf'. 
        * Caso o valor retornado for '-1' então ele não está no Array e entra na condição. 
        * Utilizei dois Arrays (comparacao e tipoEquipaemnto) pois com a comparacao eu fiz o teste
        * com o indexOf colocando o valor em minisculo, pra garantir que valores iguais mas com letras
        * maiusculas ou minuscula atrapalhassem o testes. dell ou DeLl por exemplo. 
        * Caso entre na condição, então o valor também é adicionado ao Array tipoEquipamento sem 
        * alterações. 
        */
        if(comparacao.indexOf(primeira.toLowerCase()) == -1){
            comparacao.push(primeira.toLowerCase())
            modelo.push(primeira)
        }
    }

    return modelo
}

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada dentro do método 'GET'
 * do arquivo 'routes/admin.js' quando a rota '/retirar_equipamento/retirar' é chamada.
 */
module.exports.retirar_equipamento = function(application, req, res) {
    /* 
     * Renderizando a página index.ejs para o client passando um JSON com 
     * o JSON 'validacao'.
     * Isso é feito pois esse JSON são referenciados no código da página 'retirar_equipamento.ejs'
     * e este método (retirar_equipamento) renderiza essa página quando chamado. 
     * Caso esse valor não sejam pelo menos definidos agora, poderá dar erro ao carregar a página. 
     */
    res.render("admin/retirar_equipamento", {
                validacao : {}, 
    })
}

/* 
 * Exportando o módulo como uma função, para que ele já execute os comandos
 * dentro da função.
 * As configurações do servidor express é passada por parâmetro. 
 * Já é carregada na inicilização da aplicação, e executada dentro do método 'POST'
 * do arquivo 'routes/admin.js' quando a rota /retirar_equipamento/retirar/retirada_efetuada' é chamada.
 */
module.exports.salvar_registro_retirada = function(application, req, res) {

    /*
     * Atribuindo os valores retornado no corpo da requisição pelo post para a variável
     * 'equipamentos'.
     */
    var registro = req.body 

    /*
     * Através do método 'assert' da requisição, podemos validar as informações inseridas 
     * nos campos do formulário. 
     * Ela recebe dois parâmetros:
     * * name do elemento do formulário
     * * Mensagem de erro. 
     * Após isso podemos utilizar um método para cada validação que queremo fazer.
     * Por exemplo, para saber se o campo está em branco ou não, podemos usar o 'notEmpty()'
     */
    req.assert('ativo', 'O ativo é obrigatório').notEmpty()
    req.assert('departamento', 'O departamento é obrigatório').notEmpty()
    req.assert('usuario', 'O usuário é obrigatório').notEmpty()

   /*
    * Através do método 'validationErrors()' da requisição podemos coletar os erros que 
    * ocorreram na validação dos campos. E eles são atribuidos na variável 'erros' e são do tipo JSON. 
    */
    var erros = req.validationErrors()

    /*
     * Se existirem erros, entra nesse bloco, rederiza a página de formulários novamente e 
     * return a função não inserindo os dados no banco.
     */
    if(erros) {
       /*
        * Além da página que será renderizada também passados um JSON com os 
        * erros coletados na validação das informações inseridas para serem exibos ao usuário.
        * O JSON historico é passado como valor da variável 'registro' pois contem as 
        * informações dos campo que já foram preenchidos, 
        * assim o usuáiro não precisa preencher novamente. 
        */
        res.render("admin/retirar_equipamento", {validacao : erros, historico: registro})

        return
    }

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
    * Atribuindo um nova instância do módulo 'EquipamentosDb' na variável 'equipamentosModel'.
    * Passamos como parâmetro a conexão com o banco 'connection'.
    */
    var equipamentosModel = new application.app.models.EquipamentosDb(connection)

   /*
    * Utilizando o método 'salvarRetirada' da instância do módulo 'Historico_ReriradaDb' 
    * atribuido a 'historicoModel' para acessar acessar o banco de dados e inserir os dados.
    * Passamos como parâmetro a variável 'registro' com as informações retornadas do form e
    * uma função de callback que retorna a resposta para o client.
    * Função de callback: o que vai ser feito após a consulta.
    * Essa função de callback espera dois parâmetros, um erro ou um resultado. 
    */
    historicoModel.salvarRetirada(registro, function(error, result) {
        /* 
         * Redireciona a página para '/retirar_equipamento/historico_retirada após inserir os dados no banco.
         * Assim evita do usuário dar um f5 na página de inserção dos dados e duplicar eles no banco.  
         */
        res.redirect('/retirar_equipamento/historico_retirada')
    })

    //Variável que vai armazenar o item 'ativo' do corpo das informações passadas pelo form. 
    var ativo = registro.ativo

   /*
    * Utilizando o método 'retirar_equipamneto' da instância do módulo 'EquipamentosDb' 
    * atribuido a 'equipamentosModel' para acessar o banco de dados e excluir os dados.
    * Passamos como parâmetro a variável 'ativo' com as informações retornadas do form relacionadas
    * ao item que queremos excluir e uma função de callback que retorna a resposta para o client.
    * Função de callback: o que vai ser feito após a consulta.
    * Essa função de callback espera dois parâmetros, um erro ou um resultado. 
    */
    equipamentosModel.retirar_equipamento(ativo, function(error, result) {})
}
