function editarDados(id) {
  window.location.href =
    "../../check-vistoria-adm/check-vistoria.html?id=" + id;
}

function pegarIdUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}
const uid = pegarIdUrl();
acharDoacaoUrl(uid);

function acharDoacaoUrl(uid) {
  const userRef = firebase.database();
  userRef
    .ref("users")
    .once("value")
    .then((childSnapshot) => {
      childSnapshot.forEach((snapshot) => {
        console.log(snapshot.key);
        userRef
          .ref(`users/${snapshot.key}/peças/${uid}`)
          .once("value")
          .then((snapshot) => {
            if (snapshot.exists()) {
              var Dados = snapshot.val();
              mostrarDados(Dados);
            } else {
              console.log("tem nao amigo");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });

  // userRef.orderByChild('peças').equalTo(`${uid}`).once('value').then((snapshot) => {
  //     if(snapshot.exists()){
  //         console.log(snapshot.val())
  //     }else{
  //         console.log('amigo nao tem nada')
  //     }

  // }).catch((error) => {
  //     console.log(error)
  // })
}

function mostrarDados(data) {
  document.getElementById("nome-placeholder").value = data.nome;
  document.getElementById("email-placeholder").value = data.email;
  document.getElementById('telefone-placeholder').innerHTML = data.tel
  document.getElementById("tipo-placeholder").innerText = data.tipo;
  document.getElementById("tipo-placeholder").value = data.tipo;
  document.getElementById("qtd-placeholder").value = data.qtd;
  document.getElementById("search").value = data.nome_peca;
  document.getElementById("descricao-peca").value = data.desc;
}

const form = {
  nome: () => document.getElementById("nome-placeholder").value,
  email: () => document.getElementById("email-placeholder").value,
  Peca: () => document.getElementById("search").value,
  Qtd_peca: () => document.getElementById("qtd-placeholder").value,
  tipo_componente: () => document.getElementById("tipo-componente").value,
  data_doacao: () => document.getElementById("data_doacao").value,
  hora_doacao: () => document.getElementById("hora_doacao").value,
  desc_doacao: () => document.getElementById("descricao-peca").value,
};

function atualizarVistoria() {
  const userRef = firebase.database().ref("users");
  userRef.once("value").then((childSnapshot) => {
    childSnapshot.forEach((snapshot) => {
      const pieceRef = userRef.child(`${snapshot.key}/peças/${uid}`);
      pieceRef.once("value").then((snapshot) => {
        if (snapshot.exists()) {
          pieceRef
            .update({
              nome_peca: form.Peca(),
              nome: form.nome(),
              email: form.email(),
              qtd: form.Qtd_peca(),
              tipo: form.tipo_componente(),
              vistoria: "Realizada",
              desc: form.desc_doacao(),
            })
            .then(() => {
              console.log("Atualizado com sucesso!");
              encontrarPerfilComPeca()
            })
            .catch((error) => {
              console.error("Erro ao atualizar:", error);
            });
        } else {
          console.log("ta aqui nao");
        }
      });
    });
  });
}

function encontrarPerfilComPeca() {
  const usersRef = database.ref("users"); // Referência ao nó 'users'
  console.log(uid);

  usersRef
    .once("value")
    .then((snapshot) => {
      let perfilEncontrado = null;

      snapshot.forEach((userSnapshot) => {
        const userData = userSnapshot.val();
        
        // Verifica se o usuário possui a peça com o uid especificado
        if (userData.peças && userData.peças[uid]) {
          perfilEncontrado = {
            id: userSnapshot.key,
            ...userData // Inclui os dados do usuário
          };

          // Incrementa 500 pontos no campo 'pontos'
          const userRef = database.ref('users/' + userSnapshot.key + '/pontos');
          userRef.transaction(currentPoints => {
            return (currentPoints || 0) + mostrarValor()*form.Qtd_peca(); // Incrementa 500, assume 0 se não existir
          })
          .then(() => {
            console.log("500 pontos adicionados ao perfil:", perfilEncontrado.nome);
            mostrarPopupAdicionando()
          })
          .catch((error) => {
            console.error("Erro ao incrementar pontos:", error);
          });
        }
      });

      if (perfilEncontrado) {
        console.log("Perfil encontrado:", perfilEncontrado);
      } else {
        console.log("Nenhum perfil encontrado com a peça:", uid);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar usuários:", error);
    });
}
function mostrar() {
  console.log(form.Peca());
  console.log(form.Qtd_peca());
  console.log(form.data_doacao());
  console.log(form.desc_doacao());
  console.log(form.email());
  console.log(form.hora_doacao());
  console.log(form.nome());
  console.log(form.tipo_componente());
}

function mostrarValor(){
  const input = document.getElementById('search').value;
  const options = document.querySelectorAll('#Pecas option');
  let valorEncontrado = null;

  options.forEach(option => {
      if (input === option.value) {
          valorEncontrado = option.textContent;
          return valorEncontrado // Retorna a quantidade em ramcoins
      }
  });

  if (valorEncontrado) {
       console.log(`O valor para "${input}" é: ${valorEncontrado} ramcoins.`);
       return valorEncontrado

  } else {
      console.log('Componente não encontrado.');
  }
}

function mostrarPopupAdicionando() {
  const popup = document.getElementById("doacao_add");
  // Faz o pop-up deslizar para baixo
  popup.style.top = "100px"; // Ajuste a posição conforme necessário

  // Após 3 segundos, faz o pop-up deslizar de volta para cima
  setTimeout(() => {
    popup.style.top = "-120px"; // Volta para fora da tela
  }, 3000); // 3000 milissegundos = 3 segundos
}
