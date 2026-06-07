document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const usernameInput = document.getElementById('username');
  const result = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!username) return;

    const profile = await fetchProfile(username);
    renderProfile(profile);
  });

  async function fetchProfile(username) {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  }

  function renderProfile(data) {
    result.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'profile-card';

    const header = document.createElement('div');
    header.className = 'profile-header';

    const img = document.createElement('img');
    img.className = 'avatar';
    img.src = data.avatar_url;
    img.alt = `${data.login} avatar`;

    const meta = document.createElement('div');
    meta.className = 'meta';

    const name = document.createElement('h2');
    name.className = 'name';
    name.textContent = data.name || '';

    const uname = document.createElement('p');
    uname.className = 'username';
    uname.textContent = `@${data.login}`;

    meta.appendChild(name);
    meta.appendChild(uname);

    header.appendChild(img);
    header.appendChild(meta);

    const bio = document.createElement('p');
    bio.className = 'bio';
    bio.textContent = data.bio || '';

    card.appendChild(header);
    card.appendChild(bio);

    result.appendChild(card);
  }
});
