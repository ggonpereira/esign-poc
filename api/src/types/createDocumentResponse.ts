export interface CreateDocumentResponse {
  id: string;
  name: string;
  requester_email_address: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  expires_in: number;
  fields: Array<Field[]>;
  files: File[];
  copied_contacts: any[];
  recipients: Recipient[];
}

export interface Field {
  type: string;
  x: number;
  y: number;
  recipient_id: string;
}

export interface File {
  name: string;
  pages_number: number;
}

export interface Recipient {
  email: string;
  id: string;
  name: string;
  passcode: null;
  send_email: boolean;
  status: string;
  signing_order: number;
  embedded_signing_url: string;
}
