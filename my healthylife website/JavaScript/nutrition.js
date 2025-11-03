// Get the modal and track current image
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modalImg");
var currentIndex = 0;
var images = [];

// Function to open modal
function openModal(element) {
    // Get all gallery images and find clicked image index
    images = Array.from(document.querySelectorAll('.gallery-item img'));
    currentIndex = images.findIndex(img => img.src === element.querySelector('img').src);
    
    modal.style.display = "block";
    modalImg.src = images[currentIndex].src;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Function to change image
function changeImage(direction) {
    currentIndex += direction;
    
    // Loop around if we reach the end or beginning
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    
    modalImg.src = images[currentIndex].src;
}

// Function to close modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Handle keyboard navigation
document.addEventListener('keydown', function(event) {
    if (modal.style.display === "block") {
        if (event.key === "Escape") {
            closeModal();
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "ArrowRight") {
            changeImage(1);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close-button');
    const galleryImages = document.querySelectorAll('.gallery-image');

    // Open modal when clicking an image
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modal.classList.add('fade-in');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when clicking the close button
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('fade-in');
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Navigation menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                menuToggle.checked = false;
                navLinks.style.transform = 'translateX(100%)';
            }
        });
    });

    const gallery = document.querySelector('.gallery');
    if (gallery) {
        const images = Array.from(gallery.querySelectorAll('.gallery-item'));
        let currentIndex = 0;
        
       
        const carousel = document.createElement('div');
        carousel.className = 'carousel';
        carousel.style.position = 'relative';
        carousel.style.overflow = 'hidden';
        carousel.style.borderRadius = '10px';
        
     
        const track = document.createElement('div');
        track.className = 'carousel-track';
        track.style.display = 'flex';
        track.style.transition = 'transform 0.5s ease';
        
        images.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.style.minWidth = '100%';
            slide.appendChild(img.cloneNode(true));
            track.appendChild(slide);
        });
        
        carousel.appendChild(track);
        gallery.parentNode.replaceChild(carousel, gallery);
        
        
        const controls = document.createElement('div');
        controls.style.cssText = 'display:flex; justify-content:center; gap:10px; margin-top:15px;';
        
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '❮';
        prevBtn.style.cssText = 'background:var(--primary); color:white; border:none; border-radius:50%; width:40px; height:40px; cursor:pointer;';
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '❯';
        nextBtn.style.cssText = 'background:var(--primary); color:white; border:none; border-radius:50%; width:40px; height:40px; cursor:pointer;';
        
        const indicators = document.createElement('div');
        indicators.style.cssText = 'display:flex; gap:5px; align-items:center;';
        
        images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.style.cssText = `width:10px; height:10px; border-radius:50%; border:none; background:${i===0?'var(--primary)':'#ccc'}; cursor:pointer;`;
            dot.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(dot);
        });
        
        controls.appendChild(prevBtn);
        controls.appendChild(indicators);
        controls.appendChild(nextBtn);
        carousel.parentNode.insertBefore(controls, carousel.nextSibling);
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.style.background = i === currentIndex ? 'var(--primary)' : '#ccc';
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
      
        let slideInterval = setInterval(nextSlide, 4000);
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 4000));
        
        updateCarousel();
    }

    document.querySelectorAll('.info-card, .tool-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
});