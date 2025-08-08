# Japanese Verb Conjugation Learner

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-blue?style=for-the-badge&logo=vercel)](https://japanese-verb-learner.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Ling-Hong/japanese-verb-learner)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A web application to help you learn and practice Japanese verb conjugations.

## 🌐 Live Demo

**Try the app now:** [https://japanese-verb-learner.vercel.app/](https://japanese-verb-learner.vercel.app/)

🎯 **Practice Mode** - Try any of 18 conjugation forms  
📅 **Structured Study** - 2-week comprehensive learning plan  
📊 **Mastery Dashboard** - Track your progress and mastery scores

## Features

- **18 Conjugation Forms** - Complete coverage from basic to advanced
- **100+ Japanese Verbs** - Extensive database with difficulty levels
- **Interactive Practice Mode** - Real-time feedback and scoring
- **Structured Study Plan** - 2-week comprehensive learning cycle
- **Mastery Tracking** - Progress monitoring and adaptive learning
- **Multiple Verb Types** - Ichidan, Godan, and Irregular verbs
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Beautiful, Modern UI** - Clean interface with Tailwind CSS

## Structured Study Plan

### Week 1 – Core & Common Functional Forms

#### Day 1 – Basic & Polite  
**Drill:** dictionary → masu → past polite → past plain.  
**Application:** Write 3 sentences in plain form, 3 in polite form.

#### Day 2 – Te-form & Progressive  
**Drill:** dictionary → te-form → progressive (〜ている).  
**Application:** Write 3 “right now” sentences.

#### Day 3 – Negative & Negative Past  
**Drill:** dictionary → negative present (ない) → negative past (なかった).  
**Application:** Write 3 “don’t do” sentences, 3 “didn’t do” sentences.

#### Day 4 – Potential & Volitional  
**Drill:** dictionary → potential (can) → volitional (let’s).  
**Application:** Write 3 “can do” sentences, 3 “let’s do” sentences.

#### Day 5 – Passive & Causative  
**Drill:** dictionary → passive → causative.  
**Application:** Write 2 sentences for each.

#### Day 6 – Review 1  
Take each verb through all forms from Days 1–5.

#### Day 7 – Context Practice  
Write a short diary entry using at least 8 of the forms covered this week.

---

### Week 2 – Advanced, Nuanced, & Less Common Forms

#### Day 8 – Causative-passive  
**Drill:** dictionary → causative-passive.  
**Application:** Write 2 sentences about “being made to do something.”

#### Day 9 – Imperative & Prohibitive  
**Drill:** dictionary → imperative → prohibitive (〜な).  
**Application:** Write 2 command sentences, 2 “don’t do” sentences.

#### Day 10 – Conditional  
**Drill:** past tense → たら, dictionary → ば.  
**Application:** Write 3 “if” sentences for each type.

#### Day 11 – Conjectural / Presumptive  
**Drill:** dictionary → でしょう / だろう.  
**Application:** Write 3 “probably” sentences.

#### Day 12 – Desire & Ease  
**Drill:** dictionary → たい-form, → 〜やすい, → 〜にくい.  
**Application:** Write 1 sentence for each variation.

#### Day 13 – Review 2  
Run every verb through all 18 forms without notes.

#### Day 14 – Full Cycle Challenge  
Pick 5 random verbs → run all 18 forms → write a short story using at least 10 different conjugations.

---

### How to Repeat the Cycle

- Keep a master verb list of about 100 verbs.  
- Every 2-week cycle, pick 10–15 verbs.  
- After ~4 cycles, you’ll have actively practiced all verbs with every conjugation form.


## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/japanese-verb-learner.git
cd japanese-verb-learner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Sharing with Friends

Want to share this app with friends? Check out our [Deployment Guide](DEPLOYMENT.md) for easy deployment options!

### Quick Deploy (Recommended):
```bash
# Deploy to Vercel (free hosting)
vercel

# Share the URL with friends!
```

### Local Sharing:
```bash
# Share on your local network
npm run dev
# Share: http://YOUR_IP_ADDRESS:3000
```

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

## Project Structure

```
japanese-verb-learner/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── data/          # Verb data and conjugation rules
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/            # Static assets
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Japanese language learning resources
- React and Next.js communities 
