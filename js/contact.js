/**
 * Contact Form Handler
 * Loaded only on contact.html
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.textContent;
            
            // Show sending state
            btn.textContent = '✉️ Sending...';
            btn.style.background = 'linear-gradient(135deg, #ff9800, #ff5722)';
            btn.disabled = true;
            
            // Let FormSubmit handle the actual submission
            setTimeout(() => {
                btn.textContent = '✓ Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            }, 1500);
        });
    }
});
