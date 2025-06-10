# 🧠 FlashFade – The Memory Decay Learning App

FlashFade is a full-stack memory-enhancing tool that simulates forgetting using *visual decay*. Inspired by the Ebbinghaus forgetting curve, FlashFade forces you to remember actively — or watch your notes slowly fade, blur, or glitch into oblivion.

> “Memory fades if unused. FlashFade makes that visible.”

---

## 🌟 Features

- ⏳ **Time-Based Decay**  
  Flashcards decay visually (blur, glitch, vanish) if not reviewed on time.

- 🔁 **Spaced Repetition (SRS)**  
  Built-in smart review engine based on your recall performance.

- 🎴 **Custom Decks**  
  Organize by topic, subject, or tags. Import Anki/CSV.

- 🌱 **Memory Garden**  
  Your memory is a garden—cards you review bloom, forgotten ones wilt.

- 📈 **Progress Visualization**  
  Memory scores, review streaks, and decay graphs help you track retention.

- 📦 **Offline Support (PWA)**  
  Review flashcards on the go—even offline.

---

## 📸 Visual Preview

> *(Coming soon: mockups and preview screenshots)*

---

## 🛠 Tech Stack

| Layer         | Technology |
|---------------|------------|
| Frontend      | React, Tailwind CSS, Framer Motion |
| State Mgmt    | Zustand or Redux |
| Backend       | Node.js, Express |
| Database      | MongoDB (via Mongoose) |
| Authentication| Firebase Auth or Auth0 |
| AI (Optional) | OpenAI for prompt-based flashcard generation |
| Hosting       | Vercel (frontend), Render/GCP (backend) |

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
