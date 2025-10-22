// Ultra-Premium Cyberpunk Effects
document.addEventListener('DOMContentLoaded', function() {
    createMatrixRain();
    createNeonGrid();
    addCyberpunkAnimations();
    createHolographicEffects();
    addGlitchEffects();
    createEnergyOrbs();
});

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const drops = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const columns = Math.floor(canvas.width / 20);
        drops.length = 0;
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 17, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = '16px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * 20, drops[i]);
            
            if (drops[i] > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += 20;
        }
        
        requestAnimationFrame(animate);
    }
    
    resize();
    animate();
    window.addEventListener('resize', resize);
}

function createNeonGrid() {
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
        opacity: 0.15;
    `;
    
    document.body.appendChild(canvas);
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const gridSize = 50;
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#ff0080');
        gradient.addColorStop(0.5, '#00d4ff');
        gradient.addColorStop(1, '#7928ca');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        
        // Vertical lines
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Animated pulse lines
        const time = Date.now() * 0.001;
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 2;
        
        // Horizontal pulse
        const pulseY = (Math.sin(time) * 0.5 + 0.5) * canvas.height;
        ctx.strokeStyle = '#00ff88';
        ctx.beginPath();
        ctx.moveTo(0, pulseY);
        ctx.lineTo(canvas.width, pulseY);
        ctx.stroke();
        
        // Vertical pulse
        const pulseX = (Math.cos(time * 0.7) * 0.5 + 0.5) * canvas.width;
        ctx.strokeStyle = '#ff0080';
        ctx.beginPath();
        ctx.moveTo(pulseX, 0);
        ctx.lineTo(pulseX, canvas.height);
        ctx.stroke();
    }
    
    function animate() {
        drawGrid();
        requestAnimationFrame(animate);
    }
    
    resize();
    animate();
    window.addEventListener('resize', resize);
}

function addCyberpunkAnimations() {
    // Floating elements
    document.querySelectorAll('.feature-card, .stat-card').forEach((card, index) => {
        card.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite alternate`;
    });
    
    // Glowing borders
    document.querySelectorAll('.btn, .feature-card, .auth-card').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 50px rgba(255, 0, 128, 0.6), inset 0 0 50px rgba(0, 212, 255, 0.1)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Text glitch effect on hover
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
    });
}

function createHolographicEffects() {
    // Add holographic shimmer to cards
    document.querySelectorAll('.feature-card').forEach(card => {
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: shimmer 3s ease-in-out infinite;
            pointer-events: none;
        `;
        card.style.position = 'relative';
        card.appendChild(shimmer);
    });
}

function addGlitchEffects() {
    // Random glitch effect on elements
    setInterval(() => {
        const elements = document.querySelectorAll('.nav-logo, .hero h1');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        if (randomElement && Math.random() > 0.95) {
            randomElement.style.animation = 'glitch 0.2s ease-in-out';
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 200);
        }
    }, 2000);
}

function createEnergyOrbs() {
    const orbContainer = document.createElement('div');
    orbContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(orbContainer);
    
    function createOrb() {
        const orb = document.createElement('div');
        const size = Math.random() * 100 + 50;
        const colors = ['#ff0080', '#00d4ff', '#00ff88', '#7928ca'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        orb.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, ${color}40 0%, transparent 70%);
            box-shadow: 0 0 ${size}px ${color}60;
            animation: orbFloat ${10 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: 100%;
        `;
        
        orbContainer.appendChild(orb);
        
        setTimeout(() => {
            orb.remove();
        }, 20000);
    }
    
    setInterval(createOrb, 3000);
}

// Add CSS animations
const cyberpunkStyles = document.createElement('style');
cyberpunkStyles.textContent = `
    @keyframes float {
        from { transform: translateY(0px); }
        to { transform: translateY(-20px); }
    }
    
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    @keyframes orbFloat {
        from {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
    
    /* Cyberpunk scrollbar */
    ::-webkit-scrollbar {
        width: 16px;
    }
    
    ::-webkit-scrollbar-track {
        background: #000011;
        border: 1px solid #ff0080;
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #ff0080, #00d4ff);
        border-radius: 8px;
        border: 2px solid #000011;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #00d4ff, #00ff88);
        box-shadow: 0 0 10px #00d4ff;
    }
    
    /* Enhanced selection */
    ::selection {
        background: rgba(255, 0, 128, 0.3);
        color: #00ff88;
        text-shadow: 0 0 10px #00ff88;
    }
    
    /* Cyberpunk focus states */
    input:focus, textarea:focus, select:focus {
        outline: none !important;
        border-color: #ff0080 !important;
        box-shadow: 0 0 20px rgba(255, 0, 128, 0.5) !important;
        background: rgba(255, 0, 128, 0.05) !important;
    }
    
    /* Neon text effect */
    .neon-text {
        color: #00ff88;
        text-shadow: 
            0 0 5px #00ff88,
            0 0 10px #00ff88,
            0 0 15px #00ff88,
            0 0 20px #00ff88;
        animation: neonFlicker 2s infinite alternate;
    }
    
    @keyframes neonFlicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
`;

document.head.appendChild(cyberpunkStyles);