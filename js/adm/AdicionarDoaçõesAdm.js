const usersRef = database.ref("users");
const formDoacoes = {
  nome: () => document.getElementById("nome-add").value,
  email: () => document.getElementById("email-add").value,
  Peca: () => document.getElementById('search').value,
  Qtd_peca: () => document.getElementById('qtd_peca').value,
  tipo_componente: () => document.getElementById('tipo-componente').value,
  data_doacao: () => document.getElementById('data_doacao').value,
  hora_doacao: () => document.getElementById('hora_doacao').value,
  desc_doacao: () => document.getElementById('descricao-peca').value
};

function adicionarDoacao() {
  usersRef.orderByChild("email").equalTo(formDoacoes.email()).once('value', (snapshot) => {
    console.log(formDoacoes.email())
    if (snapshot.exists()) {
      // O email foi encontrado
      snapshot.forEach((childSnapshot) => {
        const userId = childSnapshot.key; // ID do usuário encontrado
        const data = childSnapshot.val()
        console.log(data)
        // Atualiza ou adiciona dados dentro do nó do usuário
        childSnapshot.ref.child('peças/' + formDoacoes.Peca()).set({
        nome:formDoacoes.nome(),
        email:formDoacoes.email(),
        qtd: formDoacoes.Qtd_peca(),
        tipo: formDoacoes.tipo_componente(),
        data:formDoacoes.data_doacao(),
        hora_doacao:formDoacoes.hora_doacao(),
        desc:formDoacoes.desc_doacao(),
        vistoria:'Pendente'
          // Atualiza o novo campo com o novo valor
        })
          .then(() => {
            alert('Dados atualizados com sucesso!');
          })
          .catch((error) => {
            alert('Erro ao atualizar os dados:', error);
          });
      }

 
      )
    }else{
      alert("Email não encontrado")
    }
  });
}