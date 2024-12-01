function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0"); // Pega o dia e adiciona zero à esquerda se necessário
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Pega o mês (0-11) e adiciona 1
  const ano = data.getFullYear(); // Pega o ano completo

  return `${dia}/${mes}/${ano}`; // Retorna a data no formato dd/mm/yyyy
}

// Obtém a data atual do computador
const dataAtual = new Date();
// Formata a data
const dataFormatada = formatarData(dataAtual);
// Exibe a data na tela

const Form = {
  email: () => document.getElementById("email-cadastro"),
  senha: () => document.getElementById("senha-cadastro"),
  nome: () => document.getElementById("Nome"),
  telefone: () => document.getElementById("telefone"),
  genero: () => document.getElementById("genero"),
  confirmarSenha: () => document.getElementById("confirmarSenha"),
  data: () => document.getElementById("data-cadastro"),
  erro_email_register: () => document.getElementById("erro-email-register"),
  erro_data: () => document.getElementById("erro-data"),
  erro_email_obrigatorio: () =>
    document.getElementById("erro-email-obrigatorio"),
  erro_senha_min: () => document.getElementById("erro-senha-min"),
  erro_senha_register: () => document.getElementById("erro-senha-register"),
  erro_senha_obrigatorio: () =>
    document.getElementById("erro-senha-obrigatorio"),
  erro_nao_corresponde: () => document.getElementById("erro-nao-corresponde"),
  cadastrar_button: () => document.getElementById("cadastrar"),
  cep: () => document.getElementById("cep"),
};

const form_usuario = {
  nome_perfil: () => document.getElementById("nome_usuario"),
  email_perfil: () => document.getElementById("email_usuario"),
  emocao_usuario: () => document.getElementById("emocao_usuario"),
  pontos: () => document.getElementById("pontos_usuario"),
  foto_perfil: () => document.getElementById("foto-usuario"),
};

function mudandoBotao(mensagem) {
  Form.cadastrar_button().innerHTML = mensagem;
}

function getErrorMessage(error) {
  if (error.code === "auth/email-already-in-use") {
    return "Usuário já está registrado";
  }
  return error.message;
}

function validarEmail_cadastro() {
  return /\S+@\S+\.\S+/.test(Form.email().value);
}

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const mesNascimento = dataNascimento.getMonth();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())
  ) {
    idade--;
  }
  return idade;
}

// User Registration
function register() {
  const email = Form.email().value;
  const senha = Form.senha().value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      mudandoBotao("Cadastrando...");
      let uid = userCredential.user.uid;
      saveUserData(uid, email);
      setTimeout(() => {
        window.location.href = "../pagina-inicialLogado/inicial-logado.html";
      }, 3000);
    })
    .catch((error) => {
      mudandoBotao("Cadastrar");
      alert(getErrorMessage(error));
    });
}

function saveUserData(uid, email) {
  const nome = Form.nome().value;
  const telefone = Form.telefone().value;
  const dataNascimento = Form.data().value;
  const genero = Form.genero().value;
  const database = firebase.database();
  const cep = Form.cep().value;
  const userRef = database.ref("users/" + uid);

  userRef
    .set({
      email: email,
      nome: nome,
      data: dataNascimento,
      tel: telefone,
      genero: genero,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      cep: cep,
      pontos: 0,
      dataCriacao: dataFormatada,
    })
    .then(() => {
      console.log("Dados do usuário salvos com sucesso!");
    })
    .catch((error) => {
      console.log("Erro ao salvar dados do usuário:", error);
    });
}

// Form Validation
function onchangeEmail() {
  const email = Form.email().value;
  Form.erro_email_obrigatorio().style.display = email ? "none" : "block";
  Form.erro_email_register().style.display = validarEmail_cadastro(email)
    ? "none"
    : "block";
  botaoDesativar();
}

function onchangePassword() {
  const senha = Form.senha().value;
  Form.erro_senha_register().style.display = senha ? "none" : "block";
  Form.erro_senha_min().style.display = senha.length >= 6 ? "none" : "block";
  botaoDesativar();
  validarSenhaCorresponde();
}

function onchangePasswordConfirm() {
  validarSenhaCorresponde();
  botaoDesativar();
}

function validarSenhaCorresponde() {
  const senha = Form.senha().value;
  const confirmarSenha = Form.confirmarSenha().value;
  Form.erro_nao_corresponde().style.display =
    senha === confirmarSenha ? "none" : "block";
}

function botaoDesativar() {
  Form.cadastrar_button().disabled = !isFormValid();
}

function isFormValid() {
  const email = Form.email().value;
  const senha = Form.senha().value;
  const confirmarSenha = Form.confirmarSenha().value;

  return (
    email &&
    validarEmail_cadastro() &&
    senha &&
    senha.length > 5 &&
    senha === confirmarSenha &&
    VerificarData()
  );
}

function VerificarData() {
  const dataNascimento = new Date(Form.data().value);
  const idade = calcularIdade(dataNascimento);
  const resultado = document.getElementById("erro-data-18");
  if (idade < 15) {
    resultado.style.display = "block";
    return false;
  } else {
    resultado.style.display = "none";
    return true;
  }
}

// User Data Management
let globalUserId = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    globalUserId = user.uid;
    localStorage.setItem('idUsuario', globalUserId)
    buscarDadosUsuario(user.uid);
    

  } else {
    console.log("Nenhum usuário logado.");
  }
});

const uid = localStorage.getItem('idUsuario')

function buscarDadosUsuario(globalUserId) {
  const dbRef = firebase.database().ref("users/" + globalUserId);

  dbRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const dadosUsuario = snapshot.val();
        exibirDadosUsuario(dadosUsuario);
      }
    })
    .catch((error) => {
      console.log("Erro ao buscar dados do usuário:", error);
    });
}

function exibirDadosUsuario(users) {
  // Obtém a URL atual da página
  var currentPage = window.location.href;
  // Verifica se a URL contém uma string específica
  if (currentPage.includes("/pagina-perfil/")) {

    try {
      document.getElementById("fotoPerfilMobile").src = users.fotoPerfil.fotoPerfil
        users.fotoPerfil.cor_texto;
    } catch (error) {
      console.log("Erro ao definir cor do texto da emoção:", error.message);
    }
    try {
      document.getElementById("nome_usuario").innerHTML = users.nome;
    } catch (error) {
      console.log("Erro ao definir cor do texto da emoção:", error.message);
    }
    try {
      document.getElementById("email_usuario").innerHTML = users.email;
    } catch (error) {
      console.log("Erro ao definir cor do texto da emoção:", error.message);
    }

    try {
      document.getElementById("emocao_usuario").style.color =
        users.fotoPerfil.cor_texto;
    } catch (error) {
      console.log("Erro ao definir cor do texto da emoção:", error.message);
    }
    try {
      document.getElementById("emocao_usuario").innerHTML =
        users.fotoPerfil.fotoMensage;
    } catch (error) {
      console.log("Erro ao definir mensagem da emoção:", error.message);
    }
    try {
      document.getElementById("foto-perfil").src = users.fotoPerfil.fotoPerfil;
    } catch (error) {
      console.log("Erro ao definir a foto do perfil:", error.message);
    }

    try {
      document.getElementById("perfil").src = users.fotoPerfil.fotoPerfil;
    } catch (error) {
      console.log("Erro ao definir a imagem do perfil:", error.message);
    }

    document.getElementById("nome-mudar").placeholder = users.nome;
    document.getElementById("email-mudar").placeholder = users.email;
    document.getElementById("telefone-mudar").placeholder = users.tel;
    document.getElementById("nome-mudar").value = users.nome;
    try {
      document.getElementById("foto-usuario").src = users.fotoPerfil.fotoPerfil;
    } catch (error) {
      console.log("Erro ao definir a foto do usuário:", error.message);
    }

    try {
      document.getElementById("foto_mudar").src = users.fotoPerfil.fotoPerfil;
    } catch (error) {
      console.log("Erro ao definir a foto para mudar:", error.message);
    }
    document.getElementById("email-mudar").value = users.email;
    document.getElementById("telefone-mudar").value = users.tel;
    try {
      document.getElementById("nome_modal").style.color =
        users.fotoPerfil.cor_texto;
    } catch (error) {
      console.log("Erro ao definir cor do nome no modal:", error.message);
    }
    document.getElementById("nome_modal").innerHTML = users.nome;
    try {
      document.getElementById("content-sem-perfil").style.backgroundColor =
        users.fotoPerfil.cor_foto;
    } catch (error) {
      console.log(
        "Erro ao definir cor de fundo do conteúdo sem perfil:",
        error.message
      );
    }
    document.getElementById("nome_modal").innerHTML = users.nome;
    document.getElementById("genero-mudar").value = users.genero;
    try {
      document.getElementById("container-perfil").style.boxShadow =
        users.fotoPerfil.cor_texto_fundo;
    } catch (error) {
      console.log(
        "Erro ao definir boxShadow do container de perfil:",
        error.message
      );
    }
    document.getElementById("pontos_usuario").innerHTML = users.pontos;
    try {
      const containerConquistas = document.getElementsByClassName(
        "container-conquistas"
      )[0];
      if (containerConquistas) {
        // Verifica se o elemento existe
        containerConquistas.style.boxShadow = users.fotoPerfil.cor_texto_fundo;
      }
    } catch (error) {
      console.log("Erro ao definir boxShadow das conquistas:", error.message);
    }

    try {
      document.getElementById("medalha-azul-img").src = users.medalhas.azul.img;
    } catch (error) {
      console.log("Erro ao definir imagem da medalha azul:", error.message);
    }

    try {
      document.getElementById("medalha-azul").style.display =
        users.medalhas.azul.display;
    } catch (error) {
      console.log("Erro ao exibir medalha azul:", error.message);
    }

    try {
      document.getElementById("lista-medalhas-vermelha").style.display =
        users.medalhas.vermelha.display;
    } catch (error) {
      console.log("Erro ao exibir medalha azul:", error.message);
    }
    pegarMedalhas()
    pegarCupons()

  } else {
    try {
      document.getElementById("nome_modal").innerHTML = users.nome;
    } catch (error) {
      console.log("Erro ao exibir medalha azul:", error.message);
    }
    try {
      document.getElementById("content-sem-perfil").style.backgroundColor =
      users.fotoPerfil.cor_foto;
    } catch (error) {
      console.log("Erro ao exibir medalha azul:", error.message);
    }try {
      document.getElementById("perfil").src = users.fotoPerfil.fotoPerfil;
    } catch (error) {
      console.log("Erro ao exibir medalha azul:", error.message);
    }try {
      document.getElementById("foto-perfil").src = users.fotoPerfil.fotoPerfil;
    } catch (error) {
      console.log("Erro ao exibir medalha azul:", error.message);
    }try {
      document.getElementById("nome_modal").style.color =
      users.fotoPerfil.cor_texto;
    } catch (error) {
      console.log("Erro ao exibir medalha azul:", error.message);
    }
    const imagemPerfil = document.querySelector('#perfil-sidebar img'); // Seleciona a imagem dentro do elemento com id 'perfil-sidebar'
    if (imagemPerfil) {
        imagemPerfil.src = users.fotoPerfil.fotoPerfil; // Altera o atributo src da imagem
    }




  }
}


function pegarMedalhas(){
  firebase.database().ref(`users/${uid}/peças`).once('value', (snapshot) => {
    const count = snapshot.numChildren();
    console.log(count)
    if(count == 1){
      adicionarMedalhaSalto()
    } else if(count >= 3){
      adicionarMedalhaRaio()
      adicionarMedalhaSalto() 
    }

    })

    firebase.database().ref(`users/${uid}`).once('value', (snapshot) => {
      const pontos = snapshot.val().pontos;
      console.log(pontos)
      if(pontos > 1900){
        adicionarMedalhaEletronica()
      }
      })
    adicionarMedalhaCoracao()
  }

function adicionarMedalhaEletronica(){
  var li = document.createElement('li')
  li.classList.add('conjunto-medalhas')
  li.setAttribute('id', 'medalha-roxa')

  li.innerHTML = `
      <img id="medalha-img" src="./../pagina-perfil/img/medalha roxa.svg" alt="">
       <div class="lista-textos">
        <p class="titulo-medalha-roxa">Explosão Eletrônica</p>
         <p class="meta-medalha-roxa" >Atinja 2000 ramcoins</p>
         </div>
         </li>
      `

document.getElementById('lista-medalhas').appendChild(li)
}
 
function adicionarMedalhaSalto(){
  var li = document.createElement('li')
  li.classList.add('conjunto-medalhas')
  li.setAttribute('id', 'medalha-verde')

  li.innerHTML = `
      <img id="medalha-img" src="./../pagina-perfil/img/medalha verde.svg" alt="">
       <div class="lista-textos">
        <p class="titulo-medalha-verde">Salto Tecnológico</p>
         <p class="meta-medalha-verde" id="medalha-verde-frase" >Doe uma vez</p>
         </div>
         </li>
      `

document.getElementById('lista-medalhas').appendChild(li)
}

function adicionarMedalhaRaio(){
  var li = document.createElement('li')
  li.classList.add('conjunto-medalhas')
  li.setAttribute('id', 'medalha-amarelo')

  li.innerHTML = `
      <img id="medalha-img" src="../pagina-perfil/img/medalha amarela.svg" alt="">
       <div class="lista-textos">
        <p class="titulo-medalha-amarela">Raio da esperança</p>
         <p class="meta-medalha-amarela">Doe 3 vezes</p>
         </div>
         </li>
      `

document.getElementById('lista-medalhas').appendChild(li)
}

function adicionarMedalhaCoracao(){
  firebase.database().ref('users/'+globalUserId+'/cupons').once('value').then((snapshot) => {
    if(snapshot.exists()){
      const userRef = firebase.database().ref("users/" + globalUserId);
      userRef
        .child("medalhas/vermelha")
        .set({
          display: "flex",
        })
        .then(() => {
          
        })
        .catch((error) => {
          console.log("Error:" + error);
        });
    }else{
      console.log('não tem cupom')
    }
  })
}

function mudarDados() {
  const nome_mudanca = document.getElementById("nome-mudar").value;
  const telefone_mudanca = document.getElementById("telefone-mudar").value;
  const genero_mudanca = document.getElementById("genero-mudar").value;
  const userRef = firebase.database().ref("users/" + globalUserId);
  userRef
    .update({
      nome: nome_mudanca,
      tel: telefone_mudanca,
      genero: genero_mudanca,
    })
    .then(() => {
      mostrarPopupAlteracao();
      adicionarMedalhas();
    });
}

function adicionarMedalhas() {

  firebase.database().ref('users/'+globalUserId+'/medalhas').once('value').then((snapshot) => {
    if(!snapshot.exists()){
      const userRef = firebase.database().ref("users/" + globalUserId);
      userRef
        .child("medalhas/azul")
        .set({
          nome: "Engrenagem Solidária",
          display: "flex",
          descricao: "Personalizou perfil",
          img: "https://firebasestorage.googleapis.com/v0/b/rampoint-81352.appspot.com/o/medalhas%2Fmedalha%20azul.svg?alt=media&token=c7134715-8121-44cb-9823-9a013761513d",
        })
        .then(() => {
          setTimeout(() => {
            mostrarPopupMedalhaAzul(); // Volta para fora da tela
          }, 3000);
        })
        .catch((error) => {
          console.log("Error:" + error);
        });
    }else{
      console.log('ja tem medalha')
    }
  })

  
}

function apagandoUsuario() {
  const user = firebase.auth().currentUser;

  user
    .delete()
    .then(() => {
      alert("apagado");
      logout();
    })
    .catch((error) => {
      alert("nao apagado" + error.code);
      // ...
    });

  const userRef = firebase.database().ref("users/" + globalUserId);

  userRef
    .remove()
    .then(() => {
      alert("Excluido");
    })
    .catch((error) => {
      alert("conta nao excluida");
    });
}

function mostrarPopupAlteracao() {
  const popup = document.getElementById("alteracao_popup");

  // Faz o pop-up deslizar para baixo
  popup.style.top = "20px"; // Ajuste a posição conforme necessário

  // Após 3 segundos, faz o pop-up deslizar de volta para cima
  setTimeout(() => {
    popup.style.top = "-120px"; // Volta para fora da tela
  }, 3000); // 3000 milissegundos = 3 segundos
}
function mostrarPopupMedalhaAzul() {
  const popup = document.getElementById("alteracao_popup_azul");

  // Faz o pop-up deslizar para baixo
  popup.style.top = "180px"; // Ajuste a posição conforme necessário

  // Após 3 segundos, faz o pop-up deslizar de volta para cima
  setTimeout(() => {
    popup.style.top = "-120px"; // Volta para fora da tela
  }, 3000); // 3000 milissegundos = 3 segundos
}
