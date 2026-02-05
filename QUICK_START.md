# 🚀 Quick Start Guide

## Your T20 Betting Calculator PWA is Ready!

All files have been created and are ready to deploy. Here's what you have:

### 📁 Files Included

1. **index.html** - Main application file with all calculators
2. **app.js** - JavaScript logic for calculations and bet logging
3. **sw.js** - Service Worker for offline functionality
4. **manifest.json** - PWA configuration
5. **icon-192.png** - App icon (192x192)
6. **icon-512.png** - App icon (512x512)
7. **README.md** - Project documentation
8. **DEPLOYMENT.md** - Detailed deployment instructions
9. **.gitignore** - Git ignore file

### ⚡ Deploy in 3 Steps

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Name it `t20-betting-calculator`
   - Choose Public, don't initialize

2. **Upload Files**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/t20-betting-calculator.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to Settings > Pages
   - Source: main branch / (root)
   - Save
   - Live in 2 minutes at: `https://YOUR_USERNAME.github.io/t20-betting-calculator/`

### 🎯 Features

✅ **Pre-Match Analysis** - Calculate betting edges before the match
✅ **Live Betting** - Real-time win probability during matches  
✅ **Over/Under** - Total runs betting calculator
✅ **Bet Log** - Track performance with stats (Win Rate, ROI, P/L)
✅ **PWA Ready** - Install on phone/desktop, works offline
✅ **Responsive** - Works on all devices
✅ **Fast** - Cached for instant loading

### 📱 Test Locally

```bash
# Navigate to your project folder
cd t20-betting-calculator

# Start a local server
python -m http.server 8000
# or use: npx serve

# Open browser
open http://localhost:8000
```

### 🔥 What Makes This Special

- **No Backend Required** - Pure frontend, runs anywhere
- **Offline First** - Works without internet after first load
- **Installable** - Add to home screen like a native app
- **Fast & Light** - Loads in under 1 second
- **Privacy Focused** - All data stays in your browser

### 📚 Need Help?

- Read **DEPLOYMENT.md** for detailed deployment guide
- Check **README.md** for feature documentation
- All files are production-ready, no build step needed

### 🎨 Customization Ideas

- Change colors in `index.html` (search for `#667eea` and `#764ba2`)
- Modify app name in `manifest.json`
- Add more calculators in `app.js`
- Customize icons if desired

---

**You're all set! Deploy and start calculating betting edges! 🏏**
