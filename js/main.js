// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.add('hidden');
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    question.addEventListener('click', () => {
        const isOpen = answer.style.maxHeight;
        
        // Close all FAQ items
        faqItems.forEach(otherItem => {
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('.faq-question i');
            otherAnswer.style.maxHeight = null;
            otherIcon.style.transform = 'rotate(0deg)';
        });
        
        // Open clicked item if it was closed
        if (!isOpen) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(msg => msg.classList.add('hidden'));
    
    // Validate name
    if (nameInput.value.trim() === '') {
        nameInput.nextElementSibling.classList.remove('hidden');
        isValid = false;
    }
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.nextElementSibling.classList.remove('hidden');
        isValid = false;
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        messageInput.nextElementSibling.classList.remove('hidden');
        isValid = false;
    }
    
    if (isValid) {
        // Create WhatsApp message
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const waMessage = `Halo, saya ${name}%0AEmail: ${email}%0A%0APesan:%0A${message}`;
        const waUrl = `https://wa.me/0895331889209?text=${waMessage}`;
        
        // Open WhatsApp in new tab
        window.open(waUrl, '_blank');
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('Terima kasih! Pesan Anda akan dikirim melalui WhatsApp.');
    }
});

// Scroll Animation
const fadeInElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    observer.observe(element);
});

// Smooth Scroll for anchor links
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

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});