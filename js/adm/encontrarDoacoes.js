const usersRef = database.ref('users')

usersRef.once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
         
        var id = childSnapshot.key;
        const usersChild = database.ref('users/'+id+'/peças')

        usersChild.once('value', (snapshot) => {
            if(snapshot.exists()){
          var data = snapshot.val()
          console.log(id)
          console.log(data)
        }
        })
        
    })
})