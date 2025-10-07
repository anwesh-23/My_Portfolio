// Portfolio Application JavaScript
class PortfolioApp {
    constructor() {
        // EDIT: Update with your actual GitHub username
        this.githubUsername = 'anwesh-23';
        
        // EDIT: Update with your actual project details
        this.fallbackProjects = [
            {
                id: 1,
                name: "Food Hub Website",
                // EDIT: Update with your actual project description
                description: "A comprehensive restaurant management system with user authentication, menu management, order tracking, and admin dashboard. Built with modern web technologies for seamless user experience.",
                // EDIT: Update with technologies you actually used
                technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MySQL"],
                image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop",
                // EDIT: Update with your actual GitHub repository URL
                html_url: "https://github.com/anwesh-23/Food-Hub",
                // EDIT: Update with your actual live demo URL (if available)
                homepage: "https://food-hub-demo.netlify.app",
                featured: true,
                language: "JavaScript",
                // EDIT: Update with actual GitHub stats (or keep as placeholder)
                stargazers_count: 15,
                forks_count: 4
            },
            {
                id: 2,
                name: "Financial Tracker",
                // EDIT: Update with your actual project description
                description: "A personal finance management application that helps users track expenses, set budgets, and visualize spending patterns with interactive charts and detailed analytics.",
                // EDIT: Update with technologies you actually used
                technologies: ["React", "Chart.js", "Local Storage", "CSS3"],
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
                // EDIT: Update with your actual GitHub repository URL
                html_url: "https://github.com/anwesh-23/Finance_Tracker",
                // EDIT: Update with your actual live demo URL (if available)
                homepage: "https://finance-tracker-demo.netlify.app",
                featured: true,
                language: "JavaScript",
                // EDIT: Update with actual GitHub stats (or keep as placeholder)
                stargazers_count: 12,
                forks_count: 3
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
        // Navigation
        document.getElementById('nav-toggle')?.addEventListener('click', this.toggleMobileMenu.bind(this));
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && document.getElementById('nav-menu')?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', this.toggleTheme.bind(this));

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Scroll to top button
        document.getElementById('scroll-top')?.addEventListener('click', this.scrollToTop.bind(this));
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Scroll indicator
        document.getElementById('scroll-indicator')?.addEventListener('click', () => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        });

        // Project filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', this.handleFilterClick.bind(this));
        });

        // Contact form
        document.getElementById('contact-form')?.addEventListener('submit', this.handleFormSubmit.bind(this));

        // Modal
        document.getElementById('modal-backdrop')?.addEventListener('click', this.closeModal.bind(this));
        document.getElementById('modal-close')?.addEventListener('click', this.closeModal.bind(this));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });

        // Intersection Observer for animations
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
        
        // Update theme toggle icon
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
        const isDark = document.body.classList.contains('dark-mode');
        
        if (themeIcon) {
            themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const scrollTopBtn = document.getElementById('scroll-top');
        
        // Show/hide scroll to top button
        if (scrollTop > 300) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
        
        // Update navigation active state
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.pageYOffset;
            
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
            // EDIT: Update with your actual name and title
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

        // Observe sections and elements
        document.querySelectorAll('section, .project-card, .skill-item, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    initializeAnimations() {
        // Animate skill bars when they come into view
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
            
            // Try to fetch from GitHub API
            const response = await fetch(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=20`);
            
            if (response.ok) {
                const repos = await response.json();
                
                // Process and enhance GitHub data
                const githubProjects = repos
                    .filter(repo => !repo.fork && repo.description) // Filter out forks and repos without description
                    .map(repo => ({
                        ...repo,
                        image: this.generateProjectImage(repo.name),
                        technologies: this.extractTechnologies(repo.language, repo.topics || [])
                    }))
                    .slice(0, 2); // Limit to 2 projects from GitHub
                
                // Always prioritize fallback projects (Food Hub & Financial Tracker)
                this.projects = this.fallbackProjects;
                
                // Add GitHub projects if they're different from fallback
                githubProjects.forEach(githubProject => {
                    const exists = this.projects.some(project => 
                        project.name.toLowerCase() === githubProject.name.toLowerCase()
                    );
                    if (!exists && this.projects.length < 4) {
                        this.projects.push(githubProject);
                    }
                });
            } else {
                // Use only fallback projects if GitHub API fails
                this.projects = this.fallbackProjects;
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
            // Use only fallback projects on error
            this.projects = this.fallbackProjects;
        } finally {
            loadingEl.style.display = 'none';
            gridEl.style.display = 'grid';
            this.renderProjects();
        }
    }

    generateProjectImage(projectName) {
        // Generate project images based on project name
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
        
        // Default coding image
        return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop&q=80';
    }

    extractTechnologies(language, topics) {
        const technologies = [];
        
        if (language) {
            technologies.push(language);
        }
        
        // Add some common technologies based on topics
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
            if (techMap[topic.toLowerCase()]) {
                technologies.push(techMap[topic.toLowerCase()]);
            }
        });
        
        // Add HTML/CSS for frontend projects if not present
        if (technologies.includes('JavaScript') && !technologies.includes('HTML')) {
            technologies.unshift('HTML', 'CSS');
        }
        
        return [...new Set(technologies)].slice(0, 4); // Limit and remove duplicates
    }

    renderProjects() {
        const gridEl = document.getElementById('projects-grid');
        if (!gridEl) return;
        
        const filteredProjects = this.currentFilter === 'all' 
            ? this.projects 
            : this.projects.filter(project => 
                project.language === this.currentFilter ||
                project.technologies?.includes(this.currentFilter)
            );
        
        gridEl.innerHTML = filteredProjects.map(project => `
            <div class="project-card" data-project-id="${project.id || project.name}">
                <img src="${project.image}" alt="${project.name}" class="project-image" loading="lazy">
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description || 'No description available'}</p>
                    
                    ${project.technologies?.length ? `
                        <div class="project-technologies">
                            ${project.technologies.slice(0, 3).map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="project-stats">
                        <div class="stat">
                            <span>⭐</span>
                            <span>${project.stargazers_count || 0}</span>
                        </div>
                        <div class="stat">
                            <span>🍴</span>
                            <span>${project.forks_count || 0}</span>
                        </div>
                        <div class="stat">
                            <span>💻</span>
                            <span>${project.language || 'Mixed'}</span>
                        </div>
                    </div>
                    
                    <div class="project-actions">
                        ${project.homepage ? `
                            <a href="${project.homepage}" class="btn btn--primary" target="_blank" rel="noopener">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L18 9"/>
                                </svg>
                                Live Demo
                            </a>
                        ` : ''}
                        
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
        
        // Add click event listeners to project cards
        gridEl.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't open modal if clicking on action buttons
                if (e.target.closest('.project-actions')) return;
                
                const projectId = card.dataset.projectId;
                const project = this.projects.find(p => (p.id || p.name) == projectId);
                if (project) {
                    this.openProjectModal(project);
                }
            });
        });
    }

    handleFilterClick(e) {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update current filter and re-render projects
        this.currentFilter = e.target.dataset.filter;
        this.renderProjects();
    }

    openProjectModal(project) {
        const modal = document.getElementById('project-modal');
        if (!modal) return;
        
        // Populate modal content
        document.getElementById('modal-title').textContent = project.name;
        document.getElementById('modal-description').textContent = project.description || 'No description available';
        document.getElementById('modal-image').src = project.image;
        document.getElementById('modal-image').alt = project.name;
        document.getElementById('modal-stars').textContent = project.stargazers_count || 0;
        document.getElementById('modal-forks').textContent = project.forks_count || 0;
        document.getElementById('modal-language').textContent = project.language || 'Mixed';
        
        // Populate technologies
        const techContainer = document.getElementById('modal-technologies');
        if (project.technologies?.length) {
            techContainer.innerHTML = project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
        } else {
            techContainer.innerHTML = '';
        }
        
        // Set action links
        const liveBtn = document.getElementById('modal-live');
        const codeBtn = document.getElementById('modal-code');
        
        if (project.homepage) {
            liveBtn.href = project.homepage;
            liveBtn.style.display = 'inline-flex';
        } else {
            liveBtn.style.display = 'none';
        }
        
        codeBtn.href = project.html_url;
        
        // Show modal
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
        
        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loading').style.display = 'inline';
        
        // Clear previous messages
        messageEl.classList.remove('success', 'error');
        messageEl.style.display = 'none';
        
        try {
            // Simulate form submission (in real app, you'd send to your backend)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            messageEl.textContent = 'Thank you for your message! I\'ll get back to you soon.';
            messageEl.classList.add('success');
            messageEl.style.display = 'block';
            
            // Reset form
            form.reset();
            this.clearFormErrors();
            
        } catch (error) {
            // Show error message
            messageEl.textContent = 'Sorry, there was an error sending your message. Please try again.';
            messageEl.classList.add('error');
            messageEl.style.display = 'block';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline';
            submitBtn.querySelector('.btn-loading').style.display = 'none';
        }
    }

    validateForm(formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        let isValid = true;
        
        // Clear previous errors
        this.clearFormErrors();
        
        // Validate name
        if (!name || name.trim().length < 2) {
            this.showFieldError('name', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
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

// Initialize the portfolio application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Handle service worker registration for PWA capabilities (optional)
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
