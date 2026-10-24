const SQL_SAMPLE = `-- aging de títulos em aberto (dados fictícios)
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
       SUM(CASE WHEN ordem = 1 THEN 1 ELSE 0 END) AS clientes,
       SUM(valor) AS total
FROM abertos
GROUP BY CASE WHEN atraso <= 0  THEN 'a vencer'
              WHEN atraso <= 30 THEN '1-30 dias'
              WHEN atraso <= 90 THEN '31-90 dias'
              ELSE '90+ dias' END;`

export const bossProject = {
  title: 'PAINEL DE GESTÃO MODULAR',
  subtitle:
    'Plataforma interna de BI e operação para uma rede de varejo de moda (lojas próprias, franquias e atacado B2B)',
  status: 'EM PRODUÇÃO',
  stats: [
    { value: '~60', label: 'módulos de análise' },
    { value: '9', label: 'áreas de negócio' },
    { value: '2', label: 'bancos: SQL Server + PostgreSQL' },
    { value: '200+', label: 'commits, solo' },
  ],
  pitch:
    'Construí, praticamente sozinho, a plataforma que centraliza a gestão da empresa: o que antes exigia consultas manuais no banco e no ERP virou um painel único, com login, permissões por tela e trilha de auditoria. Por trás das telas há SQL de verdade (CTEs, funções de janela, anti-joins e views) rodando em tempo real sobre o ERP e o PostgreSQL, com exportação para Excel, PDF e PowerPoint.',
  indicators: [
    'Aging de contas a pagar e a receber',
    'Fluxo de caixa',
    'Faturamento com projeção sazonal',
    'Metas diárias x realizado',
    'Curva ABC de fornecedores',
    'Lead time e fill rate',
    'Cobertura e remanejamento de estoque',
    'Recorrência de clientes',
    'Margem de franquias',
  ],
  highlight: 'Totais conferidos centavo por centavo contra o saldo oficial do ERP',
  stack: ['Vue 3', 'Vite', 'Tailwind', 'Node.js', 'Express', 'SQL Server', 'PostgreSQL', 'Supabase', 'JWT'],
  privateNote: 'Código privado. Posso apresentar a arquitetura e as consultas em uma conversa.',
  sqlSample: SQL_SAMPLE,
}
