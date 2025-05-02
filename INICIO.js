// Food Planner - INICIO.js
// Este archivo contiene la funcionalidad JavaScript para la página de inicio

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const loginBtn = document.getElementById('login-btn');
    const loginForm = document.getElementById('login-form');
    const closeLogin = document.getElementById('close-login');
    const overlay = document.getElementById('overlay');
    const loginFormElement = document.getElementById('login');

    // Mostrar formulario de login cuando se hace clic en el botón
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'block';
        overlay.style.display = 'block';
    });

    // Cerrar formulario al hacer clic en X
    closeLogin.addEventListener('click', function() {
        loginForm.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Cerrar formulario al hacer clic en overlay
    overlay.addEventListener('click', function() {
        loginForm.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Manejar envío del formulario
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // En un caso real, aquí harías una petición AJAX para autenticar
        // Por ahora, simulamos una autenticación exitosa
        console.log('Intento de login con:', { email, password });
        
        // Simulación de autenticación
        if (email && password) {
            // Almacenar información del usuario en sessionStorage (para fines de demostración)
            sessionStorage.setItem('userLoggedIn', 'true');
            sessionStorage.setItem('userEmail', email);
            
            // Redirigir al usuario a la página principal después de iniciar sesión
            alert('Inicio de sesión exitoso. ¡Bienvenido!');
            window.location.href = 'CALENDARIOindex.html';
        } else {
            alert('Por favor, introduce todos los campos.');
        }
    });

    // Verificar si el usuario ya está logueado al cargar la página
    // (esto es una simulación para fines de demostración)
    function checkLoggedInStatus() {
        const isLoggedIn = sessionStorage.getItem('userLoggedIn');
        const userEmail = sessionStorage.getItem('userEmail');
        
        if (isLoggedIn === 'true' && userEmail) {
            loginBtn.textContent = 'Mi Cuenta';
            loginBtn.href = '#';
            
            // Modificar comportamiento del botón para usuarios logueados
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Funcionalidad de cuenta no implementada. En una app real, aquí se mostraría la página de perfil.');
            });
        }
    }

    // Funcionalidad para navegación responsiva (para móviles)
    function setupResponsiveNav() {
        // Aquí puedes añadir lógica para menú hamburguesa si lo necesitas
    }

    // Inicializar funciones
    checkLoggedInStatus();
    setupResponsiveNav();
});

// Función para navegar a las diferentes secciones
function navigateTo(page) {
    window.location.href = page + 'index.html';
}

// Añadir animaciones de entrada para los elementos de la página
window.addEventListener('load', function() {
    // Seleccionar todos los feature-box para animarlos
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    // Añadir clase para animación con un pequeño retraso entre cada uno
    featureBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.opacity = '0';
            box.style.transform = 'translateY(20px)';
            box.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});