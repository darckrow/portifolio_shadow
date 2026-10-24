# Foco em Dados e SQL — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposicionar o portfólio arcade para "Analista de Dados & Sistemas · SQL": experiência atualizada, o projeto interno como "fase chefe" e uma Home que leva até ele.

**Architecture:** O conteúdo fica em `src/data/` (`profile.ts` atualizado e o novo `bossProject.ts`). Um componente novo, `BossStage`, renderiza o chefe a partir desses dados e é usado no topo de Projetos e como primeiro card na Home. O link `/projetos#chefe` rola até o chefe, e o `ScrollToTop` passa a respeitar âncoras.

**Tech Stack:** React 19, TS strict, Vite 6, MUI 6, React Router 7, Vitest + Testing Library. Nada novo além de SVGs do Simple Icons (CC0) em `src/assets/tech/`.

**Spec:** `docs/superpowers/specs/2026-10-24-foco-dados-sql-design.md`

## Global Constraints

- Branch `foco-dados-sql`. Nada vai para a `main` antes do OK do Ramon no preview.
- `npm test && npm run lint && npm run build` verdes ao fim de cada task.
- **Confidencialidade:**
  - os textos nunca contêm o nome interno do projeto, nomes de lojas, franquias ou fornecedores, valores financeiros, IPs ou hosts, nem nomes reais de tabelas ou views do ERP;
  - "ZAK" aparece só na lista de experiências;
  - o SQL do chefe usa só as tabelas fictícias `titulos` e `baixas`.
- **Sem números inventados.** Os únicos números do chefe são `~60`, `9`, `2` e `200+`.
- Textos em PT-BR, cores via tokens `arcade` (texto vermelho em `arcade.redText`), glifos decorativos (`▶ ★ ⚠ 🔒`) dentro de `<span aria-hidden="true">`.
- Animações piscando usam a classe `.blink`, que o CSS global já desliga com reduced-motion.
- Imagens sempre via `import`.

## Review Focus

1. **Chefe com o GitHub fora do ar.** Com `status:'error'` em Projetos, o bloco CHEFE FINAL continua visível junto com o GAME OVER. Teste na Task 2.
2. **Link `/projetos#chefe` vindo da Home.** O ScrollToTop não pode anular a rolagem até o chefe. Testes na Task 2 (ScrollToTop ignora navegação com hash; o chefe chama `scrollIntoView` quando `hash === '#chefe'`).
3. **Celular em 360px.** O placar e o texto do chefe empilham, e só o bloco de SQL rola na horizontal (`overflowX: 'auto'`). A página não ganha rolagem horizontal. Checagem visual na Task 4.
4. **Vazamento de dado interno.** Na Task 4, uma busca em `src` pelos termos da lista local de termos proibidos (`.superpowers/denylist.txt`, não versionada) deve sair vazia.
5. **Contagens dos testes antigos.** "CONQUISTAS 13/13", a regex do href dos cards da Home e "PRESS START ▶ PROJETOS" mudam. Os testes antigos precisam ser atualizados, não apagados. Tasks 1 e 3.

---

### Task 1: Perfil atualizado e Sobre

**Files:**
- Modify: `src/data/profile.ts`, `src/Pages/About/About.test.tsx`
- Talvez `src/Pages/About/About.tsx`, se precisar de algum ajuste para o novo conteúdo. A estrutura da página não muda.

**Interfaces:** os tipos e exports de `profile.ts` continuam iguais (`characterClass`, `summary`, `stats`, `experiences`, `certificates`, `education`).

**Conteúdo exato:**

```ts
export const characterClass = { current: 'Analista de Dados', next: 'Engenharia de Dados' }

export const summary =
  'Analista de Dados & Sistemas: transformo dados do ERP em indicadores e decisões. ' +
  'No dia a dia escrevo SQL avançado (CTEs, funções de janela, views) em SQL Server e PostgreSQL ' +
  'e construo de ponta a ponta as aplicações que entregam esses números para as áreas de negócio, ' +
  'do backend em Node.js à interface em Vue e React. ' +
  'Venho do suporte e da infraestrutura, o que me deu visão de operação e foco em resolver o problema real de quem usa.'

export const stats = [
  { label: 'SQL', value: 85 },
  { label: 'Análise de dados', value: 80 },
  { label: 'Backend', value: 65 },
  { label: 'Front-end', value: 70 },
]
```

`experiences`: a nova entrada vem **primeiro**. A TECHCERT muda de período. As outras três ficam exatamente como estão hoje, na mesma ordem relativa.
```ts
{ period: 'SET 2025 — ATUAL', role: 'Analista de Desenvolvimento de Sistemas', company: 'ZAK',
  description: 'Desenvolvo e mantenho um painel interno de BI e operação usado no dia a dia da empresa: consultas SQL avançadas sobre o ERP, indicadores financeiros, de estoque, vendas e CRM, controle de acesso e automações para as áreas de negócio.' },
{ period: 'NOV 2024 — AGO 2025', role: 'Técnico de Apoio e Suporte I', company: 'TECHCERT', description: /* texto atual, inalterado */ },
```

`certificates`: os 13 atuais, inalterados, seguidos de:
- `'Escola DNC · Programação de Computadores (2023–2024)'`
- `'Dev Samurai · Programação de Computadores (2022–2023)'`

- [ ] **Step 1: Atualizar os testes que vão falhar, em `About.test.tsx`**
  - `'CONQUISTAS 13/13'` vira `'CONQUISTAS 15/15'`, nos dois testes que usam o texto.
  - Novo teste `missão atual é a de analista`: o primeiro item de missão contém `SET 2025 — ATUAL` e `Analista de Desenvolvimento de Sistemas`.
  - Novo teste `TECHCERT encerrada`: existe `NOV 2024 — AGO 2025`.
  - Novo teste `classe de analista`: existe `Classe: Analista de Dados`.
  - O teste de missões passa a esperar 5 missões. `getAllByText(/ZAK/)` passa a ter tamanho 3.
- [ ] **Step 2:** Run `npm test`. Expected: FAIL nos testes novos e alterados.
- [ ] **Step 3:** Atualizar o `profile.ts` com o conteúdo acima.
- [ ] **Step 4:** Run `npm test && npm run lint && npm run build`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: perfil com foco em dados e experiência atualizada`.

---

### Task 2: Fase chefe (dados, componente, Projetos, âncora)

**Files:**
- Create: `src/data/bossProject.ts`, `src/components/BossStage/BossStage.tsx`, `src/components/BossStage/BossStage.test.tsx`, `src/components/ScrollToTop.test.tsx`
- Modify: `src/Pages/Projetos/Projetos.tsx`, `src/Pages/Projetos/Projetos.test.tsx`, `src/components/ScrollToTop.tsx`

**Interfaces:**
- `src/data/bossProject.ts` exporta `bossProject`:
  ```ts
  {
    title: 'PAINEL DE GESTÃO MODULAR',
    subtitle: 'Plataforma interna de BI e operação para uma rede de varejo de moda (lojas próprias, franquias e atacado B2B)',
    status: 'EM PRODUÇÃO',
    stats: [ { value: '~60', label: 'módulos de análise' }, { value: '9', label: 'áreas de negócio' },
             { value: '2', label: 'bancos: SQL Server + PostgreSQL' }, { value: '200+', label: 'commits, solo' } ],
    pitch: 'Construí do zero, praticamente sozinho, a plataforma que centraliza a gestão da empresa: o que antes exigia consultas manuais no banco e no ERP virou um painel único, com login, permissões por tela e trilha de auditoria. Por trás de cada tela há SQL de verdade (CTEs, funções de janela, anti-joins e views) rodando em tempo real sobre o ERP, com exportação para Excel, PDF e PowerPoint.',
    indicators: ['Aging de contas a pagar e a receber', 'Fluxo de caixa', 'Faturamento com projeção sazonal', 'Metas diárias x realizado', 'Curva ABC de fornecedores', 'Lead time e fill rate', 'Cobertura e remanejamento de estoque', 'Recorrência de clientes', 'Margem de franquias'],
    highlight: 'Totais conferidos centavo por centavo contra o saldo oficial do ERP',
    stack: ['Vue 3', 'Vite', 'Tailwind', 'Node.js', 'Express', 'SQL Server', 'PostgreSQL', 'Supabase', 'JWT'],
    privateNote: 'Código privado. Posso apresentar a arquitetura e as consultas em uma conversa.',
    sqlSample: SQL_SAMPLE,
  }
  ```
  `SQL_SAMPLE` é exatamente esta string:
  ```sql
  -- aging de títulos em aberto (dados fictícios)
  WITH abertos AS (
    SELECT t.cliente_id, t.valor,
           DATEDIFF(day, t.vencimento, GETDATE()) AS atraso,
           ROW_NUMBER() OVER (PARTITION BY t.cliente_id
                              ORDER BY t.vencimento) AS ordem
    FROM titulos t
    WHERE NOT EXISTS (SELECT 1 FROM baixas b WHERE b.titulo_id = t.id)
  )
  SELECT CASE WHEN atraso <= 0  THEN 'a vencer'
              WHEN atraso <= 30 THEN '1-30 dias'
              WHEN atraso <= 90 THEN '31-90 dias'
              ELSE '90+ dias' END AS faixa,
         COUNT(*)   AS titulos,
         SUM(valor) AS total
  FROM abertos
  GROUP BY CASE WHEN atraso <= 0  THEN 'a vencer'
                WHEN atraso <= 30 THEN '1-30 dias'
                WHEN atraso <= 90 THEN '31-90 dias'
                ELSE '90+ dias' END;
  ```
- `BossStage({ compact?: boolean })`, com default export em `src/components/BossStage/BossStage.tsx`.
  - **Modo completo (default):**
    - `<section id="chefe" aria-labelledby="chefe-titulo">` com o visual do mockup `foco-dados.html`: `PixelBox` com borda `arcade.yellow`, `boxShadow: 0 0 0 3px ${arcade.redDark}, 8px 8px 0 ${arcade.redDark}`;
    - "⚠ CHEFE FINAL ⚠" em `arcade.redText` com `.blink`;
    - `h2#chefe-titulo` com o título;
    - o subtítulo com `· EM PRODUÇÃO` em amarelo e `· projeto privado`;
    - um placar de 4 colunas (2x2 no `xs`);
    - grade de 2 colunas (`md+`; empilha no `xs`): à esquerda o pitch, as tags de indicadores e o destaque com ★; à direita o `<pre><code>` do SQL;
    - as tags da stack;
    - a nota privada com `PixelButton secondary to="/contatos"` "VAMOS CONVERSAR".
  - **SQL highlight:** uma função pura `highlightSql(sql: string): React.ReactNode[]` no mesmo arquivo (ou em `src/lib/highlightSql.ts`, se ficar grande):
    - palavras-chave (`WITH AS SELECT FROM WHERE NOT EXISTS OVER PARTITION BY ORDER CASE WHEN THEN ELSE END GROUP`) em `arcade.redText`;
    - funções (`DATEDIFF GETDATE ROW_NUMBER COUNT SUM`) em `arcade.yellow`;
    - linhas começando com `--` em `arcade.textDim`.
  - O `<pre>` tem `overflowX: 'auto'`, fonte `arcade.bodyFont`, ~0.7rem, fundo `#000` e borda `2px solid #333`.
  - **Rolagem pela âncora:** ao montar, se `location.hash === '#chefe'`, chamar `document.getElementById('chefe')?.scrollIntoView({ block: 'start', behavior })`, com `behavior` em `'auto'` sob reduced-motion e `'smooth'` caso contrário (guardar `window.matchMedia?.`).
  - **Modo `compact`:** um card do tamanho de um `StageCard`, para a Home.
    - É um router `Link` para `/projetos#chefe` com `data-testid="stage-card"`.
    - Mostra "⚠ CHEFE FINAL" em amarelo, o título e "SQL Server · PostgreSQL" na área de preview listrada.
    - Mesma borda amarela e anel vermelho.
- `ScrollToTop`: não rola para o topo quando `location.hash` não estiver vazio. A dependência do efeito passa a ser `[pathname, hash]`.

- [ ] **Step 1: Testes que falham**

`BossStage.test.tsx` (dentro de `MemoryRouter`):
- `mostra título, status e placar`: `getByRole('heading', { name: 'PAINEL DE GESTÃO MODULAR' })`; o texto `EM PRODUÇÃO`; os textos `~60`, `9`, `2` e `200+`.
- `mostra o SQL fictício`: o texto contém `WITH abertos AS` e `NOT EXISTS`; não contém nomes reais do ERP.
- `sem dados internos`: `container.textContent` não bate com `/ZAK/`.
- `rola até o chefe com #chefe`: `Element.prototype.scrollIntoView = vi.fn()`; renderizar em `MemoryRouter initialEntries={['/projetos#chefe']}`; esperar 1 chamada.
- `compact é link para o chefe`: `getByTestId('stage-card')` tem `href="/projetos#chefe"`.

`ScrollToTop.test.tsx`:
- `vi.spyOn(window, 'scrollTo')`.
- Renderizar em `/` → chamado 1 vez.
- Navegar para `/projetos#chefe` (um `Link` clicado) → não é chamado de novo.

`Projetos.test.tsx`:
- Novo `chefe aparece mesmo com GAME OVER`: com `status:'error'`, existem `GAME OVER` e o heading `PAINEL DE GESTÃO MODULAR`.
- Novo `chefe vem antes das fases`: com `status:'ok'`, a posição do heading do chefe no DOM vem antes do primeiro `stage-card` (`compareDocumentPosition`).

- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implementar `bossProject.ts`, `BossStage` e o ScrollToTop. Em Projetos, renderizar `<BossStage/>` logo após o `ScreenTitle`, fora dos ramos de status, e depois um rótulo `h2` "FASES DO GITHUB" antes da grade.
- [ ] **Step 4:** Run `npm test && npm run lint && npm run build`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: fase chefe com o painel de gestão modular`.

---

### Task 3: Home e inventário

**Files:**
- Modify: `src/Pages/Home/Home.tsx`, `src/Pages/Home/Home.test.tsx`, `src/components/TechInventory/TechInventory.tsx`, `index.html`
- Create: SVGs em `src/assets/tech/` (`postgresql.svg`, `supabase.svg`, `nodedotjs.svg`, `express.svg`, `vuedotjs.svg`, `git.svg`)

**Interfaces:** consome `BossStage` com a prop `compact` (Task 2).

**Hero:**
- A linha 1 vira `> Analista de Dados & Sistemas · SQL`.
- A linha 2 vira `> SQL Server · PostgreSQL · Node.js · Vue · React`.
- O rótulo de XP vira `XP — NÍVEL 04 · CLASSE: ANALISTA`, com a barra em `82%`.
- O link vira `PRESS START ▶ CHEFE FINAL`, com `to="/projetos#chefe"` (o ▶ continua `aria-hidden`).

**"FASES RECENTES":** o primeiro card é `<BossStage compact/>`, seguido dos 2 primeiros repos como `StageCard` (`repos.slice(0, 2)`). Com loading ou erro, o card do chefe continua aparecendo e o texto de status fica abaixo dele.

**Inventário:**
- As categorias e os itens, nesta ordem:
  - `Dados`: SQL Server, PostgreSQL, Supabase
  - `Backend`: Node.js, Express, C#
  - `Front-end`: Vue, React, TypeScript
  - `Ferramentas`: Git, GitHub API
- Material-UI e React Router saem.
- Ícones:
  - reutilizar `react.svg`, `typescript.svg` e `github.svg` (este último com o `invert(1)` atual);
  - baixar os demais de `https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/<slug>.svg` (slugs `postgresql`, `supabase`, `nodedotjs`, `express`, `vuedotjs`, `git`);
  - SQL Server e C# não existem no Simple Icons, então ficam como **chip de texto**: o mesmo slot de 96px, com a sigla em fonte pixel ("SQL" / "C#") no lugar do ícone;
  - os SVGs do Simple Icons vêm sem cor, então aplicar `filter: invert(1)` neles (como no GitHub) para ficarem brancos no fundo escuro. Fica decidido assim: ícones monocromáticos brancos para os novos.

**`index.html`:** adicionar `<meta name="description" content="Ramon Matheus — Analista de Dados & Sistemas. SQL Server, PostgreSQL, Node.js, Vue e React. Portfólio com tema retrô arcade.">`.

- [ ] **Step 1: Atualizar e escrever os testes que falham, em `Home.test.tsx`**
  - O link `PRESS START` tem `href="/projetos#chefe"`.
  - O hero contém `Analista de Dados & Sistemas · SQL`.
  - `mostra o chefe e 2 fases`: com 9 repos, existem 3 `stage-card`, e o primeiro tem `href="/projetos#chefe"`. Os outros dois batem com `/^\/projetos\?fase=\d+$/`.
  - `erro mantém o chefe`: com `status:'error'`, existe o card do chefe e o texto `Fases indisponíveis no momento.`.
  - `inventário de dados`: existem os textos `SQL Server`, `PostgreSQL` e `Node.js`.
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3:** Implementar conforme acima.
- [ ] **Step 4:** Run `npm test && npm run lint && npm run build`. Expected: PASS.
- [ ] **Step 5:** Commit `feat: home e inventário com foco em dados`.

---

### Task 4: Verificação, preview e revisão do Ramon (controller)

- [ ] Rodar `npm test && npm run lint && npm run build`. Tudo verde.
- [ ] Buscar em `src` os termos da lista local `.superpowers/denylist.txt` (não versionada). A saída deve ser vazia.
- [ ] Rodar `netlify deploy --dir=dist` para gerar o preview de rascunho, e tirar screenshots de Home, Projetos e Sobre em 1280px e 360px. Checar que não há rolagem horizontal em 360px e que o bloco de SQL rola sozinho.
- [ ] Fazer o push da branch `foco-dados-sql`. Enviar ao Ramon a URL do preview e os pontos para conferir: os textos (resumo, missão atual e pitch do chefe), os valores dos atributos e o nome "Painel de Gestão Modular". O merge na `main` só acontece depois do OK dele.
