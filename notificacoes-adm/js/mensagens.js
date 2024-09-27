// Função para exibir os detalhes da mensagem



function showDetails(index) {
  const details = document.getElementById("mensagem");
  
  usersRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
  
  
  
      // ...
    });
  });

   if (index === 'Metal Gear') {
     details.style.display = "block"; // Exibe o conteúdo da primeira mensagem
   }
   else{
     details.style.display = "none";
   }
    

  //slc parça

}

