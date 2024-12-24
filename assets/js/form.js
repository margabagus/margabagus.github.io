// assets/js/form.js
class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
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
        // Tampilkan loading state
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
                // Sukses
                this.showMessage('Pesan berhasil dikirim! Terima kasih.', 'success');
                this.form.reset();
            } else {
                // Error dari Formspree
                throw new Error(data.error || 'Terjadi kesalahan saat mengirim pesan.');
            }
        } catch (error) {
            // Tampilkan pesan error
            this.showMessage('Maaf, terjadi kesalahan. Silakan coba lagi.', 'error');
            console.error('Error:', error);
        } finally {
            // Reset button state
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Kirim Pesan';
        }
    }

    showMessage(message, type) {
        // Cari atau buat elemen untuk pesan
        let messageEl = this.form.querySelector('.form-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            this.submitBtn.parentNode.insertBefore(messageEl, this.submitBtn.nextSibling);
        }

        // Set pesan dan styling
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;

        // Hapus pesan setelah 5 detik
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}