/**
 * Main JavaScript - Optimized for Performance
 * Santhoshikar MK Portfolio
 */

// ========== MOBILE MENU TOGGLE ==========
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
});

// ========== OPTIMIZED SCROLL HANDLING ==========
const nav = document.querySelector('nav');
let lastScrollTop = 0;
let ticking = false;

// Throttled scroll handler using requestAnimationFrame
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/Show Navigation
    if (scrollTop > lastScrollTop && scrollTop > 150) {
        // Scrolling down - hide nav
        nav.classList.add('nav-hidden');
        nav.classList.add('nav-scrolled');
    } else if (scrollTop < lastScrollTop) {
        // Scrolling up - show nav
        nav.classList.remove('nav-hidden');
    }
    
    // Add compact style when scrolled
    if (scrollTop > 80) {
        nav.classList.add('nav-scrolled');
        document.body.classList.add('scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
        document.body.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
    }
}, { passive: true });

// Show nav when mouse moves near top
let mouseTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        if (e.clientY < 100 && window.pageYOffset > 150) {
            nav.classList.remove('nav-hidden');
        }
    }, 50);
}, { passive: true });

// ========== ACTIVE NAV HIGHLIGHTING ==========
// Using IntersectionObserver for better performance
const sections = document.querySelectorAll('section[id], .section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"], nav a[href*=".html"]');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                
                if (href === `#${id}` || href.includes(`${id}.html`)) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== SCROLL REVEAL ANIMATIONS ==========
// Enhanced scroll reveal with better performance
const revealObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing after reveal to improve performance
            revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

// Observe elements with fade-in class and other animated elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const skillItems = document.querySelectorAll('.skill-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const expertiseItems = document.querySelectorAll('.expertise-item');
    const contactItems = document.querySelectorAll('.contact-item');
    const contactForm = document.querySelector('.contact-form');
    
    fadeElements.forEach(el => revealObserver.observe(el));
    skillItems.forEach(el => revealObserver.observe(el));
    timelineItems.forEach(el => revealObserver.observe(el));
    expertiseItems.forEach(el => revealObserver.observe(el));
    contactItems.forEach(el => revealObserver.observe(el));
    if (contactForm) revealObserver.observe(contactForm);
});

// ========== SET ACTIVE PAGE IN NAVIGATION ==========
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ========== TYPEWRITER EFFECT (Home page only) ==========
if (document.getElementById('typewriter')) {
    const text = "SAN";
    const typewriterElement = document.getElementById('typewriter');
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < text.length) {
            typewriterElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 300);
        }
    }

    // Start after a delay
    setTimeout(typeWriter, 2000);
}

// ========== LOADING SCREEN ==========
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loader.remove();
                // Add particles after loading
                createParticles();
            }, 500);
        }, 1500);
    }
});

// ========== FLOATING PARTICLES BACKGROUND ==========
function createParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // Don't create particles if user prefers reduced motion
    }
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    // Create 5 particles
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// ========== SMOOTH HOVER EFFECTS ==========
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add parallax effect to hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        heroImage.addEventListener('mouseenter', () => {
            heroImage.style.transition = 'none';
        });
        
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transition = 'all 0.5s ease';
            heroImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
});

// ========== MAGNETIC EFFECT FOR NAV ICONS ==========
document.addEventListener('DOMContentLoaded', () => {
    const navIcons = document.querySelectorAll('.nav-icons a');
    
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        navIcons.forEach(icon => {
            icon.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translateY(-3px) scale(1.1) translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
});
