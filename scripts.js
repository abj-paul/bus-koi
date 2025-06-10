  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(102, 126, 234, 0.95)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .team-card, .tech-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : '');
            }
        }, 40);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Parallax effect for floating buses
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-bus');
    const speed = 0.3;

    parallax.forEach(element => {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add hover effect for buttons
document.querySelectorAll('.btn-hero').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Mobile menu close on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }
    });
});

// Dynamic typing effect for hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
const originalText = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < originalText.length) {
        subtitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
});

// Set initial state for page load animation
document.body.style.opacity = '0';
document.body.style.transform = 'translateY(20px)';
document.body.style.transition = 'all 0.8s ease';

// Gradient animation for hero section
let gradientAngle = 135;
setInterval(() => {
    gradientAngle += 0.5;
    const heroSection = document.querySelector('.hero-section');
    heroSection.style.background = `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 100%)`;
}, 100);

// Interactive cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(255, 107, 107, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursor2 = document.querySelector('.cursor');
    cursor2.style.left = e.clientX - 10 + 'px';
    cursor2.style.top = e.clientY - 10 + 'px';
});

// Add click ripple effect
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 100px;
        height: 100px;
        background: rgba(255, 107, 107, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        left: ${e.clientX - 50}px;
        top: ${e.clientY - 50}px;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);