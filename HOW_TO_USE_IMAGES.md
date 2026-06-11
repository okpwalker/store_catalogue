# Image Handling Guide for Your Catalogue

## ⚠️ CRITICAL: Embedded Excel Images DO NOT Work

**The Excel import tool CANNOT extract images embedded in Excel cells.** This is a limitation of the xlsx library used to read Excel files. Even if you insert images directly into Excel cells using Insert > Pictures, they will not be imported.

## The Only Ways to Add Images

There are only TWO ways to get images into your catalogue:

---

## Method 1: Image URLs in Excel (RECOMMENDED - Most Reliable)

This is the easiest and most reliable method.

### Steps:
1. Upload your product images to an image hosting service:
   - **Imgur**: Free, easy to use (https://imgur.com)
   - **Google Drive**: Set sharing to "Anyone with the link"
   - **Dropbox**: Use direct link option
   - Any other image hosting service

2. Get the direct image URL:
   - Right-click on the image
   - Select "Copy image address" or "Copy link"
   - Paste this URL into the `picture` column in your Excel file

3. Example URLs:
   ```
   https://i.imgur.com/abc123.jpg
   https://raw.githubusercontent.com/username/repo/main/images/product.jpg
   https://images.unsplash.com/photo-1234567890
   https://drive.google.com/uc?id=your-file-id
   ```

4. **GitHub Raw URLs** work great:
   - Repository must be **public**
   - Use the raw URL format: `raw.githubusercontent.com`
   - Example: `https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/F1.jpg`
   - The app automatically handles CORS for GitHub images

### Excel Format:
```
Item_no | description | picture | comment | Category | asking_price | quantity | status
FN-001  | Chair       | https://i.imgur.com/abc123.jpg | Nice chair | Seating | 299.99 | 5 | Available
```

---

## Method 2: Upload/Replace Images Using Image Manager (RECOMMENDED for Computer-Stored Images)

The Image Manager provides a visual interface to upload, replace, or remove images for any product.

### Steps:
1. Import your Excel file (with or without images)
2. Click the "Manage Images" button in the header
3. A modal opens showing all products with their current images
4. Hover over any product image to reveal action buttons
5. Click "Replace" to upload a new image for that product
6. Click "Remove" to reset to the placeholder image
7. Click "Done" when finished

### Features:
- **Visual Interface**: See all products and their images at once
- **Hover to Edit**: Hover over any image to show Replace/Remove buttons
- **Works Anytime**: Use it after import or anytime you want to change images
- **No Re-import Needed**: Change images without re-uploading your Excel file

### When to use:
- When you want to change images after import
- When embedded image extraction fails
- When you don't have image URLs
- When you need to update product photos
- When you want a visual way to manage all images

---

## Method 3: Upload Missing Images (Quick Fix After Import)

If your Excel file doesn't have images (embedded or URLs), you'll see a blue notification box after import.

### Steps:
1. Import your Excel file normally (without images)
2. After import, you'll see a blue notification box at the top showing products without images
3. Click on each product's button to upload its image
4. Select the image file from your computer
5. The image will be converted to base64 and stored

### When to use:
- Quick fix for missing images immediately after import
- When you just need to add a few missing images

---

## Image Best Practices

### Image Requirements:
- **Format**: JPG, PNG, or WebP
- **Size**: 800px - 1200px width recommended
- **Aspect Ratio**: Square (1:1) or landscape (4:3) works best
- **File Size**: Under 2MB per image for faster PDF generation

### Quality Tips:
1. Use high-resolution images for better print quality
2. Use consistent aspect ratios across all products
3. Compress images before uploading to reduce file size
4. Use descriptive filenames (e.g., `chair-modern-accent.jpg`)

### For Print Catalogues:
- Higher resolution is better (min 800px wide)
- Use well-lit, professional product photos
- Consistent backgrounds improve visual consistency
- White or neutral backgrounds work best

---

## Troubleshooting

### Problem: Embedded images not showing after import
**Solution**: Use Method 1 (URLs) or Method 3 (Upload after import)

### Problem: Image URLs not loading
**Causes**:
- URL requires authentication
- URL is not a direct link to the image
- Image was deleted or moved

**Solution**:
- Ensure URL is publicly accessible
- Use direct image links (ends in .jpg, .png, etc.)
- Test URL in a browser first

### Problem: Images make PDF generation slow
**Solution**:
- Compress images before uploading
- Use smaller image dimensions (800px-1000px width)
- Reduce the number of products per catalogue

### Problem: Images look blurry in PDF
**Solution**:
- Use higher resolution source images
- Ensure images are at least 800px wide
- Use PNG format for better quality (but larger file size)

---

## Quick Reference

| Method | Reliability | Ease of Use | Best For |
|--------|-------------|-------------|----------|
| 1. URLs in Excel | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Large catalogues, images already online, batch import |
| 2. Image Manager | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Images on your computer, visual management, replacing images |
| 3. Quick Upload | ⭐⭐⭐⭐ | ⭐⭐⭐ | Fixing a few missing images immediately after import |

**Recommendations**: 

✅ **If your images are online** (or you can upload them to Imgur/similar):  
→ Use Method 1 (URLs in Excel) - add URLs to the `picture` column before importing

✅ **If your images are on your computer**:  
→ Use Method 2 (Image Manager) - import Excel first, then upload images using the visual interface

❌ **DO NOT** try to embed images in Excel cells - they will not import!
