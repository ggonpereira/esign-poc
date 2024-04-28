import { Router } from "express";
import { createDocument } from "../controllers/documentController";

const router = Router();

router.post("/documents", createDocument);

export default router;
