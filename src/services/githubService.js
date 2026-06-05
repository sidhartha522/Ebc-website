/**
 * GitHub as Database — Service
 * 
 * Admin panel changes are committed directly to the GitHub repo
 * via the GitHub Contents API. When Netlify/Vercel detects a commit,
 * it auto-rebuilds and users see the updated data.
 * 
 * Setup: Admin must configure GitHub token + repo details once
 * in the Admin → GitHub Setup tab.
 */

const GITHUB_CONFIG_KEY = 'ebc_github_config';

export function getGithubConfig() {
  try {
    const raw = localStorage.getItem(GITHUB_CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveGithubConfig(config) {
  localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(config));
}

export function clearGithubConfig() {
  localStorage.removeItem(GITHUB_CONFIG_KEY);
}

export function isGithubConfigured() {
  const cfg = getGithubConfig();
  return !!(cfg?.token && cfg?.owner && cfg?.repo);
}

/**
 * Fetch a file from GitHub and return its content + SHA.
 * SHA is required to update an existing file.
 */
async function getFileSHA(config, filePath) {
  const { token, owner, repo, branch = 'main' } = config;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!res.ok) {
    if (res.status === 404) return null; // File doesn't exist yet
    const err = await res.json();
    throw new Error(`GitHub API error: ${err.message}`);
  }
  const data = await res.json();
  return data.sha;
}

/**
 * Write JSON data to a file in the GitHub repo.
 * Creates the file if it doesn't exist, updates it if it does.
 */
export async function writeJsonToGithub(filename, jsonData) {
  const config = getGithubConfig();
  if (!config?.token || !config?.owner || !config?.repo) {
    throw new Error('GitHub is not configured. Go to Admin → GitHub Setup.');
  }

  const { token, owner, repo, branch = 'main' } = config;
  const filePath = `public/data/${filename}`;
  const content = JSON.stringify(jsonData, null, 2);
  // GitHub API requires base64 encoded content
  const contentBase64 = btoa(unescape(encodeURIComponent(content)));

  // Get existing file SHA (needed for updates)
  const sha = await getFileSHA(config, filePath);

  const body = {
    message: `admin: update ${filename}`,
    content: contentBase64,
    branch,
    ...(sha ? { sha } : {}), // Include SHA only when updating existing file
  };

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Failed to save to GitHub: ${err.message}`);
  }

  return await res.json();
}

/**
 * Validate a GitHub token by making a lightweight API call.
 */
export async function validateGithubConfig(config) {
  const { token, owner, repo } = config;
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Invalid config');
  }
  return await res.json();
}
