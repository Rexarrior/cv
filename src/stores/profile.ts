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
  
  const bio = ref('Инженер-программист с опытом 10+ лет. Широкий охват инструментов: Python, C/C++, C#, Go, Ruby. Особое внимание архитектуре и выбору стека. Разрабатываю высоконагруженные сервисы, AI-инструменты и системы сбора данных.')

const experience = ref<Experience[]>([
    {
      title: 'Backend Developer',
      company: 'Городские сервисы Яндекса',
      period: 'янв. 2024 — наст. время',
      description: 'Продуктовая разработка высоконагруженных сервисов. Разработка AI-инструментов для разработчиков и AI-агентов.',
      tags: ['C++', 'Python', 'Go', 'AI Agents', 'Highload']
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
    { name: 'C / C++', icon: '⚙️', level: '10+ лет', description: 'Embedded systems, STM32, FreeRTOS, kernel modules, performance optimization' },
    { name: 'C# / .NET', icon: '🔷', level: '6+ лет', description: '.NET Core, WinForms, WPF, ASP.NET, Entity Framework' },
    { name: 'Go', icon: '🔵', level: '4+ года', description: 'Microservices, API, protobuf, RTSP servers' },
    { name: 'DevOps', icon: '🐳', level: 'Docker, CI/CD', description: 'Docker Swarm, Kubernetes, Ansible, GitHub Actions, PostgreSQL, Redis, Kafka' }
  ])

  const education = ref({
    university: 'СПбГУ',
    name: 'Прикладной математики и Процессов управления · ФИИТ',
    degree: 'Высшее (бакалавр + магистратура)',
    period: '2012 — 2020'
  })

  const contacts = ref([
    { icon: '📧', label: 'Email', value: 'rexarrior@yandex.ru', link: 'mailto:rexarrior@yandex.ru' },
    { icon: '✈️', label: 'Telegram', value: '@rexarrior', link: 'https://t.me/rexarrior' },
    { icon: '💻', label: 'GitHub', value: 'rexarrior', link: 'https://github.com/rexarrior' },
    { icon: '🌐', label: 'FL.ru', value: 'rexarrior', link: 'https://www.fl.ru/users/rexarrior/info/#profile-nav' }
  ])

  return { name, title, company, bio, experience, skills, education, contacts }
})