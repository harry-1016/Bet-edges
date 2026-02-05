# PWA Installation Troubleshooting

## Issue: App Not Opening from Home Screen

If the app installed but doesn't open when tapped from the home screen, try these solutions:

### Solution 1: Clear Cache and Reinstall

**On Mobile (Chrome/Safari):**
1. Uninstall the app from home screen (long press > remove)
2. Clear browser cache:
   - Chrome: Settings > Privacy > Clear browsing data
   - Safari: Settings > Safari > Clear History and Website Data
3. Visit the site again
4. Install fresh from browser

**On Desktop (Chrome/Edge):**
1. Go to chrome://apps
2. Right-click the app > Remove from Chrome
3. Visit chrome://serviceworker-internals
4. Find your app and click "Unregister"
5. Clear cache (Ctrl+Shift+Delete)
6. Reinstall

### Solution 2: Force Service Worker Update

1. Open the web app in browser (not installed version)
2. Open DevTools (F12)
3. Go to Application tab
4. Click "Service Workers" in left sidebar
5. Check "Update on reload"
6. Click "Unregister" on old service worker
7. Refresh page (Ctrl+R)
8. Reinstall app

### Solution 3: Check Manifest Settings

The manifest.json has been updated with:
- `start_url: "./index.html"` (relative path)
- `scope: "./"` (to work with GitHub Pages subdirectories)
- Relative icon paths

If deploying to GitHub Pages at `username.github.io/repo-name/`:
- The `./ ` paths will work correctly
- No need to change anything

### Solution 4: Verify Deployment

**For GitHub Pages:**
1. Ensure all files are in the root of your repository
2. GitHub Pages is enabled on `main` branch
3. Wait 2-3 minutes after pushing changes
4. Try accessing: `https://username.github.io/repo-name/index.html`
5. Check browser console (F12) for errors

### Solution 5: Hard Refresh

**Mobile:**
- Chrome Android: Menu > Settings > Site settings > Find your site > Clear & reset
- Safari iOS: Settings > Safari > Advanced > Website Data > Remove site

**Desktop:**
- Windows: Ctrl + Shift + R
- Mac: Cmd + Shift + R

### Solution 6: Check PWA Requirements

Ensure your deployment has:
- ✅ HTTPS enabled (GitHub Pages does this automatically)
- ✅ manifest.json in root
- ✅ Valid service worker (sw.js)
- ✅ Valid icons (192x192 and 512x512)

### Debugging Tips

**Check Service Worker Status:**
```javascript
// In browser console
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  console.log('Service Workers:', registrations);
});
```

**Check Manifest:**
```javascript
// In browser console, go to Application > Manifest
// Should show all details without errors
```

**Common Errors:**

1. **"Failed to load resource: net::ERR_FAILED"**
   - Check file paths are correct
   - Ensure files exist in deployment

2. **"Service worker registration failed"**
   - Check sw.js syntax
   - Verify HTTPS is enabled

3. **"Manifest: Line 1, column 1, Unexpected token"**
   - Check manifest.json is valid JSON
   - No trailing commas

### Testing Locally

Before deploying, test locally:

```bash
# Use a local server (required for PWA)
python -m http.server 8000
# or
npx serve

# Visit http://localhost:8000
```

### Platform-Specific Notes

**iOS Safari:**
- Requires `apple-touch-icon` (already in index.html)
- May need to add to home screen manually
- Standalone mode works differently than Android

**Android Chrome:**
- Shows install prompt automatically if criteria met
- Better PWA support than iOS
- Can force install via menu

**Desktop Chrome/Edge:**
- Install button appears in address bar
- Can also install via menu: More tools > Install

### Still Not Working?

1. **Check GitHub Pages URL**: Make sure you're using the correct URL
2. **Wait for DNS**: Changes can take up to 24 hours
3. **Try Different Browser**: Test in Chrome, Safari, Firefox
4. **Check Console**: Look for red errors in DevTools
5. **Verify HTTPS**: PWAs require secure context

### After Fixing

1. Uninstall old version completely
2. Clear all cache and data
3. Visit fresh in browser
4. Wait for service worker to register
5. Install again

---

## Quick Fix Commands

If you've updated the files and pushed to GitHub:

```bash
# Force update service worker version
# Edit sw.js and change version number:
const CACHE_NAME = 't20-betting-calculator-v2'; # increment version

# Then push changes
git add .
git commit -m "Update service worker version"
git push
```

This forces browsers to download the new service worker.

---

## Contact

If issues persist, check:
- Browser console for specific errors
- Network tab for failed requests
- Application tab for manifest/service worker status

The updated files now use relative paths (`./`) which should work on both root domains and subdirectories (like GitHub Pages repos).
