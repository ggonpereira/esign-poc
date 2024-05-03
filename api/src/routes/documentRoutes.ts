import { Router } from "express";
import { createDocument } from "../controllers/documentController";
import { downloadDocument } from "../controllers/downloadDocument";

const router = Router();

router.post("/documents", createDocument);
router.get("/download/:documentId", downloadDocument);

export default router;
