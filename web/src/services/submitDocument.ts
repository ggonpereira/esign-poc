import {
  CreateDocumentForm,
  File,
  Recipient,
} from "../interfaces/createDocument";
import { api } from "./api";

interface RecipientResponse extends Recipient {
  embedded_signing_url: string;
  status: string;
}

export interface CreatedDocumentResponse {
  status: string;
  requester_email_address: string;
  recipients: RecipientResponse[];
  name: string;
  created_at: string;
  id: string;
  files: File[];
}

interface SubmitDocumentResponse {
  success: boolean;
  data: CreatedDocumentResponse;
}

export const submitDocument = async (payload: CreateDocumentForm) => {
  const { data } = await api.post<SubmitDocumentResponse>(
    "/documents",
    payload
  );

  return data;
};
