import type { GithubRepo } from '../services/github';

export interface Stage {
  id: number;
  code: string;
  name: string;
  language: string | null;
  description: string;
  tags: string[];
  codeUrl: string;
  demoUrl: string | null;
}

export function stageCode(index: number): string {
  return `FASE ${Math.floor(index / 3) + 1}-${(index % 3) + 1}`;
}

export function toStage(repo: GithubRepo, index: number): Stage {
  const tags = [repo.language, ...(repo.topics ?? [])].filter(
    (tag, i, all): tag is string => Boolean(tag) && all.indexOf(tag) === i,
  );
  const homepage = repo.homepage?.trim();
  return {
    id: repo.id,
    code: stageCode(index),
    name: repo.name,
    language: repo.language,
    description: repo.description?.trim() ? repo.description : 'Sem descrição disponível',
    tags,
    codeUrl: repo.html_url,
    demoUrl: homepage ? repo.homepage : null,
  };
}
