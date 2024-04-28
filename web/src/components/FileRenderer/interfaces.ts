export interface Coordinates {
  x: number;
  y: number;
}

export interface FileRendererProps {
  fileData: string;
  handleChange: (data: Record<string, unknown>) => void;
}

export interface FileRendererChange {
  type: string;
  x: number;
  y: number;
  recipient_id: number;
  page: number;
}
