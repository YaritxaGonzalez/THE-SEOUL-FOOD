// ==========================================
// admin.js — protección de administrador.html
// (usa lo guardado por cuantas_sesiones.js en localStorage)
// ==========================================
function protegerPaginaAdmin(){
    var rol = localStorage.getItem("rolActual");
    if (rol !== "admin"){
        alert("No tienes permiso para ver esta página");
        window.location.href = "../index.html";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    protegerPaginaAdmin();
});