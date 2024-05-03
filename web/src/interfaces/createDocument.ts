export interface CreateDocumentForm {
  name: string;
  recipients: Recipient[];
  files: File[];
  fields: Field[];
}

export interface Field {
  type: string;
  fixed_width?: boolean;
  lock_sign_date?: boolean;
  x: number;
  y: number;
  page: number;
  recipient_id: string;
}

export interface File {
  name: string;
  file_base64: string;
}

export interface Recipient {
  send_email?: boolean;
  id: string;
  name: string;
  email: string;
}
