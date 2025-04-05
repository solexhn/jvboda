// Variables globales
let currentSection = 'inicio';
let galleryItems = [];
let currentImageIndex = 0;

// Galería de imágenes
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
    console.log('DOM cargado completamente');
    
    // Primero, intentamos arreglar el botón de cierre del modal
    fixModalCloseButton();
    
    // Inicializar navegación
    initNavigation();
    
    // Inicializar galería
    initGallery();
    
    // Inicializar funcionalidad de copiar al portapapeles
    initCopyButtons();
    
    // Inicializar menú responsive
    initResponsiveMenu();
    
    // Inicializar nav sticky
    initStickyNav();
});

// NUEVA FUNCIÓN: Intento agresivo de arreglar el botón de cierre
function fixModalCloseButton() {
    console.log('Intentando arreglar el botón de cierre...');
    
    // 1. Verificar si existe el modal y el botón
    const modal = document.querySelector('.modal');
    let closeBtn = document.querySelector('.close');
    
    console.log('Modal encontrado:', !!modal);
    console.log('Botón cerrar encontrado:', !!closeBtn);
    
    if (!modal) {
        console.error('¡Modal no encontrado!');
        return;
    }
    
    // 2. Si el botón no existe, intentamos crearlo
    if (!closeBtn) {
        console.log('Creando un nuevo botón de cierre...');
        closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '15px';
        closeBtn.style.right = '25px';
        closeBtn.style.color = '#f1f1f1';
        closeBtn.style.fontSize = '35px';
        closeBtn.style.fontWeight = 'bold';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.zIndex = '2500';
        
        // Añadir al modal
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.appendChild(closeBtn);
        } else {
            modal.appendChild(closeBtn);
        }
    } else {
        // Asegurarnos que el botón existente tenga un z-index alto
        closeBtn.style.zIndex = '2500';
    }
    
    // 3. Asignar múltiples eventos para cerrarlo (por si alguno falla)
    
    // Método 1: addEventListener normal
    closeBtn.addEventListener('click', function(e) {
        console.log('Botón cerrar clickeado (método 1)');
        modal.style.display = 'none';
        e.stopPropagation(); // Prevenir propagación
    });
    
    // Método 2: onclick directo
    closeBtn.onclick = function(e) {
        console.log('Botón cerrar clickeado (método 2)');
        modal.style.display = 'none';
        e.stopPropagation(); // Prevenir propagación
        return false;
    };
    
    // Método 3: añadir evento al document para capturar cualquier clic en el botón
    document.addEventListener('click', function(e) {
        if (e.target === closeBtn) {
            console.log('Botón cerrar clickeado (método 3)');
            modal.style.display = 'none';
        }
    });
    
    // 4. Métodos alternativos para cerrar el modal
    
    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            console.log('Modal cerrado con Escape');
            modal.style.display = 'none';
        }
    });
    
    // Cerrar haciendo clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            console.log('Modal cerrado haciendo clic fuera');
            modal.style.display = 'none';
        }
    });
    
    console.log('Configuración de cierre del modal completada');
}

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

// funcion para cambiar de seccion
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

// Func para inicializar la galería
function initGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    
    // Cargar images de muestra (en prod, se cargarían imágenes reales)
    galleryItems = sampleImages;
    
    // Renderizar la galería con todas las imágenes
    renderGallery(galleryItems);
}

// Func para renderizar la galería
function renderGallery(items) {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;
    
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
        galleryItem.addEventListener('click', function() {
            openImageModal(index, items);
        });
    });
}

// Func para actualizar el contador de imágenes en el modal
function updateCounter() {
    const currentIndexElement = document.getElementById('current-index');
    const totalImagesElement = document.getElementById('total-images');
    
    if (currentIndexElement && totalImagesElement) {
        currentIndexElement.textContent = currentImageIndex + 1;
        totalImagesElement.textContent = galleryItems.length;
    }
}

// Func para abrir el modal de imagen
function openImageModal(index, items) {
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('modal-img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!modal || !modalImg) return;
    
    currentImageIndex = index;
    
    // Mostrar la imagen seleccionada
    modalImg.src = items[index].src;
    modalImg.alt = items[index].alt;
    
    // Configurar eventos de navegación
    if (prevBtn) {
        prevBtn.onclick = function() {
            navigateGallery('prev');
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = function() {
            navigateGallery('next');
        };
    }
    
    // Actualizar el contador de imágenes
    updateCounter();
    
    // Mostrar el modal
    modal.style.display = 'block';
    console.log('Modal abierto con imagen', index);
}

// Función para navegar por la galería en el modal
function navigateGallery(direction) {
    const modalImg = document.getElementById('modal-img');
    if (!modalImg) return;
    
    // Calcular el nuevo índice
    if (direction === 'prev') {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : galleryItems.length - 1;
    } else {
        currentImageIndex = (currentImageIndex < galleryItems.length - 1) ? currentImageIndex + 1 : 0;
    }
    
    // Actualizar la imagen
    modalImg.src = galleryItems[currentImageIndex].src;
    modalImg.alt = galleryItems[currentImageIndex].alt;
    
    // Actualizar el contador de imágenes
    updateCounter();
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

// Func para inicializar el comportamiento sticky de la navegación!!
function initStickyNav() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        // Determinar si debemos aplicar la clase sticky
        if (window.scrollY > 50) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
}

// Consejo en consola para depuración
console.log('Para cerrar el modal manualmente, ejecuta en consola: document.querySelector(".modal").style.display = "none"');
