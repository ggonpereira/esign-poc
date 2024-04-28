export interface CreateDocument {
  name: string;
  subject: string;
  message: string;
  recipients: Recipient[];
  files: File[];
  fields: Array<Field[]>;
}

export interface Field {
  type: string;
  required: boolean;
  fixed_width: boolean;
  lock_sign_date: boolean;
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
  send_email: boolean;
  send_email_delay: number;
  id: string;
  name: string;
  email: string;
}
