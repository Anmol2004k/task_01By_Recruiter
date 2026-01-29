 // home page ka Slider 
// CAROUSEL / SLIDER FUNCTIONALITY
 

class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.autoSlideInterval = null;
        this.autoSlideDelay = 6000; // 6 seconds

        this.init();
    }

    init() {
        // Attach event listeners
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Indicator click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Start auto-slide
        this.startAutoSlide();

        // Pause auto-slide on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
            carouselContainer.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }

    showSlide(index) {
        // Validate index
        if (index >= this.slides.length) {
            this.currentSlide = 0;
        } else if (index < 0) {
            this.currentSlide = this.slides.length - 1;
        } else {
            this.currentSlide = index;
        }

        // Remove active class from all slides and indicators
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
        this.resetAutoSlide();
    }

    prevSlide() {
        this.showSlide(this.currentSlide - 1);
        this.resetAutoSlide();
    }

    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoSlide();
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.showSlide(this.currentSlide + 1);
        }, this.autoSlideDelay);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }

    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});
