# 🌟 Personal Portfolio — Setup & Customization Guide

## 📁 Files Included
```
portfolio/
├── index.html     ← Main HTML (all sections)
├── style.css      ← Full styling (dark theme, animations)
├── script.js      ← JavaScript (cursor, scroll reveal, forms)
└── README.md      ← This file
```

## 🚀 How to Run
1. Open the `portfolio/` folder
2. Double-click `index.html` — it opens directly in any browser
3. No server or build step needed!

---

## ✏️ What to Change (Quick Reference)

### 🔤 Personal Info
Search for these placeholders in `index.html` and replace:

| Placeholder | Replace with |
|---|---|
| `Your Name` | Your full name |
| `YN` | Your initials |
| `Your University Name` | Your actual university |
| `Your College Name` | Your +2 college |
| `Your School Name` | Your school name |
| `youremail@gmail.com` | Your real email |
| `yourusername` | Your GitHub/LinkedIn/Twitter handle |
| `Kathmandu, Nepal` | Your city if different |

### 🖼️ Profile Photo
In `index.html`, find `.avatar-placeholder` and replace with:
```html
<img src="your-photo.jpg" alt="Your Name" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"/>
```

### 📊 Skill Levels
In `style.css` and `index.html`, find `width:XX%` inside skill bars and adjust to your comfort level.

### 📈 Project Progress
Find `width:35%` etc. in `.progress-fill` elements and update to actual progress.

### 🏔️ Stats Bar Numbers
Find these in the `#about` section and update:
- `8+` → Your years coding or learning
- `₹2Cr+` → Remove or replace with something relevant
- `12` → Peaks/treks done
- `30+` → Projects/style pieces or any other stat

---

## 📧 Contact Form — Making It Work
The form currently simulates a send. To make it actually send emails:

**Option A — EmailJS (easiest, free):**
1. Sign up at https://emailjs.com
2. Add this before `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```
3. In `script.js`, replace the `setTimeout` block with:
```js
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
  .then(() => { formMsg.textContent = '✓ Sent!'; })
  .catch(() => { formMsg.textContent = 'Error. Try again.'; });
```

**Option B — Backend with Node.js + Nodemailer:**
Create a `server.js` with Express and Nodemailer for full control.

---

## 🎨 Color Customization
Open `style.css` and edit the `:root` variables at the top:
```css
:root {
  --gold:  #c9a84c;   /* Main accent — change to any color */
  --teal:  #1d9e75;   /* Available badge / success */
  --blue:  #3a8fd4;   /* Backend skill color */
  ...
}
```

---

## 📱 Sections List
| # | Section | ID |
|---|---|---|
| 1 | Hero | `#hero` |
| 2 | About Me | `#about` |
| 3 | Skills & Stack | `#skills` |
| 4 | Education | `#education` |
| 5 | Projects | `#projects` |
| 6 | Hobbies | `#hobbies` |
| 7 | Certifications | `#certifications` |
| 8 | Contact | `#contact` |

---

## 🌐 Deploying Online (Free)
1. **GitHub Pages** — Push to GitHub, enable Pages in Settings
2. **Netlify** — Drag & drop the folder at netlify.com
3. **Vercel** — Connect GitHub repo at vercel.com

---

Good luck! 🚀