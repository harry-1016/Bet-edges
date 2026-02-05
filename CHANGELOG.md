# Changelog

## Version 1.2 - Fixed Over/Under Tab (Current)

### Fixed
- **Over/Under Calculator**: Fixed ID conflict between Pre-Match and Over/Under tabs
  - Renamed `avgScore` to `avgScoreVenue` in Pre-Match tab
  - This was preventing Over/Under calculations from working properly
- **Improved Over/Under Algorithm**: 
  - Better probability calculation based on difference from line
  - More accurate projections using batting and bowling strength
  - Added visual highlighting for favored outcome (Over/Under)
  - Enhanced analysis with detailed breakdowns
- **Better Visual Feedback**:
  - Color-coded boxes showing which bet has better probability
  - Shows difference from line in projected score
  - Clearer edge indicators

### Enhanced
- Over/Under results now show innings type (1st, 2nd, or full match)
- Better recommendations based on edge size (>5% = strong, >2% = slight)
- More detailed analysis section with all key metrics

## Version 1.1 - PWA Installation Fix

### Fixed
- **PWA Installation**: App now opens correctly from home screen
  - Changed all paths from absolute (`/`) to relative (`./`)
  - Updated `start_url` in manifest.json to `./index.html`
  - Added `scope: "./"` for better subdirectory support
  - Updated Service Worker with relative paths
- **Service Worker Improvements**:
  - Added `self.skipWaiting()` for immediate activation
  - Added `self.clients.claim()` for faster takeover
  - Better error handling and offline fallback

### Added
- TROUBLESHOOTING.md guide for PWA installation issues
- Detailed debugging instructions for different platforms

## Version 1.0 - Initial Release

### Features
- **Pre-Match Calculator**: Analyze betting edges before match starts
  - Team strength metrics (form, squad quality, powerplay, death bowling)
  - Venue and pitch conditions
  - Toss impact and dew factor
  - Edge calculation vs bookmaker odds

- **Live Match Calculator**: Real-time win probability during matches
  - Chasing team probability with visual indicator
  - Defending team probability with visual indicator
  - Quality adjustments for batsmen and bowlers
  - Detailed metrics (required RR, current RR, balls remaining)
  - Edge detection vs live odds

- **Over/Under Calculator**: Total runs betting analysis
  - Batting team statistics
  - Bowling team statistics
  - Projected score calculation
  - Over/Under probabilities with edges

- **Bet Log**: Track betting performance
  - Add bets with full details
  - Automatic P/L calculation
  - Performance statistics (Win Rate, ROI, Total P/L)
  - Complete bet history

- **PWA Features**:
  - Install on mobile and desktop
  - Works offline after first visit
  - Fast loading with Service Worker caching
  - Home screen icon
  - Standalone app experience

### Technical
- Pure frontend (HTML, CSS, JavaScript)
- No backend required
- LocalStorage for bet logging
- Responsive design for all devices
- GitHub Pages compatible

---

## How to Update

If you've already deployed:

1. Pull the latest files from this zip
2. Push to your GitHub repository:
   ```bash
   git add .
   git commit -m "Update to v1.2 - Fix Over/Under tab"
   git push
   ```
3. Wait 2 minutes for GitHub Pages to update
4. Clear browser cache and reinstall PWA if needed

## Known Issues

None currently. If you find any issues, please report them!

## Future Roadmap

- [ ] Player props calculator
- [ ] Export bet log to CSV
- [ ] Dark mode toggle
- [ ] More advanced statistical models
- [ ] Historical data integration
- [ ] Toss outcome predictor
- [ ] Partnership betting calculator
