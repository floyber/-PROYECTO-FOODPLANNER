// Calendario.js - Script para la funcionalidad del calendario de comidas

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const viewShoppingListButton = document.getElementById('view-shopping-list');
    const mealModal = document.getElementById('meal-modal');
    const closeModalButton = document.querySelector('.close');
    const addMealForm = document.getElementById('add-meal-form');
    const mealDateInput = document.getElementById('meal-date');
    
    // Estado del calendario
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Datos de comidas (simulado con localStorage)
    let meals = JSON.parse(localStorage.getItem('meals')) || {};
    
    // Inicializar calendario
    generateCalendar(currentMonth, currentYear);
    updateMonthDisplay();
    
    // Event Listeners
    prevMonthButton.addEventListener('click', goToPreviousMonth);
    nextMonthButton.addEventListener('click', goToNextMonth);
    viewShoppingListButton.addEventListener('click', viewShoppingList);
    closeModalButton.addEventListener('click', closeModal);
    addMealForm.addEventListener('submit', saveMeal);
    
    // Funciones para manejar el calendario
    function generateCalendar(month, year) {
        calendarBody.innerHTML = '';
        
        // Obtener el primer día del mes
        let firstDay = new Date(year, month, 1).getDay();
        
        // Obtener el número de días en el mes
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Obtener el número de días del mes anterior
        let daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Variables para el calendario
        let date = 1;
        let nextMonthDate = 1;
        
        // Crear las filas del calendario
        for (let i = 0; i < 6; i++) {
            // Crear fila
            let row = document.createElement('tr');
            
            // Crear celdas para cada día de la semana
            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');
                let dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                
                // Celdas del mes anterior
                if (i === 0 && j < firstDay) {
                    let prevMonthDay = daysInPrevMonth - firstDay + j + 1;
                    dayNumber.textContent = prevMonthDay;
                    cell.appendChild(dayNumber);
                    cell.className = 'other-month';
                    
                    // Obtener fecha completa (mes anterior)
                    let prevMonth = month - 1 < 0 ? 11 : month - 1;
                    let prevYear = month - 1 < 0 ? year - 1 : year;
                    let dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(prevMonthDay).padStart(2, '0')}`;
                    
                    // Añadir botón y comidas
                    addMealButtonAndItems(cell, dateStr);
                } 
                // Celdas del mes actual
                else if (date <= daysInMonth) {
                    dayNumber.textContent = date;
                    cell.appendChild(dayNumber);
                    
                    // Verificar si es hoy
                    let today = new Date();
                    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        cell.className = 'today';
                    }
                    
                    // Obtener fecha completa
                    let dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                    
                    // Añadir botón y comidas
                    addMealButtonAndItems(cell, dateStr);
                    
                    date++;
                } 
                // Celdas del mes siguiente
                else {
                    dayNumber.textContent = nextMonthDate;
                    cell.appendChild(dayNumber);
                    cell.className = 'other-month';
                    
                    // Obtener fecha completa (mes siguiente)
                    let nextMonth = month + 1 > 11 ? 0 : month + 1;
                    let nextYear = month + 1 > 11 ? year + 1 : year;
                    let dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(nextMonthDate).padStart(2, '0')}`;
                    
                    // Añadir botón y comidas
                    addMealButtonAndItems(cell, dateStr);
                    
                    nextMonthDate++;
                }
                
                row.appendChild(cell);
            }
            
            calendarBody.appendChild(row);
            
            // Si ya se han mostrado todos los días del mes actual y del siguiente, no seguir creando filas
            if (date > daysInMonth && i > 3) {
                break;
            }
        }
    }
    
    function addMealButtonAndItems(cell, dateStr) {
        // Añadir botón para agregar comida
        let addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.className = 'add-meal';
        addButton.onclick = function() {
            openMealModal(dateStr);
        };
        cell.appendChild(addButton);
        
        // Mostrar comidas existentes para esta fecha
        if (meals[dateStr]) {
            meals[dateStr].forEach(meal => {
                let mealItem = document.createElement('div');
                mealItem.className = 'meal-item';
                mealItem.textContent = `${getMealTypeLabel(meal.mealType)}: ${meal.mealName}`;
                
                // Agregar opción para eliminar la comida
                mealItem.addEventListener('click', function() {
                    if (confirm(`¿Deseas eliminar "${meal.mealName}"?`)) {
                        removeMeal(dateStr, meal);
                        generateCalendar(currentMonth, currentYear);
                    }
                });
                
                cell.appendChild(mealItem);
            });
        }
    }
    
    function getMealTypeLabel(mealType) {
        const labels = {
            'desayuno': '🍳 Desayuno',
            'almuerzo': '🍲 Almuerzo',
            'cena': '🍽️ Cena',
            'merienda': '🍰 Merienda'
        };
        return labels[mealType] || mealType;
    }
    
    function updateMonthDisplay() {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        currentMonthElement.textContent = `${months[currentMonth]} ${currentYear}`;
    }
    
    function goToPreviousMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
        updateMonthDisplay();
    }
    
    function goToNextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
        updateMonthDisplay();
    }
    
    function openMealModal(dateStr) {
        mealDateInput.value = dateStr;
        
        // Formatear la fecha para mostrarla en el título del modal
        const [year, month, day] = dateStr.split('-');
        const dateObj = new Date(year, month - 1, day);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('es-ES', options);
        
        document.querySelector('.modal-content h2').textContent = `Añadir comida para ${formattedDate}`;
        
        mealModal.style.display = 'block';
    }
    
    function closeModal() {
        mealModal.style.display = 'none';
        addMealForm.reset();
    }
    
    function saveMeal(event) {
        event.preventDefault();
        
        const dateStr = mealDateInput.value;
        const mealType = document.getElementById('meal-type').value;
        const mealName = document.getElementById('meal-name').value;
        const ingredients = document.getElementById('meal-ingredients').value;
        const notes = document.getElementById('meal-notes').value;
        
        // Crear objeto de comida
        const meal = {
            mealType,
            mealName,
            ingredients: ingredients.split(',').map(item => item.trim()).filter(item => item),
            notes
        };
        
        // Guardar en el almacenamiento
        if (!meals[dateStr]) {
            meals[dateStr] = [];
        }
        
        meals[dateStr].push(meal);
        localStorage.setItem('meals', JSON.stringify(meals));
        
        // Actualizar calendario y cerrar modal
        generateCalendar(currentMonth, currentYear);
        closeModal();
        
        // Mostrar mensaje de confirmación
        alert(`Se ha añadido ${mealName} a ${getMealTypeLabel(mealType)}`);
    }
    
    function removeMeal(dateStr, mealToRemove) {
        if (meals[dateStr]) {
            meals[dateStr] = meals[dateStr].filter(meal => 
                meal.mealName !== mealToRemove.mealName || 
                meal.mealType !== mealToRemove.mealType
            );
            
            // Si no quedan comidas para esta fecha, eliminar la clave
            if (meals[dateStr].length === 0) {
                delete meals[dateStr];
            }
            
            localStorage.setItem('meals', JSON.stringify(meals));
        }
    }
    
    function viewShoppingList() {
        // Redireccionar a la página de lista de compras
        window.location.href = 'LISTACOMPRASindex.html';
    }
    
    // Función para generar lista de compras basada en el plan de comidas
    function generateShoppingList() {
        const ingredients = {};
        
        // Recorrer todas las comidas
        Object.values(meals).forEach(dailyMeals => {
            dailyMeals.forEach(meal => {
                if (meal.ingredients && meal.ingredients.length) {
                    meal.ingredients.forEach(ingredient => {
                        if (ingredients[ingredient]) {
                            ingredients[ingredient]++;
                        } else {
                            ingredients[ingredient] = 1;
                        }
                    });
                }
            });
        });
        
        // Guardar lista de compras en localStorage
        localStorage.setItem('shoppingList', JSON.stringify(ingredients));
    }
    
    // Generar lista de compras inicial
    generateShoppingList();
});