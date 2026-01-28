/* ==========================================
   INDUSTRIAL POWER SOLUTIONS - MAIN JAVASCRIPT
   Smooth scrolling, Navigation highlight, Mobile menu, Form validation
   ========================================== */

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle) {
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
        }
    });
}

// ========== FORM VALIDATION & SUBMISSION ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // Validate form
        let isValid = true;
        const formData = {};

        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');

        // Validate Name
        if (!nameField.value.trim()) {
            nameField.parentElement.classList.add('error');
            isValid = false;
        } else {
            formData.name = nameField.value.trim();
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
            emailField.parentElement.classList.add('error');
            isValid = false;
        } else {
            formData.email = emailField.value.trim();
        }

        // Validate Subject
        if (!subjectField.value.trim()) {
            subjectField.parentElement.classList.add('error');
            isValid = false;
        } else {
            formData.subject = subjectField.value.trim();
        }

        // Validate Message
        if (!messageField.value.trim()) {
            messageField.parentElement.classList.add('error');
            isValid = false;
        } else {
            formData.message = messageField.value.trim();
        }

        // Add optional fields if provided
        const companyField = document.getElementById('company');
        const phoneField = document.getElementById('phone');
        const inquiryTypeField = document.getElementById('inquiryType');

        if (companyField && companyField.value.trim()) {
            formData.company = companyField.value.trim();
        }
        if (phoneField && phoneField.value.trim()) {
            formData.phone = phoneField.value.trim();
        }
        if (inquiryTypeField && inquiryTypeField.value) {
            formData.inquiryType = inquiryTypeField.value;
        }

        // If form is valid, show success message and reset form
        if (isValid) {
            // Log form data (in real application, this would be sent to a server)
            console.log('Form Data Submitted:', formData);
            console.log('Timestamp:', new Date().toISOString());

            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.add('show');

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(function () {
                    successMessage.classList.remove('show');
                }, 5000);
            }
        }
    });
}

// ========== STICKY HEADER EFFECT ==========
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add subtle shadow on scroll
    if (scrollTop > 0) {
        header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========== CARD HOVER EFFECT (Subtle) ==========
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
        this.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ========== BUTTON CLICK FEEDBACK ==========
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple effect point
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');

        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        // Add ripple animation if not already in stylesheet
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', '');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== SCROLL TO TOP BUTTON (Optional Enhancement) ==========
// Uncomment to add scroll-to-top functionality
/*
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.id = 'scrollToTopBtn';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: var(--color-navy);
    color: white;
    border: 2px solid var(--color-yellow-accent);
    padding: 10px 15px;
    cursor: pointer;
    display: none;
    z-index: 999;
    font-size: 1.5rem;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
*/

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and feature boxes for subtle fade-in effect
document.querySelectorAll('.card, .feature-box, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== ACCESSIBILITY IMPROVEMENTS ==========
// Ensure keyboard navigation works properly
document.addEventListener('keydown', function (e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu) {
        navMenu.classList.remove('active');
    }
});

// ========== PAGE LOAD COMPLETE ==========
window.addEventListener('load', function () {
    console.log('Industrial Power Solutions website loaded successfully');

    // Optional: Add any analytics or tracking code here
    // Example: trackPageView();
});