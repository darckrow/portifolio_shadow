# Redesign do portfólio: tema Retrô Arcade

**Data:** 2026-10-24
**Projeto:** portifolio_shadow (React 19 + TypeScript + Vite 6 + MUI 6 + React Router 7), deploy contínuo no Netlify a partir da `main`.

## Intenção e o porquê

O portfólio foi o primeiro do Ramon e está com cara de datado: caixas `#111` com borda e sombra vermelha empilhadas, botões outlined vermelhos em tudo, `#ff0000` puro saturando, estilos repetidos à mão em cada página. Não há um público-alvo específico no momento. A motivação é que passou da hora de atualizar.

O que precisa sobreviver é a essência, que o Ramon definiu como **as duas coisas**:
1. **O Shadow the Hedgehog como personagem**: o logo (silhueta, `src/assets/logo.png`) e os sprites em pixel art (`icon2.gif`, `flutuante.gif`).
2. **A atmosfera escura com preto e vermelho.**

Direção escolhida: **retrô arcade**, a partir de três direções apresentadas em mockup (moderno minimalista, retrô arcade e agressivo/angular). O Ramon escolheu arcade porque "gostou da premissa". Em seguida escolheu que **cada página seja uma tela de game**, e não só uma pele visual, e aprovou os mockups das telas internas ("perfeito").

Mockups de referência (locais, fora do git): `.superpowers/brainstorm/2017-1792817690/content/direcao-visual.html` (opção B) e `telas-game.html`.

## Objetivos

- Uma identidade visual retrô arcade coerente em todo o site, com o Shadow como protagonista.
- Cada página é uma "tela de game" com metáfora própria:
  - **Home**: tela de título / "PRESS START".
  - **Sobre**: ficha do personagem.
  - **Projetos**: seleção de fases.
  - **Contato**: "CONTINUE?".
- O conteúdo continua fácil de ler: um visitante tem que conseguir ler a experiência e os projetos sem esforço, apesar do tema.
- Funcionar bem no celular, incluindo a navegação.
- Corrigir os problemas existentes (lista em "Correções incluídas").

## Não-objetivos

- Não mudar a stack (React, Vite, MUI, React Router), o hosting nem o fluxo de deploy.
- Não adicionar backend. O formulário de contato continua abrindo `mailto:` / `wa.me`.
- Não criar páginas novas além das 4 atuais.
- Não usar mini-jogo jogável, som ou trilha. O tema é visual e de linguagem.

## Anti-objetivos (falha mesmo que funcione)

- O tema atrapalhar a leitura: texto corrido em fonte pixel, contraste baixo, animação piscando em cima de conteúdo.
- O Shadow virar enfeite secundário ou sumir. Ele é o centro da identidade.
- Perder o preto + vermelho.
- Parecer de novo um "template MUI" genérico.

## Restrições

- Continuar usando MUI (já é dependência e o código todo usa).
- TypeScript strict com `noUnusedLocals` / `noUnusedParameters`. O build é `tsc -b && vite build` e precisa passar, porque o Netlify roda esse comando.
- Projetos vêm da API pública do GitHub (`fetchGithubRepos('darckrow')`, sem token, sujeito a rate limit de 60 req/h por IP).
- Imagens importadas via `import x from './assets/...'`, não por caminho em string. O histórico de commits mostra quebras de build por isso.
- Conteúdo em português do Brasil.

## Linguagem visual

**Paleta**
- Fundo `#050505`, com scanlines sutis (gradiente repetido, alpha ~0.03).
- Superfícies `#0d0d0d`.
- Vermelho principal `#dc2626` / `#b91c1c` (sombras duras, bordas), substituindo o `#ff0000`.
- Amarelo de destaque `#facc15`: cursor ▶, item selecionado, "PRESS START".
- Texto `#ddd` / secundário `#888`–`#aaa`, e branco `#fff` em bordas de caixa.

**Tipografia**
- **Press Start 2P** só em títulos, rótulos curtos, navegação e botões.
- Texto corrido (descrições, experiência, formulário) em **JetBrains Mono**, ou outra fonte legível. Nunca em fonte pixel.
- Ambas via Google Fonts.

**Elementos**
- Caixas com borda branca de 3px e sombra dura deslocada em vermelho (`4px 4px 0`).
- Títulos com `text-shadow` duro vermelho.
- Cursor ▶ amarelo indicando o item ativo, na nav e nas seleções.
- Sprites com `image-rendering: pixelated`.
- Animações curtas no estilo de jogo: piscar em steps, leve deslocamento no hover.
- Respeitar `prefers-reduced-motion`: sem piscar nem animações nesse caso.

## Telas

**Navbar (global)**
- Logo à esquerda, links em fonte pixel, o ativo em amarelo com ▶, e borda inferior vermelha.
- No celular: menu recolhido, por exemplo um botão "MENU" que abre uma lista vertical estilo menu de pausa.

**Home (tela de título)**
- Hero como na opção B do mockup: sprite grande com brilho vermelho, nome "RAMON MATHEUS" em pixel com sombra vermelha, linhas no estilo terminal ("> Dev Front-end · React · TypeScript", "> Próxima fase: Python · C# · SQL"), barra de XP / nível e "PRESS START ▶ PROJETOS" piscando, levando a `/projetos`.
- Abaixo, o que hoje é "Tecnologias Utilizadas" (o componente `Resumo`) e uma prévia dos 3 repositórios mais recentes no formato de fase.

**Sobre (ficha do personagem)**
- Retrato com sprite, nome, "Classe: Dev Front-end" e "Próx. evolução: Backend".
- Painel de atributos com barras.
- Texto "sobre mim" em fonte legível.
- "Missões concluídas" com **todas** as experiências atuais (TECHCERT, as duas da ZAK e a de freelancer), em ordem cronológica decrescente.
- "Conquistas" com os 13 certificados atuais como badges, e a graduação em ADS (Anhanguera, até ago/2027) como conquista bloqueada / em progresso, com a descrição acessível.

**Projetos (seleção de fases)**
- Grade de "fases" (FASE 1-1, 1-2...), uma por repositório do GitHub, com nome, linguagem e uma área de preview.
- Selecionar uma fase (hover ou clique / foco por teclado) mostra o painel de detalhes: descrição, tags (linguagem + topics), "▶ JOGAR" (abre `homepage`, só se existir) e "CÓDIGO" (abre `html_url`).
- Estados de carregamento e erro no tema (por exemplo "CARREGANDO..." piscando, e "GAME OVER" com tentar de novo).
- Botão final "Ver todos no GitHub" mantido.

**Contato (CONTINUE?)**
- "CONTINUE?" grande com contador decorativo.
- Menu E-MAIL / WHATSAPP no estilo de jogo, mantendo a lógica atual de alternância.
- Formulário dentro de uma caixa de diálogo de RPG, com o sprite do Shadow como quem fala ("SHADOW: Quer trocar uma ideia? Deixa sua mensagem.").
- Os campos e o envio mantêm o comportamento atual (`mailto:` com subject e body, ou `wa.me/31973102866` com a mensagem).

**Footer e Shadow flutuante**
- Mantidos, restilizados no tema. O Shadow flutuante continua levando ao GitHub.

## Correções incluídas

- **Foto do Sobre**: hoje é uma URL do LinkedIn expirada em 2025. Ver decisões abaixo.
- **Projetos**: todas as imagens usam o mesmo avatar fixo, e o botão de demo está sem texto.
- **`index.html`**: `lang="en"` (deve ser `pt-BR`), título "Bem Vindo" e favicon apontando para `./src/assets/logo.png`, que não existe no build.
- **Textos contraditórios**: a Home diz "Full Stack especializado em React", e o Sobre diz "em transição para backend com Python, C# e SQL". Unificar na mensagem do Sobre: front-end hoje, evoluindo para backend.
- **Contato**: `orientation={window.innerWidth < 400 ...}` não reage a resize. Usar breakpoints.
- **Home**: o fallback de descrição em inglês ("No description available") vira português.
- **Estilos**: os estilos repetidos (os 4 TextFields iguais, as caixas `#111` copiadas) dão lugar a um tema MUI central e a componentes reutilizáveis.

## Decisões do Ramon sobre conteúdo

- **Textos do currículo podem ser reescritos.** As experiências ganham descrições curtas, adequadas ao formato de "missões". As duas da ZAK passam a ter textos diferentes entre si (estágio x técnico), e a de freelancer ganha conteúdo real. Há também um resumo curto no painel de atributos. O Ramon **revisa os textos antes do merge**, no preview.
- **Fases vêm do GitHub, sem lista curada no código.** As descrições ficam nos próprios repositórios. Em 2026-10-24, 21 repositórios públicos que estavam sem descrição receberam uma (em PT-BR). O site continua só puxando da API.
- Consequência: ordenar por `pushed` (último push) em vez de `updated`. Editar a descrição altera o `updated_at` de todos os repositórios, o que embaralharia a ordem.

## Decisões do builder (minha escolha, não combinadas com o Ramon)

- **Arquitetura de estilo**: um `ThemeProvider` do MUI com a paleta e a tipografia acima, mais um pequeno conjunto de componentes reutilizáveis do tema (caixa pixel, botão pixel, título de tela, barra de status). Os nomes ficam a critério do builder.
- **Barras de atributo**: os valores do mockup (Front-end 75, Suporte/Infra 85, Backend 45, Banco de dados 40) foram inventados. O Ramon aprovou a tela sem comentar os números. Os valores ficam em um array de dados fácil de editar.
- **Foto**: o retrato da ficha é o sprite. A foto quebrada do LinkedIn sai.
- **Imagem das fases**: sem screenshot real disponível, a área de preview usa um padrão pixelado com o nome ou a linguagem, em vez do mesmo avatar repetido.
- **Quantidade de fases**: o serviço hoje busca `per_page=3`. A página de Projetos passa a buscar mais (por exemplo, 9). A Home continua mostrando 3.
- **Pasta `componets/`**: o nome tem erro de digitação. Fica a critério do builder renomear para `components/`, desde que todos os imports sejam atualizados.
- **Entrega**: o trabalho é feito numa branch separada e mergeado na `main` de uma vez só, para o site no ar nunca ficar meio no tema novo e meio no antigo. Antes do merge, o Ramon confere um deploy de preview no Netlify.
- **Movimento reduzido**: `prefers-reduced-motion` desliga só as animações CSS (piscar, hover, contador). Os GIFs dos sprites continuam animados, já que são a identidade do Shadow.
- **Conquista bloqueada (ADS)**: o badge mostra um texto curto visível ("ADS · Anhanguera · até ago/2027") e tem um `aria-label` descritivo. A descrição longa do curso sai.
- **Serviço do GitHub**: `fetchGithubRepos` hoje engole erros e retorna `[]`, então o estado "GAME OVER" nunca apareceria. Ele passa a lançar o erro (ou retornar um estado de erro). Home e Projetos compartilham uma única requisição (cache em memória ou contexto), para não gastar o rate limit duas vezes.

## Deixado para o builder

- O layout exato e o espaçamento de cada tela, seguindo os mockups como referência e não como especificação pixel a pixel.
- Breakpoints e comportamento responsivo de cada tela.
- O texto do contador "CONTINUE?" (fixo ou animado), desde que respeite `prefers-reduced-motion`.
- Melhorias de acessibilidade: foco visível no tema, `alt` nos sprites, rótulos nos campos.
