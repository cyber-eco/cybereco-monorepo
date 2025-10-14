# Getting Started with CyberEco Platform

This guide will help you set up your development environment and start working with the CyberEco NX monorepo.

## Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- **Git**
- **Firebase CLI** (for deployment)
- **NX CLI** (recommended)

## Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/cybereco.git
cd cybereco
```

### 2. Install NX CLI (Recommended)
```bash
npm install -g nx
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables

The easiest way to get started is to use a single `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.production.example .env.local

# Edit with your Firebase configuration
nano .env.local  # or use your preferred editor
```

You'll need to add your Firebase configuration values. See our [Environment Setup Guide](./environment-setup.md) for detailed instructions on:
- Getting your Firebase configuration values
- Understanding the security model
- Setting up multi-project configurations
- Troubleshooting common issues

**Quick Firebase Setup:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings → General → Your apps
4. Copy the configuration values to `.env.local`

## Running the Applications

### Start All Applications
```bash
# Recommended: Start all apps in parallel
npm run dev

# Alternative: Start all via NX
nx run-many --target=serve --all
```

### Start Individual Applications
```bash
# Start the Hub (http://localhost:40000)
nx serve hub

# Start JustSplit (http://localhost:40002)
nx serve justsplit-app

# Start Website (http://localhost:40001)
nx serve website
```

### Start with Firebase Emulators
```bash
# In one terminal, start the emulators
nx run justsplit-app:emulators

# In another terminal, start the app
nx serve justsplit-app
```

## Development Workflow

### 1. Check the Dependency Graph
```bash
nx dep-graph
```

### 2. Make Changes
- Edit files in `apps/` or `libs/`
- NX will detect changes and rebuild affected projects

### 3. Run Tests
```bash
# Test specific project
nx test justsplit-app

# Test all projects
nx run-many --target=test --all

# Test only affected projects
nx affected:test
```

### 4. Lint Your Code
```bash
# Lint specific project
nx lint justsplit-app

# Lint all projects
nx run-many --target=lint --all
```

### 5. Build for Production
```bash
# Build specific app
nx build justsplit-app --configuration=production

# Build all apps
nx run-many --target=build --all --configuration=production
```

## Common Tasks

### Creating a New Component
```bash
# In a library
nx g @nrwl/react:component Button --project=ui-components

# In an app
nx g @nrwl/react:component Header --project=justsplit-app
```

### Creating a New Library
```bash
nx g @nrwl/js:library my-feature --directory=shared
```

### Running E2E Tests
```bash
nx e2e justsplit-app-e2e
```

### Formatting Code
```bash
nx format:write
```

## Troubleshooting

### Clear NX Cache
```bash
nx reset
```

### Reinstall Dependencies
```bash
rm -rf node_modules
npm install
```

### Check for Circular Dependencies
```bash
nx dep-graph
```

### Debug Build Issues
```bash
nx build justsplit-app --verbose
```

## Next Steps

1. Read the [NX Guide](./nx-guide.md) for advanced features
2. Review the [Architecture Overview](../architecture/overview.md)
3. Check the [Development Workflow](./development-workflow.md)
4. Learn about [Testing](./testing-guide.md)

## Useful Resources

- [NX Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)