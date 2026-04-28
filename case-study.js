// TOC active link scroll-spy
(function () {
  const links = document.querySelectorAll('.cs-toc-link');
  const sections = Array.from(links)
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  function onScroll() {
    let current = sections[0];
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 160) current = sec;
    });
    links.forEach(l => {
      l.classList.toggle(
        'active',
        l.getAttribute('href') === '#' + current.id
      );
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
