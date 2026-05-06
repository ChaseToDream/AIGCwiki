export interface ArtworkParameters {
  model: string;
  sampler?: string;
  steps: number;
  cfgScale: number;
  seed: number;
  width: number;
  height: number;
  positivePrompt: string;
  negativePrompt?: string;
}

export interface Artwork {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl: string;
  parameters: ArtworkParameters;
  style: string[];
  subject: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'style' | 'subject' | 'model';
}
