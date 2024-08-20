function onchangeEmail() {
  const email = Form.email().value;
  Form.erro_email_obrigatorio().style.display = email ? "none" : "block";

  Form.erro_email_register().style.display = validarEmail(email)
    ? "none"
    : "block";
}

function onchangePassword() {
  const senha = Form.senha().value;
  Form.erro_senha_register().style.display = senha ? "none" : "block";

  Form.erro_senha_min().style.display = senha.length >= 6 ? "none" : "block";

  validarSenhaCorresponde();
}

function onchangePasswordConfirm() {
  validarSenhaCorresponde();
}

function validarSenhaCorresponde() {
  const senha = Form.senha().value;
  const confirmarSenha = Form.confirmarSenha().value;

  Form.erro_nao_corresponde().style.display =
    senha == confirmarSenha ? "none" : "block";
}

function botaoDesativar() {
  Form.cadastrar_button().disable = !isFormValid();
}

function isFormValid() {
   const email = Form.email().value
   if (!email || !ValidarEmail()){return false;}
  const senha = Form.senha().value;
  if (!senha || senha.length <= 5) {return false;}
   const confirmarSenha = Form.confirmarSenha().value
    if (senha != confirmarSenha){return false;}

  return true;
}

function ValidarEmail() {
  return /\S+@\S+\.\S+/.test(Form.email().value);
}
const Form = {
  email: () => document.getElementById("email-cadastro"),
  senha: () => document.getElementById("senha-cadastro"),
  confirmarSenha: () => document.getElementById("confirmarSenha"),
  telefone: () => document.getElementById("telefone"),
  data: () => document.getElementById("data"),
  erro_email_register: () => document.getElementById("erro-email-register"),
  erro_data: () => document.getElementById("erro-data"),
  erro_email_obrigatorio: () =>document.getElementById("erro-email-obrigatorio"),
  erro_senha_min: () => document.getElementById("erro-senha-min"),
  erro_senha_register: () => document.getElementById("erro-senha-register"),
  erro_senha_obrigatorio: () =>document.getElementById("erro-senha-obrigatorio"),
  erro_nao_corresponde: () => document.getElementById("erro-nao-corresponde"),
  cadastrar_button: () => document.getElementById("cadastrar"),
};
