import { describe, it, expect } from 'vitest';
import { stageCode, toStage } from './stages';
import type { GithubRepo } from '../services/github';

const base: GithubRepo = {
  id: 1,
  name: 'repo',
  description: 'desc',
  html_url: 'https://github.com/darckrow/repo',
  homepage: null,
  language: null,
};

describe('stageCode', () => {
  it('agrupa 3 fases por mundo', () => {
    expect(stageCode(0)).toBe('FASE 1-1');
    expect(stageCode(2)).toBe('FASE 1-3');
    expect(stageCode(3)).toBe('FASE 2-1');
    expect(stageCode(8)).toBe('FASE 3-3');
  });
});

describe('toStage', () => {
  it('usa valores padrão quando faltam dados', () => {
    const stage = toStage(
      { ...base, description: null, language: null, topics: undefined, homepage: '' },
      0,
    );
    expect(stage.description).toBe('Sem descrição disponível');
    expect(stage.tags).toEqual([]);
    expect(stage.demoUrl).toBeNull();
  });

  it('remove tags duplicadas mantendo a linguagem primeiro', () => {
    const stage = toStage({ ...base, language: 'TypeScript', topics: ['react', 'TypeScript'] }, 1);
    expect(stage.tags).toEqual(['TypeScript', 'react']);
    expect(stage.code).toBe('FASE 1-2');
  });

  it('expõe demoUrl quando há homepage', () => {
    expect(toStage({ ...base, homepage: 'https://x.dev' }, 0).demoUrl).toBe('https://x.dev');
    expect(toStage({ ...base, homepage: '   ' }, 0).demoUrl).toBeNull();
  });
});
