 // CHAT MODAL FUNCTIONALITY
 

class ChatModal {
    constructor() {
        this.chatBtn = document.getElementById('chatBtn');
        this.closeBtn = document.getElementById('closeChat');
        this.chatModal = document.getElementById('chatModal');
        this.chatForm = document.getElementById('chatForm');
        this.successMessage = document.getElementById('chatSuccess');

        this.init();
    }

    init() {
        if (this.chatBtn) {
            this.chatBtn.addEventListener('click', () => this.openModal());
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.chatModal) {
            this.chatModal.addEventListener('click', (e) => {
                // Close modal if clicking outside the content
                if (e.target === this.chatModal) {
                    this.closeModal();
                }
            });
        }

        if (this.chatForm) {
            this.chatForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal() {
        if (this.chatModal) {
            this.chatModal.classList.add('show');
            // Reset form when opening
            this.resetForm();
        }
    }

    closeModal() {
        if (this.chatModal) {
            this.chatModal.classList.remove('show');
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        // Get form inputs
        const nameInput = document.getElementById('chatName');
        const emailInput = document.getElementById('chatEmail');
        const messageInput = document.getElementById('chatMessage');

        // Reset previous errors
        this.clearErrors();

        // Validate inputs
        let isValid = true;

        if (!nameInput.value.trim()) {
            this.showError('nameError', 'Name is required');
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            this.showError('emailError', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(emailInput.value)) {
            this.showError('emailError', 'Please enter a valid email');
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            this.showError('messageError', 'Message is required');
            isValid = false;
        }

        // If valid, show success message
        if (isValid) {
            this.showSuccessMessage();
            this.chatForm.style.display = 'none';

            // Reset and close modal after 2 seconds
            setTimeout(() => {
                this.resetForm();
                this.closeModal();
            }, 2000);
        }
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';

            // Find the form group parent and add error class
            const inputField = errorElement.previousElementSibling;
            if (inputField && inputField.parentElement) {
                inputField.parentElement.classList.add('error');
            }
        }
    }

    clearErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });

        const formGroups = document.querySelectorAll('.chat-form .form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
    }

    showSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.classList.add('show');
        }
    }

    resetForm() {
        if (this.chatForm) {
            this.chatForm.reset();
            this.chatForm.style.display = 'flex';
        }

        if (this.successMessage) {
            this.successMessage.classList.remove('show');
        }

        this.clearErrors();
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize chat modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatModal();
});
