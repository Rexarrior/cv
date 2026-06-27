import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Experience {
  title: string
  company: string
  period: string
  description: string
  tags: string[]
}

export interface Skill {
  name: string
  icon: string
  level: string
  description: string
}

export const useProfileStore = defineStore('profile', () => {
  const name = ref('Александр Родионов')
  const title = ref('Backend Developer')
  const company = ref('Городские сервисы Яндекса')
  
  const bio = ref('Инженер-программист с опытом 10+ лет. Широкий охват инструментов: Python, C/C++, C#, Go, Ruby. Особое внимание архитектуре и выбору стека. Разрабатываю высоконагруженные сервисы, AI-инструменты и системы сбора данных. Последний год активно занимаюсь ИИ и внедрением ИИ в разработку — от первого "вау ии" до организации централизованной разработки и дистрибьюции пресетов для ИИ в рамках компании более чем 2.5к разработчиков. Знаю внутреннее устройство opencode, roocode, claude, основные парадигмы работы с ИИ, имею опыт публичных выступлений на тему корпоративного ИИ для разработчиков.')

  const tagline = ref('Backend Developer · Curriculum Vitae')

const experience = ref<Experience[]>([
    {
      title: 'Backend Developer',
      company: 'Городские сервисы Яндекса',
      period: 'янв. 2024 — наст. время',
      description: 'Продуктовая разработка высоконагруженных сервисов. Активно дорабатываю харнес под внутренние инструменты, много работаю с оценкой качества харнеса на бенчмарках — понимаю, как строятся пайплайны оценки и улучшения качества с целью роста эффективности или снижения стоимости ИИ. Организую централизованную разработку и дистрибьюцию пресетов для ИИ в масштабах компании (2.5к+ разработчиков).',
      tags: ['C++', 'Python', 'Go', 'AI Agents', 'Highload', 'Evals']
    },
    {
      title: 'Разработчик бекенда',
      company: 'Реалист (ОАЭ)',
      period: 'апр. 2023 — нояб. 2023',
      description: 'Разработка распределенной системы сбора и анализа данных, скрапперы, развертывание инфраструктуры. Ruby on Rails, Kafka, Docker Swarm, PostgreSQL.',
      tags: ['Ruby', 'Rails', 'Kafka', 'Docker', 'PostgreSQL', 'Ansible']
    },
    {
      title: 'Инженер-программист',
      company: 'СКАЙРОС',
      period: 'окт. 2020 — апр. 2023',
      description: 'Разработка распределенной системы видеонаблюдения и контроля управления доступом. Прошивки STM32. Ментор по Python.',
      tags: ['C#', 'C++', 'STM32', 'Python', 'Docker']
    },
    {
      title: 'Программист-разработчик',
      company: 'ООО "Инженерный центр Борей"',
      period: 'апр. 2019 — окт. 2020',
      description: 'Системы управления приборами на C# и Python. Микроконтроллеры STM32. Встраиваемые модули на NanoPi под Linux. RTSP сервер на Golang.',
      tags: ['C#', 'Python', 'STM32', 'Linux', 'Golang', 'Protobuf']
    },
    {
      title: 'Fullstack Developer',
      company: 'Freelance',
      period: 'сен. 2016 — наст. время',
      description: 'Разработка проектов: синхронизация БД с Битрикс, 3D реконструкция, бекенд спутниковой системы, анализ данных МРТ, скрипты автоматизации.',
      tags: ['Python', 'Django', 'FastAPI', 'C#', 'Vue.js', 'PostgreSQL', 'RabbitMQ']
    }
  ])

  const skills = ref<Skill[]>([
    { name: 'AI / LLM', icon: '🤖', level: 'AI Evangelist', description: 'LLM Integration, RAG, AI Agents, Prompt Engineering, Context Engineering' },
    { name: 'Python', icon: '🐍', level: '10+ лет', description: 'Django, FastAPI, asyncio, pandas, scikit-learn, Celery, RabbitMQ' },
    { name: 'C / C++', icon: '⚙️', level: '8+ лет', description: 'Embedded systems, STM32, FreeRTOS, kernel modules, performance optimization' },
    { name: 'C# / .NET', icon: '🔷', level: '2+ года', description: '.NET Core, WinForms, WPF, ASP.NET, Entity Framework' },
    { name: 'Go', icon: '🔵', level: '2+ года', description: 'Microservices, API, protobuf, RTSP servers' },
    { name: 'DevOps', icon: '🐳', level: 'Docker, CI/CD', description: 'Docker Swarm, Kubernetes, Ansible, GitHub Actions, PostgreSQL, Redis, Kafka' }
  ])

  const education = ref({
    university: 'СПбГУ',
    name: 'Прикладной математики и Процессов управления · ФИИТ',
    degree: 'Высшее (бакалавр + магистратура)',
    period: '2016 — 2020'
  })

  const contacts = ref([
    { icon: '📧', label: 'Email', value: 'rexarrior@yandex.ru', link: 'mailto:rexarrior@yandex.ru' },
    { icon: '✈️', label: 'Telegram', value: '@rexarrior', link: 'https://t.me/rexarrior' },
    { icon: '💻', label: 'GitHub', value: 'rexarrior', link: 'https://github.com/rexarrior' },
    { icon: '🌐', label: 'FL.ru', value: 'rexarrior', link: 'https://www.fl.ru/users/rexarrior/info/#profile-nav' }
  ])

  return { name, title, company, bio, tagline, experience, skills, education, contacts }
})