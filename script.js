document.addEventListener('DOMContentLoaded', () => {
    // --- Supabase Configuration ---
    const SUPABASE_URL = 'https://njnaezgkdmzeoffxpijs.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qbmFlemdrZG16ZW9mZnhwaWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4ODM5NzgsImV4cCI6MjA5MDQ1OTk3OH0.VGZc50ntkNGCYg0kVMRk3W1QYBwjFAiiTGxpl_dJxKg';
    const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuDrawer = mobileMenu.querySelector('div');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenuDrawer.classList.remove('translate-x-full');
            }, 10);
        } else {
            mobileMenuDrawer.classList.add('translate-x-full');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    };

    mobileMenuBtn?.addEventListener('click', () => toggleMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));
    mobileMenu?.addEventListener('click', (e) => {
        if (e.target === mobileMenu) toggleMenu(false);
    });

    // --- Search Logic ---
    const handleSearch = (query) => {
        if (!query.trim()) return;
        console.log(`Searching for: ${query}`);
        alert(`Searching for: ${query}\n(In a real app, this would filter results or redirect to a search page.)`);
    };

    document.getElementById('nav-search')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch(e.target.value);
    });

    document.getElementById('hero-search-btn')?.addEventListener('click', () => {
        handleSearch(document.getElementById('hero-search').value);
    });

    // --- Career Finder Wizard Logic ---
    const eduOpts = document.querySelectorAll('.edu-opt');
    let selectedEdu = 'Science'; // Default

    eduOpts.forEach(btn => {
        btn.addEventListener('click', () => {
            eduOpts.forEach(b => {
                b.classList.remove('bg-primary', 'text-white');
                b.classList.add('bg-slate-100', 'text-slate-600');
            });
            btn.classList.remove('bg-slate-100', 'text-slate-600');
            btn.classList.add('bg-primary', 'text-white');
            selectedEdu = btn.getAttribute('data-val');
        });
    });

    document.getElementById('find-career-btn')?.addEventListener('click', () => {
        const interest = document.getElementById('wizard-interest').value;
        const goal = document.getElementById('wizard-goal').value;

        const results = {
            'Problem Solving & Logic': {
                'Science': { title: 'AI & Machine Learning Engineer', desc: 'Leverage your logic and science background to build the future of intelligence.' },
                'Commerce': { title: 'Quantitative Financial Analyst', desc: 'Apply logical models to navigate complex financial markets.' },
                'Arts': { title: 'User Experience Researcher', desc: 'Use logical analysis to understand human patterns and design better systems.' },
                'Others': { title: 'Systems Architect', desc: 'Design complex frameworks across specialized industries.' }
            },
            'Creative Arts & Design': {
                'Science': { title: 'Computational Designer', desc: 'Merge programming with aesthetics for cutting-edge digital experiences.' },
                'Commerce': { title: 'Marketing Creative Director', desc: 'Combine business acumen with visual storytelling to lead brands.' },
                'Arts': { title: 'Lead Product Designer', desc: 'Your arts background is perfect for defining how people interact with technology.' },
                'Others': { title: 'Multimedia Specialist', desc: 'Bring creative visions to life across various platforms.' }
            },
            'Human Behavior & Health': {
                'Science': { title: 'Biomedical Researcher', desc: 'Pioneer new treatments through rigorous scientific study of human health.' },
                'Commerce': { title: 'Healthcare Administrator', desc: 'Manage the business operations of modern medical institutions.' },
                'Arts': { title: 'Clinical Psychologist', desc: 'Understand and heal human minds through empathetic study and practice.' },
                'Others': { title: 'Public Health Policy Advisor', desc: 'Shape the future of community wellbeing through strategic policy.' }
            },
            'Business & Strategy': {
                'Science': { title: 'Data-Driven Business Analyst', desc: 'Translate complex data into winning business strategies.' },
                'Commerce': { title: 'Investment Banker', desc: 'Lead major financial transactions and shape corporate growth.' },
                'Arts': { title: 'Communications Strategist', desc: 'Deisgn powerful narratives that drive organizational success.' },
                'Others': { title: 'Entrepreneur / Startup Founder', desc: 'Build your own vision and disrupt established markets.' }
            }
        };

        const defaultResult = { title: 'Strategic Consultant', desc: 'Your diverse interests make you a perfect fit for high-level strategy and planning.' };

        const recommendation = (results[interest] && results[interest][selectedEdu]) || defaultResult;

        document.getElementById('wizard-container')?.classList.add('hidden');
        document.getElementById('wizard-results')?.classList.remove('hidden');
        const rTitle = document.getElementById('result-title');
        const rDesc = document.getElementById('result-desc');
        if (rTitle) rTitle.textContent = recommendation.title;
        if (rDesc) rDesc.textContent = recommendation.desc;
    });

    document.getElementById('reset-wizard')?.addEventListener('click', () => {
        document.getElementById('wizard-results')?.classList.add('hidden');
        document.getElementById('wizard-container')?.classList.remove('hidden');
    });

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('contact-success');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('contact-name');
        const phoneInput = document.getElementById('contact-phone');

        if (nameInput.value && phoneInput.value) {
            contactForm.classList.add('hidden');
            successMsg.classList.remove('hidden');
            console.log('Form Submitted:', {
                name: nameInput.value,
                phone: phoneInput.value,
                interest: document.getElementById('contact-interest').value
            });
        }
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const targetId = href.substring(1);
            if (!targetId) return;

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (typeof toggleMenu === 'function') toggleMenu(false);
            }
        });
    });

    // --- Category & College Interactions ---
    const categories = document.querySelectorAll('section:nth-of-type(1) .group');
    categories.forEach(cat => {
        cat.addEventListener('click', () => {
            const name = cat.querySelector('h3')?.textContent;
            handleSearch(name);
        });
    });

    // Note: :contains isn't standard JS, so I'll filter
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('Apply Now')) {
            btn.addEventListener('click', (e) => {
                const college = e.target.closest('.group')?.querySelector('h3')?.textContent;
                alert(`Starting application for ${college}...\nThis would normally open an application form or portal.`);
            });
        }
    });

    // --- Reviews Scroll ---
    const reviewContainer = document.querySelector('.snap-x');
    if (reviewContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        reviewContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - reviewContainer.offsetLeft;
            scrollLeft = reviewContainer.scrollLeft;
        });
        reviewContainer.addEventListener('mouseleave', () => isDown = false);
        reviewContainer.addEventListener('mouseup', () => isDown = false);
        reviewContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reviewContainer.offsetLeft;
            const walk = (x - startX) * 2;
            reviewContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // --- Hero Slider Logic ---
    const heroSlider = document.getElementById('hero-slider');
    let currentSlide = 0;
    const totalSlides = 4; // 3 original + 1 clone

    const nextSlide = () => {
        if (!heroSlider) return;

        // If at the clone (last slide), jump back to start instantly
        if (currentSlide >= totalSlides - 1) {
            heroSlider.style.transition = 'none';
            currentSlide = 0;
            heroSlider.style.transform = 'translateX(0%)';
            // Force reflow
            void heroSlider.offsetHeight;
        }

        currentSlide++;
        heroSlider.style.transition = 'transform 1000ms ease-in-out';
        heroSlider.style.transform = `translateX(-${(currentSlide * 100) / totalSlides}%)`;
    };

    if (heroSlider) {
        let sliderInterval = setInterval(nextSlide, 5000);

        // Optional: Reset interval on manual interaction if added later
        // or handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(sliderInterval);
            } else {
                sliderInterval = setInterval(nextSlide, 5000);
            }
        });
    }

    // --- Lead Generation Popup Logic ---
    const leadPopup = document.getElementById('lead-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const popupForm = document.getElementById('popup-form');
    const popupSuccess = document.getElementById('popup-success');

    const showPopup = () => {
        if (leadPopup) {
            leadPopup.classList.remove('hidden');
            setTimeout(() => {
                leadPopup.classList.remove('opacity-0');
            }, 10);
        }
    };

    const hidePopup = () => {
        if (leadPopup) {
            leadPopup.classList.add('opacity-0');
            setTimeout(() => {
                leadPopup.classList.add('hidden');
                // Restart timer after 15 seconds
                setTimeout(showPopup, 15000);
            }, 300);
        }
    };

    // Initial show after 15 seconds
    setTimeout(showPopup, 15000);

    closePopupBtn?.addEventListener('click', hidePopup);

    popupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('popup-name').value;
        const email = document.getElementById('popup-email').value;
        const phone = document.getElementById('popup-phone').value;
        const city = document.getElementById('popup-city').value;
        const state = document.getElementById('popup-state').value;
        const submitBtn = popupForm.querySelector('button[type="submit"]');

        if (!name || !email || !phone || !city || !state) return;

        try {
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Saving...';
            }

            const { data, error } = await _supabase
                .from('leads')
                .insert([
                    { name, email, phone, city, state }
                ]);

            if (error) throw error;

            console.log('Lead saved successfully:', data);

            // Hide form and show success
            popupForm.classList.add('hidden');
            popupSuccess.classList.remove('hidden');

            // Close popup after 3 seconds
            setTimeout(() => {
                leadPopup.classList.add('opacity-0');
                setTimeout(() => {
                    leadPopup.classList.add('hidden');
                }, 300);
            }, 3000);

        } catch (err) {
            console.error('Error saving lead:', err.message);
            alert('Failed to save lead. Please try again.');
            // Reset button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Get Career Roadmap';
            }
        }
    });
});
