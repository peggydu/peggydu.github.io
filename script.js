/* ─────────────────────────────────────────
   TYPING ANIMATION
   Matches the original: types "Product" then deletes, loops
───────────────────────────────────────── */
(function () {
  var words   = ['Product'];   // only one word on the original
  var typer   = document.getElementById('typer');
  var cursor  = document.getElementById('cursor');
  var wordIdx = 0;
  var charIdx = 0;
  var deleting = false;

  var TYPE_SPEED   = 120;   // ms per char while typing
  var DELETE_SPEED = 80;    // ms per char while deleting
  var HOLD_DELAY   = 2000;  // pause at full word
  var RESTART_DELAY = 400;  // pause before retyping

  function tick() {
    var currentWord = words[wordIdx];

    if (!deleting) {
      // typing forward
      charIdx++;
      typer.textContent = currentWord.slice(0, charIdx);

      if (charIdx === currentWord.length) {
        // finished typing — hold then start deleting
        deleting = true;
        setTimeout(tick, HOLD_DELAY);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      // deleting
      charIdx--;
      typer.textContent = currentWord.slice(0, charIdx);

      if (charIdx === 0) {
        // finished deleting — move to next word (or loop)
        deleting = false;
        wordIdx  = (wordIdx + 1) % words.length;
        setTimeout(tick, RESTART_DELAY);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  // small initial delay before first letter appears
  setTimeout(tick, 600);
})();

/* ─────────────────────────────────────────
   SCROLL CHEVRON — hide after scrolling
───────────────────────────────────────── */
var chevron = document.getElementById('scrollChevron');
window.addEventListener('scroll', function () {
  if (window.scrollY > 80) {
    chevron.style.opacity = '0';
    chevron.style.pointerEvents = 'none';
  } else {
    chevron.style.opacity = '0.5';
    chevron.style.pointerEvents = 'auto';
  }
}, { passive: true });

chevron.addEventListener('click', function () {
  document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
});

/* ─────────────────────────────────────────
   NAV ACTIVE LINK — highlight on scroll
───────────────────────────────────────── */
var navLinks = document.querySelectorAll('.nav-link');
var sections = [
  { id: 'work',   el: document.getElementById('work')   },
];

window.addEventListener('scroll', function () {
  var scrollY = window.scrollY;
  var threshold = window.innerHeight * 0.4;

  // past hero → activate Work
  if (scrollY > window.innerHeight * 0.5) {
    navLinks.forEach(function (l) { l.classList.remove('nav-link--active'); });
    navLinks[0].classList.add('nav-link--active');
  } else {
    navLinks.forEach(function (l) { l.classList.remove('nav-link--active'); });
  }
}, { passive: true });

/* ─────────────────────────────────────────
   SMOOTH SCROLL for anchor links
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var href = a.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    var navHeight = document.querySelector('.w-nav').offsetHeight || 84;
    var top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});
