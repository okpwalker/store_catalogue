import { useState } from 'react';
import { Button } from './ui/button';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFExportProps {
  targetRef: React.RefObject<HTMLDivElement>;
  filename?: string;
}

export function PDFExport({ targetRef, filename = 'catalogue.pdf' }: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generatePDF = async () => {
    if (!targetRef.current) {
      alert('No content to generate PDF from.');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      const pages = targetRef.current.querySelectorAll('.page');

      if (pages.length === 0) {
        throw new Error('No pages found to generate PDF');
      }

      console.log(`Starting PDF generation for ${pages.length} pages...`);

      // Wait for images to load
      const images = targetRef.current.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = () => {
              console.warn('Image failed to load:', img.src);
              resolve(); // Continue even if image fails
            };
            setTimeout(resolve, 5000); // Timeout after 5 seconds
          });
        })
      );

      console.log('All images loaded, generating PDF...');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;

        setProgress(Math.round(((i + 1) / pages.length) * 100));
        console.log(`Rendering page ${i + 1} of ${pages.length}...`);

        try {
          const canvas = await html2canvas(page, {
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            logging: true,
            backgroundColor: '#ffffff',
            removeContainer: false,
            imageTimeout: 15000,
            onclone: (clonedDoc) => {
              // First, remove all theme.css and replace with safe defaults
              const rootStyle = clonedDoc.documentElement.style;
              const safeColors = {
                '--background': '#ffffff',
                '--foreground': '#252525',
                '--card': '#ffffff',
                '--card-foreground': '#252525',
                '--popover': '#ffffff',
                '--popover-foreground': '#252525',
                '--primary': '#030213',
                '--primary-foreground': '#ffffff',
                '--secondary': '#f2f2f3',
                '--secondary-foreground': '#030213',
                '--muted': '#ececf0',
                '--muted-foreground': '#717182',
                '--accent': '#e9ebef',
                '--accent-foreground': '#030213',
                '--destructive': '#d4183d',
                '--destructive-foreground': '#ffffff',
                '--border': 'rgba(0, 0, 0, 0.1)',
                '--ring': '#b3b3b3',
                '--chart-1': '#f97316',
                '--chart-2': '#3b82f6',
                '--chart-3': '#1e40af',
                '--chart-4': '#facc15',
                '--chart-5': '#fbbf24',
                '--sidebar': '#fafafa',
                '--sidebar-foreground': '#252525',
                '--sidebar-primary': '#030213',
                '--sidebar-primary-foreground': '#fafafa',
                '--sidebar-accent': '#f5f5f5',
                '--sidebar-accent-foreground': '#343434',
                '--sidebar-border': '#ebebeb',
                '--sidebar-ring': '#b3b3b3'
              };

              // Apply safe colors to root
              Object.entries(safeColors).forEach(([key, value]) => {
                rootStyle.setProperty(key, value);
              });

              // Aggressively replace all oklch colors with standard colors
              const allElements = clonedDoc.querySelectorAll('*');

              // Color mapping from oklch to standard colors
              const colorMap: { [key: string]: string } = {
                'oklch(0.145 0 0)': '#252525',
                'oklch(0.985 0 0)': '#fafafa',
                'oklch(1 0 0)': '#ffffff',
                'oklch(0.95 0.0058 264.53)': '#f2f2f3',
                'oklch(0.708 0 0)': '#b3b3b3',
                'oklch(0.646 0.222 41.116)': '#f97316',
                'oklch(0.6 0.118 184.704)': '#3b82f6',
                'oklch(0.398 0.07 227.392)': '#1e40af',
                'oklch(0.828 0.189 84.429)': '#facc15',
                'oklch(0.769 0.188 70.08)': '#fbbf24',
                'oklch(0.922 0 0)': '#ebebeb',
                'oklch(0.97 0 0)': '#f5f5f5',
                'oklch(0.205 0 0)': '#343434',
                'oklch(0.269 0 0)': '#454545',
                'oklch(0.439 0 0)': '#707070',
                'oklch(0.396 0.141 25.723)': '#b91c1c',
                'oklch(0.637 0.237 25.331)': '#f87171',
              };

              allElements.forEach((el) => {
                const element = el as HTMLElement;
                const computedStyle = window.getComputedStyle(element);

                // Replace background color
                const bgColor = computedStyle.backgroundColor;
                if (bgColor && bgColor.includes('oklch')) {
                  for (const [oklch, hex] of Object.entries(colorMap)) {
                    if (bgColor.includes(oklch.substring(6, oklch.length - 1))) {
                      element.style.backgroundColor = hex;
                      break;
                    }
                  }
                }

                // Replace text color
                const textColor = computedStyle.color;
                if (textColor && textColor.includes('oklch')) {
                  for (const [oklch, hex] of Object.entries(colorMap)) {
                    if (textColor.includes(oklch.substring(6, oklch.length - 1))) {
                      element.style.color = hex;
                      break;
                    }
                  }
                }

                // Replace border color
                const borderColor = computedStyle.borderColor;
                if (borderColor && borderColor.includes('oklch')) {
                  for (const [oklch, hex] of Object.entries(colorMap)) {
                    if (borderColor.includes(oklch.substring(6, oklch.length - 1))) {
                      element.style.borderColor = hex;
                      break;
                    }
                  }
                }

                // Force standard colors for common elements
                if (element.style.backgroundColor === '') {
                  element.style.backgroundColor = 'transparent';
                }
              });

              // Remove all style and link tags that might reference theme.css
              const styleElements = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
              styleElements.forEach((styleEl) => {
                const content = styleEl.textContent || '';
                if (content.includes('oklch') || content.includes('oklab')) {
                  // Replace oklch and oklab in inline styles with safe colors
                  let replaced = content.replace(/oklch\([^)]+\)/g, '#000000');
                  replaced = replaced.replace(/oklab\([^)]+\)/g, '#000000');
                  styleEl.textContent = replaced;
                }
              });

              // Remove all gradients and replace with solid colors
              allElements.forEach((el) => {
                const element = el as HTMLElement;
                const computedStyle = window.getComputedStyle(element);
                const bgImage = computedStyle.backgroundImage;

                // Replace gradients with solid colors
                if (bgImage && (bgImage.includes('gradient') || bgImage.includes('oklab') || bgImage.includes('oklch'))) {
                  element.style.backgroundImage = 'none';

                  // Determine appropriate solid color based on class names
                  const classList = element.className || '';
                  if (classList.includes('bg-gradient-to-br from-gray-50')) {
                    element.style.backgroundColor = '#f9fafb';
                  } else if (classList.includes('bg-gradient-to-br from-white')) {
                    element.style.backgroundColor = '#ffffff';
                  } else if (classList.includes('bg-gradient-to-br from-gray-900')) {
                    element.style.backgroundColor = '#111827';
                  } else if (classList.includes('bg-gradient-to-b from-black')) {
                    element.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                  } else {
                    element.style.backgroundColor = computedStyle.backgroundColor || '#ffffff';
                  }
                }

                // Also handle any remaining oklab/oklch colors in computed styles
                ['color', 'backgroundColor', 'borderColor'].forEach((prop) => {
                  const value = (computedStyle as any)[prop];
                  if (value && (value.includes('oklab') || value.includes('oklch'))) {
                    // Replace with neutral fallback
                    if (prop === 'backgroundColor') {
                      element.style.backgroundColor = '#ffffff';
                    } else if (prop === 'color') {
                      element.style.color = '#000000';
                    } else if (prop === 'borderColor') {
                      element.style.borderColor = '#e5e7eb';
                    }
                  }
                });
              });

              // Add fallback styles
              const styleTag = clonedDoc.createElement('style');
              styleTag.textContent = `
                * {
                  color: inherit !important;
                  background-image: none !important;
                }
                .text-gray-900 { color: #111827 !important; }
                .text-gray-800 { color: #1f2937 !important; }
                .text-gray-700 { color: #374151 !important; }
                .text-gray-600 { color: #4b5563 !important; }
                .text-gray-500 { color: #6b7280 !important; }
                .text-gray-400 { color: #9ca3af !important; }
                .text-white { color: #ffffff !important; }
                .bg-gray-900 { background-color: #111827 !important; }
                .bg-gray-800 { background-color: #1f2937 !important; }
                .bg-gray-100 { background-color: #f3f4f6 !important; }
                .bg-gray-50 { background-color: #f9fafb !important; }
                .bg-white { background-color: #ffffff !important; }
                .bg-green-100 { background-color: #dcfce7 !important; }
                .bg-green-600 { background-color: #16a34a !important; }
                .bg-gray-400 { background-color: #9ca3af !important; }
                .bg-gray-200 { background-color: #e5e7eb !important; }
                .text-green-700 { color: #15803d !important; }
                .text-green-800 { color: #166534 !important; }
                .text-gray-700 { color: #374151 !important; }
                .text-white { color: #ffffff !important; }
                .border-gray-200 { border-color: #e5e7eb !important; }
                .border-gray-800 { border-color: #1f2937 !important; }
                .border-white { border-color: #ffffff !important; }

                /* Remove all gradient backgrounds */
                [class*="bg-gradient"] { background-image: none !important; }
                .bg-gradient-to-br { background-image: none !important; }
                .bg-gradient-to-b { background-image: none !important; }
              `;
              clonedDoc.head.appendChild(styleTag);
            }
          });

          console.log(`Page ${i + 1} rendered to canvas`);

          const imgData = canvas.toDataURL('image/jpeg', 0.9);
          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * pdfWidth) / canvas.width;

          if (i > 0) {
            pdf.addPage();
          }

          if (imgHeight > pdfHeight) {
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, pdfHeight);
          } else {
            const yOffset = (pdfHeight - imgHeight) / 2;
            pdf.addImage(imgData, 'JPEG', 0, yOffset, imgWidth, imgHeight);
          }

          console.log(`Page ${i + 1} added to PDF`);
        } catch (pageError) {
          console.error(`Error rendering page ${i + 1}:`, pageError);
          throw new Error(`Failed to render page ${i + 1}: ${pageError instanceof Error ? pageError.message : 'Unknown error'}`);
        }
      }

      console.log('Saving PDF...');
      pdf.save(filename);
      setProgress(100);
      console.log('PDF saved successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error generating PDF: ${errorMessage}\n\nPlease check the browser console for more details.`);
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 1000);
    }
  };

  const handleBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={generatePDF}
        disabled={isGenerating}
        className="gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating PDF... {progress}%
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download PDF
          </>
        )}
      </Button>
      <Button
        onClick={handleBrowserPrint}
        variant="outline"
        className="gap-2"
        title="Use browser's Print to PDF feature (Ctrl+P)"
      >
        <Download className="w-4 h-4" />
        Print to PDF
      </Button>
    </div>
  );
}
