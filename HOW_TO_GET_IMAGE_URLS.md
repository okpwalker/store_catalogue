# How to Get Image URLs for Your Catalogue

Since embedded Excel images don't work, you need image URLs. This guide shows you the easiest way to get them.

## Quick Method: Using Imgur (Recommended - FREE & EASY)

Imgur is free, requires no account, and is the fastest way to get image URLs.

### Step-by-Step:

1. **Go to Imgur.com**
   - Visit: https://imgur.com
   - No account needed!

2. **Click "New Post"** (top right)
   - Or just drag your images to the page

3. **Upload Your Images**
   - Drag and drop your product images
   - Or click "Browse" to select files
   - You can upload multiple images at once

4. **Copy the Image URL**
   - After upload, **right-click** on the image
   - Select **"Copy image address"** (Chrome/Edge) or **"Copy Image Link"** (Firefox)
   - This gives you the direct image URL

5. **Paste in Excel**
   - Go to your Excel file
   - Paste the URL in the `picture` column for that product
   - Example URL: `https://i.imgur.com/abc123.jpg`

6. **Repeat for Each Product**

### Example Excel Layout:
```
Item_no | description | picture | Category | asking_price | quantity | status
FN-001  | Red Chair   | https://i.imgur.com/abc123.jpg | Seating | 299.99 | 5 | Available
FN-002  | Blue Table  | https://i.imgur.com/xyz789.jpg | Tables  | 499.99 | 3 | Available
```

---

## Alternative Methods

### Method 2: GitHub Repository (Good for Version Control)

If you already have images in a GitHub repository:

1. Upload images to your GitHub repo (any branch)
2. Navigate to the image file in GitHub
3. Click "Raw" button
4. Copy the URL from the address bar
5. The URL format should be:
   ```
   https://raw.githubusercontent.com/username/repo/branch/path/to/image.jpg
   ```

**Example:**
```
https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/F1.jpg
```

**Important Notes:**
- Images must be in a **public** repository
- The URL must use `raw.githubusercontent.com`, not `github.com`
- The app automatically handles CORS for GitHub images
- Works great for versioned product images

### Method 3: Google Drive (Good for Businesses)

1. Upload images to Google Drive
2. Right-click image → Get link → Change to "Anyone with the link"
3. Modify the URL format:
   - Original: `https://drive.google.com/file/d/FILE_ID/view`
   - Change to: `https://drive.google.com/uc?export=view&id=FILE_ID`
4. Paste in Excel

### Method 4: Dropbox

1. Upload images to Dropbox
2. Get the share link
3. Change `www.dropbox.com` to `dl.dropboxusercontent.com` in the URL
4. Change `?dl=0` at the end to `?raw=1`
5. Paste in Excel

### Method 5: Your Own Website

If you have a website:
1. Upload images to your website's image folder
2. Use the direct URL (e.g., `https://yourwebsite.com/images/chair.jpg`)
3. Paste in Excel

---

## Tips for Best Results

### Image Quality:
- Use **JPG** for photos (smaller file size)
- Use **PNG** for graphics/logos (better quality)
- Recommended size: **800px - 1200px** width
- Keep file size under **2MB** per image

### Organizing Your Upload:
1. Rename images before uploading to match your Item_no
   - Example: `FN-001.jpg`, `FN-002.jpg`
2. Upload all images at once to Imgur
3. Copy URLs in order
4. Paste into Excel in order

### Quick Bulk Upload Trick:
1. Rename all images with Item_no (FN-001.jpg, FN-002.jpg, etc.)
2. Upload ALL images to Imgur at once
3. Open each image in a new tab
4. Copy the image URL from each tab
5. Paste into Excel in the same order

---

## Why Imgur is Best for This

✅ **Free** - No cost, no limits for reasonable use  
✅ **No Account Needed** - Upload without signing up  
✅ **Fast** - Drag, drop, copy URL - done!  
✅ **Reliable** - Images stay online indefinitely  
✅ **Direct Links** - URLs work perfectly in the app  
✅ **No Ads in Images** - Clean, professional appearance  

---

## Common Issues

### Problem: "Image not found" error
- Make sure you copied the **image URL**, not the page URL
- Right-click the image itself, not the page
- URL should end in `.jpg`, `.png`, or `.webp`

### Problem: Dropbox/Google Drive links not working
- Make sure the link is **public** (anyone can view)
- For Dropbox, change the URL format as shown above
- For Google Drive, use the `uc?export=view&id=` format

### Problem: Images load slowly in PDF
- Compress images before uploading
- Use JPG instead of PNG for photos
- Resize images to 800-1000px width before uploading

---

## Excel Template with Image URLs

Here's what your completed Excel should look like:

```
Item_no | description       | picture                              | comment           | Category | asking_price | quantity | status
FN-001  | Modern Red Chair  | https://i.imgur.com/abc123.jpg      | Great condition   | Seating  | 299.99      | 5        | Available
FN-002  | Oak Dining Table  | https://i.imgur.com/def456.jpg      | Solid wood        | Tables   | 599.99      | 2        | Available
FN-003  | Floor Lamp       | https://i.imgur.com/ghi789.jpg      | Vintage style     | Lighting | 149.99      | 8        | Available
```

Then save as `.xlsx` and import!

---

## Still Have Images on Your Computer?

If uploading to Imgur seems like too much work, you can:

1. Import your Excel file **without** image URLs (leave `picture` column empty)
2. Click **"Manage Images"** button in the app
3. Upload images directly from your computer using the visual interface
4. No URLs needed!

This method is actually **easier** if you have images stored locally.
