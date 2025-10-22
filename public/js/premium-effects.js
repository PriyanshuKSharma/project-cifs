// Premium UI Effects and Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles background
    createFloatingParticles();
    
    // Add premium hover effects
    addPremiumHoverEffects();
    
    // Initialize smooth scrolling with easing
    initSmoothScrolling();
    
    // Add typing effect to hero
    addTypingEffect();
    
    // Create interactive gradient cursor
    createGradientCursor();
    
    // Add parallax scrolling effects
    addParallaxEffects();
});

function createFloatingParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.6;
    `;
    
    document.body.appendChild(canvas);
    
    let particles = [];
    const particleCount = 80;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            hue: Math.random() * 60 + 200 // Blue to purple range
        };
    }
    
    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle with gradient
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`);
            gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Connect nearby particles
            particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    resize();
    init();
    animate();
    
    window.addEventListener('resize', () => {
        resize();
        init();
    });
}

function addPremiumHoverEffects() {
    // Enhanced card hover effects
    document.querySelectorAll('.feature-card, .stat-card, .premium-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-12px) scale(1.03) rotateX(5deg)';
            this.style.boxShadow = '0 35px 60px -12px rgba(0, 0, 0, 0.4)';
            
            // Add glow effect
            this.style.filter = 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            this.style.boxShadow = '';
            this.style.filter = '';
        });
        
        // Add tilt effect based on mouse position
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-12px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // Enhanced button effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = '';
        });
    });
}

function initSmoothScrolling() {
    // Enhanced smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 100;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutCubic(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t * t + b;
                    t -= 2;
                    return c / 2 * (t * t * t + 2) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

function addTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid rgba(255,255,255,0.8)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

function createGradientCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255,0,128,0.8) 0%, rgba(0,212,255,0.4) 50%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        transition: transform 0.1s ease;
        mix-blend-mode: normal;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

function addParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .features');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add CSS for enhanced effects
const premiumStyles = document.createElement('style');
premiumStyles.textContent = `
    /* Enhanced transitions */
    * {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Smooth scrollbar */
    ::-webkit-scrollbar {
        width: 12px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgba(15, 23, 42, 0.1);
        border-radius: 6px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6);
        border-radius: 6px;
        border: 2px solid transparent;
        background-clip: content-box;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #0891b2, #2563eb, #7c3aed);
        background-clip: content-box;
    }
    
    /* Enhanced focus states */
    button:focus,
    input:focus,
    textarea:focus,
    select:focus {
        outline: 2px solid rgba(59, 130, 246, 0.5);
        outline-offset: 2px;
    }
    
    /* Improved text selection */
    ::selection {
        background: rgba(59, 130, 246, 0.3);
        color: white;
    }
    
    /* Enhanced loading states */
    .loading {
        position: relative;
        overflow: hidden;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;

document.head.appendChild(premiumStyles);