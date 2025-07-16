# 📰 NewsHub

**NewsHub** is a fully responsive, modern, and fast frontend-only React News Aggregator application built using **React.js with TypeScript**, **Tailwind CSS**, and **NewsAPI**. It allows users to browse top headlines by category, search for news, and save their favorite articles — all without a backend!

---

## 🚀 Features

### ✅ Top Headlines by Category
- View top headlines from multiple categories:
  - General
  - Technology
  - Business
  - Sports
  - Entertainment
- Uses `https://newsapi.org/v2/top-headlines` endpoint.

### 🔍 Search News by Keyword
- Search for news articles using custom keywords.
- Powered by `https://newsapi.org/v2/everything?q=your-query`.

### 💖 Favorites System
- Click on the ❤️ icon to save or unsave articles.
- Favorite articles are stored in `localStorage`.
- A dedicated `/favorites` page displays saved articles.

### 📄 Responsive News Cards
- Each card shows:
  - Article image
  - Title
  - Short description (3 lines)
  - Publish date
  - “Read More” button (opens in a new tab)

### 🔁 Routing with React Router
- `/` → Home (Top Headlines by Category)
- `/search` → News search results
- `/favorites` → Saved favorite articles

### 🧠 State Management
- Context API to manage favorite articles
- Favorites persist using `localStorage`

### 🔐 API Key Security
- API key is stored in `.env` file as `REACT_APP_NEWS_API_KEY`

### ⚙️ Error Handling & Load States
- Shows loading spinner while fetching
- Error message if API fails
- Message when no articles found

### 📱 Fully Responsive UI
- Works perfectly on mobile, tablet, and desktop
- Built with Tailwind CSS

---

## 🛠 Tech Stack

- React.js (with TypeScript)
- Tailwind CSS
- Axios
- React Router DOM
- Context API + localStorage
- NewsAPI (https://newsapi.org)

---

## Project SetUp Guide 

- Clone the repositry
- Change directory to NewsHub
- Open terminal and run "npm install" 
- To start the project type "npm run dev" in terminal and run
- Click on the link on the terminal to show the project output

  ## ScreenShots

  
<img width="1366" height="768" alt="Screenshot 2025-07-16 105557" src="https://github.com/user-attachments/assets/e4d9f545-b772-43d6-86cb-e7029994d64f" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/9c0e2b81-58c2-4f89-9321-e1b3e6d3a409" />

