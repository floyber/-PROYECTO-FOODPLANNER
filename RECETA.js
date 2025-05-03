// Array con los datos de las recetas
const recetas = [
    {
        id: 1,
        titulo: "Ensalada con Pollo",
        descripcion: "La ensalada con pollo es un plato ligero y nutritivo que mezcla vegetales frescos con trozos de pollo cocido, ideal como comida balanceada y rica en proteínas..",
        categoria: "comida",
        tiempo: "25 min",
        calorias: 350,
        imagen: "https://conave.org/wp-content/uploads/2019/07/ensalada-cesar-con-pollo.jpg",
        favorito: false,
        ingredientes: [
            "1 pechuga de pollo",
            "1 lechuga romana",
            "50g de queso parmesano",
            "Croutones",
            "Aderezo César"
        ],
        instrucciones: [
            "Cocinar el pollo a la parrilla y cortarlo en tiras",
            "Lavar y cortar la lechuga",
            "Mezclar todos los ingredientes",
            "Añadir el aderezo y mezclar bien"
        ]
    },
    {
        id: 2,
        titulo: "Avena con Frutas",
        descripcion: "La avena con frutas es un desayuno saludable que combina avena cocida o remojada con frutas frescas, ofreciendo una mezcla nutritiva de fibra, vitaminas y energía natural..",
        categoria: "desayuno",
        tiempo: "10 min",
        calorias: 250,
        imagen: " https://images.mrcook.app/recipe-image/01923cbb-9ef3-706f-9049-6b0becc3a683 ",
        favorito: true,
        ingredientes: [
            "1/2 taza de avena",
            "1 taza de leche",
            "1 platano",
            "Frutos rojos",
            "Miel al gusto"
        ],
        instrucciones: [
            "Cocinar la avena con la leche",
            "Añadir el plátano en rodajas",
            "Decorar con frutos rojos",
            "Endulzar con miel al gusto"
        ]
    },
    {
        id: 3,
        titulo: "Salmón al Horno con Verduras",
        descripcion: "El salmón al horno con verduras es un plato saludable que combina filete de salmón asado con vegetales, ofreciendo una comida equilibrada, rica en ácidos grasos omega-3 y vitaminas..",
        categoria: "cena",
        tiempo: "30 min",
        calorias: 420,
        imagen: "https://recetarius.com/wp-content/uploads/2020/12/salmon-al-horno.jpg",
        favorito: false,
        ingredientes: [
            "200g de salmón",
            "1 calabacín",
            "1 pimiento rojo",
            "1 limon",
            "Aceite de oliva",
            "Sal y pimienta"
        ],
        instrucciones: [
            "Precalentar el horno a 180°C",
            "Colocar el salmón en una bandeja",
            "Añadir las verduras cortadas alrededor",
            "Aliñar con aceite, sal y pimienta",
            "Hornear por 20-25 minutos"
        ]
    },
    {
        id: 4,
        titulo: "Torta de Manzana",
        descripcion: "La torta de manzana es un postre casero que combina masa suave con trozos de manzana, ofreciendo un sabor dulce y frutal, ideal para acompañar con café o té..",
        categoria: "postre",
        tiempo: "50 min",
        calorias: 300,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJPHQ1dWBrz4yrRrd76HTCQtxXb5NTgzXZtg&s",
        favorito: false,
        ingredientes: [
            "3 manzanas",
            "1 masa para tarta",
            "1/2 taza de azúcar moreno",
            "1 cucharada de canela",
            "50g de mantequilla"
        ],
        instrucciones: [
            "Precalentar el horno a 180°C",
            "Forrar un molde con la masa",
            "Cortar las manzanas en láminas",
            "Colocar las manzanas sobre la masa",
            "Espolvorear con azúcar y canela",
            "Hornear por 40 minutos"
        ]
    },
    {
        id: 5,
        titulo: "Curry de Garbanzos",
        descripcion: "El curry de garbanzos es un plato vegetal especiado, elaborado con garbanzos cocidos en una salsa de curry, ideal como opción nutritiva y rica en proteínas vegetales..",
        categoria: "vegetariano",
        tiempo: "35 min",
        calorias: 380,
        imagen: "https://i0.wp.com/spiceandcolour.com/wp-content/uploads/2021/02/DSC_0878_editado.jpg?fit=1140%2C760&ssl=1",
        favorito: true,
        ingredientes: [
            "1 lata de garbanzos",
            "1 cebolla",
            "2 dientes de ajo",
            "1 lata de tomate triturado",
            "2 cucharadas de curry en polvo",
            "1 taza de arroz basmati"
        ],
        instrucciones: [
            "Sofreír la cebolla y el ajo",
            "Añadir el curry y cocinar por 1 minuto",
            "Agregar el tomate y los garbanzos",
            "Cocinar a fuego lento por 20 minutos",
            "Servir con arroz basmati cocido"
        ]
    },
    {
        id: 6,
        titulo: "Tortilla Española",
        descripcion: "Clásica tortilla española de patatas y cebolla es un plato típico de España hecho con huevos, patatas y, a veces, cebolla. Se cocina en sartén hasta que queda dorada por fuera y jugosa por dentro.",
        categoria: "comida",
        tiempo: "40 min",
        calorias: 320,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhXexTZn60G-tf9N8o1Wlc5Fq5EvhLeA-gXQ&s",
        favorito: false,
        ingredientes: [
            "5 patatas medianas",
            "1 cebolla grande",
            "6 huevos",
            "Aceite de oliva",
            "Sal"
        ],
        instrucciones: [
            "Pelar y cortar las patatas en rodajas finas",
            "Cortar la cebolla en juliana",
            "Freír las patatas y la cebolla a fuego lento",
            "Batir los huevos y mezclar con las patatas",
            "Cuajar la tortilla por ambos lados"
        ]
    }
];


function renderizarRecetas(recetasMostradas = recetas) {
    const contenedor = document.getElementById('recipe-container');
    contenedor.innerHTML = '';
    
    if(recetasMostradas.length === 0) {
        contenedor.innerHTML = '<div class="no-results">No se encontraron recetas con los criterios seleccionados.</div>';
        return;
    }
    
    recetasMostradas.forEach(receta => {
        const recetaCard = document.createElement('div');
        recetaCard.className = 'recipe-card';
        recetaCard.setAttribute('data-id', receta.id);
        
        recetaCard.innerHTML = `
            <img src="${receta.imagen}" alt="${receta.titulo}" class="recipe-image">
            <div class="recipe-info">
                <h3 class="recipe-title">${receta.titulo}</h3>
                <p class="recipe-description">${receta.descripcion}</p>
                <div class="recipe-meta">
                    <span>${receta.tiempo}</span>
                    <span>${receta.calorias} cal</span>
                </div>
                <button class="favorite-btn ${receta.favorito ? 'active' : ''}" onclick="toggleFavorito(${receta.id})">
                    ★
                </button>
            </div>
        `;
        
        
        recetaCard.addEventListener('click', function(e) {
            if (!e.target.classList.contains('favorite-btn')) {
                mostrarDetallesReceta(receta.id);
            }
        });
        
        contenedor.appendChild(recetaCard);
    });
}


function filtrarPorCategoria(categoria) {
    const botonesCategoria = document.querySelectorAll('.filter-btn');
    botonesCategoria.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === categoria) {
            btn.classList.add('active');
        }
    });
    
    if (categoria === 'todos') {
        renderizarRecetas();
    } else {
        const recetasFiltradas = recetas.filter(receta => receta.categoria === categoria);
        renderizarRecetas(recetasFiltradas);
    }
}


function buscarRecetas() {
    const terminoBusqueda = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (terminoBusqueda === '') {
        renderizarRecetas();
        return;
    }
    
    // Verificar si la búsqueda es por ingrediente (prefijo "i:" o "ingrediente:")
    const esBusquedaPorIngrediente = terminoBusqueda.startsWith('i:') || terminoBusqueda.startsWith('ingrediente:');
    
    let recetasFiltradas = [];
    
    if (esBusquedaPorIngrediente) {
        // Extraer el ingrediente quitando el prefijo
        let ingredienteBuscado = terminoBusqueda;
        if (terminoBusqueda.startsWith('i:')) {
            ingredienteBuscado = terminoBusqueda.substring(2).trim();
        } else if (terminoBusqueda.startsWith('ingrediente:')) {
            ingredienteBuscado = terminoBusqueda.substring(12).trim();
        }
        
        // Filtrar por ingrediente
        recetasFiltradas = recetas.filter(receta => {
            return receta.ingredientes.some(ingrediente => 
                ingrediente.toLowerCase().includes(ingredienteBuscado)
            );
        });
    } else {
        // Búsqueda normal por título o descripción
        recetasFiltradas = recetas.filter(receta => {
            return receta.titulo.toLowerCase().includes(terminoBusqueda) ||
                   receta.descripcion.toLowerCase().includes(terminoBusqueda) ||
                   // También incluir búsqueda por ingredientes en modo normal
                   receta.ingredientes.some(ingrediente => 
                       ingrediente.toLowerCase().includes(terminoBusqueda)
                   );
        });
    }
    
    renderizarRecetas(recetasFiltradas);
}


function mostrarDetallesReceta(id) {
    const receta = recetas.find(r => r.id === id);
    if (!receta) return;
    
    
    alert(`
        ${receta.titulo}
        
        Ingredientes:
        ${receta.ingredientes.join('\n')}
        
        Instrucciones:
        ${receta.instrucciones.join('\n')}
    `);
}

// Función para marcar/desmarcar favoritos
function toggleFavorito(id) {
    const index = recetas.findIndex(r => r.id === id);
    if (index !== -1) {
        recetas[index].favorito = !recetas[index].favorito;
        
        // Actualizar el botón de favorito
        const botonFavorito = document.querySelector(`.recipe-card[data-id="${id}"] .favorite-btn`);
        if (botonFavorito) {
            botonFavorito.classList.toggle('active');
        }
        
        // Aquí podrías guardar los favoritos en localStorage para persistencia
        guardarFavoritos();
    }
}

// Función para buscar por múltiples ingredientes
function buscarPorIngredientes(ingredientes) {
    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
        return recetas;
    }
    
    const ingredientesLower = ingredientes.map(ing => ing.toLowerCase().trim());
    
    return recetas.filter(receta => {
        // Convertir todos los ingredientes de la receta a minúsculas
        const ingredientesReceta = receta.ingredientes.map(ing => ing.toLowerCase());
        
        // Verificar si al menos uno de los ingredientes buscados está en la receta
        return ingredientesLower.some(ingredienteBuscado => 
            ingredientesReceta.some(ingredienteReceta => 
                ingredienteReceta.includes(ingredienteBuscado)
            )
        );
    });
}

// Función para guardar favoritos en localStorage
function guardarFavoritos() {
    const favoritos = recetas.filter(r => r.favorito).map(r => r.id);
    localStorage.setItem('recetasFavoritas', JSON.stringify(favoritos));
}

// Función para cargar favoritos de localStorage
function cargarFavoritos() {
    const favoritosGuardados = localStorage.getItem('recetasFavoritas');
    if (favoritosGuardados) {
        const favoritos = JSON.parse(favoritosGuardados);
        recetas.forEach(receta => {
            receta.favorito = favoritos.includes(receta.id);
        });
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Cargar favoritos guardados
    cargarFavoritos();
    
    // Renderizar recetas iniciales
    renderizarRecetas();
    
    // Ya no se muestran los tags de ingredientes populares
    // mostrarTagsIngredientes();  <-- Esta línea ha sido comentada/eliminada
    
    // Event listeners
    document.getElementById('search-button').addEventListener('click', buscarRecetas);
    document.getElementById('search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            buscarRecetas();
        }
    });
    
    // Event listeners para filtros
    const botonesCategoria = document.querySelectorAll('.filter-btn');
    botonesCategoria.forEach(btn => {
        btn.addEventListener('click', function() {
            filtrarPorCategoria(this.getAttribute('data-category'));
        });
    });
});