# CyberEco Development Workflow

This guide outlines the development workflow for the CyberEco platform, covering everything from initial setup to deployment.

## 🚀 Getting Started

### Development Environment Setup

1. **Prerequisites Installation**
   ```bash
   # Install Node.js 18+ (recommend using nvm)
   nvm install 18
   nvm use 18
   
   # Install global tools
   npm install -g firebase-tools
   npm install -g nx
   ```

2. **Repository Setup**
   ```bash
   git clone <repository-url>
   cd cybereco-monorepo
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment templates
   cp apps/hub/.env.local.example apps/hub/.env.local
   cp apps/justsplit/.env.local.example apps/justsplit/.env.local
   
   # Edit with your Firebase configuration
   # For development, you can use the emulator values provided
   ```

## 🛠️ Daily Development Workflow

### Starting Development

```bash
# Start all applications in development mode
npm run dev

# Alternative: Start specific applications
nx serve hub              # Hub on port 40000
nx serve justsplit-app    # JustSplit on port 40002

# Start Firebase emulators (optional for backend testing)
npm run emulators
```

### Code Development Cycle

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Edit code in your preferred IDE/editor
   - Follow TypeScript strict mode requirements
   - Use shared types from `libs/shared-types`

3. **Run Tests Frequently**
   ```bash
   # Run all tests
   npm run test
   
   # Run tests for specific project
   nx test justsplit-app
   nx test hub
   nx test shared-types
   
   # Run tests in watch mode
   nx test justsplit-app --watch
   ```

4. **Check Code Quality**
   ```bash
   # Lint all projects
   npm run lint
   
   # Lint specific project
   nx lint justsplit-app
   
   # Type checking
   nx run justsplit-app:type-check
   ```

### Testing Strategy

#### Unit Tests
- **Location**: Co-located with source files in `__tests__` directories
- **Naming**: `ComponentName.test.tsx` or `utility.test.ts`
- **Coverage**: Minimum 70% coverage required

```bash
# Run unit tests
nx test [project-name]

# Run with coverage
nx test [project-name] --coverage

# Update snapshots
nx test [project-name] --updateSnapshot
```

#### Integration Tests
- **Location**: `src/integration/__tests__/`
- **Focus**: Component interactions, API calls, data flow

#### E2E Tests (Future)
- **Tool**: Playwright or Cypress
- **Focus**: Complete user workflows

### Building and Validation

```bash
# Build all applications
npm run build

# Build specific application
nx build justsplit-app
nx build hub

# Build affected projects only
nx affected:build

# Check bundle size
nx run justsplit-app:analyze
```

## 📦 NX Workspace Commands

### Project Management

```bash
# List all projects
nx show projects

# View dependency graph
nx dep-graph

# Show project information
nx show project justsplit-app

# Check what's affected by changes
nx affected:apps
nx affected:libs
```

### Code Generation

```bash
# Generate new component in app
nx g @nx/react:component ComponentName --project=justsplit-app

# Generate new library
nx g @nx/js:library new-feature --directory=libs

# Generate new application
nx g @nx/next:application new-app
```

### Running Tasks

```bash
# Run task for all projects
nx run-many --target=test --all

# Run task for affected projects
nx affected:test
nx affected:build
nx affected:lint

# Run task with specific configuration
nx build justsplit-app --configuration=production
```

## 🔥 Firebase Development

### Emulator Usage

```bash
# Start all emulators
npm run emulators

# Start specific emulators
firebase emulators:start --only firestore,auth

# Start with data import/export
firebase emulators:start --import=./emulator-data --export-on-exit=./emulator-data
```

### Firebase CLI Commands

```bash
# Login to Firebase
firebase login

# Select project
firebase use <project-id>

# Deploy rules only
firebase deploy --only firestore:rules

# Deploy functions only
firebase deploy --only functions

# View logs
firebase functions:log
```

## 🧪 Testing Workflows

### Pre-Commit Testing

```bash
# Run all tests and linting
npm run test
npm run lint

# Run only affected tests
nx affected:test --base=main
nx affected:lint --base=main
```

### Continuous Integration

The project uses GitHub Actions for CI/CD. The workflow includes:

1. **Install Dependencies**
2. **Lint Code**
3. **Run Tests**
4. **Build Applications**
5. **Deploy (if on main branch)**

### Testing Best Practices

#### Component Testing
```typescript
// Example component test
import { render, screen } from '@testing-library/react';
import { UserComponent } from './UserComponent';

describe('UserComponent', () => {
  it('should render user name', () => {
    render(<UserComponent name="John Doe" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

#### Utility Testing
```typescript
// Example utility test
import { formatCurrency } from './currencyUtils';

describe('formatCurrency', () => {
  it('should format USD correctly', () => {
    expect(formatCurrency(100, 'USD')).toBe('$100.00');
  });
});
```

#### Firebase Testing
```typescript
// Example Firebase test with emulator
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';

describe('Firestore Security Rules', () => {
  // Test security rules with emulator
});
```

## 📱 Application-Specific Workflows

### Hub Application Development

**Focus Areas**:
- Authentication flows
- User management
- App discovery
- Cross-app navigation

```bash
# Start Hub development
nx serve hub

# Test authentication
npm run test:auth

# Build for production
nx build hub --configuration=production
```

### JustSplit Application Development

**Focus Areas**:
- Expense management
- Group operations
- Currency conversion
- Data visualization

```bash
# Start JustSplit development
nx serve justsplit-app

# Run expense-related tests
nx test justsplit-app --testNamePattern="expense"

# Test with emulators
npm run emulators
# In another terminal
nx serve justsplit-app
```

## 🚀 Deployment Workflow

### Development Deployment

```bash
# Deploy to development environment
npm run deploy:dev

# Deploy specific app to development
nx run justsplit-app:deploy:dev
nx run hub:deploy:dev
```

### Production Deployment

```bash
# Build for production
npm run build

# Deploy to production
npm run deploy:prod

# Monitor deployment
firebase hosting:channel:list
```

### Hosting Emulator Testing

```bash
# Test with hosting emulator
npm run hosting:justsplit  # Test JustSplit on localhost:40002
npm run hosting:hub       # Test Hub on localhost:40000
```

## 🔄 Git Workflow

### Branch Strategy

```
main                    # Production-ready code
├── develop            # Integration branch (optional)
├── feature/xyz        # Feature branches
├── hotfix/xyz         # Urgent fixes
└── release/v1.x       # Release preparation
```

### Commit Convention

Follow conventional commits:

```bash
# Feature
git commit -m "feat(justsplit): add expense splitting algorithm"

# Bug fix
git commit -m "fix(hub): resolve authentication token refresh issue"

# Documentation
git commit -m "docs: update development workflow guide"

# Refactor
git commit -m "refactor(shared): extract common currency utilities"

# Test
git commit -m "test(justsplit): add expense calculation tests"
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes and Test**
   ```bash
   # Make your changes
   npm run test
   npm run lint
   npm run build
   ```

3. **Push and Create PR**
   ```bash
   git push origin feature/your-feature
   # Create PR on GitHub
   ```

4. **PR Requirements**
   - All tests pass
   - Code coverage maintained
   - TypeScript compilation succeeds
   - Documentation updated (if needed)

## 🛡️ Code Quality Standards

### TypeScript Standards

```typescript
// Use strict TypeScript settings
// Avoid 'any' type
// Use proper interface definitions
// Implement proper error handling

interface User {
  id: string;
  name: string;
  email: string;
}

// Good: Proper typing
const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: generateId(),
    ...userData
  };
};
```

### React Standards

```typescript
// Use functional components with hooks
// Implement proper prop types
// Use React.memo for performance optimization
// Follow component composition patterns

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary' 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Testing Standards

```typescript
// Arrange, Act, Assert pattern
// Meaningful test descriptions
// Test edge cases
// Mock external dependencies

describe('ExpenseCalculator', () => {
  describe('when calculating splits', () => {
    it('should divide expense equally among participants', () => {
      // Arrange
      const expense = 100;
      const participants = ['user1', 'user2', 'user3'];
      
      // Act
      const result = calculateEqualSplit(expense, participants);
      
      // Assert
      expect(result).toEqual({
        'user1': 33.33,
        'user2': 33.33,
        'user3': 33.34
      });
    });
  });
});
```

## 🔧 Troubleshooting Common Issues

### Build Issues

```bash
# Clear NX cache
npm run clean

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
nx run justsplit-app:type-check
```

### Firebase Issues

```bash
# Login to Firebase
firebase login

# Check project configuration
firebase projects:list

# Clear emulator data
rm -rf emulator-data
```

### Port Conflicts

```bash
# Kill processes on specific ports
lsof -ti:40000 | xargs kill -9
lsof -ti:40002 | xargs kill -9
```

## 🔍 Visual Debugging Tools (MCP Playwright Server)

The CyberEco monorepo includes a powerful MCP (Model Context Protocol) server that provides visual debugging capabilities using Playwright. This tool helps debug CSS issues, analyze scrolling problems, and monitor DOM changes in real-time.

### Features

- **CSS Scrolling Debugger**: Detect and analyze double scrollbar issues
- **CSS Cascade Inspector**: Trace CSS rules and computed styles for any element
- **DOM Change Monitor**: Watch for real-time DOM and style changes
- **Visual Diff Tool**: Compare screenshots and annotate CSS issues

### Installation and Setup

```bash
# Navigate to the MCP server directory
cd tools/playwright-mcp-server

# Install dependencies
npm install

# Build the server
npm run build

# Start in development mode
npm run dev
```

### Integration with Claude Code

To use the MCP server with Claude Code CLI:

1. **Configure Claude Code** (run from monorepo root):
```bash
claude mcp add playwright-debugger node /path/to/cybereco-monorepo/tools/playwright-mcp-server/dist/server.js
```

2. **Verify the server is available**:
```bash
claude mcp list
```

### Available Debugging Tools

#### 1. Debug CSS Scrolling

Analyzes scrolling behavior and detects double scrollbars:

```bash
# Example: Debug documentation page scrolling
claude mcp call playwright-debugger debug-css-scrolling --url "http://localhost:40001/documentation"
```

Returns:
- List of all scrollable elements
- Nested scroll container issues
- Sticky positioning problems
- Specific recommendations to fix issues

#### 2. Inspect CSS Cascade

Traces CSS rules and computed styles for any element:

```bash
# Example: Inspect sidebar styles
claude mcp call playwright-debugger inspect-css-cascade --url "http://localhost:40001/documentation" --selector ".sidebar"
```

Returns:
- Computed styles for the element
- All CSS rules that match (with specificity)
- Overridden rules and why
- CSS variables in use

#### 3. Monitor DOM Changes

Watches for DOM and style changes in real-time:

```bash
# Example: Monitor navigation changes
claude mcp call playwright-debugger monitor-dom-changes --url "http://localhost:40001/documentation" --selectors ".sidebar,.mainContent" --duration 30
```

#### 4. Visual Diff

Captures screenshots and annotates CSS issues:

```bash
# Example: Capture visual issues
claude mcp call playwright-debugger visual-diff --url "http://localhost:40001/documentation" --fullPage true --annotateIssues true
```

### Usage in Development

When debugging CSS issues:

1. **Start the apps and MCP server**:
```bash
# Terminal 1: Start apps
npm run dev

# Terminal 2: Start MCP server
cd tools/playwright-mcp-server && npm run dev
```

2. **Use Claude Code to debug**:
```bash
# Debug specific CSS issues
claude mcp call playwright-debugger debug-css-scrolling --url "http://localhost:40001/documentation"
```

3. **Analyze results** and implement fixes based on recommendations

### Resource Management

- Memory usage target: 50-150MB
- Maximum 5 concurrent browser contexts
- Automatic cleanup of unused resources
- Pages timeout after 5 minutes of inactivity

---

This workflow ensures consistent, high-quality development across the CyberEco platform while maintaining flexibility for different development styles and requirements.