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
        this.setupMessageContainer(); // Add message container on init
    }

    setupListeners() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit(e);
        });
    }

    setupMessageContainer() {
        // Create message container if it doesn't exist
        if (!this.form.querySelector('.form-message-container')) {
            const messageContainer = document.createElement('div');
            messageContainer.className = 'form-message-container';
            // Insert after the last form group, before the button
            const lastFormGroup = this.form.querySelector('.form-group:last-of-type');
            if (lastFormGroup) {
                lastFormGroup.after(messageContainer);
            } else {
                this.form.insertBefore(messageContainer, this.submitBtn);
            }
        }
    }

    async handleSubmit(e) {
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Mengirim...';

        try {
            const response = await fetch('https://formspree.io/f/mnnnqzbo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(this.form)
            });

            const data = await response.json();

            if (response.ok) {
                this.showMessage('Pesan berhasil dikirim! Terima kasih.', 'success');
                this.form.reset();
            } else {
                throw new Error(data.error || 'Terjadi kesalahan saat mengirim pesan.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Maaf, terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Kirim Pesan';
        }
    }

    showMessage(message, type) {
        const messageContainer = this.form.querySelector('.form-message-container');
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;

        // Clear previous messages
        messageContainer.innerHTML = '';
        messageContainer.appendChild(messageEl);

        // Add styles if not already added
        if (!document.querySelector('#form-message-styles')) {
            const style = document.createElement('style');
            style.id = 'form-message-styles';
            style.textContent = `
                .form-message-container {
                    margin: 1rem 0;
                }
                .form-message {
                    padding: 1rem;
                    border-radius: 4px;
                    margin-bottom: 1rem;
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