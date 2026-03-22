/* 
 * ASTRA v2.0 - High-End SaaS Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Init Lenis (Buttery Smooth Scroll) ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    // --- 2. Init GSAP & ScrollTrigger ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Sync GSAP with Lenis
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time)=>{
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0, 0);

        // Hero Parallax Elements
        gsap.to('.hero-visual', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Orbs Parallax
        document.querySelectorAll('.orb').forEach(orb => {
            const speed = orb.getAttribute('data-speed') || 1;
            gsap.to(orb, {
                y: 200 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });
        });

        // Reveal Animations setup
        const fadeUpElems = document.querySelectorAll('.reveal-up');
        fadeUpElems.forEach((elem) => {
            gsap.to(elem, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Assessment Form Reveal
        gsap.to('.slide-in-right', { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.assessment-card', start: 'top 80%' }});
        gsap.to('.slide-in-left', { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.assessment-card', start: 'top 80%' }});
        gsap.to('.slide-in-up', { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: 'power3.out', scrollTrigger: { trigger: '.assessment-card', start: 'top 80%' }});

        // Hero Scale Reveal (Initial load)
        gsap.to('.reveal-scale', {
            opacity: 1,
            scale: 1,
            x: "-50%",
            y: "-50%",
            duration: 1.5,
            ease: "expo.out",
            delay: 0.5
        });
    }

    // --- 3. Vanilla Tilt Init ---
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02,
        });

        VanillaTilt.init(document.querySelectorAll(".tilt-glass"), {
            max: 2,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
        });
    }

    // --- 4. Micro-interactions: Model Setup ---
    // The visual active state representation on the hero card
    const formRadios = document.querySelectorAll('input[name="model"]');
    const heroTags = document.querySelectorAll('.model-visual-row .m-tag');
    
    formRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const val = e.target.value;
            let tagText = '';
            if (val === 'KNN') tagText = 'KNN';
            if (val === 'SVM') tagText = 'SVM';
            if (val === 'Random Forest') tagText = 'RF';
            if (val === 'Logistic Regression') tagText = 'LR';
            
            heroTags.forEach(tag => {
                if (tag.innerText === tagText) {
                    tag.classList.add('active');
                } else {
                    tag.classList.remove('active');
                }
            });
        });
    });

    // --- 5. Assessment Form Submit Logic ---
    const form = document.getElementById('predictionForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = document.getElementById('btnSpinner');
    const resultContainer = document.getElementById('resultContainer');
    const resultCard = document.getElementById('resultCard');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // UI Loading State Trigger
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        
        // Hide previous result
        resultContainer.classList.add('hidden');
        resultCard.innerHTML = '';
        resultCard.className = 'result-content'; 

        const formData = {
            model: document.querySelector('input[name="model"]:checked').value,
            absolute_magnitude_h: document.getElementById('absolute_magnitude_h').value,
            estimated_diameter_min_km: document.getElementById('estimated_diameter_min_km').value,
            estimated_diameter_max_km: document.getElementById('estimated_diameter_max_km').value,
            relative_velocity_kmps: document.getElementById('relative_velocity_kmps').value,
            miss_distance_km: document.getElementById('miss_distance_km').value
        };

        try {
            // Use the Render backend URL in production, or relative path locally
            const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                ? '/predict' 
                : 'https://astra-backend-render-placeholder.onrender.com/predict';

            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.error) throw new Error(result.error);

            // Populate Expansion Result
            const isHazardous = result.is_hazardous;
            resultCard.classList.add(isHazardous ? 'result-hazard' : 'result-safe');
            
            const icon = isHazardous ? '⚠️' : '✅';
            const riskText = result.probability !== null 
                ? `System Accuracy: ${result.probability.toFixed(2)}% via ${result.model_used}` 
                : `Processed via ${result.model_used}`;

            resultCard.innerHTML = `
                <div class="res-icon">${icon}</div>
                <div class="res-title">${result.prediction}</div>
                <div class="res-stats">${riskText}</div>
            `;
            
            resultContainer.classList.remove('hidden');

            // Scroll down a bit via Lenis to show result smoothly
            setTimeout(() => {
                lenis.scrollTo(resultContainer, { offset: -100, duration: 1.2 });
            }, 300);

        } catch (error) {
            resultCard.classList.add('result-hazard');
            resultCard.innerHTML = `
                <div class="res-icon">❌</div>
                <div class="res-title">Synthesis Error</div>
                <div class="res-stats">${error.message}</div>
            `;
            resultContainer.classList.remove('hidden');
        } finally {
            // Restore btn
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
        }
    });

    // Smooth navigation clicks inside page
    document.querySelectorAll('.nav-link, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                lenis.scrollTo(targetId, { offset: -100, duration: 1.2 });
            }
        });
    });

});
