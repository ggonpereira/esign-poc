import { api } from "./api";

interface SubmitDocumentResponse {
  success: boolean;
  embeddedUrl?: string;
}

export const submitDocument = async (payload: any) => {
  const { data } = await api.post<SubmitDocumentResponse>(
    "/documents",
    payload
  );

  return data;
};
