# Green Flag/Red Flag Relationship Guide

An interactive web application that helps users learn to identify healthy and unhealthy relationship behaviors through real-life scenarios. Built with modern web technologies and designed for educational impact.

## 📱 Live Demo
**Original App**: [https://greenflag-redflag-guide.lovable.app/](https://greenflag-redflag-guide.lovable.app/)

## 🎯 Project Overview

This project creates a gamified learning platform where users read through realistic relationship scenarios and practice identifying "green flags" (healthy behaviors) and "red flags" (unhealthy behaviors) through interactive chat-style conversations.

### Key Features
- **10 Interactive Scenarios** with realistic relationship situations
- **Binary Decision Making** - Green Flag vs Red Flag choices
- **Educational Feedback** with explanations and reflection questions
- **Progress Tracking** for completed scenarios
- **Mobile-First Design** with responsive interface

## 🏗️ Architecture & Design

### App Structure
```
Green Flag/Red Flag Guide
├── Landing Page (Hero + How it Works)
├── Scenario Selection (Grid of 10 scenarios)
├── Interactive Scenario (Chat interface)
└── Feedback System (Educational content)
```

### User Flow
1. **Landing Page** → Learn about the app and start
2. **Scenario Selection** → Choose from 10 different scenarios
3. **Interactive Scenario** → Read chat and make decision
4. **Feedback** → Learn why it's a green/red flag
5. **Return** → Back to scenario selection

## 📊 Content Analysis

### Scenario Details

| Scenario | Characters | Theme | Flag Type | Key Learning |
|----------|------------|-------|-----------|--------------|
| 1 | Priya & Kabir | Dress Code Drama | Green | "You can be vulnerable without being controlling" |
| 2 | Rani & Meena | Secret Sharing | Red | "Being close to someone doesn't mean breaking others' trust" |
| 3 | Arjun & Diya | Love or Isolation? | - | - |
| 4 | Aman & Reema | Private Stalker | - | - |
| 5 | Tina & Ravi | Fast Forward Intensity | - | - |
| 6 | Varun & Neha | Good Vibes Only? | - | - |
| 7 | Alok & Rhea | Jokes or Jabs? | - | - |
| 8 | Ishaan & Zoya | Privacy Please | - | - |
| 9 | Tanya & Sahil | All My Exes Were Crazy | - | - |
| 10 | Riya & Kunal | I Don't Do Feelings | - | - |

### Sample Scenario Content

#### Scenario 1: Dress Code Drama
**Characters**: Priya & Kabir

**Conversation**:
```
Kabir: "Hey Priya, can I say something honestly? I feel a little uncomfortable when people stare. I know it's my own insecurity."

Priya: "Thanks for telling me. I feel confident in what I wear, but I'm glad we can talk about this."

Kabir: "I trust you — just working through my feelings."
```

**Correct Answer**: Green Flag
**Explanation**: It's okay to feel insecure — what matters is how you communicate it, with respect.
**Truth to Keep**: "You can be vulnerable without being controlling."
**Reflection**: Have you ever shared something uncomfortable without making it the other person's fault?

#### Scenario 2: Secret Sharing
**Characters**: Rani & Meena

**Conversation**:
```
Rani: "You won't believe what Priya told me. Full gossip!"

Meena: "Wait, didn't she say that in confidence?"

Rani: "Yeah, but you're my bestie. It's fine!"
```

**Correct Answer**: Red Flag
**Explanation**: Sharing secrets without consent breaks trust.
**Truth to Keep**: "Being close to someone doesn't mean breaking others' trust."
**Reflection**: What does it take to build broken trust?

## 🎨 Design Assets

### Visual Elements
- **Hero Image**: Diverse group of people having friendly conversations
- **Character Profile Pictures**: Individual photos for each character
- **Icons**: Emoji-based icons (💬, 👈👉, 💡, ✅, ✕, 💚)
- **Color Scheme**: Green for positive, Red for negative behaviors

### UI Components
- **Scenario Cards**: Grid layout with completion status
- **Chat Interface**: Message bubbles with character names
- **Decision Buttons**: Red Flag (✕) and Green Flag (💚)
- **Feedback Cards**: Educational content with icons

## 🛠️ Technical Implementation

### Recommended Tech Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Deployment**: Vercel/Netlify
- **Testing**: Jest + React Testing Library

### Data Structure
```typescript
interface Scenario {
  id: number;
  title: string;
  characters: {
    name: string;
    image: string;
  }[];
  conversation: Message[];
  correctAnswer: 'green' | 'red';
  explanation: string;
  truthToKeep: string;
  reflection: string;
  completed: boolean;
}

interface Message {
  speaker: string;
  text: string;
}
```

### Key Components
1. **LandingPage** - Hero section with CTA
2. **ScenarioGrid** - Display all scenarios
3. **ScenarioCard** - Individual scenario preview
4. **ChatInterface** - Interactive conversation
5. **DecisionButtons** - Green/Red flag choices
6. **FeedbackCard** - Educational content
7. **ProgressTracker** - Completion status

## 📱 Responsive Design

### Mobile-First Approach
- **Breakpoints**: 320px, 768px, 1024px, 1440px
- **Touch-Friendly**: Large buttons and tap targets
- **Swipe Gestures**: Optional swipe for decisions
- **Readable Text**: Minimum 16px font size

### Accessibility
- **Screen Reader**: ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG AA compliant
- **Focus Indicators**: Clear focus states

## 🎯 Educational Goals

### Learning Objectives
1. **Recognition**: Identify healthy vs unhealthy behaviors
2. **Communication**: Understand effective relationship communication
3. **Boundaries**: Learn about setting and respecting boundaries
4. **Self-Reflection**: Encourage personal growth and awareness

### Target Audience
- Young adults (18-35) navigating relationships
- People learning about healthy relationship boundaries
- Anyone interested in relationship psychology

## 📈 Success Metrics

### Engagement Metrics
- Scenarios completed per user
- Correct answer rate
- Time spent on each scenario
- Return visit rate

### Learning Metrics
- Knowledge retention (post-test scores)
- Behavioral change indicators
- User feedback and satisfaction

## 🚀 Future Enhancements

### Planned Features
- **Progress Analytics**: Detailed user performance tracking
- **Social Sharing**: Share insights on social media
- **Personalization**: Customized scenarios based on preferences
- **Expert Content**: Collaboration with relationship counselors
- **Multilingual Support**: Multiple language options
- **Dark Mode**: Alternative color scheme

### Technical Improvements
- **PWA Support**: Offline functionality
- **Push Notifications**: Reminder system
- **Data Analytics**: Advanced user behavior tracking
- **A/B Testing**: Optimize user experience

## 🤝 Contributing

### Development Guidelines
- Follow DRY principles
- Reuse existing components
- Write comprehensive tests
- Maintain accessibility standards
- Document code thoroughly

### Content Guidelines
- Create authentic, relatable scenarios
- Ensure diverse representation
- Focus on educational value
- Handle sensitive topics with care
- Maintain positive, growth-oriented framing

## 📄 License

This project is inspired by the original app at [https://greenflag-redflag-guide.lovable.app/](https://greenflag-redflag-guide.lovable.app/). Please respect the original creators' work and use this analysis for educational purposes only.

## 📞 Contact

For questions about this analysis or implementation, please refer to the original app creators or use this as a reference for building similar educational tools.

---

**Note**: This README is based on analysis of the original app. The actual implementation may vary based on specific requirements and design decisions. 