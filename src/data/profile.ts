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

export const characterClass = { current: 'Dev Front-end', next: 'Backend' }

export const summary =
  'Profissional de TI com experiência em suporte, infraestrutura e desenvolvimento web com React e TypeScript. ' +
  'Hoje estou evoluindo para o backend, estudando Python, C# e SQL, e já automatizei processos no dia a dia do suporte. ' +
  'Gosto de resolver problemas, trabalhar em equipe e entregar soluções simples e eficientes.'

export const stats: Stat[] = [
  { label: 'Front-end', value: 75 },
  { label: 'Suporte / Infra', value: 85 },
  { label: 'Backend', value: 45 },
  { label: 'Banco de dados', value: 40 },
]

export const experiences: Experience[] = [
  {
    period: 'NOV 2024 — ATUAL',
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
]

export const education = {
  label: 'ADS · Anhanguera · até ago/2027',
  ariaLabel:
    'Conquista bloqueada: Análise e Desenvolvimento de Sistemas na Anhanguera, em andamento, conclusão prevista para agosto de 2027',
}
