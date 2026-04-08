document.addEventListener('DOMContentLoaded', () => {

    // Interactive mouse background
    const root = document.documentElement;

    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position as a percentage
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        // Set CSS variables for the background radial gradient
        root.style.setProperty('--mouse-x', `${x}%`);
        root.style.setProperty('--mouse-y', `${y}%`);
    });

    // Dark Mode Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    
    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            }
        });
    }

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all elements with the animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Animate info points with staggered delay
    const infoPoints = document.querySelectorAll('.info-point');
    const pointObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    infoPoints.forEach(point => {
        pointObserver.observe(point);
    });

    // Medicine Dispenser Button Functionality
    const pushButton = document.getElementById('pushButton');
    const medicineScreen = document.getElementById('medicineScreen');

    // Array of medications with times
    const medications = [
        { time: '10:00 AM', name: 'Vitamin D' },
        { time: '12:30 PM', name: 'Blood Pressure Med' },
        { time: '3:00 PM', name: 'Aspirin' },
        { time: '6:30 PM', name: 'Calcium Supplement' },
        { time: '8:00 PM', name: 'Sleep Aid' },
        { time: '9:00 AM', name: 'Multivitamin' }
    ];

    let currentMedicineIndex = 0;

    if (pushButton && medicineScreen) {
        pushButton.addEventListener('click', () => {
            // Add click animation
            pushButton.style.transform = 'scale(0.95)';
            
            // Cycle to next medication
            currentMedicineIndex = (currentMedicineIndex + 1) % medications.length;
            const currentMedicine = medications[currentMedicineIndex];
            
            // Update display with fade effect
            medicineScreen.style.opacity = '0.5';
            
            setTimeout(() => {
                medicineScreen.innerHTML = `${currentMedicine.time}<br><span>Time for ${currentMedicine.name}</span>`;
                medicineScreen.style.opacity = '1';
            }, 150);
            
            // Reset button scale
            setTimeout(() => {
                pushButton.style.transform = 'scale(1)';
            }, 100);
        });
    }

    // Parallax Scrolling Effect
    const parallaxElements = document.querySelectorAll('.parallax-el');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed;
            const yPos = -(scrolled * speed);
            
            // Maintain existing rotations for decorative shapes while updating translation
            let currentTransform = el.style.transform;
            let rotation = '';
            
            if (el.classList.contains('shape-2')) rotation = ' rotate(30deg)';
            if (el.classList.contains('shape-3')) rotation = ' rotate(15deg)';
            
            el.style.transform = `translate3d(0, ${yPos}px, 0)${rotation}`;
        });
    });

});