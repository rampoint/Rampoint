function onchangeEmail(){
    console.log(form.email)
}

const form = {
  email: () => document.getElementById("Email").value,
  senha: () => document.getElementById("senha").value,
  confirmarSenha: () => document.getElementById("confirmarSenha").value,
  telefone: () => document.getElementById("telefone").value,
  data: () => document.getElementById("data").value,
  erro_email_register: () => document.getElementById("erro-email-register"),
  erro_data: () => document.getElementById('erro-data'),
  erro_senha_register: () => document.getElementById("erro-senha-register"),
  erro_senha_obrigatorio: () => document.getElementById("erro-senha-obrigatorio"),
  erro_nao_corresponde: () => document.getElementById("erro-nao-corresponde")

};
