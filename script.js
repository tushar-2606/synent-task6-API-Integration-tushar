document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const usernameInput = document.getElementById('username');
  const result = document.getElementById('result');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // API functionality not implemented yet.
    // Placeholder: log the intended username to the console.
    console.log('Search requested for:', usernameInput.value.trim());
    // Keep result container empty per requirements.
  });
});
