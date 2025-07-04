// Theme Management
class ThemeManager {
    constructor() {
        this.themes = [
            { name: 'light', display: '☀️ Light', icon: '☀️' },
            { name: 'dark', display: '🌙 Dark', icon: '🌙' },
            { name: 'ocean', display: '🌊 Ocean', icon: '🌊' },
            { name: 'forest', display: '🌲 Forest', icon: '🌲' },
            { name: 'sunset', display: '🌅 Sunset', icon: '🌅' },
            { name: 'purple', display: '💜 Purple', icon: '💜' },
            { name: 'cyber', display: '🔮 Cyber', icon: '🔮' }
        ];
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.createThemeSelector();
        this.bindEvents();
    }

    createThemeSelector() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        // Create theme dropdown
        const themeSelector = document.createElement('div');
        themeSelector.className = 'theme-selector';
        
        const currentTheme = this.themes.find(t => t.name === this.currentTheme);
        
        // Create new theme button (clone the original)
        const newThemeButton = document.createElement('button');
        newThemeButton.className = 'theme-toggle';
        newThemeButton.innerHTML = `${currentTheme.icon} Theme`;
        
        const dropdown = document.createElement('div');
        dropdown.className = 'theme-dropdown';
        
        this.themes.forEach(theme => {
            const option = document.createElement('button');
            option.className = 'theme-option';
            option.textContent = theme.display;
            option.dataset.theme = theme.name;
            if (theme.name === this.currentTheme) {
                option.style.background = 'var(--glass-bg)';
            }
            dropdown.appendChild(option);
        });

        themeSelector.appendChild(newThemeButton);
        themeSelector.appendChild(dropdown);
        
        // Replace the original theme toggle with the new selector
        themeToggle.parentNode.replaceChild(themeSelector, themeToggle);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update button text
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            const currentTheme = this.themes.find(t => t.name === theme);
            themeToggle.innerHTML = `${currentTheme.icon} Theme`;
        }

        // Update active option in dropdown
        const options = document.querySelectorAll('.theme-option');
        options.forEach(option => {
            if (option.dataset.theme === theme) {
                option.style.background = 'var(--glass-bg)';
            } else {
                option.style.background = 'none';
            }
        });
    }

    bindEvents() {
        // Theme dropdown toggle
        document.addEventListener('click', (e) => {
            const themeToggle = e.target.closest('.theme-toggle');
            const dropdown = document.querySelector('.theme-dropdown');
            
            if (themeToggle && dropdown) {
                dropdown.classList.toggle('active');
                return;
            }
            
            // Theme option selection
            const themeOption = e.target.closest('.theme-option');
            if (themeOption) {
                this.setTheme(themeOption.dataset.theme);
                dropdown.classList.remove('active');
                return;
            }
            
            // Close dropdown when clicking outside
            if (dropdown && !e.target.closest('.theme-selector')) {
                dropdown.classList.remove('active');
            }
        });
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setActiveLink();
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks && !e.target.closest('.navbar')) {
                navLinks.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                
                // Skip empty or invalid selectors
                if (!href || href === '#' || href.length <= 1) {
                    return;
                }
                
                try {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } catch (error) {
                    console.warn('Invalid selector:', href);
                }
            });
        });
    }

    setActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '/' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.createFloatingShapes();
        this.initParticles();
        this.initRocketAnimation();
        this.initMagneticEffect();
        this.initTypewriter();
        this.startRandomRocketShows();
        this.ensureTextVisibility();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger rocket animation on first scroll
                    if (entry.target.classList.contains('cards-section') && !this.rocketTriggered) {
                        setTimeout(() => this.triggerRocketAnimation(), 500);
                        this.rocketTriggered = true;
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .flip-in, .bounce-in').forEach(el => {
            observer.observe(el);
        });
    }

    startRandomRocketShows() {
        // Show random rockets periodically
        const showRandomRocket = () => {
            if (Math.random() > 0.7) { // 30% chance
                this.triggerRocketAnimation();
            }
            
            // Schedule next check between 10-30 seconds
            const nextShow = Math.random() * 20000 + 10000;
            setTimeout(showRandomRocket, nextShow);
        };

        // Start the random rocket show after 15 seconds
        setTimeout(showRandomRocket, 15000);
    }

    triggerRocketAnimation() {
        const rocketContainer = document.getElementById('rocketContainer');
        if (!rocketContainer) return;

        // Random flight paths
        const flightPaths = ['rocketFlight1', 'rocketFlight2', 'rocketFlight3', 'rocketFlight4'];
        const randomPath = flightPaths[Math.floor(Math.random() * flightPaths.length)];
        
        // Random duration between 3-6 seconds
        const duration = Math.random() * 3 + 3;
        
        // Set random starting position based on the flight path
        this.setRandomStartPosition(rocketContainer, randomPath);
        
        // Apply the animation
        rocketContainer.style.opacity = '1';
        rocketContainer.style.animation = `${randomPath} ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
        
        // Add enhanced particle trail
        this.createEnhancedParticleTrail(rocketContainer, duration);
        
        // Hide after animation
        setTimeout(() => {
            rocketContainer.style.opacity = '0';
            rocketContainer.style.animation = '';
        }, duration * 1000);
    }

    setRandomStartPosition(container, flightPath) {
        // Set initial position based on flight path
        switch(flightPath) {
            case 'rocketFlight1':
                container.style.left = '-100px';
                container.style.top = '100vh';
                break;
            case 'rocketFlight2':
                container.style.left = '100vw';
                container.style.top = '20vh';
                break;
            case 'rocketFlight3':
                container.style.left = '10vw';
                container.style.top = '-50px';
                break;
            case 'rocketFlight4':
                container.style.left = '90vw';
                container.style.top = '100vh';
                break;
        }
    }

    createEnhancedParticleTrail(rocketContainer, duration) {
        const particleCount = 30;
        const intervalTime = (duration * 1000) / particleCount;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                // Create multiple particles per interval
                for (let j = 0; j < 3; j++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle-trail';
                    
                    // Random offset from rocket position
                    particle.style.left = (Math.random() * 40 - 20) + 'px';
                    particle.style.top = (Math.random() * 40 - 20) + 'px';
                    
                    // Random colors and sizes
                    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.width = (Math.random() * 8 + 4) + 'px';
                    particle.style.height = particle.style.width;
                    
                    rocketContainer.appendChild(particle);

                    // Remove particle after animation
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.remove();
                        }
                    }, 2000);
                }
            }, i * intervalTime);
        }
    }

    initMagneticEffect() {
        const magneticCards = document.querySelectorAll('.card.magnetic');
        
        magneticCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = x * strength * 0.3;
                    const moveY = y * strength * 0.3;
                    
                    card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    initTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const text = typewriterElement.textContent;
        const textLength = text.length;
        
        // Check if device supports CSS animations properly
        const supportsAnimation = window.CSS && CSS.supports('animation', 'test');
        
        if (!supportsAnimation) {
            // Fallback: Use text reveal effect for older browsers
            typewriterElement.classList.remove('typewriter');
            typewriterElement.classList.add('text-reveal', 'glow-text');
            return;
        }
        
        // Reset and prepare for typewriter effect
        typewriterElement.style.borderRight = '2px solid var(--text-primary)';
        typewriterElement.style.overflow = 'visible';
        typewriterElement.style.whiteSpace = 'nowrap';
        typewriterElement.style.width = 'auto';
        typewriterElement.style.maxWidth = 'none';
        typewriterElement.textContent = '';
        
        // Character by character typing with smooth scroll
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                
                // Auto-scroll the parent container if needed
                const scrollContainer = typewriterElement.closest('.scrollable-title');
                if (scrollContainer) {
                    scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                }
                
                i++;
            } else {
                clearInterval(typeInterval);
                // Remove typewriter cursor after animation
                setTimeout(() => {
                    typewriterElement.style.borderRight = 'none';
                    typewriterElement.classList.add('glow-text');
                }, 1000);
            }
        }, 80);
    }

    createFloatingShapes() {
        const container = document.querySelector('.floating-shapes');
        if (!container) return;

        // Create additional floating shapes with enhanced animations
        for (let i = 5; i <= 15; i++) {
            const shape = document.createElement('div');
            shape.className = 'shape';
            const size = Math.random() * 120 + 40;
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.animationDelay = Math.random() * 6 + 's';
            shape.style.animationDuration = (Math.random() * 6 + 6) + 's';
            
            // Add random gradient backgrounds
            const gradients = [
                'linear-gradient(45deg, rgba(255,0,150,0.1), rgba(0,255,255,0.1))',
                'linear-gradient(45deg, rgba(255,255,0,0.1), rgba(255,0,255,0.1))',
                'linear-gradient(45deg, rgba(0,255,0,0.1), rgba(0,0,255,0.1))',
                'linear-gradient(45deg, rgba(255,100,0,0.1), rgba(255,0,100,0.1))'
            ];
            shape.style.background = gradients[Math.floor(Math.random() * gradients.length)];
            
            container.appendChild(shape);
        }
    }

    initParticles() {
        // Create enhanced particle system for hero section
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle ${Math.random() * 4 + 2}s infinite;
                animation-delay: ${Math.random() * 3}s;
                box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.5);
            `;
            particleContainer.appendChild(particle);
        }

        hero.appendChild(particleContainer);

        // Enhanced twinkle animation
        if (!document.getElementById('twinkle-styles')) {
            const style = document.createElement('style');
            style.id = 'twinkle-styles';
            style.textContent = `
                @keyframes twinkle {
                    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1) rotate(180deg); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initRocketAnimation() {
        // Add click/touch event to trigger rocket manually
        document.addEventListener('click', (e) => {
            // Only trigger on empty areas (not on buttons, links, etc.)
            if (e.target.tagName === 'BODY' || e.target.classList.contains('hero-content') || 
                e.target.classList.contains('animated-bg') || e.target.classList.contains('parallax-bg')) {
                if (Math.random() > 0.5) { // 50% chance on click
                    this.triggerRocketAnimation();
                }
            }
        });

        // Add double-click for guaranteed rocket
        document.addEventListener('dblclick', (e) => {
            if (e.target.tagName === 'BODY' || e.target.classList.contains('hero-content') || 
                e.target.classList.contains('animated-bg')) {
                this.triggerRocketAnimation();
            }
        });
    }

    // Debug and visibility helper
    ensureTextVisibility() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            // Force visibility and proper sizing
            heroTitle.style.visibility = 'visible';
            heroTitle.style.opacity = '1';
            heroTitle.style.whiteSpace = 'nowrap';
            heroTitle.style.overflow = 'visible';
            heroTitle.style.width = 'auto';
            heroTitle.style.maxWidth = '100%';
            
            // Add fallback if typewriter fails
            setTimeout(() => {
                if (heroTitle.textContent.length === 0) {
                    heroTitle.textContent = 'Welcome to the Future of CSE';
                    heroTitle.classList.add('glow-text');
                }
            }, 5000);
        }
    }
}

// Page Loader
class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        // Show loading animation
        document.body.insertAdjacentHTML('afterbegin', `
            <div class="page-loader" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--primary-bg);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            ">
                <div class="spinner"></div>
            </div>
        `);

        // Hide loader when page is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.querySelector('.page-loader');
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 500);
                }
            }, 500);
        });
    }
}

// Card Interactions
class CardManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindCardEvents();
    }

    bindCardEvents() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            // Mouse move effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });

            // Click animation
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static addSmoothTransitions() {
        // Add smooth transitions to all interactive elements
        const elements = document.querySelectorAll('a, button, .card, .cta-button');
        elements.forEach(el => {
            if (!el.style.transition) {
                el.style.transition = 'all 0.3s ease';
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PageLoader();
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    new CardManager();
    Utils.addSmoothTransitions();
});

// Add scroll-based navbar background and parallax effects
window.addEventListener('scroll', Utils.throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--nav-bg)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'var(--nav-bg)';
        }
    }

    // Parallax effect for floating elements
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax-bg');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    floatingIcons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.1);
        icon.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });

    // Scale cards based on scroll position
    const cards = document.querySelectorAll('.card.magnetic');
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(cardCenter - windowHeight / 2);
        const scale = Math.max(0.9, 1 - (distanceFromCenter / windowHeight) * 0.1);
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            card.style.transform = `scale(${scale})`;
        }
    });
}, 50));

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Export for use in other files
window.CSEWebsite = {
    ThemeManager,
    NavigationManager,
    AnimationManager,
    CardManager,
    Utils
};
