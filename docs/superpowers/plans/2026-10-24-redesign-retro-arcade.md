# Redesign Retrô Arcade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir o visual do portfólio no tema retrô arcade, com cada página como uma tela de game (título, ficha do personagem, seleção de fases, CONTINUE?), mantendo o Shadow e o preto + vermelho.

**Architecture:** Um tema MUI central (`src/theme/`) mais CSS global (scanlines, fontes, reduced-motion) e um punhado de primitivas de tema (`src/components/arcade/`). Os dados ficam fora das páginas: o currículo em `src/data/profile.ts`, os repositórios em `src/services/github.ts` (um hook com cache compartilhado) e o mapeamento para "fases" em `src/lib/stages.ts`. As páginas só compõem esses pedaços.

**Tech Stack:** React 19, TypeScript 5.7 (strict), Vite 6, MUI 6, React Router 7. Testes com Vitest 3, Testing Library e jsdom (novos devDeps).

**Spec:** `docs/superpowers/specs/2026-10-24-redesign-retro-arcade-design.md`

## Global Constraints

- Todo o trabalho acontece na branch `redesign-retro-arcade`. Nada vai para a `main` antes de o Ramon aprovar o deploy de preview (Task 9).
- `npm run build` (`tsc -b && vite build`) e `npm run lint` precisam passar ao fim de cada task. É o que o Netlify roda.
- Imagens sempre via `import x from '.../assets/...'`, nunca por caminho em string.
- Todo texto visível em português do Brasil.
- Paleta:
  - fundo `#050505`;
  - superfície `#0d0d0d`;
  - vermelho `#dc2626` / `#b91c1c`;
  - amarelo `#facc15`;
  - texto `#ddd`, secundário `#aaa` e `#888`;
  - borda `#fff`.
- `#ff0000` não aparece mais em lugar nenhum.
- **Press Start 2P** só em títulos, rótulos curtos, navegação e botões. Texto corrido em **JetBrains Mono**.
- Caixa pixel: borda `3px solid #fff` + `box-shadow: 4px 4px 0 #b91c1c`, `border-radius: 0`.
- Sprites com `image-rendering: pixelated`.
- `prefers-reduced-motion: reduce` desliga piscar, transições de hover e o contador. Os GIFs continuam animados.
- Sem backend novo, sem som, sem páginas novas.

## Review Focus

1. **GitHub fora do ar ou rate limit (403/60 req/h).** O visitante vê "GAME OVER" com "TENTAR DE NOVO", e não uma página vazia. Coberto pelo teste na Task 6.
2. **Repositório sem descrição, sem linguagem ou sem homepage.** Mostra "Sem descrição disponível". Não aparece tag `null` nem botão "▶ JOGAR" quebrado. Coberto pelos testes nas Tasks 4 e 6.
3. **Visitante só com teclado na seleção de fases.** Tab chega em cada fase, o foco seleciona e o detalhe atualiza. O foco é visível. Coberto pelo teste na Task 6.
4. **Celular estreito (360px).** A navegação recolhe num botão MENU que abre a lista, e não há rolagem horizontal. O teste do menu está na Task 3. A checagem visual na Task 9.
5. **Mensagem de contato com `&`, `?`, `#`, acentos e quebras de linha.** Chega intacta no `mailto:` e no `wa.me`. O código atual monta o texto do WhatsApp sem `encodeURIComponent`. Coberto pelo teste na Task 8.

---

### Task 1: Base de testes, tema e fundação visual

**Files:**
- Modify: `package.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`
- Create: `src/theme/theme.ts`, `src/theme/global.css`, `src/test/setup.ts`, `src/theme/theme.test.ts`, `public/favicon.png` (cópia de `src/assets/logo.png`)
- Delete: `src/index.css`
- Rename: `src/componets/` → `src/components/` (`git mv`), atualizando todos os imports

**Interfaces:**
- Produces: `theme` (default export de `src/theme/theme.ts`, um `Theme` do MUI) e `arcade` (named export):
  `{ bg: '#050505', surface: '#0d0d0d', red: '#dc2626', redDark: '#b91c1c', yellow: '#facc15', text: '#ddd', textMuted: '#aaa', textDim: '#888', border: '#fff', pixelFont: '"Press Start 2P", monospace', bodyFont: '"JetBrains Mono", monospace' }`
- Produces: as classes CSS globais `.blink` (piscar em `steps(2)`, 1s) e `.pixelated` (`image-rendering: pixelated`). As duas respeitam reduced-motion.
- Produces: o script `npm test` (`vitest run`).

- [ ] **Step 1: Instalar os devDeps de teste**

Run: `npm i -D vitest@^3 jsdom @testing-library/react@^16 @testing-library/dom @testing-library/jest-dom @testing-library/user-event`
Adicionar `"test": "vitest run"` em `scripts`.
No `vite.config.ts`: adicionar `/// <reference types="vitest/config" />` e `test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' }`.
`src/test/setup.ts` contém `import '@testing-library/jest-dom/vitest'`.
Os testes importam `describe/it/expect/vi` de `vitest` explicitamente, sem globals.

- [ ] **Step 2: Escrever o teste que falha, `src/theme/theme.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import theme, { arcade } from './theme'

describe('theme', () => {
  it('usa a paleta arcade', () => {
    expect(theme.palette.mode).toBe('dark')
    expect(theme.palette.primary.main).toBe('#dc2626')
    expect(theme.palette.secondary.main).toBe('#facc15')
    expect(theme.palette.background.default).toBe('#050505')
    expect(theme.palette.background.paper).toBe('#0d0d0d')
    expect(theme.shape.borderRadius).toBe(0)
  })
  it('separa fonte pixel e fonte de leitura', () => {
    expect(theme.typography.fontFamily).toBe(arcade.bodyFont)
    expect(theme.typography.h1.fontFamily).toBe(arcade.pixelFont)
    expect(theme.typography.button.fontFamily).toBe(arcade.pixelFont)
    expect(theme.typography.button.textTransform).toBe('none')
  })
})
```

- [ ] **Step 3: Rodar e ver falhar**

Run: `npm test`
Expected: FAIL. `./theme` não existe.

- [ ] **Step 4: Implementar o `src/theme/theme.ts`**

`createTheme` com:
- os valores acima;
- `h1`–`h6` em `arcade.pixelFont`, com tamanhos pequenos (fonte pixel é larga; h1 em torno de `1.6rem`, h6 em torno de `0.75rem`) e `lineHeight: 1.6`;
- `body1`/`body2` em `arcade.bodyFont`.

- [ ] **Step 5: Rodar e ver passar**

Run: `npm test`
Expected: PASS (2 testes).

- [ ] **Step 6: CSS global e HTML**

`src/theme/global.css`:
- `body` com fundo `#050505` e as scanlines `repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px)`;
- `.blink`, `.pixelated`;
- `:focus-visible { outline: 3px solid #facc15; outline-offset: 2px }`;
- um bloco `@media (prefers-reduced-motion: reduce)` que zera `animation` e `transition` em `*`.

`index.html`:
- `lang="pt-BR"`;
- `<title>Ramon Matheus · Portfólio</title>`;
- `<link rel="icon" type="image/png" href="/favicon.png">`;
- `<link>` do Google Fonts para `Press+Start+2P` e `JetBrains+Mono:wght@400;600`, com `display=swap`, e `preconnect`.

`src/main.tsx`: envolve `<App/>` em `<ThemeProvider theme={theme}><CssBaseline/>…`, importa `./theme/global.css` e remove o `index.css`.

- [ ] **Step 7: Verificar**

Run: `npm test && npm run lint && npm run build`
Expected: tudo passa. Em `npm run dev`, o fundo fica preto com scanlines e o texto em JetBrains Mono.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: base do tema arcade (MUI theme, CSS global, fontes, vitest)"
```

---

### Task 2: Primitivas do tema arcade

**Files:**
- Create: `src/components/arcade/PixelBox.tsx`, `PixelButton.tsx`, `ScreenTitle.tsx`, `StatBar.tsx`, `src/components/arcade/arcade.test.tsx`

**Interfaces:**
- Consumes: `arcade` (Task 1)
- Produces:
  - `PixelBox({ children, sx?, highlight?: boolean, component?: React.ElementType })`: caixa pixel. `highlight` troca a borda para amarelo e a sombra para `0 0 0 3px #b91c1c`.
  - `PixelButton({ children, variant?: 'primary' | 'secondary', to?: string, href?: string, type?: 'button' | 'submit', onClick?, startIcon?, fullWidth? })`:
    - `primary` é fundo vermelho; `secondary` é borda branca e fundo transparente;
    - com `to`, renderiza um `Link` do react-router;
    - com `href`, renderiza `<a target="_blank" rel="noopener noreferrer">`;
    - sem os dois, renderiza `<button>`.
  - `ScreenTitle({ title: string, subtitle?: string })`: `<h1>` em fonte pixel com `text-shadow: 2px 2px 0 #b91c1c`, centralizado, e o subtítulo em `textDim`.
  - `StatBar({ label: string, value: number })`: limita `value` a 0–100, renderiza `role="meter"` com `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=100` e `aria-label={label}`, e mostra o número.

- [ ] **Step 1: Escrever os testes que falham, em `arcade.test.tsx`**

- `StatBar limita o valor`: `render(<StatBar label="Backend" value={140}/>)` → `getByRole('meter', {name:'Backend'})` tem `aria-valuenow="100"`. Com `value={-5}`, tem `"0"`.
- `PixelButton com href abre em nova aba`: `getByRole('link')` tem `target="_blank"` e `rel="noopener noreferrer"`.
- `PixelButton com to navega internamente`: dentro de `MemoryRouter`, o link tem `href="/projetos"` e não tem `target`.
- `ScreenTitle renderiza h1`: `getByRole('heading', {level:1, name:'SELECIONE A FASE'})`.

- [ ] **Step 2: Rodar e ver falhar**

Run: `npm test`
Expected: FAIL (módulos inexistentes).

- [ ] **Step 3: Implementar as quatro primitivas** com MUI `Box`/`ButtonBase` + `sx`, usando só os tokens de `arcade`.

O hover do botão é `transform: translate(-2px,-2px)` com a sombra crescendo.

- [ ] **Step 4: Rodar e ver passar**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/arcade && git commit -m "feat: primitivas do tema arcade"
```

---

### Task 3: Navbar, Footer e Shadow flutuante

**Files:**
- Rewrite: `src/components/_NavBar/_NavBar.tsx` → mover para `src/components/NavBar/NavBar.tsx` (default export `NavBar`); atualizar `App.tsx`
- Modify: `src/components/Footer/Footer.tsx`, `src/components/FloatingIcon/FloatingIcon.tsx`
- Test: `src/components/NavBar/NavBar.test.tsx`

**Interfaces:**
- Consumes: `arcade`, `PixelBox`
- Produces: `NavBar` (sem props). Usa `useLocation`. Rotas e rótulos: `/` HOME, `/about` SOBRE, `/projetos` PROJETOS, `/contatos` CONTATO.

Comportamento:
- **Desktop (`md+`):**
  - logo à esquerda (`logo.png`, altura ~36px);
  - links em fonte pixel ~10px, cor `textDim`;
  - o link ativo fica em amarelo, com prefixo `▶ ` e `aria-current="page"`;
  - borda inferior `3px solid #b91c1c`.
- **Mobile (`xs`–`sm`):**
  - um botão "MENU" com `aria-expanded` e `aria-controls`;
  - ao clicar, abre uma lista vertical no estilo menu de pausa (`PixelBox`);
  - ao clicar num link, o menu fecha.
- Desktop e mobile ficam os dois no DOM, alternados por `display` responsivo. Não usar `useMediaQuery`.
- **Footer:** mantém os 3 links sociais e as URLs atuais. Ícones em quadrados pixel (fundo `#0d0d0d`, borda branca e hover vermelho), "Vamos trabalhar juntos?" em fonte pixel pequena e `© {ano} Ramon Matheus`.
- **FloatingIcon:** mantém o comportamento. Tooltip em `PixelBox` amarelo ("Vamos pro meu GitHub?"), `alt="Shadow — ir para o GitHub"`, `rel="noopener noreferrer"` e classe `pixelated`.

- [ ] **Step 1: Escrever os testes que falham, em `NavBar.test.tsx`**

Todos renderizam dentro de `MemoryRouter initialEntries={['/projetos']}`.
- `marca a rota ativa`: entre todos os links com nome `/PROJETOS/`, pelo menos um tem `aria-current="page"`. O link `/HOME/` não tem.
- `menu mobile abre e fecha`:
  - `getByRole('button', {name:'MENU'})` começa com `aria-expanded="false"`;
  - depois do clique, fica `"true"` e a lista de links do menu está visível;
  - clicar em um link do menu volta para `"false"`.

- [ ] **Step 2: Rodar e ver falhar.** Run: `npm test`. Expected: FAIL.
- [ ] **Step 3: Implementar NavBar, Footer e FloatingIcon** conforme acima. Remover a pasta `_NavBar`.
- [ ] **Step 4: Rodar e ver passar.** Run: `npm test && npm run lint && npm run build`. Expected: PASS.
- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: navbar, footer e shadow flutuante no tema arcade"
```

---

### Task 4: Camada de dados do GitHub e mapeamento para fases

**Files:**
- Rewrite: `src/services/github.ts`
- Create: `src/lib/stages.ts`, `src/services/github.test.ts`, `src/lib/stages.test.ts`

**Interfaces:**
- Produces, em `src/services/github.ts`:
  - `interface GithubRepo { id: number; name: string; description: string | null; html_url: string; homepage: string | null; topics?: string[]; language: string | null }`
  - `fetchGithubRepos(username: string, perPage: number): Promise<GithubRepo[]>`:
    - faz GET em `https://api.github.com/users/${username}/repos?sort=pushed&per_page=${perPage}`;
    - **lança `Error`** se `!response.ok` ou se a rede falhar. Não engole o erro.
  - `useGithubRepos(): { repos: GithubRepo[]; status: 'loading' | 'ok' | 'error'; retry: () => void }`:
    - busca `fetchGithubRepos('darckrow', 9)`;
    - o resultado e a promise em andamento ficam num cache em nível de módulo, então Home e Projetos compartilham uma única requisição por carregamento;
    - `retry` limpa o cache e busca de novo;
    - exporta também `__resetGithubCache()` para os testes.
- Produces, em `src/lib/stages.ts`:
  - `interface Stage { id: number; code: string; name: string; language: string | null; description: string; tags: string[]; codeUrl: string; demoUrl: string | null }`
  - `stageCode(index: number): string`: 3 fases por mundo. Índice 0 → `"FASE 1-1"`, 2 → `"FASE 1-3"`, 3 → `"FASE 2-1"`, 8 → `"FASE 3-3"`.
  - `toStage(repo: GithubRepo, index: number): Stage`:
    - `description` cai para `"Sem descrição disponível"` se for null ou vazia;
    - `tags` = `[language, ...topics]` sem valores falsy e sem duplicatas;
    - `demoUrl` = `homepage` só se for uma string não vazia (trim), senão `null`.

- [ ] **Step 1: Escrever os testes que falham**

`stages.test.ts`:
- `stageCode` com os 4 casos acima.
- `toStage` com `{description:null, language:null, topics:undefined, homepage:''}` → `description === 'Sem descrição disponível'`, `tags` igual a `[]` e `demoUrl === null`.
- `toStage` com `language:'TypeScript', topics:['react','TypeScript']` → `tags` igual a `['TypeScript','react']`.

`github.test.ts` (usando `vi.stubGlobal('fetch', vi.fn())`):
- `usa sort=pushed`: a URL chamada contém `sort=pushed&per_page=9`.
- `lança em resposta não-ok`: `fetch` resolve `{ok:false,status:403}` → `await expect(fetchGithubRepos('darckrow',9)).rejects.toThrow()`.
- `hook compartilha a requisição`:
  - renderiza dois componentes que usam `useGithubRepos`;
  - `fetch` é chamado 1 vez;
  - os dois chegam a `status==='ok'`.
- `hook expõe erro e retry`:
  - o primeiro fetch rejeita, e o status vira `'error'`;
  - depois de `retry()`, com o fetch agora resolvendo, o status vira `'ok'`.
- Em `beforeEach`, chamar `__resetGithubCache()`.

- [ ] **Step 2: Rodar e ver falhar.** Run: `npm test`. Expected: FAIL.
- [ ] **Step 3: Implementar `github.ts` e `stages.ts`** conforme as interfaces.
- [ ] **Step 4: Rodar e ver passar.** Run: `npm test`. Expected: PASS.

Home e Projetos ainda usam a assinatura antiga até as Tasks 6 e 7. Se o build quebrar, ajustar as chamadas agora para `fetchGithubRepos('darckrow', 3)`, como ponte. As Tasks 6 e 7 substituem isso pelo hook.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: serviço do GitHub com cache compartilhado e mapeamento de fases"
```

---

### Task 5: Dados do perfil e página Sobre (ficha do personagem)

**Files:**
- Create: `src/data/profile.ts`, `src/Pages/About/About.test.tsx`
- Rewrite: `src/Pages/About/About.tsx`

**Interfaces:**
- Consumes: `PixelBox`, `ScreenTitle`, `StatBar`, `arcade`, `icon2.gif`
- Produces, em `src/data/profile.ts`:
  - `summary: string`
  - `stats: { label: string; value: number }[]`
  - `experiences: { period: string; role: string; company: string; description: string }[]`
  - `certificates: string[]`
  - `education: { label: string; ariaLabel: string }`
  - `characterClass: { current: string; next: string }`

**Conteúdo exato** (reescrito, autorizado pelo Ramon, que revisa no preview):

```ts
export const characterClass = { current: 'Dev Front-end', next: 'Backend' }

export const summary =
  'Profissional de TI com experiência em suporte, infraestrutura e desenvolvimento web com React e TypeScript. ' +
  'Hoje estou evoluindo para o backend, estudando Python, C# e SQL, e já automatizei processos no dia a dia do suporte. ' +
  'Gosto de resolver problemas, trabalhar em equipe e entregar soluções simples e eficientes.'

export const stats = [
  { label: 'Front-end', value: 75 },
  { label: 'Suporte / Infra', value: 85 },
  { label: 'Backend', value: 45 },
  { label: 'Banco de dados', value: 40 },
]

export const experiences = [
  { period: 'NOV 2024 — ATUAL', role: 'Técnico de Apoio e Suporte I', company: 'TECHCERT',
    description: 'Atendimento de chamados internos e externos, diagnóstico e resolução de problemas, automação de processos com scripts e documentação de incidentes.' },
  { period: 'JUN 2024 — OUT 2024', role: 'Técnico de Apoio ao Usuário', company: 'ZAK',
    description: 'Suporte remoto e presencial, gestão de acessos e perfis, manutenção de estações, impressoras e rede, e inventário de TI.' },
  { period: 'AGO 2023 — ATUAL', role: 'Desenvolvedor Freelancer', company: 'Autônomo',
    description: 'Sites e aplicações web sob demanda, do layout ao deploy, com React, JavaScript e integração com APIs.' },
  { period: 'MAR 2023 — JUN 2024', role: 'Estagiário de TI', company: 'ZAK',
    description: 'Primeiro passo na área: atendimento aos usuários, instalação e configuração de equipamentos, manutenção preventiva e apoio à infraestrutura.' },
]

export const education = {
  label: 'ADS · Anhanguera · até ago/2027',
  ariaLabel: 'Conquista bloqueada: Análise e Desenvolvimento de Sistemas na Anhanguera, em andamento, conclusão prevista para agosto de 2027',
}
```

`certificates`: os 13 itens atuais de `skills` em `About.tsx`, copiados literalmente, na mesma ordem.

**Layout da página:**
1. `ScreenTitle` com "FICHA DO PERSONAGEM" / "Player 1".
2. Uma grade de 2 colunas (empilha no `xs`):
   - à esquerda, um `PixelBox` com o sprite (`icon2.gif`, `pixelated`, `alt="Sprite do Shadow"`), "RAMON", "Classe: …" e "Próx. evolução: …";
   - à direita, um `PixelBox` com o rótulo "ATRIBUTOS", um `StatBar` para cada stat e o `summary` em fonte de leitura.
3. "MISSÕES CONCLUÍDAS": grade de 2 colunas (1 no `xs`) com um `PixelBox` por experiência. O período vai em amarelo pixel, depois `role · company` em negrito e a descrição em `textMuted`.
4. "CONQUISTAS {certificates.length}/{certificates.length}":
   - um badge por certificado (borda amarela, prefixo ★);
   - mais o badge bloqueado da educação (borda `#444`, texto `#888`, prefixo 🔒, `aria-label={education.ariaLabel}`).

Remover a foto do LinkedIn. Manter o `<Footer/>` ao fim.

- [ ] **Step 1: Escrever os testes que falham, em `About.test.tsx`**

Renderizar dentro de `MemoryRouter` + `ThemeProvider`.
- `mostra as 4 missões`: `getByText('TECHCERT', {exact:false})`, `getAllByText(/ZAK/)` com tamanho 2 e `getByText(/Desenvolvedor Freelancer/)`.
- `mostra 13 conquistas`: `getByText('CONQUISTAS 13/13')`.
- `ADS bloqueada é acessível`: `getByLabelText(/Conquista bloqueada: Análise e Desenvolvimento de Sistemas/)`.
- `atributos`: `getAllByRole('meter')` tem tamanho 4.

- [ ] **Step 2: Rodar e ver falhar.** Run: `npm test`. Expected: FAIL.
- [ ] **Step 3: Criar o `profile.ts` e reescrever o `About.tsx`** conforme acima.
- [ ] **Step 4: Rodar e ver passar.** Run: `npm test && npm run build`. Expected: PASS.
- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: página Sobre como ficha do personagem"
```

---

### Task 6: Página Projetos (seleção de fases)

**Files:**
- Create: `src/components/StageCard/StageCard.tsx`, `src/components/StageDetail/StageDetail.tsx`, `src/Pages/Projetos/Projetos.test.tsx`
- Rewrite: `src/Pages/Projetos/Projetos.tsx`
- Delete: `src/components/CardProjetos/` (não é mais usado depois da Task 7; apagar aqui se a Home já não importar, senão na Task 7)

**Interfaces:**
- Consumes: `useGithubRepos`, `toStage`, `Stage`, `PixelBox`, `PixelButton`, `ScreenTitle`
- Produces:
  - `StageCard({ stage: Stage, selected: boolean, onSelect: () => void })`:
    - um `<button>` com `aria-pressed={selected}`;
    - mostra o código, o nome, a linguagem e uma área de preview: padrão listrado `repeating-linear-gradient(45deg,#1a1a1a 0 6px,#111 6px 12px)` com a linguagem ou "???" no centro;
    - `onFocus` e `onMouseEnter` chamam `onSelect`;
    - selecionado: borda amarela, código em amarelo com `▶ `.
  - `StageDetail({ stage: Stage })`:
    - `PixelBox` com `"{code} · {name}"` em amarelo pixel, a descrição e as tags;
    - "▶ JOGAR" (`PixelButton primary href={demoUrl}`) **só se** existir `demoUrl`;
    - "CÓDIGO" (`PixelButton secondary href={codeUrl}`).

**Página:**
1. `ScreenTitle` com "SELECIONE A FASE" / "Repositórios carregados direto do GitHub".
2. Estados:
   - `loading`: "CARREGANDO..." com classe `blink`;
   - `error`: `PixelBox` com "GAME OVER", o texto "Não consegui carregar os projetos do GitHub agora." e o `PixelButton` "TENTAR DE NOVO" chamando `retry`;
   - `ok` com lista vazia: "Nenhuma fase encontrada".
3. `ok`: grade de `StageCard` (3 colunas `md`, 2 `sm`, 1 `xs`) e, abaixo, o `StageDetail` da fase selecionada. Começa na primeira fase.
4. No fim, o `PixelButton secondary` "VER TODOS NO GITHUB" para `https://github.com/darckrow`.
5. `<Footer/>`.

- [ ] **Step 1: Escrever os testes que falham, em `Projetos.test.tsx`**

Fazer o mock do módulo `../../services/github` com `vi.mock`, controlando o retorno de `useGithubRepos`.
- `erro mostra GAME OVER e tenta de novo`: com `status:'error'` → `getByText('GAME OVER')`. O clique em `TENTAR DE NOVO` chama `retry` 1 vez.
- `seleção por teclado`:
  - dois repos (o segundo com `homepage:'https://x.dev'`, o primeiro com `homepage:null`);
  - de início, o detalhe mostra a FASE 1-1 e **não** existe o link `▶ JOGAR`;
  - `userEvent.tab()` até a segunda fase (ou `fireEvent.focus`) → o detalhe mostra `FASE 1-2 · {nome2}` e o link `▶ JOGAR` tem `href="https://x.dev"`.
- `fase selecionada é anunciada`: o botão da fase ativa tem `aria-pressed="true"`.

- [ ] **Step 2: Rodar e ver falhar.** Run: `npm test`. Expected: FAIL.
- [ ] **Step 3: Implementar `StageCard`, `StageDetail` e `Projetos`.**
- [ ] **Step 4: Rodar e ver passar.** Run: `npm test && npm run build`. Expected: PASS.
- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: página Projetos como seleção de fases"
```

---

### Task 7: Home (tela de título)

**Files:**
- Rewrite: `src/Pages/Home/Home.tsx`
- Rewrite: `src/components/Resumo/Resumo.tsx` → `src/components/TechInventory/TechInventory.tsx` (default export `TechInventory`)
- Delete: `src/components/Resumo/`, `src/components/CardProjetos/` (se ainda existir)
- Test: `src/Pages/Home/Home.test.tsx`

**Interfaces:**
- Consumes: `useGithubRepos`, `toStage`, `StageCard`, `PixelBox`, `PixelButton`, `arcade`, `flutuante.gif`, `logo.png`
- Produces: `TechInventory` (sem props). Mesmas categorias, techs e logos do `Resumo` atual, sem o `Axios` (o projeto não usa axios). Título "INVENTÁRIO". Cada tech vira um slot quadrado pixel (logo + nome) com hover vermelho.

**Hero** (como a opção B do mockup `direcao-visual.html`):
- sprite `flutuante.gif` grande (~170px, `pixelated`, `filter: drop-shadow(0 0 18px #dc262688)`, `alt="Sprite do Shadow"`);
- `<h1>` "RAMON MATHEUS" em pixel, com `text-shadow: 3px 3px 0 #b91c1c`;
- duas linhas em fonte de leitura: `> Dev Front-end · React · TypeScript` e `> Próxima fase: Python · C# · SQL`;
- a barra de XP: rótulo "XP — NÍVEL 03" e uma barra de 72%. Puramente decorativa, com `aria-hidden`;
- o link "PRESS START ▶ PROJETOS" em amarelo, com classe `blink`, `to="/projetos"`.
- Empilha no `xs`.

**Abaixo do hero:**
1. `TechInventory`.
2. "FASES RECENTES": os 3 primeiros repos como `StageCard`. Aqui o clique navega para `/projetos` (`onSelect` não faz nada; o card fica envolvido num `Link`). Em `loading` ou `error`, a seção mostra um texto curto ("CARREGANDO..." ou "Fases indisponíveis no momento.") sem quebrar a página.
3. `<Footer/>`.

- [ ] **Step 1: Escrever os testes que falham, em `Home.test.tsx`**

Fazer o mock de `useGithubRepos`.
- `hero`: `getByRole('heading',{level:1,name:'RAMON MATHEUS'})`. `getByRole('link',{name:/PRESS START/})` tem `href="/projetos"`.
- `mostra no máximo 3 fases`: com 9 repos, aparecem exatamente 3 textos `/^▶? ?FASE \d-\d$/`, ou contar os `StageCard` por `data-testid="stage-card"`.
- `erro não quebra a home`: com `status:'error'`, aparecem `getByText('Fases indisponíveis no momento.')` e o hero.

- [ ] **Step 2: Rodar e ver falhar.** Run: `npm test`. Expected: FAIL.
- [ ] **Step 3: Implementar `TechInventory` e `Home`.**
- [ ] **Step 4: Rodar e ver passar.** Run: `npm test && npm run lint && npm run build`. Expected: PASS. `grep -r "ff0000" src` não retorna nada.
- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: home como tela de título"
```

---

### Task 8: Contato (CONTINUE?)

**Files:**
- Create: `src/lib/contact.ts`, `src/lib/contact.test.ts`, `src/Pages/Contatos/Contatos.test.tsx`
- Rewrite: `src/Pages/Contatos/Contatos.tsx`

**Interfaces:**
- Produces, em `src/lib/contact.ts`:
  - `interface ContactForm { name: string; email: string; phone: string; subject: string; message: string }`
  - `CONTACT_EMAIL = 'ramonmateus30@gmail.com'`
  - `WHATSAPP_NUMBER = '5531973102866'`
  - `buildMailto(f: ContactForm): string` → `mailto:${CONTACT_EMAIL}?subject=${enc(subject)}&body=${enc(`Nome: ${name}\n\n${message}`)}`
  - `buildWhatsAppUrl(f: ContactForm): string` → `https://wa.me/${WHATSAPP_NUMBER}?text=${enc(`Nome: ${name}\nAssunto: ${subject}\nMensagem: ${message}`)}`
  - `enc` = `encodeURIComponent`.

**Desvio consciente da spec:** a spec dizia manter `wa.me/31973102866`. Mas o `wa.me` exige o número internacional com o código do país, e sem o `55` o link abre um número errado ou inválido. Usar `5531973102866` e avisar o Ramon na Task 9.

**Página:**
1. "CONTINUE?" grande em pixel, com sombra vermelha.
2. Um contador decorativo, `aria-hidden`: começa em 9, decrementa a cada 1s, para em 0 e fica lá. Usa `setInterval` limpo no unmount. Com `prefers-reduced-motion` (`window.matchMedia?.('(prefers-reduced-motion: reduce)').matches`), fica fixo em 9.
3. O menu E-MAIL / WHATSAPP: dois `<button>` com `aria-pressed`. O ativo fica em amarelo, com `▶ `. Substitui o `ToggleButtonGroup` e o `window.innerWidth`.
4. Um `PixelBox` de diálogo com 2 colunas:
   - o sprite `flutuante.gif` numa moldura branca;
   - o rótulo "SHADOW:" em amarelo pixel, a fala "Quer trocar uma ideia? Deixa sua mensagem." e os campos.
5. Campos: MUI `TextField variant="standard"`, com os rótulos "Nome", "Assunto", "Mensagem" e "E-mail" (modo e-mail) ou "Telefone" (modo WhatsApp). Todos `required`. Os estilos de input ficam no tema (override `MuiTextField`/`MuiInput` em `theme.ts`, com sublinhado tracejado `#555` e foco amarelo), não repetidos em cada campo.
6. O botão `PixelButton primary type="submit"`: "ENVIAR ▶" no e-mail, "ENVIAR NO WHATSAPP ▶" no WhatsApp.
7. No submit:
   - WhatsApp: `window.open(buildWhatsAppUrl(f), '_blank', 'noopener')`;
   - e-mail: `window.location.href = buildMailto(f)`.
8. `<Footer/>`.

- [ ] **Step 1: Escrever os testes que falham**

`contact.test.ts`:
- `codifica caracteres especiais no WhatsApp`:
  - `buildWhatsAppUrl({name:'João & Cia', subject:'Orçamento #1?', message:'linha1\nlinha2', email:'', phone:''})` começa com `https://wa.me/5531973102866?text=`;
  - `decodeURIComponent` do valor de `text` é igual a `'Nome: João & Cia\nAssunto: Orçamento #1?\nMensagem: linha1\nlinha2'`;
  - a URL não contém `&` além do separador de query, ou seja, `new URL(url).searchParams.get('text')` bate com o texto acima.
- `mailto com assunto e corpo`: `new URL(buildMailto(f))`, com `searchParams.get('subject') === 'Orçamento #1?'` e o `body` começando com `'Nome: João & Cia\n\n'`.

`Contatos.test.tsx`:
- `alterna campos`:
  - de início existe o campo "E-mail" e não existe "Telefone";
  - depois do clique em `WHATSAPP`, existe "Telefone" e não existe "E-mail";
  - o botão `WHATSAPP` tem `aria-pressed="true"`.
- `envia pelo WhatsApp`:
  - `vi.spyOn(window,'open')`;
  - preencher os campos e enviar;
  - `window.open` é chamado com a URL que começa com `https://wa.me/5531973102866?text=`.

- [ ] **Step 2: Rodar e ver falhar.** Run: `npm test`. Expected: FAIL.
- [ ] **Step 3: Implementar `contact.ts`, o override de input no tema e o `Contatos.tsx`.**
- [ ] **Step 4: Rodar e ver passar.** Run: `npm test && npm run lint && npm run build`. Expected: PASS.
- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: página Contato como CONTINUE?"
```

---

### Task 9: Verificação final e preview no Netlify

**Files:** nenhum novo. Só ajustes que a checagem visual revelar.

- [ ] **Step 1: Suite completa**

Run: `npm test && npm run lint && npm run build`
Expected: tudo passa, sem warnings de TS.

- [ ] **Step 2: Checagem visual**

Rodar `npm run dev` e passar por cada página em 1280px e 360px de largura. Conferir:
- nenhuma rolagem horizontal em 360px;
- o menu mobile funciona;
- os sprites aparecem nítidos (pixelated);
- o foco amarelo aparece ao navegar com Tab;
- com reduced-motion emulado no DevTools, nada pisca e o contador fica em 9.

Corrigir o que aparecer e fazer o commit (`fix: ajustes visuais do redesign`).

- [ ] **Step 3: Deploy de preview**

Run: `netlify deploy --build --message "preview redesign arcade"`. Isso **não** usa `--prod`.
Expected: a saída traz o "Website draft URL".

- [ ] **Step 4: Push da branch** (para revisão no GitHub; não abrir merge)

Run: `git push -u origin redesign-retro-arcade`

- [ ] **Step 5: Entregar ao Ramon para revisão**

Mandar a URL de preview e pedir que ele confira:
- (a) os textos reescritos do Sobre (resumo e missões);
- (b) os valores das barras de atributo em `src/data/profile.ts`;
- (c) o número do WhatsApp corrigido para `5531973102866`.

**Só depois da aprovação**, fazer o merge na `main` (o push dispara o deploy de produção) e confirmar `/`, `/about`, `/projetos` e `/contatos` retornando 200 no domínio.
