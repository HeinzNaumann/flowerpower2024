# Testing Guide - Error Pages

## 🧪 How to Test Error Pages

### In Development (Local)

#### 1. Test 404 Error

Visit a URL that doesn't exist:
```
http://localhost:3000/page-that-does-not-exist
http://localhost:3000/es/invalid-route
http://localhost:3000/en/invalid-route
```

**Verify:**
- ✅ Custom error page is displayed
- ✅ Title says "Page not found" (or equivalent in the language)
- ✅ There's a "Back to home" button
- ✅ Design is clean and professional

#### 2. Test 500 Error

You can simulate a 500 error by temporarily creating an error in a page:

```vue
<script setup>
throw createError({
  statusCode: 500,
  statusMessage: 'Test error'
})
</script>
```

**Verify:**
- ✅ "Server error" is displayed
- ✅ There are "Back to home" and "Try again" buttons
- ✅ Message is clear and reassuring

#### 3. Verify Meta Tags

Open browser DevTools:

1. Inspect the `<head>` of the error page
2. Look for: `<meta name="robots" content="noindex, nofollow">`

**Verify:**
- ✅ `noindex` meta tag is present
- ✅ Page title includes error code

#### 4. Verify HTTP Codes

Use Network DevTools:

1. Open DevTools → Network
2. Visit a page that doesn't exist
3. Check the HTML document response code

**Verify:**
- ✅ 404 error returns code `404` (not `200`)
- ✅ 500 error returns code `500` (not `200`)

### In Production

#### 1. Verify with cURL

```bash
curl -I https://www.flowerpower.es/non-existent-page

# You should see:
# HTTP/2 404
```

```bash
curl https://www.flowerpower.es/non-existent-page | grep "noindex"

# You should see:
# <meta name="robots" content="noindex, nofollow">
```

#### 2. Verify with Google Search Console

1. Go to Google Search Console
2. Navigate to **Coverage** or **Indexing**
3. Verify that error pages don't appear as indexed

#### 3. Verify with Screaming Frog

1. Run a site crawl
2. Filter by status code 404 and 500
3. Verify they have the `noindex` meta tag

## 🔍 Verification Checklist

### Functionality
- [ ] 404 error shows custom page
- [ ] 500 error shows custom page
- [ ] Translations work in ES/EN/DE
- [ ] "Back to home" button works
- [ ] "Try again" button works (on 500)

### SEO
- [ ] `noindex, nofollow` meta tag present
- [ ] HTTP 404 returns 404 (not 200)
- [ ] HTTP 500 returns 500 (not 200)
- [ ] Title tag includes error code
- [ ] No broken links on error page

### UX
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Clear and helpful messages
- [ ] Colors and styles consistent with site
- [ ] Fast loading time

### Logging
- [ ] Errors logged in server console
- [ ] Timestamp and URL included in logs
- [ ] Client errors captured

## 🐛 Common Problems and Solutions

### Problem: Error page doesn't display

**Solution:**
- Verify `error.vue` is in project root
- Restart development server
- Clear Nuxt cache: `rm -rf .nuxt`

### Problem: Returns code 200 instead of 404/500

**Solution:**
- Verify `setResponseStatus()` is being called
- Make sure you're in SSR mode (not SPA)
- Check Nitro configuration in `nuxt.config.js`

### Problem: Noindex meta tag doesn't appear

**Solution:**
- Verify `useHead()` is executing
- Check there's no other `useHead()` overwriting
- Inspect server-rendered HTML

### Problem: Translations don't work

**Solution:**
- Verify keys exist in all language files
- Check `useI18n()` is imported correctly
- Restart server after changing translation files

## 📊 Metrics to Monitor

### Google Search Console
- **Crawl errors**: Should decrease over time
- **Indexed pages**: Error pages should NOT appear
- **Coverage**: Monitor 4xx and 5xx errors

### Google Analytics
- **Error events**: Configure custom events
- **Bounce rate on errors**: Should be high (expected)
- **Landing pages**: Identify which pages generate most errors

### Server Logs
- **Error frequency**: How many errors per day/hour
- **Patterns**: Are there specific URLs failing?
- **Timing**: Do errors occur at specific times?

## 🚀 Useful Commands

```bash
# Clear Nuxt cache
rm -rf .nuxt .output

# Rebuild
npm run build

# Verify in local production mode
npm run preview

# View logs in real-time (if using PM2)
pm2 logs

# Test with different user agents
curl -A "Googlebot" -I https://www.flowerpower.es/404
```

## 📝 Important Notes

1. **Always test in staging before production**
2. **Monitor logs after deployment**
3. **Configure alerts for 5xx errors**
4. **Review Google Search Console weekly**
5. **Document any recurring errors**

---

**Last updated**: December 27, 2024
