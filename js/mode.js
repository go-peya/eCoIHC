// // Cargar el contenido del mode
// document.addEventListener("DOMContentLoaded", function () {
//     fetch('mode.html')
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('mode-pan').innerHTML = data;

//             // Inicializa el modo oscuro después de cargar el HTML
//             const themeSwitcher = document.querySelector(".theme-switcher");
//             const body = document.body;

//             themeSwitcher.addEventListener("click", () => {
//                 // Alternar la clase "dark" en el body
//                 body.classList.toggle("dark");
//             });
//         })
//         .catch(error => console.error('Error loading mode.html:', error));
// });

// Cargar el contenido del mode
document.addEventListener("DOMContentLoaded", function () {
    fetch('mode.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('mode-pan').innerHTML = data;

            // Inicializa el modo oscuro después de cargar el HTML
            const themeSwitcher = document.querySelector(".theme-switcher");
            const body = document.body;

            themeSwitcher.addEventListener("click", () => {
                // Alternar la clase "dark" en el body
                body.classList.toggle("dark");

                // Selecciona el logo
                const logoImg = document.querySelector(".header-logo-img");

                // Cambiar la imagen del logo según el modo
                if (body.classList.contains("dark")) {
                    logoImg.src = "img/logo_black.svg"; // Cambia al logo oscuro
                } else {
                    logoImg.src = "img/logo_white.svg"; // Cambia al logo claro
                }
            });
        })
        .catch(error => console.error('Error loading mode.html:', error));
});
