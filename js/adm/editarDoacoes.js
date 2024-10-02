function excluirDoacao(id){
    usersRef.child(id).remove().then(() =>{
        var doacao = document.getElementById(id)
        Clipboard.remove()
    }) 
    
}