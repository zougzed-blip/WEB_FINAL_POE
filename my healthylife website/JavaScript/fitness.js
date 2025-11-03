document.addEventListener('DOMContentLoaded', function() {
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

    const tipsContainer = document.querySelector('.tips-flex');
    if (tipsContainer) {
        const tips = Array.from(tipsContainer.querySelectorAll('.tip-card'));
        let currentTip = 0;
        
        const carousel = document.createElement('div');
        carousel.className = 'tips-carousel';
        carousel.style.position = 'relative';
        carousel.style.overflow = 'hidden';
        
        const track = document.createElement('div');
        track.style.display = 'flex';
        track.style.transition = 'transform 0.5s ease';
        
        tips.forEach(tip => {
            const slide = document.createElement('div');
            slide.style.minWidth = '100%';
            slide.appendChild(tip.cloneNode(true));
            track.appendChild(slide);
        });
        
        carousel.appendChild(track);
        tipsContainer.parentNode.replaceChild(carousel, tipsContainer);
        
        const controls = document.createElement('div');
        controls.style.cssText = 'display:flex; justify-content:center; gap:10px; margin-top:15px;';
        
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '❮';
        prevBtn.style.cssText = 'background:var(--primary); color:white; border:none; border-radius:50%; width:40px; height:40px; cursor:pointer;';
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '❯';
        nextBtn.style.cssText = 'background:var(--primary); color:white; border:none; border-radius:50%; width:40px; height:40px; cursor:pointer;';
        
        const dots = document.createElement('div');
        dots.style.cssText = 'display:flex; gap:5px; align-items:center;';
        
        tips.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.style.cssText = `width:10px; height:10px; border-radius:50%; border:none; background:${i===0?'var(--primary)':'#ccc'}; cursor:pointer;`;
            dot.addEventListener('click', () => goToTip(i));
            dots.appendChild(dot);
        });
        
        controls.appendChild(prevBtn);
        controls.appendChild(dots);
        controls.appendChild(nextBtn);
        carousel.parentNode.insertBefore(controls, carousel.nextSibling);
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentTip * 100}%)`;
            dots.querySelectorAll('button').forEach((dot, i) => {
                dot.style.background = i === currentTip ? 'var(--primary)' : '#ccc';
            });
        }
        
        function nextTip() {
            currentTip = (currentTip + 1) % tips.length;
            updateCarousel();
        }
        
        function prevTip() {
            currentTip = (currentTip - 1 + tips.length) % tips.length;
            updateCarousel();
        }
        
        function goToTip(index) {
            currentTip = index;
            updateCarousel();
        }
        
        prevBtn.addEventListener('click', prevTip);
        nextBtn.addEventListener('click', nextTip);
        
        let tipInterval = setInterval(nextTip, 4000);
        carousel.addEventListener('mouseenter', () => clearInterval(tipInterval));
        carousel.addEventListener('mouseleave', () => tipInterval = setInterval(nextTip, 4000));
        
        updateCarousel();
    }

    const table = document.querySelector('table');
    if (table) {
        const rows = table.querySelectorAll('tbody tr');
        const colors = {
            'Monday': '#4CAF50',
            'Tuesday': '#2196F3', 
            'Wednesday': '#FF9800',
            'Thursday': '#9C27B0',
            'Friday': '#F44336'
        };
        
        rows.forEach(row => {
            const day = row.cells[0].textContent.trim();
            if (colors[day]) {
                row.style.borderLeft = `4px solid ${colors[day]}`;
            }
            
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    }

    const video = document.querySelector('video');
    if (video) {
        const container = document.querySelector('.video-container');
        const playBtn = document.createElement('div');
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.7); color:white; border-radius:50%; width:60px; height:60px; display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:5;';
        
        container.style.position = 'relative';
        container.appendChild(playBtn);
        
        playBtn.addEventListener('click', function() {
            video.play();
            this.style.display = 'none';
        });
        
        video.addEventListener('pause', function() {
            playBtn.style.display = 'flex';
        });
    }
});