const usersRef = database.ref("users");
const formDoacoes = {
  email: () => document.getElementById("email-add").value,
  Peça: () => document.getElementById('search').value
};

function adicionarDoacao(){
usersRef.orderByChild("email").equalTo('sergio@gmail.com').once('value', (snapshot) =>{
    
    if (snapshot.exists()){
        // O email foi encontrado
        snapshot.forEach((childSnapshot) => {
          const userId = childSnapshot.key; // ID do usuário encontrado

          // Atualiza ou adiciona dados dentro do nó do usuário
          childSnapshot.ref.child('peças/' + formDoacoes.Peça()).update({
            Marca:'ramx',
            memoria:'16gb',
            // Atualiza o novo campo com o novo valor
          })
          .then(() => {
            console.log('Dados atualizados com sucesso!');
          })
          .catch((error) => {
            console.error('Erro ao atualizar os dados:', error);
          });
        }


    )}});
}