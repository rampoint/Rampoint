// Função para abrir o modal principal
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

// Função para fechar o modal principal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Função para abrir o modal de confirmação de exclusão
function openDeleteConfirmModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

// Função para fechar o modal de confirmação de exclusão
function closeDeleteConfirmModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Função para confirmar a exclusão
function confirmDelete() {
  // Adicione aqui a lógica para confirmar a exclusão
  alert('Exclusão confirmada');
}

// Adiciona event listeners para fechar os modais quando clicar fora deles
window.addEventListener('click', function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      closeModal(modal.id);
      closeDeleteConfirmModal(modal.id);
    }
  });
});
