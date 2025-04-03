// Variables globales
let currentSection = 'inicio';
let galleryItems = [];
let currentImageIndex = 0;

// Datos de ejemplo para la galería (se reemplazarían con imágenes reales)
const sampleImages = [
    { id: 1, src: 'images/sample1.jpg', alt: 'Foto de boda 1' },
    { id: 2, src: 'images/sample2.jpg', alt: 'Foto de boda 2' },
    { id: 3, src: 'images/sample3.jpg', alt: 'Foto de boda 3' },
    { id: 4, src: 'images/sample4.jpg', alt: 'Foto de boda 4' },
    { id: 5, src: 'images/sample5.jpg', alt: 'Foto de boda 5' },
    { id: 6, src: 'images/sample6.jpg', alt: 'Foto de boda 6' },
    { id: 7, src: 'images/sample7.jpg', alt: 'Foto de boda 7' },
    { id: 8, src: 'images/sample8.jpg', alt: 'Foto de boda 8' },
    { id: 9, src: 'images/sample9.jpg', alt: 'Foto de boda 9' },
    { id: 10, src: 'images/sample10.jpg', alt: 'Foto de boda 10' },
    { id: 11, src: 'images/sample11.jpg', alt: 'Foto de boda 11' },
    { id: 12, src: 'images/sample12.jpg', alt: 'Foto de boda 12' }
];

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar navegación
    initNavigation();
    
    // Inicializar galería
    initGallery();
    
    // Inicializar funcionalidad de copiar al portapapeles
    initCopyButtons();
    
    // Inicializar menú responsive
    initResponsiveMenu();
});

// Función para inicializar la navegación
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Obtener el ID de la sección desde el href
            const targetId = link.getAttribute('href').substring(1);
            
            // Cambiar sección activa
            changeSection(targetId);
            
            // Actualizar link activo
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // También manejar los botones "Ver Todas las Fotos" en la sección de inicio
    const viewPhotosButtons = document.querySelectorAll('.btn[href="#galeria"]');
    if (viewPhotosButtons.length > 0) {
        viewPhotosButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('href').substring(1);
                changeSection(targetId);
                
                // Actualizar link activo en la navegación
                navLinks.forEach(navLink => {
                    if (navLink.getAttribute('href') === `#${targetId}`) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                });
            });
        });
    }
}

// Función para cambiar de sección
function changeSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }
}

// Función para inicializar la galería
function initGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Cargar imágenes de muestra (en producción, se cargarían imágenes reales)
    galleryItems = sampleImages;
    
    // Renderizar la galería con todas las imágenes
    renderGallery(galleryItems);
    
    // Configurar modal
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Cerrar modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Cerrar modal con Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Navegación con teclado en el modal
    window.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                navigateGallery('prev');
            } else if (e.key === 'ArrowRight') {
                navigateGallery('next');
            }
        }
    });
    
    // Botones de navegación
    prevBtn.addEventListener('click', () => navigateGallery('prev'));
    nextBtn.addEventListener('click', () => navigateGallery('next'));
}

// Función para renderizar la galería
function renderGallery(items) {
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.innerHTML = '';
    
    items.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-id', item.id);
        galleryItem.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        
        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
        
        // Abrir modal al hacer clic en una imagen
        galleryItem.addEventListener('click', () => {
            openImageModal(index, items);
        });
    });
}

// Función para abrir el modal de imagen
function openImageModal(index, items) {
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('modal-img');
    
    currentImageIndex = index;
    
    // Mostrar la imagen seleccionada
    modalImg.src = items[index].src;
    modalImg.alt = items[index].alt;
    
    // Mostrar el modal
    modal.style.display = 'block';
}

// Función para navegar por la galería en el modal
function navigateGallery(direction) {
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('modal-img');
    
    // Calcular el nuevo índice
    if (direction === 'prev') {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : galleryItems.length - 1;
    } else {
        currentImageIndex = (currentImageIndex < galleryItems.length - 1) ? currentImageIndex + 1 : 0;
    }
    
    // Actualizar la imagen
    modalImg.src = galleryItems[currentImageIndex].src;
    modalImg.alt = galleryItems[currentImageIndex].alt;
}

// Función para inicializar los botones de copiar
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtener el ID del elemento a copiar
            const copyId = button.getAttribute('data-copy');
            const textToCopy = document.getElementById(copyId).textContent;
            
            // Copiar al portapapeles
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Cambiar texto del botón temporalmente
                    const originalText = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i> Copiado';
                    
                    // Restaurar texto original después de 2 segundos
                    setTimeout(() => {
                        button.innerHTML = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error al copiar: ', err);
                });
        });
    });
}

// Función para inicializar el menú responsive
function initResponsiveMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace (en móvil)
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menu.classList.remove('active');
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !menu.contains(e.target) && 
            !menuToggle.contains(e.target) &&
            menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
}
