const modal = document.getElementById('modal-excluir');
const btnExcluir = document.querySelector('.btn-excluir');
const closeModal = document.querySelector('.close');
const btnCancelar = document.getElementById('cancelar-excluir');

btnExcluir.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

btnCancelar.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
