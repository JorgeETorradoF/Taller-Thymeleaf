document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');

        // Validaciones adicionales si es necesario
        validateForm();
    }, false);

    function validateForm() {
        // Validación personalizada para el email
        const email = document.getElementById('email');
        if (!email.value.includes('@')) {
            email.classList.add('is-invalid');
            email.nextElementSibling.textContent = 'Tu email debe contener un "@"';
            return false;
        } else {
            email.classList.remove('is-invalid');
        }

    }
}, false);
