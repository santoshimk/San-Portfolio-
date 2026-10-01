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
    } else {
        nav.classList.remove('nav-scrolled');
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
// Only for elements with fade-in class
const revealObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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

// Observe elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => revealObserver.observe(el));
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
            }, 500);
        }, 1500);
    }
});
