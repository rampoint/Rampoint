
    function firebase() {
        
                //testando login
        console.log('antes')
        firebase.auth().signInWithEmailAndPassword("receba", "rampoint").then(response =>{
            window.alert('entrrooooouu',response)
        }).catch(error=>{
            window.alert('se fudeuuuuu',error)
        })
        console.log('depois')
    }



