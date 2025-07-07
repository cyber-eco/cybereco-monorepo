# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this CyberEco NX monorepo. 

**📋 RECENT CLEANUP STATUS:** All legacy files have been cleaned from the repository as of May 30, 2025. The structure is now optimized for NX monorepo best practices.

## Project Overview

**CyberEco Monorepo** - A comprehensive platform for digital lifestyle management starting with expense splitting (JustSplit) and central authentication (Hub), expanding to priority applications like Somos (family roots explorer), Demos (community governance), and Plantopia (smart gardening). This NX-powered monorepo uses advanced caching, dependency management, and parallel execution for optimal developer experience.

## NX Monorepo Structure

This is an NX 19.8.14 monorepo with the following **cleaned and optimized** structure:
- `apps/hub` - Central authentication hub application with proxy features (Next.js, port 40000)
- `apps/website` - Main CyberEco marketing website (Next.js, port 40001)
- `apps/justsplit` - Expense splitting application (Next.js, port 40002)
- `apps/somos` - Family roots explorer application (planned, Next.js)
- `apps/demos` - Community governance application (planned, Next.js)
- `apps/plantopia` - Smart gardening application (planned, Next.js)
- `libs/shared-types` - Shared TypeScript types and interfaces
- `libs/firebase-config` - Firebase configuration utilities and multi-project helpers
- `libs/ui-components` - Shared React UI components library with theming
- `libs/shared-assets` - Shared assets including logos and brand materials
- `firebase/hub/` - Hub Firebase deployment configuration
- `firebase/justsplit/` - JustSplit Firebase deployment configuration
- `firebase/website/` - Website Firebase deployment configuration
- `tools/playwright-mcp-server/` - MCP server for visual debugging and CSS inspection
- `archived/` - Legacy code archives (old website moved here)
- `nx.json` - NX workspace configuration with caching and task runners

**⚠️ IMPORTANT:** Root-level `src/`, `public/`, and legacy config files have been removed. Each app manages its own configuration.

## Debugging Tools

### MCP Playwright Server

The monorepo includes a Model Context Protocol (MCP) server that provides powerful visual debugging capabilities:

**Location**: `tools/playwright-mcp-server/`

**Key Features**:
- **CSS Scrolling Debugger**: Detects double scrollbars and overflow issues
- **CSS Cascade Inspector**: Traces CSS rules and specificity
- **DOM Monitor**: Tracks real-time DOM changes
- **Visual Diff**: Screenshots with issue annotations

**Quick Start**:
```bash
# Build and start the MCP server
cd tools/playwright-mcp-server
npm install && npm run build
npm run dev

# Configure with Claude Code CLI
claude mcp add playwright-debugger node $(pwd)/dist/server.js

# Use for debugging
claude mcp call playwright-debugger debug-css-scrolling --url "http://localhost:40001/documentation"
```

**Common Use Cases**:
- Debug double scrollbar issues in documentation pages
- Analyze CSS cascade and specificity conflicts
- Monitor DOM mutations during user interactions
- Capture visual regressions with annotated screenshots

See `docs/development/development-workflow.md` for detailed usage instructions.

## Development Commands

### NX Commands
- `npm install` - Install all dependencies across the monorepo
- `nx serve <project>` - Start specific app in development mode
- `nx build <project>` - Build specific app or library
- `nx test <project>` - Run tests for specific project
- `nx lint <project>` - Lint specific project
- `nx dep-graph` - View interactive dependency graph
- `nx affected:test` - Test only affected projects since last commit
- `nx affected:build` - Build only affected projects since last commit
- `nx run-many --target=<target> --all` - Run target on all projects in parallel

### Root-Level npm Scripts

**🚀 Primary Development Commands:**
- `npm run dev` - **Default development**: Firebase emulators + All 3 apps + **data persistence** (RECOMMENDED)
- `npm run dev:lan` - **LAN development**: All apps available on local network (use 0.0.0.0)
- `npm run dev:clean` - **Clean slate development**: Firebase emulators + All 3 apps with fresh data each time
- `npm run dev:nosim` - **Frontend only**: Just the 3 apps without Firebase emulators

**Individual App Commands:**
- `npm run dev:website` - Start only the website app in development mode

**Build Commands:**
- `npm run build` - Build all applications (Hub, JustSplit, Website)
- `npm run build:website` - Build only the website app for production (uses working npm build)

**Testing & Linting:**
- `npm run test` - Run all tests across all projects
- `npm run lint` - Run ESLint across all projects using NX workspace config
- `npm run clean` - Reset NX cache (equivalent to `nx reset`)

### Firebase Emulator Commands
- `npm run emulators` - Start Firebase emulators with data import/export
- `npm run emulators:hosting` - Start hosting, auth, firestore, and UI emulators
- `npm run hosting:justsplit` - Start JustSplit hosting emulator
- `npm run hosting:hub` - Start Hub hosting emulator
- `npm run hosting:website` - Start Website hosting emulator
- `npm run hosting:dev:justsplit` - Start JustSplit in dev mode with hosting emulator
- `npm run hosting:dev:hub` - Start Hub in dev mode with hosting emulator
- `npm run hosting:dev:website` - Start Website in dev mode with hosting emulator

### Running Tests

**Individual App Tests:**
```bash
# Run JustSplit tests
cd apps/justsplit && npm test

# Run Hub tests  
cd apps/hub && npm test

# Run Website tests
cd apps/website && npm test

# Run specific test files
cd apps/justsplit && npm test -- --testPathPattern="timelineCalculations"

# Run with coverage
cd apps/justsplit && npm test -- --coverage

# Run in watch mode
cd apps/justsplit && npm test -- --watch
```

**All Tests (via NX):**
```bash
# Run all tests across workspace
nx run-many --target=test --all

# Run tests for specific projects
nx test justsplit-app
nx test hub
nx test website

# Run affected tests only
nx affected:test
```

**Test Environment Setup:**
- Tests use Jest with React Testing Library
- Firebase is mocked in jest.setup.js with test environment variables
- Coverage threshold is set to 70% across the platform
- Test reports are generated in `./reports/test-report.html`

### Project-Specific Commands
- `nx serve hub` - Start Hub app (port 40000)
- `nx serve website` - Start Website app (port 40001)
- `nx serve justsplit-app` - Start JustSplit app (port 40002)
- `nx build hub --configuration=production` - Production build for Hub
- `nx build justsplit-app --configuration=production` - Production build for JustSplit
- **KNOWN ISSUE**: `nx build website` - NX build fails with React rendering error during static export
- `cd apps/website && npm run build` - Working website build (use this for deployment)
- `nx run justsplit-app:emulators` - Start Firebase emulators for JustSplit
- `nx run hub:deploy` - Deploy Hub to Firebase hosting
- `nx run justsplit-app:deploy` - Deploy JustSplit to Firebase hosting
- `nx run website:deploy` - Deploy Website to Firebase hosting
- `./scripts/deploy-all.sh` - Deploy all applications
- `./scripts/deploy-website.sh` - Deploy only the website (uses working npm build)

**🧹 CLEANUP NOTES:**
- Root-level `jest.config.js`, `next.config.js` have been removed (app-specific configs remain)
- Root-level `src/` and `public/` directories removed (were outdated duplicates)
- All build artifacts and backup files cleaned (see TO_CLEANSE.md for details)

## Architecture Overview

### Monorepo Architecture
- **Monorepo Tool**: NX 19.8.14 with advanced build caching and task orchestration
- **Build System**: NX with computation caching, parallel execution (max 3), and affected commands
- **Shared Libraries**: Types, UI components, Firebase configuration, and assets in `libs/`
- **Multi-Project Firebase**: Hub for centralized auth, individual projects for app-specific data
- **Package Scope**: `@cybereco` namespace for all shared libraries
- **Deployment**: Optimized for Firebase hosting with separate hosting targets per app

### Framework Stack
- **Frontend**: Next.js 15 with App Router, TypeScript, React 18
- **Backend**: Firebase (Firestore, Auth) with multi-project support
- **Styling**: CSS Modules with shared UI components
- **Testing**: Jest with React Testing Library, 70% coverage threshold
- **Website**: Static site generation with Next.js export

### Key Architecture Patterns

**Multi-Project Firebase Setup**:
- Hub project (`firebase/hub/`) handles centralized authentication
- JustSplit project (`firebase/justsplit/`) handles expense-specific data
- Website project (`firebase/website/`) serves the static marketing site
- Shared configuration in `libs/firebase-config`
- Cross-project token verification and user management

**Single Sign-On (SSO) Implementation**:
- Development: Uses shared auth state via localStorage (`libs/auth/src/shared-auth-state.ts`)
- Production: Uses Firebase Auth with custom domains and subdomain cookies
- Hub saves auth state when users sign in, apps check this state on load
- Handles Firebase Auth emulator limitations in development
- See `docs/deployment/production-auth-setup.md` for production configuration

**Shared Libraries Structure**:
- `libs/shared-types` (`@cybereco/shared-types`) - Common TypeScript interfaces and types
- `libs/firebase-config` (`@cybereco/firebase-config`) - Firebase utilities and multi-project configuration
- `libs/ui-components` (`@cybereco/ui-components`) - Reusable React components with CSS Modules
- `libs/shared-assets` (`@cybereco/shared-assets`) - Common assets including logos and brand materials

**Context-Based State Management**:
Each app uses React Context for global state:
- `AuthProvider` - User authentication state (from hub)
- `AppProvider` - Application-wide state
- `NotificationProvider` - Toast notifications and alerts

**Component Structure**:
- App Router pages in `apps/*/src/app/`
- Reusable components in `libs/ui-components/`
- App-specific components in `apps/*/src/components/`

**Data Models**:
Core entities defined in `libs/shared-types/src/`:
- Hub entities: `AuthUser`, `HubUser`, `App`, `AppPermission`
- JustSplit entities: `User`, `Group`, `Event`, `Expense`, `Settlement`
- Somos entities (planned): `FamilyMember`, `Relationship`, `Memory`, `CulturalBackground`
- Demos entities (planned): `Community`, `Proposal`, `Vote`, `Decision`
- Plantopia entities (planned): `Plant`, `Garden`, `CareEvent`, `PlantSpecies`

**NX Project Configuration**:
- Each app/lib has a `project.json` defining build targets and executors
- Standard targets: `build`, `serve`, `dev`, `test`, `lint`, `export`
- Specialized targets: `deploy`, `emulators`, `hosting:emulator`, `hosting:dev`
- Apps use `@nx/next` executors, libraries use `@nx/js:tsc` or `@nx/react:build`
- Custom NX executors (`nx:run-commands`) for Firebase operations

### Testing Strategy

Tests are co-located with components in `__tests__` directories. Each app maintains 70% coverage. Test files use the pattern `*.test.tsx` for components and `*.test.ts` for utilities.

### Firebase Emulator Setup

Development uses Firebase emulators running on:
- Firestore: localhost:8080
- Auth: localhost:9099
- UI: localhost:5002
- Hub hosting: localhost:40000
- Website hosting: localhost:40001
- JustSplit hosting: localhost:40002

The emulator data persists in `./emulator-data/` and is automatically imported/exported on start/stop.

### Gateway Application (Cross-Port Authentication Solution)

The Gateway app (port 3000) acts as a unified entry point that proxies requests to all other apps, solving Firebase Auth's cross-port authentication issues:

**Why Gateway?**
- Firebase Auth tokens are tied to the origin (protocol + domain + port)
- Apps on different ports (40000, 40001, 40002) can't share auth state
- The gateway proxies all apps through port 3000, maintaining a single auth origin

**How it works:**
1. All apps are accessed through gateway paths:
   - `http://localhost:3000/hub` → Hub app (40000)
   - `http://localhost:3000/website` → Website (40001)
   - `http://localhost:3000/justsplit` → JustSplit (40002)
2. Auth routes are centralized through Hub:
   - `/auth/*` → Hub's auth pages
   - `/api/auth/*` → Hub's auth API
3. Firebase Auth sees all requests from the same origin (localhost:3000)

**Gateway Routes Configuration:**
- `beforeFiles`: Auth and API routes (highest priority)
- `afterFiles`: App-specific routes
- `fallback`: Default redirect to website

### Module Aliases

Each app has its own tsconfig with aliases:
- `@/components/*` → `./src/components/*`
- `@/context/*` → `./src/context/*`
- `@/utils/*` → `./src/utils/*`
- `@cybereco/shared-types` → `libs/shared-types`
- `@cybereco/firebase-config` → `libs/firebase-config`
- `@cybereco/ui-components` → `libs/ui-components`
- `@cybereco/shared-assets` → `libs/shared-assets`

## Working with NX

### Creating New Components
```bash
# In a library (use @nx instead of @nrwl)
nx g @nx/react:component Button --project=ui-components

# In an app
nx g @nx/react:component Header --project=justsplit-app
nx g @nx/react:component Dashboard --project=hub
```

### Creating New Libraries
```bash
# TypeScript library
nx g @nx/js:library feature-name --directory=shared

# React component library
nx g @nx/react:library component-name --directory=shared
```

### Checking Affected Projects
```bash
nx affected:apps --base=main
nx affected:libs --base=main
```

### Build Order and Caching
- NX automatically determines build order based on dependency graph
- Build caching is enabled for `build`, `test`, `lint`, and `e2e` operations
- Use `nx dep-graph` to visualize project dependencies
- Use `nx reset` to clear the NX cache when needed
- Parallel execution is limited to 3 concurrent tasks for optimal performance

### NX Configuration Details
- **npmScope**: `cybereco` - used for package naming and imports
- **defaultProject**: `justsplit-app` - the primary application
- **Task Runner**: Uses default NX task runner with caching enabled
- **Target Dependencies**: Build targets depend on upstream library builds
- **Named Inputs**: Production builds exclude test files and configs

## Shared Component Architecture

### Overview
All CyberEco applications use a shared component library (`@cybereco/ui-components`) to ensure consistency and reduce code duplication. The shared components are highly configurable and support theming, internationalization, and responsive design.

### Key Shared Components

#### Navigation Component
- **Location**: `libs/ui-components/src/Navigation/`
- **Features**:
  - Configurable navigation links
  - Optional action button (e.g., Hub button, User menu)
  - Mobile-responsive hamburger menu
  - Active link detection
  - LocalStorage persistence for mobile menu state
  - Integration with ConfigDropdown for settings
- **Usage Example**:
  ```typescript
  <Navigation
    links={[
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' }
    ]}
    actionButton={{
      href: '/hub',
      label: 'Hub',
      icon: <FaRocket />
    }}
    showConfig={true}
    mobileMenuStorageKey="app-menu-state"
  />
  ```

#### Footer Component
- **Location**: `libs/ui-components/src/Footer/`
- **Features**:
  - Configurable sections with links
  - Social media links with icons
  - Company information display
  - Copyright with current year
  - Responsive grid layout
- **Usage Example**:
  ```typescript
  <Footer
    companyInfo={{
      name: 'CyberEco',
      tagline: 'Digital solutions',
      email: 'info@cybere.co'
    }}
    sections={[
      {
        title: 'Products',
        links: [
          { label: 'Product 1', href: '/p1' }
        ]
      }
    ]}
    socialLinks={[
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com',
        icon: <LinkedInIcon />
      }
    ]}
  />
  ```

#### ConfigDropdown Component
- **Location**: `libs/ui-components/src/ConfigDropdown/`
- **Features**:
  - Theme toggle (light/dark)
  - Language selector (English/Spanish)
  - Animated dropdown with outside click detection
  - Keyboard navigation support
  - Controlled/uncontrolled modes

#### AppLayout Component
- **Location**: `libs/ui-components/src/Layout/`
- **Features**:
  - Consistent layout structure
  - Header/Footer composition
  - Provider wrapping
  - Main content area with proper spacing

### Implementation Pattern

Each app follows this pattern for using shared components:

1. **Create app-specific wrapper components**:
   ```
   apps/{app-name}/src/components/Header/Header.tsx
   apps/{app-name}/src/components/Footer/Footer.tsx
   ```

2. **Configure shared components with app-specific data**:
   - Navigation links
   - Action buttons
   - Footer sections
   - Theme/language settings

3. **Use client layout wrapper**:
   ```typescript
   // apps/{app-name}/src/app/client-layout.tsx
   <ThemeProvider>
     <LanguageProvider>
       <Header />
       <main>{children}</main>
       <Footer />
     </LanguageProvider>
   </ThemeProvider>
   ```

### Navigation Configurations

Centralized navigation configurations are stored in `libs/shared-types/src/navigation.ts`:
- `websiteNavConfig` - Website navigation links
- `hubNavConfig` - Hub app navigation
- `justSplitNavConfig` - JustSplit navigation

### Testing Strategy

All shared components have comprehensive test coverage:
- Unit tests for component behavior
- Integration tests for provider interactions
- Accessibility tests
- Responsive design tests
- Mock utilities in `libs/ui-components/src/test-utils/`

### Benefits

1. **Consistency**: All apps have the same look and feel
2. **Maintainability**: Single source of truth for UI components
3. **Efficiency**: Faster development of new apps
4. **Type Safety**: Full TypeScript support
5. **Testability**: Shared test utilities and patterns