// assets/js/main.js

class MobileMenu {
    constructor() {
        // Select elements
        this.button = document.querySelector('.mobile-menu-btn');
        this.nav = document.querySelector('nav ul');
        this.menuBars = this.button.querySelectorAll('span');
        this.isOpen = false;

        // Check if elements exist
        if (!this.button || !this.nav) {
            console.error('Mobile menu elements not found');
            return;
        }

        this.init();
    }

    init() {
        // Toggle menu on button click
        this.button.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.button.contains(e.target) && !this.nav.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu when clicking a nav link
        this.nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.nav.classList.toggle('show');
        this.button.classList.toggle('active');
        this.animateButton();
    }

    closeMenu() {
        this.isOpen = false;
        this.nav.classList.remove('show');
        this.button.classList.remove('active');
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
        this.menuBars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '';
        });
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
        this.sliderContainer = document.querySelector('.logo-slider-container');
        this.slider = document.querySelector('.logo-slider');
        if (!this.slider || !this.sliderContainer) return;
        this.init();
    }

    init() {
        // Pause animation on hover
        this.slider.addEventListener('mouseenter', () => {
            this.slider.style.animationPlayState = 'paused';
        });

        this.slider.addEventListener('mouseleave', () => {
            this.slider.style.animationPlayState = 'running';
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            this.slider.style.animationPlayState = document.hidden ? 'paused' : 'running';
        });

        // Check for slider overflow
        this.checkOverflow();
        window.addEventListener('resize', () => this.checkOverflow());
    }

    checkOverflow() {
        // Get the container width
        const containerWidth = this.sliderContainer.offsetWidth;
        
        // Get all original logos (not duplicates)
        const logos = this.slider.querySelectorAll('img');
        const logoCount = logos.length / 2; // Divide by 2 because we have duplicates
        
        // Calculate total width of original logos
        let totalWidth = 0;
        for (let i = 0; i < logoCount; i++) {
            const logo = logos[i];
            const style = window.getComputedStyle(logo);
            const width = logo.offsetWidth +
                         parseInt(style.marginLeft) +
                         parseInt(style.marginRight);
            totalWidth += width;
        }

        // If total width of logos is less than container, adjust gap
        if (totalWidth < containerWidth) {
            const gap = (containerWidth - totalWidth) / (logoCount - 1);
            this.slider.style.gap = `${gap}px`;
        }
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    new MobileMenu();
    new ScrollToTop();
    new FloatingButtons();
    new LogoSlider();
});