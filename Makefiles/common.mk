# ========================================
# Common Monstrino Makefile Constants
# ========================================

SELF_DIR := $(realpath $(dir $(lastword $(MAKEFILE_LIST))))

define find_root
$(shell \
    dir=$(SELF_DIR); \
    while [ "$$dir" != "/" ]; do \
        if [ -d "$$dir/Makefiles" ]; then echo $$dir; exit 0; fi; \
        dir=$$(dirname $$dir); \
    done; \
)
endef

ROOT_DIR ?= $(call find_root)

ifeq ($(ROOT_DIR),)
$(error ❌ Could not locate Monstrino root directory)
endif

export ROOT_DIR

PACKAGES_DIR := $(ROOT_DIR)/packages
export PACKAGES_DIR

define log
	@echo "[$(1)] $(2)"
endef

define assert-var
	@if [ -z "$($(1))" ]; then \
		echo "❌ Missing required variable: $(1)"; \
		exit 1; \
	fi
endef
