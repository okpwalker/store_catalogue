# Admin Panel Instructions

## Your Live Catalog
**URL:** https://reliable-crepe-a47337.netlify.app

---

## 🔐 Admin Login

### Default Password
```
Estate2026!
```

### How to Login as Admin

1. **Visit your catalog URL:** https://reliable-crepe-a47337.netlify.app
2. **Click the "Admin Login" button** (blue button in bottom-right corner)
3. **Enter password:** `Estate2026!`
4. **Click "Login as Admin"**

You'll be logged in and can access all editing tools!

---

## 🛠️ What You Can Do as Admin

Once logged in, you can:
- ✅ Upload Excel files with new products
- ✅ Manage product images
- ✅ Switch between Grid, Web, and Print views
- ✅ Export PDF catalogues
- ✅ Reset to default products

### Important Note
**Changes you make as admin are stored in your browser's localStorage.** This means:
- ⚠️ Changes only appear on YOUR browser when logged in
- ⚠️ Public visitors still see the original catalog
- ⚠️ To update the catalog for ALL visitors, you need to redeploy (see below)

---

## 🔄 How to Update the Catalog for Everyone

### Option 1: Simple Updates (Current Setup)
1. Login as admin on the live site
2. Upload your Excel file and make changes
3. Export your data (you can download the localStorage data)
4. Contact me to redeploy with your new data

### Option 2: Full Admin System (Upgrade Available)
I can upgrade your catalog to use a database (Supabase) so that:
- Your edits go live immediately for all visitors
- No need to redeploy
- Changes persist across all devices
- Professional admin dashboard

Let me know if you'd like this upgrade!

---

## 🔒 How to Change Your Admin Password

1. **Open the file:** `src/app/components/AdminLogin.tsx`
2. **Find line 9:**
   ```typescript
   const ADMIN_PASSWORD = 'Estate2026!';
   ```
3. **Change the password** to whatever you want:
   ```typescript
   const ADMIN_PASSWORD = 'YourNewPassword123';
   ```
4. **Rebuild and redeploy:**
   ```bash
   pnpm run build
   pnpm exec netlify deploy --dir=dist --prod
   ```

---

## 🚪 How to Logout

- Click the **red "Logout" button** in the top-right corner
- You'll be returned to the public catalog view
- Your admin session will be cleared

---

## 📱 For Public Visitors

Public visitors (non-admin) will:
- ✅ See the beautiful scrollable catalog
- ✅ Browse all products with your contact info
- ✅ NOT see any editing buttons or admin tools
- ✅ NOT be able to modify anything

The "Admin Login" button only appears when:
- They're on the live Netlify site
- They're NOT already logged in as admin

---

## 🆘 Troubleshooting

### I forgot my password
- Check the file: `src/app/components/AdminLogin.tsx` (line 9)
- Or contact me to help you reset it

### Changes aren't showing for visitors
- Remember: localStorage changes only affect your browser
- To update for everyone, you need to redeploy with the new data

### Admin button doesn't appear
- Make sure you're on the live Netlify URL (not localhost)
- Try refreshing the page
- Clear your browser cache

---

## 📞 Need Help?

If you need assistance or want to upgrade to the full admin system with real-time updates, just let me know!
