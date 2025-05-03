// Food Planner - Animaciones de características
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los elementos de características
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    // Inicializar animación de entrada para los feature boxes
    initEntryAnimations();
    
    // Configurar eventos para cada feature box
    featureBoxes.forEach(box => {
        // Evento al hacer clic (o tocar en móvil)
        box.addEventListener('click', function() {
            // Remover clase active de todos los boxes
            featureBoxes.forEach(item => {
                item.classList.remove('active');
                item.classList.remove('pulse-animation');
            });
            
            // Añadir clase active al box seleccionado
            this.classList.add('active');
            
            // Efecto de pulso temporal
            this.classList.add('pulse-animation');
            
            // Obtener el tipo de característica
            const feature = this.getAttribute('data-feature');
            
            // Redirigir según la característica después de un breve retraso para que se vea la animación
            setTimeout(() => {
                navigateToFeature(feature);
            }, 800);
        });

        // Eventos para dispositivos táctiles (para mejorar la experiencia en móviles)
        box.addEventListener('touchstart', function() {
            this.style.backgroundColor = '#f9f9f9';
        });

        box.addEventListener('touchend', function() {
            this.style.backgroundColor = 'white';
        });
    });

    // Iniciar una secuencia de animación automática para destacar las características
    startAutoAnimation();
    
    // Configurar el modal de inicio de sesión
    setupLoginModal();
});

// Función para inicializar las animaciones de entrada
function initEntryAnimations() {
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    // Ocultar todos los feature boxes inicialmente
    featureBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(50px)';
    });
    
    // Mostrar los feature boxes con un efecto de cascada
    featureBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            box.style.opacity = '1';
            box.style.transform = 'translateY(0)';
        }, 200 + (index * 300)); // Esperar 200ms + tiempo incremental por cada box
    });
}

// Función para navegar a la página correspondiente
function navigateToFeature(feature) {
    switch(feature) {
        case 'calendario':
            window.location.href = 'CALENDARIOindex.html';
            break;
        case 'recetas':
            window.location.href = 'RECETAindex.html';
            break;
        case 'compras':
            window.location.href = 'LISTACOMPRASindex.html';
            break;
        default:
            // No hacer nada si no coincide con ninguna característica
            break;
    }
}

// Función para iniciar una secuencia de animación automática para destacar las características
function startAutoAnimation() {
    const featureBoxes = Array.from(document.querySelectorAll('.feature-box'));
    let currentIndex = 0;
    
    // Función para animar un box específico
    function animateFeature() {
        // Remover animación previa
        featureBoxes.forEach(box => {
            box.classList.remove('pulse-animation');
        });
        
        // Añadir animación al box actual
        featureBoxes[currentIndex].classList.add('pulse-animation');
        
        // Incrementar índice (circular)
        currentIndex = (currentIndex + 1) % featureBoxes.length;
    }
    
    // Iniciar animación después de 3 segundos para dar tiempo a la animación de entrada
    setTimeout(() => {
        // Ejecutar inmediatamente para el primer box
        animateFeature();
        
        // Configurar intervalo para alternar entre boxes cada 3 segundos
        window.autoAnimationInterval = setInterval(animateFeature, 3000);
    }, 3000);
}

// Función para detectar si el usuario ha interactuado con la página
function handleUserInteraction() {
    // Detener la animación automática cuando el usuario interactúa con la página
    document.removeEventListener('click', handleUserInteraction);
    document.removeEventListener('touchstart', handleUserInteraction);
    
    // Detener la animación automática
    clearInterval(window.autoAnimationInterval);
}

// Agregar detectores de interacción del usuario
document.addEventListener('click', handleUserInteraction);
document.addEventListener('touchstart', handleUserInteraction);

// Configurar funcionalidad del modal de inicio de sesión
function setupLoginModal() {
    // Referencias a los elementos del modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const modalClose = document.querySelector('.modal-close');
    const loginForm = document.getElementById('login-form');
    
    // Mostrar modal al hacer clic en el botón de inicio de sesión
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    });
    
    // Cerrar modal al hacer clic en el botón de cierre
    modalClose.addEventListener('click', function() {
        closeModal();
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeModal();
        }
    });
    
    // Manejar envío del formulario de inicio de sesión
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Aquí normalmente enviarías los datos a un servidor para autenticación
        // Por ahora, solo mostramos un mensaje de prueba
        alert('Inicio de sesión exitoso para: ' + email);
        
        // Cerrar el modal después de "iniciar sesión"
        closeModal();
        
        // Redirigir a una página de usuario (opcional)
        // window.location.href = 'usuario-dashboard.html';
    });
    
    // Función para cerrar el modal
    function closeModal() {
        loginModal.style.display = 'none';
        document.body.style.overflow = ''; // Restaurar scroll del body
    }
}