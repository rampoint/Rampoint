var usersRef = firebase.database().ref('users')

usersRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
         
        var id = childSnapshot.key;
        const usersChild = database.ref('users/'+id+'/peças')

        usersChild.once('value', (snapshot) => {
         if(snapshot.exists()){    
            snapshot.forEach((childSnapshot) =>{
                var nome_pecas = childSnapshot.key
                var dataPeca = childSnapshot.val()
                
                criarTabela(nome_pecas, dataPeca.data, dataPeca.hora_doacao, dataPeca.desc ,dataPeca.tipo, dataPeca.email, dataPeca.nome,dataPeca.qtd,dataPeca.vistoria)
                //caso seja necessario mostrar para testes
                // console.log(id)
                // console.log(nome_pecas)
                // console.log(dataPeca)

            }) 
          
         }
        })
        
    })
})

function criarTabela(id,data,hora,desc,estrutura,email_doador,nome_doador,nome_peca,qtd,vistoria){
    const novaNotificacaoDesc = document.createElement('div')
    const novaNotificacao = document.createElement('div')
  
    novaNotificacaoDesc.innerHTML = `<div class="mensagem-detalhes" id="mensagem" value="${id}" >
                  <div class="mensagem-header">
                      <img src="./img/foto-adm.svg" alt="Foto de perfil do administrador">
                      <div class="coluna-mensagem">
                          <h3>Sergio</h3>
                          <span class="data-hora">${data} ${hora}</span>
                      </div>
                  </div>
                  <hr>
                  <div class="mensagem-content">
                      <h2>Nova doação</h2>
                      <h4 class="descricao">Descrição:</h4>
                      <p class="conteudo-descricao">${desc}</p>
                      <hr>
                      <div class="info">
                          <h4>Informações pessoais</h4>
                          <p><span class="span-preto">Nome do doador:</span> ${nome_doador}</p>
                          <p><span class="span-preto">Email:</span>${email_doador}</p>
                          <p><span class="span-preto">Telefone:</span>teste</p>
                      </div>
                      <div class="info">
                          <h4>Informações da doação</h4>
                          <p><span class="span-preto">Peça:</span>${nome_peca}</p>
                          <p><span class="span-preto">Tipo de componente:</span> ${estrutura}</p>
                          <p><span class="span-preto">Quantidade:${qtd}</span> 3</p>
                      </div>
                  </div>
                  <div class="btn-vistoria">
                      <button class="verify-button">Verificar</button>
                  </div>
              </div>
  `
  
  novaNotificacao.innerHTML = `
  
    <hr>
    <div class="mensagens-item" onclick="showDetails(${nome_peca})">
                      <div class="mensagem-info">
                          <img src="./img/check.svg" alt="Ícone de um check">
                          <img src="./img/foto-adm.svg" alt="">
                          <p>${nome_doador} adicionou uma nova doação</p>
                      </div>
                      <div class="seta-mensagem">
                          <button><img src="./img/seta-mensagem.svg" alt=""></button>
                      </div>
                  </div>
                  <hr>`
  
        
  document.getElementById('mensagens').appendChild(novaNotificacao)
//   document.getElementById('mensagens-detalhes').appendChild(novaNotificacaoDesc)
  
  
  }