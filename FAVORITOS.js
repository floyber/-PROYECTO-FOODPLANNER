// FAVORITOS.js - Script para manejar las recetas favoritas
document.addEventListener('DOMContentLoaded', function() {
    // Cargar las recetas favoritas guardadas en localStorage
    cargarFavoritos();
    
    // Añadir event listeners a los botones dinámicos
    document.addEventListener('click', function(event) {
        // Eliminar de favoritos
        if (event.target.classList.contains('btn-eliminar') || 
            event.target.parentElement.classList.contains('btn-eliminar')) {
            const recetaId = event.target.closest('.favorito-card').dataset.id;
            eliminarDeFavoritos(recetaId);
        }
        
        // Ver detalles de receta
        if (event.target.classList.contains('btn-detalles') || 
            event.target.parentElement.classList.contains('btn-detalles')) {
            const recetaId = event.target.closest('.favorito-card').dataset.id;
            verDetallesReceta(recetaId);
        }
    });
});

// Función para cargar favoritos desde localStorage
function cargarFavoritos() {
    const favoritosContainer = document.getElementById('favoritos-container');
    const mensajeVacio = document.getElementById('mensaje-vacio');
    
    // Obtener favoritos del localStorage
    let favoritos = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
    
    // Limpiar el contenedor de favoritos
    favoritosContainer.innerHTML = '';
    
    // Mostrar mensaje si no hay favoritos
    if (favoritos.length === 0) {
        mensajeVacio.style.display = 'block';
        favoritosContainer.style.display = 'none';
        return;
    }
    
    // Ocultar mensaje si hay favoritos
    mensajeVacio.style.display = 'none';
    favoritosContainer.style.display = 'grid';
    
    // Crear tarjetas para cada receta favorita
    favoritos.forEach(receta => {
        const card = crearTarjetaReceta(receta);
        favoritosContainer.appendChild(card);
    });
}

// Función para crear tarjeta de receta
function crearTarjetaReceta(receta) {
    const cardElement = document.createElement('div');
    cardElement.className = 'favorito-card';
    cardElement.dataset.id = receta.id;
    
    cardElement.innerHTML = `
        <img src="${receta.imagen || 'https://via.placeholder.com/300x200?text=Receta'}" alt="${receta.nombre}" class="favorito-imagen">
        <div class="favorito-info">
            <h3 class="favorito-titulo">${receta.nombre}</h3>
            <div class="favorito-meta">
                <span><i class="far fa-clock"></i> ${receta.tiempo || 'N/A'} min</span>
                <span><i class="fas fa-fire"></i> ${receta.calorias || 'N/A'} kcal</span>
            </div>
            <p>${receta.descripcion.substring(0, 100)}${receta.descripcion.length > 100 ? '...' : ''}</p>
            <div class="favorito-acciones">
                <button class="btn btn-primary btn-detalles">
                    <i class="fas fa-eye"></i> Ver receta
                </button>
                <button class="btn btn-secondary btn-eliminar">
                    <i class="fas fa-heart-broken"></i> Eliminar
                </button>
            </div>
        </div>
    `;
    
    return cardElement;
}

// Función para eliminar receta de favoritos
function eliminarDeFavoritos(recetaId) {
    // Obtener favoritos actuales
    let favoritos = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
    
    // Filtrar para eliminar la receta seleccionada
    favoritos = favoritos.filter(receta => receta.id !== recetaId);
    
    // Guardar favoritos actualizados
    localStorage.setItem('recetasFavoritas', JSON.stringify(favoritos));
    
    // Recargar la vista de favoritos
    cargarFavoritos();
    
    // Mostrar notificación (opcional)
    mostrarNotificacion('Receta eliminada de favoritos');
}

// Función para ver detalles de receta
function verDetallesReceta(recetaId) {
    // En un caso real, aquí redirigirías a la página de detalles
    // Por ahora solo simulamos la acción
    console.log(`Ver detalles de receta ID: ${recetaId}`);
    
    // Redirigir a la página de detalles (ajustar según la estructura de tu proyecto)
    // window.location.href = `detalle-receta.html?id=${recetaId}`;
    
    // Esta es una alternativa si no tienes página de detalles aún
    let favoritos = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];
    let receta = favoritos.find(r => r.id === recetaId);
    
    if (receta) {
        alert(`Receta: ${receta.nombre}\nTiempo: ${receta.tiempo} min\nIngredientes: ${receta.ingredientes.join(', ')}`);
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    
    // Aplicar estilos
    Object.assign(notificacion.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '4px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
        zIndex: '9999',
        transition: 'opacity 0.3s ease'
    });
    
    // Añadir al DOM
    document.body.appendChild(notificacion);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Datos de ejemplo para probar (solo si no hay datos en localStorage)
function cargarDatosEjemplo() {
    // Solo cargar si no hay datos previos
    if (!localStorage.getItem('recetasFavoritas')) {
        const ejemploRecetas = [
            {
                id: '1',
                nombre: 'Ensalada César',
                descripcion: 'Deliciosa ensalada César con pollo a la parrilla, croutones y aderezo casero.',
                tiempo: 20,
                calorias: 350,
                imagen: 'https://via.placeholder.com/300x200?text=Ensalada+César',
                ingredientes: ['Lechuga romana', 'Pollo', 'Pan tostado', 'Queso parmesano', 'Aderezo César']
            },
            {
                id: '2',
                nombre: 'Pasta Alfredo',
                descripcion: 'Cremosa pasta con salsa Alfredo, perfecta para una cena rápida y deliciosa.',
                tiempo: 25,
                calorias: 450,
                imagen: 'https://via.placeholder.com/300x200?text=Pasta+Alfredo',
                ingredientes: ['Fettuccine', 'Crema', 'Mantequilla', 'Queso parmesano', 'Ajo']
            },
            {
                id: '3',
                nombre: 'Salmón a la Parrilla',
                descripcion: 'Salmón jugoso a la parrilla con limón y hierbas frescas.',
                tiempo: 30,
                calorias: 320,
                imagen: 'https://via.placeholder.com/300x200?text=Salmón+Parrilla',
                ingredientes: ['Filete de salmón', 'Limón', 'Tomillo', 'Aceite de oliva', 'Sal y pimienta']
            }
        ];
        
        localStorage.setItem('recetasFavoritas', JSON.stringify(ejemploRecetas));
    }
}

// Cargar datos de ejemplo para demostración
cargarDatosEjemplo();