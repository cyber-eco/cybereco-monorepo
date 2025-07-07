# CyberEco Monorepo Makefile
# NX-powered monorepo build automation

# Colors for output
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[0;33m
BLUE=\033[0;34m
PURPLE=\033[0;35m
CYAN=\033[0;36m
NC=\033[0m # No Color

# Default target
.DEFAULT_GOAL := help

# Apps and their ports
HUB_PORT=40000
WEBSITE_PORT=40001
JUSTSPLIT_PORT=40002

#########################
# Help & Documentation
#########################

.PHONY: help
help: ## Show this help message
	@echo "${CYAN}CyberEco Monorepo - Available Commands${NC}"
	@echo "${CYAN}=====================================>${NC}"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "${GREEN}%-20s${NC} %s\n", $$1, $$2}'
	@echo ""
	@echo "${YELLOW}App Ports:${NC}"
	@echo "  Hub:       http://localhost:${HUB_PORT}"
	@echo "  Website:   http://localhost:${WEBSITE_PORT}"
	@echo "  JustSplit: http://localhost:${JUSTSPLIT_PORT}"
	@echo ""
	@echo "${YELLOW}Firebase Emulator Ports:${NC}"
	@echo "  Auth:      http://localhost:9099"
	@echo "  Firestore: http://localhost:8080"
	@echo "  UI:        http://localhost:5002"

#########################
# Installation & Setup
#########################

.PHONY: install
install: ## Install all dependencies
	@echo "${CYAN}Installing dependencies...${NC}"
	npm install

.PHONY: clean
clean: ## Clean NX cache and build artifacts
	@echo "${YELLOW}Cleaning NX cache...${NC}"
	nx reset
	@echo "${GREEN}Cache cleaned!${NC}"

.PHONY: clean-all
clean-all: clean ## Clean everything including node_modules
	@echo "${YELLOW}Removing node_modules...${NC}"
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf libs/*/node_modules
	@echo "${GREEN}All cleaned!${NC}"

#########################
# Development - Main
#########################

.PHONY: dev
dev: ## Start all apps with Firebase emulators (data persists) - DEFAULT
	@echo "${CYAN}Starting development environment with Firebase emulators...${NC}"
	npm run dev

.PHONY: dev-lan
dev-lan: ## Start all apps accessible on local network (0.0.0.0)
	@echo "${CYAN}Starting LAN-accessible development environment...${NC}"
	npm run dev:lan

.PHONY: dev-clean
dev-clean: ## Start with fresh Firebase data (no persistence)
	@echo "${CYAN}Starting clean development environment...${NC}"
	npm run dev:clean

.PHONY: dev-nosim
dev-nosim: ## Start apps without Firebase emulators
	@echo "${CYAN}Starting apps without Firebase emulators...${NC}"
	npm run dev:nosim

#########################
# Development - Individual Apps
#########################

.PHONY: dev-hub
dev-hub: ## Start only Hub app
	@echo "${BLUE}Starting Hub app on port ${HUB_PORT}...${NC}"
	nx serve hub

.PHONY: dev-website
dev-website: ## Start only Website app
	@echo "${GREEN}Starting Website app on port ${WEBSITE_PORT}...${NC}"
	cd apps/website && npm run dev

.PHONY: dev-justsplit
dev-justsplit: ## Start only JustSplit app
	@echo "${YELLOW}Starting JustSplit app on port ${JUSTSPLIT_PORT}...${NC}"
	cd apps/justsplit && npm run dev

#########################
# Firebase Emulators
#########################

.PHONY: emulators
emulators: ## Start Firebase emulators with data persistence
	@echo "${RED}Starting Firebase emulators with data persistence...${NC}"
	npm run emulators

.PHONY: emulators-core
emulators-core: ## Start only Auth and Firestore emulators
	@echo "${RED}Starting core Firebase emulators...${NC}"
	npm run emulators:core

.PHONY: emulators-hosting
emulators-hosting: ## Start emulators with hosting
	@echo "${RED}Starting Firebase emulators with hosting...${NC}"
	npm run emulators:hosting

#########################
# Building
#########################

.PHONY: build
build: ## Build all applications
	@echo "${CYAN}Building all applications...${NC}"
	npm run build

.PHONY: build-hub
build-hub: ## Build Hub app
	@echo "${BLUE}Building Hub app...${NC}"
	nx build hub --configuration=production

.PHONY: build-website
build-website: ## Build Website app (uses npm directly due to NX issue)
	@echo "${GREEN}Building Website app...${NC}"
	cd apps/website && npm run build

.PHONY: build-justsplit
build-justsplit: ## Build JustSplit app
	@echo "${YELLOW}Building JustSplit app...${NC}"
	nx build justsplit-app --configuration=production

.PHONY: build-affected
build-affected: ## Build only affected projects
	@echo "${CYAN}Building affected projects...${NC}"
	nx affected:build --base=main

#########################
# Testing
#########################

.PHONY: test
test: ## Run all tests
	@echo "${CYAN}Running all tests...${NC}"
	npm run test

.PHONY: test-affected
test-affected: ## Test only affected projects
	@echo "${CYAN}Testing affected projects...${NC}"
	nx affected:test --base=main

.PHONY: test-coverage
test-coverage: ## Run tests with coverage
	@echo "${CYAN}Running tests with coverage...${NC}"
	nx run-many --target=test --all --coverage

.PHONY: test-hub
test-hub: ## Test Hub app
	@echo "${BLUE}Testing Hub app...${NC}"
	cd apps/hub && npm test

.PHONY: test-website
test-website: ## Test Website app
	@echo "${GREEN}Testing Website app...${NC}"
	cd apps/website && npm test

.PHONY: test-justsplit
test-justsplit: ## Test JustSplit app
	@echo "${YELLOW}Testing JustSplit app...${NC}"
	cd apps/justsplit && npm test

.PHONY: test-watch
test-watch: ## Run tests in watch mode
	@echo "${CYAN}Running tests in watch mode...${NC}"
	@echo "Select app to test:"
	@echo "1) Hub"
	@echo "2) Website"
	@echo "3) JustSplit"
	@read -p "Enter choice (1-3): " choice; \
	case $$choice in \
		1) cd apps/hub && npm test -- --watch ;; \
		2) cd apps/website && npm test -- --watch ;; \
		3) cd apps/justsplit && npm test -- --watch ;; \
		*) echo "Invalid choice" ;; \
	esac

#########################
# Linting & Code Quality
#########################

.PHONY: lint
lint: ## Lint all projects
	@echo "${CYAN}Linting all projects...${NC}"
	npm run lint

.PHONY: lint-affected
lint-affected: ## Lint only affected projects
	@echo "${CYAN}Linting affected projects...${NC}"
	nx affected:lint --base=main

.PHONY: lint-fix
lint-fix: ## Fix linting issues
	@echo "${CYAN}Fixing linting issues...${NC}"
	nx run-many --target=lint --all --fix

#########################
# Deployment
#########################

.PHONY: deploy-all
deploy-all: build ## Deploy all applications
	@echo "${PURPLE}Deploying all applications...${NC}"
	./scripts/deploy-all.sh

.PHONY: deploy-hub
deploy-hub: build-hub ## Deploy Hub app
	@echo "${BLUE}Deploying Hub app...${NC}"
	./scripts/deploy-hub.sh

.PHONY: deploy-website
deploy-website: build-website ## Deploy Website app
	@echo "${GREEN}Deploying Website app...${NC}"
	./scripts/deploy-website.sh

.PHONY: deploy-justsplit
deploy-justsplit: build-justsplit ## Deploy JustSplit app
	@echo "${YELLOW}Deploying JustSplit app...${NC}"
	./scripts/deploy-justsplit.sh

.PHONY: deploy-production
deploy-production: ## Deploy to production (requires confirmation)
	@echo "${RED}⚠️  WARNING: Deploying to PRODUCTION ⚠️${NC}"
	@read -p "Are you sure you want to deploy to production? (y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		./scripts/deploy-production.sh; \
	else \
		echo "Deployment cancelled."; \
	fi

#########################
# NX Utilities
#########################

.PHONY: deps-graph
deps-graph: ## View interactive dependency graph
	@echo "${CYAN}Opening dependency graph...${NC}"
	nx dep-graph

.PHONY: affected-apps
affected-apps: ## Show affected apps
	@echo "${CYAN}Affected apps:${NC}"
	nx affected:apps --base=main

.PHONY: affected-libs
affected-libs: ## Show affected libraries
	@echo "${CYAN}Affected libraries:${NC}"
	nx affected:libs --base=main

.PHONY: format
format: ## Format code with Prettier
	@echo "${CYAN}Formatting code...${NC}"
	nx format:write

.PHONY: format-check
format-check: ## Check code formatting
	@echo "${CYAN}Checking code format...${NC}"
	nx format:check

#########################
# Library Management
#########################

.PHONY: create-component
create-component: ## Create a new shared component
	@read -p "Component name: " name; \
	nx g @nx/react:component $$name --project=ui-components --export

.PHONY: create-lib
create-lib: ## Create a new library
	@echo "Library type:"
	@echo "1) TypeScript"
	@echo "2) React"
	@read -p "Enter choice (1-2): " type; \
	read -p "Library name: " name; \
	case $$type in \
		1) nx g @nx/js:library $$name --directory=libs ;; \
		2) nx g @nx/react:library $$name --directory=libs ;; \
		*) echo "Invalid choice" ;; \
	esac

#########################
# Maintenance
#########################

.PHONY: update-deps
update-deps: ## Update dependencies
	@echo "${CYAN}Checking for dependency updates...${NC}"
	npm update

.PHONY: validate-i18n
validate-i18n: ## Validate translations
	@echo "${CYAN}Validating translations...${NC}"
	npm run i18n:validate

.PHONY: check-all
check-all: lint test build ## Run all checks (lint, test, build)
	@echo "${GREEN}All checks passed!${NC}"

.PHONY: setup-hostname
setup-hostname: ## Setup hostname for development
	@echo "${CYAN}Setting up hostname...${NC}"
	./scripts/setup-hostname.sh

#########################
# Quick Commands
#########################

.PHONY: hub
hub: dev-hub ## Alias for dev-hub

.PHONY: website
website: dev-website ## Alias for dev-website

.PHONY: justsplit
justsplit: dev-justsplit ## Alias for dev-justsplit

.PHONY: all
all: dev ## Alias for dev

.PHONY: build-and-deploy
build-and-deploy: check-all deploy-all ## Build, test, and deploy all apps