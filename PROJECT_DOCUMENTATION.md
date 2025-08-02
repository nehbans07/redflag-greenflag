# Green Flag Guide - Project Documentation

## 📋 Project Overview

The Green Flag Guide is an interactive web application designed to help users learn about healthy and unhealthy relationship behaviors through realistic scenarios. Users engage with conversation-based scenarios and make decisions about whether behaviors represent "green flags" (healthy) or "red flags" (unhealthy), receiving educational feedback to promote better relationship understanding.

## 🎯 Mission Statement

To empower individuals with the knowledge and awareness needed to build healthier relationships by providing interactive, educational content that promotes emotional intelligence and relationship literacy.

## 🏗️ Architecture Overview

### Frontend Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Zustand       │    │   Supabase      │
│   (TypeScript)  │◄──►│   State Store   │◄──►│   Backend       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │   Local State   │    │   Database      │
│   (UI Layer)    │    │   Management    │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

#### Frontend
- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Headless UI** - Accessible UI components

#### Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Data security
- **Real-time subscriptions** - Live updates

#### Authentication
- **Supabase Auth** - OAuth and email authentication
- **Google OAuth** - Social login
- **JWT tokens** - Secure session management

## 📁 Project Structure

```
greenflag-guide/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── ScenarioSelection.tsx
│   │   │   ├── ScenarioInteraction.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── AdminPanel.tsx
│   │   │   └── AuthCallback.tsx
│   │   ├── data/              # Static data
│   │   │   └── scenarios.ts   # Scenario definitions
│   │   ├── services/          # External services
│   │   │   └── supabase.ts    # Supabase client
│   │   ├── store/             # State management
│   │   │   └── index.ts       # Zustand stores
│   │   ├── types/             # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/                # Static assets
│   ├── package.json           # Dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript config
│   └── tailwind.config.js     # Tailwind config
├── supabase/                  # Database schema
│   └── schema.sql            # Database setup
├── docs/                      # Documentation
├── README.md                  # Project overview
├── DEPLOYMENT.md             # Deployment guide
└── PROJECT_DOCUMENTATION.md  # This file
```

## 🎮 User Experience Flow

### 1. Landing Page
- **Hero Section**: Eye-catching title with emoji (🚩)
- **How it Works**: 3-step explanation with icons
- **Call-to-Action**: Prominent "Start Learning! 🚀" button
- **Visual Elements**: Diverse group imagery

### 2. Authentication
- **Google OAuth**: One-click sign-in
- **Email/Password**: Traditional authentication
- **Profile Creation**: Automatic profile setup
- **Session Management**: Persistent login state

### 3. Scenario Selection
- **Grid Layout**: 10 scenario cards in responsive grid
- **Card Design**: Each card shows:
  - Scenario number and completion status
  - Title and character names
  - Character profile pictures
- **Progress Indicators**: Visual feedback for completed scenarios

### 4. Interactive Experience
- **Chat Interface**: Realistic conversation between characters
- **Character Profiles**: Profile pictures and names
- **Decision Point**: "What do you think?" prompt
- **Binary Choice**: Red Flag (✕) and Green Flag (💚) buttons

### 5. Feedback System
- **Correct Answer**: ✅ "You matched it right!" confirmation
- **Educational Content**:
  - Main explanation of the behavior
  - 💡 "Truth to Keep" - Key learning point
  - 🤔 "Reflection" - Thought-provoking question
- **Navigation**: "Back to Scenarios 📝" button

### 6. Progress Tracking
- **Completion Status**: Visual indicators for completed scenarios
- **Performance Metrics**: Correct answer tracking
- **User Profile**: Personal progress dashboard

## 📊 Database Schema

### Tables

#### 1. profiles
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. scenarios
```sql
CREATE TABLE scenarios (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  characters JSONB NOT NULL,
  conversation JSONB NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('green', 'red')),
  feedback JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. user_progress
```sql
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  scenario_id INTEGER REFERENCES scenarios(id) ON DELETE CASCADE NOT NULL,
  user_answer TEXT NOT NULL CHECK (user_answer IN ('green', 'red')),
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, scenario_id)
);
```

#### 4. analytics_events
```sql
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Security Policies

- **Row Level Security (RLS)**: Enabled on all tables
- **User Isolation**: Users can only access their own data
- **Admin Access**: Special policies for admin@greenflag.com
- **Public Scenarios**: Scenarios are publicly readable

## 🎨 Design System

### Color Palette
- **Primary Green**: `#10B981` - Used for positive/healthy behaviors
- **Primary Red**: `#EF4444` - Used for negative/unhealthy behaviors
- **Neutral Gray**: `#6B7280` - Used for text and borders
- **Background**: `#FFFFFF` - Clean white background
- **Accent Blue**: `#3B82F6` - Used for links and highlights

### Typography
- **Primary Font**: Inter - Modern, readable sans-serif
- **Heading Sizes**: 
  - H1: `text-4xl font-bold`
  - H2: `text-2xl font-semibold`
  - H3: `text-xl font-medium`
- **Body Text**: `text-base leading-relaxed`

### Component Library

#### Buttons
```typescript
// Primary Button
<button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
  Start Learning! 🚀
</button>

// Secondary Button
<button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors">
  Back to Scenarios 📝
</button>

// Decision Buttons
<button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
  ✕ Red Flag
</button>
```

#### Cards
```typescript
// Scenario Card
<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
  <h3 className="text-lg font-semibold mb-2">{title}</h3>
  <p className="text-gray-600 mb-4">{description}</p>
  <div className="flex items-center space-x-2">
    {characters.map(character => (
      <img key={character.name} src={character.profilePicture} alt={character.name} className="w-8 h-8 rounded-full" />
    ))}
  </div>
</div>
```

## 🔧 Development Guidelines

### Code Style

#### TypeScript
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use type guards for runtime type checking
- Prefer `const` over `let` when possible

#### React Components
- Use functional components with hooks
- Implement proper prop types
- Use React.memo for performance optimization
- Follow the single responsibility principle

#### State Management
- Use Zustand for global state
- Keep local state in components when possible
- Use React Context sparingly
- Implement proper error boundaries

### Testing Strategy

#### Unit Tests
- Test individual components in isolation
- Mock external dependencies
- Test user interactions and state changes
- Use React Testing Library

#### Integration Tests
- Test component interactions
- Test routing and navigation
- Test authentication flows
- Test API integrations

#### E2E Tests
- Test complete user journeys
- Test cross-browser compatibility
- Test mobile responsiveness
- Use Playwright or Cypress

### Performance Optimization

#### Frontend
- Implement code splitting with React.lazy
- Use React.memo for expensive components
- Optimize images and assets
- Implement proper caching strategies

#### Backend
- Use database indexes for queries
- Implement connection pooling
- Use CDN for static assets
- Monitor query performance

## 📈 Analytics and Metrics

### User Engagement Metrics
- **Scenario Completion Rate**: Percentage of users who complete scenarios
- **Correct Answer Rate**: Average accuracy across all scenarios
- **Time Spent**: Average time per scenario
- **Return Rate**: Users who return after first visit
- **Session Duration**: Average session length

### Learning Outcomes
- **Knowledge Retention**: Post-scenario quiz scores
- **Behavioral Change**: Self-reported improvements
- **Confidence Levels**: User confidence in identifying flags
- **Application Rate**: Users applying learnings to real relationships

### Technical Metrics
- **Page Load Times**: Core Web Vitals
- **Error Rates**: Application errors and crashes
- **API Response Times**: Backend performance
- **User Experience**: User satisfaction scores

## 🔒 Security Considerations

### Data Protection
- All user data is encrypted at rest
- HTTPS is enforced for all connections
- Row Level Security (RLS) is enabled
- Regular security audits are conducted

### Authentication
- JWT tokens with short expiration
- Secure session management
- OAuth integration with Google
- Password hashing and salting

### Privacy
- Minimal data collection
- User consent for analytics
- Data deletion capabilities
- GDPR compliance measures

## 🚀 Deployment Strategy

### Environment Management
- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Live application with monitoring

### CI/CD Pipeline
1. **Code Review**: Pull request reviews
2. **Automated Testing**: Unit and integration tests
3. **Build Process**: Optimized production builds
4. **Deployment**: Automated deployment to staging/production
5. **Monitoring**: Post-deployment monitoring

### Infrastructure
- **Frontend**: Vercel/Netlify for static hosting
- **Backend**: Supabase for database and authentication
- **CDN**: Cloudflare for global content delivery
- **Monitoring**: Sentry for error tracking

## 📚 Content Guidelines

### Scenario Development
- **Realistic Situations**: Based on real relationship dynamics
- **Diverse Representation**: Various backgrounds and relationship types
- **Educational Value**: Clear learning objectives
- **Positive Framing**: Focus on growth and learning

### Educational Content
- **Evidence-Based**: Based on relationship psychology research
- **Accessible Language**: Clear, non-technical explanations
- **Actionable Insights**: Practical advice for users
- **Reflection Prompts**: Encourage self-reflection

### Character Development
- **Diverse Cast**: Various ethnicities, ages, and backgrounds
- **Relatable Personalities**: Realistic character traits
- **Consistent Voices**: Maintain character consistency
- **Cultural Sensitivity**: Respectful of different cultures

## 🔮 Future Roadmap

### Phase 1: Core Features (Current)
- ✅ Basic scenario interaction
- ✅ User authentication
- ✅ Progress tracking
- ✅ Admin panel
- ✅ Responsive design

### Phase 2: Enhanced Features (Next)
- 🔄 Advanced analytics dashboard
- 🔄 Personalized recommendations
- 🔄 Social sharing features
- 🔄 Email notifications
- 🔄 Dark mode support

### Phase 3: Advanced Features (Future)
- 📋 AI-powered scenario generation
- 📋 Video content integration
- 📋 Community features
- 📋 Expert consultation
- 📋 Mobile app development

### Phase 4: Scale and Expand (Long-term)
- 📋 Multi-language support
- 📋 Advanced personalization
- 📋 Integration with counseling services
- 📋 Research partnerships
- 📋 Enterprise features

## 🤝 Contributing Guidelines

### Development Process
1. **Fork the Repository**: Create your own fork
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Changes**: Implement your feature
4. **Write Tests**: Add tests for new functionality
5. **Submit Pull Request**: Create a detailed PR description

### Code Review Process
- All changes require code review
- Tests must pass before merging
- Documentation must be updated
- Performance impact must be considered

### Communication
- Use GitHub Issues for bug reports
- Use GitHub Discussions for feature requests
- Follow the project's code of conduct
- Be respectful and inclusive

## 📞 Support and Contact

### Technical Support
- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: Comprehensive guides and tutorials
- **Community**: Discord server for discussions
- **Email**: support@greenflag.com

### Educational Support
- **Content Questions**: Educational accuracy and improvements
- **Research Partnerships**: Academic collaborations
- **Expert Consultation**: Professional relationship counselors
- **Feedback**: User experience and content suggestions

---

This documentation provides a comprehensive overview of the Green Flag Guide project, including technical architecture, development guidelines, and future roadmap. It serves as a reference for developers, stakeholders, and contributors to understand the project's goals, implementation, and direction. 