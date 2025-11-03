// Shared types for Notion media integration

export type MediaType = 'photography' | 'video';

export interface NotionMedia {
  id: string;
  title: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  fileIndex?: number;
}

export interface MediaAPIResponse {
  data?: NotionMedia[];
  error?: string;
}
