function pegarCupons() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      globalUserId = user.uid;
      firebase
        .database()
        .ref("users/" + globalUserId + "/cupons")
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
              var codigoCupom = childSnapshot.key;
              const data = childSnapshot.val();
              console.log(codigoCupom);
              console.log(data);
              const nome_cupom = transformarString(data.nome_cupom);
              var containerCupom = document.createElement("li");
              containerCupom.classList.add("conjunto-cupons");
              containerCupom.setAttribute("data-cupom", codigoCupom); // Adiciona um atributo para identificar o cupom
              containerCupom.innerHTML = `<img src="./img/${data.nome_cupom}.svg" alt="">
                                            <div class="lista-textos2">
                                                <p class="titulo-${data.nome_cupom}">CUPOM ${nome_cupom}</p>
                                                <p class="porcentagem-${data.nome_cupom}">${data.porcentagem}%</p>
                                            </div>
                                            <div class="area-excluir">
                                                <a href="${data.qrCode}" download class='bx bx-down-arrow-circle' style='color:#2a55c2'></a>
                                                <button onclick="excluircupom('${codigoCupom}', '${data.pontos}', this)" class="btn-excluir">EXCLUIR</button>
                                                <p class="mensagem-cupom">Cupom prestes à expirar</p>
                                            </div>
                                            <!-- Modal -->
                                            <div id="modal-excluir" class="modal-excluir">
                                                <div class="modal-content">
                                                    <span class="close">&times;</span>
                                                    <div class="linha-modal"></div>
                                                    <h2>Você tem certeza que deseja excluir o cupom?</h2>
                                                    <p>Seus pontos irão voltar para o perfil</p>
                                                    <button id="confirmar-excluir" class="btn-confirmar">Sim, excluir</button>
                                                    <button id="cancelar-excluir" class="btn-cancelar">Cancelar</button>
                                                </div>
                                            </div>`;
              document.querySelector(".lista-cupons").appendChild(containerCupom);
            });
          } else {
            console.log("amigo tem não");
          }
        });
    } else {
      console.log("Nenhum usuário logado.");
    }
  });
}

function transformarString(texto) {
  // Converte para maiúsculas
  let textoMaiusculo = texto.toUpperCase();
  // Substitui '-' por espaço
  let textoFormatado = textoMaiusculo.replace(/-/g, ' ');
  return textoFormatado;
}

function excluircupom(cupom, pontos, buttonElement) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const globalUserId = user.uid;

      // Remove o cupom
      firebase
        .database()
        .ref("users/" + globalUserId + "/cupons/" + cupom)
        .remove()
        .then(() => {
          console.log('Cupom deletado com sucesso.');

          // Remove o elemento da tela
          const liElement = buttonElement.closest(".conjunto-cupons"); // Encontra o elemento pai mais próximo
          if (liElement) {
            liElement.remove(); // Remove o elemento do DOM
          }
        })
        .catch((erro) => {
          console.error('Erro ao deletar cupom:', erro);
        });

      // Recupera os pontos do usuário
      firebase
        .database()
        .ref("users/" + globalUserId)
        .once('value')
        .then((snapshot) => {
          const pontosFirebase = snapshot.val().pontos;  
          const pontosSalvos = Number(pontosFirebase); // Converte para número
          
          // Verifica se a conversão foi bem-sucedida
          if (isNaN(pontosSalvos)) {
            console.error('Pontos existentes não são um número válido.');
            return; // Sai da função se a conversão falhar
          }
          
          const pontosAtualizado = pontosSalvos + Number(pontos); // Converte 'pontos' para número
          
          // Atualiza os pontos no banco de dados
          firebase
            .database()
            .ref("users/" + globalUserId)
            .update({ pontos: pontosAtualizado })
            .then(() => {
              console.log('Pontos atualizados:', pontosAtualizado);
            })
            .catch((error) => {
              console.error('Erro ao atualizar pontos:', error);
            });
        })
        .catch((error) => {
          console.error('Erro ao recuperar dados do usuário:', error);
        });
    }
  });
}