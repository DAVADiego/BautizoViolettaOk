const prevButton = document.querySelector('.prev'); // Botón anterior
const nextButton = document.querySelector('.next'); // Botón siguiente
const track = document.querySelector('.carousel-track'); // Contenedor del carrusel
const images = Array.from(track.children); // Todas las imágenes del carrusel
let currentIndex = 0; // Índice inicial
let autoSlideInterval; // Control del intervalo para el desplazamiento automático



function updateCarousel() {
    images.forEach((img, index) => {
        if (index === currentIndex) {
            img.classList.add('active'); // Imagen activa
        } else {
            img.classList.remove('active'); // Eliminar clase activa
        }
    });

    // Calcular el desplazamiento del carrusel
    const offset = -(currentIndex * (images[0].clientWidth + 20)); // 20px es el margen lateral entre imágenes
    track.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length; // Incrementar índice circularmente
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Decrementar índice circularmente
    updateCarousel();
}

// Desplazamiento automático
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Cambia cada 3 segundos
}

// Pausa del auto desplazamiento
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Eventos de los botones manuales
nextButton.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide(); // Reinicia el desplazamiento automático
});

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide(); // Reinicia el desplazamiento automático
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('confirmation-message').style.display = 'block';
});

// Inicia el carrusel
updateCarousel();
startAutoSlide();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvp-form');
    const addRowButton = document.getElementById('add-row');

    addRowButton.addEventListener('click', () => {
        const firstRow = document.querySelector('.form-row');
        const newRow = firstRow.cloneNode(true);

        // Limpiar los valores de los inputs
        newRow.querySelectorAll('input').forEach(input => input.value = '');

        // Quitar el botón de "Agregar" de las filas adicionales
        const addButton = newRow.querySelector('#add-row');
        if (addButton) {
            addButton.id = ''; // Eliminar el ID para que no haya duplicados
            addButton.textContent = '-';
            addButton.classList.add('remove-row');
            addButton.classList.remove('add-row');

            // Cambiar la funcionalidad al botón "Quitar"
            addButton.addEventListener('click', () => {
                newRow.remove();
            });
        }

        // Insertar la nueva fila antes del botón de "Confirmar Asistencia"
        form.insertBefore(newRow, form.lastElementChild);
    });

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('rsvp-form');
        const addRowButton = document.getElementById('add-row');
    
        addRowButton.addEventListener('click', () => {
            const firstRow = document.querySelector('.form-row');
            const newRow = firstRow.cloneNode(true);
    
            // Limpiar los valores de los inputs
            newRow.querySelectorAll('input').forEach(input => input.value = '');
    
            // Cambiar el texto y el comportamiento del botón
            const addButton = newRow.querySelector('#add-row');
            if (addButton) {
                addButton.id = ''; // Eliminar el ID para que no haya duplicados
                addButton.textContent = '-';
                addButton.classList.add('remove-row');
                addButton.classList.remove('add-row');
    
                // Agregar funcionalidad de eliminación al botón "-"
                addButton.addEventListener('click', () => {
                    newRow.remove();
                });
            }
    
            // Insertar la nueva fila antes del botón de "Confirmar Asistencia"
            form.insertBefore(newRow, form.lastElementChild);
        });
    
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (!data[key]) {
                    data[key] = [];
                }
                data[key].push(value);
            });
    
            // Aquí se envían los datos al backend
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                if (response.ok) {
                    document.getElementById('confirmation-message').style.display = 'block';
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
            }
        });
    });
});
