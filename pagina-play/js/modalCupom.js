// Selecionar todos os modais e botões
const modals = document.querySelectorAll('.modal-container');
const closeButtons = document.querySelectorAll('.close');
const btnsCupom = document.querySelectorAll('.btn-cupom');

// Função para abrir o modal
function openModal(modalId) {
    const modal = document.querySelector(modalId);
    if (modal) {
        modal.style.display = 'block'; // Exibe o modal
        document.body.classList.add('no-scroll'); // Desabilita o scroll
    }
}

// Função para fechar o modal
function closeModalFunc() {
    modals.forEach(modal => {
        modal.style.display = 'none'; // Esconde todos os modais
    });
    document.body.classList.remove('no-scroll'); // Reabilita o scroll
}

// Adiciona eventos aos botões
btnsCupom.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const targetModal = e.target.getAttribute('data-target'); // Obtém o ID do modal
        openModal(targetModal);
    });
});

// Adiciona eventos para fechar o modal
closeButtons.forEach(button => {
    button.addEventListener('click', closeModalFunc);
});

// Fecha o modal se clicar fora da área de conteúdo
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-container')) {
        closeModalFunc();
    }
});
