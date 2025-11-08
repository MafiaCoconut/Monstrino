# ============================================
# ‖  Monstrino Packages Management (Shared)  ‖
# ============================================

define SWITCH_DEV
switch-$(1)-dev:
	@echo "🔧 Switching $(1) to local editable path..."
	poetry remove $(1) || true
	poetry add --editable $(2)
	@echo "✅ $(1) installed locally (editable)."
endef

define SWITCH_PROD
switch-$(1)-prod:
	@echo "🚀 Installing $(1) from Git ($(3))..."
	poetry remove $(1) || true
	poetry add git+ssh://$(4)
	@echo "✅ $(1) installed from Git."
endef