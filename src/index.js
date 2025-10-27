document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  // Функция для установки темы
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  // Переключение темы
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Безопасная работа с localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  });

  // Восстановление темы
  let savedTheme = 'light';
  if (typeof localStorage !== 'undefined') {
    savedTheme = localStorage.getItem('theme') || 'light';
  }
  setTheme(savedTheme);
});
