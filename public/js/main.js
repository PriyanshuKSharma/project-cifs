// Simple JavaScript for Cybercrime Prevention Website

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleBtn = document.querySelector('button[onclick="toggleMobileMenu()"]');
    const icon = toggleBtn.querySelector('i');
    
    mobileMenu.classList.toggle('hidden');
    
    if (mobileMenu.classList.contains('hidden')) {
        icon.className = 'fas fa-bars';
    } else {
        icon.className = 'fas fa-times';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#dee2e6';
                }
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });

    // Password confirmation validation
    const confirmPasswordField = document.getElementById('confirmPassword');
    const passwordField = document.getElementById('password');
    
    if (confirmPasswordField && passwordField) {
        confirmPasswordField.addEventListener('input', function() {
            if (this.value !== passwordField.value) {
                this.setCustomValidity('Passwords do not match');
                this.style.borderColor = '#e74c3c';
            } else {
                this.setCustomValidity('');
                this.style.borderColor = '#27ae60';
            }
        });
    }

    // File upload validation
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const maxSize = 5 * 1024 * 1024; // 5MB
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
                
                if (file.size > maxSize) {
                    showNotification('File size must be less than 5MB', 'error');
                    this.value = '';
                    return;
                }
                
                if (!allowedTypes.includes(file.type)) {
                    showNotification('Please upload JPG, PNG, GIF, or PDF files only.', 'error');
                    this.value = '';
                    return;
                }
                
                showNotification('File selected successfully', 'success');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && toggleBtn && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                toggleBtn.querySelector('i').className = 'fas fa-bars';
            }
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.getElementById('navMenu');
            const toggleBtn = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && toggleBtn) {
                navMenu.classList.remove('active');
                toggleBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
    });

    // Auto-resize textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });

    // Confirmation dialogs for delete actions
    const deleteButtons = document.querySelectorAll('[data-confirm]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const message = this.getAttribute('data-confirm') || 'Are you sure you want to delete this item?';
            if (!confirm(message)) {
                e.preventDefault();
            }
        });
    });
});

// Show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `<p>${message}</p>`;
    
    const header = document.querySelector('.navbar');
    if (header) {
        header.insertAdjacentElement('afterend', notification);
    } else {
        document.body.insertBefore(notification, document.body.firstChild);
    }
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard', 'error');
    });
}