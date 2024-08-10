document.addEventListener('DOMContentLoaded', function () {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const subButtonsWrapper = document.querySelector('.sub-buttons-wrapper');
    const subButtons = document.querySelectorAll('.sub-buttons');
    const mainButtons = document.querySelectorAll('.main-btn');
    let currentIndex = 0;
    const visibleButtons = 4; // Quantidade de botões visíveis por vez

    function updateNavigation(subButtonContainer) {
        const totalButtons = subButtonContainer.querySelectorAll('.sub-btn').length;
        const maxIndex = totalButtons - visibleButtons;

        prevBtn.classList.toggle('disabled', currentIndex <= 0);
        nextBtn.classList.toggle('disabled', currentIndex >= maxIndex);

        const offset = -currentIndex * (subButtonContainer.querySelector('.sub-btn').offsetWidth + 10); // Largura do botão + gap
        subButtonContainer.style.transform = `translateX(${offset}px)`;
    }

    function showSubButtons(targetId) {
        subButtons.forEach((container) => {
            container.style.display = container.id === targetId ? 'flex' : 'none';
        });

        currentIndex = 0;
        updateNavigation(document.getElementById(targetId));
    }

    mainButtons.forEach((button) => {
        button.addEventListener('click', function () {
            mainButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');

            showSubButtons(`${button.id}-sub`);
        });
    });

    nextBtn.addEventListener('click', function () {
        const activeSubButtons = document.querySelector('.sub-buttons:not([style*="display: none"])');
        const totalButtons = activeSubButtons.querySelectorAll('.sub-btn').length;
        const maxIndex = totalButtons - visibleButtons;

        if (currentIndex < maxIndex) {
            currentIndex++;
            updateNavigation(activeSubButtons);
        }
    });

    prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            const activeSubButtons = document.querySelector('.sub-buttons:not([style*="display: none"])');
            updateNavigation(activeSubButtons);
        }
    });

    // Inicializar a exibição correta com os botões de estrutura
    showSubButtons('estrutura-sub');
});
