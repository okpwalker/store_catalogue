# Using the file_Name Column (NEW!)

## Overview

The new `file_Name` column makes it much easier to manage product images when they're stored in your GitHub repository. Instead of typing the full URL for each image, you just enter the filename!

## How It Works

### Old Way (Using `picture` column):
```csv
Item_no,description,picture
F1,Figurine 1,https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/F1.jpg
F2,Figurine 2,https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/F2.jpg
F3,Figurine 3,https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/F3.jpg
```

**Problems:**
- Long URLs prone to typos
- Hard to read and maintain
- Time-consuming to update
- Error-prone copy/paste

### New Way (Using `file_Name` column):
```csv
Item_no,description,file_Name,picture
F1,Figurine 1,F1.jpg,
F2,Figurine 2,F2.jpg,
F3,Figurine 3,F3.jpg,
```

**Benefits:**
✅ Simple filenames only  
✅ Easy to read and maintain  
✅ Less error-prone  
✅ Quick to update in bulk  
✅ Auto-generates full GitHub URL  

## Excel Template Structure

Your Excel should have these columns:

```
Item_no | description | file_Name | picture | comment | Category | asking_price | quantity | status
```

### Example Data:

```
F1  | Red Figurine    | F1.jpg  |  | Vintage collectible        | Figurines | 29.99 | 5  | Available
F2  | Blue Figurine   | F2.jpg  |  | Limited edition           | Figurines | 34.99 | 3  | Available
F3  | Green Figurine  | F3.jpg  |  | Rare find                 | Figurines | 39.99 | 1  | Available
F10 | Special Edition | F10.jpg |  | Collector's favorite      | Figurines | 99.99 | 2  | Available
```

**Notice:**
- `file_Name` has just the filename (F1.jpg, F2.jpg, etc.)
- `picture` column is **empty** (leave blank when using file_Name)
- The app automatically converts `F1.jpg` → `https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/F1.jpg`

## Important Notes

### The Base URL

The app is configured to use this base URL:
```
https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/
```

So when you enter `F1.jpg` in the `file_Name` column, it becomes:
```
https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/F1.jpg
```

### File Naming Tips

1. **Use consistent naming**: F1.jpg, F2.jpg, F3.jpg (not f1.JPG, F-2.jpeg, fig3.png)
2. **Match GitHub exactly**: Filenames are case-sensitive
3. **Include extension**: .jpg, .png, .jpeg, .gif, .webp
4. **No spaces**: Use `red_figurine.jpg` not `red figurine.jpg`
5. **Keep it simple**: Short, descriptive names work best

### Priority Rules

The app checks for images in this order:

1. **file_Name** → If provided, constructs GitHub URL (highest priority)
2. **picture** → If provided, uses the URL directly
3. **Default** → Shows placeholder image

**Example:**
```csv
Item_no,file_Name,picture,Result
F1,F1.jpg,,Uses GitHub URL: .../figurines/F1.jpg
F2,,https://i.imgur.com/abc.jpg,Uses Imgur URL
F3,F3.jpg,https://i.imgur.com/xyz.jpg,Uses GitHub URL (file_Name wins!)
F4,,,Uses placeholder image
```

## When to Use Each Column

### Use `file_Name` when:
✅ Your images are in the GitHub repo: `okpwalker/store_images/main/figurines/`  
✅ You want easy maintenance (just filenames)  
✅ You're managing many products  
✅ Filenames match GitHub exactly  

### Use `picture` when:
✅ Images are hosted elsewhere (Imgur, Google Drive, etc.)  
✅ Images are in a different GitHub repo or path  
✅ You have the full URL already  
✅ Images are in different locations  

### Use both:
❌ Don't use both! `file_Name` takes priority, so `picture` will be ignored

## Troubleshooting

### Images not loading?

**Check 1: Filename matches GitHub exactly**
- Go to your GitHub repo: https://github.com/okpwalker/store_images
- Navigate to `/main/figurines/`
- Verify the filename matches EXACTLY (including extension and case)

**Check 2: File exists in the correct folder**
- Images must be in: `/main/figurines/`
- Not in: `/main/` or `/main/images/` or elsewhere

**Check 3: Repository is public**
- Private repos won't work
- Go to repo Settings → Change visibility to Public

**Check 4: Extension is correct**
- Common extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Must include the dot: `F1.jpg` not `F1jpg`

### Still not working?

Test the URL manually:
1. Take the base URL: `https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/`
2. Add your filename: `F1.jpg`
3. Full URL: `https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/F1.jpg`
4. Open in browser - you should see just the image

## Quick Start Workflow

### 1. Prepare Your Images
- Name them consistently: F1.jpg, F2.jpg, F3.jpg, etc.
- Upload to: https://github.com/okpwalker/store_images/main/figurines/

### 2. Update Your Excel
```csv
Item_no,description,file_Name,picture,comment,Category,asking_price,quantity,status
F1,Red Figurine,F1.jpg,,Vintage,Figurines,29.99,5,Available
F2,Blue Figurine,F2.jpg,,Limited,Figurines,34.99,3,Available
```

### 3. Save as .xlsx
- File → Save As
- Choose "Excel Workbook (*.xlsx)"

### 4. Import
- Open the catalogue app
- Click "Import from Excel"
- Select your .xlsx file
- Images load automatically!

### 5. Verify
- Check that images appear in grid view
- Click "Print View" to see catalogue layout
- Generate PDF to test final output

## Privacy Note

The `file_Name` field is **not displayed anywhere** in the catalogue:
- ✅ Not shown in grid view
- ✅ Not shown in product details modal
- ✅ Not shown in print catalogue
- ✅ Not shown in PDF export

It's purely used to construct the image URL behind the scenes.

## Example: Full Product Entry

```csv
Item_no: F1
description: Vintage Red Figurine
file_Name: F1.jpg
picture: (leave empty)
comment: Rare collectible from 1950s
Category: Figurines
asking_price: 29.99
quantity: 5
status: Available
```

**Result in Catalogue:**
- Shows "Vintage Red Figurine" as product name
- Displays image from: https://raw.githubusercontent.com/.../F1.jpg
- Shows comment: "Rare collectible from 1950s"
- Shows price: $29.99
- Shows quantity: 5 units
- **Does NOT show**: "F1.jpg" anywhere

Perfect! Simple and clean.
