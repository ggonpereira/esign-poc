export interface CreateDocument {
  files: File[];
  name: string;
  subject: string;
  message: string;
  recipients: Recipient[];
  fields: Array<Field[]>;
}

export interface Field {
  type?: string;
  required: boolean;
  fixed_width?: boolean;
  lock_sign_date?: boolean;
  x: number;
  y: number;
  page: number;
  recipient_id: string;
}

export interface File {
  name: string;
  file_base64?: string;
  file_url?: string;
}

export interface Recipient {
  send_email?: boolean;
  id: string;
  name: string;
  email: string;
}

export interface CreateDocumentPayload {
  name: string;
  subject: string;
  message: string;
  recipients: Recipient[];
  fields: Field[];
  files: File[];
}
