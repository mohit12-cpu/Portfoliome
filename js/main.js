// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Initialize Three.js scene for hero section
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;

function initThreeJS() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 30;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add renderer to DOM
    document.getElementById('hero-canvas-container').appendChild(renderer.domElement);
    
    // Create particle system
    createParticles();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    
    // Start animation loop
    animate();
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const particleCount = 1500;
    
    const colors = [];
    const colorChoices = [
        new THREE.Color(0x64ffda), // Accent color
        new THREE.Color(0x8892b0), // Secondary text color
        new THREE.Color(0xccd6f6)  // Primary text color
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        
        vertices.push(x, y, z);
        
        // Add random color from choices
        const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        colors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.5,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        sizeAttenuation: true
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.01;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.01;
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    
    // Move particles based on mouse position
    particles.rotation.x += (mouseY * 0.05 - particles.rotation.x) * 0.05;
    particles.rotation.y += (mouseX * 0.05 - particles.rotation.y) * 0.05;
    
    renderer.render(scene, camera);
}

// Initialize Three.js when DOM is loaded
document.addEventListener('DOMContentLoaded', initThreeJS);

// Skills data
const skills = [
    { name: 'HTML', icon: '<i class="fab fa-html5"></i>' },
    { name: 'CSS', icon: '<i class="fab fa-css3-alt"></i>' },
    { name: 'JavaScript', icon: '<i class="fab fa-js"></i>' },
    { name: 'React', icon: '<i class="fab fa-react"></i>' },
    { name: 'Node.js', icon: '<i class="fab fa-node-js"></i>' },
    { name: 'Git', icon: '<i class="fab fa-git-alt"></i>' }
];

// Projects data
const projects = [
    {
        title: 'E-Commerce Website',
        image: 'https://via.placeholder.com/600x400',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        link: '#'
    },
    {
        title: 'Portfolio Website',
        image: 'https://via.placeholder.com/600x400',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Three.js'],
        link: '#'
    },
    {
        title: 'Weather App',
        image: 'https://via.placeholder.com/600x400',
        technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
        link: '#'
    },
    {
        title: 'Task Manager',
        image: 'https://via.placeholder.com/600x400',
        technologies: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
        link: '#'
    }
];

// Populate skills section
function populateSkills() {
    const skillsContainer = document.querySelector('.skills-container');
    
    skills.forEach(skill => {
        const skillCube = document.createElement('div');
        skillCube.classList.add('skill-cube');
        
        // Create cube faces
        const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
        
        faces.forEach(face => {
            const skillFace = document.createElement('div');
            skillFace.classList.add('skill-face', face);
            
            if (face === 'front') {
                skillFace.innerHTML = skill.icon;
            } else if (face === 'back') {
                skillFace.textContent = skill.name;
            } else {
                skillFace.innerHTML = skill.icon;
            }
            
            skillCube.appendChild(skillFace);
        });
        
        skillsContainer.appendChild(skillCube);
    });
}

// Populate projects section
function populateProjects() {
    const projectsContainer = document.querySelector('.projects-container');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-overlay">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link">View Project</a>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

// Initialize GSAP animations
function initGSAP() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // About section animation
    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about-card',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -100,
        duration: 1
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 100,
        duration: 1
    });
    
    // Skills section animation
    gsap.from('.skill-cube', {
        scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8
    });
    
    // Projects section animation
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8
    });
    
    // Contact section animation
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -100,
        duration: 1
    });
    
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 100,
        duration: 1
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateSkills();
    populateProjects();
    initGSAP();
    
    // Form submission (prevent default)
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('This is a front-end only portfolio. Form submission is simulated!');
        contactForm.reset();
    });
});