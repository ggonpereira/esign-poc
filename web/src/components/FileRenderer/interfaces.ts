import { Field, Recipient } from "../../interfaces/createDocument";

export interface Coordinates {
  field: Field;
  recipient: Recipient;
}

export interface FileRendererProps {
  fileData: string;
}

export interface FileRendererChange {
  type: string;
  x: number;
  y: number;
  recipient_id: number;
  page: number;
}
