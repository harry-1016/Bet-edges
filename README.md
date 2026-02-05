# 🏏 T20 Betting Calculator PWA

A Progressive Web App for analyzing T20 cricket betting opportunities with pre-match analysis, live betting calculations, and over/under predictions.

## Features

- **Pre-Match Analysis**: Calculate betting edges using team strength, venue conditions, and historical data
- **Live Betting**: Real-time win probability showing both **chasing** and **defending** team probabilities
- **Over/Under Calculator**: Analyze total runs betting opportunities
- **Bet Log**: Track your betting history and performance statistics
- **PWA Features**: Install on mobile/desktop, works offline, fast loading

## Demo

Visit the live app: [Your GitHub Pages URL]

## Installation

### Install as PWA (Recommended)

1. Visit the app in Chrome, Edge, or Safari
2. Click the install button in the address bar
3. The app will be added to your home screen/app drawer

### Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/t20-betting-calculator.git

# Navigate to directory
cd t20-betting-calculator

# Open with a local server (required for PWA features)
python -m http.server 8000
# or
npx serve

# Visit http://localhost:8000
```

## Deployment to GitHub Pages

1. **Create a new repository** on GitHub
2. **Push your code**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/t20-betting-calculator.git
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select "main" branch as source
   - Click Save
   - Your app will be live at `https://yourusername.github.io/t20-betting-calculator/`

## Project Structure

```
t20-betting-calculator/
├── index.html          # Main HTML file
├── app.js              # JavaScript functionality
├── sw.js               # Service Worker for offline support
├── manifest.json       # PWA manifest
├── icon-192.png        # App icon (192x192)
├── icon-512.png        # App icon (512x512)
└── README.md           # This file
```

## Technologies Used

- HTML5
- CSS3 (Responsive Design)
- Vanilla JavaScript
- Service Workers
- Local Storage
- PWA Best Practices

## How to Use

### Pre-Match Calculator
1. Enter team names and match details
2. Input team statistics (form, squad quality, powerplay runs, etc.)
3. Add venue conditions and bookmaker odds
4. Click "Calculate Edge" to see betting recommendations

### Live Calculator
1. Enter current match state (score, wickets, overs)
2. Input chasing team and defending team names
3. Enter target score and innings type
4. Adjust for batsmen and bowler quality
5. Get both **chasing probability** and **defending probability** with betting edge analysis

### Over/Under Calculator
1. Select innings and enter total line
2. Input batting team's average and strike rate
3. Add bowling team's economy and runs conceded
4. See projected score and betting recommendation

### Bet Log
1. Record all your bets with details
2. Track wins, losses, and pending bets
3. View performance statistics (ROI, win rate, P/L)
4. Analyze your betting history

## Browser Support

- Chrome/Edge (Recommended)
- Safari
- Firefox
- Opera

## Offline Support

The app works offline after the first visit thanks to Service Worker caching.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Disclaimer

This tool is for educational and analytical purposes only. Betting involves risk. Please bet responsibly and within your means. This calculator provides estimates and should not be considered financial advice.

## Author

Created with ❤️ for cricket betting enthusiasts

## Roadmap

- [ ] Add more league options
- [ ] Historical data integration
- [ ] Export bet log to CSV
- [ ] Dark mode
- [ ] More advanced statistical models
- [ ] Player props calculator
- [ ] Toss outcome predictor

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

⭐ If you find this useful, please star the repository!
