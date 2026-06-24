import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from './ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { Product } from './ProductCard';
import { productService } from '../../lib/supabase';

interface ExcelImportProps {
  onImport: (products: Product[]) => void;
}

export function ExcelImport({ onImport }: ExcelImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Note: The xlsx library does NOT support extracting embedded images from Excel files.
  // This function is kept for potential future updates, but currently returns empty.
  const extractImagesFromWorkbook = (workbook: XLSX.WorkBook): Map<string, string> => {
    const imageMap = new Map<string, string>();

    // The standard xlsx library cannot extract embedded images.
    // Users should use image URLs in the 'picture' column instead.

    return imageMap;
  };

  const CATEGORY_FOLDER_MAP: Record<string, string> = {
    'Antique': 'Antiques',
    'China-Czec': 'China-Czecs',
    'China-Mikasa': 'China-Mikasas',
    'China-Johnson': 'China-Johnsons',
    'China-Hugh': 'China-Hughs',
    'China-Other': 'China-Others',
    'Figurine': 'Figurines',
    'Crystalware': 'Crystalwares',
    'Glassware': 'Glasswares',
    'Dinnerware': 'Dinnerwares',
    'Silverware': 'Silverwares',
    'Painting': 'Paintings',
    'Electronic': 'Electronics',
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, {
          type: 'array',
          cellStyles: true,
          cellDates: true
        });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(`📋 Total rows read from Excel: ${jsonData.length}`);

        // Extract embedded images
        const imageMap = extractImagesFromWorkbook(workbook);

        // Default placeholder image
        const defaultImage = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800';

        // Track seen IDs to ensure uniqueness
        const seenIds = new Set<string>();

        const products: Product[] = jsonData
          .filter((row: any) => {
            // Skip rows where Item_no is blank
            const itemNo = row.Item_no || row.item_no;
            return itemNo && itemNo.toString().trim().length > 0;
          })
          .map((row: any, index: number) => {
          // Map your custom fields
          let itemNo = (row.Item_no || row.item_no || row['Item No'] || `${index + 1}`).toString();

          // Ensure unique IDs by appending a suffix if duplicate
          let uniqueId = itemNo;
          let suffix = 1;
          while (seenIds.has(uniqueId)) {
            uniqueId = `${itemNo}-${suffix}`;
            suffix++;
          }
          seenIds.add(uniqueId);
          itemNo = uniqueId;
          const description = row.Description || row.description || '';
          const comment = row.Comment || row.comment || '';
          const category = row.Category || row.category || 'Uncategorized';

          // Get JMD_Ask_Price - handle spaces in column name
          let askingPrice = 0;
          const priceValue = row[' JMD_Ask_Price '] || row['JMD_Ask_Price'] || row.JMD_Ask_Price || row[' JMD_Ask_Price'] || row['JMD_Ask_Price '];
          if (priceValue !== undefined && priceValue !== null && priceValue !== '') {
            const cleaned = typeof priceValue === 'string' ? priceValue.replace(/[$,]/g, '').trim() : priceValue;
            askingPrice = parseFloat(cleaned) || 0;
          }

          const quantity = parseInt(row.qty || row.Qty || row.quantity || row.Quantity || '0', 10);
          const status = row.Status || row.status || '';

          // Get File_Name to construct GitHub URL
          const fileName = row.File_Name || row.file_Name || row.file_name || row.FileName || '';

          // Debug first 3 rows
          if (index < 3) {
            console.log(`Row ${index + 1} File_Name check:`, {
              File_Name: row.File_Name,
              file_Name: row.file_Name,
              fileName: fileName,
              allKeys: Object.keys(row)
            });
          }

          // Get Picture - could be URL string or will use embedded image
          const pictureUrl = row.Picture || row.picture || '';

          // Determine stock status — explicit "sold" always wins over quantity
          const statusLower = status.toLowerCase();
          const isSold = statusLower === 'sold' || statusLower === 'not available' || statusLower === 'unavailable';
          const inStock = !isSold && (
            statusLower === 'available' ||
            statusLower === 'in stock' ||
            quantity > 0
          );

          // Priority:
          // 1. file_Name (construct GitHub URL)
          // 2. URL from picture column
          // 3. Embedded image
          // 4. Placeholder
          let image = defaultImage;

          if (fileName && typeof fileName === 'string' && fileName.trim().length > 0) {
            // Construct GitHub URL from file_Name based on category
            const folderName = CATEGORY_FOLDER_MAP[category] ?? (category + 's');

            const baseUrl = `https://cdn.jsdelivr.net/gh/okpwalker/store_images@main/${folderName}/`;
            image = baseUrl + fileName.trim();

            // Debug: Log URL for first few products of each category
            if (index < 3) {
              console.log(`📸 Category: "${category}" → Folder: "${folderName}" → URL: ${image}`);
            }
          } else if (pictureUrl && typeof pictureUrl === 'string' && pictureUrl.trim().length > 0) {
            // Check if it looks like a URL
            if (pictureUrl.startsWith('http://') || pictureUrl.startsWith('https://') || pictureUrl.startsWith('data:')) {
              image = pictureUrl.trim();
            }
          } else if (imageMap.has(`row_${index}`)) {
            image = imageMap.get(`row_${index}`)!;
          }

          return {
            id: itemNo.toString(),
            name: description,
            category: category,
            price: askingPrice,
            image: image,
            description: description,
            comment: comment,
            quantity: quantity,
            inStock: inStock,
          };
        });

        console.log(`✅ Valid products after filtering: ${products.length}`);

        if (products.length === 0) {
          alert('No products found in the Excel file. Please check the file format.');
          return;
        }

        // Debug: Check first 3 products for image issues
        console.log('📊 First 3 products image info:');
        products.slice(0, 3).forEach((p, i) => {
          console.log(`Product ${i + 1}:`, {
            id: p.id,
            image: p.image,
            isPlaceholder: p.image.includes('unsplash.com')
          });
        });

        // Save to database and update UI
        setIsUploading(true);

        productService.bulkUpsert(products)
          .then(() => {
            onImport(products);

            // Count products with images
            const productsWithImages = products.filter(p =>
              p.image && !p.image.includes('unsplash.com')
            ).length;
            const productsWithoutImages = products.length - productsWithImages;

            let message = `✅ Successfully imported ${products.length} product${products.length !== 1 ? 's' : ''} to database!`;
            message += `\n\n🌐 Changes are now LIVE for all visitors!`;

            if (productsWithoutImages > 0) {
              message += `\n\n⚠️ ${productsWithoutImages} product${productsWithoutImages !== 1 ? 's' : ''} ${productsWithoutImages !== 1 ? 'are' : 'is'} using placeholder images.`;
              message += `\n\nTo add images, you can:`;
              message += `\n• Add filenames in the 'File_Name' column (easiest for GitHub images)`;
              message += `\n• Add image URLs in the 'Picture' column, OR`;
              message += `\n• Click "Manage Images" to upload images after import`;
            }

            alert(message);
            setIsUploading(false);
          })
          .catch((error) => {
            console.error('Error saving to database:', error);
            alert('❌ Error saving products to database. Please try again.\n\nError: ' + error.message);
            setIsUploading(false);
          });
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please ensure it has the correct format.\n\nExpected columns: Item_no, Description, File_Name (optional), Picture (optional), Comment, Category, JMD_Ask_Price, qty, Status');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
      />
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="gap-2"
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading to Database...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Import from Excel
          </>
        )}
      </Button>
    </div>
  );
}
