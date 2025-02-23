export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
    if (!response.ok) {
      throw new Error('Failed to fetch repos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repos:', error);
    return [];
  }
}
