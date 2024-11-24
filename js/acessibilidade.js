document.addEventListener('DOMContentLoaded', function() {
    // Primeiro, verifique se os elementos existem
    const readingMaskContainer = document.getElementById('reading-mask-container');
    const mascaraToggle = document.getElementById('mascara-toggle');
    const topMask = document.getElementById('top-mask');
    const readingLine = document.getElementById('reading-line');
    const bottomMask = document.getElementById('bottom-mask');

    // Se algum elemento necessário não existir, não continue
    if (!readingMaskContainer || !mascaraToggle || !topMask || !readingLine || !bottomMask) {
        console.error('Elementos necessários não encontrados');
        return;
    }

    let isReadingMaskActive = false;

    // Add active state styling to the toggle button
    mascaraToggle.style.cursor = 'pointer';

    function updateMaskPosition(e) {
        if (!isReadingMaskActive) return;
        
        const mouseY = e.clientY;
        const windowHeight = window.innerHeight;
        const maskHeight = 80; // Height of the reading line
        
        // Position the reading line centered on the mouse
        const linePosition = mouseY - (maskHeight / 2);
        
        // Update positions
        topMask.style.height = `${linePosition}px`;
        readingLine.style.top = `${linePosition}px`;
        bottomMask.style.height = `${windowHeight - linePosition - maskHeight}px`;
    }

    function toggleReadingMask() {
        isReadingMaskActive = !isReadingMaskActive;
        readingMaskContainer.style.display = isReadingMaskActive ? 'block' : 'none';
        
        // Toggle active state styling
        if (isReadingMaskActive) {
            mascaraToggle.style.backgroundColor = '#7ad761';
            document.addEventListener('mousemove', updateMaskPosition);
        } else {
            mascaraToggle.style.backgroundColor = '';
            document.removeEventListener('mousemove', updateMaskPosition);
        }
    }

    // Add click event listener to the toggle button
    mascaraToggle.addEventListener('click', toggleReadingMask);

    // Handle window resize
    window.addEventListener('resize', () => {
        if (isReadingMaskActive) {
            updateMaskPosition({ clientY: window.innerHeight / 2 }); // Center the mask on resize
        }
    });

    // Adicione o container da máscara ao body se ele não existir
    if (!document.getElementById('reading-mask-container')) {
        document.body.appendChild(readingMaskContainer);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Criar elementos necessários
    const magnifier = document.getElementById('magnifier');
    const magnifierContent = document.getElementById('magnifier-content');
    const lupaToggle = document.getElementById('lupa-acs');

    // Se os elementos não existirem, criar o magnifier
    if (!document.getElementById('magnifier')) {
        document.body.appendChild(magnifier);
    }

    // Verificar se todos os elementos necessários existem
    if (!magnifier || !magnifierContent || !lupaToggle) {
        console.error('Elementos necessários não encontrados');
        return;
    }

    let isActive = false;
    const ZOOM_LEVEL = 1.5; // Nível de zoom da lupa

    // Estilo do cursor e interatividade do botão
    lupaToggle.style.cursor = 'pointer';

    function updateMagnifier(e) {
        if (!isActive) return;

        const x = e.clientX;
        const y = e.clientY;
        const magnifierSize = 150; // Tamanho da lupa

        // Atualizar posição da lupa
        magnifier.style.left = `${x - magnifierSize/2}px`;
        magnifier.style.top = `${y - magnifierSize/2}px`;

        // Atualizar conteúdo ampliado
        magnifierContent.style.width = `${document.documentElement.scrollWidth}px`;
        magnifierContent.style.height = `${document.documentElement.scrollHeight}px`;
        magnifierContent.style.transform = `translate(${-x * ZOOM_LEVEL + magnifierSize/2}px, ${-y * ZOOM_LEVEL + magnifierSize/2}px) scale(${ZOOM_LEVEL})`;

        // Copiar o conteúdo da página
        if (!magnifierContent.innerHTML) {
            const clone = document.documentElement.cloneNode(true);
            // Remover a própria lupa do clone para evitar recursão
            const cloneMagnifier = clone.querySelector('#magnifier');
            if (cloneMagnifier) {
                cloneMagnifier.remove();
            }
            magnifierContent.innerHTML = clone.outerHTML;
        }
    }

    function toggleMagnifier() {
        isActive = !isActive;
        magnifier.style.display = isActive ? 'block' : 'none';
        
        // Estilo do botão quando ativo
        if (isActive) {
            lupaToggle.style.backgroundColor = '#7ad761';
            document.addEventListener('mousemove', updateMagnifier);
            // Limpar o conteúdo ao ativar
            magnifierContent.innerHTML = '';
        } else {
            lupaToggle.style.backgroundColor = '';
            document.removeEventListener('mousemove', updateMagnifier);
            // Limpar o conteúdo ao desativar
            magnifierContent.innerHTML = '';
        }
    }

    // Adicionar listener de clique ao botão
    lupaToggle.addEventListener('click', toggleMagnifier);

    // Estilo inicial da lupa
    magnifier.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    magnifierContent.style.position = 'absolute';
    magnifierContent.style.transformOrigin = 'top left';

    // Impedir que a lupa afete o layout
    magnifier.style.pointerEvents = 'none';
    magnifier.style.willChange = 'transform';
    magnifier.style.backfaceVisibility = 'hidden';
});