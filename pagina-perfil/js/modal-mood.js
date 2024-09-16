// Abrir modal ao clicar no ícone de lápis
document.getElementById('lapis').addEventListener('click', function() {
    document.getElementById('mudar-mood').style.display = 'flex';
});

// Fechar modal ao clicar no ícone de fechar ou no botão de fechar
document.getElementById('fechar-mood').addEventListener('click', function() {
    document.getElementById('mudar-mood').style.display = 'none';
});

// Fechar modal ao clicar fora do conteúdo
document.getElementById('mudar-mood').addEventListener('click', function(event) {
    // Verifica se o clique foi fora do conteúdo
    if (event.target === this) {
        this.style.display = 'none';
    }
});
