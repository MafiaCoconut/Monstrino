.PHONY: dev-mode-on dev-mode-off clean-venv dev-sync-hard deps-mode-on deps-mode-off git-lock git-unlock

# Стандартные настройки
PROD_FILE := pyproject.toml
DEV_FILE := pyproject.dev.toml
UV_COMMAND := uv sync

# =================================================================
# 1. БАЗОВЫЕ ОПЕРАЦИИ (Включение/Выключение режима для текущей папки)
# =================================================================

dev-mode-on:
	@if [ -f $(DEV_FILE) ]; then \
		echo "🔧 [Self] Включаем DEV-режим в $(shell pwd)..."; \
		cp $(DEV_FILE) $(PROD_FILE); \
	else \
		echo "⚠️ $(DEV_FILE) не найден, пропускаем."; \
	fi

dev-mode-off:
	@echo "🧊 [Self] Восстанавливаем PROD в $(shell pwd)..."
	@git checkout -- $(PROD_FILE) || true

clean-venv:
	@echo "❌ Удаление .venv..."
	@rm -rf .venv

git-lock:
	@git update-index --assume-unchanged $(PROD_FILE)

git-unlock:
	@git update-index --no-assume-unchanged $(PROD_FILE)

# =================================================================
# 2. УПРАВЛЕНИЕ ЗАВИСИМОСТЯМИ (Рекурсивный вызов)
# =================================================================

# Пробегает по списку путей в переменной LOCAL_DEPS и вызывает там make dev-mode-on
deps-mode-on:
	@$(foreach path,$(LOCAL_DEPS), \
		echo "🔄 [Deps] Включаем DEV-режим в зависимости: $(path)"; \
		$(MAKE) -C $(path) dev-mode-on; \
	)

# Пробегает по списку путей и вызывает make dev-mode-off
deps-mode-off:
	@$(foreach path,$(LOCAL_DEPS), \
		echo "🔄 [Deps] Выключаем DEV-режим в зависимости: $(path)"; \
		$(MAKE) -C $(path) dev-mode-off; \
	)

# =================================================================
# 3. ГЛАВНАЯ КОМАНДА СИНХРОНИЗАЦИИ (Оркестратор)
# =================================================================

dev-sync-hard: clean-venv
	@echo "🚀 НАЧАЛО СИНХРОНИЗАЦИИ..."

	@# 1. Включаем dev-режим у зависимостей
	@$(MAKE) deps-mode-on

	@# 2. Включаем dev-режим у себя
	@$(MAKE) dev-mode-on

	@# 3. Запускаем UV. Если ошибка - обязательно откатываем всё назад!
	@echo "📦 Запуск UV Sync..."
	@$(UV_COMMAND) || ( \
		echo "💥 ОШИБКА! Откат изменений..."; \
		$(MAKE) dev-mode-off; \
		$(MAKE) deps-mode-off; \
		exit 1 \
	)

	@# 4. Восстанавливаем всё как было
	@$(MAKE) dev-mode-off
	@$(MAKE) deps-mode-off

	@echo "✅ УСПЕХ! Окружение готово."
