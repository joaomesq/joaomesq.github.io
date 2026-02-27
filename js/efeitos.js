/* ====================================
   INTERACTIVE EFFECTS - JOÃO MESQUITA
   ==================================== */

// ====================================
// NAVBAR ACTIVE STATE MANAGEMENT
// ====================================

document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.nav-link');
	const sections = document.querySelectorAll('section');

	// Set active link on scroll
	window.addEventListener('scroll', () => {
		let current = '';

		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (pageYOffset >= sectionTop - 200) {
				current = section.getAttribute('id');
			}
		});

		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href').slice(1) === current) {
				link.classList.add('active');
			}
		});
	});

	// Close navbar on link click (mobile)
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			const navbarCollapse = document.querySelector('.navbar-collapse');
			if (navbarCollapse.classList.contains('show')) {
				const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
					toggle: false
				});
				bsCollapse.hide();
			}
		});
	});
});

// ====================================
// SKILL PROGRESS ANIMATION
// ====================================

function animateProgressBars() {
	const progressBars = document.querySelectorAll('.progress-bar');

	const observerOptions = {
		threshold: 0.5,
		rootMargin: '0px 0px -100px 0px'
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
				const width = entry.target.style.width;
				entry.target.style.width = '0';
				entry.target.classList.add('animated');

				setTimeout(() => {
					entry.target.style.transition = 'width 1.5s ease';
					entry.target.style.width = width;
				}, 100);
			}
		});
	}, observerOptions);

	progressBars.forEach(bar => observer.observe(bar));
}

// ====================================
// PROJECTS CAROUSEL
// ====================================

function initProjectsCarousel() {
	const slides = document.querySelectorAll('.slide');
	const listaSlide = document.getElementById('lista-slide');
	const btnAvancar = document.getElementById('avancar');
	const btnRecuar = document.getElementById('recuar');

	if (!listaSlide || !btnAvancar || !btnRecuar) return;

	let slideIndex = 0;

	function showSlide(n) {
		if (n >= slides.length) slideIndex = 0;
		if (n < 0) slideIndex = slides.length - 1;

		slides.forEach(slide => {
			slide.style.display = 'none';
			slide.classList.remove('active');
		});

		if (slides[slideIndex]) {
			slides[slideIndex].style.display = 'block';
			slides[slideIndex].classList.add('active');
		}
	}

	btnAvancar?.addEventListener('click', () => {
		slideIndex++;
		showSlide(slideIndex);
	});

	btnRecuar?.addEventListener('click', () => {
		slideIndex--;
		showSlide(slideIndex);
	});

	showSlide(slideIndex);

	// Auto advance carousel every 5 seconds
	setInterval(() => {
		slideIndex++;
		showSlide(slideIndex);
	}, 5000);
}

// ====================================
// SMOOTH SCROLL BEHAVIOR
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const targetId = this.getAttribute('href');

		if (targetId === '#') return;

		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			const headerHeight = document.querySelector('.navbar')?.offsetHeight || 70;
			const targetPosition = targetElement.offsetTop - headerHeight;

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}
	});
});

// ====================================
// SCROLL REVEAL ANIMATIONS
// ====================================

function revealOnScroll() {
	const observerOptions = {
		threshold: 0.15,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('revealed');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Observe all cards and sections
	document.querySelectorAll('.card, .stat-box, .project-card, .skill-category, .contact-card').forEach(element => {
		element.classList.add('reveal');
		observer.observe(element);
	});
}

// ====================================
// FORM VALIDATION & SUBMISSION
// ====================================

function initContactForm() {
	const contactForm = document.getElementById('contact-form');

	if (!contactForm) return;

	contactForm.addEventListener('submit', function (e) {
		e.preventDefault();

		const emailInput = this.querySelector('input[type="email"]');
		const nameInput = this.querySelector('input[name="name"]');
		const messageInput = this.querySelector('textarea');

		// Basic validation
		if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
			showNotification('Por favor, preencha todos os campos', 'error');
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(emailInput.value)) {
			showNotification('Por favor, insira um email válido', 'error');
			return;
		}

		// Simulate form submission
		const submitBtn = this.querySelector('button[type="submit"]');
		const originalText = submitBtn?.textContent;

		if (submitBtn) {
			submitBtn.disabled = true;
			submitBtn.textContent = 'Enviando...';
		}

		setTimeout(() => {
			showNotification('Mensagem enviada com sucesso! 🎉', 'success');
			contactForm.reset();
			if (submitBtn) {
				submitBtn.disabled = false;
				submitBtn.textContent = originalText;
			}
		}, 1500);
	});
}

// ====================================
// NOTIFICATION SYSTEM
// ====================================

function showNotification(message, type = 'info') {
	const notification = document.createElement('div');
	notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show`;
	notification.setAttribute('role', 'alert');
	notification.style.position = 'fixed';
	notification.style.top = '80px';
	notification.style.right = '20px';
	notification.style.zIndex = '9999';
	notification.style.minWidth = '300px';
	notification.style.animation = 'slideInDown 0.3s ease';

	notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.remove();
	}, 5000);
}

// ====================================
// THEME TOGGLE (LIGHT/DARK MODE)
// ====================================

function initThemeToggle() {
	const themeToggle = document.getElementById('theme-toggle');
	const htmlElement = document.documentElement;

	// Check for saved theme preference or default to 'light'
	const currentTheme = localStorage.getItem('theme') || 'light';
	htmlElement.setAttribute('data-bs-theme', currentTheme);

	if (themeToggle) {
		themeToggle.checked = currentTheme === 'dark';

		themeToggle.addEventListener('change', () => {
			const theme = themeToggle.checked ? 'dark' : 'light';
			htmlElement.setAttribute('data-bs-theme', theme);
			localStorage.setItem('theme', theme);
		});
	}
}

// ====================================
// SCROLL TO TOP BUTTON
// ====================================

function initScrollToTop() {
	const scrollBtn = document.getElementById('scroll-to-top');

	if (!scrollBtn) {
		// Create scroll to top button if it doesn't exist
		const btn = document.createElement('button');
		btn.id = 'scroll-to-top';
		btn.className = 'btn btn-primary rounded-circle';
		btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            display: none;
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
		btn.innerHTML = '<i class="material-symbols-outlined">arrow_upward</i>';
		document.body.appendChild(btn);

		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 300) {
				btn.style.display = 'flex';
				btn.style.alignItems = 'center';
				btn.style.justifyContent = 'center';
				setTimeout(() => {
					btn.style.opacity = '1';
				}, 10);
			} else {
				btn.style.opacity = '0';
				setTimeout(() => {
					btn.style.display = 'none';
				}, 300);
			}
		});

		btn.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
}

// ====================================
// COPY TO CLIPBOARD FUNCTION
// ====================================

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).then(() => {
		showNotification('Copiado para a área de transferência! ✓', 'success');
	}).catch(() => {
		showNotification('Erro ao copiar', 'error');
	});
}

// ====================================
// PARALLAX EFFECT
// ====================================

function initParallax() {
	const parallaxElements = document.querySelectorAll('[data-parallax]');

	if (parallaxElements.length === 0) return;

	window.addEventListener('scroll', () => {
		parallaxElements.forEach(element => {
			const speed = element.getAttribute('data-parallax');
			element.style.transform = `translateY(${window.pageYOffset * speed}px)`;
		});
	});
}

// ====================================
// TYPING EFFECT
// ====================================

function typeEffect(element, text, speed = 50) {
	let index = 0;
	element.innerHTML = '';

	function type() {
		if (index < text.length) {
			element.innerHTML += text.charAt(index);
			index++;
			setTimeout(type, speed);
		}
	}

	type();
}

// ====================================
// COUNT UP ANIMATION
// ====================================

function countUpAnimation(element, target, duration = 2000) {
	const start = 0;
	const increment = target / (duration / 16);
	let current = start;

	const counter = setInterval(() => {
		current += increment;
		if (current >= target) {
			element.textContent = target;
			clearInterval(counter);
		} else {
			element.textContent = Math.floor(current);
		}
	}, 16);
}

// ====================================
// LAZY LOADING IMAGES
// ====================================

function initLazyLoading() {
	const imageObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.classList.remove('lazy');
				imageObserver.unobserve(img);
			}
		});
	});

	document.querySelectorAll('img[data-src]').forEach(img => {
		imageObserver.observe(img);
	});
}

// ====================================
// INITIALIZE ALL FUNCTIONS ON DOM READY
// ====================================

document.addEventListener('DOMContentLoaded', function () {
	// Animate progress bars when they come into view
	animateProgressBars();

	// Initialize projects carousel
	initProjectsCarousel();

	// Reveal elements on scroll
	revealOnScroll();

	// Initialize contact form
	initContactForm();

	// Initialize theme toggle
	initThemeToggle();

	// Initialize scroll to top button
	initScrollToTop();

	// Initialize parallax effect
	initParallax();

	// Initialize lazy loading
	initLazyLoading();

	// Log portfolio loaded
	console.log('%c✓ Portfólio de João Mesquita carregado com sucesso!', 'color: #0f7ba7; font-weight: bold; font-size: 14px;');
});

// ====================================
// PERFORMANCE: Debounce function for scroll events
// ====================================

function debounce(func, delay) {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(this, args), delay);
	};
}

// ====================================
// KEYBOARD SHORTCUTS
// ====================================

document.addEventListener('keydown', function (event) {
	// Ctrl/Cmd + K to focus search (if search is implemented)
	if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
		event.preventDefault();
		// Add search functionality here
	}

	// Home key to scroll to top
	if (event.key === 'Home') {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// End key to scroll to bottom
	if (event.key === 'End') {
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	}
});

// ====================================
// MOBILE MENU HAMBURGER ANIMATION
// ====================================

function initMobileMenuAnimation() {
	const toggler = document.querySelector('.navbar-toggler');
	const icon = toggler?.querySelector('.navbar-toggler-icon');

	if (toggler) {
		toggler.addEventListener('click', function () {
			if (icon) {
				this.classList.toggle('collapsed');
			}
		});
	}
}

initMobileMenuAnimation();

// ====================================
// EXTERNAL LINKS TARGET BLANK
// ====================================

document.addEventListener('DOMContentLoaded', function () {
	const links = document.querySelectorAll('a[href^="http"]');
	links.forEach(link => {
		link.setAttribute('target', '_blank');
		link.setAttribute('rel', 'noopener noreferrer');
	});
});