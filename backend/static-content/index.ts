import express, { Request, Response } from "express";
import path from "path";
const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  const indexHtmlPath = path.join(import.meta.dirname, '../../frontend/dist/index.html');
  res.sendFile(indexHtmlPath);
  console.log(indexHtmlPath)
});

export default router;