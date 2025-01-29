
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
    const items = document.querySelectorAll(".carousel > .item");
    let currentIndex = 0;
    const totalItems = 2; // Calcula o número de itens no carrossel

    function showNextItem() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }

    function showPrevItem() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }

    function updateCarousel() {
        const offset = -currentIndex * 50; // Assuma que cada item ocupa 100% da largura
        carousel.style.transform = `translateX(${offset}%)`;
    }

    // Transição automática a cada 6 segundos
    setInterval(showNextItem, 6000);

    // Navegação manual
    if (nextButton) nextButton.addEventListener("click", showNextItem);
    if (prevButton) prevButton.addEventListener("click", showPrevItem);
});

// Define o tema fixo (exemplo: claro)
function applyFixedTheme() {
    document.documentElement.setAttribute("data-theme", "light"); // Altere para "dark" se quiser o tema escuro
}

// Remove detecção automática do tema do sistema
function disableSystemThemeChange() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDarkScheme.removeEventListener("change", handleSystemThemeChange);
}

// Callback para mudanças no tema do sistema (não faz nada)
function handleSystemThemeChange() {
    // Não altera o tema
}

// Aplica o tema fixo ao carregar o site
applyFixedTheme();
disableSystemThemeChange();


