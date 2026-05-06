import artworksData from '@/data/artworks.json';
import { Artwork, ArtworkParameters } from '@/types';

export type ArtworkInput = Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'>;
export type ArtworkUpdate = Partial<ArtworkInput>;

const DATA_PATH = 'data/artworks.json';

let cachedArtworks: Artwork[] | null = null;

function getStore(): Artwork[] {
  if (cachedArtworks) return cachedArtworks;
  cachedArtworks = artworksData.artworks as Artwork[];
  return cachedArtworks;
}

export function getAllArtworks(): Artwork[] {
  return getStore();
}

export function getArtworkById(id: string): Artwork | undefined {
  return getStore().find((a) => a.id === id);
}

export function getRelatedArtworks(
  currentId: string,
  limit = 4
): Artwork[] {
  const current = getArtworkById(currentId);
  if (!current) return [];

  return getStore()
    .filter(
      (a) =>
        a.id !== currentId &&
        (a.style.some((s) => current.style.includes(s)) ||
          a.subject.some((s) => current.subject.includes(s)))
    )
    .slice(0, limit);
}

export function searchArtworks(query: string): Artwork[] {
  const q = query.toLowerCase();
  return getStore().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getArtworksByCategory(
  type: 'style' | 'subject' | 'model',
  value: string
): Artwork[] {
  return getStore().filter((a) => {
    if (type === 'style') return a.style.includes(value);
    if (type === 'subject') return a.subject.includes(value);
    if (type === 'model') return a.parameters.model === value;
    return false;
  });
}

export function getAllStyles(): string[] {
  const set = new Set<string>();
  getStore().forEach((a) => a.style.forEach((s) => set.add(s)));
  return Array.from(set).sort();
}

export function getAllSubjects(): string[] {
  const set = new Set<string>();
  getStore().forEach((a) => a.subject.forEach((s) => set.add(s)));
  return Array.from(set).sort();
}

export function getAllModels(): string[] {
  const set = new Set<string>();
  getStore().forEach((a) => set.add(a.parameters.model));
  return Array.from(set).sort();
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  getStore().forEach((a) => a.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getNextId(): string {
  const store = getStore();
  const maxId = store.reduce(
    (max, a) => Math.max(max, parseInt(a.id, 10) || 0),
    0
  );
  return String(maxId + 1);
}

export function buildArtwork(input: ArtworkInput, id?: string): Artwork {
  const now = new Date().toISOString();
  return {
    ...input,
    id: id || getNextId(),
    createdAt: now,
    updatedAt: now,
  };
}

export function addArtwork(
  list: Artwork[],
  input: ArtworkInput
): Artwork[] {
  const artwork = buildArtwork(input);
  return [...list, artwork];
}

export function removeArtwork(list: Artwork[], id: string): Artwork[] {
  return list.filter((a) => a.id !== id);
}

export function updateArtwork(
  list: Artwork[],
  id: string,
  updates: ArtworkUpdate
): Artwork[] {
  return list.map((a) =>
    a.id === id
      ? { ...a, ...updates, updatedAt: new Date().toISOString() }
      : a
  );
}

export async function saveArtworks(list: Artwork[]): Promise<void> {
  const fs = await import('fs/promises');
  const path = await import('path');
  const filePath = path.resolve(process.cwd(), DATA_PATH);
  await fs.writeFile(filePath, JSON.stringify({ artworks: list }, null, 2), 'utf-8');
  cachedArtworks = list;
}

export function getImagePath(slug: string): string {
  return `/images/artworks/${slug}.jpg`;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
