// Logo Slider functionality
class LogoSlider {
    constructor() {
        this.slider = document.querySelector('.logo-slider');
        if (!this.slider) return;

        this.init();
    }

    init() {
        // Clone items for infinite scroll
        const items = this.slider.children;
        const itemsCount = items.length;
        
        // Create a copy of all items
        for (let i = 0; i < itemsCount; i++) {
            const clone = items[i].cloneNode(true);
            this.slider.appendChild(clone);
        }

        // Add pause on hover functionality
        this.slider.addEventListener('mouseenter', () => {
            this.slider.style.animationPlayState = 'paused';
        });

        this.slider.addEventListener('mouseleave', () => {
            this.slider.style.animationPlayState = 'running';
        });

        // Handle visibility change to prevent jumping
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.slider.style.animationPlayState = 'paused';
            } else {
                this.slider.style.animationPlayState = 'running';
            }
        });

        // Recalculate animation duration based on the number of logos
        const totalWidth = this.slider.scrollWidth / 2; // Divide by 2 because we cloned the items
        const duration = totalWidth / 50; // 50 pixels per second
        this.slider.style.animationDuration = `${duration}s`;
    }
}

// Initialize logo slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LogoSlider();
});