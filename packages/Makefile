SHELL := /bin/bash

PACKAGES := monstrino-core monstrino-models monstrino-repositories monstrino-contracts \
            monstrino-api monstrino-infra monstrino-testing

.PHONY: git-status-all git-pull-all git-push-all git-fetch-all git-log-all git-diff-all

# Show git status for every package
git-status-all:
	@for pkg in $(PACKAGES); do \
		echo ""; \
		echo "══════════════════════════════════════"; \
		echo "  $$pkg"; \
		echo "══════════════════════════════════════"; \
		git -C $$pkg status --short; \
	done

# Pull latest changes in every package
git-pull-all:
	@for pkg in $(PACKAGES); do \
		echo ""; \
		echo "── pulling $$pkg ──"; \
		git -C $$pkg pull --rebase || echo "  [WARN] pull failed for $$pkg"; \
	done

# Push all commits in every package
git-push-all:
	@for pkg in $(PACKAGES); do \
		echo ""; \
		echo "── pushing $$pkg ──"; \
		git -C $$pkg push || echo "  [WARN] push failed for $$pkg"; \
	done

# Fetch remote state without merging (safe, no side effects)
git-fetch-all:
	@for pkg in $(PACKAGES); do \
		echo "── fetching $$pkg ──"; \
		git -C $$pkg fetch --all --prune 2>&1 | tail -1; \
	done

# Show last 5 commits per package
git-log-all:
	@for pkg in $(PACKAGES); do \
		echo ""; \
		echo "══════════════════════════════════════"; \
		echo "  $$pkg"; \
		echo "══════════════════════════════════════"; \
		git -C $$pkg log --oneline -5; \
	done

# Show unstaged/staged diffs per package
git-diff-all:
	@for pkg in $(PACKAGES); do \
		DIFF=$$(git -C $$pkg diff --stat); \
		if [ -n "$$DIFF" ]; then \
			echo ""; \
			echo "── $$pkg ──"; \
			echo "$$DIFF"; \
		fi; \
	done

# Check packages with uncommitted changes (dirty working tree)
git-dirty:
	@FOUND=0; \
	for pkg in $(PACKAGES); do \
		STATUS=$$(git -C $$pkg status --porcelain); \
		if [ -n "$$STATUS" ]; then \
			FOUND=1; \
			echo ""; \
			echo "── $$pkg has uncommitted changes ──"; \
			echo "$$STATUS"; \
		fi; \
	done; \
	if [ $$FOUND -eq 0 ]; then echo "All packages are clean."; fi

# Check packages with unpushed commits
git-unpushed:
	@FOUND=0; \
	for pkg in $(PACKAGES); do \
		COUNT=$$(git -C $$pkg rev-list @{u}..HEAD 2>/dev/null | wc -l | tr -d ' '); \
		if [ "$$COUNT" -gt 0 ] 2>/dev/null; then \
			FOUND=1; \
			echo "$$pkg: $$COUNT unpushed commit(s)"; \
			git -C $$pkg log --oneline @{u}..HEAD; \
		fi; \
	done; \
	if [ $$FOUND -eq 0 ]; then echo "All packages are up to date."; fi

# Commit all changes in every package with a default message
git-commit-all:
	@for pkg in $(PACKAGES); do \
		STATUS=$$(git -C $$pkg status --porcelain); \
		if [ -n "$$STATUS" ]; then \
			echo "── committing $$pkg ──"; \
			git -C $$pkg add . && git -C $$pkg commit -m "chore: quick save" || echo "  [WARN] commit failed for $$pkg"; \
		fi; \
	done

# Full overview: dirty + unpushed in one call
git-overview: git-dirty git-unpushed
