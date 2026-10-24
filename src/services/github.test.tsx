import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchGithubRepos, useGithubRepos, __resetGithubCache } from './github';

const repo = {
  id: 1,
  name: 'a',
  description: null,
  html_url: 'u',
  homepage: null,
  language: null,
};

function Probe({ id }: { id: string }) {
  const { repos, status, retry } = useGithubRepos();
  return (
    <div>
      <span data-testid={id}>{status}:{repos.length}</span>
      <button onClick={retry}>retry-{id}</button>
    </div>
  );
}

describe('github service', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    __resetGithubCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('usa sort=pushed', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => [] });
    await fetchGithubRepos('darckrow', 9);
    expect(fetchMock.mock.calls[0][0]).toContain('sort=pushed&per_page=9');
  });

  it('lança em resposta não-ok', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 403 });
    await expect(fetchGithubRepos('darckrow', 9)).rejects.toThrow();
  });

  it('hook compartilha a requisição', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => [repo] });
    render(
      <>
        <Probe id="a" />
        <Probe id="b" />
      </>,
    );
    expect(await screen.findByText('ok:1', { selector: '[data-testid="a"]' })).toBeInTheDocument();
    expect(await screen.findByText('ok:1', { selector: '[data-testid="b"]' })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('hook expõe erro e retry', async () => {
    fetchMock.mockRejectedValueOnce(new Error('rede'));
    render(<Probe id="a" />);
    expect(await screen.findByText('error:0')).toBeInTheDocument();

    fetchMock.mockResolvedValue({ ok: true, json: async () => [repo] });
    await userEvent.click(screen.getByText('retry-a'));
    await waitFor(() => expect(screen.getByTestId('a')).toHaveTextContent('ok:1'));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
