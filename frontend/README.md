# Green Flag Guide Frontend

A React TypeScript application for learning healthy relationship behaviors through interactive scenarios.

## Features

- 🚩 Interactive relationship scenarios
- 💚 Green Flag vs Red Flag decision making
- 📚 Educational feedback and learning
- 👤 User authentication and progress tracking
- 📊 Admin panel for analytics
- 🎨 Modern, responsive UI with Tailwind CSS

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Supabase** for backend services
- **Headless UI** for accessible components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp env.example .env.local
```

3. Update `.env.local` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── LandingPage.tsx
│   ├── ScenarioSelection.tsx
│   ├── ScenarioInteraction.tsx
│   ├── ProfilePage.tsx
│   ├── AdminPanel.tsx
│   └── AuthCallback.tsx
├── data/               # Static data
│   └── scenarios.ts    # Scenario definitions
├── services/           # External services
│   └── supabase.ts     # Supabase client
├── store/              # State management
│   └── index.ts        # Zustand stores
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Scenarios

The app includes 10 interactive scenarios covering various relationship situations:

1. **Dress Code Drama** - Healthy communication about insecurities
2. **Secret Sharing** - Trust and confidentiality
3. **Love or Isolation?** - Controlling behavior
4. **Private Stalker** - Privacy invasion
5. **Fast Forward Intensity** - Rushing into commitments
6. **Good Vibes Only?** - Toxic positivity
7. **Jokes or Jabs?** - Gaslighting through humor
8. **Privacy Please** - Respecting boundaries
9. **All My Exes Were Crazy** - Taking responsibility
10. **I Don't Do Feelings** - Emotional availability

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test your changes thoroughly
4. Update documentation as needed

## License

MIT License - see LICENSE file for details 