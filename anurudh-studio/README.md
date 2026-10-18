# Anurudh Studio - Portfolio Website

Plain HTML + CSS + JavaScript. No framework and no build step.
Live link (after deploy): https://anurudhstudio.github.io/portfolio/

## Folder structure

```
portfilo/
  index.html        Home
  about.html        About
  services.html     Services
  projects.html     Projects
  contact.html      Contact
  404.html          Page not found
  css/style.css     All the design (colors are at the top in :root)
  js/config.js      Your details: email, links, contact form
  js/projects.js    YOUR APPS LIST (edit this to add a new app)
  js/main.js        Menu, animations, project cards, contact form
  images/
    profile.jpg     Your photo
    favicon.svg     Browser tab icon
    projects/       App screenshots
```

## How to edit the website later

| I want to...                    | Edit this file                                  |
|---------------------------------|-------------------------------------------------|
| Add a new app                   | `js/projects.js` (copy one block, paste on top) |
| Add an app screenshot           | put it in `images/projects/`, set `image:` in `js/projects.js` |
| Add the Play Store link of app  | `link:` and `linkLabel:` in `js/projects.js`    |
| Change email / LinkedIn / GitHub| `js/config.js`                                  |
| Change my photo                 | replace `images/profile.jpg`                    |
| Change About text / skills      | `about.html`                                    |
| Change services                 | `services.html` (and the 3 cards in `index.html`) |
| Change colors                   | top of `css/style.css` (`:root` block)          |

### Adding a new app (example)

Open `js/projects.js` and paste this at the top of the list (right after `window.PROJECTS = [`):

```js
  {
    title: "My New App",
    description: "One or two short sentences about the app.",
    category: "app",
    tags: ["React Native", "Supabase"],
    emoji: "🚀",
    image: "images/projects/my-new-app.png",
    link: "https://play.google.com/store/apps/details?id=your.app.id",
    linkLabel: "View on Play Store",
    status: "Live on Play Store",
    featured: true
  },
```

Set `featured: true` to also show it on the Home page (the first 3 featured apps are shown).

## Publish an update to GitHub

Easiest way (no commands):
1. Open your repo `portfilo` on github.com.
2. Click the file you changed (e.g. `js/projects.js`) > pencil icon > edit > Commit changes.
   For new files: Add file > Upload files > drag files > Commit changes.
3. Wait 1-2 minutes. The live site updates automatically.

With git (if you use it on your computer):
```
git add .
git commit -m "Add new app"
git push
```

If you do not see the change, hard refresh the page (Ctrl+Shift+R) because the browser may cache old files.

## First-time deploy with GitHub Pages

1. On GitHub (account: anurudhstudio) create a new repository named `portfilo`. Keep it Public.
2. Upload all files and folders. `index.html` must be in the root of the repo.
3. Settings > Pages > Source: "Deploy from a branch" > Branch `main`, folder `/ (root)` > Save.
4. After 1-2 minutes the site is live at https://anurudhstudio.github.io/portfilo/

## Contact form (optional, free)

1. Sign up at formspree.io and create a form.
2. Paste the form URL (`https://formspree.io/f/xxxx`) into `formEndpoint` in `js/config.js`.
3. If left empty, the form opens the visitor's email app (mailto).
