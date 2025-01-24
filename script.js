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
    const cross = document.querySelector('.cross');
    const content = document.querySelector('.content');
    const card = document.querySelector('.card');

    // Función que verifica si un elemento está visible en el viewport
    const checkVisibility = () => {
        const crossRect = cross.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        // Mostrar la cruz cuando entre en el viewport
        if (crossRect.top <= window.innerHeight && crossRect.bottom >= 0) {
            cross.classList.add('visible'); // Cruz visible
        } else {
            cross.classList.remove('visible'); // Cruz desaparece
        }

        // Mostrar el contenido del mensaje cuando entre en el viewport
        if (contentRect.top <= window.innerHeight && contentRect.bottom >= 0) {
            content.classList.add('visible'); // Mensaje visible
        } else {
            content.classList.remove('visible'); // Mensaje desaparece
        }

        // Control de la visibilidad de la tarjeta en general
        if (cardRect.top <= window.innerHeight && cardRect.bottom >= 0) {
            card.classList.add('visible'); // Tarjeta visible
        } else {
            card.classList.remove('visible'); // Tarjeta desaparece
        }
    };

    // Verificamos la visibilidad al cargar la página
    checkVisibility();

    // Agregamos un listener para que se verifique al hacer scroll
    window.addEventListener('scroll', checkVisibility);
}); 


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


