import { useRef } from 'react';
import * as XLSX from 'xlsx';
import { Button } from './ui/button';
import { Upload } from 'lucide-react';
import { Product } from './ProductCard';

interface ExcelImportProps {
  onImport: (products: Product[]) => void;
}

export function ExcelImport({ onImport }: ExcelImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Note: The xlsx library does NOT support extracting embedded images from Excel files.
  // This function is kept for potential future updates, but currently returns empty.
  const extractImagesFromWorkbook = (workbook: XLSX.WorkBook): Map<string, string> => {
    const imageMap = new Map<string, string>();

    // The standard xlsx library cannot extract embedded images.
    // Users should use image URLs in the 'picture' column instead.

    return imageMap;
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

        // Extract embedded images
        const imageMap = extractImagesFromWorkbook(workbook);

        // Default placeholder image
        const defaultImage = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800';

        const products: Product[] = jsonData.map((row: any, index: number) => {
          // Map your custom fields
          const itemNo = row.Item_no || row.item_no || row['Item No'] || `${index + 1}`;
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

          // Get Picture - could be URL string or will use embedded image
          const pictureUrl = row.Picture || row.picture || '';

          // Determine stock status
          const inStock = status.toLowerCase() === 'available' ||
                         status.toLowerCase() === 'in stock' ||
                         quantity > 0;

          // Priority:
          // 1. file_Name (construct GitHub URL)
          // 2. URL from picture column
          // 3. Embedded image
          // 4. Placeholder
          let image = defaultImage;

          if (fileName && typeof fileName === 'string' && fileName.trim().length > 0) {
            // Construct GitHub URL from file_Name
            const baseUrl = 'https://raw.githubusercontent.com/okpwalker/store_images/main/figurines/';
            image = baseUrl + fileName.trim();
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

        if (products.length === 0) {
          alert('No products found in the Excel file. Please check the file format.');
          return;
        }

        onImport(products);

        // Count products with images
        const productsWithImages = products.filter(p =>
          p.image && !p.image.includes('unsplash.com')
        ).length;
        const productsWithoutImages = products.length - productsWithImages;

        let message = `Successfully imported ${products.length} product${products.length !== 1 ? 's' : ''}!`;

        if (productsWithoutImages > 0) {
          message += `\n\n⚠️ ${productsWithoutImages} product${productsWithoutImages !== 1 ? 's' : ''} ${productsWithoutImages !== 1 ? 'are' : 'is'} using placeholder images.`;
          message += `\n\nTo add images, you can:`;
          message += `\n• Add filenames in the 'File_Name' column (easiest for GitHub images)`;
          message += `\n• Add image URLs in the 'Picture' column, OR`;
          message += `\n• Click "Manage Images" to upload images after import`;
        }

        alert(message);
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
      >
        <Upload className="w-4 h-4" />
        Import from Excel
      </Button>
    </div>
  );
}
