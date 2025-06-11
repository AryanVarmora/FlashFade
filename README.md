# 🧠 FlashFade – The Memory Decay Learning App

FlashFade is a full-stack memory-enhancing tool that simulates forgetting using visual decay. Inspired by the Ebbinghaus forgetting curve, FlashFade forces you to remember actively — or watch your notes slowly fade, blur, or glitch into oblivion.

> "Memory fades if unused. FlashFade makes that visible."

## 🌟 Features

- ⏳ **Time-Based Decay**: Flashcards decay visually (blur, glitch, vanish) if not reviewed on time
- 🔁 **Spaced Repetition (SRS)**: Built-in smart review engine based on your recall performance
- 🎴 **Custom Decks**: Organize by topic, subject, or tags. Import Anki/CSV
- 🌱 **Memory Garden**: Your memory is a garden—cards you review bloom, forgotten ones wilt
- 📈 **Progress Visualization**: Memory scores, review streaks, and decay graphs help you track retention
- 📦 **Offline Support (PWA)**: Review flashcards on the go—even offline

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Tailwind CSS, Framer Motion |
| State Management | Zustand |
| Backend | Node.js, Express |
| Database | MongoDB (via Mongoose) |
| Authentication | Firebase Auth |
| AI (Optional) | OpenAI for prompt-based flashcard generation |
| Hosting | Vercel (frontend), Render (backend) |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Firebase account
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flashfade.git
cd flashfade
```

2. Install dependencies:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
```bash
# In client directory
cp .env.example .env.local

# In server directory
cp .env.example .env
```

4. Start the development servers:
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend server (from client directory)
npm run dev
```

## 📁 Project Structure

```
flashfade/
├── client/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── utils/
├── server/           # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .gitignore
├── README.md
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Ebbinghaus forgetting curve
- Built with ❤️ for learners worldwide

---

## 📸 Visual Preview

> *(Coming soon: mockups and preview screenshots)*

---

## 📁 Project Structure

```plaintext
flashfade-memory-app/
├── client/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── utils/
├── server/           # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .gitignore
├── README.md
└── package.json
