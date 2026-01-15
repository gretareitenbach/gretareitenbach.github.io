const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const header = document.querySelector('.site-header');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.getAttribute('data-open') === 'true';
    navLinks.setAttribute('data-open', String(!isOpen));
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.setAttribute('data-open', 'false');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

if (header) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        header.classList.toggle('site-header--scrolled', !entry.isIntersecting);
      });
    },
    { rootMargin: '-80px 0px 0px 0px', threshold: 0 }
  );

  const heroSection = document.querySelector('#hero');
  if (heroSection) {
    observer.observe(heroSection);
  }
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

const honorsMarquee = document.querySelector('.honors-marquee');
const honorsTrack = honorsMarquee ? honorsMarquee.querySelector('.honors-track') : null;

if (honorsMarquee && honorsTrack) {
  const cards = Array.from(honorsTrack.children);

  if (prefersReducedMotion) {
    honorsMarquee.setAttribute('data-animated', 'false');
  } else {
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      honorsTrack.appendChild(clone);
    });
  }
}
