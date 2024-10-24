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
    // document.getElementById('telefone-placeholder').placeholder = data.tel
    document.getElementById("tipo-placeholder").innerHTML = data.tipo;
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
      pieceRef.once('value').then((snapshot) => {
        if(snapshot.exists()){
        pieceRef.update({
          nome_peca: form.Peca(),
          nome: form.nome(),
          email: form.email(),
          qtd: form.Qtd_peca(),
          tipo: form.tipo_componente(),
          vistoria:'Realizada',
          desc: form.desc_doacao(),
        })
        .then(() => {
          console.log('Atualizado com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao atualizar:', error);
        })}else{
          console.log('ta aqui nao')
        }
      })
      
    });
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