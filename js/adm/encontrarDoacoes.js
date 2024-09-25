const formAdd = {
    nome_peca: () => document.getElementById("nome-peca").innerHTML,
    estrutura: () => document.getElementById("tipo-estrutura").innerHTML,
    email_doador: () => document.getElementById("nome-doador").innerHTML,
    nome_doador: () => document.getElementById("email-doador").innerHTML,
    qtd: () => document.getElementById("email-doador").innerHTML,
    vistoria: () => document.getElementById('status').innerHTML

}

const usersRef = database.ref('users')

usersRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
         
        var id = childSnapshot.key;
        const usersChild = database.ref('users/'+id+'/peças')

        usersChild.once('value', (snapshot) => {
         if(snapshot.exists()){    
            snapshot.forEach((childSnapshot) =>{
                var nome_pecas = childSnapshot.key
                var dataPeca = childSnapshot.val()
                
                criarTabela(nome_pecas, dataPeca.tipo,dataPeca.email,dataPeca.nome,dataPeca.qtd,dataPeca.vistoria)
                console.log(id)
                console.log(nome_pecas)
                console.log(dataPeca)

            }) 
          
         }
        })
        
    })
})

function criarTabela(nome_peca,estrutura,email_doador,nome_doador,qtd,vistoria){
    const novaLinha = document.createElement('tr');
    
    novaLinha.innerHTML = `
        <td>
            <div class="peca">
                <img src="./img/gabinete.svg" id="gabinete" alt="Imagem de um gabinete">
                <p class="nome-peca">${nome_peca}</p>
            </div>
        </td>
        <td>
            <button class="tipo-estrutura">${estrutura}</button>
        </td>
        <td><p class="nome">${nome_doador}</p></td>
        <td><p class="email">${email_doador}</p></td>
        <td><p class="qtd-total">${qtd}</p></td>
        <td>
            <button class="vistoria-pendente">
                <img src="./img/pendente.svg" alt="">
                ${vistoria}
            </button>
        </td>
        <td>
            <button class="opcoes" onclick="openModal('optionsModal')">
                <img src="./img/more.svg" alt="Mais opções">
            </button>

            <!-- Modal Principal -->
            <div id="optionsModal" class="modal">
                <div class="modal-content">
                    <ul>
                        <li><button class="modal-button edit-button" onclick="editOption()"><img src="./img/icon-editar.svg" alt="">Editar</button></li>
                        <li><button class="modal-button delete-button" onclick="openDeleteConfirmModal('deleteConfirmModal')"><img src="./img/icon-deletar.svg" alt="">Excluir</button></li>
                    </ul>
                </div>
            </div>
        </td>`;

    // Adiciona a nova linha ao corpo da tabela
    document.getElementById('tbody').appendChild(novaLinha);

}