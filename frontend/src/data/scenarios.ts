export interface Character {
  name: string;
  profilePicture: string;
}

export interface Message {
  speaker: string;
  text: string;
}

export interface Feedback {
  explanation: string;
  truthToKeep: string;
  reflection: string;
}

export interface Scenario {
  id: number;
  title: string;
  characters: Character[];
  status: 'Not Attempted' | 'Completed' | 'In Progress';
  conversation: Message[];
  correctAnswer: 'green' | 'red';
  feedback: Feedback;
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Dress Code Drama",
    characters: [
      { name: "Priya", profilePicture: "/characters/priya.jpg" },
      { name: "Kabir", profilePicture: "/characters/kabir.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Kabir",
        text: "Hey Priya, can I say something honestly? I feel a little uncomfortable when people stare. I know it's my own insecurity."
      },
      {
        speaker: "Priya",
        text: "Thanks for telling me. I feel confident in what I wear, but I'm glad we can talk about this."
      },
      {
        speaker: "Kabir",
        text: "I trust you — just working through my feelings."
      }
    ],
    correctAnswer: "green",
    feedback: {
      explanation: "It's okay to feel insecure — what matters is how you communicate it, with respect.",
      truthToKeep: "You can be vulnerable without being controlling.",
      reflection: "Have you ever shared something uncomfortable without making it the other person's fault?"
    }
  },
  {
    id: 2,
    title: "Secret Sharing",
    characters: [
      { name: "Rani", profilePicture: "/characters/rani.jpg" },
      { name: "Meena", profilePicture: "/characters/meena.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Rani",
        text: "You won't believe what Priya told me. Full gossip!"
      },
      {
        speaker: "Meena",
        text: "Wait, didn't she say that in confidence?"
      },
      {
        speaker: "Rani",
        text: "Yeah, but you're my bestie. It's fine!"
      }
    ],
    correctAnswer: "red",
    feedback: {
      explanation: "Sharing secrets without consent breaks trust.",
      truthToKeep: "Being close to someone doesn't mean breaking others' trust.",
      reflection: "What does it take to build broken trust?"
    }
  },
  {
    id: 3,
    title: "Love or Isolation?",
    characters: [
      { name: "Arjun", profilePicture: "/characters/arjun.jpg" },
      { name: "Diya", profilePicture: "/characters/diya.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Arjun",
        text: "I don't want you hanging out with your friends anymore. They're a bad influence."
      },
      {
        speaker: "Diya",
        text: "But they're my closest friends. We've known each other for years."
      },
      {
        speaker: "Arjun",
        text: "If you really loved me, you'd choose me over them."
      }
    ],
    correctAnswer: "red",
    feedback: {
      explanation: "Isolating someone from their support system is a major red flag.",
      truthToKeep: "Love should expand your world, not shrink it.",
      reflection: "How do you feel when someone tries to control who you spend time with?"
    }
  },
  {
    id: 4,
    title: "Private Stalker",
    characters: [
      { name: "Aman", profilePicture: "/characters/aman.jpg" },
      { name: "Reema", profilePicture: "/characters/reema.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Aman",
        text: "I went through your phone last night. I needed to know who you're talking to."
      },
      {
        speaker: "Reema",
        text: "That's a huge violation of my privacy. You can't just go through my things."
      },
      {
        speaker: "Aman",
        text: "If you have nothing to hide, why are you so defensive?"
      }
    ],
    correctAnswer: "red",
    feedback: {
      explanation: "Invading privacy and justifying it with suspicion is controlling behavior.",
      truthToKeep: "Trust is built through communication, not surveillance.",
      reflection: "What would it feel like to have someone constantly monitoring your life?"
    }
  },
  {
    id: 5,
    title: "Fast Forward Intensity",
    characters: [
      { name: "Tina", profilePicture: "/characters/tina.jpg" },
      { name: "Ravi", profilePicture: "/characters/ravi.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Ravi",
        text: "I love you so much. Let's move in together next month."
      },
      {
        speaker: "Tina",
        text: "We've only been dating for two weeks. That's way too fast."
      },
      {
        speaker: "Ravi",
        text: "When you know, you know. Don't you feel the same way?"
      }
    ],
    correctAnswer: "red",
    feedback: {
      explanation: "Rushing into major commitments without mutual agreement is concerning.",
      truthToKeep: "Healthy relationships develop at a pace comfortable for both people.",
      reflection: "Why might someone want to rush into serious commitments?"
    }
  },
  {
    id: 6,
    title: "Good Vibes Only?",
    characters: [
      { name: "Varun", profilePicture: "/characters/varun.jpg" },
      { name: "Neha", profilePicture: "/characters/neha.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Neha",
        text: "I'm feeling really down about my job situation. Can we talk?"
      },
      {
        speaker: "Varun",
        text: "Come on, stay positive! You're always so negative."
      },
      {
        speaker: "Neha",
        text: "I just need someone to listen right now."
      },
      {
        speaker: "Varun",
        text: "You'll feel better if you just think happy thoughts."
      }
    ],
    correctAnswer: "red",
    feedback: {
      explanation: "Dismissing someone's feelings with toxic positivity is invalidating.",
      truthToKeep: "Real support means being present for all emotions, not just positive ones.",
      reflection: "How do you feel when someone tells you to 'just be positive'?"
    }
  },
  {
    id: 7,
    title: "Jokes or Jabs?",
    characters: [
      { name: "Alok", profilePicture: "/characters/alok.jpg" },
      { name: "Rhea", profilePicture: "/characters/rhea.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Alok",
        text: "Haha, you're so sensitive. It was just a joke!"
      },
      {
        speaker: "Rhea",
        text: "That didn't feel like a joke. It felt mean."
      },
      {
        speaker: "Alok",
        text: "You can't take a joke. Lighten up!"
      }
    ],
    correctAnswer: "red",
    feedback: {
      explanation: "Using 'just a joke' to dismiss hurtful comments is gaslighting.",
      truthToKeep: "Jokes should make both people laugh, not just one person.",
      reflection: "What's the difference between playful teasing and hurtful comments?"
    }
  },
  {
    id: 8,
    title: "Privacy Please",
    characters: [
      { name: "Ishaan", profilePicture: "/characters/ishaan.jpg" },
      { name: "Zoya", profilePicture: "/characters/zoya.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Zoya",
        text: "I need some time alone to process my thoughts."
      },
      {
        speaker: "Ishaan",
        text: "Of course. Take all the time you need. I'm here when you're ready."
      },
      {
        speaker: "Zoya",
        text: "Thank you for understanding. I really appreciate that."
      }
    ],
    correctAnswer: "green",
    feedback: {
      explanation: "Respecting someone's need for space shows emotional maturity.",
      truthToKeep: "Healthy relationships allow for individual needs and boundaries.",
      reflection: "How do you feel when someone respects your need for space?"
    }
  },
  {
    id: 9,
    title: "All My Exes Were Crazy",
    characters: [
      { name: "Tanya", profilePicture: "/characters/tanya.jpg" },
      { name: "Sahil", profilePicture: "/characters/sahil.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Sahil",
        text: "All my exes were crazy. They all had issues."
      },
      {
        speaker: "Tanya",
        text: "That's a lot of people with problems. What's the common denominator?"
      },
      {
        speaker: "Sahil",
        text: "What are you trying to say?"
      }
    ],
    correctAnswer: "red",
    feedback: {
      explanation: "If everyone else is the problem, you might be the problem.",
      truthToKeep: "Healthy people take responsibility for their role in relationship dynamics.",
      reflection: "What patterns do you notice in your past relationships?"
    }
  },
  {
    id: 10,
    title: "I Don't Do Feelings",
    characters: [
      { name: "Riya", profilePicture: "/characters/riya.jpg" },
      { name: "Kunal", profilePicture: "/characters/kunal.jpg" }
    ],
    status: "Not Attempted",
    conversation: [
      {
        speaker: "Kunal",
        text: "I don't do feelings. I'm not emotional like that."
      },
      {
        speaker: "Riya",
        text: "But we're in a relationship. Don't you want to connect emotionally?"
      },
      {
        speaker: "Kunal",
        text: "I show love through actions, not words. That should be enough."
      }
    ],
    correctAnswer: "red",
    feedback: {
      explanation: "Refusing emotional intimacy while expecting physical/romantic connection is unfair.",
      truthToKeep: "Emotional availability is essential for healthy relationships.",
      reflection: "What does emotional intimacy mean to you?"
    }
  }
];

export const getScenarioById = (id: number): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};

export const updateScenarioStatus = (id: number, status: Scenario['status']): void => {
  const scenario = scenarios.find(s => s.id === id);
  if (scenario) {
    scenario.status = status;
  }
}; 