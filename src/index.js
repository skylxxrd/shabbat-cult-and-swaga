document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };
  const prefersDark =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialAttr = document.documentElement.getAttribute('data-theme');
  const initialTheme = initialAttr === 'dark' || initialAttr === 'light' ? initialAttr : prefersDark ? 'dark' : 'light';
  setTheme(initialTheme);

  let userOverrodeTheme = false;
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    userOverrodeTheme = true;
  });

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSchemeChange = (e) => {
      if (!userOverrodeTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handleSchemeChange);
    } else if (typeof mql.addListener === 'function') {
      mql.addListener(handleSchemeChange);
    }
  }
});
