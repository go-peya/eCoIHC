// Cargar el contenido del header
document.addEventListener("DOMContentLoaded", function () {
    const headerPlaceholder = document.getElementById("header-pan");

    fetch("header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el header");
            }
            return response.text();
        })
        .then(html => {
            headerPlaceholder.innerHTML = html;

            // Agregar funcionalidad al menú después de cargar el contenido
            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.querySelector('.nav-links');

            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                });
            }
        })
        .catch(error => {
            console.error("Error al cargar el header:", error);
        });
});
