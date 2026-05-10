import { Artwork } from '@/types';

const DATA_PATH = 'data/artworks.json';

export async function saveArtworks(list: Artwork[]): Promise<void> {
  const fs = await import('fs/promises');
  const path = await import('path');
  const filePath = path.resolve(process.cwd(), DATA_PATH);
  await fs.writeFile(filePath, JSON.stringify({ artworks: list }, null, 2), 'utf-8');
}
