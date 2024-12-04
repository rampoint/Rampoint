// Referência para a coleção de usuários

function pesquisarUsuario() {
  const usersRef = database.ref('users'); // Referência para a coleção de usuários
  const email = formHistorico.email()

  usersRef.orderByChild('email').equalTo(email).once('value', (snapshot) => {
      const userList = document.getElementById('dados');
      userList.innerHTML = ''; // Limpa a lista anterior

      if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
              const userData = childSnapshot.val(); // Obtém os dados do usuário
              
              console.log(userData)
              firebase.database().ref('users'+childSnapshot.key+"peças")
              firebase.database().ref('users/'+childSnapshot.key+"/peças").once('value').then((snapshot) => {
                
                snapshot.forEach((childSnapshot) => {
                  const nome_peça = childSnapshot.val()
                  console.log(nome_peça)
                  const p1 = document.createElement('div'); // Cria um novo item de lista
              p1.setAttribute('id', 'coluna_dados')
              p1.innerHTML = `<div id="nome_doador">
                            <p style="color: grey;">Nome:<b style="color: black;">${nome_peça.nome}</b> </p>
                        </div>
                        <div id="coluna_email">
                            <p style="color: grey;">Email: <b style="color: black;">${nome_peça.email}</b></p>
                        </div>
                        <div id="coluna_telefone">
                            <p style="color: grey;">Tel: <b style="color: black;">${nome_peça.tel}</b></p>
                        </div>
                   <div id="coluna_peca">
                            <p style="color: grey;">Peça: <b style="color: black;">${nome_peça.nome_peca}</b></p>
                        </div>
                        <div id="coluna_tipo">
                            <p style="color: grey;">Tipo: <b style="color: black;">${nome_peça.tipo}</b></p>
                        </div>
                        <div id="coluna_data">
                            <p style="color: grey;">Data: <b style="color: black;">${nome_peça.data}</b></p>
                        </div>
                        <div id="coluna_hora">
                            <p style="color: grey;">Hora: <b style="color: black;">${nome_peça.hora_doacao}</b></p>
                        </div>
                        <div id="coluna_qtd">
                            <p style="color: grey;">Qts: <b style="color: black;">${nome_peça.qtd}</b></p>
                        </div>`


                  userList.appendChild(p1)
                })
                
              })
              
          });
      } else {
          const li = document.createElement('li');
          li.textContent = 'Nenhum usuário encontrado.';
          userList.appendChild(li);
      }
  });
}



//form para pegar dados
const formHistorico = {
  nome: () => document.getElementById('nomeHistorico').value,
  email: () => document.getElementById('emailHistorico').value,
  tel: () => document.getElementById('telHistorico').value
}