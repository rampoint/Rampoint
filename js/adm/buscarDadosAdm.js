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
              const p1 = document.createElement('p'); // Cria um novo item de lista
              const p2 = document.createElement('p')
              const p3 = document.createElement('p')
              console.log(userData)
              firebase.database().ref('users'+childSnapshot.key+"peças")
              p1.textContent = `Nome: ${userData.nome}`; // Ajuste conforme seus campos
              p2.textContent = `E-mail: ${userData.email}`
              p3.textContent = `Telefone: ${userData.tel}`
              
              userList.appendChild(p1); // Adiciona o item à lista
              userList.appendChild(p2)
              userList.appendChild(p3)

              firebase.database().ref('users/'+childSnapshot.key+"/peças").once('value').then((snapshot) => {
                
                snapshot.forEach((childSnapshot) => {
                  const p4 = document.createElement('p')
                  const nome_peça = childSnapshot.val()
                  console.log(nome_peça)
                   p4.textContent = `Peças Doadas: ${childSnapshot.key}, Qtd: ${nome_peça.qtd}`
                  userList.appendChild(p4)
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