# Reposicionamento do portfólio: foco em Análise de Dados e SQL

**Data:** 2026-10-24
**Base:** o portfólio retrô arcade já em produção (spec anterior: `2026-10-24-redesign-retro-arcade-design.md`). O tema visual, a stack e a estrutura de páginas não mudam.

## Intenção e o porquê

O Ramon mudou de função. Desde set/2025 ele é **Analista de Desenvolvimento de Sistemas na ZAK**, e nos últimos tempos o foco dele é **análise de dados e SQL**. O portfólio ainda o apresenta como "Dev Front-end em transição para backend", e mostra a TECHCERT como emprego atual, embora ela tenha terminado em ago/2025.

A fonte da verdade é o currículo exportado do LinkedIn (`Downloads/Profile.pdf`), com o título "Desenvolvedor de sistemas | Analista | sql | C# | javascript". O Ramon pediu para "fazer uma junta de tudo e colocar análise de dados e SQL como foco do projeto".

A principal prova desse foco é o projeto interno que ele constrói para a empresa. É um painel modular de gestão e BI sobre o ERP, em produção, feito praticamente sozinho.

Decisões do Ramon sobre o projeto:
- Ele aparece **de forma genérica**, sem citar o nome interno do projeto nem ligá-lo à empresa pelo nome.
- Ele aparece **com bastante destaque** ("pode dar uma inflada boa, porque esse projeto, além de grande e complexo, está ficando muito bom").
- Ele aprovou o mockup `.superpowers/brainstorm/1377-1792821580/content/foco-dados.html` ("pode seguir").

## Objetivos

- O site apresenta o Ramon como **Analista de Dados & Sistemas, com SQL como habilidade central**.
- A experiência fica correta e atual, conforme o currículo.
- O projeto interno vira a **"fase chefe" (CHEFE FINAL)** em Projetos: o maior destaque do site, acima das fases do GitHub.
- A Home leva direto ao chefe.

## Não-objetivos

- Não mudar o tema, as cores, a navegação nem as outras telas além do descrito aqui.
- Não publicar código, prints nem dados do projeto interno. Ele é privado.
- Não criar páginas novas.

## Anti-objetivos (falha mesmo que funcione)

- **Vazar dados da empresa.** Isso inclui: o nome interno do projeto, o nome da empresa associado ao painel, nomes de lojas, franquias e fornecedores, valores financeiros, IPs e hosts, nomes reais de tabelas e colunas do ERP e prints reais.
  - A empresa ZAK continua aparecendo **só** na lista de experiências, como já aparece no LinkedIn público. Ela não é ligada ao painel pelo nome.
- **Inventar números ou fatos.** A ordem foi "dar uma inflada", então o texto pode ser enfático e vendedor, mas todo número e afirmação tem que ser verdadeiro. Em entrevista, o Ramon precisa conseguir sustentar tudo.
- Deixar o portfólio contraditório (por exemplo, a Home falando em front-end e o Sobre em dados).

## Fatos verificados do projeto interno (podem ser usados)

Tirados do repositório em 2026-10-24:
- **Em produção** e em uso diário pela empresa.
- Construído praticamente **solo**, com **200+ commits**.
- **~60 módulos/rotas de análise**, em **9 áreas de negócio**:
  - Financeiro
  - Estoque
  - CRM
  - Compras
  - Vendas
  - Atacado B2B
  - TI
  - Home/indicadores
  - RH (em construção)
- **2 bancos**: SQL Server (ERP) e PostgreSQL (dados próprios do painel).
- Stack: Vue 3 + Vite + Tailwind, Node.js + Express, SQL Server, PostgreSQL (Supabase), JWT. Exporta Excel, PDF e PowerPoint e envia e-mail.
- Login, **permissões por tela** e **trilha de auditoria**. Substituiu consultas feitas direto no banco e no ERP.
- SQL avançado em T-SQL e Postgres: CTEs, funções de janela (`ROW_NUMBER`/`PARTITION BY`), `CROSS APPLY`, anti-joins com `NOT EXISTS`, views, funções, agregações com `FILTER`.
- Indicadores calculados em tempo real:
  - aging de contas a pagar e a receber;
  - fluxo de caixa;
  - faturamento com projeção sazonal e de tendência;
  - metas diárias por peso do dia da semana x realizado, com comparação ano a ano;
  - curva ABC de fornecedores, lead time e fill rate;
  - cobertura de estoque e sugestão de remanejamento entre lojas;
  - recorrência e reativação de clientes;
  - margem de sell-in de franquias.
- Reconciliação: os totais do financeiro foram **conferidos centavo por centavo** contra a view de saldo oficial do ERP. Um bug de join que inflava as parcelas foi detectado e corrigido.

## O que muda

### Home
- Linhas do hero:
  - `> Analista de Dados & Sistemas · SQL`
  - `> SQL Server · PostgreSQL · Node.js · Vue · React`
- Barra de XP: "XP — NÍVEL 04 · CLASSE: ANALISTA".
- O link piscando passa a ser "PRESS START ▶ CHEFE FINAL" e leva à seção do chefe em `/projetos`.
- **Inventário** reorganizado por categoria, com os itens nesta ordem:
  - **Dados:** SQL Server, PostgreSQL, Supabase
  - **Backend:** Node.js, Express, C#
  - **Front-end:** Vue, React, TypeScript
  - **Ferramentas:** Git, GitHub API
  - **Ícones:** usar os SVGs que já existem quando houver. Para os que faltam, usar ícones do Simple Icons (licença CC0), salvos em `src/assets/tech/`.
- Em "FASES RECENTES", o primeiro card é o **chefe** (link para a seção dele), seguido das 2 fases mais recentes do GitHub.

### Projetos: a fase chefe
- O bloco **CHEFE FINAL** aparece no topo, antes da grade de fases do GitHub, no visual do mockup:
  - borda amarela, anel vermelho e sombra grande;
  - "⚠ CHEFE FINAL ⚠" piscando, mas parado com reduced-motion.
- Conteúdo:
  - Título: **"PAINEL DE GESTÃO MODULAR"**.
  - Subtítulo: "Plataforma interna de BI e operação para uma rede de varejo de moda (lojas próprias, franquias e atacado B2B) · EM PRODUÇÃO · projeto privado".
  - Placar com 4 números: `~60` módulos de análise · `9` áreas de negócio · `2` bancos (SQL Server + PostgreSQL) · `200+` commits, solo.
  - Um texto curto e vendedor (pode ser enfático, sem inventar nada) e as tags dos indicadores da lista acima.
  - O destaque "★ Totais conferidos centavo por centavo contra o saldo oficial do ERP".
  - Um **trecho de SQL fictício** (aging com CTE, `ROW_NUMBER() OVER (PARTITION BY ...)` e `NOT EXISTS`). Tabelas e colunas são genéricas e inventadas (`titulos`, `baixas`, `cliente_id`), com syntax highlight simples nas cores do tema.
  - A stack como tags.
  - Sem botão "JOGAR" nem "CÓDIGO", porque o projeto é privado. Uma linha diz "Código privado. Posso apresentar a arquitetura e as consultas em uma conversa." e leva ao Contato.
- Os dados ficam em um arquivo próprio (`src/data/bossProject.ts`), não no componente.
- O chefe não depende da API do GitHub. Ele aparece mesmo com GAME OVER.

### Sobre (ficha do personagem)
- Classe: **"Analista de Dados"**. Próxima evolução: **"Engenharia de Dados"** (minha escolha, ver abaixo).
- Atributos: **SQL 85 · Análise de dados 80 · Backend 65 · Front-end 70**. Os valores são minha proposta, editáveis.
- Resumo reescrito com foco em dados e SQL, baseado no resumo do LinkedIn e no projeto: analista que transforma dados do ERP em indicadores e decisões, com SQL avançado e desenvolvimento full stack. Sem citar o nome do painel nem da empresa ligada a ele.
- **Missões**, em ordem cronológica decrescente pela data de início:
  1. **SET 2025 — ATUAL · Analista de Desenvolvimento de Sistemas · ZAK**. Descrição genérica e forte: desenvolvimento de um painel interno de BI e operação, consultas SQL avançadas sobre o ERP, indicadores financeiros, de estoque, vendas e CRM, e automações para as áreas de negócio.
  2. **NOV 2024 — AGO 2025 · Técnico de Apoio e Suporte I · TECHCERT**. A data de fim é a correção. O texto atual é mantido.
  3. JUN 2024 — OUT 2024 · Técnico de Apoio ao Usuário · ZAK (mantido).
  4. AGO 2023 — ATUAL · Desenvolvedor Freelancer · Autônomo (mantido).
  5. MAR 2023 — JUN 2024 · Estagiário de TI · ZAK (mantido).
- **Conquistas**: os 13 certificados atuais, mais "Escola DNC · Programação de Computadores (2023–2024)" e "Dev Samurai · Programação de Computadores (2022–2023)". O contador passa a 15/15. A ADS segue como conquista bloqueada.

### Metadados
- Adicionar `<meta name="description">` em `index.html`, alinhada ao novo posicionamento (analista de dados & sistemas, SQL).

## Restrições

- As mesmas da spec anterior: a branch separada, mergeada na `main` só depois de o Ramon aprovar o preview no Netlify; build, lint e testes verdes; textos em PT-BR; tokens `arcade`; acessibilidade (glifos decorativos com `aria-hidden`, headings, contraste).
- O componente do chefe segue as primitivas existentes (`PixelBox`, `PixelButton`) e o padrão de `src/data/`.

## Decisões minhas (não confirmadas pelo Ramon)

- O nome público do projeto é "PAINEL DE GESTÃO MODULAR". O Ramon viu no mockup e não pediu outro nome.
- Próxima evolução da ficha: "Engenharia de Dados".
- Valores dos atributos: SQL 85 · Análise de dados 80 · Backend 65 · Front-end 70.
- Experiências antigas fora da área de TI (recepcionista, vendedor, jovem aprendiz) **não entram**, para manter o foco.
- Os cursos DNC e Dev Samurai entram como conquistas.
- Na Home, a CTA leva ao chefe. A Home não ganha um bloco próprio do chefe além do primeiro card em "Fases recentes".
- A missão na ZAK cita "painel interno de BI e operação" de forma genérica, sem nome. Quem cruzar com o LinkedIn pode deduzir que o painel é da ZAK, e isso é aceitável. O que fica proibido é o nome interno do projeto e qualquer dado interno.
- Se o Simple Icons não tiver o ícone de alguma tecnologia, o slot do inventário mostra um chip só com texto, no mesmo tamanho.

## Deixado para o builder

- O layout exato do bloco do chefe no celular (empilhar placar, texto e SQL), sem rolagem horizontal da página. O bloco de SQL pode rolar sozinho na horizontal.
- O mecanismo de link para a seção do chefe (âncora `#chefe` ou `?fase=chefe`), desde que o ScrollToTop não atrapalhe.
- O texto exato do resumo e da descrição da missão atual, seguindo as regras acima. O Ramon revisa no preview.
