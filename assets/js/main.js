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
        // Mengambil button yang sudah ada di HTML
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        // Menyembunyikan button saat halaman dimuat
        this.button.classList.remove('visible');
        
        // Event listener untuk scroll
        window.addEventListener('scroll', () => this.toggleVisibility());
        
        // Event listener untuk click
        this.button.addEventListener('click', (e) => this.scrollToTop(e));
    }

    toggleVisibility() {
        // Tampilkan button setelah scroll 300px
        if (window.pageYOffset > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop(e) {
        e.preventDefault();
        // Smooth scroll ke atas
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', function() {
    new MobileMenu();
    new ScrollToTop();
});