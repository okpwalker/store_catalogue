# 🔐 Estate Collection Catalogue - Admin Access

## URLs

### 👥 Public Catalogue (For Customers)
**https://orville-estate-collection.netlify.app**

This is the URL you share with customers. They will see:
- ✅ Beautiful scrollable catalog
- ✅ All products with images and prices
- ✅ Your contact information
- ❌ NO admin buttons or editing tools

---

### 🔒 Admin Panel (For You Only)
**https://orville-estate-collection.netlify.app/admin**

**KEEP THIS URL SECRET!** This is for you only. When you visit this URL, you'll be prompted to login.

---

## 🔑 Admin Password

```
OrV!ll3#Est@te$C0ll3ct!0n2026&Secure
```

**IMPORTANT:** 
- This password is case-sensitive
- Copy it exactly as shown
- Don't share this password with anyone
- Don't share the /admin URL with anyone

---

## 📋 How to Login as Admin

1. **Visit the admin URL:**
   https://orville-estate-collection.netlify.app/admin

2. **Enter the password when prompted:**
   `OrV!ll3#Est@te$C0ll3ct!0n2026&Secure`

3. **Click "Login as Admin"**

4. **You're in!** Now you can:
   - Upload Excel files with new products
   - Manage images
   - View different formats (Grid, Web, Print)
   - Export PDF catalogues
   - Make any changes you need

---

## 🔄 How It Works

### For Public Visitors:
- They visit: `https://orville-estate-collection.netlify.app`
- They see: Clean scrollable catalog (no editing buttons)
- They can: Browse products and contact you
- They CANNOT: Edit, upload, or access admin features

### For You (Admin):
- You visit: `https://orville-estate-collection.netlify.app/admin`
- You enter: Your secure password
- You see: Full admin panel with all editing tools
- You can: Upload Excel, manage images, create PDFs, etc.

---

## ⚠️ Important Notes

### Changes Are Local
When you make changes in the admin panel:
- ✅ Changes save to your browser's localStorage
- ✅ You see your changes immediately
- ⚠️ PUBLIC VISITORS still see the original catalog

### To Update For Everyone:
After making changes, you need to redeploy. Contact me and I'll help you:
1. Export your updated data
2. Rebuild the catalog
3. Deploy so everyone sees the updates

**OR** - I can upgrade your system to use a database (Supabase) so your edits go live instantly for everyone!

---

## 🔒 How to Change Your Password

If you want to change the admin password:

1. **Open the file:** `src/app/components/AdminLogin.tsx`
2. **Find line 3-4:**
   ```typescript
   const ADMIN_PASSWORD = 'OrV!ll3#Est@te$C0ll3ct!0n2026&Secure';
   ```
3. **Change to your new password:**
   ```typescript
   const ADMIN_PASSWORD = 'YourNewSecurePassword123!';
   ```
4. **Rebuild and redeploy:**
   ```bash
   pnpm run build
   pnpm exec netlify deploy --dir=dist --prod
   ```

---

## 🚪 How to Logout

- Click the **red "Logout" button** in the top-right corner
- You'll be redirected to the public catalog
- Your admin session will be cleared

---

## 🛡️ Security Features

✅ **What's Secure:**
- Separate URLs for public and admin
- Password-protected admin panel
- No visible admin login button on public site
- Admin access only with correct password
- Session-based authentication

✅ **What Public Visitors CANNOT Do:**
- Find the admin URL (unless you tell them)
- Access admin panel without password
- See any editing tools
- Modify your catalog

---

## 📱 What to Share

### ✅ SHARE THIS (Public URL):
```
https://orville-estate-collection.netlify.app
```

Share this on:
- Facebook business page
- WhatsApp
- Email
- Business cards
- Marketing materials

### ❌ DO NOT SHARE (Admin URL):
```
https://orville-estate-collection.netlify.app/admin
```

Keep this private! This is your admin access only.

---

## 🆘 Troubleshooting

### I forgot my password
- Check the file: `src/app/components/AdminLogin.tsx` (line 3-4)
- Or check this document
- Or contact me to reset it

### Can't access admin panel
- Make sure you're using the full URL with `/admin` at the end
- Check your password (case-sensitive)
- Clear your browser cache and try again

### Changes aren't showing for visitors
- Remember: Your edits are stored in YOUR browser only
- To update for everyone, you need to redeploy
- Contact me for help with deployment
- Or upgrade to database system for instant updates

---

## 📞 Need Help?

If you need assistance, want to upgrade to instant updates, or have any questions, just let me know!

---

## 📝 Quick Reference

| Purpose | URL | Password Required? |
|---------|-----|-------------------|
| **Public Catalog** | https://orville-estate-collection.netlify.app | No |
| **Admin Panel** | https://orville-estate-collection.netlify.app/admin | Yes |

**Admin Password:** `OrV!ll3#Est@te$C0ll3ct!0n2026&Secure`
