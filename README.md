<div align="center">

# 🍳 EASYMEAL
### *The No.1 Recipe Engine: cook with what you already have.*

**Open the fridge, type what's inside, and EasyMeal tells you what to make for dinner.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Auth-Supabase-3ECF8E?logo=supabase&logoColor=white)
![Spoonacular](https://img.shields.io/badge/Recipes-Spoonacular-FF6B35)
[![Netlify](https://img.shields.io/badge/Live%20on-Netlify-00C7B7?logo=netlify&logoColor=white)](https://eaziimeal.netlify.app/)

### 👉 [**Live Demo: eaziimeal.netlify.app**](https://eaziimeal.netlify.app/) 👈

[Features](#-features) · [Try the Demo](#-try-it-in-10-seconds) · [Tech Stack](#-tech-stack) · [Run Locally](#-getting-started) · [Deploy](#-deployment)

</div>

---

## 🤔 The Problem

Half a bag of spinach, two eggs, some leftover chicken and no idea what to cook. Most recipe sites start from the dish and expect you to go shopping for it.

## 💡 The Solution

**EasyMeal works the other way round.** You list the ingredients you have, and it searches thousands of recipes to find ones you can make now or with only a few extra items. For each recipe it shows:

- ✅ **the ingredients you already have**
- 🛒 **the ingredients you still need**

Every result is effectively a ready-made shopping list.

---

## ✨ Features

| | Feature | What it does |
|---|---|---|
| 🥕 | **Ingredient-first search** | Add ingredients one at a time from the sidebar and get up to 10 recipes matched against them, powered by the Spoonacular API. |
| 🧾 | **Have vs. need breakdown** | Each recipe's ingredients are split into what you have (green) and what you still need to buy (orange). |
| ⭐ | **Featured recipes** | Hand-picked dishes (Spaghetti Carbonara, Avocado Toast, Grilled Chicken Salad) so the dashboard is never empty. |
| 🔐 | **Secure accounts** | Sign up, log in, email confirmation and session persistence through Supabase Auth. |
| 🛡️ | **Protected routes** | The dashboard and profile are only reachable when signed in; everyone else is sent back to the landing page. |
| 👤 | **Profile management** | Update your name, phone and bio, which are saved to your Supabase user metadata. |
| 🌙 | **Dark mode** | One-click theme toggle, remembered across visits. |
| 📱 | **Responsive layout** | Collapsible sidebar and fluid grids that work on phones, tablets and desktops. |
| 🎟️ | **Guest demo login** | A single **Continue as Guest** button signs you straight in, so there's no sign-up needed to explore. |

---

## 🚀 Try It in 10 Seconds

Reviewing this project for a portfolio or hiring process? Skip the sign-up:

1. Open **[eaziimeal.netlify.app](https://eaziimeal.netlify.app/)** and click **Get Started**
2. Hit **Continue as Guest**

Or log in manually with:

```
Email:    demo@easymeal.com
Password: easy0123
```

---

## 🧭 How It Works

```
┌──────────────┐     ┌───────────────────┐     ┌──────────────────────┐
│  You type    │ ──▶ │  EasyMeal builds  │ ──▶ │  Spoonacular returns │
│  "chicken,   │     │  an ingredient    │     │  recipes ranked by   │
│  rice, egg"  │     │  query            │     │  ingredient overlap  │
└──────────────┘     └───────────────────┘     └──────────┬───────────┘
                                                          │
                     ┌───────────────────────────────────▼───────────┐
                     │  Recipe cards → click one → ✅ Have / 🛒 Need │
                     └───────────────────────────────────────────────┘
```

Authentication runs alongside it: Supabase handles sign-up, email confirmation and sessions, while a React `AuthContext` and `ProtectedRoute` wrapper keep private pages private.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **UI** | React 19, React Router 7 |
| **Build** | Vite (Rolldown) |
| **Auth & user data** | Supabase (`@supabase/supabase-js`) |
| **Recipe data** | [Spoonacular Food API](https://spoonacular.com/food-api) |
| **State** | React Context (`AuthContext`, `ThemeContext`) |
| **Styling** | CSS modules and inline style objects with theme-aware colors |
| **Linting** | ESLint 9 with React Hooks and React Refresh plugins |
| **Hosting** | Netlify (SPA redirects preconfigured) |

---

## 📂 Project Structure

```
Easy_MEAL/
├── README.md
└── web/                         ← the React app lives here
    ├── index.html
    ├── netlify.toml             ← build + SPA redirect config
    ├── ENV_SETUP.md             ← deployment env-var guide
    ├── vite.config.js
    └── src/
        ├── main.jsx             ← app entry, providers
        ├── App.jsx              ← routes (/, /dashboard, /profile)
        ├── AuthContext.jsx      ← Supabase session state
        ├── ThemeContext.jsx     ← dark mode (persisted)
        ├── ProtectedRoute.jsx   ← auth guard
        ├── supabase.js          ← Supabase client
        ├── pages/
        │   ├── Home.jsx         ← landing page
        │   ├── Dashboard.jsx    ← search, results, recipe modal
        │   ├── ProfilePage.jsx  ← profile, settings, account
        │   ├── LoginPage.jsx
        │   └── SignupPage.jsx
        ├── components/          ← Navbar, Sidebar, Modal, forms, UI kit
        ├── CSS/                 ← form and modal styles
        └── assets/              ← featured recipe images
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- A free **Spoonacular API key**: [get one here](https://spoonacular.com/food-api/console#Profile)

### 1. Clone and install

```bash
git clone https://github.com/ODIRAA-git/RECIPE_ENGINE.git
cd RECIPE_ENGINE/web
npm install
```

### 2. Add your environment variables

Create `web/.env`:

```env
VITE_SPOONACULAR_API_KEY=your_spoonacular_key_here
```

> `.env` is git-ignored, so your key stays on your machine.

### 3. Fire it up 🔥

```bash
npm run dev
```

Open **http://localhost:5173** and start cooking.

### Available scripts (inside `web/`)

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build for production into `web/dist` |
| `npm run preview` | Preview the production build locally |

---

## ☁️ Deployment

EasyMeal is set up for **Netlify**. `netlify.toml` already points the build at `web/` and adds the SPA redirect, so page refreshes on `/dashboard` work.

1. Connect the repo in Netlify. The build settings are read from `netlify.toml`.
2. Add these environment variables under **Site settings → Environment variables**:
   - `VITE_SPOONACULAR_API_KEY`
   - `VITE_SITE_URL`: your live Netlify URL, used for email-confirmation redirects
3. In Supabase, go to **Authentication → URL Configuration** and add your Netlify URL to **Redirect URLs**.

The full walkthrough is in [web/ENV_SETUP.md](web/ENV_SETUP.md).

---

## 🗺 Roadmap

- [ ] ❤️ Save favorite recipes to your account
- [ ] 📊 Live profile stats (searches, recipes viewed)
- [ ] 🥦 Dietary filters: vegetarian, vegan, gluten-free
- [ ] 🧮 Nutrition and calorie info per recipe
- [ ] 🛒 Export the "You'll Also Need" list as a shopping list
- [ ] 📅 Weekly meal planner

---

## 🤝 Contributing

Ideas, bug reports and pull requests are all welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feature/amazing-idea`
3. Commit: `git commit -m "feat: add amazing idea"`
4. Push and open a Pull Request

---

<div align="center">

**Built with ☕ and an empty fridge by [ODIRAA-git](https://github.com/ODIRAA-git)**

*If EasyMeal saved your dinner, drop a ⭐ on the repo!*

</div>
