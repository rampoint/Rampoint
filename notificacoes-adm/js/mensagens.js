function showDetails(index) {
  const details = document.getElementById("mensagem");

  usersRef.once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      // ...
    });
  });

  if (index === "Metal Gear") {
    details.style.display = "block";
  } else {
    details.style.display = "none";
  }
}