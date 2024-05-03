import { CreateDocumentResponse } from "../types/createDocumentResponse";
import { CreateDocumentPayload } from "../types/document";
import { signWellApi } from "../utils/signWellApi";

export const createDocumentWithSignwell = async (
  createDocPayload: CreateDocumentPayload
) => {
  const payload = {
    test_mode: true,
    draft: false,
    with_signature_page: false,
    reminders: true,
    apply_signing_order: false,
    embedded_signing: true,
    embedded_signing_notifications: true,
    text_tags: false,
    allow_decline: true,
    allow_reassign: true,
    ...createDocPayload,
  };

  try {
    const { data } = await signWellApi.post<CreateDocumentResponse>(
      "/documents",
      payload
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    return { success: false, error: error.data };
  }
};
