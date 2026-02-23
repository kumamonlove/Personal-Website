document.addEventListener('DOMContentLoaded', function() {
    // Image switcher functionality
    let currentImageIndex = 1;
    const images = [
        {
            src: 'photo/photo_1.png',
            location: 'GIX Robotics Lab'
        },
        {
            src: 'photo/photo_2.png',
            location: 'Mount Rainier'
        }
    ];

    const heroImage1 = document.getElementById('heroImage1');
    const heroImage2 = document.getElementById('heroImage2');
    const imageSwitcher = document.getElementById('imageSwitcher');

    if (heroImage1 && heroImage2 && imageSwitcher) {
        // Start with photo_2 active (default)
        heroImage1.classList.remove('active');
        heroImage2.classList.add('active');
        imageSwitcher.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % images.length;

            // Toggle active classes with animation
            if (currentImageIndex === 0) {
                heroImage1.classList.add('active');
                heroImage2.classList.remove('active');
            } else {
                heroImage1.classList.remove('active');
                heroImage2.classList.add('active');
            }
        });
    }

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.innerHTML = '<img src="photo/light-mode.svg" alt="Light mode" width="16" height="16">';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.innerHTML = '<img src="photo/dark-mode.svg" alt="Dark mode" width="16" height="16">';
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.innerHTML = '<img src="photo/dark-mode.svg" alt="Dark mode" width="16" height="16">';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.innerHTML = '<img src="photo/light-mode.svg" alt="Light mode" width="16" height="16">';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Language toggle functionality
    const languageToggle = document.querySelector('.language-toggle');
    const languageText = document.querySelector('.language-text');

    // Check for saved language preference or default to English
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    languageToggle.addEventListener('click', function() {
        const currentLanguage = document.documentElement.getAttribute('data-lang') || 'en';
        const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    });

    function setLanguage(lang) {
        document.documentElement.setAttribute('data-lang', lang);

        // Update language toggle button text
        languageText.textContent = lang === 'en' ? '中' : 'EN';

        // Update all elements with data-en and data-zh attributes
        const elementsWithLang = document.querySelectorAll('[data-en][data-zh]');
        elementsWithLang.forEach(element => {
            const englishText = element.getAttribute('data-en');
            const chineseText = element.getAttribute('data-zh');

            // Use innerHTML to preserve HTML tags like links
            element.innerHTML = lang === 'en' ? englishText : chineseText;
        });

        // Handle zh-only elements (like ZJU email)
        const zhOnlyElements = document.querySelectorAll('.zh-only');
        zhOnlyElements.forEach(element => {
            element.style.display = lang === 'zh' ? 'block' : 'none';
        });
    }

    // Handle Resume link based on language
    const resumeLink = document.querySelector('.resume-link');
    if (resumeLink) {
        resumeLink.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLanguage = document.documentElement.getAttribute('data-lang') || 'en';
            const linkEn = this.getAttribute('data-link-en');
            const linkZh = this.getAttribute('data-link-zh');
            const targetUrl = currentLanguage === 'en' ? linkEn : linkZh;
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // Mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-active');
            navToggle.classList.toggle('nav-toggle-active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('nav-menu-active');
            navToggle.classList.remove('nav-toggle-active');
        });
    });

    // Smooth scrolling for anchor links
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

    // No scroll-triggered animations to avoid scroll jank

    // Interest tags hover effect
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});