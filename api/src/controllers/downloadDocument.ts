import { Request, Response } from "express";
import { downloadDocumentService } from "../services/downloadDocument";

export async function downloadDocument(req: Request, res: Response) {
  try {
    const documentId: string = req.params.documentId;

    const pdfData = await downloadDocumentService(documentId);

    res.contentType("application/pdf");
    res.send(pdfData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
