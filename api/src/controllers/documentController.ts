import { Request, Response } from "express";
import { createDocumentWithSignwell } from "../services/createDocument";
import { CreateDocumentPayload } from "../types/document";

export async function createDocument(req: Request, res: Response) {
  try {
    const documentData: CreateDocumentPayload = req.body;

    const response = await createDocumentWithSignwell(documentData);

    if (response.success) {
      return res.json(response);
    }

    console.error("Error creating document:", response.error);
    res.status(500).json({ error: "Failed to create document" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
