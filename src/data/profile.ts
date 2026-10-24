export interface Stat {
  label: string
  value: number
}

export interface Experience {
  period: string
  role: string
  company: string
  description: string
}

export const characterClass = { current: 'Analista de Dados', next: 'Engenharia de Dados' }

export const summary =
  'Analista de Dados & Sistemas: transformo dados do ERP em indicadores e decisões. ' +
  'No dia a dia escrevo SQL avançado (CTEs, funções de janela, views) em SQL Server e PostgreSQL ' +
  'e construo de ponta a ponta as aplicações que entregam esses números para as áreas de negócio, ' +
  'do backend em Node.js à interface em Vue e React. ' +
  'Venho do suporte e da infraestrutura, o que me deu visão de operação e foco em resolver o problema real de quem usa.'

export const stats: Stat[] = [
  { label: 'SQL', value: 85 },
  { label: 'Análise de dados', value: 80 },
  { label: 'Backend', value: 65 },
  { label: 'Front-end', value: 70 },
]

export const experiences: Experience[] = [
  {
    period: 'SET 2025 — ATUAL',
    role: 'Analista de Desenvolvimento de Sistemas',
    company: 'ZAK',
    description:
      'Desenvolvo e mantenho um painel interno de BI e operação usado no dia a dia da empresa: consultas SQL avançadas sobre o ERP, indicadores financeiros, de estoque, vendas e CRM, controle de acesso e automações para as áreas de negócio.',
  },
  {
    period: 'NOV 2024 — AGO 2025',
    role: 'Técnico de Apoio e Suporte I',
    company: 'TECHCERT',
    description:
      'Atendimento de chamados internos e externos, diagnóstico e resolução de problemas, automação de processos com scripts e documentação de incidentes.',
  },
  {
    period: 'JUN 2024 — OUT 2024',
    role: 'Técnico de Apoio ao Usuário',
    company: 'ZAK',
    description:
      'Suporte remoto e presencial, gestão de acessos e perfis, manutenção de estações, impressoras e rede, e inventário de TI.',
  },
  {
    period: 'AGO 2023 — ATUAL',
    role: 'Desenvolvedor Freelancer',
    company: 'Autônomo',
    description:
      'Sites e aplicações web sob demanda, do layout ao deploy, com React, JavaScript e integração com APIs.',
  },
  {
    period: 'MAR 2023 — JUN 2024',
    role: 'Estagiário de TI',
    company: 'ZAK',
    description:
      'Primeiro passo na área: atendimento aos usuários, instalação e configuração de equipamentos, manutenção preventiva e apoio à infraestrutura.',
  },
]

export const certificates: string[] = [
  'Bancos de Dados Relacionais com MySQL',
  'Fundamentos do Desenvolvimento Backend',
  'Princípios de Arquitetura de Software',
  'Aplicação funcional com consumo de API',
  'Introdução à Python',
  'Versionamento de Código Git',
  'Desenvolvimento Front-End',
  'Introdução à Front-end com React.JS',
  'Javascript Avançado',
  'Princípios de Design de Interface',
  'Introdução ao Desenvolvimento Web',
  'Introdução a Lógica de Programação e Fundamentos JavaScript',
  'Desenvolvimento Web com HTML e CSS',
  'Escola DNC · Programação de Computadores (2023–2024)',
  'Dev Samurai · Programação de Computadores (2022–2023)',
]

export const education = {
  label: 'ADS · Anhanguera · até ago/2027',
  ariaLabel:
    'Conquista bloqueada: Análise e Desenvolvimento de Sistemas na Anhanguera, em andamento, conclusão prevista para agosto de 2027',
}
