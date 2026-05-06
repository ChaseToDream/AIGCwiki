export const IMAGE_DIR = 'public/images/artworks';
export const IMAGE_PREFIX = '/images/artworks/';
export const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
export const RECOMMENDED_SIZE = { width: 1200, height: 1800 };

export function getImageName(slug: string): string {
  return `${slug}.jpg`;
}

export function getImageUrl(slug: string): string {
  return `${IMAGE_PREFIX}${getImageName(slug)}`;
}

export function isImageExist(filename: string): boolean {
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.resolve(process.cwd(), IMAGE_DIR, filename);
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

export function validateImageFile(filename: string): string | null {
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    return `不支持的图片格式: ${ext}，支持: ${SUPPORTED_EXTENSIONS.join(', ')}`;
  }
  return null;
}
