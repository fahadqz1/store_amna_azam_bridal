# AMNA AZAM - Deployment Guide

## PHASE 9 & 10: GitHub & Vercel Deployment

### PHASE 9: GitHub Setup

#### 1. Initialize Git Repository

```bash
cd amna-azam
git init
```

#### 2. Create `.gitignore`

The project already includes a `.gitignore` file that excludes:
- `node_modules/`
- `.env.local`
- `.env.*.local`
- `.next/`
- `out/`
- `build/`
- `dist/`

#### 3. Add and Commit Initial Code

```bash
git add .
git commit -m "Initial commit: AMNA AZAM e-commerce platform

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>"
```

#### 4. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create new repository named `amna-azam`
3. Do NOT initialize with README (we have one)
4. Set repository to **Private** (business critical)

#### 5. Add Remote and Push

```bash
git remote add origin https://github.com/YOUR_USERNAME/amna-azam.git
git branch -M main
git push -u origin main
```

#### 6. GitHub Settings

**Protect main branch:**
- Settings → Branches
- Add rule for `main`
- Require pull request reviews before merging
- Require status checks to pass

**Configure deployment:**
- Settings → Environments
- Create `production` environment
- Configure required reviewers

---

### PHASE 10: Vercel Production Deployment

#### 1. Install Vercel CLI

```bash
npm i -g vercel
```

#### 2. Connect to Vercel

```bash
vercel login
```

#### 3. First Deployment (Development)

```bash
vercel --prod
```

You'll be prompted to:
- Link to existing project or create new
- Select project name: `amna-azam`
- Select root directory: `./`
- Build command: `npm run build`
- Output directory: `.next`

#### 4. Configure Environment Variables

In Vercel Dashboard:

**Settings → Environment Variables**

Add the following:
```
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
RESEND_API_KEY=your_resend_key
POSTEX_API_KEY=your_postex_key
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

#### 5. Set Up Custom Domain

1. **Domain Setup:**
   - Settings → Domains
   - Add custom domain: `amnazaam.pk` (or your domain)
   - Follow DNS configuration instructions

2. **DNS Configuration** (from your registrar):
   - Add CNAME record pointing to Vercel
   - Add TXT record for verification
   - Wait 24-48 hours for propagation

3. **SSL/TLS:**
   - Automatically managed by Vercel
   - Free certificate via Let's Encrypt

#### 6. Environment-Specific Deployments

**Preview Deployments (auto on PR):**
- Settings → Git Connections
- Ensure "Deploy on push to main" is enabled
- Preview URLs for each PR

**Staging Deployment:**
```bash
# Create staging branch
git checkout -b staging
git push origin staging

# In Vercel: Deployments → Preview
```

---

## Security Checklist

### Environment Variables
- ✅ All secrets in `.env.local` (never committed)
- ✅ Production secrets only on Vercel
- ✅ Rotate keys quarterly
- ✅ Use separate Supabase projects for dev/prod

### Database Security
- ✅ Enable Row-Level Security (RLS) policies
- ✅ Use service role key only for server actions
- ✅ Enable backups on Supabase
- ✅ Set up automated snapshots

### API Security
- ✅ Enable CORS headers (configure in next.config.js)
- ✅ Implement rate limiting
- ✅ Validate all user input
- ✅ Use HTTPS only
- ✅ Implement webhook signature verification

### Code Security
- ✅ Enable branch protection
- ✅ Require PR reviews
- ✅ Run security audit: `npm audit`
- ✅ Scan dependencies: `npm install`

---

## Monitoring & Maintenance

### Vercel Monitoring

1. **Analytics:**
   - Vercel Dashboard → Analytics
   - Monitor Web Vitals
   - Track error rates
   - Review traffic patterns

2. **Error Tracking:**
   - Vercel → Logs
   - Set up error notifications
   - Monitor build failures

3. **Performance:**
   - Target Largest Contentful Paint (LCP) < 2.5s
   - Target Cumulative Layout Shift (CLS) < 0.1
   - Target First Input Delay (FID) < 100ms

### Supabase Monitoring

1. **Database:**
   - Check query performance
   - Monitor storage usage
   - Review auth logs

2. **Backup Strategy:**
   - Enable automated backups
   - Test restore procedures monthly
   - Keep 30-day backup retention

---

## Continuous Integration / Continuous Deployment

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main
      - staging
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      
      - run: npm run build
      
      - run: npm run lint
      
      - name: Run Type Check
        run: npx tsc --noEmit
```

---

## Scaling Considerations

### For High Traffic (100,000+ monthly users)

1. **Database Optimization:**
   - Add indexes for frequently queried fields
   - Implement database connection pooling
   - Set up read replicas for Supabase

2. **Caching Strategy:**
   - Implement Redis for session management
   - Add ISR (Incremental Static Regeneration)
   - Use Vercel's Edge Cache

3. **CDN Optimization:**
   - Use Vercel's global CDN (automatic)
   - Optimize image sizes (use next/image)
   - Enable compression

4. **Load Testing:**
   - Load test before major launches
   - Monitor database under load
   - Test API rate limiting

---

## Rollback Procedures

### Rollback to Previous Version

```bash
# In Vercel Dashboard:
# 1. Deployments → Select previous deployment
# 2. Click "Promote to Production"

# Or via CLI:
vercel rollback
```

### Database Rollback

1. Supabase Dashboard → Backups
2. Select backup point
3. Click "Restore"
4. Verify data integrity

---

## Post-Launch Checklist

- [ ] SSL certificate installed (auto on Vercel)
- [ ] Custom domain configured
- [ ] DNS propagated (test with `nslookup`)
- [ ] Email notifications configured
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Database backups enabled
- [ ] Team access configured
- [ ] Monitoring dashboards set up
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Performance targets met

---

## Support & Troubleshooting

### Common Issues

**Build Fails on Vercel:**
```bash
# Check environment variables
# Verify all env vars are set in Vercel

# Check local build
npm run build

# Check Next.js version compatibility
npm list next
```

**Database Connection Issues:**
```bash
# Verify NEXT_PUBLIC_SUPABASE_URL
# Check SUPABASE_SERVICE_ROLE_KEY
# Test connection in browser console:
# console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

**Performance Issues:**
```bash
# Check Web Vitals in Vercel Analytics
# Profile with Lighthouse
# Check image sizes with next/image
```

---

## Maintenance Schedule

**Daily:**
- Monitor error logs
- Check database performance

**Weekly:**
- Review analytics
- Check backup status
- Monitor costs

**Monthly:**
- Security audit
- Dependency updates
- Performance review

**Quarterly:**
- Rotate credentials
- Full security review
- Load testing

---

Generated: November 17, 2026  
Version: 1.0  
Status: Ready for Production Deployment
