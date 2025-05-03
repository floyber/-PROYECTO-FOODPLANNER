// Elementos del DOM
document.addEventListener('DOMContentLoaded', function() {
    const newItemInput = document.getElementById('new-item');
    const categorySelect = document.getElementById('category');
    const addButton = document.getElementById('add-btn');
    const shoppingList = document.getElementById('shopping-list');
    const clearAllButton = document.getElementById('clear-all');
    const allFilterBtn = document.getElementById('all-filter');
    const pendingFilterBtn = document.getElementById('pending-filter');
    const completedFilterBtn = document.getElementById('completed-filter');

    // Estado de la aplicación
    let items = JSON.parse(localStorage.getItem('shoppingItems')) || [];
    let currentFilter = 'all';

    // Funciones
    function saveItems() {
        localStorage.setItem('shoppingItems', JSON.stringify(items));
    }

    function addItem() {
        const text = newItemInput.value.trim();
        if (text === '') return;
        
        const newItem = {
            id: Date.now(),
            text: text,
            category: categorySelect.value,
            completed: false,
            date: new Date().toISOString()
        };
        
        items.push(newItem);
        saveItems();
        renderItems();
        newItemInput.value = '';
    }

    function renderItems() {
        shoppingList.innerHTML = '';
        
        let filteredItems = items;
        
        if (currentFilter === 'pending') {
            filteredItems = items.filter(item => !item.completed);
        } else if (currentFilter === 'completed') {
            filteredItems = items.filter(item => item.completed);
        }
        
        // Ordenar por categoría
        filteredItems.sort((a, b) => {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
            return 0;
        });
        
        filteredItems.forEach(item => {
            const li = document.createElement('li');
            li.className = `item ${item.completed ? 'checked' : ''}`;
            
            li.innerHTML = `
                <span class="category">${categoryToDisplay(item.category)}</span>
                <span>${item.text}</span>
                <div class="actions">
                    <button class="check-btn" data-id="${item.id}">
                        <i class="fas ${item.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                    </button>
                    <button class="delete-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            shoppingList.appendChild(li);
        });
    }

    function categoryToDisplay(categoryValue) {
        const categories = {
            frutas: 'Frutas',
            verduras: 'Verduras',
            carnes: 'Carnes',
            lacteos: 'Lácteos',
            cereales: 'Cereales',
            congelados: 'Congelados',
            limpieza: 'Limpieza',
            otros: 'Otros'
        };
        
        return categories[categoryValue] || categoryValue;
    }

    function toggleItem(id) {
        items = items.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        
        saveItems();
        renderItems();
    }

    function deleteItem(id) {
        items = items.filter(item => item.id !== id);
        saveItems();
        renderItems();
    }

    function clearAllItems() {
        if (confirm('¿Estás seguro de que quieres eliminar todos los elementos?')) {
            items = [];
            saveItems();
            renderItems();
        }
    }

    function setFilter(filter) {
        currentFilter = filter;
        
        // Actualizar botones de filtro
        allFilterBtn.classList.remove('active');
        pendingFilterBtn.classList.remove('active');
        completedFilterBtn.classList.remove('active');
        
        if (filter === 'all') {
            allFilterBtn.classList.add('active');
        } else if (filter === 'pending') {
            pendingFilterBtn.classList.add('active');
        } else if (filter === 'completed') {
            completedFilterBtn.classList.add('active');
        }
        
        renderItems();
    }

    // Event Listeners
    addButton.addEventListener('click', addItem);

    newItemInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    shoppingList.addEventListener('click', function(e) {
        const target = e.target.closest('button');
        if (!target) return;
        
        const id = Number(target.dataset.id);
        
        if (target.classList.contains('check-btn')) {
            toggleItem(id);
        } else if (target.classList.contains('delete-btn')) {
            deleteItem(id);
        }
    });

    clearAllButton.addEventListener('click', clearAllItems);

    allFilterBtn.addEventListener('click', () => setFilter('all'));
    pendingFilterBtn.addEventListener('click', () => setFilter('pending'));
    completedFilterBtn.addEventListener('click', () => setFilter('completed'));

    // Inicializar la aplicación
    renderItems();
});