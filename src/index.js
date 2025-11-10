(function() {
  'use strict';
  
  const STORAGE_KEY = 'theme-preference';
  
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage недоступен, игнорируем
    }
  };
  
  const getStoredTheme = () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };
  
  const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const storedTheme = getStoredTheme();
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialAttr = document.documentElement.getAttribute('data-theme');
    let initialTheme;
    
    if (storedTheme === 'dark' || storedTheme === 'light') {
      initialTheme = storedTheme;
    } else if (initialAttr === 'dark' || initialAttr === 'light') {
      initialTheme = initialAttr;
    } else {
      initialTheme = prefersDark ? 'dark' : 'light';
    }
    
    setTheme(initialTheme);
    
    let userOverrodeTheme = !!storedTheme;
    
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
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
