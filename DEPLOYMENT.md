# Deployment Guide

## Quick Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Enter repository name: `t20-betting-calculator` (or your preferred name)
3. Choose "Public" visibility
4. **Do NOT** initialize with README (we already have one)
5. Click "Create repository"

### Step 2: Push Code to GitHub

Open terminal in your project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - T20 Betting Calculator PWA"

# Add your GitHub repository as remote
# Replace 'yourusername' with your actual GitHub username
git remote add origin https://github.com/yourusername/t20-betting-calculator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down and click **Pages** (left sidebar)
4. Under "Source":
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://yourusername.github.io/t20-betting-calculator/`

### Step 4: Verify Deployment

1. Visit your GitHub Pages URL
2. Test all features:
   - Pre-match calculator
   - Live calculator
   - Over/Under calculator
   - Bet log functionality
3. Try installing as PWA:
   - Chrome: Click install icon in address bar
   - Mobile: "Add to Home Screen" from browser menu

## Custom Domain (Optional)

### Using Custom Domain

1. Buy a domain from any provider (Namecheap, GoDaddy, etc.)
2. In GitHub repository Settings > Pages:
   - Enter your custom domain
   - Click Save
3. Add DNS records at your domain provider:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   
   Type: CNAME
   Host: www
   Value: yourusername.github.io
   ```
4. Wait for DNS propagation (can take up to 48 hours)

## Updating Your App

After making changes to your code:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# GitHub Pages will automatically rebuild (1-2 minutes)
```

## Alternative Deployment Options

### Netlify

1. Create account at https://netlify.com
2. Drag and drop your project folder
3. Site will be live instantly
4. Free SSL and custom domain support

### Vercel

1. Create account at https://vercel.com
2. Import your GitHub repository
3. Click Deploy
4. Automatic deployments on every push

### Cloudflare Pages

1. Create account at https://pages.cloudflare.com
2. Connect your GitHub repository
3. Deploy with one click
4. Free and fast global CDN

## Troubleshooting

### PWA not installing?
- Ensure you're using HTTPS (GitHub Pages provides this automatically)
- Check browser console for errors
- Clear browser cache and try again

### Icons not showing?
- Verify icon files exist in root directory
- Check manifest.json paths
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Service Worker not caching?
- Check sw.js is in root directory
- Verify HTTPS is enabled
- Check browser console for Service Worker errors
- Unregister old service workers in DevTools > Application > Service Workers

### 404 Errors on GitHub Pages?
- Ensure all file paths are relative (no leading /)
- Check file names are correct (case-sensitive)
- Wait a few minutes after pushing changes

## Performance Tips

1. **Enable Compression**: GitHub Pages automatically gzips files
2. **Optimize Images**: Icons are already optimized
3. **Cache Strategy**: Service Worker caches everything for instant loading
4. **Lighthouse Score**: Should achieve 90+ in all categories

## Testing Checklist

Before announcing your app:

- [ ] All calculators work correctly
- [ ] Bet log saves and loads data
- [ ] PWA installs on desktop
- [ ] PWA installs on mobile
- [ ] Works offline after first visit
- [ ] Responsive on all screen sizes
- [ ] No console errors
- [ ] Icons display correctly

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify all files are uploaded to GitHub
3. Ensure GitHub Pages is enabled
4. Wait 2-3 minutes after pushing changes
5. Try in incognito/private mode

## Security Notes

- All data stored locally in browser (LocalStorage)
- No backend or database required
- No user data collected or transmitted
- HTTPS enabled by default on GitHub Pages

---

Need help? Open an issue on GitHub!
