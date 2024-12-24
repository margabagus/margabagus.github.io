// assets/js/main.js

class MobileMenu {
    constructor() {
        this.button = document.querySelector('.mobile-menu-btn');
        this.nav = document.querySelector('nav ul');
        this.menuBars = this.button.querySelectorAll('span');
        this.isOpen = false;
        
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => this.toggleMenu());
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('nav')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.nav.classList.toggle('show');
        this.animateButton();
    }

    closeMenu() {
        this.isOpen = false;
        this.nav.classList.remove('show');
        this.resetButton();
    }

    animateButton() {
        if (this.isOpen) {
            this.menuBars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            this.menuBars[1].style.opacity = '0';
            this.menuBars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            this.resetButton();
        }
    }

    resetButton() {
        this.menuBars[0].style.transform = 'none';
        this.menuBars[1].style.opacity = '1';
        this.menuBars[2].style.transform = 'none';
    }
}

class ScrollToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;
        this.init();
    }

    init() {
        // Ensure button is hidden initially
        this.button.style.display = 'flex';
        this.button.classList.remove('visible');
        
        // Event listeners
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', (e) => this.scrollToTop(e));
    }

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

class FloatingButtons {
    constructor() {
        this.whatsappFloat = document.querySelector('.whatsapp-float');
        this.init();
    }

    init() {
        if (this.whatsappFloat) {
            // Ensure WhatsApp button is always visible
            this.whatsappFloat.style.display = 'flex';
            
            // Add hover effect
            this.whatsappFloat.addEventListener('mouseenter', () => {
                this.whatsappFloat.style.transform = 'scale(1.1)';
            });
            
            this.whatsappFloat.addEventListener('mouseleave', () => {
                this.whatsappFloat.style.transform = 'scale(1)';
            });
        }
    }
}

class LogoSlider {
    constructor() {
        this.slider = document.querySelector('.logo-slider');
        if (!this.slider) return;
        this.init();
    }

    init() {
        // Ensure container doesn't overflow
        this.slider.style.maxWidth = '100%';
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.slider.style.animationPlayState = 'paused';
            } else {
                this.slider.style.animationPlayState = 'running';
            }
        });

        // Recalculate animation duration based on content width
        this.updateAnimationDuration();
        window.addEventListener('resize', () => this.updateAnimationDuration());
    }

    updateAnimationDuration() {
        const totalWidth = this.slider.scrollWidth / 2; // Divide by 2 because items are cloned
        const duration = totalWidth / 50; // 50 pixels per second
        this.slider.style.animationDuration = `${duration}s`;
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    new MobileMenu();
    new ScrollToTop();
    new FloatingButtons();
    new LogoSlider();
});