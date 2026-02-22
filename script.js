// ================== INITIALIZATION ==================
let currentPhotoEffect = 'normal';

// ================== DOM ELEMENTS ==================
const profilePhoto = document.getElementById('profilePhoto');
const photoBox = document.querySelector('.photo-box');
const effectButtons = document.querySelectorAll('.effect-btn');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('.section');

// ================== PHOTO EFFECTS ==================
function applyPhotoEffect(effect) {
    currentPhotoEffect = effect;
    
    // Reset all effects first
    profilePhoto.style.filter = 'none';
    photoBox.style.boxShadow = '';
    photoBox.style.borderColor = 'var(--neon-blue)';
    
    switch(effect) {
        case 'normal':
            // Default effect
            photoBox.style.boxShadow = '0 0 50px var(--neon-blue), 0 0 100px rgba(0, 243, 255, 0.5)';
            photoBox.style.borderColor = 'var(--neon-blue)';
            break;
            
        case 'neon':
            // Neon glow effect
            profilePhoto.style.filter = 'brightness(1.2) contrast(1.1) saturate(1.3)';
            photoBox.style.boxShadow = '0 0 70px var(--neon-pink), 0 0 140px rgba(255, 0, 255, 0.6), 0 0 200px rgba(0, 243, 255, 0.3)';
            photoBox.style.borderColor = 'var(--neon-pink)';
            break;
            
        case 'grayscale':
            // Grayscale effect
            profilePhoto.style.filter = 'grayscale(100%) brightness(1.1)';
            photoBox.style.boxShadow = '0 0 40px var(--neon-green), 0 0 80px rgba(0, 255, 157, 0.5)';
            photoBox.style.borderColor = 'var(--neon-green)';
            break;
    }
}

// ================== EFFECT BUTTONS ==================
effectButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        effectButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get effect from button id
        const effect = this.id.replace('Mode', '').toLowerCase();
        applyPhotoEffect(effect);
        
        // Show notification
        showNotification(`${effect.toUpperCase()} mode activated!`);
    });
});

// ================== AUTO CYCLE EFFECTS ==================
function autoCycleEffects() {
    const effects = ['normal', 'neon', 'grayscale'];
    const currentIndex = effects.indexOf(currentPhotoEffect);
    const nextIndex = (currentIndex + 1) % effects.length;
    
    // Find and click the corresponding button
    const nextButton = document.getElementById(`${effects[nextIndex]}Mode`);
    if (nextButton) {
        nextButton.click();
    }
}

// Start auto-cycling every 10 seconds
setInterval(autoCycleEffects, 10000);

// ================== TYPING ANIMATION ==================
function typeWriterEffect() {
    const title = document.querySelector('.hero h1');
    const originalText = title.textContent;
    title.textContent = '';
    let charIndex = 0;
    
    function typeCharacter() {
        if (charIndex < originalText.length) {
            title.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCharacter, 500);
}

// ================== SCROLL ANIMATIONS ==================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ================== SMOOTH SCROLL ==================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================== CONTACT FORM ==================
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill all fields!', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I will contact you soon.', 'success');
        
        // Reset form
        this.reset();
        
        // Log form data (in real app, you would send to server)
        console.log('Form submitted:', { name, email, message });
    });
}

// ================== NOTIFICATION SYSTEM ==================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.background = 'rgba(0, 255, 157, 0.1)';
        notification.style.borderColor = 'var(--neon-green)';
        notification.style.boxShadow = '0 0 20px var(--neon-green)';
    } else if (type === 'error') {
        notification.style.background = 'rgba(255, 85, 85, 0.1)';
        notification.style.borderColor = '#ff5555';
        notification.style.boxShadow = '0 0 20px #ff5555';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ================== IMAGE FALLBACK ==================
function initImageFallback() {
    profilePhoto.onerror = function() {
        // Use a placeholder image if original fails
        this.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&h=500&fit=crop';
        showNotification('Profile image not found. Using placeholder.', 'error');
    };
}

// ================== HOVER EFFECTS ==================
function initHoverEffects() {
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    // Skill item hover effects
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(-5px) rotate(0)';
        });
    });
    
    // Button click animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// ================== NAVIGATION SCROLL EFFECT ==================
function initNavScroll() {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.padding = '0.8rem 5%';
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.boxShadow = '0 5px 30px rgba(0, 243, 255, 0.15)';
        } else {
            nav.style.padding = '1.2rem 5%';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
}

// ================== INITIALIZE EVERYTHING ==================
window.addEventListener('load', function() {
    // Initialize all features
    typeWriterEffect();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
    initImageFallback();
    initHoverEffects();
    initNavScroll();
    
    // Apply default effect
    applyPhotoEffect('normal');
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to my portfolio! 👋', 'success');
    }, 1000);
});

// ================== KEYBOARD SHORTCUTS ==================
document.addEventListener('keydown', function(e) {
    // Number keys 1, 2, 3 to switch effects
    if (e.key >= '1' && e.key <= '3') {
        const effects = ['normal', 'neon', 'grayscale'];
        const index = parseInt(e.key) - 1;
        if (effects[index]) {
            document.getElementById(`${effects[index]}Mode`).click();
        }
    }
    
    // Space to toggle auto-cycle
    if (e.code === 'Space') {
        e.preventDefault();
        autoCycleEffects();
    }
    
    // Escape to reset to normal
    if (e.code === 'Escape') {
        document.getElementById('normalMode').click();
    }
});

// ================== ADD NOTIFICATION STYLES ==================
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: rgba(0, 243, 255, 0.1);
        border: 1px solid var(--neon-blue);
        border-radius: 10px;
        color: var(--light);
        backdrop-filter: blur(10px);
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10001;
        font-weight: 500;
        box-shadow: var(--glow-blue);
    }
`;
document.head.appendChild(notificationStyle);