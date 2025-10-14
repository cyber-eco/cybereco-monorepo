![Build Status](https://github.com/cyber-eco/cybereco/workflows/Build/badge.svg) ![Deploy Status](https://github.com/cyber-eco/cybereco/workflows/Deploy%20to%20GitHub%20Pages/badge.svg) ![Tests Status](https://github.com/cyber-eco/cybereco/workflows/Tests/badge.svg) [![codecov](https://codecov.io/gh/cyber-eco/cybereco/branch/main/graph/badge.svg)](https://codecov.io/gh/cyber-eco/cybereco)


[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=flat-square&logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![NX](https://img.shields.io/badge/NX-143055?style=flat-square&logo=nx&logoColor=white)](https://nx.dev/)

# CyberEco Platform

<p align="center">
  <img src="apps/website/public/logo.svg" alt="CyberEco Logo" width="200">
</p>


> 🌐 **A human-centered digital ecosystem for conscious, connected, and sustainable living**  
> In a world where digital life is fragmented, extractive, and overwhelming, CyberEco exists to offer a better path — one rooted in sovereignty, community, and balance.


## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (see Environment Setup below)
cp .env.production.example .env.local

# 3. Start development
npm run dev

# 4. Open in browser
# Hub: http://localhost:40000
# JustSplit: http://localhost:40002
# Website: http://localhost:40001
```

That's it! 🎉 You're now running the CyberEco platform locally.

## 🔧 Environment Setup

### Firebase Configuration

CyberEco uses Firebase for authentication and data storage. You'll need to set up environment variables before running the applications.

#### 1. Copy the Example File

```bash
cp .env.production.example .env.local
```

#### 2. Get Your Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to Project Settings → General
4. Scroll to "Your apps" and select your web app
5. Copy the configuration values

#### 3. Update .env.local

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

> **Note**: Firebase Web API keys are designed to be public and safe to expose in client-side code. Security is enforced through Firebase Authentication and Firestore Security Rules. [Learn more](docs/security/firebase-api-keys.md)

#### 4. Verify Setup

Run the development server and check for any environment variable errors:

```bash
npm run dev
```

For more detailed setup instructions, see our [Environment Setup Guide](docs/development/environment-setup.md).

## 🏗️ What is CyberEco?

CyberEco is not just another app. It is a **modular digital ecosystem** — an operating system for life — where each platform solves a real need while contributing to a greater whole.

### Platform Philosophy

We believe your digital presence should empower you, not exploit you. Your identity should belong to you. Your data should serve you. Your actions should connect you with others meaningfully.

### Core Values

- **🔐 Digital Sovereignty** - You own your identity, your data, your narrative
- **🌱 Wellbeing by Design** - Tech must serve your life — not consume it
- **🔗 Interconnection with Purpose** - Every platform is useful alone, but transformative together
- **🤝 Community is Core** - We build tools for individuals, powered by the collective
- **📖 Open by Nature** - Modular, transparent, and interoperable wherever possible

### Current Applications

- **🏠 Hub** - Central authentication and app launcher (port 40000)
- **💰 JustSplit** - Expense splitting and financial management (port 40002)  
- **🌐 Website** - Marketing site and documentation (port 40001)
- **🚀 Future Apps** - Somos, Demos, Plantopia, and more

At the center is the **CyberEco Hub** — your identity, your dashboard, your digital home.

## 📁 Project Structure

```
cybereco-monorepo/
├── apps/
│   ├── hub/                 # 🏠 Authentication hub (port 40000)
│   ├── justsplit/           # 💰 Expense splitting app (port 40002)
│   └── website/             # 🌐 Marketing website (port 40001)
├── libs/
│   ├── shared-types/        # 📝 Common TypeScript interfaces
│   ├── firebase-config/     # 🔥 Firebase utilities & multi-project config
│   ├── ui-components/       # 🎨 Shared React components & theming
│   └── shared-assets/       # 🖼️ Logos, icons, and brand assets
├── firebase/
│   ├── hub/                 # 🔥 Hub Firebase project config
│   ├── justsplit/           # 🔥 JustSplit Firebase project config
│   └── website/             # 🔥 Website Firebase project config
├── docs/                    # 📚 Architecture & development docs
└── archived/                # 📦 Legacy code archives
```

## 🚀 Development Commands

### Essential Commands
```bash
npm run dev              # Start all apps
npm run test             # Run all tests
npm run build            # Build all apps
npm run lint             # Check code quality
```

### App-Specific Commands
```bash
nx serve hub             # Start Hub only (port 40000)
nx serve justsplit-app   # Start JustSplit only (port 40002)
nx serve website         # Start Website only (port 40001)
nx test hub              # Test Hub only
nx test justsplit-app    # Test JustSplit only
nx test website          # Test Website only
```

### Firebase Development
```bash
npm run emulators        # Start Firebase emulators
npm run hosting:justsplit # Test JustSplit with hosting emulator
npm run hosting:hub      # Test Hub with hosting emulator
npm run hosting:website  # Test Website with hosting emulator
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 + React 18 |
| **Language** | TypeScript |
| **Monorepo** | NX Workspace |
| **Backend** | Firebase (Auth, Firestore, Hosting) |
| **Styling** | CSS Modules |
| **Testing** | Jest + React Testing Library |

## 🎯 Current Status & Next Steps

### ✅ Completed
- [x] NX monorepo setup with proper configuration and cleanup
- [x] Hub, JustSplit, and Website applications structure
- [x] Shared libraries (types, Firebase config, UI components, assets)
- [x] Multi-project Firebase setup (hub/justsplit/website)
- [x] Firebase emulator integration
- [x] Development workflow and comprehensive documentation
- [x] Codebase cleanup and legacy file removal

### 🔄 In Progress
- [ ] Fix JustSplit runtime errors and stabilize
- [ ] Implement Hub authentication functionality
- [ ] Set up cross-app authentication flow

### 📋 Next Priorities
1. **Fix JustSplit Issues** - Resolve runtime errors and component issues
2. **Hub Development** - Build core authentication features
3. **Firebase Setup** - Configure production environments
4. **Testing** - Increase test coverage to 70%+
5. **CI/CD** - Set up automated testing and deployment

> 📖 **See [ROADMAP.md](./docs/ROADMAP.md) for detailed next steps**

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 1. **Setup Development Environment**
```bash
git clone <repository-url>
cd cybereco-monorepo
npm install
npm run dev
```

### 2. **Make Changes**
```bash
git checkout -b feature/your-feature-name
# Make your changes
npm run test    # Ensure tests pass
npm run lint    # Check code quality
```

### 3. **Submit Changes**
```bash
git commit -m "feat(justsplit): add expense splitting feature"
git push origin feature/your-feature-name
# Create Pull Request
```

### 📋 Contribution Guidelines
- **Code Style**: Follow TypeScript strict mode and ESLint rules
- **Testing**: Write tests for new features (aim for 70% coverage)
- **Documentation**: Update docs for any architectural changes
- **Commits**: Use [conventional commits](https://conventionalcommits.org/)

## 🏗️ Architecture

### Monorepo Benefits
- **Shared Code**: Common types, utilities, and components
- **Fast Builds**: NX caching and incremental builds
- **Type Safety**: End-to-end TypeScript coverage
- **Independent Deployment**: Apps can be deployed separately

### Firebase Multi-Project Setup
- **Hub Firebase Project**: Handles all authentication
- **App Firebase Projects**: Handle app-specific data (JustSplit, future apps)
- **Emulator Support**: Full local development without cloud dependencies

## 📚 Documentation

### For Developers
- **[Getting Started](./docs/GETTING_STARTED.md)** - Detailed setup guide
- **[Development Guide](./docs/DEVELOPMENT.md)** - Daily development workflow
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and patterns
- **[Contributing](./docs/CONTRIBUTING.md)** - How to contribute effectively

### For Users
- **[JustSplit Features](./docs/JUSTSPLIT.md)** - Complete feature overview
- **[Deployment](./docs/DEPLOYMENT.md)** - How to deploy your own instance

## 🔮 Future Vision

CyberEco will expand into a comprehensive digital lifestyle platform:

| App | Purpose | Status |
|-----|---------|--------|
| **Hub** | Authentication & launcher | 🔄 In Development |
| **JustSplit** | Expense splitting | 🔄 Active Development |
| **TaskFlow** | Project management | 📋 Planned |
| **HealthTrack** | Fitness tracking | 📋 Planned |
| **LearnPath** | Education progress | 📋 Planned |
| **TimeSync** | Calendar management | 📋 Planned |
| **DataVault** | Personal data backup | 📋 Planned |

### 🌐 Long-Term Decentralized Vision

Beyond the current centralized architecture, CyberEco envisions a **decentralized future** where:

- **📱 Mobile P2P Networks** - Your phone becomes part of a global, distributed computing network
- **🔒 Complete Data Sovereignty** - You own and control 100% of your personal data  
- **🎯 Privacy by Design** - Zero-knowledge proofs enable sharing without exposing sensitive information
- **💰 Earn from Participation** - Get rewarded for contributing resources to the network
- **🌍 Global Accessibility** - No central servers, no geographic restrictions, no corporate gatekeepers

> 🚀 **[Read the Full Decentralized Vision](./docs/vision/decentralized-future.md)** - Comprehensive roadmap for transitioning to a blockchain-based, privacy-first ecosystem powered by mobile devices and cryptographic guarantees.

## 🆘 Need Help?

- **🐛 Found a bug?** Create an [issue](https://github.com/your-repo/issues)
- **💡 Have an idea?** Start a [discussion](https://github.com/your-repo/discussions)
- **📖 Documentation unclear?** Let us know in an issue
- **🤔 Need guidance?** Check our [Getting Started guide](./docs/GETTING_STARTED.md)

## 📄 License

Elastic License 2.0 (ELv2) - see [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>🌟 Star this repo if you find it useful!</strong><br>
  <sub>Built with ❤️ for the open source community</sub>
</div>