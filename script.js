        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
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

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Counter animation for stats
        const animateCounter = (element, target, duration = 2000) => {
            let start = 0;
            const increment = target / (duration / 16);
            
            const updateCounter = () => {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start).toLocaleString('pt-BR');
                    requestAnimationFrame(updateCounter);
                } else {
                    // Format final number
                    if (target >= 1000000000000) {
                        element.textContent = (target / 1000000000000).toFixed(1) + 'T';
                    } else if (target >= 1000000) {
                        element.textContent = (target / 1000000).toFixed(0) + 'M';
                    } else {
                        element.textContent = target + '%';
                    }
                }
            };
            
            updateCounter();
        };

        // Animate stats when they come into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    const text = statNumber.textContent;
                    
                    let targetValue;
                    if (text.includes('T')) {
                        targetValue = parseFloat(text) * 1000000000000;
                    } else if (text.includes('M')) {
                        targetValue = parseFloat(text) * 1000000;
                    } else {
                        targetValue = parseFloat(text);
                    }
                    
                    animateCounter(statNumber, targetValue);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-card').forEach(card => {
            statsObserver.observe(card);
        });

        // Parallax effect for gradient orbs
        document.addEventListener('mousemove', (e) => {
            const orbs = document.querySelectorAll('.gradient-orb');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });