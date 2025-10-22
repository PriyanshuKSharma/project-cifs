// Main JavaScript file for the Cybercrime Prevention App

// Enhanced navbar toggle function for all screen sizes
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const icon = toggleBtn.querySelector('i');
    const isDesktop = window.innerWidth > 768;
    
    // Add pulse animation to button
    toggleBtn.style.animation = 'none';
    setTimeout(() => {
        toggleBtn.style.animation = 'quantumButton 3s ease-in-out infinite';
    }, 100);
    
    // Handle different behaviors for desktop vs mobile
    if (isDesktop) {
        // Desktop behavior - slide/fade toggle
        if (navMenu.classList.contains('collapsed')) {
            navMenu.classList.remove('collapsed');
            navMenu.classList.add('active');
        } else {
            navMenu.classList.add('collapsed');
            navMenu.classList.remove('active');
        }
    } else {
        // Mobile behavior - dropdown toggle
        navMenu.classList.toggle('active');
    }
    
    // Enhanced icon transition with rotation
    const isActive = navMenu.classList.contains('active') && !navMenu.classList.contains('collapsed');
    
    if (isActive) {
        icon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            icon.className = 'fas fa-times';
            icon.style.transform = 'rotate(0deg)';
        }, 150);
    } else {
        icon.style.transform = 'rotate(-180deg)';
        setTimeout(() => {
            icon.className = 'fas fa-bars';
            icon.style.transform = 'rotate(0deg)';
        }, 150);
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
                    field.style.borderColor = '#ddd';
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
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                
                if (file.size > maxSize) {
                    showNotification('File size must be less than 5MB', 'error');
                    this.value = '';
                    return;
                }
                
                if (!allowedTypes.includes(file.type)) {
                    showNotification('Invalid file type. Please upload JPG, PNG, GIF, PDF, DOC, or DOCX files only.', 'error');
                    this.value = '';
                    return;
                }
                
                showNotification('File selected successfully', 'success');
            }
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close navbar menu when clicking outside with enhanced animation
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        const isDesktop = window.innerWidth > 768;
        
        if (navMenu && toggleBtn && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            const isMenuOpen = navMenu.classList.contains('active') && !navMenu.classList.contains('collapsed');
            
            if (isMenuOpen) {
                if (isDesktop) {
                    navMenu.classList.add('collapsed');
                    navMenu.classList.remove('active');
                } else {
                    navMenu.classList.remove('active');
                }
                
                const icon = toggleBtn.querySelector('i');
                icon.style.transform = 'rotate(-180deg)';
                setTimeout(() => {
                    icon.className = 'fas fa-bars';
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            }
        }
    });
    
    // Handle window resize to reset navbar state
    window.addEventListener('resize', function() {
        const navMenu = document.getElementById('navMenu');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && toggleBtn) {
            navMenu.classList.remove('active', 'collapsed');
            const icon = toggleBtn.querySelector('i');
            icon.className = 'fas fa-bars';
            icon.style.transform = 'rotate(0deg)';
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

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `<p>${message}</p>`;
    
    // Insert at the top of the page
    const header = document.querySelector('.navbar');
    if (header) {
        header.insertAdjacentElement('afterend', notification);
    } else {
        document.body.insertBefore(notification, document.body.firstChild);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Format dates consistently
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Loading state for forms
function setFormLoading(form, loading = true) {
    const submitButton = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    if (loading) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        inputs.forEach(input => input.disabled = true);
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = submitButton.getAttribute('data-original-text') || 'Submit';
        inputs.forEach(input => input.disabled = false);
    }
}

// Initialize tooltips (if using a tooltip library)
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}