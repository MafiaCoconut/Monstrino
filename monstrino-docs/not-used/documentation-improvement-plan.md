# Documentation Improvement Plan

> Полный аудит и план доработки документации Monstrino.
> Цель: подготовить документацию к техническому собеседованию на повышение.
> Дата аудита: 2026-03-07

---

## Контекст

На собеседовании будут смотреть:
- навыки архитектуры большого проекта (senior-level)
- принятие инженерных решений
- использование AI как опытный разработчик
- стратегическое продумывание на несколько этапов вперёд

Аудитория: опытные разработчики 30-40 лет + владелец фирмы.

---

## Текущий статус документации

| Метрика                         | Значение                  |
|---------------------------------|---------------------------|
| Файлов с отличным контентом     | ~15                       |
| Файлов с хорошим контентом      | ~10                       |
| Стабов / заглушек               | ~8                        |
| Полностью пустых файлов / папок | ~5                        |
| Документов по AI                | 0 (критический пробел)    |
| Service Reality документов      | 0                         |
| Roadmap документов              | 0 (стабы по 2 строки)     |
| Reflection документов           | 0                         |

Архитектурная часть docs/ — **70-80% готовности**, dev-notes — **50-60%**.

---

# ПРИОРИТЕТ 1 — Критично для собеседования

## 1. Создать секцию docs/ai-features/ (AI в проекте)

Полностью отсутствует. Нужно создать 3-4 документа:

### 1a. docs/ai-features/ai-strategy.md
- [ ] Общая стратегия использования AI в проекте
- [ ] Почему AI assistive, а не core dependency
- [ ] Как AI изолирован от основной логики
- [ ] Границы ответственности AI в системе

### 1b. docs/ai-features/ai-orchestrator.md
- [ ] Описание планируемого ai-orchestrator сервиса
- [ ] Какие задачи он решает (text enrichment, image processing)
- [ ] Архитектура: как вызывается из других сервисов
- [ ] Почему централизованный gateway, а не встроенный AI в каждый сервис

### 1c. docs/ai-features/llm-enrichment-pipeline.md
- [ ] Как LLM используется в catalog-data-enrichter
- [ ] Конкретные use cases: character enrichment, series enrichment, content type etc
- [ ] Сценарии и промпты (высокоуровнево)
- [ ] Обработка ошибок и non-deterministic outputs

### 1d. docs/ai-features/ai-image-processing.md
- [ ] AI для обработки изображений: background removal, segmentation, upscaling
- [ ] Интеграция с media-normalizator
- [ ] Локальные модели vs cloud API (Ollama, vision models)
- [ ] Операционные особенности: ручной запуск AI-сервера

---

## 2. Дописать market-ingestion-pipeline.md

**Файл:** `docs/pipelines/market-ingestion-pipeline.md`
**Текущее состояние:** ПОЛНОСТЬЮ ПУСТОЙ

- [ ] Описание pipeline для сбора цен
- [ ] Стадии: discovery → collection → parsing → storage
- [ ] PriceParserPort и расширяемость
- [ ] Связь с catalog-api-service для resolve release identity
- [ ] processing_state model для market pipeline
- [ ] Отличия от catalog pipeline

---

## 3. Расширить ADR-009 (LLM as Assistive Processing Component)

**Файл:** `dev-notes/decisions/product-strategy/adr-002.md`
**Текущее состояние:** СТАБ — 5 строк контента

- [ ] Расширить контекст: почему LLM нужен, какие проблемы решает
- [ ] Описать альтернативы: rule-based only, LLM-driven architecture, hybrid
- [ ] Подробные consequences
- [ ] Связь с ai-orchestrator и llm-gateway
- [ ] Примеры enrichment сценариев
- [ ] Почему non-deterministic outputs требуют изоляции

---

## 4. Обновить docs/intro.md

**Файл:** `docs/intro.md`
**Текущее состояние:** УСТАРЕВШИЙ

Проблемы:
- [ ] Убрать упоминания "Feature-Sliced Design (FSD)"
- [ ] Убрать упоминание "Sandbox"
- [ ] Исправить нерабочие ссылки в Quick Start (DocCard)
- [ ] Добавить секцию про AI features
- [ ] Обновить Documentation Structure чтобы отражать реальные секции
- [ ] Привести в соответствие с текущей архитектурой

---

## 5. Заполнить docs/pipelines/llm-pipelines/

**Папка:** `docs/pipelines/llm-pipelines/`
**Текущее состояние:** ПУСТАЯ ПАПКА

- [ ] Создать документ описывающий LLM pipeline
- [ ] Или перенаправить в ai-features если дублирование

---

# ПРИОРИТЕТ 2 — Важно для впечатления "senior architecture"

## 6. Написать roadmap (short-term + long-term)

**Файлы:**
- `dev-notes/roadmap/short-term.md` — СТАБ (2 строки)
- `dev-notes/roadmap/long-term.md` — СТАБ (2 строки)

### short-term.md
- [ ] Ближайшие архитектурные приоритеты
- [ ] Что стабилизируется, что запускается
- [ ] Media pipeline completion
- [ ] Market pipeline launch
- [ ] AI enrichment integration

### long-term.md
- [ ] Стратегическое видение платформы
- [ ] Масштабирование инфраструктуры
- [ ] Community / social features
- [ ] Public API
- [ ] Multi-server deployment

---

## 7. Расширить 6 стаб-ADR до полного формата

Каждый из этих ADR имеет правильную структуру, но контент — 2-3 предложения.
Нужно расширить до уровня ADR-001/002/003.

| ADR | Файл | Что нужно |
|-----|------|-----------|
| ADR-004 (Unit of Work) | `decisions/architecture/adr-004.md` | Добавить больше контекста, 2-3 альтернативы, подробные consequences |
| ADR-005 (Generic BaseRepo) | `decisions/data-ingestion/adr-001.md` | Расширить контекст, добавить альтернативы |
| ADR-006 (Sandbox Testing) | `decisions/architecture/adr-006.md` ИЛИ `decisions/data-ingestion/adr-002.md` | Расширить + убрать дубликат |
| ADR-007 (Contracts→Commands) | `decisions/architecture/adr-006.md` (!) | Расширить контекст, добавить примеры flow |
| ADR-008 (Defer Auth) | `decisions/product-strategy/adr-001.md` | Расширить reasoning |
| ADR-010 (k3s Namespaces) | `decisions/product-strategy/adr-003.md` | Добавить альтернативы, инфра-контекст |

---

## 8. Создать 1-2 reflections

**Папка:** `dev-notes/reflections/`
**Текущее состояние:** ПУСТО (только _category_.json)

Предложения:
- [ ] `reflection-on-data-modeling.md` — эволюция ParsedRelease v1→v3, чему научился
- [ ] `reflection-on-shared-packages.md` — плюсы и минусы shared packages после реальной работы

---

## 9. Создать service-reality документы

В `dev-notes/intro.md` описана концепция "Service Reality", но **ни одного документа нет**.
Нужны хотя бы для ключевых сервисов:

- [ ] `catalog-collector` — самый зрелый сервис
- [ ] `catalog-importer` — ядро domain population
- [ ] `catalog-api-service` — domain API boundary
- [ ] `llm-gateway` — AI/LLM сервис (важно для собеседования)

Где размещать: создать `dev-notes/services/` или `dev-notes/service-reality/`

---

## 10-12. Дописать package-reality документы

### 10. package-monstrino-contracts.md
**Текущее состояние:** СРЕДНИЙ — нет секций Guarantees, Non-Guarantees, Failure Modes

- [ ] Добавить Guarantees
- [ ] Добавить Non-Guarantees
- [ ] Добавить Usage Constraints
- [ ] Добавить Failure Modes
- [ ] Описать конкретные контракты которые определены

### 11. package-monstrino-models.md
**Текущее состояние:** СРЕДНИЙ — нет секций Guarantees, Non-Guarantees, Failure Modes

- [ ] Добавить Guarantees
- [ ] Добавить Non-Guarantees
- [ ] Добавить Usage Constraints
- [ ] Добавить Failure Modes
- [ ] Описать основные ORM модели и домены

### 12. package-monstrino-infra.md
**Текущее состояние:** СРЕДНИЙ — не описывает реальный контент

- [ ] Описать parser registry (ReleaseParserPort, PriceParserPort)
- [ ] Описать API-клиенты к конкретным сервисам
- [ ] Описать source-specific parsers
- [ ] Описать token verification и auth setup
- [ ] Обновить "What This Package Owns" с конкретикой

---

# ПРИОРИТЕТ 3 — Порядок и polish

## 13. Исправить filename vs ADR ID mismatch

Текущие несоответствия имён файлов и внутренних ID:

| Файл | Содержит | Проблема |
|------|----------|----------|
| `architecture/adr-006.md` | ADR-007 (Contracts→Commands) | Имя файла не соответствует ADR ID |
| `architecture/adr-007.md` | ADR-011 (Early Price Collection) | Имя файла не соответствует ADR ID |
| `data-ingestion/adr-001.md` | ADR-005 (Generic BaseRepo) | Не относится к data ingestion |
| `data-ingestion/adr-002.md` | ADR-006 (Sandbox Testing) | Не относится к data ingestion, дубликат |

- [ ] Переименовать файлы чтобы имя совпадало с ADR ID
- [ ] Или переорганизовать всё в единую плоскую структуру ADR

---

## 14. Перенести неправильно расположенные ADR

- [ ] ADR-005 (Generic BaseRepo): из `data-ingestion/` в `architecture/`
- [ ] ADR-006 (Sandbox Testing): из `data-ingestion/` в `architecture/` (и убрать дубликат)

---

## 15. Убрать дублирование ADR-006

**Проблема:** ADR-006 (Sandbox Testing) существует в двух копиях:
- `decisions/data-ingestion/adr-002.md`
- `decisions/architecture/adr-006.md` (но тут на самом деле ADR-007!)

- [ ] Оставить одну копию в правильном месте
- [ ] Удалить дубликат

---

## 16. Заполнить или убрать пустые папки

| Папка | Текущее состояние | Действие |
|-------|-------------------|----------|
| `decisions/adrs/` | Только _category_.json | Убрать или использовать как общий индекс |
| `decisions/infra-platform/` | Только _category_.json | Заполнить (ADR-010 здесь?) или убрать |

---

## 17. Проверить img/ ссылки в docs

Несколько документов ссылаются на изображения:
- `02-system-context.md` → `/img/architecture/system-context-diagram.jpg`
- `03-container-architecture.md` → `/img/architecture/container-architecture.jpg`
- `06-security-boundaries.md` → `/img/architecture/trust-boundary-diagram.jpg`
- `ingestion-architecture.md` → `/img/pipelines/ingestion-pipeline.jpg`

- [ ] Проверить что все изображения существуют в `static/img/`
- [ ] Если нет — создать или убрать битые ссылки

---

## 18. Раскомментировать блок в container-architecture.md

**Файл:** `docs/architecture/03-container-architecture.md`

Внизу файла закомментирован блок "Relationship to Other Architecture Documents":
```html
<!-- --- ## Relationship to Other Architecture Documents ... -->
```

- [ ] Раскомментировать
- [ ] Обновить ссылки на актуальные документы
- [ ] Убрать ссылки на несуществующие страницы

---

## 19. dev-notes/architecture/boundaries.md — расширить

**Текущее состояние:** Слишком лаконичный (5 коротких секций по 2-3 строки)

- [ ] Добавить примеры кода или конкретные сценарии
- [ ] Связать с ADR-003 и ADR-007
- [ ] Либо объединить с другими architecture документами если дублирует

---

## 20. dev-notes/architecture/data-flow.md — расширить

**Текущее состояние:** Только ASCII flow + 4 bullet points + 4 failure handling points

- [ ] Добавить Mermaid-диаграмму вместо ASCII
- [ ] Расширить описание каждого шага
- [ ] Добавить flow для media и market пайплайнов
- [ ] Или отметить что детали в pipeline-документах

---

# Что НЕ нужно трогать (уже отлично)

Эти файлы полностью готовы и не требуют изменений:

- `docs/architecture/01-architecture-overview.md` (439 строк, отличный)
- `docs/architecture/06-security-boundaries.md`
- `docs/architecture/07-scalability-strategy.md`
- `docs/architecture/08-deployment-architecture.md`
- `docs/architecture/09-observability.md`
- `docs/pipelines/data-ingestion/catalog-ingestion-pipeline.md` (355 строк)
- `docs/pipelines/data-ingestion/media-ingestion-pipeline.md`
- `dev-notes/architecture/microservices.md`
- `dev-notes/trade-offs/tradeoffs.md`
- `dev-notes/failures/failures.md`
- `dev-notes/decisions/decisions.md` (индекс ADR)
- ADR-001, ADR-002, ADR-003, ADR-011 (полные, детальные)
- package-monstrino-core.md, package-monstrino-repositories.md, package-monstrino-testing.md, package-monstrino-api.md

---

# Рекомендуемый порядок работы

1. **AI секция** (пункты 1, 3, 5) — самый большой пробел для собеседования
2. **Пустые файлы** (пункты 2, 6) — пустые файлы бросаются в глаза
3. **intro.md** (пункт 4) — первое что увидит reviewer
4. **Service reality + reflections** (пункты 8, 9) — показывают senior mindset
5. **Стаб-ADR** (пункт 7) — расширить до полного формата
6. **Package reality** (пункты 10-12) — дописать недостающие секции
7. **Организация и polish** (пункты 13-20) — финальная чистка
