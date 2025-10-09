class PortfolioApp {
    constructor() {
        this.githubUsername = 'anwesh-23';
this.fallbackProjects = [
    {
        id: 1,
        name: "Financial Tracker",
        description: "A personal finance management application that helps users track expenses, set budgets, and visualize spending patterns with interactive charts and detailed analytics.",
        technologies: ["React", "Chart.js", "Local Storage", "CSS3"],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
        html_url: "https://github.com/anwesh-23/Finance_Tracker",
        homepage: "https://finance-tracker-demo.netlify.app",
        featured: true,
        language: "JavaScript",
        stargazers_count: 0,
        forks_count: 3
    },
    {
        id: 2,
        name: "Food Hub Website",
        description: "A comprehensive restaurant management system with user authentication, menu management, order tracking, and admin dashboard. Built with modern web technologies for seamless user experience.",
        technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MySQL"],
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop",
        html_url: "https://github.com/anwesh-23/Food-Hub",
        homepage: "https://food-hub-demo.netlify.app",
        featured: true,
        language: "JavaScript",
        stargazers_count: 0,
        forks_count: 4
    },
    { 
        id: 3,
        name: "SRM EEE Virtual Lab",
        description: "A modern, interactive virtual laboratory for Power System Analysis experiments, designed for Electrical and Electronics Engineering students at SRM Institute of Science and Technology. Features include interactive experiments, real-time simulations, and comprehensive theory sections.",
        technologies: [
            "React 18", "TypeScript", "Tailwind CSS", "Vite", "React Router", "Lucide Icons"
        ],
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
        html_url: "https://github.com/Pratyushsrivastavasgn/vrlabeee", 
        homepage: "",
        featured: true,
        language: "TypeScript",
        stargazers_count: 0,
        forks_count: 5,
        features: [
            "Interactive virtual experiments",
            "Comprehensive theory sections",
            "Real-time simulations",
            "Responsive design",
            "Detailed experiment procedures",
            "Self-assessment quizzes"
        ]
    } 
];


        this.currentFilter = 'all';
        this.projects = [];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.loadProjects();
        this.initializeAnimations();
        this.setupTypingAnimation();
        this.initScrollSpy();
    }

    setupEventListeners() {
        document.getElementById('nav-toggle')?.addEventListener('click', this.toggleMobileMenu.bind(this));
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && document.getElementById('nav-menu')?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        document.getElementById('theme-toggle')?.addEventListener('click', this.toggleTheme.bind(this));

        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        document.getElementById('scroll-top')?.addEventListener('click', this.scrollToTop.bind(this));
        window.addEventListener('scroll', this.handleScroll.bind(this));

        document.getElementById('scroll-indicator')?.addEventListener('click', () => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', this.handleFilterClick.bind(this));
        });

        document.getElementById('contact-form')?.addEventListener('submit', this.handleFormSubmit.bind(this));

        document.getElementById('modal-backdrop')?.addEventListener('click', this.closeModal.bind(this));
        document.getElementById('modal-close')?.addEventListener('click', this.closeModal.bind(this));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });

        this.setupIntersectionObserver();
    }

    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        navMenu?.classList.toggle('active');
        navToggle?.classList.toggle('active');
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            this.closeMobileMenu();
        }
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            this.setDarkMode(true);
        }

        this.updateThemeIcon();
    }

    toggleTheme() {
        const isDark = document.body.classList.contains('dark-mode');
        this.setDarkMode(!isDark);
    }

    setDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('portfolio-theme', 'light');
        }

        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-toggle__icon');
        if (!themeIcon) return;

        const isDark = document.body.classList.contains('dark-mode');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const scrollTopBtn = document.getElementById('scroll-top');

        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');

        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    initScrollSpy() {
        window.addEventListener('scroll', this.updateActiveNavLink.bind(this));
    }

    setupTypingAnimation() {
        const nameElement = document.getElementById('typed-name');
        const titleElement = document.getElementById('typed-title');

        if (nameElement && titleElement) {
            this.typeWriter(nameElement, 'Anwesh Dash', 100);
            setTimeout(() => {
                this.typeWriter(titleElement, 'Computer Science Student & Developer', 80);
            }, 1500);
        }
    }

    typeWriter(element, text, speed) {
        let i = 0;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--color-primary)';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }

        type();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section, .project-card, .skill-item, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    initializeAnimations() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    if (skillProgress) {
                        const width = skillProgress.style.getPropertyValue('--width');
                        skillProgress.style.width = width;
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-item').forEach(skill => {
            skillObserver.observe(skill);
        });
    }

    async loadProjects() {
        const loadingEl = document.getElementById('projects-loading');
        const gridEl = document.getElementById('projects-grid');

        if (!loadingEl || !gridEl) return;

        try {
            loadingEl.style.display = 'block';
            gridEl.style.display = 'none';

            const response = await fetch(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=20`);

            if (response.ok) {
                const repos = await response.json();

                const githubProjects = repos
                    .filter(repo => !repo.fork && repo.description)
                    .map(repo => ({
                        ...repo,
                        image: this.generateProjectImage(repo.name),
                        technologies: this.extractTechnologies(repo.language, repo.topics || [])
                    }))
                    .slice(0, 2);

                this.projects = [...this.fallbackProjects];

                githubProjects.forEach(githubProject => {
                    const exists = this.projects.some(project =>
                        project.name.toLowerCase() === githubProject.name.toLowerCase()
                    );
                    if (!exists && this.projects.length < 4) {
                        this.projects.push(githubProject);
                    }
                });
            } else {
                this.projects = [...this.fallbackProjects];
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            this.projects = [...this.fallbackProjects];
        } finally {
            loadingEl.style.display = 'none';
            gridEl.style.display = 'grid';
            this.renderProjects();
        }
    }

    generateProjectImage(projectName) {
        const imageMap = {
            'food': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop',
            'financial': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop',
            'portfolio': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop',
            'tracker': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop',
            'hub': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop'
        };

        const name = projectName.toLowerCase();
        for (const [key, image] of Object.entries(imageMap)) {
            if (name.includes(key)) {
                return image;
            }
        }

        return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop&q=80';
    }

    extractTechnologies(language, topics) {
        const technologies = [];

        if (language) {
            technologies.push(language);
        }

        const techMap = {
            'react': 'React',
            'vue': 'Vue.js',
            'angular': 'Angular',
            'nodejs': 'Node.js',
            'express': 'Express',
            'mongodb': 'MongoDB',
            'mysql': 'MySQL',
            'python': 'Python',
            'django': 'Django',
            'flask': 'Flask',
            'typescript': 'TypeScript',
            'javascript': 'JavaScript',
            'css': 'CSS',
            'html': 'HTML',
            'scss': 'SCSS',
            'bootstrap': 'Bootstrap',
            'tailwind': 'Tailwind CSS',
            'api': 'API',
            'firebase': 'Firebase',
            'netlify': 'Netlify'
        };

        topics.forEach(topic => {
            const key = topic.toLowerCase();
            if (techMap[key]) {
                technologies.push(techMap[key]);
            }
        });

        // Add HTML/CSS for frontend projects if not already
        if (technologies.includes('JavaScript') && !technologies.includes('HTML')) {
            technologies.unshift('HTML', 'CSS');
        }

        return [...new Set(technologies)].slice(0, 4);
    }

    renderProjects() {
        const gridEl = document.getElementById('projects-grid');
        if (!gridEl) return;

        // Case insensitive filter check
        const currentFilterLower = this.currentFilter.toLowerCase();

        const filteredProjects = this.currentFilter === 'all'
            ? this.projects
            : this.projects.filter(project =>
                (project.language && project.language.toLowerCase() === currentFilterLower) ||
                (project.technologies && project.technologies.some(tech => tech.toLowerCase() === currentFilterLower))
            );

        gridEl.innerHTML = filteredProjects.map(project => `
            <div class="project-card" data-project-id="${project.id || project.name}">
                <img src="${project.image}" alt="${project.name}" class="project-image" loading="lazy" />
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description || 'No description available'}</p>
                    
                    ${project.technologies && project.technologies.length ? `
                        <div class="project-technologies">
                            ${project.technologies.slice(0, 3).map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="project-stats">
                        <div class="stat"><span>⭐</span><span>${project.stargazers_count || 0}</span></div>
                        <div class="stat"><span>🍴</span><span>${project.forks_count || 0}</span></div>
                        <div class="stat"><span>💻</span><span>${project.language || 'Mixed'}</span></div>
                    </div>
                    
                    <div class="project-actions">
                        <a href="${project.html_url}" class="btn btn--secondary" target="_blank" rel="noopener">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                            </svg>
                            Code
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners for project cards, skipping clicks inside project-actions
        gridEl.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.project-actions')) return;

                const projectId = card.dataset.projectId;
                const project = this.projects.find(p => (p.id && p.id.toString()) === projectId || p.name === projectId);
                if (project) {
                    this.openProjectModal(project);
                }
            });
        });
    }

    handleFilterClick(e) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        this.currentFilter = e.target.dataset.filter || 'all';
        this.renderProjects();
    }

    openProjectModal(project) {
        const modal = document.getElementById('project-modal');
        if (!modal) return;

        document.getElementById('modal-title').textContent = project.name;
        document.getElementById('modal-description').textContent = project.description || 'No description available';
        const modalImage = document.getElementById('modal-image');
        if (modalImage) {
            modalImage.src = project.image;
            modalImage.alt = project.name;
        }
        document.getElementById('modal-stars').textContent = project.stargazers_count || 0;
        document.getElementById('modal-forks').textContent = project.forks_count || 0;
        document.getElementById('modal-language').textContent = project.language || 'Mixed';

        const techContainer = document.getElementById('modal-technologies');
        if (techContainer) {
            if (project.technologies?.length) {
                techContainer.innerHTML = project.technologies.map(tech =>
                    `<span class="tech-tag">${tech}</span>`
                ).join('');
            } else {
                techContainer.innerHTML = '';
            }
        }

        // Only show code button (no live demo)
        const liveBtn = document.getElementById('modal-live');
        if (liveBtn) {
            liveBtn.style.display = 'none';
        }

        const codeBtn = document.getElementById('modal-code');
        if (codeBtn) {
            codeBtn.href = project.html_url;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = document.getElementById('submit-btn');
        const messageEl = document.getElementById('form-message');

        if (!this.validateForm(formData)) {
            return;
        }

        if (!submitBtn) return;

        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';

        if (messageEl) {
            messageEl.classList.remove('success', 'error');
            messageEl.style.display = 'none';
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (messageEl) {
                messageEl.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                messageEl.classList.add('success');
                messageEl.style.display = 'block';
            }

            form.reset();
            this.clearFormErrors();
        } catch (error) {
            if (messageEl) {
                messageEl.textContent = 'Sorry, there was an error sending your message. Please try again.';
                messageEl.classList.add('error');
                messageEl.style.display = 'block';
            }
        } finally {
            if (!submitBtn) return;

            submitBtn.disabled = false;
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
        }
    }

    validateForm(formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        let isValid = true;

        this.clearFormErrors();

        if (!name || name.trim().length < 2) {
            this.showFieldError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!message || message.trim().length < 10) {
            this.showFieldError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }

        return isValid;
    }

    showFieldError(fieldName, message) {
        const errorEl = document.getElementById(`${fieldName}-error`);
        const inputEl = document.getElementById(fieldName);

        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }

        if (inputEl) {
            inputEl.style.borderColor = 'var(--color-error)';
        }
    }

    clearFormErrors() {
        document.querySelectorAll('.form-error').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });

        document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.style.borderColor = '';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}




