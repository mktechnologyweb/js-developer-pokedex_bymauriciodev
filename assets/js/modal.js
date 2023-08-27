// Adicione um evento de clique aos botões que abrem a modal
document.addEventListener('DOMContentLoaded', () => {
    const modalButtons = document.querySelectorAll('.open-modal-button');
    modalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modalTarget = button.getAttribute('data-modal-target');
            const modal = document.getElementById(modalTarget);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // Adicione um evento de clique aos botões de fechar modal
    const closeButton = document.querySelectorAll('.close-button');
    closeButton.forEach((button) => {
        button.addEventListener('click', () => {
            const modalTarget = button.getAttribute('data-modal-target');
            const modal = document.getElementById(modalTarget);
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
});
