// ===== Anurudh Studio - your projects =====
// TO ADD A NEW APP: copy one block { ... }, paste it at the TOP of the list,
// and change the text. Save, upload to GitHub, done. No HTML editing needed.
//
// Fields:
//   title        App name
//   description  1-2 short sentences
//   category     "app", "learning" or "game" (creates the filter buttons automatically)
//   tags         Technologies used
//   emoji        Shown on the card if you have no screenshot
//   image        (optional) screenshot path, e.g. "images/projects/mini-shop.png"
//   link         (optional) Play Store or GitHub link of the app
//   linkLabel    (optional) Button text, e.g. "View on Play Store"
//   status       (optional) e.g. "In progress" or "Live on Play Store"
//   featured     true = also shown on the Home page (the first 3 featured apps are shown)

window.CATEGORY_LABELS = {
  app: "Apps",
  learning: "Learning",
  game: "Games"
};

window.PROJECTS = [
  {
    title: "Expense Tracker",
    description: "Add daily expenses and see your totals. Data is saved on the phone with AsyncStorage, so no internet is needed.",
    category: "app",
    tags: ["React Native", "AsyncStorage"],
    emoji: "💰",
    image: "",
    link: "",
    linkLabel: "",
    status: "",
    featured: true
  },
  {
    title: "MP Board Kids Learning Adventure",
    description: "An audio-first, offline learning game for Class 1-3 children covering Hindi, Maths and English.",
    category: "learning",
    tags: ["Expo", "Offline", "Audio"],
    emoji: "🎓",
    image: "",
    link: "",
    linkLabel: "",
    status: "",
    featured: true
  },
  {
    title: "Mini Shop",
    description: "An e-commerce style practice app with a product list, a cart and data from Supabase.",
    category: "app",
    tags: ["Expo Router", "Supabase"],
    emoji: "🛒",
    image: "",
    link: "",
    linkLabel: "",
    status: "",
    featured: true
  },
  {
    title: "Monetized Android App",
    description: "An app with AdMob ads and in-app purchases.",
    category: "app",
    tags: ["AdMob", "IAP", "Supabase"],
    emoji: "💎",
    image: "",
    link: "",
    linkLabel: "",
    status: "In progress",
    featured: false
  }
];
