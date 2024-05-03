import { api } from "./api";

export const downloadDocument = async (documentId: string) => {
  try {
    const { data } = await api.get(`/download/${documentId}`, {
      responseType: "blob",
    });

    return data;
  } catch (error) {
    console.error("Error downloading document:", error);
    throw error;
  }
};
