import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import i18n from '@/i18n'

type Localized = { en: string; ru: string }

export interface ExperienceDetail {
  heading: Localized
  body: Localized
}

export interface Experience {
  slug: string
  title: Localized
  company: Localized
  period: Localized
  description: Localized
  tags: string[]
  intro?: Localized
  details?: ExperienceDetail[]
}

export interface Skill {
  name: string
  icon: string
  level: Localized
  description: string
}

export interface Talk {
  type: 'talk' | 'workshop'
  typeLabel: Localized
  date: string
  title: Localized
  description: Localized
  link: string
  buttonText: Localized
}

export interface Article {
  date: Localized
  tag: Localized
  title: Localized
  description: Localized
  link: string
  englishLink?: string
  buttonText: Localized
}

/** Public demo entry. Keep the implementation behind its own subdomain. */
export interface Project {
  slug: string
  title: Localized
  description: Localized
  url: string
  sourceUrl?: string
  tags: string[]
}

export interface Contact {
  icon: string
  label: string
  value: string
  link: string
}

function loc(en: string, ru: string): Localized {
  return { en, ru }
}

function tr(value: Localized): string {
  const locale = i18n.global.locale.value as 'en' | 'ru'
  return value[locale] ?? value.en
}

export const useProfileStore = defineStore('profile', () => {
  const name = loc('Alexander Rodionov', 'Александр Родионов')
  const title = 'Senior AI Systems Engineer'
  const company = loc('Yandex City Services', 'Городские сервисы Яндекса')

  const bioRaw = loc(
    'Senior AI systems engineer with 10+ years of software-engineering experience. Broad toolset: Python, C/C++, C#, Go, Ruby. Strong focus on architecture and stack selection. I build high-traffic services, AI tools, and data-collection systems. Over the past year I\'ve focused on AI-enabled software development: helping build and distribute AI configurations used by 10k+ developers, while supporting a 1k+ cross-team creator community that builds configurations on the platform and contributes improvements. I know the internals of OpenCode, Roo Code, and Claude, the core paradigms of working with AI, and I have experience giving public talks on enterprise AI for developers.',
    'Senior AI Systems Engineer с опытом в разработке ПО 10+ лет. Широкий охват инструментов: Python, C/C++, C#, Go, Ruby. Особое внимание архитектуре и выбору стека. Разрабатываю высоконагруженные сервисы, AI-инструменты и системы сбора данных. Последний год сфокусирован на внедрении ИИ в разработку: участвую в создании и дистрибьюции ИИ-конфигураций, которыми пользуются 10k+ разработчиков, и поддерживаю комьюнити из 1k+ разработчиков за пределами команды, создающих конфигурации на платформе и приносящих улучшения. Знаю внутреннее устройство OpenCode, Roo Code и Claude, основные парадигмы работы с ИИ, имею опыт публичных выступлений на тему корпоративного ИИ для разработчиков.'
  )

  const tagline = 'Senior AI Systems Engineer · Curriculum Vitae'

  const aboutExtraRaw = [
    loc(
      'I actively work with AI technologies: I build developer tools and agents powered by large language models.',
      'Активно работаю с AI-технологиями: создаю инструменты для разработчиков и агенты на основе больших языковых моделей.'
    ),
    loc(
      'Open to interesting projects and collaborations in software engineering.',
      'Открыт к интересным проектам и коллаборациям в области разработки программного обеспечения.'
    )
  ]

  const experienceRaw = ref<Experience[]>([
    {
      slug: 'yandex',
      title: loc('Senior AI Systems Engineer', 'Senior AI Systems Engineer'),
      company: loc('Yandex City Services', 'Городские сервисы Яндекса'),
      period: loc('Jan 2024 — present', 'янв. 2024 — наст. время'),
      description: loc(
        'Product development of high-traffic services. I actively extend the harness for internal tools and evaluate harness quality on benchmarks — building evaluation and continuous-improvement pipelines to improve efficiency and reduce AI costs. I help organize centralized development and distribution of AI configurations used by 10k+ developers, with a 1k+ cross-team creator community building configurations on the platform and contributing pull requests.',
        'Продуктовая разработка высоконагруженных сервисов. Активно дорабатываю харнес под внутренние инструменты и оцениваю его качество на бенчмарках — строю пайплайны оценки и непрерывного улучшения для роста эффективности и снижения стоимости ИИ. Участвую в централизованной разработке и дистрибьюции ИИ-конфигураций, которыми пользуются 10k+ разработчиков; комьюнити из 1k+ разработчиков за пределами команды создаёт конфигурации на платформе и приносит pull request\'ы.'
      ),
      tags: ['C++', 'Python', 'Go', 'AI Agents', 'Highload', 'Evals'],
      details: [
        {
          heading: loc('High-Load Backend Services', 'Высоконагруженные бекенд-сервисы'),
          body: loc(
            "Until March 2025, developed high-load backend services in C++ and Python (the userver framework and Yandex internal frameworks). Worked in the discounts domain: contributed to the discounts platform and its product implementations for Yandex Taxi, Yandex Eats, and Yandex Lavka. Also contributed to other services — a document generation platform, services from the taxi ordering cycle, and geodata services. Carried on-call shifts at loads exceeding 10k RPS. Conducted architectural research of the Yandex Taxi and Yandex Eats service ecosystem and participated in designing the new version of the discounts platform.",
            'До марта 2025 года разрабатывал высоконагруженные бекенд-сервисы на C++ и Python (фреймворк userver и внутренние фреймворки Яндекса). Работал в продуктовой области скидок: участвовал в разработке платформы скидок и её продуктовых реализаций для Яндекс Такси, Яндекс Еды и Яндекс Лавки. Также участвовал в разработке других сервисов — платформы генерации документов, сервисов из цикла заказа такси, сервисов работы с геоданными. Нёс дежурства при нагрузке свыше 10k RPS. Проводил архитектурные исследования экосистемы сервисов Яндекс Такси и Яндекс Еды, участвовал в проектировании новой версии платформы скидок.'
          )
        },
        {
          heading: loc('AI Agents: Research and Culture', 'ИИ-агенты: исследования и культура'),
          body: loc(
            "From March 2025, focused on AI agents. Studied the internals of early code agent versions (Cline, Roo Code, Cursor), conducted comparative analysis, and developed a culture of working with code agents to sustain and grow development efficiency. Delivered talks to the business group (up to 8k potential listeners) and department-level master classes (up to 100 participants). Was the driving force and lead organizer of the first AI agents hackathon at Yandex (~hundreds of participants, several thousand lecture-stream listeners).",
            'С марта 2025 сфокусировался на ИИ-агентах. Изучал устройство ранних версий кодагентов (Cline, Roo Code, Cursor), проводил сравнительный анализ, разрабатывал культуру работы с кодагентами для сохранения и роста эффективности разработки. Выступал с докладами на бизнес-группу (до 8k потенциальных слушателей) и мастер-классами уровня отдела (до 100 участников). Был идейным вдохновителем и основным организатором первого в Яндексе хакатона ИИ-агентов (~сотни участников, несколько тысяч слушателей лекционной части).'
          )
        },
        {
          heading: loc('AI Standards and Internal Tools', 'ИИ-стандарты и внутренние инструменты'),
          body: loc(
            "Contributed to the development of internal AI development standards and AI artifacts (customizations). Participated in building internal AI code agents based on Roo Code.",
            'Участвовал в разработке внутренних стандартов ИИ-разработки и артефактов (кастомизаций) для ИИ. Участвовал в разработке внутренних ИИ-кодагентов на базе Roo Code.'
          )
        },
        {
          heading: loc('AI in Yandex Apps', 'ИИ в приложениях Яндекса'),
          body: loc(
            "Participated in a major AI launch across Yandex apps as a developer of the core agent library — designed and built an analytics system for working with logs and evaluating agent quality.",
            'Принял участие в большом запуске ИИ в приложениях Яндекса как разработчик ядра агентской библиотеки — спроектировал и разработал аналитическую систему для работы с логами и оценки качества агентов.'
          )
        },
        {
          heading: loc('Service Split and Universal AI Presets', 'Разделение сервисов и универсальные ИИ-пресеты'),
          body: loc(
            "From late 2025, contributed to product development for splitting Yandex services into Russian and foreign contours (to comply with European legislation). In parallel, participated in establishing and developing a company-wide platform for universal configuration and distribution of AI artifacts — AI configurations used by 10k+ developers. The platform also enables a 1k+ cross-team creator community to build configurations and contribute pull requests. Contributed to a unified AI-configuration standard for the internal userver frameworks.",
            'С конца 2025 участвовал в продуктовой разработке разделения сервисов Яндекса на российский и иностранный контуры (для соблюдения европейского законодательства). Параллельно участвовал в становлении и развитии общего для Яндекса инструмента универсальной настройки и дистрибьюции артефактов ИИ — ИИ-конфигураций, которыми пользуются 10k+ разработчиков. Платформа также позволяет комьюнити из 1k+ разработчиков за пределами команды создавать конфигурации и приносить pull request\'ы. Участвовал в создании единого стандарта ИИ-конфигурации для внутренних фреймворков userver.'
          )
        },
        {
          heading: loc('Public Activity and Community', 'Публичная деятельность и сообщество'),
          body: loc(
            "Spoke at the AI Dev Day 2025 conference (several hundred offline participants, 3k+ YouTube views) with a talk on the culture of AI-assisted development; wrote an article for the Yandex magazine based on the talk. Was the lead organizer of the first AI stand for userver at CP Zero Cost Conf 2025. Spoke at Podlodka AI Crew #2 on building an efficiency pipeline for working with AI at every level — from individual to team (3k+ YouTube views). Participated in AI strategy sessions at Yandex, led a roundtable on effective AI usage at Dev Day&Night, and contributed to preparing the AI section of the userver stand at C++ Russia 2026.",
            'Выступал на конференции AI Dev Day 2025 (несколько сотен оффлайн-участников, 3k+ просмотров на YouTube) с докладом о культуре разработки с ИИ; по мотивам выступления написал статью в журнал Яндекса. Был основным организатором первого ИИ-стенда по userver на CP Zero Cost Conf 2025. Выступал на Podlodka AI Crew #2 с темой о построении пайплайна роста эффективности работы с ИИ на всех уровнях — от личного до командного (3k+ просмотров на YouTube). Участвовал в стратсессиях по ИИ в Яндексе, вёл круглый стол по эффективному использованию ИИ на Dev Day&Night, участвовал в подготовке ИИ-части стенда userver на C++ Russia 2026.'
          )
        },
        {
          heading: loc('Internal AI Benchmark', 'Внутренний ИИ-бенчмарк'),
          body: loc(
            "From early 2026, contributed to the development of an internal AI benchmark and worked with it to build a continuous improvement pipeline for AI configuration quality at Yandex.",
            'С начала 2026 участвовал в разработке внутреннего ИИ-бенчмарка и работал с ним для построения пайплайна непрерывного улучшения качества конфигурации ИИ в Яндексе.'
          )
        }
      ]
    },
    {
      slug: 'realist',
      title: loc('Backend Developer', 'Разработчик бекенда'),
      company: loc('Realist (UAE)', 'Реалист (ОАЭ)'),
      period: loc('Apr 2023 — Nov 2023', 'апр. 2023 — нояб. 2023'),
      description: loc(
        'Development of a distributed data-collection and analytics system, scrapers, infrastructure deployment. Ruby on Rails, Kafka, Docker Swarm, PostgreSQL.',
        'Разработка распределенной системы сбора и анализа данных, скрапперы, развертывание инфраструктуры. Ruby on Rails, Kafka, Docker Swarm, PostgreSQL.'
      ),
      tags: ['Ruby', 'Rails', 'Kafka', 'Docker', 'PostgreSQL', 'Ansible'],
      details: [
        {
          heading: loc('Distributed Data Collection and Analytics System', 'Распределённая система сбора и анализа данных'),
          body: loc(
            'Developed a distributed data collection and analytics system with dynamic scaling and load balancing. Implemented data scrapers. Provisioned and maintained the infrastructure for this software platform.',
            'Разрабатывал распределённую систему сбора и анализа данных с поддержкой динамического масштабирования и балансировки нагрузки. Реализовывал скрапперы данных. Обеспечивал развёртывание и функционирование инфраструктуры данного программного комплекса.'
          )
        },
        {
          heading: loc('OpenStreetMap', 'OpenStreetMap'),
          body: loc(
            'Deployed and maintained an OpenStreetMap server along with selected computations built on top of it.',
            'Разворачивал и поддерживал сервер OpenStreetMap и некоторые расчёты поверх него.'
          )
        },
        {
          heading: loc('Ruby Interop Libraries', 'Библиотеки взаимодействия на Ruby'),
          body: loc(
            'Implemented Ruby glue libraries to enable interop between libraries written in different languages within a single application.',
            'Реализовывал вспомогательные библиотеки на Ruby для обеспечения взаимодействия библиотек на разных языках в рамках одного приложения.'
          )
        },
        {
          heading: loc('Excel-Based Computation and Image Generation Platform', 'Платформа вычислений на Excel и генерации изображений'),
          body: loc(
            'Built an Excel-based computation and image generation platform that enabled straightforward embedding of such computations into company websites.',
            'Реализовывал платформу для вычислений на базе Excel-калькуляторов и генераторов изображений, позволяющую легко встраивать подобные вычисления в сайты компании.'
          )
        }
      ]
    },
    {
      slug: 'skyros',
      title: loc('Software Engineer', 'Инженер-программист'),
      company: loc('SKYROS', 'СКАЙРОС'),
      period: loc('Oct 2020 — Apr 2023', 'окт. 2020 — апр. 2023'),
      description: loc(
        'Development of a distributed video-surveillance and access-control system. STM32 firmware. Python mentor.',
        'Разработка распределенной системы видеонаблюдения и контроля управления доступом. Прошивки STM32. Ментор по Python.'
      ),
      tags: ['C#', 'C++', 'STM32', 'Python', 'Docker'],
      details: [
        {
          heading: loc('Distributed Video Surveillance & Access Control System', 'Распределённая система видеонаблюдения и СКУД'),
          body: loc(
            'Contributed to a distributed video-surveillance and access-control system in C# and C++. Owned the algorithms for interacting with one class of peripheral devices — audio recording modules. Worked with ML-based event detection on video streams and developed several new detectors.',
            'Участвовал в разработке распределённой системы видеонаблюдения и контроля управления доступом на C# и C++. Полностью отвечал за алгоритмы взаимодействия с одним из классов дополнительных устройств — модулями звукозаписи. Работал с ML-алгоритмами детекции событий на видеопотоке, в том числе разработал несколько новых детекторов.'
          )
        },
        {
          heading: loc('STM32 Firmware', 'Прошивки STM32'),
          body: loc(
            'Programmed firmware for STM32 microcontrollers. Improved interfaces for integration with the access-control platform and audio processing quality. Developed a bootloader with multiple levels of protection and self-diagnostics, plus network-based updates.',
            'Программировал прошивки микроконтроллеров STM32. Работал над улучшением интерфейсов взаимодействия с платформой СКУД и качества обработки звука. Разработал загрузчик с поддержкой нескольких уровней защиты и самоконтроля, а также обновления по сети.'
          )
        },
        {
          heading: loc('Cross-Platform PoC & Refactoring', 'Кроссплатформенный PoC и рефакторинг'),
          body: loc(
            'Single-handedly built a proof-of-concept of the platform on Astra Linux. Subsequently led the refactoring of the access-control platform toward a cross-platform architecture; the team ranged from 1 to 5 engineers over time.',
            'Полностью самостоятельно провёл разработку proof-of-concept версии платформы на Astra Linux. В дальнейшем руководил рефакторингом платформы СКУД для перехода к кроссплатформенной архитектуре; команда в разное время насчитывала от 1 до 5 человек.'
          )
        },
        {
          heading: loc('Software Architecture & R&D', 'Архитектура ПО и R&D'),
          body: loc(
            'Designed software architecture and system interactions. Researched new technologies before adoption on the project — in particular, planned the migration to gRPC.',
            'Разрабатывал архитектуру ПО и взаимодействия систем. Занимался исследованием новых технологий перед их внедрением в проект — в частности, спланировал переход на gRPC.'
          )
        },
        {
          heading: loc('Data Analysis & Mentoring', 'Анализ данных и менторство'),
          body: loc(
            "Analyzed system logs and network traffic in Python to track down defects and improve performance, primarily using statistical algorithms. Mentored the QA team on Python for UI test automation.",
            'На Python анализировал данные — логи работы системы и сетевого обмена — с целью выявления ошибок и повышения производительности ПО; использовал в основном статистические алгоритмы. Выступал ментором по Python для сотрудников отдела тестирования (UI-тесты).'
          )
        },
        {
          heading: loc('Legacy C/C++', 'Legacy на C/C++'),
          body: loc(
            'Worked on legacy projects in C/C++.',
            'Работал с legacy-проектами на C/C++.'
          )
        }
      ]
    },
    {
      slug: 'borey',
      title: loc('Software Developer', 'Программист-разработчик'),
      company: loc('Engineering Center Borey LLC', 'ООО "Инженерный центр Борей"'),
      period: loc('Apr 2019 — Oct 2020', 'апр. 2019 — окт. 2020'),
      description: loc(
        'Instrument-control systems in C# and Python. STM32 microcontrollers. Embedded modules on NanoPi under Linux. RTSP server in Go.',
        'Системы управления приборами на C# и Python. Микроконтроллеры STM32. Встраиваемые модули на NanoPi под Linux. RTSP сервер на Golang.'
      ),
      tags: ['C#', 'Python', 'STM32', 'Linux', 'Golang', 'Protobuf'],
      details: [
        {
          heading: loc('Instrument Control Platform', 'Платформа управления приборами'),
          body: loc(
            "Single-handedly built an instrument control platform in C# supporting simultaneous operation of multiple devices, wired and wireless interfaces, direct and scripted control, and test protocols; C# handled the UI and communications layer. Worked with both in-house instruments and lab equipment — signal generators, oscilloscopes, spectrum analyzers, and radar systems. Coordinated control interfaces and signal analysis algorithms with colleagues.",
            'Единолично разработал платформу управления приборами на C#: одновременная работа с несколькими устройствами, проводные и беспроводные интерфейсы, прямое и сценарное управление, протоколы тестирования. C# отвечал за UI и коммуникации. Работал как с приборами собственной разработки, так и с лабораторным оборудованием — генераторами сигнала, осциллографами, спектроанализаторами, радарными системами. Интерфейсы управления и алгоритмы анализа сигналов согласовывал с коллегами.'
          )
        },
        {
          heading: loc('Data Analysis and Machine Learning', 'Анализ данных и машинное обучение'),
          body: loc(
            'Implemented data processing and analysis from equipment in Python: signal transformation algorithms, analytics, and visualization. Applied machine learning to signal analysis tasks. Ported colleagues\' MATLAB algorithms to Python, C#, and C for integration into company products.',
            'На Python реализовал обработку и анализ данных с оборудования: алгоритмы преобразования сигнала, аналитика, визуализация. Применял машинное обучение для задач анализа сигналов. Алгоритмы коллег из MATLAB переписывал на Python, C# и C для интеграции в продукты компании.'
          )
        },
        {
          heading: loc('STM32 Microcontrollers', 'Микроконтроллеры STM32'),
          body: loc(
            'Programmed STM32 microcontrollers in C/C++, developing high-performance signal processing algorithms on the controllers. Built a custom graphics library later adopted by the company across its instrument interfaces.',
            'Программировал STM32 на C/C++, разрабатывал высокопроизводительные алгоритмы обработки сигналов на контроллерах. Создал собственную библиотеку графики, которую компания затем использовала в интерфейсах своих приборов.'
          )
        },
        {
          heading: loc('Linux Embedded Modules', 'Встраиваемые модули под Linux'),
          body: loc(
            'Developed software in Python/Django and C/C++ for NanoPi embedded modules running Linux. Worked on Linux kernel modifications, Google Protobuf serialization, and maintenance and enhancement of an RTSP server in Go + Docker.',
            'Разрабатывал ПО на Python/Django и C/C++ для встраиваемых модулей NanoPi под Linux: модификация ядра Linux, сериализация на Google Protobuf, поддержка и доработка RTSP-сервера на Go + Docker.'
          )
        },
        {
          heading: loc('Thermal Imager Project and Leadership', 'Проект тепловизора и руководство'),
          body: loc(
            'Led the thermal imager development project: integrating with ffmpeg and motioneye, device control via COM ports, and kernel module work. Built a web-based instrument control interface in Django. Supervised a fellow developer responsible for circuit design and low-level kernel configuration for the hardware.',
            'Вёл проект разработки тепловизора: интеграция с ffmpeg и motioneye, управление устройствами через COM-порты, работа с модулями ядра. Разработал веб-интерфейс управления приборами на Django. Руководил коллегой-разработчиком, отвечавшим за схемотехнику и низкоуровневую настройку ядра под железо.'
          )
        }
      ]
    },
    {
      slug: 'freelance',
      title: loc('Fullstack Developer', 'Fullstack Developer'),
      company: loc('Freelance', 'Freelance'),
      period: loc('Sep 2016 — present', 'сен. 2016 — наст. время'),
      description: loc(
        'Project work: DB synchronization with Bitrix, 3D reconstruction, satellite-system backend, MRI data analysis, automation scripts.',
        'Разработка проектов: синхронизация БД с Битрикс, 3D реконструкция, бекенд спутниковой системы, анализ данных МРТ, скрипты автоматизации.'
      ),
      tags: ['Python', 'Django', 'FastAPI', 'C#', 'Vue.js', 'PostgreSQL', 'RabbitMQ'],
      intro: loc(
        'Worked on Freelance.habr.com, Freelancehunt.com (prior to the Ukrainian events) and FL.ru. Used freelancing to keep diverse skills sharp outside of main employment — mainly taking on short- and medium-term projects.',
        'Работал на биржах Freelance.habr.com, Freelancehunt.com (до украинских событий) и FL.ru. Фриланс использовал как средство поддержания навыков, не задействованных на основной работе — в основном брался за кратко- и среднесрочные проекты.'
      ),
      details: [
        {
          heading: loc('Data Automation and Integrations', 'Автоматизация и интеграции данных'),
          body: loc(
            'Built Python scripts for batch verification of programs in Kumir and PascalABC environments (pywinauto, pyautogui). Synchronized various databases with Bitrix (FastAPI, PostgreSQL, MariaDB, MySQL, Oracle, Bitrix, Docker, Redis, PyRedisMQ).',
            'Скрипты на Python для массовой проверки программ в средах Кумир и PascalABC (pywinauto, pyautogui). Синхронизация различных БД с Битриксом (FastAPI, PostgreSQL, MariaDB, MySQL, Oracle, Bitrix, Docker, Redis, PyRedisMQ).'
          )
        },
        {
          heading: loc('3D Reconstruction and Image Processing', '3D-реконструкция и обработка изображений'),
          body: loc(
            'Reconstructed 3D models from multi-view images — implemented as a Python library calling C++ code. Built an image processing pipeline for 3D model reconstruction from DCOM within a microservice architecture.',
            'Реконструкция 3D-моделей по всесторонним снимкам — реализована как Python-библиотека, вызывающая C++-код. Конвейер обработки изображений для реконструкции 3D-моделей из DCOM в микросервисной архитектуре.'
          )
        },
        {
          heading: loc('Backend and Distributed Systems', 'Бекенд и распределённые системы'),
          body: loc(
            'Built the backend of a satellite messaging system: Django + REST Framework + RabbitMQ + Celery server, IEC 104 client-server protocol, parser on Selenium and lxml. Engineered a large-scale Kafka data processing pipeline — implement and maintain the custom kafkaQueueSdk framework.',
            'Бекенд спутниковой системы передачи сообщений: сервер на Django + REST Framework + RabbitMQ + Celery, клиент-серверный протокол IEC 104, парсер на Selenium и lxml. Крупный пайплайн обработки данных на Kafka — реализую и поддерживаю собственный фреймворк kafkaQueueSdk.'
          )
        },
        {
          heading: loc('ML, Data Analysis and Healthcare', 'ML, анализ данных и медицина'),
          body: loc(
            'Built a system generating MRI descriptions to accelerate specialist review of results: Python + REST Framework backend, Vue.js frontend, document generation via docx. Performed data analysis with pandas, scipy, scikit-learn across several small-scale projects.',
            'Система генерации описаний МРТ для ускорения обработки результатов специалистами: бекенд на Python + REST Framework, фронт на Vue.js, генерация документов через docx. Анализ данных на pandas, scipy, scikit-learn — несколько небольших проектов.'
          )
        },
        {
          heading: loc('NLP and LLM Platforms', 'NLP и LLM-платформы'),
          body: loc(
            'Built NLP generation of SEO texts based on sets of product parameters (without LLM). Engineered an LLM platform for SEO text workflows: bulk generation with multi-level validation — from simple checks (length, frequency) to uniqueness, AI-content share, and NLP checks.',
            'NLP-генерация SEO-текстов по набору параметров товаров (без LLM). LLM-платформа для работы с SEO-текстами: массовая генерация с многоуровневыми проверками — от простых (длина, частота) до уникальности, доли ИИ и NLP-проверок.'
          )
        },
        {
          heading: loc('AI Agents and Chat Bots', 'ИИ-агенты и чат-боты'),
          body: loc(
            'Built AI agents on n8n: vehicle search across catalogs by photo/description, parts search by VIN and description — a project for a large startup in the UAE market. Developed a platform for AI bots across messenger chats — integrating Telegram, WhatsApp, amoCRM, Bitrix, and others.',
            'ИИ-агенты на n8n: поиск автомобиля по каталогам по фото/описанию, поиск деталей по VIN и описанию — проект для крупного стартапа на рынке ОАЭ. Платформа для работы с ИИ-ботами в чатах различных мессенджеров — объединяет Telegram, WhatsApp, amoCRM, Bitrix и др.'
          )
        },
        {
          heading: loc('Product Platforms', 'Продуктовые платформы'),
          body: loc(
            'Built a web calculator platform based on Excel spreadsheets: Excel file as input, a polished calculator as output, with computations under the hood on the Excel engine. Developed a forecasting platform for short-lived cryptocurrencies based on charts and mentions in Telegram channels.',
            'Платформа веб-калькуляторов на основе Excel-таблиц: на вход файл Excel, на выходе красивый калькулятор, вычисления под капотом на движке Excel. Платформа прогнозов короткоживущих криптовалют на основе графиков и упоминаний в Telegram-каналах.'
          )
        },
        {
          heading: loc('Embedded and Reverse Engineering', 'Embedded и реверс-инжиниринг'),
          body: loc(
            'Built a bootloader for an STM32-based device with remote firmware update support. Performed software reverse engineering across several diverse projects in C# and JS, including analysis and decryption of serialized data.',
            'Загрузчик для устройства на базе STM32 с поддержкой удалённого обновления прошивки. Реверс-инжиниринг ПО — несколько разнотипных проектов на C# и JS, анализ и расшифровка сериализованных данных.'
          )
        }
      ]
    }
  ])

  const skillsRaw = ref<Skill[]>([
    { name: 'AI / LLM', icon: '🤖', level: loc('AI Evangelist', 'AI Evangelist'), description: 'LLM Integration, RAG, AI Agents, Prompt Engineering, Context Engineering' },
    { name: 'Python', icon: '🐍', level: loc('10+ years', '10+ лет'), description: 'Django, FastAPI, asyncio, pandas, scikit-learn, Celery, RabbitMQ' },
    { name: 'C / C++', icon: '⚙️', level: loc('8+ years', '8+ лет'), description: 'Embedded systems, STM32, FreeRTOS, kernel modules, performance optimization' },
    { name: 'C# / .NET', icon: '🔷', level: loc('2+ years', '2+ года'), description: '.NET Core, WinForms, WPF, ASP.NET, Entity Framework' },
    { name: 'Go', icon: '🔵', level: loc('2+ years', '2+ года'), description: 'Microservices, API, protobuf, RTSP servers' },
    { name: 'DevOps', icon: '🐳', level: loc('Docker, CI/CD', 'Docker, CI/CD'), description: 'Docker Swarm, Kubernetes, Ansible, GitHub Actions, PostgreSQL, Redis, Kafka' }
  ])

  const educationRaw = {
    university: loc('SPbU', 'СПбГУ'),
    name: loc('Applied Mathematics and Control Processes · FIIT', 'Прикладной математики и Процессов управления · ФИИТ'),
    degree: loc('Higher education (Bachelor + Master)', 'Высшее (бакалавр + магистратура)'),
    period: '2016 — 2020'
  }

  const contacts = ref<Contact[]>([
    { icon: '📧', label: 'Email', value: 'rexarrior@yandex.ru', link: 'mailto:rexarrior@yandex.ru' },
    { icon: '✈️', label: 'Telegram', value: '@rexarrior', link: 'https://t.me/rexarrior' },
    { icon: '💻', label: 'GitHub', value: 'rexarrior', link: 'https://github.com/rexarrior' },
    { icon: '🌐', label: 'FL.ru', value: 'rexarrior', link: 'https://www.fl.ru/users/rexarrior/info/#profile-nav' }
  ])

  const talksRaw = ref<Talk[]>([
    {
      type: 'talk',
      typeLabel: loc('Talk', 'Доклад'),
      date: '2026',
      title: loc(
        'The Modern Development Landscape: Autonomous Agents, Orchestration, Multitasking',
        'Образ современной разработки: автономные агенты, оркестрация, мультизадачность'
      ),
      description: loc(
        'Round table at the AI Productivity club on Yandex Dev Day&Night 2026. A discussion on the role of AI agents in software development.',
        'Круглый стол в рамках клуба AI Productivity на Yandex Dev Day&Night 2026. Обсуждение роли AI-агентов в разработке.'
      ),
      link: 'https://dev.go.yandex/events/day-night',
      buttonText: loc('Learn more', 'Узнать больше')
    },
    {
      type: 'talk',
      typeLabel: loc('Talk', 'Доклад'),
      date: '2026',
      title: loc(
        'From Chaos to Order: Building a Unified AI Workflow for Development',
        'От хаоса к порядку: построение единого AI-workflow для разработки'
      ),
      description: loc(
        'Hosting the open session of Podlodka AI Crew #2. Practices for building an effective AI workflow.',
        'Веду открытой сессии Podlodka AI Crew #2. Практики построения эффективного AI-воркфлоу.'
      ),
      link: 'https://www.youtube.com/watch?v=igYb8BwMTA4',
      buttonText: loc('Watch', 'Смотреть')
    },
    {
      type: 'talk',
      typeLabel: loc('Talk', 'Доклад'),
      date: '2025',
      title: loc(
        'Do No Harm: Using AI Tools Productively',
        'Не навреди: как использовать AI-инструменты с пользой'
      ),
      description: loc(
        'AI Dev Day Yandex 2025. On a responsible approach to integrating AI into workflows.',
        'AI Dev Day Yandex 2025. О ответственном подходе к внедрению AI в рабочие процессы.'
      ),
      link: 'https://www.youtube.com/watch?v=R_fxvvPY4RU',
      buttonText: loc('Watch', 'Смотреть')
    },
    {
      type: 'workshop',
      typeLabel: loc('Booth', 'Стенд'),
      date: '2026',
      title: loc('userver. Vibe Coding with userver', 'userver. Вайбкодим с userver'),
      description: loc(
        'Organizing and running a userver booth at Cpp Russia 2026.',
        'Организация и проведение стенда по userver на Cpp Russia 2026.'
      ),
      link: 'https://cppconf.ru/talks/20010113-userver-part-1/',
      buttonText: loc('Learn more', 'Узнать больше')
    },
    {
      type: 'workshop',
      typeLabel: loc('Booth', 'Стенд'),
      date: '2025',
      title: loc('userver. Vibe Coding with userver', 'userver. Вайбкодим с userver'),
      description: loc(
        'Participating in organizing and running a userver booth at CP Zero Cost Conf 2025.',
        'Участие в организации и проведении стенда по userver на CPP Zero Cost Conf 2025.'
      ),
      link: 'https://cppzerocostconf.yandex.ru/2025',
      buttonText: loc('Learn more', 'Узнать больше')
    }
  ])

  const articlesRaw = ref<Article[]>([
    {
      date: loc('September 2025', 'Сентябрь 2025'),
      tag: loc('Yandex Blog', 'Блог Яндекса'),
      title: loc(
        'Engineering Culture vs. Vibe Coding: How to Make AI Work for You',
        'Engineering culture vs. Vibe Coding: как AI меняет подход к разработке'
      ),
      description: loc(
        'Reflections on the balance between the productivity of AI tools and preserving engineering culture. When vibe coding helps and when it harms.',
        'Размышления о балансе между продуктивностью AI-инструментов и сохранением инженерной культуры. Когда vibe coding помогает, а когда вредит.'
      ),
      link: 'https://dev.go.yandex/blog/engineering-culture-vs-vibe-coding-2025-09-30',
      englishLink: 'https://articles.rexarrior.fun/engineering-culture-vs-vibe-coding/',
      buttonText: loc('Read original →', 'Читать →')
    }
  ])

  // Add a new public demo here only after its independent deployment is ready.
  const projectsRaw = ref<Project[]>([])

  const nameValue = computed(() => tr(name))
  const companyValue = computed(() => tr(company))
  const bio = computed(() => tr(bioRaw))
  const aboutExtra = computed(() => aboutExtraRaw.map(tr))

  const experience = computed(() =>
    experienceRaw.value.map((e) => ({
      slug: e.slug,
      title: tr(e.title),
      company: tr(e.company),
      period: tr(e.period),
      description: tr(e.description),
      tags: e.tags,
      intro: e.intro ? tr(e.intro) : undefined,
      details: e.details?.map((d) => ({ heading: tr(d.heading), body: tr(d.body) }))
    }))
  )

  const skills = computed(() =>
    skillsRaw.value.map((s) => ({
      name: s.name,
      icon: s.icon,
      level: tr(s.level),
      description: s.description
    }))
  )

  const education = computed(() => ({
    university: tr(educationRaw.university),
    name: tr(educationRaw.name),
    degree: tr(educationRaw.degree),
    period: educationRaw.period
  }))

  const talks = computed(() =>
    talksRaw.value.map((t) => ({
      type: t.type,
      typeLabel: tr(t.typeLabel),
      date: t.date,
      title: tr(t.title),
      description: tr(t.description),
      link: t.link,
      buttonText: tr(t.buttonText)
    }))
  )

  const articles = computed(() =>
    articlesRaw.value.map((a) => ({
      date: tr(a.date),
      tag: tr(a.tag),
      title: tr(a.title),
      description: tr(a.description),
      link: a.link,
      englishLink: a.englishLink,
      buttonText: tr(a.buttonText)
    }))
  )

  const projects = computed(() =>
    projectsRaw.value.map((project) => ({
      slug: project.slug,
      title: tr(project.title),
      description: tr(project.description),
      url: project.url,
      sourceUrl: project.sourceUrl,
      tags: project.tags
    }))
  )

  function findExperience(slug: string) {
    return experience.value.find((e) => e.slug === slug)
  }

  return {
    name: nameValue,
    title,
    company: companyValue,
    bio,
    aboutExtra,
    tagline,
    experience,
    skills,
    education,
    contacts,
    talks,
    articles,
    projects,
    findExperience
  }
})
