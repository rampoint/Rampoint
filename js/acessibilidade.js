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