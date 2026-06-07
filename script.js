document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const searchBtn = document.getElementById('search-btn');
  const loadingElement = document.getElementById('loading');
  const errorElement = document.getElementById('error');
  const errorText = document.getElementById('error-text');
  const resultSection = document.getElementById('result');

  // Event listener for search button
  searchBtn.addEventListener('click', handleSearch);

  // Event listener for Enter key
  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  function handleSearch() {
    const username = usernameInput.value.trim();

    if (!username) {
      showError('Please enter a GitHub username');
      return;
    }

    fetchAndDisplayProfile(username);
  }

  async function fetchAndDisplayProfile(username) {
    showLoading();
    hideError();
    hideResult();

    try {
      const profile = await fetchGitHubProfile(username);
      displayProfile(profile);
      showResult();
    } catch (error) {
      showError(error.message);
    }
  }

  async function fetchGitHubProfile(username) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`User "${username}" not found on GitHub`);
        } else if (response.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later');
        } else {
          throw new Error('Failed to fetch user profile');
        }
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error. Please check your connection');
      }
      throw error;
    }
  }

  function displayProfile(data) {
    // Avatar
    const avatarImg = document.getElementById('avatar');
    avatarImg.src = data.avatar_url;
    avatarImg.alt = `${data.login} avatar`;

    // Name
    const nameElement = document.getElementById('name');
    nameElement.textContent = data.name || 'Not provided';

    // Username
    const usernameElement = document.getElementById('login');
    usernameElement.textContent = `@${data.login}`;

    // Bio
    const bioElement = document.getElementById('bio');
    bioElement.textContent = data.bio || 'No bio available';

    // Stats
    document.getElementById('followers').textContent = data.followers || '0';
    document.getElementById('following').textContent = data.following || '0';
    document.getElementById('repos').textContent = data.public_repos || '0';

    // GitHub link
    const githubLink = document.getElementById('github-link');
    githubLink.href = data.html_url;
  }

  function showLoading() {
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
  }

  function hideLoading() {
    loadingElement.style.display = 'none';
  }

  function showError(message) {
    errorText.textContent = message;
    errorElement.style.display = 'block';
    loadingElement.style.display = 'none';
  }

  function hideError() {
    errorElement.style.display = 'none';
  }

  function showResult() {
    resultSection.style.display = 'block';
    loadingElement.style.display = 'none';
  }

  function hideResult() {
    resultSection.style.display = 'none';
  }
});
