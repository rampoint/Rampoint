 const userRef = database.ref('users')

 const dbRef = firebase.database().ref('users/1');
    dbRef.on("value", (snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    const data = snapshot.val()
    document.getElementById("dados").innerHTML = data
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


