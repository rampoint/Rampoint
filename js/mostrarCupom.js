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
              const nome_cupom = transformarString(data.nome_cupom)
              var containerCupom = document.createElement("li");
              containerCupom.classList.add("conjunto-cupons");
              containerCupom.innerHTML = `<img src="./img/${data.nome_cupom}.svg" alt="">
                                            <div class="lista-textos2">
                                                <p class="titulo-${data.nome_cupom}">CUPOM ${nome_cupom}</p>
                                                <p class="porcentagem-${data.nome_cupom}">${data.porcentagem}%</p>
            
                                            </div>
                                            <div class="area-excluir">
                                                <a href="${data.qrCode}" download class='bx bx-down-arrow-circle' style='color:#2a55c2'></a>
                                                <button onclick="excluircupom('${codigoCupom}')" class="btn-excluir">EXCLUIR</button>
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
              document
                .querySelector(".lista-cupons")
                .appendChild(containerCupom);
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

function excluircupom(cupom){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          globalUserId = user.uid;
          firebase
            .database()
            .ref("users/" + globalUserId + "/cupons/"+cupom).remove().then(() => {
                console.log('deleto amigo')
            }).catch((erro) => {
                console.log(erro)
            })
        }
    
})    
}