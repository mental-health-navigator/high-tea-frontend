<a href="https://high-tea-frontend.vercel.app">
  <img alt="Next.js 15 and App Router-ready AI chatbot." src="app/(chat)/opengraph-image.png">
  <h1 align="center">Heal Hub - Mental Health Services Navigator</h1>
  <span>By the High Tea team</span>
</a>

<p align="center">
    An AI-powered mental health chatbot built with Next.js 15, React 19, and the AI SDK. Features real-time chat streaming, document artifacts, and intelligent content creation.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#project-structure"><strong>Project Structure</strong></a> ·
  <a href="#running-locally"><strong>Running Locally</strong></a> ·
  <a href="#testing"><strong>Testing</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a>
</p>
<br/>

## Features

### Core Functionality

- **AI-Powered Chat** - Real-time streaming chat responses powered by OpenAI GPT 5 nano

### Technical Features

- [Next.js 15](https://nextjs.org) App Router with Partial Pre-Rendering (PPR)
  - React Server Components (RSCs) and Server Actions
  - Advanced routing and streaming responses
- [AI SDK](https://sdk.vercel.ai/docs) v5 (beta)
  - Unified API for generating text, structured objects, and tool calls
  - Support for multiple AI providers (xAI, OpenAI)
  - Custom AI tools for document creation and weather data
- [shadcn/ui](https://ui.shadcn.com) + [Tailwind CSS](https://tailwindcss.com)
  - Accessible component primitives from [Radix UI](https://radix-ui.com)
  - Responsive design with dark mode support
- Data Persistence
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) via Drizzle ORM
  - [Vercel Blob](https://vercel.com/storage/blob) for file storage
- [Auth.js](https://authjs.dev) (NextAuth v5)
  - Email/password authentication with bcrypt
  - Guest user support
- Advanced Editors
  - [CodeMirror 6](https://codemirror.net) for code editing
  - [ProseMirror](https://prosemirror.net) for rich text
  - [react-data-grid](https://adazzle.github.io/react-data-grid) for spreadsheets

## Tech Stack

### Frontend

- **React 19** (RC) - Latest React features
- **Next.js 15** - App Router, Server Components, Server Actions
- **TypeScript 5.6** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### AI/LLM

- **AI SDK v5** - Vercel's unified LLM API
- **OpenAI GPT-5o-mini** - Secondary model
- Custom AI tools for weather, document creation/editing

### Database & Storage

- **Supabase** - Postgres database
- **Vercel Blob** - File storage

### Development & Testing

- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Storybook 9** - Component documentation
- **pnpm** - Package manager

## Project Structure

```
high-tea-frontend/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   └── api/auth/        # NextAuth endpoints
│   ├── (chat)/              # Chat application
│   │   ├── api/             # API routes
│   │   │   ├── chat/        # Chat streaming
│   │   │   ├── document/    # Document management
│   │   │   ├── files/       # File uploads
│   │   │   ├── history/     # Chat history
│   │   │   ├── suggestions/ # AI suggestions
│   │   ├── page.tsx         # Chat home
│   │   └── chat/[id]/       # Individual chats
│   ├── about/               # About page
│   └── help/                # Help page
│
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── artifact*.tsx        # Artifact components
│   ├── chat.tsx             # Main chat interface
│   ├── messages.tsx         # Message rendering
│   └── multimodal-input.tsx # Chat input
│
├── lib/                     # Core utilities
│   ├── ai/                  # AI configuration
│   │   ├── models.ts        # Available models
│   │   ├── providers.ts     # AI SDK providers
│   │   ├── prompts.ts       # System prompts
│   │   └── tools/           # AI tool definitions
│   ├── db/                  # Database layer
│   │   ├── schema.ts        # Drizzle schema
│   │   ├── queries.ts       # Database queries
│   │   └── migrations/      # SQL migrations
│   └── artifacts/           # Artifact handlers
│
├── artifacts/               # Artifact implementations
│   ├── code/                # Code artifact
│   ├── text/                # Text artifact
│   ├── image/               # Image artifact
│   └── sheet/               # Spreadsheet artifact
│
├── hooks/                   # React hooks
├── tests/                   # Test suites
│   ├── e2e/                 # Playwright E2E tests
│   └── routes/              # Route tests
│
├── stories/                 # Storybook stories
└── .storybook/              # Storybook config
```

## Deployment

**Live Application:** [https://high-tea-frontend.vercel.app](https://high-tea-frontend.vercel.app)

Deployed on Vercel with continuous deployment from the `main` branch.

## Running Locally

### Prerequisites

- Node.js 18+
- pnpm 9.12.3+
- PostgreSQL database (Neon recommended)
- API keys for xAI and/or OpenAI

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Authentication
AUTH_SECRET=your-auth-secret-here

# AI Providers
XAI_API_KEY=your-xai-api-key
OPENAI_API_KEY=your-openai-api-key

# Database
POSTGRES_URL=your-postgres-connection-string

# Storage
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Optional
CHROMATIC_PROJECT_TOKEN=your-chromatic-token
```

See [`.env.example`](.env.example) for a complete list of environment variables.

> **Note:** Never commit your `.env.local` file. It contains secrets that should remain private.

### Installation

#### Option 1: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Link to Vercel project
vercel link

# Pull environment variables
vercel env pull

# Install dependencies
pnpm install

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```

#### Option 2: Manual Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```

Your application should now be running on [http://localhost:3000](http://localhost:3000).

## Testing

### Unit Tests (Vitest)

```bash
# Run unit tests
pnpm test:unit

# Run with UI
pnpm test:unit:ui

# Run in watch mode
pnpm test:unit:watch
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
pnpm test

# Run with UI
pnpm test:ui

# Run in debug mode
pnpm test:debug

# Run in headed mode
pnpm test:headed
```

### Storybook

```bash
# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook

# Run Storybook tests
pnpm test-storybook
```

## Available Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Lint code with Biome
pnpm format           # Format code with Biome
```

## Contributing

1. Create a new branch from `main`
2. Make your changes
3. Run tests: `pnpm test:unit && pnpm test`
4. Run linting: `pnpm lint`
5. Commit your changes
6. Push and create a pull request to `main`
