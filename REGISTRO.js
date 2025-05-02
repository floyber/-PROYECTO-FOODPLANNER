document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del formulario
    const registroForm = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const terminosCheckbox = document.getElementById('terminos');
    
    // Obtener elementos de error
    const nombreError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const terminosError = document.getElementById('terminosError');
    const registroExitoso = document.getElementById('registroExitoso');
    
    // Validación del formulario
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Restablecer mensajes de error
        resetErrorMessages();
        
        // Validar campos
        let isValid = true;
        
        // Validar nombre
        if (nombreInput.value.trim() === '') {
            showError(nombreInput, nombreError, 'Por favor ingresa tu nombre completo');
            isValid = false;
        }
        
        // Validar email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Por favor ingresa un correo electrónico válido');
            isValid = false;
        }
        
        // Validar contraseña
        if (passwordInput.value.length < 8) {
            showError(passwordInput, passwordError, 'La contraseña debe tener al menos 8 caracteres');
            isValid = false;
        }
        
        // Validar confirmación de contraseña
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, confirmPasswordError, 'Las contraseñas no coinciden');
            isValid = false;
        }
        
        // Validar términos y condiciones
        if (!terminosCheckbox.checked) {
            showError(terminosCheckbox, terminosError, 'Debes aceptar los términos y condiciones');
            isValid = false;
        }
        
        // Si todo es válido, procesar el registro
        if (isValid) {
            // Aquí podrías enviar los datos a un servidor
            // Simulamos un registro exitoso
            registroExitoso.style.display = 'block';
            
            // Almacenar datos del usuario en localStorage (para demo)
            const userData = {
                nombre: nombreInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Redireccionar después de 2 segundos
            setTimeout(function() {
                window.location.href = 'INICIOindex.html';
            }, 2000);
        }
    });
    
    // Validación en tiempo real para email
    emailInput.addEventListener('blur', function() {
        if (!validateEmail(emailInput.value) && emailInput.value !== '') {
            showError(emailInput, emailError, 'Por favor ingresa un correo electrónico válido');
        } else {
            emailError.style.display = 'none';
            emailInput.classList.remove('is-invalid');
        }
    });
    
    // Validación en tiempo real para contraseña
    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.length < 8 && passwordInput.value !== '') {
            showError(passwordInput, passwordError, 'La contraseña debe tener al menos 8 caracteres');
        } else {
            passwordError.style.display = 'none';
            passwordInput.classList.remove('is-invalid');
        }
    });
    
    // Validación en tiempo real para confirmación de contraseña
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value !== confirmPasswordInput.value && confirmPasswordInput.value !== '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Las contraseñas no coinciden');
        } else {
            confirmPasswordError.style.display = 'none';
            confirmPasswordInput.classList.remove('is-invalid');
        }
    });
    
    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Función para mostrar error
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('is-invalid');
    }
    
    // Función para restablecer mensajes de error
    function resetErrorMessages() {
        // Ocultar todos los mensajes de error
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(element) {
            element.style.display = 'none';
        });
        
        // Quitar clase de error de todos los inputs
        const formInputs = registroForm.querySelectorAll('input');
        formInputs.forEach(function(input) {
            input.classList.remove('is-invalid');
        });
        
        // Ocultar mensaje de éxito
        registroExitoso.style.display = 'none';
    }
});