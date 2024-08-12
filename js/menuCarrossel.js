document.addEventListener('DOMContentLoaded', () => {
    const mainButtons = document.querySelectorAll('.main-btn');
    const subButtonsContainers = document.querySelectorAll('.sub-buttons');
    const contentContainers = document.querySelectorAll('.content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const subButtonsWrapper = document.querySelector('.sub-buttons-wrapper');

    function showContent(contentId) {
        contentContainers.forEach(content => {
            content.style.display = content.id === contentId ? 'block' : 'none';
        });
    }

    function showSubButtons(categoryIndex) {
        subButtonsContainers.forEach((container, index) => {
            container.style.display = index === categoryIndex ? 'flex' : 'none';
        });
        updateArrowVisibility();
    }

    function updateArrowVisibility() {
        const currentContainer = document.querySelector('.sub-buttons:not([style*="display: none"])');
        const containerWidth = currentContainer.offsetWidth;
        const wrapperWidth = subButtonsWrapper.offsetWidth;
        const scrollLeft = currentContainer.scrollLeft;
        const scrollWidth = currentContainer.scrollWidth;

        prevBtn.style.visibility = scrollLeft > 0 ? 'visible' : 'hidden';
        nextBtn.style.visibility = scrollWidth - scrollLeft > wrapperWidth ? 'visible' : 'hidden';
    }

    function handleMainButtonClick(e) {
        // Remove 'active' class from all main buttons
        mainButtons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        // Get the category index from the clicked button
        const categoryIndex = parseInt(e.target.dataset.index);
        // Show the sub-buttons related to the clicked main button
        showSubButtons(categoryIndex);
        // Close all content sections
        showContent('');
        // Remove 'active' class from all sub-buttons
        document.querySelectorAll('.sub-btn').forEach(btn => btn.classList.remove('active'));
    }

    function handleSubButtonClick(e) {
        // Remove 'active' class from all sub-buttons
        document.querySelectorAll('.sub-btn').forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked sub-button
        e.target.classList.add('active');
        // Get the content ID from the clicked sub-button
        const contentId = e.target.dataset.content;
        // Show the related content
        showContent(contentId);
    }

    // Add click event listeners to all main buttons
    mainButtons.forEach(button => {
        button.addEventListener('click', handleMainButtonClick);
    });

    // Add click event listeners to all sub-buttons
    document.querySelectorAll('.sub-btn').forEach(button => {
        button.addEventListener('click', handleSubButtonClick);
    });

    // Add click event listeners to the navigation arrows
    prevBtn.addEventListener('click', () => {
        document.querySelector('.sub-buttons:not([style*="display: none"])').scrollBy(-100, 0);
        updateArrowVisibility();
    });

    nextBtn.addEventListener('click', () => {
        document.querySelector('.sub-buttons:not([style*="display: none"])').scrollBy(100, 0);
        updateArrowVisibility();
    });

    // Inicializa o carrossel com a primeira categoria
    showSubButtons(0);
});
