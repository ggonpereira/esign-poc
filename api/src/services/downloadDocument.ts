import { signWellApi } from "../utils/signWellApi";

export const downloadDocumentService = async (documentId: string) => {
  try {
    const { data } = await signWellApi.get(
      `/documents/${documentId}/completed_pdf`,
      { responseType: "arraybuffer" }
    );

    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
