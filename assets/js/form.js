// assets/js/form.js
class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) {
            console.error(`Form with id "${formId}" not found`);
            return;
        }
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.setupListeners();
    }

    setupListeners() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit(e);
        });
    }

    async handleSubmit(e) {
        // Disable button and show loading state
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Mengirim...';

        try {
            const formData = new FormData(this.form);
            
            // Add form metadata
            formData.append('_subject', 'New Contact Form Submission');
            formData.append('_format', 'plain');
            
            const response = await fetch('https://formspree.io/f/mnnnqzbo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Server error');
            }

            const data = await response.json();

            if (data.ok) {
                // Success
                this.showMessage('Pesan berhasil dikirim! Terima kasih.', 'success');
                this.form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Maaf, terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            // Reset button state
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Kirim Pesan';
        }
    }

    showMessage(message, type) {
        // Create or update message element
        let messageEl = this.form.querySelector('.form-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            this.form.insertBefore(messageEl, this.submitBtn.parentNode);
        }

        // Set message and styling
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;

        // Add CSS for messages
        if (!document.querySelector('#form-message-styles')) {
            const style = document.createElement('style');
            style.id = 'form-message-styles';
            style.textContent = `
                .form-message {
                    padding: 1rem;
                    margin-bottom: 1rem;
                    border-radius: 4px;
                    text-align: center;
                }
                .form-message.success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .form-message.error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
            `;
            document.head.appendChild(style);
        }

        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}