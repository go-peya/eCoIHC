// Cargar el contenido del footer
document.addEventListener("DOMContentLoaded", function () {
    const footerPlaceholder = document.getElementById("footer-pan");
    fetch("footer.html")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al cargar el footer");
        }
        return response.text();
      })
      .then(data => {
        footerPlaceholder.innerHTML = data;
  
        // Actualizar dinámicamente el año en el footer
        const yearElement = footerPlaceholder.querySelector("#year");
        if (yearElement) {
          yearElement.textContent = new Date().getFullYear();
        }
      })
      .catch(error => {
        console.error("No se pudo cargar el footer:", error);
      });
  });
  