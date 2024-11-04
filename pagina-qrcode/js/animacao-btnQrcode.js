document.getElementById('download').addEventListener('click', function() {
  // Seleciona a imagem que você deseja fazer o download
  const img = document.getElementById('image-to-download');
  
  // Cria um link temporário para baixar a imagem
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = img.src; // Usa o src da imagem
  a.download = 'qrcode.png'; // Nome do arquivo que será baixado
  
  // Adiciona o link à página e simula o clique
  document.body.appendChild(a);
  a.click();
  
  // Remove o link após o download
  document.body.removeChild(a);
});

