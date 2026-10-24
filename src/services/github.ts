import { useCallback, useEffect, useState } from 'react';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  language: string | null;
}

export async function fetchGithubRepos(username: string, perPage: number): Promise<GithubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=${perPage}`,
  );
  if (!response.ok) {
    throw new Error(`Falha ao buscar repositórios (${response.status})`);
  }
  return (await response.json()) as GithubRepo[];
}

type Status = 'loading' | 'ok' | 'error';

const GITHUB_USER = 'darckrow';
const REPO_COUNT = 9;

let cache: Promise<GithubRepo[]> | null = null;

function loadRepos(): Promise<GithubRepo[]> {
  if (!cache) {
    cache = fetchGithubRepos(GITHUB_USER, REPO_COUNT);
  }
  return cache;
}

export function __resetGithubCache(): void {
  cache = null;
}

export function useGithubRepos(): { repos: GithubRepo[]; status: Status; retry: () => void } {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const request = loadRepos();
    request.then(
      (data) => {
        if (!active) return;
        setRepos(data);
        setStatus('ok');
      },
      () => {
        if (!active) return;
        if (cache === request) cache = null;
        setStatus('error');
      },
    );
    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    cache = null;
    setStatus('loading');
    setAttempt((n) => n + 1);
  }, []);

  return { repos, status, retry };
}
