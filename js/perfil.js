
const querySnapshot = await getDocs(collection(db, "usuario_login"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

const form = {
    nome: () => document.getElementById("nome_usuario"),
    email: () => document.getElementById("email_usuario"),
    emocao_usuario: () =>  document.getElementById("emocao_usuario"),
    pontos: () => document.getElementById("pontos_usuario")
}

