// Mobile drawer menu toggle (shared for all pages)
(function () {
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    const btn = document.querySelector('.menu-btn');
    const backdrop = document.querySelector('.menu-backdrop');
    const actions = document.querySelector('.topbar-actions');

    if (!btn || !backdrop || !actions) return;

    function openMenu() {
      document.body.classList.add('menu-open');
      btn.setAttribute('aria-expanded', 'true');
      // prevent background scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      document.body.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function () {
      if (document.body.classList.contains('menu-open')) closeMenu();
      else openMenu();
    });

    backdrop.addEventListener('click', closeMenu);

    // Close on link click (useful for one-page nav)
    actions.addEventListener('click', function (e) {
      const a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (a) closeMenu();
    });

    // ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // If user rotates / widens screen, ensure no stuck scroll lock
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    });
  });
})();
