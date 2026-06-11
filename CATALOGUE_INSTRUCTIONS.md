# Furniture Catalogue - Excel Import Instructions

## Overview
This catalogue application allows you to bulk load products from an Excel spreadsheet and generate professional PDF catalogues. The system is designed to work with your specific field structure.

## Features
- **Excel Import**: Upload product data from Excel (.xlsx or .xls files) with embedded images
- **Grid View**: Browse products in an interactive card layout with search and filters
- **Print View**: Professional multi-page catalogue layout optimized for PDF export
- **PDF Export**: Download the complete catalogue as a PDF file

## Excel Template Format

Your Excel file should contain the following columns (exact field names):

| Column Name | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `Item_no` | Text/Number | Yes | Unique item identifier | FN-001, FN-002, etc. |
| `description` | Text | Yes | Product description/name | Modern Accent Chair |
| `file_Name` | Text | Optional | Image filename (auto-generates GitHub URL) | F1.jpg, F2.jpg |
| `picture` | Text (URL) | Optional | Direct image URL (if not using file_Name) | https://... |
| `comment` | Text | Optional | Additional notes or comments | Perfect for contemporary spaces |
| `Category` | Text | Yes | Product category | Seating, Tables, Storage, Lighting |
| `asking_price` | Number | Yes | Product asking price (without $ symbol) | 349.99 |
| `quantity` | Number | Yes | Available quantity | 5, 10, 0 |
| `status` | Text | Yes | Availability status | Available, Out of Stock, In Stock |

### Sample Template
A sample CSV file (`catalogue-template.csv`) is included in this project. You can:
1. Open it in Excel
2. Add your product data
3. Add images (see below)
4. Save as `.xlsx` format
5. Import into the application

## Image Handling

### ⚠️ IMPORTANT: Embedded Excel Images Do NOT Import

The Excel import library **cannot extract embedded images** from Excel files. Even if you insert images into Excel cells, they will not be imported.

### ✅ Option 1: Use file_Name Column (EASIEST - For GitHub Images)

**NEW!** If your images are in the GitHub repository `okpwalker/store_images/main/figurines/`, you can simply provide the filename:

1. Upload your images to the GitHub repository
2. In the `file_Name` column, enter just the filename: `F1.jpg`, `F2.jpg`, etc.
3. The app automatically constructs the full URL:
   - `F1.jpg` → `https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/F1.jpg`
4. Leave the `picture` column **empty** when using `file_Name`

**Example Excel:**
```
Item_no | file_Name | picture | description
F1      | F1.jpg    |         | Figurine 1
F2      | F2.jpg    |         | Figurine 2
```

**Benefits:**
- Much easier to maintain (just filenames, not full URLs)
- Less prone to errors
- Easier to update in bulk

### ✅ Option 2: Image URLs (For Other Image Hosts)
1. Upload your product images to a hosting service:
   - **Imgur** (free, easy): https://imgur.com
   - **GitHub** (other repos): Use raw.githubusercontent.com URLs
   - **Google Drive** (make sure link is public)
   - **Dropbox** (use direct link)
   - Any image hosting service
2. Copy the direct image URL
3. Paste the URL in the `picture` column in your Excel file
4. Leave the `file_Name` column **empty** when using `picture`

**Examples:**
   - Imgur: `https://i.imgur.com/abc123.jpg`
   - GitHub: `https://raw.githubusercontent.com/username/repo/main/images/product.jpg`
   - Direct URL: `https://yoursite.com/images/product.jpg`

### ✅ Option 3: Upload After Import Using Image Manager
1. Import your Excel file without images (leave both `file_Name` and `picture` columns empty)
2. After import, click "Manage Images" button in the header
3. Hover over each product and click "Replace" to upload images
4. This is the easiest way if you have images on your computer

### Option 4: Default Placeholder
- If no image is provided (no `file_Name`, no `picture` URL), the system will use a default placeholder image
- You can replace placeholders anytime using the Image Manager

---

## Image Priority

When importing, the app uses this priority order:

1. **file_Name** (if provided) → Constructs GitHub URL
2. **picture** (if provided) → Uses the URL directly
3. **Embedded image** (not supported, will be ignored)
4. **Default placeholder** → Fallback image

## How to Use

### Step 1: Prepare Your Data
1. Open the sample template (`catalogue-template.csv`) or create a new Excel file
2. Fill in your product data following the column format above
3. Add images using one of the methods described in "Image Handling"
4. Save the file as `.xlsx` or `.xls` format

### Step 2: Import Data
1. Launch the application
2. Click the "Import from Excel" button in the header
3. Select your Excel file
4. The products will load automatically

### Step 3: Manage Images (Optional)
1. Click the "Manage Images" button in the header
2. A modal will open showing all your products
3. Hover over any product image to see Replace/Remove buttons
4. Click "Replace" to upload a new image for that product
5. Click "Remove" to reset to the placeholder image
6. Click "Done" when finished

**Note**: This is useful for:
- Replacing images after initial import
- Fixing images that didn't import correctly
- Updating product photos without re-importing the entire catalogue
- Adding images to products that were imported without them

### Step 4: Generate PDF Catalogue
1. Click the "Print View" button in the header
2. Review the catalogue layout (includes cover page, table of contents, product pages, and price list)
3. Click "Download PDF" to generate and save the PDF file

## Catalogue Layout

The generated PDF catalogue includes:

1. **Cover Page**: Title, product count, and date
2. **Table of Contents**: Products organized by category
3. **Category Pages**: Divider pages for each product category
4. **Product Pages**: Full-page spreads with:
   - Large product image
   - Item number
   - Description
   - Comment (if provided)
   - Asking price
   - Quantity available
   - Category
5. **Price List**: Comprehensive table with Item Number, Description, Category, Asking Price, and Quantity

## Field Details

### Item_no
- Use a consistent numbering/naming scheme (e.g., FN-001, FN-002, or ITEM-001)
- This appears on the catalogue as "Item Number"

### description
- Main product name/description
- Keep concise but descriptive
- This is the primary product identifier

### file_Name
- **NEW!** Optional field for GitHub image filenames
- Enter just the filename: `F1.jpg`, `F2.jpg`, `chair.png`, etc.
- App automatically constructs full GitHub URL
- Only works for images in: `https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/`
- Leave empty if using `picture` column instead
- **This field is NOT displayed in the catalogue** (internal use only)

### picture
- Optional field for direct image URLs
- Use this if your images are NOT in the GitHub repo
- Examples: Imgur, Google Drive, other GitHub repos, etc.
- Leave empty if using `file_Name` column instead
- **Note**: `file_Name` takes priority over `picture`

### comment
- Optional field for additional notes
- Appears as italicized text in the print catalogue
- Good for special features, condition notes, or selling points

### Category
- Used to organize products in the catalogue
- Products with the same category are grouped together
- Common categories: Seating, Tables, Storage, Lighting, Decor, Bedroom

### asking_price
- Enter numbers only (no $ symbol)
- Use decimal format (e.g., 349.99)

### quantity
- Number of units available
- Set to 0 for out-of-stock items
- Affects the availability status automatically

### status
- "Available" or "In Stock" = Item is available
- "Out of Stock" = Item is not available
- Other text will default based on quantity (quantity > 0 = available)

## Tips

- **Images**: For best results with embedded images, use JPG or PNG format, 800px-1200px wide
- **Categories**: Keep category names consistent across all products
- **Quantity**: Setting quantity to 0 automatically marks item as out of stock
- **Comments**: Use for brief notes; detailed description goes in the description field
- **Search & Filter**: Use the grid view to preview and filter products before generating PDF
- **PDF Generation**: Large catalogues may take a minute to generate - please be patient

## Troubleshooting

**Import fails:**
- Ensure column names match exactly: `Item_no`, `description`, `picture`, `comment`, `Category`, `asking_price`, `quantity`, `status`
- Check that required fields (Item_no, description, Category, asking_price, quantity, status) are not empty
- Verify asking_price values are numbers without $ symbol
- Verify quantity values are whole numbers

**Images not showing:**
- If using embedded images, ensure they are properly inserted in Excel cells
- If using URLs, ensure they are publicly accessible
- The system will use a placeholder image if extraction fails
- Consider using image URLs for more reliable results

**PDF generation is slow:**
- This is normal for catalogues with many products
- Each page is rendered individually for high quality
- Progress percentage is shown during generation
- Embedded images may slow down generation more than URL-based images

## Support

For best results:
- Keep product names under 50 characters
- Limit descriptions to 2-3 sentences
- Use consistent image aspect ratios
- Test with a small dataset first
