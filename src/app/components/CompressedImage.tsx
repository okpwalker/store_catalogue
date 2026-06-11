import { useState, useEffect, ImgHTMLAttributes } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

interface CompressedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export function CompressedImage({
  src,
  alt,
  className,
  style,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.85,
  ...rest
}: CompressedImageProps) {
  const [compressedSrc, setCompressedSrc] = useState<string | null>(null);
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const compressImage = async () => {
      try {
        // For local imported images, skip compression and use directly
        if (src.startsWith('data:') || src.startsWith('blob:') || src.includes('/assets/')) {
          if (isMounted) {
            setCompressedSrc(src);
            setIsLoading(false);
          }
          return;
        }

        // Load the original image
        const img = new Image();
        img.crossOrigin = 'anonymous';

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });

        if (!isMounted) return;

        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > height) {
            width = Math.min(width, maxWidth);
            height = width / aspectRatio;
          } else {
            height = Math.min(height, maxHeight);
            width = height * aspectRatio;
          }
        }

        // Create canvas and compress
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        // Draw image with high quality settings
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compressed data URL
        const compressed = canvas.toDataURL('image/jpeg', quality);

        if (isMounted) {
          setCompressedSrc(compressed);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error compressing image, using original:', error);
        // Fall back to original image if compression fails
        if (isMounted) {
          setCompressedSrc(src);
          setIsLoading(false);
        }
      }
    };

    compressImage();

    return () => {
      isMounted = false;
    };
  }, [src, maxWidth, maxHeight, quality]);

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" data-original-url={src} />
        </div>
      </div>
    );
  }

  if (isLoading || !compressedSrc) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={compressedSrc}
      alt={alt}
      className={className}
      style={style}
      {...rest}
    />
  );
}
