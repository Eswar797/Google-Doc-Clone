# GitHub Pages with Custom Domain Setup Guide

This guide will help you set up GitHub Pages with a custom domain for your Google Docs Clone.

## Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/Eswar797/Google-Doc-Clone
2. Click on **Settings** (in the repository menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Deploy from a branch** → **gh-pages** branch (or)
   - **GitHub Actions** (recommended - we've already set this up)
5. If using GitHub Actions (recommended), the workflow will automatically deploy on every push to `main`

## Step 2: Configure Custom Domain

### Option A: Using Apex Domain (yourdomain.com)

1. **Update CNAME file:**
   - Edit `public/CNAME`
   - Replace `yourdomain.com` with your actual domain (e.g., `mydocs.com`)
   - Commit and push the change

2. **Configure DNS Settings:**
   - Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
   - Add the following **A records**:
     ```
     Type: A
     Host: @ (or leave blank)
     Value: 185.199.108.153
     TTL: 300 (or default)
     
     Type: A
     Host: @
     Value: 185.199.109.153
     
     Type: A
     Host: @
     Value: 185.199.110.153
     
     Type: A
     Host: @
     Value: 185.199.111.153
     ```

3. **Enable HTTPS (if not already):**
   - Go back to repository Settings → Pages
   - Under **Custom domain**, enter your domain
   - Check **Enforce HTTPS** (this may take a few minutes to activate)

### Option B: Using Subdomain (docs.yourdomain.com)

1. **Update CNAME file:**
   - Edit `public/CNAME`
   - Replace `yourdomain.com` with your subdomain (e.g., `docs.yourdomain.com`)
   - Commit and push the change

2. **Configure DNS Settings:**
   - Add a **CNAME record**:
     ```
     Type: CNAME
     Host: docs (or your subdomain name)
     Value: Eswar797.github.io
     TTL: 300 (or default)
     ```

3. **Enable HTTPS:**
   - Same as Option A, step 3

## Step 3: Update Vite Configuration

If you're using a **custom domain with apex domain** (yourdomain.com), you may need to update `vite.config.ts`:

```typescript
base: '/', // Change from '/Google-Doc-Clone/' to '/'
```

If using a **subdomain**, the current configuration should work fine.

After making this change:
```bash
git add vite.config.ts
git commit -m "Update base path for custom domain"
git push
```

## Step 4: Verify Deployment

1. Wait for GitHub Actions workflow to complete (check the **Actions** tab)
2. Once deployed, visit your custom domain
3. SSL certificate provisioning may take up to 24 hours (usually much faster)

## Troubleshooting

### DNS Not Resolving?
- DNS changes can take up to 48 hours to propagate (usually 1-2 hours)
- Use tools like [whatsmydns.net](https://www.whatsmydns.net) to check DNS propagation
- Verify your DNS records are correct

### HTTPS Not Working?
- Wait a few minutes after adding the custom domain
- GitHub automatically provisions SSL certificates via Let's Encrypt
- Make sure **Enforce HTTPS** is checked in repository settings

### 404 Errors?
- Verify the `base` path in `vite.config.ts` matches your deployment
- Clear browser cache and try again
- Check that all files were built correctly in the Actions workflow

### Custom Domain Not Showing?
- Make sure the CNAME file is in the `public/` directory
- Verify the CNAME file was committed and pushed
- Check repository Settings → Pages shows your custom domain

## Testing Locally

To test the production build locally:
```bash
npm run build
npm run preview
```

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)

## Current Configuration

- **Repository:** https://github.com/Eswar797/Google-Doc-Clone
- **Deployment:** GitHub Actions (automatic on push to main)
- **Custom Domain:** Configure in `public/CNAME`

